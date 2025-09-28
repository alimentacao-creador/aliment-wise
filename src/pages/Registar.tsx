import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { Logo } from "@/components/Logo";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Mail } from "lucide-react";

interface AuthForm {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Registar = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user, loading: authLoading } = useAuth();
  const { disableDemo } = useDemo();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<AuthForm>();
  const password = watch("password");

  useEffect(() => {
    // Clear demo mode when accessing registration
    disableDemo();
    
    // Redirect if already authenticated
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate, disableDemo]);

  const onSubmit = async (data: AuthForm) => {
    setLoading(true);
    try {
      if (activeTab === "signup") {
        const { error } = await signUp(data.email, data.password);
        if (error) {
          toast({
            title: "Erro no registo",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Conta criada com sucesso!",
            description: "Verifique o seu email para confirmar a conta.",
          });
          navigate("/verify");
        }
      } else {
        const { error } = await signIn(data.email, data.password);
        if (error) {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive",
          });
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns momentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Erro no login com Google",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    reset();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-nutrition">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">A carregar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-nutrition flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Button>

        <Card className="shadow-wellness">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Logo className="h-12" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Alimentação Inteligente
            </CardTitle>
            <CardDescription>
              Aceda à sua conta ou crie uma nova para começar
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
                <TabsTrigger value="login">Iniciar Sessão</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium">
                    🎉 7 dias Premium grátis para novos utilizadores!
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email", { 
                        required: "Email é obrigatório",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Email inválido"
                        }
                      })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Palavra-passe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      {...register("password", { 
                        required: "Palavra-passe é obrigatória",
                        minLength: {
                          value: 6,
                          message: "Palavra-passe deve ter pelo menos 6 caracteres"
                        }
                      })}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Palavra-passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repita a palavra-passe"
                      {...register("confirmPassword", { 
                        required: "Confirme a palavra-passe",
                        validate: value => value === password || "Palavras-passe não coincidem"
                      })}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="premium"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "A criar conta..." : "Criar Conta Gratuita"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email", { required: "Email é obrigatório" })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Palavra-passe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="A sua palavra-passe"
                      {...register("password", { required: "Palavra-passe é obrigatória" })}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "A iniciar sessão..." : "Iniciar Sessão"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full" 
              size="lg"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <Link to="/" className="text-primary hover:underline">
                ← Voltar à página inicial
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registar;
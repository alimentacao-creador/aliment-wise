import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>();

  const password = watch("password");

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password);
      if (error) {
        toast({
          title: t("common.error"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        navigate("/verify");
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: t("common.error"),
        description: "Erro inesperado durante o registo",
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
          title: t("common.error"),
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {t("auth.signup")}
          </CardTitle>
          <CardDescription>
            Crie a sua conta para começar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
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
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
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
              <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
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
              disabled={loading}
            >
              {loading ? t("common.loading") : t("auth.signup")}
            </Button>
          </form>

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
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {t("auth.loginWithGoogle")}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t("auth.alreadyHaveAccount")} </span>
            <Link to="/login" className="text-primary hover:underline">
              {t("auth.login")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
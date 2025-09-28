import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemo } from "@/hooks/useDemo";
import { useAuth } from "@/hooks/useAuth";
import { Play, ArrowLeft, Star, CheckCircle, Lock } from "lucide-react";

const Entrar = () => {
  const navigate = useNavigate();
  const { enableDemo } = useDemo();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleEnterDemo = () => {
    enableDemo();
    navigate("/dashboard");
  };

  if (loading) {
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
      <div className="w-full max-w-2xl">
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
            <div className="w-16 h-16 bg-gradient-wellness rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Modo Demonstração
            </CardTitle>
            <CardDescription className="text-lg">
              Explore a aplicação sem compromisso — veja como funciona!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* What's included */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">O que pode experimentar:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-success">Treinos Completos</p>
                    <p className="text-sm text-muted-foreground">Criar, editar e gerir planos semanais</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border">
                  <Lock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-muted-foreground">Análise de Refeições</p>
                    <p className="text-sm text-muted-foreground">Disponível com conta registada</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border">
                  <Lock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-muted-foreground">Chat IA</p>
                    <p className="text-sm text-muted-foreground">Disponível com conta registada</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border">
                  <Lock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-muted-foreground">Estatísticas</p>
                    <p className="text-sm text-muted-foreground">Disponível com conta registada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo info */}
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">ℹ️ Informação Importante</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Os dados do modo demonstração são armazenados localmente</li>
                <li>• As funcionalidades bloqueadas mostram a interface real</li>
                <li>• Pode criar uma conta a qualquer momento para acesso completo</li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col space-y-4">
              <Button 
                size="xl" 
                variant="premium"
                onClick={handleEnterDemo}
                className="w-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Começar Demonstração
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Prefere acesso completo? Crie uma conta gratuita:
                </p>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/registar")}
                  className="min-w-[200px]"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Criar Conta Gratuita
                </Button>
              </div>
            </div>

            {/* Benefits reminder */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Conta gratuita inclui 7 dias Premium • Análise IA • Estatísticas • Chat personalizado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Entrar;
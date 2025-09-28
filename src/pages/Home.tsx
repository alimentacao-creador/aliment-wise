import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-nutrition.jpg";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">{t("common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 text-center space-y-8 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
            Alimentação Inteligente
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Transforme sua alimentação e treino com inteligência artificial
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => navigate("/signup")}
              className="min-w-[200px]"
            >
              {t("auth.signup")}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
              className="min-w-[200px]"
            >
              {t("auth.login")}
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Principais Funcionalidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Análise de Refeições</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use IA para analisar suas refeições e obter informações nutricionais precisas
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Treinos Personalizados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Planos de treino adaptados aos seus objetivos e progresso
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Acompanhamento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitore seu progresso com relatórios detalhados e estatísticas
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
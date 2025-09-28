import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import heroImage from "@/assets/hero-nutrition.jpg";
import { Play, Star, Users } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { disableDemo } = useDemo();

  useEffect(() => {
    // Clear demo mode when visiting home
    disableDemo();
    
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate, disableDemo]);

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
    <div className="min-h-screen bg-gradient-nutrition">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 text-center space-y-8 max-w-3xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
              Alimentação Inteligente APP
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Nutrição, Treino e Evolução — ao seu alcance
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              size="xl" 
              variant="premium"
              onClick={() => navigate("/registar")}
              className="min-w-[280px]"
            >
              <Star className="w-5 h-5 mr-2" />
              Registar / Iniciar Sessão
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              onClick={() => navigate("/entrar")}
              className="min-w-[280px] border-2"
            >
              <Play className="w-5 h-5 mr-2" />
              Entrar em modo Demonstração
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6 bg-card/80 backdrop-blur-sm rounded-lg p-3 border">
            💡 Crie a sua conta gratuita e experimente <strong>7 dias Premium</strong>.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Principais Funcionalidades
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra como a inteligência artificial pode transformar a sua jornada de saúde e fitness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-wellness transition-wellness">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-wellness rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <CardTitle className="text-xl">Análise de Refeições</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Use IA para analisar suas refeições e obter informações nutricionais precisas com base em fotografias
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-wellness transition-wellness">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-wellness rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <CardTitle className="text-xl">Treinos Personalizados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Planos de treino semanais adaptados aos seus objetivos e progresso individual
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-wellness transition-wellness">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-wellness rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-xl">Acompanhamento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Monitore seu progresso com relatórios detalhados, estatísticas e evolução mensal
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Users className="w-5 h-5" />
              <span>Mais de 10.000 utilizadores já transformaram a sua saúde</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
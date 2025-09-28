import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/navigation/BottomNav";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FeatureCard } from "@/components/features/FeatureCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  MessageCircle, 
  Dumbbell, 
  Target, 
  Droplets,
  Scale,
  Zap,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";

export default function Dashboard() {
  const [dailyProgress, setDailyProgress] = useState({
    calories: 1250,
    targetCalories: 1800,
    water: 6,
    targetWater: 8,
    workouts: 1,
    targetWorkouts: 1
  });

  const caloriesProgress = (dailyProgress.calories / dailyProgress.targetCalories) * 100;
  const waterProgress = (dailyProgress.water / dailyProgress.targetWater) * 100;
  const workoutProgress = (dailyProgress.workouts / dailyProgress.targetWorkouts) * 100;

  return (
    <div className="min-h-screen bg-gradient-nutrition pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Welcome Hero Section */}
        <section className="relative overflow-hidden rounded-2xl shadow-wellness">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Alimentação Saudável" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
          </div>
          <div className="relative z-10 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Bem-vinda, Maria! 🌱
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
              Transforme sua relação com a alimentação através da inteligência artificial. 
              Análise personalizada, receitas inteligentes e acompanhamento completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glass" size="lg">
                <Camera className="h-5 w-5 mr-2" />
                Analisar Refeição
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat Nutricional
              </Button>
            </div>
          </div>
        </section>

        {/* Daily Progress */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-primary" />
            Progresso de Hoje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Calorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{dailyProgress.calories} kcal</span>
                    <span className="text-muted-foreground">{dailyProgress.targetCalories} kcal</span>
                  </div>
                  <Progress value={caloriesProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {dailyProgress.targetCalories - dailyProgress.calories} kcal restantes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground flex items-center">
                  <Droplets className="h-4 w-4 mr-2" />
                  Hidratação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{dailyProgress.water} copos</span>
                    <span className="text-muted-foreground">{dailyProgress.targetWater} copos</span>
                  </div>
                  <Progress value={waterProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {dailyProgress.targetWater - dailyProgress.water} copos restantes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground flex items-center">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Treinos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{dailyProgress.workouts} treino</span>
                    <span className="text-muted-foreground">{dailyProgress.targetWorkouts} treino</span>
                  </div>
                  <Progress value={workoutProgress} className="h-2" />
                  <p className="text-xs text-success text-sm font-medium">
                    ✓ Meta diária concluída!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary" />
            Estatísticas da Semana
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Peso Atual"
              value="65.2"
              unit="kg"
              change={-2.1}
              icon={<Scale className="h-4 w-4" />}
              variant="success"
            />
            <StatsCard
              title="IMC"
              value="22.4"
              change={-1.5}
              icon={<Target className="h-4 w-4" />}
              variant="success"
            />
            <StatsCard
              title="Calorias Médias"
              value="1.680"
              unit="kcal"
              change={5.2}
              icon={<Zap className="h-4 w-4" />}
            />
            <StatsCard
              title="Treinos Concluídos"
              value="6"
              unit="de 7"
              change={20}
              icon={<Dumbbell className="h-4 w-4" />}
              variant="success"
            />
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Funcionalidades Inteligentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Análise de Refeições"
              description="Fotografe sua comida e receba análise nutricional completa com sugestões de receitas personalizadas."
              icon={<Camera className="h-6 w-6" />}
              action="Analisar Agora"
              onAction={() => console.log('Navigate to meal analysis')}
            />
            <FeatureCard
              title="Chat Nutricional AI"
              description="Converse com nossa IA especializada em nutrição para esclarecer dúvidas e receber orientações."
              icon={<MessageCircle className="h-6 w-6" />}
              action="Iniciar Conversa"
              onAction={() => console.log('Navigate to chat')}
            />
            <FeatureCard
              title="Plano de Treinos"
              description="Treinos personalizados baseados no seu objetivo, com acompanhamento de progresso detalhado."
              icon={<Dumbbell className="h-6 w-6" />}
              action="Ver Treinos"
              onAction={() => console.log('Navigate to workouts')}
              variant="premium"
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
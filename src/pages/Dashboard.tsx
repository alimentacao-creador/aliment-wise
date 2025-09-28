import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Target, TrendingUp, Utensils, Camera, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-nutrition.jpg";

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    // This would typically involve checking user profile data
    // For now, we'll assume they need onboarding if they just signed up
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="relative z-10 px-4 py-12 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("dashboard.welcome")}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            Transforme sua alimentação e treino com inteligência artificial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => navigate("/meal")}
            >
              <Camera className="h-5 w-5 mr-2" />
              {t("dashboard.analyzeMeal")}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate("/workouts")}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {t("dashboard.viewWorkouts")}
            </Button>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Today's Progress */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-primary" />
            {t("dashboard.todaysProgress")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title={t("dashboard.weight")}
              value="72.5"
              unit="kg"
              change={-0.5}
              icon={<Target className="h-5 w-5" />}
              variant="success"
            />
            <StatsCard 
              title={t("dashboard.bmi")}
              value="23.1"
              change={-0.2}
              icon={<Activity className="h-5 w-5" />}
              variant="default"
            />
            <StatsCard 
              title={t("dashboard.calories")}
              value="1,847"
              change={5.2}
              icon={<Utensils className="h-5 w-5" />}
              variant="warning"
            />
            <StatsCard 
              title={t("dashboard.workouts")}
              value="4"
              unit=""
              change={25}
              icon={<TrendingUp className="h-5 w-5" />}
              variant="success"
            />
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t("dashboard.quickAccess")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="shadow-card transition-wellness hover:shadow-wellness cursor-pointer group"
              onClick={() => navigate("/meal")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Utensils className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {t("dashboard.analyzeMeal")}
                </CardTitle>
                <CardDescription>
                  Use a IA para analisar suas refeições
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-card transition-wellness hover:shadow-wellness cursor-pointer group"
              onClick={() => navigate("/workouts")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {t("dashboard.viewWorkouts")}
                </CardTitle>
                <CardDescription>
                  Acesse seus planos de treino
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="shadow-card transition-wellness hover:shadow-wellness cursor-pointer group"
              onClick={() => navigate("/stats")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {t("dashboard.checkStats")}
                </CardTitle>
                <CardDescription>
                  Veja suas estatísticas detalhadas
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
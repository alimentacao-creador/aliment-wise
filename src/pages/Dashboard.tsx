import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthWrapper } from "@/components/AuthWrapper";
import { LockedOverlay } from "@/components/LockedOverlay";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { 
  Activity, 
  Utensils, 
  Dumbbell, 
  TrendingUp, 
  Weight,
  Calculator,
  Flame,
  Target
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDemo } = useDemo();

  // Demo/sample data
  const statsData = {
    weight: isDemo ? 0 : (user ? 75 : 0),
    bmi: isDemo ? 0 : (user ? 24.5 : 0),
    calories: isDemo ? 0 : (user ? 1850 : 0),
    workouts: isDemo ? 3 : (user ? 5 : 0),
  };

  const StatsCard = ({ 
    title, 
    value, 
    unit, 
    icon: Icon, 
    description, 
    onClick, 
    locked = false 
  }: {
    title: string;
    value: number;
    unit: string;
    icon: any;
    description: string;
    onClick: () => void;
    locked?: boolean;
  }) => {
    const CardComponent = (
      <Card 
        className="cursor-pointer hover:shadow-wellness transition-wellness"
        onClick={!locked ? onClick : undefined}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {value}{unit}
          </div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    );

    if (locked) {
      return (
        <LockedOverlay
          title="Funcionalidade Premium"
          message="Esta funcionalidade está disponível apenas para utilizadores registados. Crie já a sua conta gratuita e desbloqueie 7 dias Premium."
        >
          {CardComponent}
        </LockedOverlay>
      );
    }

    return CardComponent;
  };

  const QuickActionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    onClick, 
    locked = false,
    variant = "default" 
  }: {
    title: string;
    description: string;
    icon: any;
    onClick: () => void;
    locked?: boolean;
    variant?: "default" | "premium";
  }) => {
    const CardComponent = (
      <Card 
        className="cursor-pointer hover:shadow-wellness transition-wellness h-full"
        onClick={!locked ? onClick : undefined}
      >
        <CardHeader>
          <div className={`w-12 h-12 ${variant === 'premium' ? 'bg-gradient-wellness' : 'bg-primary'} rounded-lg flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    );

    if (locked) {
      return (
        <LockedOverlay
          title="Funcionalidade Premium"
          message="Esta funcionalidade está disponível apenas para utilizadores registados. Crie já a sua conta gratuita e desbloqueie 7 dias Premium."
        >
          {CardComponent}
        </LockedOverlay>
      );
    }

    return CardComponent;
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-nutrition pb-20">
        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="small" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {isDemo ? "Modo Demonstração" : user ? `Olá, ${user.email}` : "Bem-vindo"}
                </p>
              </div>
            </div>
            {isDemo && (
              <Button 
                variant="premium" 
                size="sm"
                onClick={() => navigate("/registar")}
              >
                Criar Conta
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Stats Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Resumo de Hoje</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Peso"
                value={statsData.weight}
                unit="kg"
                icon={Weight}
                description="Peso atual"
                onClick={() => navigate("/profile")}
                locked={isDemo}
              />
              <StatsCard
                title="IMC"
                value={statsData.bmi}
                unit=""
                icon={Calculator}
                description="Índice massa corporal"
                onClick={() => navigate("/profile")}
                locked={isDemo}
              />
              <StatsCard
                title="Calorias"
                value={statsData.calories}
                unit="kcal"
                icon={Flame}
                description="Consumidas hoje"
                onClick={() => navigate("/meal")}
                locked={isDemo}
              />
              <StatsCard
                title="Treinos"
                value={statsData.workouts}
                unit=""
                icon={Target}
                description="Esta semana"
                onClick={() => navigate("/workouts")}
                locked={false} // Workouts are unlocked in demo
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Acesso Rápido</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                title="Treinos"
                description="Gerir planos semanais"
                icon={Dumbbell}
                onClick={() => navigate("/workouts")}
                locked={false}
                variant="default"
              />
              <QuickActionCard
                title="Alimentação"
                description="Analisar refeições"
                icon={Utensils}
                onClick={() => navigate("/meal")}
                locked={isDemo}
                variant="premium"
              />
              <QuickActionCard
                title="Estatísticas"
                description="Ver progresso"
                icon={TrendingUp}
                onClick={() => navigate("/stats")}
                locked={isDemo}
                variant="premium"
              />
              <QuickActionCard
                title="Chat IA"
                description="Conselhos personalizados"
                icon={Activity}
                onClick={() => navigate("/chat")}
                locked={isDemo}
                variant="premium"
              />
            </div>
          </div>

          {/* Demo Mode Notice */}
          {isDemo && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Modo Demonstração Ativo
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Está a usar a versão demonstração. Apenas os Treinos estão totalmente funcionais.
                  </p>
                  <Button 
                    variant="premium" 
                    onClick={() => navigate("/registar")}
                  >
                    Criar Conta Gratuita - 7 Dias Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;
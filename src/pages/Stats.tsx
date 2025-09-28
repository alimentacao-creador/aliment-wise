import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthWrapper } from "@/components/AuthWrapper";
import LockedOverlay from "@/components/LockedOverlay";
import { Logo } from "@/components/Logo";
import { useDemo } from "@/hooks/useDemo";
import { useAuth } from "@/hooks/useAuth";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, Activity, Flame } from "lucide-react";

const Stats = () => {
  const { isDemo } = useDemo();
  const { user } = useAuth();

  // Sample/demo data - shows 0 values in demo mode
  const weightData = [
    { month: 'Jan', weight: isDemo ? 0 : 72.5, target: 70 },
    { month: 'Fev', weight: isDemo ? 0 : 72.1, target: 70 },
    { month: 'Mar', weight: isDemo ? 0 : 71.8, target: 70 },
    { month: 'Abr', weight: isDemo ? 0 : 71.2, target: 70 },
    { month: 'Mai', weight: isDemo ? 0 : 70.8, target: 70 },
    { month: 'Jun', weight: isDemo ? 0 : 70.5, target: 70 },
  ];

  const caloriesData = [
    { day: 'Seg', consumed: isDemo ? 0 : 1850, target: 2000 },
    { day: 'Ter', consumed: isDemo ? 0 : 1920, target: 2000 },
    { day: 'Qua', consumed: isDemo ? 0 : 1780, target: 2000 },
    { day: 'Qui', consumed: isDemo ? 0 : 2100, target: 2000 },
    { day: 'Sex', consumed: isDemo ? 0 : 1950, target: 2000 },
    { day: 'Sáb', consumed: isDemo ? 0 : 2200, target: 2000 },
    { day: 'Dom', consumed: isDemo ? 0 : 1800, target: 2000 },
  ];

  const workoutData = [
    { month: 'Jan', workouts: isDemo ? 0 : 12 },
    { month: 'Fev', workouts: isDemo ? 0 : 15 },
    { month: 'Mar', workouts: isDemo ? 0 : 18 },
    { month: 'Abr', workouts: isDemo ? 0 : 20 },
    { month: 'Mai', workouts: isDemo ? 0 : 16 },
    { month: 'Jun', workouts: isDemo ? 0 : 22 },
  ];

  const StatCard = ({ title, value, unit, icon: Icon, change, locked = false }: {
    title: string;
    value: number;
    unit: string;
    icon: any;
    change?: number;
    locked?: boolean;
  }) => {
    const CardComponent = (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}{unit}</div>
          {change !== undefined && (
            <p className={`text-xs ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {change >= 0 ? '+' : ''}{change}% vs mês anterior
            </p>
          )}
        </CardContent>
      </Card>
    );

    if (locked) {
      return (
        <LockedOverlay
          message="Esta funcionalidade está disponível apenas para utilizadores registados. Crie já a sua conta gratuita e desbloqueie 7 dias Premium."
        >
          {CardComponent}
        </LockedOverlay>
      );
    }

    return CardComponent;
  };

  const ChartCard = ({ title, children, locked = false }: {
    title: string;
    children: React.ReactNode;
    locked?: boolean;
  }) => {
    const CardComponent = (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );

    if (locked) {
      return (
        <LockedOverlay
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
              <Logo className="h-10" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Estatísticas</h1>
                <p className="text-sm text-muted-foreground">
                  Acompanhe o seu progresso
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Peso Atual"
              value={isDemo ? 0 : 70.5}
              unit="kg"
              icon={Target}
              change={isDemo ? 0 : -2.8}
              locked={isDemo}
            />
            <StatCard
              title="IMC"
              value={isDemo ? 0 : 23.1}
              unit=""
              icon={Activity}
              change={isDemo ? 0 : -4.1}
              locked={isDemo}
            />
            <StatCard
              title="Calorias Média"
              value={isDemo ? 0 : 1943}
              unit="kcal"
              icon={Flame}
              change={isDemo ? 0 : -2.7}
              locked={isDemo}
            />
            <StatCard
              title="Treinos/Mês"
              value={isDemo ? 0 : 22}
              unit=""
              icon={TrendingUp}
              change={isDemo ? 0 : 37.5}
              locked={isDemo}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Evolução do Peso (6 meses)" locked={isDemo}>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(var(--muted-foreground))"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Calorias por Dia (Esta Semana)" locked={isDemo}>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={caloriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumed" fill="hsl(var(--primary))" />
                    <Bar dataKey="target" fill="hsl(var(--muted))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ChartCard title="Frequência de Treinos (6 meses)" locked={isDemo}>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="workouts" fill="hsl(var(--success))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Demo Mode Notice */}
          {isDemo && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Funcionalidade Bloqueada
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    As estatísticas detalhadas estão disponíveis apenas para utilizadores registados.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Stats;
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Stats = () => {
  const { t } = useTranslation();

  // Mock data - replace with real data from API
  const weeklyData = [
    { day: 'Seg', weight: 72.5, calories: 1850, workouts: 1 },
    { day: 'Ter', weight: 72.3, calories: 1920, workouts: 0 },
    { day: 'Qua', weight: 72.1, calories: 1780, workouts: 1 },
    { day: 'Qui', weight: 72.2, calories: 1890, workouts: 1 },
    { day: 'Sex', weight: 71.9, calories: 1950, workouts: 0 },
    { day: 'Sáb', weight: 71.8, calories: 2100, workouts: 1 },
    { day: 'Dom', weight: 71.6, calories: 1800, workouts: 0 },
  ];

  const monthlyData = [
    { month: 'Jan', weight: 74.2, avgCalories: 1920, totalWorkouts: 12 },
    { month: 'Fev', weight: 73.5, avgCalories: 1880, totalWorkouts: 15 },
    { month: 'Mar', weight: 72.8, avgCalories: 1850, totalWorkouts: 18 },
    { month: 'Abr', weight: 71.9, avgCalories: 1900, totalWorkouts: 16 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {t("stats.title")}
            </CardTitle>
            <CardDescription>
              Acompanhe o seu progresso ao longo do tempo
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">{t("stats.weeklyProgress")}</TabsTrigger>
            <TabsTrigger value="monthly">{t("stats.monthlyProgress")}</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            {/* Weekly Weight Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("stats.weightProgress")} - Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Calories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("stats.caloriesProgress")} - Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="calories" 
                      fill="hsl(var(--success))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Workouts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("stats.workoutsCompleted")} - Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="workouts" 
                      fill="hsl(var(--warning))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            {/* Monthly Weight Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("stats.weightProgress")} - Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Average Calories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calorias Médias - Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="avgCalories" 
                      fill="hsl(var(--success))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Total Workouts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total de Treinos - Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="totalWorkouts" 
                      fill="hsl(var(--warning))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Stats;
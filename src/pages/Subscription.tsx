import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthWrapper } from "@/components/AuthWrapper";
import { LockedOverlay } from "@/components/LockedOverlay";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { useNavigate } from "react-router-dom";
import { Crown, Check, Star } from "lucide-react";

const Subscription = () => {
  const { user } = useAuth();
  const { isDemo } = useDemo();
  const navigate = useNavigate();

  // Mock subscription status - in real app this would come from Supabase
  const subscriptionStatus = isDemo ? null : (user ? 'trial' : null);
  const trialDaysLeft = isDemo ? 0 : (user ? 5 : 0);

  const SubscriptionContent = () => (
    <div className="min-h-screen bg-gradient-nutrition pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo size="small" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Subscrição</h1>
              <p className="text-sm text-muted-foreground">
                Gerir plano e funcionalidades
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Current Status */}
          {!isDemo && user && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-primary" />
                  Plano Atual: {subscriptionStatus === 'trial' ? 'Período Experimental' : 'Gratuito'}
                </CardTitle>
                {subscriptionStatus === 'trial' && (
                  <CardDescription>
                    Restam {trialDaysLeft} dias do seu período Premium gratuito
                  </CardDescription>
                )}
              </CardHeader>
            </Card>
          )}

          {/* Plans Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Período Experimental</CardTitle>
                <CardDescription>7 dias Premium grátis</CardDescription>
                <div className="text-3xl font-bold">Grátis</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>5 análises de refeição por dia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>30 mensagens de chat por dia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Planos de treino completos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Estatísticas detalhadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Relatórios mensais</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Premium</CardTitle>
                <CardDescription>Após período experimental</CardDescription>
                <div className="text-3xl font-bold">€14.99<span className="text-sm font-normal">/mês</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Análises ilimitadas de refeição</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Chat ilimitado com IA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Planos de treino avançados</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Estatísticas avançadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success" />
                    <span>Suporte prioritário</span>
                  </div>
                </div>

                {!user && (
                  <Button 
                    variant="premium" 
                    size="lg" 
                    className="w-full"
                    onClick={() => navigate("/registar")}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Começar Período Experimental
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <Card>
            <CardHeader>
              <CardTitle>Porquê escolher Premium?</CardTitle>
              <CardDescription>
                Desbloqueie todo o potencial da sua jornada de saúde
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h4 className="font-medium mb-2">Análise IA Avançada</h4>
                  <p className="text-sm text-muted-foreground">
                    Análise nutricional precisa com sugestões personalizadas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h4 className="font-medium mb-2">Treinos Personalizados</h4>
                  <p className="text-sm text-muted-foreground">
                    Planos adaptados aos seus objetivos e progresso
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-medium mb-2">Estatísticas Detalhadas</h4>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe o seu progresso com relatórios completos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo CTA */}
          {isDemo && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Desbloqueie todas as funcionalidades
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Crie a sua conta gratuita e experimente 7 dias Premium sem compromisso.
                  </p>
                  <Button 
                    variant="premium" 
                    size="lg"
                    onClick={() => navigate("/registar")}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Criar Conta Gratuita
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <AuthWrapper>
      {isDemo ? (
        <LockedOverlay
          title="Gestão de Subscrição"
          message="Desbloqueie todas as funcionalidades criando a sua conta gratuita. Experimente 7 dias Premium sem compromisso."
        >
          <SubscriptionContent />
        </LockedOverlay>
      ) : (
        <SubscriptionContent />
      )}
    </AuthWrapper>
  );
};

export default Subscription;
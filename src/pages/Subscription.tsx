import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, X, Calendar, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionInfo {
  status: string;
  trialEndsAt?: string;
  nextBillingDate?: string;
}

const Subscription = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionInfo>({ status: 'free' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('subscription_status')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      if (data) {
        setSubscription({ 
          status: data.subscription_status as string || 'free',
          // Mock trial end date - replace with real data
          trialEndsAt: data.subscription_status === 'free' ? '2024-02-07' : undefined
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // Here you would integrate with Shopify Checkout
      // For now, we'll simulate the upgrade
      console.log('Redirecting to Shopify Checkout...');
      
      // Mock upgrade - replace with actual Shopify integration
      setTimeout(() => {
        setSubscription({ status: 'premium' });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'premium':
        return <Badge className="bg-primary text-primary-foreground">Premium</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">Período Experimental</Badge>;
    }
  };

  const getTrialDaysRemaining = () => {
    if (!subscription.trialEndsAt) return 0;
    
    const endDate = new Date(subscription.trialEndsAt);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              {t("subscription.title")}
            </CardTitle>
            <CardDescription>
              Gerencie a sua subscrição e plano
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t("subscription.currentPlan")}</span>
              {getStatusBadge(subscription.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription.status === 'free' && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center gap-2 text-warning mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Período experimental ativo</span>
                </div>
                <p className="text-sm">
                  {t("subscription.trialEndsIn")} {getTrialDaysRemaining()} {t("subscription.days")}
                </p>
              </div>
            )}

            {subscription.status === 'premium' && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Crown className="w-4 h-4" />
                  <span className="font-medium">Premium ativo</span>
                </div>
                <p className="text-sm">
                  Próxima cobrança: 7 de março de 2024
                </p>
              </div>
            )}

            {subscription.status === 'cancelled' && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <X className="w-4 h-4" />
                  <span className="font-medium">Subscrição cancelada</span>
                </div>
                <p className="text-sm">
                  O acesso premium expira no final do período atual
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Período Experimental</CardTitle>
              <CardDescription>7 dias grátis</CardDescription>
              <div className="text-3xl font-bold">Grátis</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>1 análise de refeição por dia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>10 mensagens de chat por dia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>Planos de treino básicos</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span>Relatórios mensais</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-primary">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">
                Recomendado
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-primary">Premium</CardTitle>
              <CardDescription>Acesso completo</CardDescription>
              <div className="text-3xl font-bold">€14.99<span className="text-sm font-normal">/mês</span></div>
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
                  <span>Planos de treino personalizados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>Relatórios mensais detalhados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>Suporte prioritário</span>
                </div>
              </div>

              {subscription.status !== 'premium' && (
                <Button 
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {loading ? "A processar..." : t("subscription.upgrade")}
                </Button>
              )}

              {subscription.status === 'premium' && (
                <Button variant="outline" className="w-full" size="lg">
                  {t("subscription.manage")}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Billing Information */}
        {subscription.status === 'premium' && (
          <Card>
            <CardHeader>
              <CardTitle>Informações de Cobrança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plano:</span>
                  <span>Premium Mensal</span>
                </div>
                <div className="flex justify-between">
                  <span>Preço:</span>
                  <span>€14.99/mês</span>
                </div>
                <div className="flex justify-between">
                  <span>Método de pagamento:</span>
                  <span>**** 1234</span>
                </div>
                <div className="flex justify-between">
                  <span>Próxima cobrança:</span>
                  <span>7 de março de 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Subscription;
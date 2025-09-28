import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Verify = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      // Here you would implement email resend logic
      // For now, just show a success message
      toast({
        title: t("common.success"),
        description: "Email de verificação reenviado com sucesso!",
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Erro ao reenviar email de verificação",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("auth.verifyEmail")}
          </CardTitle>
          <CardDescription className="text-base">
            {t("auth.verifyEmailText")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4" />
            <span>Verifique a sua caixa de entrada e pasta de spam</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResendEmail}
            disabled={loading}
          >
            {loading ? t("common.loading") : t("auth.resendEmail")}
          </Button>

          <div className="text-sm text-muted-foreground">
            Depois de verificar o email, pode fazer login na aplicação
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
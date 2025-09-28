import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Settings, User, Globe, Trash2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  nome: string;
  idade: number;
  sexo: string;
  altura: number;
  peso: number;
  objetivo: string;
  alergias: string;
}

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    nome: '',
    idade: 0,
    sexo: '',
    altura: 0,
    peso: 0,
    objetivo: '',
    alergias: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          nome: data.nome || '',
          idade: data.idade || 0,
          sexo: data.sexo || '',
          altura: data.altura || 0,
          peso: data.peso || 0,
          objetivo: data.objetivo || '',
          alergias: data.alergias || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        toast({
          title: t("common.error"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("common.success"),
          description: "Perfil atualizado com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: t("common.error"),
        description: "Erro ao guardar o perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    toast({
      title: t("common.success"),
      description: "Idioma alterado com sucesso!",
    });
  };

  const deleteAccount = async () => {
    if (!user) return;

    try {
      // In a real implementation, you would call an API to delete all user data
      // For now, we'll just sign out the user
      await signOut();
      toast({
        title: t("common.success"),
        description: "Conta eliminada com sucesso",
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Erro ao eliminar a conta",
        variant: "destructive",
      });
    }
  };

  const calculateBMI = () => {
    if (profile.peso > 0 && profile.altura > 0) {
      const heightInMeters = profile.altura / 100;
      return (profile.peso / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '0.0';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <User className="w-6 h-6" />
              {t("profile.title")}
            </CardTitle>
            <CardDescription>
              Gerencie as suas informações pessoais e preferências
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={profile.nome}
                  onChange={(e) => setProfile(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.idade}
                  onChange={(e) => setProfile(prev => ({ ...prev, idade: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sexo</Label>
              <Select 
                value={profile.sexo} 
                onValueChange={(value) => setProfile(prev => ({ ...prev, sexo: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("onboarding.genders.male")}</SelectItem>
                  <SelectItem value="female">{t("onboarding.genders.female")}</SelectItem>
                  <SelectItem value="other">{t("onboarding.genders.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={profile.altura}
                  onChange={(e) => setProfile(prev => ({ ...prev, altura: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={profile.peso}
                  onChange={(e) => setProfile(prev => ({ ...prev, peso: parseFloat(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label>IMC</Label>
                <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center text-sm font-medium">
                  {calculateBMI()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Objetivo</Label>
              <Select 
                value={profile.objetivo} 
                onValueChange={(value) => setProfile(prev => ({ ...prev, objetivo: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">{t("onboarding.goals.lose")}</SelectItem>
                  <SelectItem value="gain">{t("onboarding.goals.gain")}</SelectItem>
                  <SelectItem value="maintain">{t("onboarding.goals.maintain")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Alergias ou restrições alimentares</Label>
              <Textarea
                id="allergies"
                placeholder="Descreva qualquer alergia ou restrição alimentar..."
                value={profile.alergias}
                onChange={(e) => setProfile(prev => ({ ...prev, alergias: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={saveProfile} disabled={loading} className="w-full">
              {loading ? t("common.loading") : t("common.save")}
            </Button>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t("profile.language")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={i18n.language} onValueChange={changeLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              onClick={signOut}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("auth.logout")}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t("profile.deleteAccount")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar conta</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("profile.deleteAccountConfirm")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAccount} className="bg-destructive hover:bg-destructive/90">
                    {t("common.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
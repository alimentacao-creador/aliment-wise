import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthWrapper } from "@/components/AuthWrapper";
import LockedOverlay from "@/components/LockedOverlay";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { useNavigate } from "react-router-dom";
import { User, Settings, Globe, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { isDemo } = useDemo();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: isDemo ? "" : (user?.email?.split('@')[0] || ""),
    email: isDemo ? "" : (user?.email || ""),
    age: isDemo ? 0 : 28,
    height: isDemo ? 0 : 175,
    weight: isDemo ? 0 : 70,
    gender: isDemo ? "" : "male",
    goal: isDemo ? "" : "weight_loss",
  });

  const [language, setLanguage] = useState("pt");

  const handleInputChange = (field: string, value: string | number) => {
    if (isDemo) return; // Block input in demo mode
    
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (isDemo) return;
    
    toast({
      title: "Sucesso",
      description: "Perfil atualizado com sucesso!",
    });
  };

  const handleLogout = async () => {
    if (isDemo) {
      localStorage.removeItem('demo');
      navigate('/');
      return;
    }
    
    await signOut();
    navigate('/');
  };

  const calculateBMI = () => {
    if (profileData.height && profileData.weight) {
      const heightInMeters = profileData.height / 100;
      return (profileData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "0.0";
  };

  const ProfileContent = () => (
    <div className="min-h-screen bg-gradient-nutrition pb-20">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo className="h-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Perfil</h1>
              <p className="text-sm text-muted-foreground">
                {isDemo ? "Modo Demonstração" : "Gerir informações pessoais"}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            {isDemo ? "Sair do Demo" : "Terminar Sessão"}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={isDemo ? "Nome bloqueado" : "O seu nome"}
                    disabled={isDemo}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={isDemo ? "Email bloqueado" : "seu@email.com"}
                    disabled={isDemo}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age || ""}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                    placeholder={isDemo ? "0" : "28"}
                    disabled={isDemo}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profileData.height || ""}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                    placeholder={isDemo ? "0" : "175"}
                    disabled={isDemo}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profileData.weight || ""}
                    onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                    placeholder={isDemo ? "0" : "70"}
                    disabled={isDemo}
                  />
                </div>
              </div>

              {!isDemo && (
                <Button onClick={handleSave} className="w-full">
                  Guardar Alterações
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Saúde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{calculateBMI()}</div>
                  <div className="text-sm text-muted-foreground">IMC</div>
                </div>
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">{isDemo ? "0" : "2000"}</div>
                  <div className="text-sm text-muted-foreground">Calorias Diárias</div>
                </div>
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{isDemo ? "0" : "150"}g</div>
                  <div className="text-sm text-muted-foreground">Proteína Diária</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Definições
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <Label>Idioma</Label>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {isDemo && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Perfil Bloqueado
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    No modo demonstração, não é possível editar dados pessoais. 
                  </p>
                  <Button 
                    variant="premium" 
                    onClick={() => navigate("/registar")}
                  >
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
      <ProfileContent />
    </AuthWrapper>
  );
};

export default Profile;
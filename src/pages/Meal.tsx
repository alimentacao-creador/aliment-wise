import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthWrapper } from "@/components/AuthWrapper";
import LockedOverlay from "@/components/LockedOverlay";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { Camera, Upload, Utensils, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Meal = () => {
  const { user } = useAuth();
  const { isDemo } = useDemo();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDemo) {
      // Block file selection in demo mode
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const analyzeMeal = async () => {
    if (isDemo) {
      // This won't be called in demo since button is blocked
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione uma imagem primeiro",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Real implementation would call Gemini Vision API
    setTimeout(() => {
      setAnalysisResult({
        calories: 450,
        protein: 28,
        carbs: 35,
        fat: 15,
        suggestions: [
          "Boa fonte de proteína magra",
          "Considere adicionar mais vegetais",
          "Quantidade adequada para o almoço"
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Sucesso",
        description: "Análise concluída com sucesso!",
      });
    }, 2000);
  };

  const CameraButton = () => {
    const ButtonComponent = (
      <Button variant="premium" size="lg" disabled={isDemo}>
        <Camera className="w-5 h-5 mr-2" />
        Tirar Foto
      </Button>
    );

    if (isDemo) {
      return (
        <LockedOverlay
          message="Funcionalidade disponível apenas em versão registada. Crie já a sua conta gratuita e desbloqueie 7 dias Premium."
        >
          {ButtonComponent}
        </LockedOverlay>
      );
    }

    return ButtonComponent;
  };

  const UploadButton = () => {
    const ButtonComponent = (
      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isDemo}
        />
        <Button variant="outline" size="lg" disabled={isDemo}>
          <Upload className="w-5 h-5 mr-2" />
          Fazer Upload
        </Button>
      </div>
    );

    if (isDemo) {
      return (
        <LockedOverlay
          message="Funcionalidade disponível apenas em versão registada. Crie já a sua conta gratuita e desbloqueie 7 dias Premium."
        >
          {ButtonComponent}
        </LockedOverlay>
      );
    }

    return ButtonComponent;
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
                <h1 className="text-xl font-bold text-foreground">Análise de Refeições</h1>
                <p className="text-sm text-muted-foreground">
                  IA para análise nutricional
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center">
                  <Utensils className="w-6 h-6 mr-2 text-primary" />
                  Fotografe sua refeição
                </CardTitle>
                <CardDescription>
                  Use IA para analisar suas refeições e obter informações nutricionais
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Fotografe sua refeição</h3>
                  <p className="text-muted-foreground mb-4">
                    Tire uma foto ou faça upload de uma imagem da sua comida
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CameraButton />
                    <UploadButton />
                  </div>
                  
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary">
                        ✓ Imagem selecionada: {selectedFile.name}
                      </p>
                    </div>
                  )}
                </div>

                {/* Analysis Button */}
                <div className="text-center">
                  <Button 
                    onClick={analyzeMeal}
                    disabled={!selectedFile || isAnalyzing || isDemo}
                    size="lg"
                    variant="premium"
                  >
                    {isAnalyzing ? "Analisando..." : "Analisar Refeição"}
                  </Button>
                </div>

                {/* Results Section */}
                {analysisResult && !isDemo && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Informações Nutricionais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {analysisResult.calories}
                          </div>
                          <div className="text-sm text-muted-foreground">Calorias</div>
                        </div>
                        <div className="text-center p-3 bg-success/5 rounded-lg">
                          <div className="text-2xl font-bold text-success">
                            {analysisResult.protein}g
                          </div>
                          <div className="text-sm text-muted-foreground">Proteína</div>
                        </div>
                        <div className="text-center p-3 bg-warning/5 rounded-lg">
                          <div className="text-2xl font-bold text-warning">
                            {analysisResult.carbs}g
                          </div>
                          <div className="text-sm text-muted-foreground">Carboidratos</div>
                        </div>
                        <div className="text-center p-3 bg-accent/5 rounded-lg">
                          <div className="text-2xl font-bold text-accent">
                            {analysisResult.fat}g
                          </div>
                          <div className="text-sm text-muted-foreground">Gordura</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Sugestões da IA:</h4>
                        <ul className="space-y-2">
                          {analysisResult.suggestions.map((suggestion: string, index: number) => (
                            <li key={index} className="flex items-center text-sm">
                              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Demo Mode Notice */}
                {isDemo && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary mb-2">
                          Funcionalidade Bloqueada
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          A análise de refeições com IA está disponível apenas para utilizadores registados.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Meal;
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MealAnalysis {
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  recipes: {
    name: string;
    type: 'balanced' | 'gourmet' | 'targeted';
    description: string;
  }[];
}

const Meal = () => {
  const { t } = useTranslation();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMeal = async () => {
    if (!selectedImage) {
      toast({
        title: t("common.error"),
        description: "Por favor, selecione uma imagem primeiro",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      const mockAnalysis: MealAnalysis = {
        calories: 450,
        nutrients: {
          protein: 25,
          carbs: 40,
          fat: 15
        },
        recipes: [
          {
            name: "Salada Equilibrada",
            type: 'balanced',
            description: "Uma salada nutritiva com todos os macronutrientes balanceados"
          },
          {
            name: "Salada Gourmet",
            type: 'gourmet',
            description: "Versão sofisticada com ingredientes especiais"
          },
          {
            name: "Salada Proteica",
            type: 'targeted',
            description: "Focada no seu objetivo de ganho de massa muscular"
          }
        ]
      };
      
      setAnalysis(mockAnalysis);
      setAnalyzing(false);
      
      toast({
        title: t("common.success"),
        description: "Análise concluída com sucesso!",
      });
    }, 3000);
  };

  const getRecipeVariantColor = (type: string) => {
    switch (type) {
      case 'balanced': return 'bg-success/10 text-success';
      case 'gourmet': return 'bg-warning/10 text-warning';
      case 'targeted': return 'bg-primary/10 text-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {t("meal.title")}
            </CardTitle>
            <CardDescription>
              Carregue uma foto da sua refeição para análise nutricional
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {selectedImage ? (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Meal" 
                    className="w-full h-64 object-cover rounded-lg border-2 border-dashed border-muted"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Alterar
                  </Button>
                </div>
              ) : (
                <div 
                  className="w-full h-64 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    {t("meal.uploadPhoto")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Clique para selecionar uma imagem
                  </p>
                </div>
              )}
            </div>

            <Button 
              onClick={analyzeMeal}
              disabled={!selectedImage || analyzing}
              className="w-full"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("meal.analyzing")}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Analisar Refeição
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>{t("meal.results")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calories and Nutrients */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysis.calories}</div>
                  <div className="text-sm text-muted-foreground">{t("meal.calories")}</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-success">{analysis.nutrients.protein}g</div>
                  <div className="text-sm text-muted-foreground">Proteína</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{analysis.nutrients.carbs}g</div>
                  <div className="text-sm text-muted-foreground">Carboidratos</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{analysis.nutrients.fat}g</div>
                  <div className="text-sm text-muted-foreground">Gordura</div>
                </div>
              </div>

              {/* Recipe Suggestions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t("meal.recipes")}</h3>
                <div className="space-y-4">
                  {analysis.recipes.map((recipe, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{recipe.name}</h4>
                        <Badge className={getRecipeVariantColor(recipe.type)}>
                          {t(`meal.${recipe.type}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{recipe.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Meal;
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface OnboardingForm {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  allergies: string;
}

const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<OnboardingForm>();

  const onSubmit = async (data: OnboardingForm) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          nome: data.name,
          idade: data.age,
          sexo: data.gender,
          altura: data.height,
          peso: data.weight,
          objetivo: data.goal,
          alergias: data.allergies || null,
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
          description: "Perfil criado com sucesso!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: t("common.error"),
        description: "Erro ao guardar os dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {t("onboarding.title")}
            </CardTitle>
            <CardDescription>
              {t("onboarding.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("onboarding.name")}</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Nome é obrigatório" })}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">{t("onboarding.age")}</Label>
                  <Input
                    id="age"
                    type="number"
                    {...register("age", { 
                      required: "Idade é obrigatória",
                      min: { value: 16, message: "Idade mínima é 16 anos" },
                      max: { value: 120, message: "Idade máxima é 120 anos" }
                    })}
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && (
                    <p className="text-sm text-destructive">{errors.age.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("onboarding.gender")}</Label>
                <Select onValueChange={(value) => setValue("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("onboarding.genders.male")}</SelectItem>
                    <SelectItem value="female">{t("onboarding.genders.female")}</SelectItem>
                    <SelectItem value="other">{t("onboarding.genders.other")}</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("gender", { required: "Sexo é obrigatório" })} />
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">{t("onboarding.height")}</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    {...register("height", { 
                      required: "Altura é obrigatória",
                      min: { value: 100, message: "Altura mínima é 100 cm" },
                      max: { value: 250, message: "Altura máxima é 250 cm" }
                    })}
                    className={errors.height ? "border-destructive" : ""}
                  />
                  {errors.height && (
                    <p className="text-sm text-destructive">{errors.height.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">{t("onboarding.weight")}</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    {...register("weight", { 
                      required: "Peso é obrigatório",
                      min: { value: 30, message: "Peso mínimo é 30 kg" },
                      max: { value: 300, message: "Peso máximo é 300 kg" }
                    })}
                    className={errors.weight ? "border-destructive" : ""}
                  />
                  {errors.weight && (
                    <p className="text-sm text-destructive">{errors.weight.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("onboarding.goal")}</Label>
                <Select onValueChange={(value) => setValue("goal", value)}>
                  <SelectTrigger className={errors.goal ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione o seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">{t("onboarding.goals.lose")}</SelectItem>
                    <SelectItem value="gain">{t("onboarding.goals.gain")}</SelectItem>
                    <SelectItem value="maintain">{t("onboarding.goals.maintain")}</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("goal", { required: "Objetivo é obrigatório" })} />
                {errors.goal && (
                  <p className="text-sm text-destructive">{errors.goal.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">{t("onboarding.allergies")}</Label>
                <Textarea
                  id="allergies"
                  placeholder="Descreva qualquer alergia ou restrição alimentar..."
                  {...register("allergies")}
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? t("common.loading") : t("onboarding.continue")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
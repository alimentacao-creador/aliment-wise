import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AuthWrapper } from "@/components/AuthWrapper";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Dumbbell } from "lucide-react";

interface Exercise {
  id: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  time_seconds?: number;
  order_index: number;
}

interface Workout {
  id: string;
  name: string;
  day_of_week: string;
  description?: string;
  exercises: Exercise[];
}

const DAYS_OF_WEEK = [
  { value: "monday", label: "Segunda-feira" },
  { value: "tuesday", label: "Terça-feira" },
  { value: "wednesday", label: "Quarta-feira" },
  { value: "thursday", label: "Quinta-feira" },
  { value: "friday", label: "Sexta-feira" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];

const Workouts = () => {
  const { user } = useAuth();
  const { isDemo } = useDemo();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  const addExercise = (day: string) => {
    if (!newExercise.name.trim()) {
      toast({
        title: t("common.error"),
        description: "Nome do exercício é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const exercise: Exercise = {
      ...newExercise,
      id: Date.now().toString(),
    };

    setWorkoutPlan(prev =>
      prev.map(workoutDay =>
        workoutDay.day === day
          ? { ...workoutDay, exercises: [...workoutDay.exercises, exercise] }
          : workoutDay
      )
    );

    setNewExercise({
      name: '',
      sets: 3,
      reps: 12,
      weight: 0,
      time: 0,
    });

    toast({
      title: t("common.success"),
      description: "Exercício adicionado com sucesso!",
    });
  };

  const deleteExercise = (day: string, exerciseId: string) => {
    setWorkoutPlan(prev =>
      prev.map(workoutDay =>
        workoutDay.day === day
          ? {
              ...workoutDay,
              exercises: workoutDay.exercises.filter(ex => ex.id !== exerciseId)
            }
          : workoutDay
      )
    );

    toast({
      title: t("common.success"),
      description: "Exercício removido com sucesso!",
    });
  };

  const duplicateExercise = (day: string, exercise: Exercise) => {
    const duplicated: Exercise = {
      ...exercise,
      id: Date.now().toString(),
      name: `${exercise.name} (cópia)`,
    };

    setWorkoutPlan(prev =>
      prev.map(workoutDay =>
        workoutDay.day === day
          ? { ...workoutDay, exercises: [...workoutDay.exercises, duplicated] }
          : workoutDay
      )
    );

    toast({
      title: t("common.success"),
      description: "Exercício duplicado com sucesso!",
    });
  };

  const currentDayPlan = workoutPlan.find(day => day.day === activeDay);

  return (
    <div className="min-h-screen bg-gradient-subtle px-4 py-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {t("workouts.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-6">
                {workoutPlan.map((day) => (
                  <TabsTrigger
                    key={day.day}
                    value={day.day}
                    className="text-xs px-1"
                  >
                    {t(`workouts.days.${day.day}`).substring(0, 3)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {workoutPlan.map((day) => (
                <TabsContent key={day.day} value={day.day} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {t(`workouts.days.${day.day}`)}
                    </h3>
                    <Badge variant="secondary">
                      {day.exercises.length} exercícios
                    </Badge>
                  </div>

                  {/* Add Exercise Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t("workouts.addExercise")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2">
                          <Label htmlFor="exerciseName">{t("workouts.exerciseName")}</Label>
                          <Input
                            id="exerciseName"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Supino reto"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sets">{t("workouts.sets")}</Label>
                          <Input
                            id="sets"
                            type="number"
                            value={newExercise.sets}
                            onChange={(e) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) || 0 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="reps">{t("workouts.reps")}</Label>
                          <Input
                            id="reps"
                            type="number"
                            value={newExercise.reps}
                            onChange={(e) => setNewExercise(prev => ({ ...prev, reps: parseInt(e.target.value) || 0 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="weight">{t("workouts.weight")} (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={newExercise.weight}
                            onChange={(e) => setNewExercise(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={() => addExercise(day.day)}
                        className="w-full mt-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Exercício
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Exercise List */}
                  <div className="space-y-3">
                    {day.exercises.map((exercise) => (
                      <Card key={exercise.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{exercise.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <span>{exercise.sets} séries</span>
                                <span>{exercise.reps} reps</span>
                                {exercise.weight && exercise.weight > 0 && (
                                  <span>{exercise.weight}kg</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => duplicateExercise(day.day, exercise)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteExercise(day.day, exercise.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {day.exercises.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Nenhum exercício programado para {t(`workouts.days.${day.day}`).toLowerCase()}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workouts;
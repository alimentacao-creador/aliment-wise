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

  // Load workouts
  useEffect(() => {
    if (isDemo) {
      // Load from localStorage in demo mode
      const savedWorkouts = localStorage.getItem("demo_workouts");
      if (savedWorkouts) {
        setWorkouts(JSON.parse(savedWorkouts));
      }
    } else if (user) {
      loadWorkoutsFromSupabase();
    }
  }, [isDemo, user]);

  const loadWorkoutsFromSupabase = async () => {
    setLoading(true);
    try {
      const { data: workoutsData, error } = await supabase
        .from("workouts")
        .select(`
          *,
          workout_exercises (*)
        `)
        .eq("user_id", user?.id)
        .order("created_at");

      if (error) throw error;

      const formattedWorkouts = workoutsData?.map(workout => ({
        ...workout,
        exercises: workout.workout_exercises || []
      })) || [];

      setWorkouts(formattedWorkouts);
    } catch (error) {
      console.error("Error loading workouts:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os treinos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveWorkoutsToDemo = (updatedWorkouts: Workout[]) => {
    localStorage.setItem("demo_workouts", JSON.stringify(updatedWorkouts));
    setWorkouts(updatedWorkouts);
  };

  const createWorkout = async (dayOfWeek: string, name: string) => {
    const newWorkout: Workout = {
      id: isDemo ? `demo_${Date.now()}` : "",
      name,
      day_of_week: dayOfWeek,
      exercises: []
    };

    if (isDemo) {
      const updatedWorkouts = [...workouts, newWorkout];
      saveWorkoutsToDemo(updatedWorkouts);
      toast({
        title: "Sucesso",
        description: "Treino criado com sucesso",
      });
    } else if (user) {
      try {
        const { data, error } = await supabase
          .from("workouts")
          .insert({
            user_id: user.id,
            name,
            day_of_week: dayOfWeek,
          })
          .select()
          .single();

        if (error) throw error;

        const workoutWithExercises = { ...data, exercises: [] };
        setWorkouts([...workouts, workoutWithExercises]);
        
        toast({
          title: "Sucesso",
          description: "Treino criado com sucesso",
        });
      } catch (error) {
        console.error("Error creating workout:", error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o treino",
          variant: "destructive",
        });
      }
    }
  };

  const addExercise = async (workoutId: string, exercise: Omit<Exercise, 'id' | 'workout_id' | 'order_index'>) => {
    const newExercise: Exercise = {
      id: isDemo ? `demo_ex_${Date.now()}` : "",
      workout_id: workoutId,
      order_index: 0,
      ...exercise
    };

    if (isDemo) {
      const updatedWorkouts = workouts.map(workout => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: [...workout.exercises, newExercise]
          };
        }
        return workout;
      });
      saveWorkoutsToDemo(updatedWorkouts);
    } else if (user) {
      try {
        const { data, error } = await supabase
          .from("workout_exercises")
          .insert({
            workout_id: workoutId,
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            time_seconds: exercise.time_seconds,
          })
          .select()
          .single();

        if (error) throw error;

        const updatedWorkouts = workouts.map(workout => {
          if (workout.id === workoutId) {
            return {
              ...workout,
              exercises: [...workout.exercises, data]
            };
          }
          return workout;
        });
        setWorkouts(updatedWorkouts);
      } catch (error) {
        console.error("Error adding exercise:", error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar o exercício",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Sucesso",
      description: "Exercício adicionado com sucesso",
    });
  };

  const ExerciseForm = ({ workoutId, exercise, onSave, onCancel }: {
    workoutId: string;
    exercise?: Exercise;
    onSave: () => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: exercise?.name || "",
      sets: exercise?.sets || 3,
      reps: exercise?.reps || 12,
      weight: exercise?.weight || 0,
      time_seconds: exercise?.time_seconds || 0,
    });

    const handleSave = () => {
      if (!formData.name.trim()) {
        toast({
          title: "Erro",
          description: "Nome do exercício é obrigatório",
          variant: "destructive",
        });
        return;
      }

      addExercise(workoutId, formData);
      onSave();
    };

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="exercise-name">Nome do Exercício</Label>
          <Input
            id="exercise-name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Flexões"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sets">Séries</Label>
            <Input
              id="sets"
              type="number"
              min="1"
              value={formData.sets}
              onChange={(e) => setFormData(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
            />
          </div>
          <div>
            <Label htmlFor="reps">Repetições</Label>
            <Input
              id="reps"
              type="number"
              min="1"
              value={formData.reps}
              onChange={(e) => setFormData(prev => ({ ...prev, reps: parseInt(e.target.value) || 1 }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="0"
              step="0.5"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
              placeholder="Opcional"
            />
          </div>
          <div>
            <Label htmlFor="time">Tempo (segundos)</Label>
            <Input
              id="time"
              type="number"
              min="0"
              value={formData.time_seconds}
              onChange={(e) => setFormData(prev => ({ ...prev, time_seconds: parseInt(e.target.value) || 0 }))}
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {exercise ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </div>
    );
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
                <h1 className="text-xl font-bold text-foreground">Treinos</h1>
                <p className="text-sm text-muted-foreground">
                  Planeamento semanal de exercícios
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Weekly Overview */}
          <div className="grid gap-4">
            {DAYS_OF_WEEK.map((day) => {
              const dayWorkout = workouts.find(w => w.day_of_week === day.value);
              
              return (
                <Card key={day.value} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{day.label}</CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            {dayWorkout ? "Editar" : "Adicionar Treino"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {dayWorkout ? `Editar Treino - ${day.label}` : `Novo Treino - ${day.label}`}
                            </DialogTitle>
                          </DialogHeader>
                          
                          {!dayWorkout ? (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="workout-name">Nome do Treino</Label>
                                <Input
                                  id="workout-name"
                                  placeholder="Ex: Treino de Força"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      const target = e.target as HTMLInputElement;
                                      if (target.value.trim()) {
                                        createWorkout(day.value, target.value);
                                        target.value = '';
                                      }
                                    }
                                  }}
                                />
                              </div>
                              <Button 
                                onClick={() => {
                                  const input = document.getElementById('workout-name') as HTMLInputElement;
                                  if (input?.value.trim()) {
                                    createWorkout(day.value, input.value);
                                    input.value = '';
                                  }
                                }}
                                className="w-full"
                              >
                                Criar Treino
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Exercícios</h4>
                                {dayWorkout.exercises.length === 0 ? (
                                  <p className="text-muted-foreground text-sm">Nenhum exercício adicionado</p>
                                ) : (
                                  <div className="space-y-2">
                                    {dayWorkout.exercises.map((exercise) => (
                                      <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <div>
                                          <p className="font-medium">{exercise.name}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {exercise.sets} séries × {exercise.reps} reps
                                            {exercise.weight && exercise.weight > 0 && ` • ${exercise.weight}kg`}
                                            {exercise.time_seconds && exercise.time_seconds > 0 && ` • ${exercise.time_seconds}s`}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar Exercício
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Novo Exercício</DialogTitle>
                                  </DialogHeader>
                                  <ExerciseForm
                                    workoutId={dayWorkout.id}
                                    onSave={() => {}}
                                    onCancel={() => {}}
                                  />
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  
                  {dayWorkout && (
                    <CardContent>
                      {dayWorkout.exercises.length === 0 ? (
                        <div className="text-center py-4">
                          <Dumbbell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Nenhum exercício adicionado</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {dayWorkout.exercises.map((exercise) => (
                            <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-medium">{exercise.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {exercise.sets} séries × {exercise.reps} repetições
                                  {exercise.weight && exercise.weight > 0 && ` • ${exercise.weight}kg`}
                                  {exercise.time_seconds && exercise.time_seconds > 0 && ` • ${exercise.time_seconds}s`}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Demo Mode Notice */}
          {isDemo && (
            <Card className="mt-6 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Modo Demonstração
                  </h3>
                  <p className="text-muted-foreground">
                    Os treinos são guardados localmente no modo demonstração. 
                    Crie uma conta para sincronizar os seus dados.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Workouts;
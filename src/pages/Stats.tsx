"use client";
import { ls } from "@/lib/ls";
import { keys } from "@/lib/demo";

export default function Stats(){
  const meals = ls.get<any[]>(keys.meals, []);
  const workouts = ls.get<any[]>(keys.workouts, []);
  const totalMeals = meals.length;
  const totalWorkouts = workouts.reduce((acc, d)=> acc + (d.exercises?.length ?? 0), 0);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Estatísticas</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="card p-3">
          <p className="text-xs text-gray-500">Refeições registadas</p>
          <p className="text-xl font-semibold">{totalMeals}</p>
        </div>
        <div className="card p-3">
          <p className="text-xs text-gray-500">Exercícios na semana</p>
          <p className="text-xl font-semibold">{totalWorkouts}</p>
        </div>
      </div>

      <div className="card p-4">
        <p className="text-sm text-gray-600">Gráficos detalhados estarão disponíveis quando adicionar dados em Treino e Refeições.</p>
      </div>
    </div>
  );
}
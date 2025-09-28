"use client";

import { useEffect, useState } from "react";

type Exercise = {
  id: string;
  exercise_name: string;
  sets?: number;
  reps?: number;
  time_seconds?: number;
  load_kg?: number;
};

type DayPlan = {
  day: number;
  exercises: Exercise[];
};

const STORAGE = "aiapp_demo_workouts";
const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const uid = () => Math.random().toString(36).slice(2);

export default function Workouts() {
  const [week, setWeek] = useState<DayPlan[]>(
    Array.from({ length: 7 }, (_, i) => ({ day: i + 1, exercises: [] }))
  );

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE);
    if (raw) setWeek(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(week));
  }, [week]);

  const add = (d: number) =>
    setWeek(w =>
      w.map(p =>
        p.day === d
          ? {
              ...p,
              exercises: [
                ...p.exercises,
                {
                  id: uid(),
                  exercise_name: "Novo exercício",
                  sets: 3,
                  reps: 10,
                  time_seconds: 0,
                  load_kg: 0
                }
              ]
            }
          : p
      )
    );

  const patch = (d: number, id: string, changes: Partial<Exercise>) =>
    setWeek(w =>
      w.map(p =>
        p.day === d
          ? {
              ...p,
              exercises: p.exercises.map(e => (e.id === id ? { ...e, ...changes } : e))
            }
          : p
      )
    );

  const remove = (d: number, id: string) =>
    setWeek(w =>
      w.map(p =>
        p.day === d
          ? { ...p, exercises: p.exercises.filter(e => e.id !== id) }
          : p
      )
    );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Plano de Treino (Semanal)</h1>
      <p className="text-sm text-gray-500">
        Os seus treinos da demonstração são guardados no seu dispositivo.
      </p>
      
      <div className="space-y-4">
        {week.map((p, idx) => (
          <div key={p.day} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">{dayNames[idx]}</p>
              <button
                onClick={() => add(p.day)}
                className="text-sm rounded-md border px-3 py-1"
              >
                Adicionar exercício
              </button>
            </div>
            
            <div className="mt-3 space-y-2">
              {p.exercises.map(e => (
                <div key={e.id} className="rounded-lg border p-3 relative">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="border rounded px-2 py-1"
                      value={e.exercise_name}
                      onChange={ev =>
                        patch(p.day, e.id, { exercise_name: ev.target.value })
                      }
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      placeholder="Séries"
                      value={e.sets ?? 3}
                      onChange={ev =>
                        patch(p.day, e.id, { sets: Number(ev.target.value) })
                      }
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      placeholder="Reps"
                      value={e.reps ?? 10}
                      onChange={ev =>
                        patch(p.day, e.id, { reps: Number(ev.target.value) })
                      }
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      placeholder="Tempo (s)"
                      value={e.time_seconds ?? 0}
                      onChange={ev =>
                        patch(p.day, e.id, { time_seconds: Number(ev.target.value) })
                      }
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1"
                      placeholder="Carga (kg)"
                      value={e.load_kg ?? 0}
                      onChange={ev =>
                        patch(p.day, e.id, { load_kg: Number(ev.target.value) })
                      }
                    />
                  </div>
                  <button
                    onClick={() => remove(p.day, e.id)}
                    className="absolute right-2 top-2 text-xs text-red-600"
                  >
                    Remover
                  </button>
                </div>
              ))}
              {p.exercises.length === 0 && (
                <p className="text-xs text-gray-500">Sem exercícios para este dia.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
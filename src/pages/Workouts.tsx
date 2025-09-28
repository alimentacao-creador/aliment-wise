"use client";
import { useEffect, useState } from "react";
import { ls } from "@/lib/ls";
import { keys } from "@/lib/demo";

type Exercise = { id: string; exercise_name: string; sets: number; reps: number; time_seconds: number; load_kg: number; notes?: string; };
type DayPlan = { day: number; exercises: Exercise[] };
const dayNames = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
const uid = () => Math.random().toString(36).slice(2);

export default function Workouts(){
  const [week, setWeek] = useState<DayPlan[]>(Array.from({length:7},(_,i)=>({day:i+1, exercises:[]})));

  useEffect(()=>{ setWeek(ls.get(keys.workouts, week)); /* eslint-disable-next-line */ },[]);
  useEffect(()=>{ ls.set(keys.workouts, week); },[week]);

  const add = (d:number)=> setWeek(w=> w.map(p=> p.day===d ? {...p, exercises:[...p.exercises, {id:uid(), exercise_name:"Novo exercício", sets:3, reps:10, time_seconds:0, load_kg:0}]}:p));
  const patch = (d:number, id:string, k:Partial<Exercise>)=> setWeek(w=> w.map(p=> p.day===d ? {...p, exercises: p.exercises.map(e=> e.id===id ? {...e, ...k}: e)} : p));
  const remove = (d:number, id:string)=> setWeek(w=> w.map(p=> p.day===d ? {...p, exercises: p.exercises.filter(e=> e.id!==id)} : p));
  const duplicate = (d:number, id:string)=> setWeek(w=> w.map(p=> p.day===d ? {...p, exercises: (()=>{ const e=p.exercises.find(x=>x.id===id)!; return [...p.exercises, {...e, id:uid(), exercise_name:e.exercise_name+" (cópia)"}]; })()} : p));
  const resetDay = (d:number)=> setWeek(w=> w.map(p=> p.day===d ? {...p, exercises: []} : p));
  const resetAll = ()=> setWeek(Array.from({length:7},(_,i)=>({day:i+1, exercises:[]})));

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">Plano de Treino (Semanal)</h1>
        <div className="flex gap-2">
          <button className="btn btn-secondary px-3 py-2" onClick={resetAll}>Reiniciar semana</button>
        </div>
      </div>

      <div className="space-y-4">
        {week.map((p,idx)=>(
          <div key={p.day} className="card p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">{dayNames[idx]}</p>
              <div className="flex gap-2">
                <button onClick={()=>add(p.day)} className="btn btn-primary px-3 py-1.5 text-sm">Adicionar exercício</button>
                <button onClick={()=>resetDay(p.day)} className="btn btn-secondary px-3 py-1.5 text-sm">Limpar dia</button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {p.exercises.map((e)=>(
                <div key={e.id} className="rounded-lg border p-3 relative">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    <input className="input" value={e.exercise_name} onChange={ev=>patch(p.day,e.id,{exercise_name: ev.target.value})}/>
                    <input type="number" className="input" placeholder="Séries" value={e.sets} onChange={ev=>patch(p.day,e.id,{sets:Number(ev.target.value)})}/>
                    <input type="number" className="input" placeholder="Reps" value={e.reps} onChange={ev=>patch(p.day,e.id,{reps:Number(ev.target.value)})}/>
                    <input type="number" className="input" placeholder="Tempo (s)" value={e.time_seconds} onChange={ev=>patch(p.day,e.id,{time_seconds:Number(ev.target.value)})}/>
                    <input type="number" className="input" placeholder="Carga (kg)" value={e.load_kg} onChange={ev=>patch(p.day,e.id,{load_kg:Number(ev.target.value)})}/>
                    <input className="input" placeholder="Notas (opcional)" value={e.notes ?? ""} onChange={ev=>patch(p.day,e.id,{notes: ev.target.value})}/>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>duplicate(p.day,e.id)} className="btn btn-secondary px-3 py-1 text-sm">Duplicar</button>
                    <button onClick={()=>remove(p.day,e.id)} className="btn px-3 py-1 text-sm bg-red-50 border border-red-200 text-red-600">Remover</button>
                  </div>
                </div>
              ))}
              {p.exercises.length===0 && <p className="text-xs text-gray-500">Sem exercícios para este dia.</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
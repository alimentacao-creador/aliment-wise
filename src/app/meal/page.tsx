"use client";
import { useState } from "react";
import { ls } from "@/lib/ls";
import { keys } from "@/lib/demo";
import { estimateFromFile } from "@/lib/estimate";

type Meal = { id: string; url: string; name: string; size: number; calories: number; ingredients: string[]; nutrients: {protein:number;carbs:number;fat:number}; suggestions: {title:string;calories_est:number;ingredients:string[]}[]; date: string; };

const uid = () => Math.random().toString(36).slice(2);

export default function MealPage(){
  const [meals, setMeals] = useState<Meal[]>(ls.get(keys.meals, [] as Meal[]));

  const onFile = async (f?: File) => {
    if(!f) return;
    const url = URL.createObjectURL(f);
    const est = estimateFromFile(f.name, f.size);
    const m: Meal = {
      id: uid(), url, name: f.name, size: f.size,
      calories: est.calories, ingredients: est.ingredients,
      nutrients: est.nutrients, suggestions: est.suggestions,
      date: new Date().toISOString()
    };
    const next = [m, ...meals];
    setMeals(next); ls.set(keys.meals, next);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Análise de Refeições</h1>
      <label className="card p-4 flex items-center gap-4 cursor-pointer">
        <div className="rounded-full w-14 h-14 border grid place-items-center text-2xl">📷</div>
        <div>
          <p className="font-medium">Tirar Foto / Upload</p>
          <p className="text-xs text-gray-500">Carregue uma imagem para estimar calorias e nutrientes.</p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={e=>onFile(e.target.files?.[0])}/>
      </label>

      <div className="space-y-4">
        {meals.map(m=>(
          <div key={m.id} className="card p-4">
            <div className="flex gap-3">
              <img src={m.url} alt={m.name} className="w-28 h-28 object-cover rounded-lg border" />
              <div className="flex-1">
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-600">{new Date(m.date).toLocaleString()}</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div className="card p-2"><b>Calorias</b><div>{m.calories} kcal</div></div>
                  <div className="card p-2"><b>Proteína</b><div>{m.nutrients.protein} g</div></div>
                  <div className="card p-2"><b>Hidratos</b><div>{m.nutrients.carbs} g</div></div>
                  <div className="card p-2"><b>Gordura</b><div>{m.nutrients.fat} g</div></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Ingredientes: {m.ingredients.join(", ")}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="font-medium mb-1">Sugestões de receitas</p>
              <div className="grid md:grid-cols-3 gap-2">
                {m.suggestions.map((s,i)=>(
                  <div key={i} className="rounded-lg border p-2 text-sm">
                    <p className="font-semibold">{s.title}</p>
                    <p>~ {s.calories_est} kcal</p>
                    <p className="text-xs text-gray-500">Ingredientes: {s.ingredients.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {meals.length===0 && <p className="text-sm text-gray-500">Ainda não analisou nenhuma refeição.</p>}
      </div>
    </div>
  );
}
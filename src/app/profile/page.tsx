"use client";
import { useEffect, useState } from "react";
import { ls } from "@/lib/ls";
import { keys } from "@/lib/demo";

type Profile = { nome:string; idade:number|null; sexo:string; altura_cm:number|null; peso_kg:number|null; objetivo:string; alergias:string; };

export default function ProfilePage(){
  const [p, setP] = useState<Profile>(ls.get(keys.profile, { nome:"", idade:null, sexo:"", altura_cm:null, peso_kg:null, objetivo:"", alergias:"" }));
  useEffect(()=>{ ls.set(keys.profile, p); },[p]);

  const resetDemo = () => {
    Object.values(keys).forEach(k=>ls.remove(k as string));
    if (typeof window !== "undefined") localStorage.setItem("demo","true");
    location.reload();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Perfil</h1>
      <div className="card p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          ["Nome","nome"], ["Idade","idade"], ["Sexo","sexo"],
          ["Altura (cm)","altura_cm"], ["Peso (kg)","peso_kg"],
          ["Objetivo","objetivo"], ["Alergias","alergias"]
        ].map(([label, key])=>(
          <div key={key}>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <input className="input" value={(p as any)[key] ?? ""} onChange={e=>setP({...p, [key]: key.includes("idade")||key.includes("cm")||key.includes("kg") ? Number(e.target.value) : e.target.value})}/>
          </div>
        ))}
      </div>
      <button className="btn px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-2xl" onClick={resetDemo}>Reiniciar demonstração</button>
    </div>
  );
}
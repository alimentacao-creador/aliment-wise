"use client";
import { useEffect, useState } from "react";
import { ls } from "@/lib/ls";
import { keys } from "@/lib/demo";

type Sub = { status: "none"|"trial"|"premium"; started_at?: string; trial_days?: number; };

export default function Subscription(){
  const [sub, setSub] = useState<Sub>(ls.get(keys.subscription, { status: "none" }));
  useEffect(()=>{ ls.set(keys.subscription, sub); },[sub]);

  const startTrial = () => setSub({ status: "trial", started_at: new Date().toISOString(), trial_days: 7 });
  const upgrade = () => setSub({ status: "premium" });
  const reset = () => setSub({ status: "none" });

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Subscrição</h1>
      <div className="card p-4 space-y-3">
        <p className="text-sm">Estado atual: <b>{sub.status.toUpperCase()}</b></p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-secondary px-3 py-2" onClick={startTrial}>Ativar Trial (7 dias)</button>
          <button className="btn btn-primary px-3 py-2" onClick={upgrade}>Upgrade (simulado)</button>
          <button className="btn px-3 py-2 bg-gray-100 border" onClick={reset}>Repor</button>
        </div>
        {sub.status==="trial" && <p className="text-xs text-gray-500">Trial iniciado em {new Date(sub.started_at!).toLocaleString()}.</p>}
      </div>
    </div>
  );
}
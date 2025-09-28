"use client";
import { useEffect, useRef, useState } from "react";
import { ls } from "@/lib/ls";
import { keys } from "@/lib/demo";

type Msg = { id:string; role:"user"|"assistant"; text:string; time:number };
const uid = () => Math.random().toString(36).slice(2);

function replyFor(input: string): string {
  const t = input.toLowerCase();
  if (t.includes("caloria") || t.includes("kcal")) return "Registe as suas refeições em Refeições → a estimativa mostra calorias e macronutrientes.";
  if (t.includes("prote")) return "Uma meta comum é 1.6–2.2 g de proteína por kg de peso corporal/dia.";
  if (t.includes("treino") || t.includes("workout")) return "Em Treino pode criar o seu plano semanal, ajustar séries, repetições, tempo e cargas.";
  if (t.includes("peso") || t.includes("imc")) return "Atualize Peso/Perfil para ver tendências e cálculos de IMC nas Estatísticas.";
  if (t.includes("receit")) return "Na análise de refeições verá 3 sugestões de receitas equilibradas a partir da imagem.";
  return "Sou o Assistente Alimentação Inteligente. Posso ajudar com treino, nutrição e evolução. Experimente perguntar sobre calorias, proteína, treinos ou IMC.";
}

export default function Chat(){
  const [msgs, setMsgs] = useState<Msg[]>(ls.get(keys.messages, [] as Msg[]));
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ ls.set(keys.messages, msgs); endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send = () => {
    if(!text.trim()) return;
    const user: Msg = { id: uid(), role: "user", text, time: Date.now() };
    const bot: Msg  = { id: uid(), role: "assistant", text: replyFor(text), time: Date.now()+1 };
    setMsgs([...msgs, user, bot]); setText("");
  };

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-lg font-semibold">Chat</h1>
      <div className="card p-3 min-h-[320px] flex flex-col">
        <div className="flex-1 space-y-2 overflow-auto">
          {msgs.map(m=>(
            <div key={m.id} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role==="user"?"bg-primary/10 ml-auto":"bg-gray-100"}`}>
              {m.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="mt-3 flex gap-2">
          <input className="input flex-1" placeholder="Escreva a sua mensagem..." value={text} onChange={e=>setText(e.target.value)} />
          <button className="btn btn-primary px-4" onClick={send}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
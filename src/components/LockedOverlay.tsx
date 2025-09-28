"use client";
export default function LockedOverlay({ message="Disponível apenas na versão registada.", cta="Criar conta (em breve)" }:{message?:string; cta?:string}) {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
      <div className="bg-white rounded-xl p-4 shadow text-center max-w-xs">
        <p className="text-sm mb-3">🔒 {message}</p>
        <button className="btn btn-primary px-4 py-2">{cta}</button>
      </div>
    </div>
  );
}
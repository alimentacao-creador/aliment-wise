"use client";

import { useRouter } from "next/navigation";
import { enterDemo } from "@/lib/demo";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <img 
        src="/logo.png" 
        alt="Logótipo" 
        className="w-auto" 
        style={{ maxHeight: 120 }} 
      />
      
      <div className="w-full max-w-sm space-y-3">
        <a
          href="/registar"
          className="w-full block text-center rounded-xl bg-blue-600 text-white py-3 font-medium shadow"
        >
          Registar / Iniciar Sessão
        </a>
        
        <button
          onClick={() => {
            enterDemo();
            router.push("/dashboard");
          }}
          className="w-full rounded-xl border py-3 font-medium"
        >
          Entrar em modo Demonstração
        </button>
      </div>
    </div>
  );
}
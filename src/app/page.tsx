"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const enter = () => { localStorage.setItem("demo","true"); router.push("/dashboard"); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center flex flex-col gap-6 px-6 max-w-md">
        <img src="/logo.png" alt="Logo" className="mx-auto max-h-28 drop-shadow-lg" />
        <p className="text-white text-lg font-light">Bem-vindo à <span className="font-semibold">Alimentação Inteligente</span> — treino, nutrição e evolução num só lugar.</p>
        <div className="space-y-4">
          <motion.a whileHover={{scale:1.05}} whileTap={{scale:0.95}} href="/registar" className="btn btn-primary w-full py-3">Registar / Iniciar Sessão</motion.a>
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={enter} className="btn btn-secondary w-full py-3">Entrar em Demonstração</motion.button>
        </div>
      </div>
    </div>
  );
}
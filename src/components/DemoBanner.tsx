"use client";
import { isDemo } from "@/lib/demo";

export default function DemoBanner() {
  if (!isDemo()) return null;
  return (
    <div className="bg-amber-50 text-amber-800 text-center text-sm py-2">
      Está em modo demonstração. Apenas a área de <b>Treino</b> está desbloqueada.
    </div>
  );
}
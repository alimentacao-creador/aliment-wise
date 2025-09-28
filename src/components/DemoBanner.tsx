"use client";

import { isDemo } from "@/lib/demo";

export default function DemoBanner() {
  if (!isDemo()) return null;

  return (
    <div className="text-center text-xs py-2 bg-amber-50 text-amber-800">
      Está em modo demonstração. Apenas <b>Treino</b> está desbloqueado.
    </div>
  );
}
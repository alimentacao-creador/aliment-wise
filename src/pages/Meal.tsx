"use client";

import LockedOverlay from "@/components/LockedOverlay";

export default function Meal() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-3">Análise de Refeições</h1>
      <div className="relative rounded-xl border p-6 min-h-[220px]">
        <div className="flex items-center gap-3">
          <button className="rounded-full w-14 h-14 border disabled:opacity-50" disabled>
            📷
          </button>
          <div>
            <p className="font-medium">Tirar Foto</p>
            <p className="text-xs text-gray-500">
              Reconhecimento de ingredientes e calorias.
            </p>
          </div>
        </div>
        <LockedOverlay message="Disponível apenas para utilizadores registados." />
      </div>
    </div>
  );
}
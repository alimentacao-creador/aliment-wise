"use client";

import LockedOverlay from "@/components/LockedOverlay";

export default function Profile() {
  const fields = ["Nome", "Idade", "Sexo", "Altura (cm)", "Peso (kg)", "Objetivo", "Alergias"];

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-3">Perfil</h1>
      <div className="relative rounded-xl border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fields.map(l => (
            <div key={l}>
              <p className="text-xs text-gray-500 mb-1">{l}</p>
              <input
                className="w-full border rounded px-2 py-2"
                placeholder="—"
                disabled
              />
            </div>
          ))}
        </div>
        <LockedOverlay message="Edite estes dados após criar conta." />
      </div>
    </div>
  );
}
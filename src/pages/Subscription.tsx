"use client";

import LockedOverlay from "@/components/LockedOverlay";

export default function Subscription() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-3">Subscrição</h1>
      <div className="relative rounded-xl border p-4">
        <p className="text-sm text-gray-600">
          Estado da subscrição e gestão do plano.
        </p>
        <LockedOverlay message="Gestão disponível após criar conta." />
      </div>
    </div>
  );
}
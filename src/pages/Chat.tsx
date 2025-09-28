"use client";

import LockedOverlay from "@/components/LockedOverlay";

export default function Chat() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-3">Chat</h1>
      <div className="relative rounded-xl border p-4 min-h-[280px]">
        <div className="space-y-2">
          <div className="rounded-lg bg-gray-100 p-2 text-sm">
            Olá! Em que posso ajudar?
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 border rounded px-2 py-2"
            placeholder="Escreva a sua mensagem..."
            disabled
          />
          <button
            className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
            disabled
          >
            Enviar
          </button>
        </div>
        <LockedOverlay message="Chat disponível apenas para utilizadores registados." />
      </div>
    </div>
  );
}
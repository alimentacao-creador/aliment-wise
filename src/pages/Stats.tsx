export default function Stats() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-3">Estatísticas</h1>
      <div className="grid gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Peso (últimas 4 semanas)</p>
          <div className="h-24 grid place-items-center text-gray-400">0, 0, 0, 0</div>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">IMC</p>
          <div className="h-24 grid place-items-center text-gray-400">0.0</div>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Calorias</p>
          <div className="h-24 grid place-items-center text-gray-400">0 kcal</div>
        </div>
      </div>
    </div>
  );
}
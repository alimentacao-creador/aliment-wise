export default function Dashboard() {
  const cards = [
    { label: "Peso", value: "0 kg" },
    { label: "IMC", value: "0.0" },
    { label: "Calorias hoje", value: "0 kcal" },
    { label: "Treinos", value: "0" }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" style={{ maxHeight: 40 }} />
        <h1 className="text-lg font-semibold">Início</h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(c => (
          <div key={c.label} className="rounded-xl border p-3">
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="text-xl font-semibold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a href="/workouts" className="rounded-xl border p-4 hover:bg-gray-50">
          <p className="font-medium">Treino</p>
          <p className="text-xs text-gray-500">Plano semanal</p>
        </a>
        <a href="/meal" className="rounded-xl border p-4 hover:bg-gray-50">
          <p className="font-medium">Refeições</p>
          <p className="text-xs text-gray-500">Análise</p>
        </a>
        <a href="/stats" className="rounded-xl border p-4 hover:bg-gray-50">
          <p className="font-medium">Estatísticas</p>
          <p className="text-xs text-gray-500">Evolução</p>
        </a>
        <a href="/profile" className="rounded-xl border p-4 hover:bg-gray-50">
          <p className="font-medium">Perfil</p>
          <p className="text-xs text-gray-500">Dados</p>
        </a>
      </div>
    </div>
  );
}
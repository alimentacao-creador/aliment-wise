export default function Registar() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <img src="/logo.png" alt="Logo" style={{ maxHeight: 60 }} />
      <h1 className="text-lg font-semibold">Registo / Login</h1>
      <p className="text-sm text-gray-600 text-center max-w-sm">
        O registo real ficará disponível em breve. Para já, utilize o <b>modo demonstração</b> a partir da página inicial.
      </p>
      <a href="/" className="text-blue-600 underline">
        Voltar
      </a>
    </div>
  );
}
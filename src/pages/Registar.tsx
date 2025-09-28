export default function Registar(){
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 p-6">
      <img src="/logo.png" alt="Logo" className="max-h-16" />
      <h1 className="text-xl font-semibold">Registo / Login</h1>
      <p className="text-sm text-gray-600 text-center max-w-sm">O registo real ficará disponível numa fase posterior. Explore o <b>modo demonstração</b> para conhecer a aplicação.</p>
      <a href="/" className="text-primary underline">Voltar</a>
    </div>
  );
}
"use client";

export default function LockedOverlay({
  message = "Disponível apenas para utilizadores registados.",
  ctaHref = "/registar"
}: {
  message?: string;
  ctaHref?: string;
}) {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
      <div className="bg-white rounded-xl p-4 shadow text-center max-w-xs">
        <p className="text-sm mb-3">🔒 {message}</p>
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Criar conta (em breve)
        </a>
      </div>
    </div>
  );
}
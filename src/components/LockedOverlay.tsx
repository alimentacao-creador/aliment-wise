"use client";

// Component for locking features in demo mode
export default function LockedOverlay({ 
  message="Funcionalidade disponível apenas para utilizadores registados.", 
  ctaHref="/registar",
  children 
}: { 
  message?: string; 
  ctaHref?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-30 blur-sm">
        {children}
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-xl">
        <div className="bg-white rounded-xl p-4 shadow max-w-sm text-center">
          <p className="text-sm mb-3">⚠️ {message}</p>
          <a href={ctaHref} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white">
            Criar conta (7 dias Premium)
          </a>
        </div>
      </div>
    </div>
  );
}
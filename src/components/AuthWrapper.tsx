import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDemo } from '@/hooks/useDemo';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthWrapper = ({ children, requireAuth = false }: AuthWrapperProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isDemo, loading: demoLoading } = useDemo();

  const loading = authLoading || demoLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-nutrition">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">A carregar...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated and not in demo mode
  if (requireAuth && !user && !isDemo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-nutrition px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-6">Precisa de estar autenticado para aceder a esta página.</p>
          <a href="/registar" className="text-primary hover:underline">Criar conta ou iniciar sessão</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
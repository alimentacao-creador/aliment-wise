import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LockedOverlayProps {
  title?: string;
  message?: string;
  children: React.ReactNode;
}

export const LockedOverlay = ({ 
  title = "Funcionalidade Premium",
  message = "Funcionalidade disponível apenas para utilizadores registados. Crie já a sua conta gratuita com 7 dias Premium.",
  children 
}: LockedOverlayProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="pointer-events-none select-none opacity-30 blur-sm">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4 shadow-wellness">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-wellness rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {message}
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="premium" 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/registar')}
              >
                <Star className="w-4 h-4 mr-2" />
                Criar Conta Gratuita
              </Button>
              
              <p className="text-xs text-muted-foreground">
                7 dias Premium grátis • Sem compromisso
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
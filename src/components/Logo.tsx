import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Logo = ({ className, size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'h-8 md:h-10',
    medium: 'h-10 md:h-12',
    large: 'h-12 md:h-16'
  };

  return (
    <img
      src="/logo.png"
      alt="Alimentação Inteligente APP"
      className={cn(
        'w-auto object-contain',
        sizeClasses[size],
        className
      )}
    />
  );
};
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({
  children,
  variant = 'surface',
  hover = false,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-xl transition-all duration-150';

  const variants = {
    surface: 'bg-[#1B060C] text-[#FDF2F4] border border-[rgba(247,214,220,0.08)] shadow-sm',
    elevated: 'bg-[#240911] text-[#FDF2F4] border border-[rgba(247,214,220,0.12)] shadow-wine-subtle',
    secondary: 'bg-[#120306] text-[#FDF2F4] border border-[rgba(247,214,220,0.06)]',
    glass: 'tech-glass text-[#FDF2F4]',
    accent: 'bg-[#240911] border border-[#6D1D32] shadow-wine-subtle',
  };

  const hoverStyles = hover ? 'hover:border-[#8E2B44]/70 hover:bg-[#20070F] cursor-pointer' : '';

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], hoverStyles, className))}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
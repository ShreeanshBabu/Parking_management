import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded-full uppercase tracking-wider select-none';

  const variants = {
    available: 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40',
    occupied: 'bg-[#4B0F1E]/50 text-[#F7D6DC] border border-[#6D1D32]',
    active: 'bg-[#6D1D32]/60 text-[#F7D6DC] border border-[#8E2B44]',
    maintenance: 'bg-zinc-900/60 text-zinc-400 border border-zinc-700/40',
    fixed: 'bg-[#4B0F1E]/50 text-[#F7D6DC] border border-[#6D1D32]',
    floating: 'bg-[#6D1D32]/50 text-[#F7D6DC] border border-[#8E2B44]',
    neutral: 'bg-[#1B060C] text-[#C5A5AC] border border-[rgba(247,214,220,0.1)]',
    accent: 'bg-[#8E2B44] text-[#FDF2F4]'
  };

  const dotColors = {
    available: 'bg-emerald-400',
    occupied: 'bg-[#B23C59]',
    active: 'bg-[#E07A94]',
    maintenance: 'bg-zinc-400',
    fixed: 'bg-[#B23C59]',
    floating: 'bg-[#E07A94]',
    neutral: 'bg-zinc-400',
    accent: 'bg-[#F7D6DC]'
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-xs px-3 py-1 gap-2'
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span className={clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant] || 'bg-white')} />
          )}
          <span className={clsx('relative inline-flex rounded-full h-1.5 w-1.5', dotColors[variant] || 'bg-white')} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
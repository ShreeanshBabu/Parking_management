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
    available: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    occupied: 'bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700',
    active: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    maintenance: 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800',
    fixed: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700',
    floating: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700',
    neutral: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
    accent: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
  };

  const dotColors = {
    available: 'bg-emerald-500',
    occupied: 'bg-zinc-400',
    active: 'bg-amber-500',
    maintenance: 'bg-zinc-400',
    fixed: 'bg-zinc-500',
    floating: 'bg-zinc-500',
    neutral: 'bg-zinc-400',
    accent: 'bg-zinc-900 dark:bg-white'
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
            <span className={clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant] || 'bg-current')} />
          )}
          <span className={clsx('relative inline-flex rounded-full h-1.5 w-1.5', dotColors[variant] || 'bg-current')} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}

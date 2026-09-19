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
  const baseStyles = 'rounded-xl transition-colors duration-150';

  const variants = {
    surface: 'bg-white dark:bg-[#121215] text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800 shadow-sm',
    elevated: 'bg-white dark:bg-[#18181B] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-sm',
    secondary: 'bg-zinc-50 dark:bg-[#0D0D10] text-zinc-900 dark:text-zinc-100 border border-zinc-200/60 dark:border-zinc-800/60',
    glass: 'bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800',
    accent: 'bg-white dark:bg-[#16161C] border border-zinc-300 dark:border-zinc-700 shadow-sm',
  };

  const hoverStyles = hover ? 'hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50/80 dark:hover:bg-[#18181F] cursor-pointer' : '';

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

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm font-semibold',
    secondary: 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-100 dark:bg-[#18181B] dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80 font-medium',
    accent: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
    outline: 'bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80',
    ghost: 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2',
    xl: 'text-base px-7 py-3.5 gap-2.5 font-semibold'
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className={clsx('w-4 h-4', size === 'lg' && 'w-4 h-4', size === 'xl' && 'w-5 h-5')} />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={clsx('w-4 h-4', size === 'lg' && 'w-4 h-4', size === 'xl' && 'w-5 h-5')} />
      )}
    </button>
  );
}

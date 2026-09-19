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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-wine-400 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[#8E2B44] hover:bg-[#B23C59] active:bg-[#6D1D32] text-[#FDF2F4] border border-[#B23C59]/40 shadow-sm',
    secondary: 'bg-[#1B060C] hover:bg-[#240911] text-[#FDF2F4] border border-[rgba(247,214,220,0.12)] hover:border-[rgba(247,214,220,0.25)]',
    accent: 'bg-[#B23C59] hover:bg-[#CC5671] text-[#FDF2F4] border border-[#E07A94]/30',
    outline: 'bg-transparent border border-[rgba(247,214,220,0.15)] text-[#FDF2F4] hover:border-[#8E2B44] hover:bg-[#1B060C]/60 hover:text-[#F7D6DC]',
    ghost: 'bg-transparent text-[#C5A5AC] hover:text-[#FDF2F4] hover:bg-[#1B060C]',
    danger: 'bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/40'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2 font-medium tracking-wide',
    xl: 'text-base px-7 py-3.5 gap-2.5 font-semibold tracking-wide'
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
        <Icon className={clsx('w-4 h-4 transition-transform group-hover:translate-x-0.5', size === 'lg' && 'w-4 h-4', size === 'xl' && 'w-5 h-5')} />
      )}
    </button>
  );
}
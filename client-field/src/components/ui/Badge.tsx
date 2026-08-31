import React from 'react';

export type BadgeVariant = 'safe' | 'caution' | 'danger' | 'info' | 'success' | 'warning' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  safe: 'bg-emerald-100 text-emerald-700 border border-emerald-200/50',
  caution: 'bg-amber-100 text-amber-700 border border-amber-200/50',
  danger: 'bg-red-100 text-red-700 border border-red-200/50',
  info: 'bg-blue-100 text-blue-700 border border-blue-200/50',
  success: 'bg-teal-100 text-teal-700 border border-teal-200/50',
  warning: 'bg-orange-100 text-orange-700 border border-orange-200/50',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200/50',
};

const sizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'safe',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${variants[variant]} ${sizes[size]} ${className}`.trim()}
    {...props}
  >
    {icon && <span className="flex-shrink-0">{icon}</span>}
    {children}
  </span>
);

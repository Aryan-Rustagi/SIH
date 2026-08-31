import React from 'react';

export type BadgeVariant = 'safe' | 'caution' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  safe: 'bg-green-100 text-green-700',
  caution: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'safe', children, className = '', ...props }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${variants[variant]} ${className}`.trim()} {...props}>
    {children}
  </span>
);

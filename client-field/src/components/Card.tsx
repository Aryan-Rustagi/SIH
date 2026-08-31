import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  ...props
}) => {
  const variantClass =
    variant === 'elevated'
      ? 'bg-white border border-slate-200/80 rounded-2xl shadow-lg shadow-slate-500/10 hover:shadow-xl hover:shadow-slate-500/15'
      : variant === 'outlined'
      ? 'bg-slate-50/40 border border-slate-200/60 rounded-2xl backdrop-blur-sm'
      : 'bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md';

  const interactiveClass = interactive ? 'transition-all duration-300 hover:scale-[1.02] cursor-pointer' : '';

  return (
    <div
      className={`${variantClass} ${interactiveClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

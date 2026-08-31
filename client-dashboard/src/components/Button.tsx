import React from 'react';

type ButtonVariant = 'primary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const variantClass = variant === 'danger'
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-blue-600 hover:bg-blue-700';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2 font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

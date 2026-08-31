import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 hover:scale-105',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-xl py-3 px-6 font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`.trim()}
    {...props}
  >
    {children}
  </button>
);

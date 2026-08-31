import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  label?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      icon,
      iconPosition = 'left',
      error,
      label,
      hint,
      ...props
    },
    ref
  ) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 border ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-slate-200 focus:ring-teal-500'
          } rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${className}`.trim()}
          {...props}
        />
        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
              iconPosition === 'left' ? 'left-3' : 'right-3'
            }`}
          >
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-sm text-slate-500">{hint}</p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

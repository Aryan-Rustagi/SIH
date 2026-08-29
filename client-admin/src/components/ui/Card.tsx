import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition-all duration-200 ${className}`.trim()} {...props}>
    {children}
  </div>
);

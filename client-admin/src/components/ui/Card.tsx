import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 ${className}`.trim()} {...props}>
    {children}
  </div>
);

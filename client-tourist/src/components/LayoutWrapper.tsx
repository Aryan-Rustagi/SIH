import React from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
    {children}
  </div>
);

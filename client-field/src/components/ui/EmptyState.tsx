import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60">
      <div className="mb-4 p-3 rounded-full bg-slate-200/50">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-600 text-center max-w-xs mb-6">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

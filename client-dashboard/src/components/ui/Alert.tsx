import React from 'react';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  title: string;
  description?: string;
  onClose?: () => void;
  closeable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons: Record<AlertType, React.ReactNode> = {
  success: <CheckCircle2 size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

const colors: Record<AlertType, string> = {
  success: 'bg-emerald-50 border-emerald-200/60 text-emerald-900',
  error: 'bg-red-50 border-red-200/60 text-red-900',
  info: 'bg-blue-50 border-blue-200/60 text-blue-900',
  warning: 'bg-amber-50 border-amber-200/60 text-amber-900',
};

const iconColors: Record<AlertType, string> = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  warning: 'text-amber-600',
};

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  description,
  onClose,
  closeable = true,
  action,
}) => {
  return (
    <div className={`rounded-lg border ${colors[type]} p-4 flex gap-4 animate-slide-up`}>
      <div className={`flex-shrink-0 ${iconColors[type]} pt-0.5`}>
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        {description && (
          <div className="text-sm mt-1 opacity-90">{description}</div>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex-shrink-0 text-sm font-semibold underline hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          {action.label}
        </button>
      )}
      {closeable && onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

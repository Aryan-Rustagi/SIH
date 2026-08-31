import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  onClose: () => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

const colors: Record<ToastType, string> = {
  success: 'bg-emerald-50 border-emerald-200/60 text-emerald-800',
  error: 'bg-red-50 border-red-200/60 text-red-800',
  info: 'bg-blue-50 border-blue-200/60 text-blue-800',
  warning: 'bg-amber-50 border-amber-200/60 text-amber-800',
};

const iconColors: Record<ToastType, string> = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  warning: 'text-amber-600',
};

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  onClose,
  duration = 5000,
  action,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`rounded-lg border ${colors[type]} shadow-lg backdrop-blur-sm p-4 flex gap-3 max-w-md`}
      >
        <div className={`flex-shrink-0 ${iconColors[type]}`}>
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{title}</div>
          {message && <div className="text-xs mt-1 opacity-90">{message}</div>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="flex-shrink-0 text-sm font-semibold underline hover:opacity-70 transition-opacity"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

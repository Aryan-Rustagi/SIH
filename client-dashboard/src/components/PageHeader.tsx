import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  action?: React.ReactNode;
  backButton?: boolean;
  icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  subtitle,
  action,
  backButton,
  icon,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {backButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
        )}
        <div className="flex items-center gap-3">
          {icon && <div className="text-teal-600">{icon}</div>}
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mt-1">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-slate-600 mt-2 max-w-xl">{description}</p>
            )}
          </div>
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

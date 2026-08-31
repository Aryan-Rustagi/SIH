import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'green' | 'red' | 'amber' | 'blue' | 'indigo' | 'emerald' | 'orange';
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  color = 'green',
  description,
}) => {
  const colorClasses: Record<string, { bg: string; text: string; accent: string }> = {
    green: {
      bg: 'bg-green-50/80 border-green-200/50',
      text: 'text-green-600',
      accent: 'from-green-500 to-green-600',
    },
    red: {
      bg: 'bg-red-50/80 border-red-200/50',
      text: 'text-red-600',
      accent: 'from-red-500 to-red-600',
    },
    amber: {
      bg: 'bg-amber-50/80 border-amber-200/50',
      text: 'text-amber-600',
      accent: 'from-amber-500 to-amber-600',
    },
    blue: {
      bg: 'bg-blue-50/80 border-blue-200/50',
      text: 'text-blue-600',
      accent: 'from-blue-500 to-blue-600',
    },
    indigo: {
      bg: 'bg-indigo-50/80 border-indigo-200/50',
      text: 'text-indigo-600',
      accent: 'from-indigo-500 to-indigo-600',
    },
    emerald: {
      bg: 'bg-emerald-50/80 border-emerald-200/50',
      text: 'text-emerald-600',
      accent: 'from-emerald-500 to-emerald-600',
    },
    orange: {
      bg: 'bg-orange-50/80 border-orange-200/50',
      text: 'text-orange-600',
      accent: 'from-orange-500 to-orange-600',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5">
      {/* Header with icon and trend */}
      <div className="flex justify-between items-start">
        <div className={`p-3.5 rounded-xl border ${colors.bg} ${colors.text} shadow-sm`}>
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              trendUp
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                : 'bg-rose-50 text-rose-700 border-rose-200/50'
            }`}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>

      {/* Values */}
      <div>
        <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
          {value}
        </h3>
        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{title}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

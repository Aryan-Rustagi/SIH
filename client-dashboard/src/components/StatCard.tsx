import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'teal' | 'red' | 'amber' | 'blue' | 'indigo';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, color = 'teal' }) => {
  const colors = {
    teal: 'bg-teal-50 text-teal-600 border-teal-100 shadow-teal-500/10',
    red: 'bg-red-50 text-red-600 border-red-100 shadow-red-500/10',
    amber: 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10',
    blue: 'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-500/10',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-500/10',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className={`p-3.5 rounded-xl border shadow-sm ${colors[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${trendUp ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-4xl font-black text-slate-800 tracking-tight">{value}</h3>
        <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">{title}</p>
      </div>
    </div>
  );
};

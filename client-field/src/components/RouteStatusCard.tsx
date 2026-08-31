import React from 'react';
import { Navigation, ShieldCheck, AlertTriangle } from 'lucide-react';

interface RouteStatusCardProps {
  name: string;
  condition: string;
  riskLevel: string;
}

export const RouteStatusCard: React.FC<RouteStatusCardProps> = ({ name, condition, riskLevel }) => {
  const getConditionConfig = (cond: string) => {
    switch (cond) {
      case 'OPEN':
        return { color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: <ShieldCheck size={14} /> };
      case 'PARTIALLY_BLOCKED':
        return { color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: <AlertTriangle size={14} /> };
      case 'CLOSED':
        return { color: '#ef4444', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: <AlertTriangle size={14} /> };
      default:
        return { color: '#64748b', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', icon: null };
    }
  };

  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-emerald-100 text-emerald-800 border-emerald-200/60';
      case 'MEDIUM': return 'bg-amber-100 text-amber-800 border-amber-200/60';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200/60';
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200/60';
      default: return 'bg-slate-100 text-slate-600 border-slate-200/60';
    }
  };

  const cfg = getConditionConfig(condition);

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-default"
      style={{ borderLeft: `4px solid ${cfg.color}` }}
    >
      <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center flex-shrink-0`}>
        <Navigation size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-teal-700 transition-colors">{name}</h4>
        <div className="flex items-center gap-1.5 mt-1">
          {cfg.icon}
          <span className={`text-xs font-bold ${cfg.text}`}>{condition.replace(/_/g, ' ')}</span>
        </div>
      </div>
      <div className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${getRiskConfig(riskLevel)}`}>
        {riskLevel}
      </div>
    </div>
  );
};

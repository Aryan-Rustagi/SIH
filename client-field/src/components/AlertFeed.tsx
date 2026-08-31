import React from 'react';
import { AlertTriangle, Clock, Radio } from 'lucide-react';

interface Alert {
  _id: string;
  message: string;
  severity: string;
  type: string;
}

export const AlertFeed: React.FC<{ alerts: Alert[] }> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const getSeverityConfig = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-600 text-white', dot: 'bg-red-500' };
      case 'HIGH': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-500 text-white', dot: 'bg-orange-500' };
      case 'MEDIUM': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-500 text-white', dot: 'bg-amber-500' };
      default: return { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', badge: 'bg-sky-500 text-white', dot: 'bg-sky-500' };
    }
  };

  return (
    <div className="my-6">
      <h3 className="flex items-center gap-2 mb-4 font-bold text-base text-slate-800">
        <div className="relative">
          <Radio size={18} className="text-red-500" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </div>
        Active Alerts
        <span className="ml-auto text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{alerts.length}</span>
      </h3>
      <div className="flex flex-col gap-3">
        {alerts.map((a, i) => {
          const cfg = getSeverityConfig(a.severity);
          return (
            <div
              key={a._id}
              className={`${cfg.bg} ${cfg.border} border rounded-2xl p-4 transition-all duration-200 hover:shadow-md`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge}`}>
                      {a.severity}
                    </span>
                    <span className={`text-xs font-semibold ${cfg.text}`}>{a.type.replace(/_/g, ' ')}</span>
                  </div>
                  <p className={`text-sm font-medium ${cfg.text} leading-relaxed`}>{a.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

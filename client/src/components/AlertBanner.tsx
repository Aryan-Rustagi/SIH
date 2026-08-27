import React from 'react';
import { useAlerts } from '../context/AlertContext';
import { ShieldAlert, Radio, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AlertBanner: React.FC = () => {
  const { myActiveAlert, activeAlerts } = useAlerts();
  const { user } = useAuth();

  const isResponder = user?.role === 'ADMIN' || user?.role === 'RESPONDER';

  if (myActiveAlert) {
    return (
      <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white px-4 py-2.5 shadow-lg border-b border-rose-500/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 animate-spin text-amber-200" />
            <span>YOUR SOS EMERGENCY IS ACTIVE — RESCUE TEAMS HAVE BEEN DISPATCHED</span>
          </div>
          <span className="bg-black/30 px-3 py-1 rounded-full text-xs font-mono">
            {myActiveAlert.status}
          </span>
        </div>
      </div>
    );
  }

  if (isResponder && activeAlerts.length > 0) {
    return (
      <div className="bg-gradient-to-r from-red-800 via-rose-900 to-red-800 text-white px-4 py-2 shadow-lg border-b border-red-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>
              {activeAlerts.length} ACTIVE TOURIST SOS {activeAlerts.length === 1 ? 'ALERT' : 'ALERTS'} IN QUEUE
            </span>
          </div>
          <Link
            to="/admin"
            className="flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-all"
          >
            Open Dispatch Console <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

import React from 'react';
import { RefreshCw, CheckCircle2, WifiOff, Wifi } from 'lucide-react';

export const OfflineSyncIndicator: React.FC<{ isOnline: boolean; pendingCount: number }> = ({ isOnline, pendingCount }) => {
  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 p-3.5 rounded-2xl flex items-center justify-between text-sm font-bold text-white shadow-xl
      ${isOnline
        ? (pendingCount > 0
          ? 'bg-gradient-to-r from-amber-500 to-amber-600'
          : 'bg-gradient-to-r from-emerald-500 to-emerald-600')
        : 'bg-gradient-to-r from-slate-600 to-slate-700'}`
    }
    style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2.5">
        {isOnline ? (
          pendingCount > 0
            ? <RefreshCw size={16} className="animate-spin" />
            : <CheckCircle2 size={16} />
        ) : (
          <WifiOff size={16} />
        )}
        <span>
          {isOnline
            ? (pendingCount > 0 ? `Syncing ${pendingCount} reports...` : 'Online — All Synced')
            : 'Offline — Queuing Reports Locally'
          }
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
        {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
      </div>
    </div>
  );
};

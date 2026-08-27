import React from 'react';
import {
  ShieldCheck,
  AlertCircle,
  Clock,
  MapPin,
  Flame,
  UserX,
  Stethoscope,
  HelpCircle,
} from 'lucide-react';

export interface IncidentData {
  _id: string;
  title: string;
  description: string;
  category: 'THEFT' | 'HARASSMENT' | 'SCAM' | 'MEDICAL' | 'NATURAL_HAZARD' | 'OTHER';
  latitude: number;
  longitude: number;
  address?: string;
  isVerified: boolean;
  createdAt: string;
  userId?: {
    name?: string;
  };
}

export const IncidentCard: React.FC<{
  incident: IncidentData;
  onVerifyToggle?: () => void;
  showAdminControls?: boolean;
}> = ({ incident, onVerifyToggle, showAdminControls }) => {
  const getCategoryIcon = (category: IncidentData['category']) => {
    switch (category) {
      case 'THEFT':
        return <UserX className="w-4 h-4 text-amber-400" />;
      case 'HARASSMENT':
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      case 'SCAM':
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case 'MEDICAL':
        return <Stethoscope className="w-4 h-4 text-emerald-400" />;
      case 'NATURAL_HAZARD':
        return <Flame className="w-4 h-4 text-red-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-sky-400" />;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="glass-card rounded-xl p-4 border flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
              {getCategoryIcon(incident.category)}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {incident.category.replace('_', ' ')}
              </span>
              <h4 className="text-sm font-bold text-white leading-tight">
                {incident.title}
              </h4>
            </div>
          </div>

          {incident.isVerified ? (
            <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          ) : (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Unverified
            </span>
          )}
        </div>

        <p className="text-xs text-slate-300 mt-2 mb-3 line-clamp-3">
          {incident.description}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-500" />
          <span>{incident.address || `${incident.latitude.toFixed(3)}, ${incident.longitude.toFixed(3)}`}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <Clock className="w-3 h-3" />
          <span>{formatDate(incident.createdAt)}</span>
        </div>

        {showAdminControls && onVerifyToggle && (
          <button
            onClick={onVerifyToggle}
            className={`mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              incident.isVerified
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
            }`}
          >
            {incident.isVerified ? 'Revoke Verification' : 'Verify & Publish'}
          </button>
        )}
      </div>
    </div>
  );
};

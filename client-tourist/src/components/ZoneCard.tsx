import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info, MapPin } from 'lucide-react';

export interface SafetyZoneData {
  _id: string;
  name: string;
  description?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

export const ZoneCard: React.FC<{
  zone: SafetyZoneData;
  distanceMeters?: number;
  onSelect?: () => void;
}> = ({ zone, distanceMeters, onSelect }) => {
  const getRiskBadge = (level: SafetyZoneData['riskLevel']) => {
    switch (level) {
      case 'LOW':
        return {
          label: 'Safe Haven / Verified Zone',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
          classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'MEDIUM':
        return {
          label: 'Moderate Caution',
          icon: <Info className="w-4 h-4 text-amber-400" />,
          classes: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      case 'HIGH':
        return {
          label: 'High Risk / Alert Area',
          icon: <AlertTriangle className="w-4 h-4 text-orange-400" />,
          classes: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        };
      case 'CRITICAL':
        return {
          label: 'Critical Hazard / Red Zone',
          icon: <AlertOctagon className="w-4 h-4 text-rose-400" />,
          classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse',
        };
    }
  };

  const badge = getRiskBadge(zone.riskLevel);

  return (
    <div
      onClick={onSelect}
      className="glass-card rounded-xl p-4 border flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
            {zone.name}
          </h4>
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.classes}`}
          >
            {badge.icon}
            {zone.riskLevel}
          </span>
        </div>

        <p className="text-xs text-slate-300 line-clamp-2 mb-3">
          {zone.description || 'Monitored area with perimeter surveillance and safety assistance.'}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span>
            {zone.latitude.toFixed(3)}, {zone.longitude.toFixed(3)}
          </span>
        </div>
        <div className="text-slate-400 font-mono">
          Radius: {zone.radiusMeters}m {distanceMeters !== undefined && `• ~${distanceMeters}m away`}
        </div>
      </div>
    </div>
  );
};

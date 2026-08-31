import React from 'react';
import { CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-200/40 p-5 mt-4">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-blue-400/10 to-indigo-400/15" />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <CloudRain size={26} className="text-white" />
            </div>
            {/* Animated rain dots */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full animate-ping opacity-40" />
          </div>
          <div>
            <div className="text-xs text-sky-600 font-bold uppercase tracking-wider mb-0.5">Current Weather</div>
            <div className="text-3xl font-black text-slate-800 tracking-tight">22°C</div>
            <div className="text-sm font-semibold text-sky-700 mt-0.5">Heavy Rain</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white/60 px-2.5 py-1 rounded-lg">
            <Wind size={13} className="text-sky-500" /> 15 km/h
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white/60 px-2.5 py-1 rounded-lg">
            <Droplets size={13} className="text-sky-500" /> 89%
          </div>
          <div className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-full uppercase tracking-wider mt-1">
            ⚠ High Landslide Risk
          </div>
        </div>
      </div>
    </div>
  );
};

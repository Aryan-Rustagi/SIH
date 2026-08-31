import React from 'react';
import { Bell, Search, ShieldCheck, LogOut, Radio } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardTopBar: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="relative w-72 sm:w-96">
        <Search className="absolute left-3.5 top-2.5 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search corridors, fleet, alerts, districts..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:font-normal"
        />
      </div>
      
      {/* Right controls */}
      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-bold">
          <Radio size={12} className="text-emerald-500 animate-pulse" /> Live Telemetry
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="text-left leading-tight hidden md:block">
            <div className="text-xs font-bold text-slate-800">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-teal-600 font-semibold uppercase">Central Command</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

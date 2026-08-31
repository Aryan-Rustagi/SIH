import React from 'react';
import { Bell, Search, ShieldCheck, LogOut, Radio, MoreVertical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardTopBar: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      {/* Search */}
      <div className="relative w-72 sm:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search corridors, fleet, alerts..."
          className="w-full pl-12 pr-4 py-2.5 bg-slate-50/50 border border-slate-200/60 rounded-lg text-sm font-medium focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-500/10 transition-all placeholder:text-slate-400"
        />
      </div>
      
      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 text-emerald-700 border border-emerald-200/50 text-[11px] font-bold shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Telemetry
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200/50 hidden sm:block" />

        {/* Notification Icon */}
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative group">
          <Bell size={18} className="text-slate-600 group-hover:text-slate-800" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200/50">
          <div className="text-left leading-tight hidden md:block">
            <div className="text-sm font-semibold text-slate-800">{user?.name || 'Administrator'}</div>
            <div className="text-xs text-green-600 font-medium">Central Command</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all">
            {user?.name?.charAt(0) || 'A'}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50/80 rounded-lg transition-all duration-200"
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Truck, Navigation, AlertTriangle, FileWarning, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-navy-950 text-slate-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white mb-2 relative z-10">
          <Shield size={28} className="text-teal-400 drop-shadow-md" />
          <span className="font-bold text-xl tracking-tight leading-tight">Command<br/>Center</span>
        </div>
        <div className="text-xs text-navy-400 font-bold tracking-wider uppercase mt-8 mb-3 pl-1">Logistics Network</div>
        <nav className="flex flex-col gap-1.5">
          <NavLink to="/" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'hover:bg-navy-800 hover:text-white border border-transparent'}`}>
            <LayoutDashboard size={18} /> Overview
          </NavLink>
          <NavLink to="/districts" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'hover:bg-navy-800 hover:text-white border border-transparent'}`}>
            <Map size={18} /> District Connectivity
          </NavLink>
          <NavLink to="/vehicles" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'hover:bg-navy-800 hover:text-white border border-transparent'}`}>
            <Truck size={18} /> Deliveries & Vehicles
          </NavLink>
          <NavLink to="/routes" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'hover:bg-navy-800 hover:text-white border border-transparent'}`}>
            <Navigation size={18} /> Route Management
          </NavLink>
        </nav>

        <div className="text-xs text-navy-400 font-bold tracking-wider uppercase mt-8 mb-3 pl-1">Field Operations</div>
        <nav className="flex flex-col gap-1.5">
          <NavLink to="/alerts" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'hover:bg-navy-800 hover:text-white border border-transparent'}`}>
            <AlertTriangle size={18} /> Disruption Alerts
          </NavLink>
          <NavLink to="/reports" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'hover:bg-navy-800 hover:text-white border border-transparent'}`}>
            <FileWarning size={18} /> Field Reports
          </NavLink>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-navy-800">
        <div className="flex items-center gap-3 bg-navy-900 p-3 rounded-xl border border-white/5 relative group cursor-pointer" onClick={logout}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-500/20 group-hover:opacity-0 transition-opacity">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="absolute left-3 w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20">
             <LogOut size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{user?.name || 'Admin'}</div>
            <div className="text-xs text-navy-400 group-hover:opacity-0 transition-opacity">{user?.role || 'Administrator'}</div>
            <div className="text-xs text-red-400 absolute bottom-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Click to Logout</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

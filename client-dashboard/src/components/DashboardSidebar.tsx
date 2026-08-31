import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Truck, Navigation, AlertTriangle, FileWarning, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white text-slate-600 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-200">
      <div className="p-6">
        <div className="flex items-center gap-3 text-slate-900 mb-2 relative z-10">
          <Shield size={28} className="text-green-600 drop-shadow-sm" />
          <span className="font-bold text-xl tracking-tight leading-tight">Command<br/>Center</span>
        </div>
        <div className="text-xs text-slate-400 font-bold tracking-wider uppercase mt-8 mb-3 pl-1">Logistics Network</div>
        <nav className="flex flex-col gap-1.5">
          <NavLink to="/" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
            <LayoutDashboard size={18} /> Overview
          </NavLink>
          <NavLink to="/districts" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
            <Map size={18} /> District Connectivity
          </NavLink>
          <NavLink to="/vehicles" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
            <Truck size={18} /> Deliveries & Vehicles
          </NavLink>
          <NavLink to="/routes" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
            <Navigation size={18} /> Route Management
          </NavLink>
        </nav>

        <div className="text-xs text-slate-400 font-bold tracking-wider uppercase mt-8 mb-3 pl-1">Field Operations</div>
        <nav className="flex flex-col gap-1.5">
          <NavLink to="/alerts" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-red-50 text-red-700 border border-red-200' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
            <AlertTriangle size={18} /> Disruption Alerts
          </NavLink>
          <NavLink to="/reports" className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}>
            <FileWarning size={18} /> Field Reports
          </NavLink>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 relative group cursor-pointer" onClick={logout}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center font-bold shadow-sm group-hover:opacity-0 transition-opacity">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="absolute left-3 w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-red-200">
             <LogOut size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">{user?.name || 'Admin'}</div>
            <div className="text-xs text-slate-500 group-hover:opacity-0 transition-opacity">{user?.role || 'Administrator'}</div>
            <div className="text-xs text-red-600 absolute bottom-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Click to Logout</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

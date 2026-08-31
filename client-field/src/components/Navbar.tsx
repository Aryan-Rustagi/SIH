import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, Menu, X, Shield, LogOut, Navigation, AlertTriangle, FileWarning } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
      <div className="container flex justify-between items-center h-16">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
            <Truck size={20} />
          </div>
          <div>
            <div className="font-black text-lg tracking-tight text-slate-800 leading-none">NER Logistics</div>
            <div className="text-[10px] text-green-600 font-bold tracking-widest uppercase mt-0.5">Field Portal</div>
          </div>
        </Link>
        
        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg ${
                    isActive ? 'text-green-700 bg-green-50 font-bold' : 'text-slate-600 hover:text-green-600'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/route-checker"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg ${
                    isActive ? 'text-green-700 bg-green-50 font-bold' : 'text-slate-600 hover:text-green-600'
                  }`
                }
              >
                Route Checker
              </NavLink>
              <NavLink
                to="/deliveries"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg ${
                    isActive ? 'text-green-700 bg-green-50 font-bold' : 'text-slate-600 hover:text-green-600'
                  }`
                }
              >
                Deliveries
              </NavLink>

              <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user?.name?.charAt(0) || 'O'}
                  </div>
                  <div className="text-left leading-tight hidden lg:block">
                    <div className="text-xs font-bold text-slate-800">{user?.name || 'Officer'}</div>
                    <div className="text-[10px] text-green-600 font-semibold">{user?.assignedDistrict || 'Kamrup'}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              Field Officer Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {isAuthenticated && (
            <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0) || 'O'}
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-green-600 rounded-lg"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 flex flex-col gap-3 animate-slide-down">
          {isAuthenticated ? (
            <>
              <div className="p-3 bg-slate-50 rounded-xl mb-1 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-800">{user?.name}</div>
                  <div className="text-xs text-green-600 font-semibold">{user?.assignedDistrict || 'Assigned: Kamrup'}</div>
                </div>
                <button onClick={logout} className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                  Logout
                </button>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-slate-700 py-2 border-b border-slate-100"
              >
                📊 Dashboard
              </Link>
              <Link
                to="/report-disruption"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-red-600 py-2 border-b border-slate-100 flex items-center gap-2"
              >
                <AlertTriangle size={16} /> Report Road Disruption
              </Link>
              <Link
                to="/upload-report"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-amber-600 py-2 border-b border-slate-100 flex items-center gap-2"
              >
                <FileWarning size={16} /> Upload Ground Report
              </Link>
              <Link
                to="/route-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-green-700 py-2 border-b border-slate-100 flex items-center gap-2"
              >
                <Navigation size={16} /> AI Route Checker
              </Link>
              <Link
                to="/deliveries"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-slate-700 py-2"
              >
                🚚 Incoming Deliveries
              </Link>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary text-center">
              Field Officer Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

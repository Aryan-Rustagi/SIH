import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAlerts } from '../context/AlertContext';
import {
  ShieldAlert,
  Shield,
  MapPin,
  FileWarning,
  Users,
  LogOut,
  LogIn,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { myActiveAlert } = useAlerts();
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SafeTour
              </span>
              <span className="text-xs ml-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20">
                Tourist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isCurrent('/')
                  ? 'bg-slate-800 text-rose-400 font-semibold shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Tourist Portal
            </Link>

            <Link
              to="/zones"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                isCurrent('/zones')
                  ? 'bg-slate-800 text-rose-400 font-semibold shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              Safety Zones
            </Link>

            <Link
              to="/report"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                isCurrent('/report')
                  ? 'bg-slate-800 text-rose-400 font-semibold shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileWarning className="w-4 h-4 text-amber-400" />
              Report Incident
            </Link>

            {isAuthenticated && (
              <Link
                to="/contacts"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                  isCurrent('/contacts')
                    ? 'bg-slate-800 text-rose-400 font-semibold shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Users className="w-4 h-4 text-sky-400" />
                Emergency Contacts
              </Link>
            )}
          </nav>

          {/* User Profile & Action Buttons */}
          <div className="flex items-center gap-3">
            {myActiveAlert && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-300 text-xs font-semibold animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                SOS Active
              </div>
            )}

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-200">{user.name}</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

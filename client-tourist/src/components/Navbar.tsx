import React, { useState } from 'react';
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
  Menu,
  X,
  Info,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { myActiveAlert } = useAlerts();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = (path: string) => location.pathname === path;

  const close = () => setMenuOpen(false);

  const links = (
    <>
      <Link to="/" className={`nav-link${isCurrent('/') ? ' active' : ''}`} onClick={close}>
        Home
      </Link>
      <Link to="/dashboard" className={`nav-link${isCurrent('/dashboard') ? ' active' : ''}`} onClick={close}>
        Dashboard
      </Link>
      <Link to="/zones" className={`nav-link${isCurrent('/zones') ? ' active' : ''}`} onClick={close}>
        <MapPin size={16} color="#34d399" />
        Safety Zones
      </Link>
      <Link to="/report" className={`nav-link${isCurrent('/report') ? ' active' : ''}`} onClick={close}>
        <FileWarning size={16} color="#fbbf24" />
        Report
      </Link>
      {isAuthenticated && (
        <Link to="/contacts" className={`nav-link${isCurrent('/contacts') ? ' active' : ''}`} onClick={close}>
          <Users size={16} color="#38bdf8" />
          ICE Contacts
        </Link>
      )}
      <Link to="/about" className={`nav-link${isCurrent('/about') ? ' active' : ''}`} onClick={close}>
        <Info size={16} />
        About
      </Link>
    </>
  );

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={close}>
          <div className="navbar-brand-icon">
            <Shield size={22} color="#fff" />
          </div>
          <span className="navbar-brand-text">SafeTour</span>
          <span className="navbar-portal-badge badge badge-rose">Tourist</span>
        </Link>

        <nav>
          <ul className="navbar-links">{links}</ul>
        </nav>

        <div className="navbar-actions">
          {myActiveAlert && (
            <span className="badge badge-rose animate-pulse">
              <ShieldAlert size={14} />
              SOS Active
            </span>
          )}

          {isAuthenticated && user ? (
            <>
              <div className="navbar-user">
                <div className="navbar-user-name">{user.name}</div>
                <div className="navbar-user-role">{user.role}</div>
              </div>
              <button onClick={logout} title="Sign out" className="icon-btn" type="button">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <div className="navbar-desktop-cta flex items-center gap-sm">
              <button type="button" onClick={() => navigate('/login')} className="btn btn-ghost btn-sm">
                <LogIn size={16} />
                Sign In
              </button>
              <button type="button" onClick={() => navigate('/register')} className="btn btn-primary btn-sm">
                Get Started
              </button>
            </div>
          )}

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {links}
        {!isAuthenticated && (
          <div className="flex gap-sm mt-sm">
            <Link to="/login" className="btn btn-secondary btn-sm flex-1" onClick={close}>
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm flex-1" onClick={close}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

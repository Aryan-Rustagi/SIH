import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC<{ portal?: 'tourist' | 'admin' }> = ({ portal = 'tourist' }) => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="navbar-brand">
              <div className="navbar-brand-icon">
                <Shield size={20} color="#fff" />
              </div>
              <span className="navbar-brand-text">SafeTour Guardian</span>
            </div>
            <p className="footer-brand-desc">
              Real-time tourist safety, SOS dispatch, and crowd-sourced incident intelligence
              built for Smart India Hackathon.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Product</h4>
            {portal === 'tourist' ? (
              <>
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/dashboard" className="footer-link">Safety Dashboard</Link>
                <Link to="/zones" className="footer-link">Safety Zones</Link>
                <Link to="/report" className="footer-link">Report Incident</Link>
              </>
            ) : (
              <>
                <Link to="/" className="footer-link">Command Center</Link>
                <Link to="/zones" className="footer-link">Zone Management</Link>
              </>
            )}
          </div>
          <div>
            <h4 className="footer-heading">Project</h4>
            {portal === 'tourist' && <Link to="/about" className="footer-link">About &amp; SIH Brief</Link>}
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/register" className="footer-link">Create Account</Link>
          </div>
          <div>
            <h4 className="footer-heading">Emergency</h4>
            <a href="tel:112" className="footer-link">112 National Emergency</a>
            <a href="tel:1363" className="footer-link">1363 Tourist Helpline</a>
            <a href="tel:108" className="footer-link">108 Ambulance</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            SafeTour Guardian • SIH 2026 • {portal === 'admin' ? 'Police & Rescue Command' : 'Tourist Portal'}
          </p>
          <div className="footer-tech-badges">
            <span className="tech-badge">MongoDB</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Socket.IO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

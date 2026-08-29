import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone } from 'lucide-react';

const emergencyNumbers = [
  { label: 'National Emergency', num: '112' },
  { label: 'Tourist Helpline', num: '1363' },
  { label: 'Ambulance', num: '108' },
];

export const Footer: React.FC<{ portal?: 'tourist' | 'admin' }> = ({ portal = 'tourist' }) => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand-col">
            <div className="navbar-brand" style={{ marginBottom: 0 }}>
              <div className="navbar-brand-icon">
                <Shield size={18} color="#fff" />
              </div>
              <span className="navbar-brand-text">SafeTour Guardian</span>
            </div>
            <p className="footer-brand-desc">
              Real-time tourist safety, one-touch SOS dispatch, crowd-sourced incident intelligence,
              and live police command — built for Smart India Hackathon 2026.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="footer-heading">Product</h4>
            {portal === 'tourist' ? (
              <>
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/dashboard" className="footer-link">Safety Dashboard</Link>
                <Link to="/zones" className="footer-link">Safety Zones</Link>
                <Link to="/report" className="footer-link">Report Incident</Link>
                <Link to="/contacts" className="footer-link">ICE Contacts</Link>
              </>
            ) : (
              <>
                <Link to="/" className="footer-link">Command Center</Link>
                <Link to="/zones" className="footer-link">Zone Management</Link>
              </>
            )}
          </div>

          {/* About column */}
          <div>
            <h4 className="footer-heading">Project</h4>
            {portal === 'tourist' && (
              <Link to="/about" className="footer-link">About &amp; SIH Brief</Link>
            )}
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/register" className="footer-link">Create Account</Link>
          </div>

          {/* Emergency column */}
          <div>
            <h4 className="footer-heading">Emergency Lines</h4>
            {emergencyNumbers.map(e => (
              <a
                key={e.num}
                href={`tel:${e.num}`}
                className="footer-emergency-number"
                id={`footer-emergency-${e.num}`}
                aria-label={`Call ${e.label} at ${e.num}`}
              >
                <span className="footer-emergency-number-text">
                  <Phone size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  {e.label}
                </span>
                <span className="footer-emergency-number-num">{e.num}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © 2026 SafeTour Guardian &nbsp;·&nbsp; SIH 2026 &nbsp;·&nbsp;
            {portal === 'admin' ? 'Police & Rescue Command' : 'Tourist Portal'}
          </p>
          <div className="footer-tech-badges">
            {['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO'].map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

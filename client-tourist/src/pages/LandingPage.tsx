import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  MapPinned,
  FileWarning,
  Radio,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'SafeTour Guardian — Tourist Safety Platform';
  }, []);

  const features = [
    {
      icon: ShieldAlert,
      title: 'One-touch SOS',
      desc: 'Broadcast GPS, status, and a distress note to Police & Rescue Command in real time.',
      tone: 'icon-box-rose',
    },
    {
      icon: MapPinned,
      title: 'Safety maps',
      desc: 'Leaflet maps with geoBoundaries overlays for ILP, LWE, and sensitive border regions.',
      tone: 'icon-box-emerald',
    },
    {
      icon: FileWarning,
      title: 'Incident reporting',
      desc: 'Crowd-sourced theft, scam, and hazard reports verified by responders.',
      tone: 'icon-box-amber',
    },
    {
      icon: Radio,
      title: 'Live dispatch',
      desc: 'Socket.IO command console to acknowledge, deploy, and resolve SOS alerts.',
      tone: 'icon-box-sky',
    },
  ];

  const stack = ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO', 'Leaflet', 'JWT'];

  return (
    <div>
      <section className="hero container">
        <div className="sih-banner">
          <Sparkles size={14} />
          Smart India Hackathon • Tourist Safety
        </div>
        <h1>
          Travel India with a <span className="text-gradient">guardian on call</span>
        </h1>
        <p className="hero-subtitle">
          SafeTour Guardian connects tourists to emergency SOS, restricted-zone maps, ICE contacts,
          and a live police dispatch console — built as a production-ready MERN demo for SIH.
        </p>
        <div className="hero-actions">
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Try Demo Dashboard <ArrowRight size={16} />
          </Link>
          <Link to="/login" className="btn btn-outline btn-lg">
            Sign in
          </Link>
          <Link to="/about" className="btn btn-ghost btn-lg">
            Problem &amp; solution
          </Link>
        </div>
      </section>

      <section className="page-section container">
        <div className="section-heading">
          <p className="section-kicker">Capabilities</p>
          <h2>What judges can exercise in the demo</h2>
        </div>
        <div className="feature-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <article key={f.title} className="feature-card">
                <div className={`feature-icon icon-box ${f.tone}`}>
                  <Icon size={22} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-section container">
        <div className="section-heading">
          <p className="section-kicker">Tech stack</p>
          <h2>MERN + real-time geo intelligence</h2>
        </div>
        <div className="tech-stack-grid">
          {stack.map((name) => (
            <div key={name} className="tech-item">
              <span className="tech-item-name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section container">
        <div className="section-heading">
          <p className="section-kicker">Team</p>
          <h2>SIH squad (placeholder)</h2>
          <p className="text-secondary text-sm mt-sm">Replace names before the final pitch.</p>
        </div>
        <div className="team-grid">
          {['Lead', 'Backend', 'Frontend', 'Geo / ML'].map((role, i) => (
            <article key={role} className="card team-card">
              <div className="team-avatar">{role.slice(0, 1)}</div>
              <h4>Team Member {i + 1}</h4>
              <p className="text-muted text-xs mt-xs">{role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

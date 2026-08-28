import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SOSButton } from '../../components/SOSButton';
import { ZoneCard, SafetyZoneData } from '../../components/ZoneCard';
import { IncidentCard, IncidentData } from '../../components/IncidentCard';
import { SafetyMap } from '../../components/SafetyMap';
import api from '../../services/api';
import {
  ShieldCheck,
  PhoneCall,
  FileWarning,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const TouristHome: React.FC = () => {
  const [zones, setZones] = useState<SafetyZoneData[]>([]);
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = 'Dashboard — SafeTour Guardian';
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [zonesRes, incidentsRes] = await Promise.all([
        api.get('/safety-zones'),
        api.get('/incidents?verifiedOnly=true'),
      ]);

      if (zonesRes.data.success) {
        setZones(zonesRes.data.zones.slice(0, 4));
      }
      if (incidentsRes.data.success) {
        setIncidents(incidentsRes.data.incidents.slice(0, 4));
      }
    } catch (err) {
      console.warn('Dashboard data fetch warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const emergencyNumbers = [
    { title: 'Police / Emergency', number: '112', desc: 'National 24/7 Dispatch', icon: 'helpline-icon-police' },
    { title: 'Tourist Police Helpline', number: '1363', desc: 'Multilingual Assistance', icon: 'helpline-icon-tourist' },
    { title: 'Ambulance & Medical', number: '108', desc: 'Paramedics & Trauma', icon: 'helpline-icon-medical' },
    { title: 'Fire & Rescue', number: '101', desc: 'Fire Brigade', icon: 'helpline-icon-fire' },
  ];

  return (
    <div className="has-bottom-nav">
      <section className="container page">
        <div className="text-center" style={{ maxWidth: 640, margin: '0 auto 2rem' }}>
          <div className="sih-banner">
            <Sparkles size={14} />
            Tourist Safety & Rapid Emergency Network
          </div>
          <h1>
            Travel Safe, <span className="text-gradient">Stay Protected</span>
          </h1>
          <p className="hero-subtitle">
            Instant one-touch emergency response connected directly to local authorities, safe havens, and designated responders.
          </p>
        </div>

        <SOSButton />

        <div className="helpline-grid mt-xl" style={{ maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
          {emergencyNumbers.map((item) => (
            <a key={item.number} href={`tel:${item.number}`} className="helpline-card">
              <div>
                <div className="flex items-center justify-between mb-sm">
                  <div className={`helpline-icon ${item.icon}`}>
                    <PhoneCall size={16} />
                  </div>
                  <span className="helpline-number">{item.number}</span>
                </div>
                <h4 className="helpline-title">{item.title}</h4>
                <p className="helpline-desc">{item.desc}</p>
              </div>
              <span className="helpline-action">
                Tap to Call <ArrowRight size={12} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="container mb-xl">
        <div className="grid grid-3">
          <Link to="/zones" className="action-card">
            <div className="icon-box icon-box-md icon-box-emerald">
              <Compass size={22} />
            </div>
            <div>
              <h3 className="action-card-title">Safety Zones & Map</h3>
              <p className="action-card-desc">
                Discover safe havens, embassy shelters, police kiosks, and caution zones near you.
              </p>
            </div>
          </Link>
          <Link to="/report" className="action-card">
            <div className="icon-box icon-box-md icon-box-amber">
              <FileWarning size={22} />
            </div>
            <div>
              <h3 className="action-card-title">Report Incident</h3>
              <p className="action-card-desc">
                Warn fellow travelers of scams, theft, harassment, or road hazards in the vicinity.
              </p>
            </div>
          </Link>
          <Link to="/contacts" className="action-card">
            <div className="icon-box icon-box-md icon-box-sky">
              <Users size={22} />
            </div>
            <div>
              <h3 className="action-card-title">Emergency ICE Contacts</h3>
              <p className="action-card-desc">
                Keep family, guardians, and local embassy contacts ready for automatic SOS alerts.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="container mb-xl">
        {(zones.length > 0 || incidents.length > 0) && <SafetyMap zones={zones} incidents={incidents} />}
      </section>

      <section className="container">
        <div className="grid grid-2">
          <div>
            <div className="section-title-row">
              <div className="flex items-center gap-sm">
                <ShieldCheck size={20} color="#34d399" />
                <h3>Monitored Safety Zones</h3>
              </div>
              <Link to="/zones" className="link-accent">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {isLoading ? (
              <div className="grid grid-2">
                <div className="skeleton skeleton-card" />
                <div className="skeleton skeleton-card" />
              </div>
            ) : zones.length === 0 ? (
              <div className="empty-state">
                <ShieldCheck className="empty-state-icon" />
                <h3 className="empty-state-title">No safety zones yet</h3>
                <p className="empty-state-desc">Safe havens will appear here once responders publish them.</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {zones.map((zone) => (
                  <ZoneCard key={zone._id} zone={zone} />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="section-title-row">
              <div className="flex items-center gap-sm">
                <FileWarning size={20} color="#fbbf24" />
                <h3>Verified Incident Alerts</h3>
              </div>
              <Link to="/report" className="link-accent">
                Report New <ArrowRight size={14} />
              </Link>
            </div>
            {isLoading ? (
              <div className="grid grid-2">
                <div className="skeleton skeleton-card" />
                <div className="skeleton skeleton-card" />
              </div>
            ) : incidents.length === 0 ? (
              <div className="empty-state">
                <FileWarning className="empty-state-icon" />
                <h3 className="empty-state-title">All clear nearby</h3>
                <p className="empty-state-desc">No verified incidents in the public radar right now.</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {incidents.map((incident) => (
                  <IncidentCard key={incident._id} incident={incident} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

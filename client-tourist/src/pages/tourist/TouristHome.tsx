import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SOSButton } from '../../components/SOSButton';
import { ZoneCard, SafetyZoneData } from '../../components/ZoneCard';
import { IncidentCard, IncidentData } from '../../components/IncidentCard';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  PhoneCall,
  MapPin,
  FileWarning,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const TouristHome: React.FC = () => {
  const { user } = useAuth();
  const [zones, setZones] = useState<SafetyZoneData[]>([]);
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [currentRisk, setCurrentRisk] = useState<string>('LOW');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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
    { title: 'Police / Emergency', number: '112', desc: 'National 24/7 Dispatch', color: 'from-blue-600 to-indigo-700' },
    { title: 'Tourist Police Helpline', number: '1363', desc: 'Multilingual Assistance', color: 'from-emerald-600 to-teal-700' },
    { title: 'Ambulance & Medical', number: '108', desc: 'Paramedics & Trauma', color: 'from-rose-600 to-red-700' },
    { title: 'Fire & Rescue', number: '101', desc: 'Fire Brigade', color: 'from-amber-600 to-orange-700' },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero SOS Section */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-rose-400 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            Tourist Safety & Rapid Emergency Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Travel Safe, <span className="bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text text-transparent">Stay Protected</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Instant one-touch emergency response connected directly to local authorities, safe havens, and designated responders.
          </p>
        </div>

        {/* SOS Panic Trigger */}
        <div className="my-6">
          <SOSButton />
        </div>

        {/* Quick Dial Helplines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mt-10">
          {emergencyNumbers.map((item, idx) => (
            <a
              key={idx}
              href={`tel:${item.number}`}
              className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-black text-white font-mono">{item.number}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              <span className="mt-3 text-[11px] font-semibold text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Tap to Call <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Action Navigation Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/zones"
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 group transition-all flex items-start gap-4"
          >
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Safety Zones & Map
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Discover safe havens, embassy shelters, police kiosks, and caution zones near you.
              </p>
            </div>
          </Link>

          <Link
            to="/report"
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 group transition-all flex items-start gap-4"
          >
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <FileWarning className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Report Incident
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Warn fellow travelers of scams, theft, harassment, or road hazards in the vicinity.
              </p>
            </div>
          </Link>

          <Link
            to="/contacts"
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-700 group transition-all flex items-start gap-4"
          >
            <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                Emergency ICE Contacts
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Keep family, guardians, and local embassy contacts ready for automatic SOS alerts.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Live Verified Incidents & Safe Zones Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nearby Safety Zones */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Monitored Safety Zones</h3>
              </div>
              <Link
                to="/zones"
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {zones.length === 0 ? (
              <div className="glass-panel p-6 rounded-xl text-center text-xs text-slate-400">
                No safety zones recorded yet. Safe havens will appear here.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {zones.map((zone) => (
                  <ZoneCard key={zone._id} zone={zone} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Verified Incidents */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileWarning className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Verified Incident Alerts</h3>
              </div>
              <Link
                to="/report"
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                Report New <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {incidents.length === 0 ? (
              <div className="glass-panel p-6 rounded-xl text-center text-xs text-slate-400">
                No active safety warnings or incidents reported nearby. All clear!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

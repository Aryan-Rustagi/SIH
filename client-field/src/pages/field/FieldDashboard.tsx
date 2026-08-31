import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WeatherWidget } from '../../components/WeatherWidget';
import { RouteStatusCard } from '../../components/RouteStatusCard';
import { AlertFeed } from '../../components/AlertFeed';
import { OfflineSyncIndicator } from '../../components/OfflineSyncIndicator';
import { AIAssistantWidget } from '../../components/AIAssistantWidget';
import { useAuth } from '../../context/AuthContext';
import { Map, AlertTriangle, FileWarning, Navigation, Truck, RefreshCw, ShieldAlert, ArrowUpRight } from 'lucide-react';
import api from '../../services/api';

export const FieldDashboard: React.FC = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rRes, aRes] = await Promise.all([
        api.get('/routes'),
        api.get('/alerts/active')
      ]);
      if (rRes.data.success) setRoutes(rRes.data.routes || []);
      if (aRes.data.success) setAlerts(aRes.data.alerts || []);
    } catch (e) {
      console.error('Failed to fetch dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Field Officer Dashboard — NER Logistics';
    fetchData();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="pb-28 min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white pt-8 pb-14 px-4 rounded-b-[2rem] shadow-xl relative overflow-hidden">
        <div className="container max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-teal-400 font-bold text-xs tracking-widest uppercase">
                  Assigned Regional Sector
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                {user?.assignedDistrict || 'Kamrup Metropolitan'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Sector Officer: <span className="text-slate-200 font-semibold">{user?.name || 'Officer'}</span> ({user?.designation || 'Logistics Supervisor'})
              </p>
            </div>

            <button
              onClick={fetchData}
              disabled={loading}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold backdrop-blur-sm transition-colors"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>

          <WeatherWidget />
        </div>
      </div>

      {/* Main Container */}
      <div className="container max-w-4xl -mt-6 px-4">
        
        {/* Quick Action Matrix */}
        <div className="bg-white rounded-3xl shadow-elevated border border-slate-200/80 p-5 mb-8">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
            Quick Operational Actions
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <Link
              to="/report-disruption"
              className="flex flex-col items-center gap-2.5 p-4 bg-gradient-to-b from-red-50 to-red-50/40 border border-red-200/60 rounded-2xl hover:bg-red-100/60 transition-all duration-200 group text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                <AlertTriangle size={22} />
              </div>
              <div>
                <span className="text-xs font-bold text-red-900 block leading-tight">Report Disruption</span>
                <span className="text-[10px] text-red-600 font-medium">Landslide / Flood</span>
              </div>
            </Link>

            <Link
              to="/upload-report"
              className="flex flex-col items-center gap-2.5 p-4 bg-gradient-to-b from-amber-50 to-amber-50/40 border border-amber-200/60 rounded-2xl hover:bg-amber-100/60 transition-all duration-200 group text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <FileWarning size={22} />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 block leading-tight">Field Report</span>
                <span className="text-[10px] text-amber-600 font-medium">Geo-tagged Photos</span>
              </div>
            </Link>

            <Link
              to="/route-checker"
              className="flex flex-col items-center gap-2.5 p-4 bg-gradient-to-b from-teal-50 to-teal-50/40 border border-teal-200/60 rounded-2xl hover:bg-teal-100/60 transition-all duration-200 group text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Navigation size={22} />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-900 block leading-tight">AI Route Check</span>
                <span className="text-[10px] text-teal-600 font-medium">Detours & Delays</span>
              </div>
            </Link>

            <Link
              to="/deliveries"
              className="flex flex-col items-center gap-2.5 p-4 bg-gradient-to-b from-blue-50 to-blue-50/40 border border-blue-200/60 rounded-2xl hover:bg-blue-100/60 transition-all duration-200 group text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Truck size={22} />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-900 block leading-tight">Deliveries</span>
                <span className="text-[10px] text-blue-600 font-medium">Incoming Supplies</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Live Broadcast Alerts */}
        <AlertFeed alerts={alerts} />

        {/* Transport Corridors Status */}
        <div className="my-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Map size={20} className="text-teal-600" /> Key Highway Corridors
            </h3>
            <Link to="/route-checker" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              Check Detour <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {routes.map(r => (
              <RouteStatusCard
                key={r._id}
                name={r.name}
                condition={r.condition}
                riskLevel={r.riskLevel}
              />
            ))}
            {!loading && routes.length === 0 && (
              <div className="card p-6 text-center text-slate-400 text-sm italic">
                No active routes monitored in this sector.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Offline sync status */}
      <OfflineSyncIndicator isOnline={isOnline} pendingCount={0} />

      {/* Floating AI Assistant Chatbot */}
      <AIAssistantWidget />
    </div>
  );
};

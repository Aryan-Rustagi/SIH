import React, { useState, useEffect } from 'react';
import { useAlerts, SOSAlertItem } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import { IncidentCard, IncidentData } from '../../components/IncidentCard';
import api from '../../services/api';
import {
  Radio,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  AlertTriangle,
  Flame,
  Check,
  UserCheck,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { activeAlerts, acknowledgeAlert, resolveAlert, fetchActiveAlerts, isLoading } =
    useAlerts();

  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [loadingIncidents, setLoadingIncidents] = useState<boolean>(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveAlerts();
    loadAllIncidents();
  }, []);

  const loadAllIncidents = async () => {
    try {
      setLoadingIncidents(true);
      const res = await api.get('/incidents/admin/all');
      if (res.data.success) {
        setIncidents(res.data.incidents);
      }
    } catch (err) {
      console.warn('Failed to load admin incidents:', err);
    } finally {
      setLoadingIncidents(false);
    }
  };

  const handleAcknowledge = async (id: string) => {
    setActionInProgress(id);
    await acknowledgeAlert(id);
    await fetchActiveAlerts();
    setActionInProgress(null);
  };

  const handleResolve = async (id: string) => {
    setActionInProgress(id);
    await resolveAlert(id);
    await fetchActiveAlerts();
    setActionInProgress(null);
  };

  const handleToggleVerify = async (incident: IncidentData) => {
    try {
      const res = await api.patch(`/incidents/${incident._id}/verify`, {
        isVerified: !incident.isVerified,
      });
      if (res.data.success) {
        setIncidents((prev) =>
          prev.map((i) => (i._id === incident._id ? { ...i, isVerified: !incident.isVerified } : i))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
            Police & Emergency Rescue Command Center
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Live Dispatch & Incident Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time SOS radar dispatching, responder deployment, and crowd-sourced safety verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchActiveAlerts();
              loadAllIncidents();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
          >
            <RefreshCw className="w-4 h-4 text-rose-400" />
            Refresh Feed
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 shadow-lg shadow-rose-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Active SOS Distress
            </span>
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">{activeAlerts.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Requiring immediate response</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending Incidents
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {incidents.filter((i) => !i.isVerified).length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting police verification</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Verified Incidents
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {incidents.filter((i) => i.isVerified).length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Published to public radar</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Logged Responder
            </span>
            <UserCheck className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-lg font-bold text-white mt-2 truncate">{user?.name}</div>
          <div className="text-[11px] text-sky-400 font-semibold">{user?.role} Access</div>
        </div>
      </div>

      {/* Main Command Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Active SOS Alerts Queue (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <h2 className="text-xl font-bold text-white">Incoming SOS Distress Queue</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {activeAlerts.length} Active Dispatch Channels
            </span>
          </div>

          {activeAlerts.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">All Clear — No Active Emergencies</h3>
              <p className="text-xs text-slate-400 mt-1">
                When a tourist presses the SOS button, their live coordinates and details will flash here in real time via Socket.io.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeAlerts.map((alert) => {
                const isAcknowledged = alert.status === 'ACKNOWLEDGED';
                return (
                  <div
                    key={alert._id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isAcknowledged
                        ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-950/20'
                        : 'bg-rose-950/40 border-rose-500 shadow-2xl shadow-rose-950/50 animate-pulse'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              isAcknowledged
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-rose-600 text-white font-black animate-bounce'
                            }`}
                          >
                            {alert.status}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {new Date(alert.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-white mt-2">
                          {alert.userId?.name || 'Tourist Distress Call'}
                        </h3>
                        {alert.userId?.phone && (
                          <a
                            href={`tel:${alert.userId.phone}`}
                            className="text-xs text-rose-400 hover:underline flex items-center gap-1.5 mt-0.5"
                          >
                            <Phone className="w-3 h-3" /> {alert.userId.phone}
                          </a>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-400">GPS Location</div>
                        <div className="text-xs font-mono font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 mt-1">
                          {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 mb-4">
                      <strong>Emergency Note:</strong> {alert.message || 'No additional note provided.'}
                      {alert.address && (
                        <div className="mt-1 text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{alert.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                      {!isAcknowledged && (
                        <button
                          onClick={() => handleAcknowledge(alert._id)}
                          disabled={actionInProgress === alert._id}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          Acknowledge & Deploy Unit
                        </button>
                      )}

                      <button
                        onClick={() => handleResolve(alert._id)}
                        disabled={actionInProgress === alert._id}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Safely Resolved
                      </button>

                      <a
                        href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        Open in Map
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Incident Verification Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Incident Verification Queue</h2>
            <span className="text-xs text-slate-400 font-mono">{incidents.length} Reports</span>
          </div>

          {loadingIncidents ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Loading incident feed...
            </div>
          ) : incidents.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl text-center text-xs text-slate-400 border border-slate-800">
              No incident reports in system.
            </div>
          ) : (
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
              {incidents.map((incident) => (
                <IncidentCard
                  key={incident._id}
                  incident={incident}
                  showAdminControls={true}
                  onVerifyToggle={() => handleToggleVerify(incident)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

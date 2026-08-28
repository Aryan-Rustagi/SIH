import React, { useState, useEffect } from 'react';
import { useAlerts } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import { IncidentCard, IncidentData } from '../../components/IncidentCard';
import { SafetyMap } from '../../components/SafetyMap';
import { SafetyZoneData } from '../../components/ZoneCard';
import api from '../../services/api';
import {
  Radio,
  ShieldAlert,
  CheckCircle2,
  Phone,
  MapPin,
  AlertTriangle,
  Check,
  UserCheck,
  RefreshCw,
  Search,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { activeAlerts, acknowledgeAlert, resolveAlert, fetchActiveAlerts } = useAlerts();

  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [loadingIncidents, setLoadingIncidents] = useState<boolean>(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [zones, setZones] = useState<SafetyZoneData[]>([]);

  useEffect(() => {
    document.title = 'Command Center — SafeTour Admin';
    fetchActiveAlerts();
    loadAllIncidents();
  }, []);

  const loadAllIncidents = async () => {
    try {
      setLoadingIncidents(true);
      const [incidentsRes, zonesRes] = await Promise.all([
        api.get('/incidents/admin/all'),
        api.get('/safety-zones'),
      ]);
      if (incidentsRes.data.success) setIncidents(incidentsRes.data.incidents);
      if (zonesRes.data.success) setZones(zonesRes.data.zones);
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
    <div className="container page admin-dashboard">
      <header className="admin-top-header">
        <div>
          <p className="admin-kicker">Police operations</p>
          <h1 className="page-title">Command Center</h1>
        </div>
        <label className="admin-search">
          <Search size={17} />
          <input type="search" placeholder="Search alerts, tourists, or zones" aria-label="Search dashboard" />
        </label>
      </header>
      <div className="page-header-row page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div>
          <span className="badge badge-rose mb-sm">
            <Radio size={14} className="animate-pulse" />
            Police & Emergency Rescue Command Center
          </span>
          <h2 className="page-title">Live Dispatch & Incident Control</h2>
          <p className="page-desc">
            Real-time SOS radar dispatching, responder deployment, and crowd-sourced safety verification.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            fetchActiveAlerts();
            loadAllIncidents();
          }}
          className="btn btn-secondary"
        >
          <RefreshCw size={16} />
          Refresh Feed
        </button>
      </div>

      <div className="grid grid-4 mb-xl">
        <div className="stat-card stat-card-danger">
          <div className="flex items-center justify-between">
            <span className="label" style={{ marginBottom: 0 }}>Active SOS Distress</span>
            <ShieldAlert size={20} color="#f43f5e" />
          </div>
          <div className="stat-value">{activeAlerts.length}</div>
          <div className="stat-label">Requiring immediate response</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="label" style={{ marginBottom: 0 }}>Pending Incidents</span>
            <AlertTriangle size={20} color="#fbbf24" />
          </div>
          <div className="stat-value">{incidents.filter((i) => !i.isVerified).length}</div>
          <div className="stat-label">Awaiting police verification</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="label" style={{ marginBottom: 0 }}>Verified Incidents</span>
            <CheckCircle2 size={20} color="#34d399" />
          </div>
          <div className="stat-value">{incidents.filter((i) => i.isVerified).length}</div>
          <div className="stat-label">Published to public radar</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="label" style={{ marginBottom: 0 }}>Logged Responder</span>
            <UserCheck size={20} color="#38bdf8" />
          </div>
          <div className="stat-value" style={{ fontSize: '1.1rem' }}>{user?.name}</div>
          <div className="stat-label text-sky">{user?.role} Access</div>
        </div>
      </div>

      <section className="admin-map-panel" id="tourists">
        <div className="section-title-row">
          <div>
            <p className="admin-kicker">Live overview</p>
            <h2>Safety map</h2>
          </div>
          <span className="text-xs text-muted">{zones.length} monitored zones</span>
        </div>
        <SafetyMap zones={zones} incidents={incidents.filter((incident) => incident.isVerified)} />
      </section>

      <div className="dispatch-grid" id="alerts">
        <div>
          <div className="section-title-row admin-feed-header">
            <div className="flex items-center gap-sm">
              <span className="live-dot" />
              <h2>Incoming SOS Distress Queue</h2>
            </div>
            <span className="text-xs font-mono text-muted">{activeAlerts.length} Active Dispatch Channels</span>
          </div>

          {activeAlerts.length === 0 ? (
            <div className="empty-state">
              <CheckCircle2 className="empty-state-icon" color="#10b981" />
              <h3 className="empty-state-title">All Clear — No Active Emergencies</h3>
              <p className="empty-state-desc">
                When a tourist presses SOS, live coordinates appear here in real time via Socket.IO.
              </p>
            </div>
          ) : (
            <div className="space-y">
              {activeAlerts.map((alert) => {
                const isAcknowledged = alert.status === 'ACKNOWLEDGED';
                return (
                  <div key={alert._id} className={`sos-alert-card${isAcknowledged ? ' acknowledged' : ''}`}>
                    <div className="flex items-start justify-between gap-md mb-md">
                      <div>
                        <div className="flex items-center gap-sm">
                          <span className={`badge ${isAcknowledged ? 'badge-amber' : 'badge-rose'}`}>{alert.status}</span>
                          <span className="text-xs font-mono text-muted">{new Date(alert.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <h3 className="mt-sm">{alert.userId?.name || 'Tourist Distress Call'}</h3>
                        {alert.userId?.phone && (
                          <a href={`tel:${alert.userId.phone}`} className="link-accent mt-xs">
                            <Phone size={12} /> {alert.userId.phone}
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="label">GPS Location</div>
                        <div className="location-box font-mono text-xs">
                          {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="location-box text-xs text-secondary mb-md">
                      <strong>Emergency Note:</strong> {alert.message || 'No additional note provided.'}
                      {alert.address && (
                        <div className="flex items-center gap-xs mt-xs text-muted">
                          <MapPin size={14} color="#fb7185" />
                          {alert.address}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-sm">
                      {!isAcknowledged && (
                        <button
                          type="button"
                          onClick={() => handleAcknowledge(alert._id)}
                          disabled={actionInProgress === alert._id}
                          className="btn btn-amber flex-1"
                        >
                          <Check size={16} />
                          Acknowledge & Deploy Unit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleResolve(alert._id)}
                        disabled={actionInProgress === alert._id}
                        className="btn btn-success flex-1"
                      >
                        <CheckCircle2 size={16} />
                        Mark as Safely Resolved
                      </button>
                      <a
                        href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary"
                      >
                        <MapPin size={14} />
                        Open in Map
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <div className="section-title-row">
            <h2>Incident Verification Queue</h2>
            <span className="text-xs font-mono text-muted">{incidents.length} Reports</span>
          </div>
          {loadingIncidents ? (
            <div className="space-y">
              <div className="skeleton skeleton-card" />
              <div className="skeleton skeleton-card" />
            </div>
          ) : incidents.length === 0 ? (
            <div className="empty-state">
              <h3 className="empty-state-title">No incident reports</h3>
              <p className="empty-state-desc">Crowd reports will appear here for verification.</p>
            </div>
          ) : (
            <div className="space-y overflow-panel">
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

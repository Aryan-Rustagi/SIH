import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { AlertTriangle, Radio, Plus, RefreshCw, X, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);

  // New alert form
  const [formData, setFormData] = useState({
    type: 'REGION_INACCESSIBLE',
    message: '',
    affectedDistricts: 'Tawang, West Kameng',
    severity: 'CRITICAL',
  });

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/alerts/active');
      if (res.data?.success) {
        setAlerts(res.data.alerts || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Disruption Alert Center — Command Center';
    fetchAlerts();
  }, []);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcasting(true);

    try {
      const districtsArr = formData.affectedDistricts.split(',').map(s => s.trim()).filter(Boolean);

      const res = await api.post('/alerts', {
        type: formData.type,
        message: formData.message,
        affectedDistricts: districtsArr,
        severity: formData.severity,
        isActive: true
      });

      if (res.data?.success) {
        setAlerts(prev => [res.data.alert, ...prev]);
        setModalOpen(false);
        setFormData({
          type: 'REGION_INACCESSIBLE',
          message: '',
          affectedDistricts: 'Tawang, West Kameng',
          severity: 'CRITICAL',
        });
      }
    } catch (e) {
      alert('Failed to broadcast alert.');
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Disruption Alert Center</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Broadcast emergency road cut-off advisories and natural disaster warnings to all field units.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAlerts}
            disabled={loading}
            className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-sm btn-primary bg-red-600 hover:bg-red-700 shadow-red-500/20"
          >
            <Radio size={14} /> Broadcast New Alert
          </button>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="flex flex-col gap-4">
        {alerts.map(a => (
          <div
            key={a._id}
            className={`bg-white rounded-3xl p-6 shadow-card border-l-[6px] border border-slate-200 transition-all ${
              a.severity === 'CRITICAL' ? 'border-l-red-500' : 'border-l-amber-500'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                  a.severity === 'CRITICAL' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-800 tracking-tight">
                    {a.type.replace(/_/g, ' ')}
                  </h3>
                  <div className="text-xs text-slate-400 font-semibold">
                    Issued: {new Date(a.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                a.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {a.severity}
              </span>
            </div>

            <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4 pl-1">
              {a.message}
            </p>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="font-bold text-slate-700">Affected Districts:</span>
                <span className="font-semibold text-teal-700">
                  {a.affectedDistricts?.join(', ') || 'All Sectors'}
                </span>
              </div>

              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Active Broadcast
              </span>
            </div>
          </div>
        ))}

        {!loading && alerts.length === 0 && (
          <div className="card p-12 text-center text-slate-400">
            <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No Active Emergency Alerts</p>
            <p className="text-xs">All key transport corridors report normal operational flow.</p>
          </div>
        )}
      </div>

      {/* Broadcast Alert Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Radio size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Broadcast Disruption Alert</h3>
                  <p className="text-xs text-slate-500 font-medium">Instantly notifies all field officers</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="flex flex-col gap-4 py-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Alert Classification
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="input-field text-xs font-bold"
                >
                  <option value="REGION_INACCESSIBLE">REGION INACCESSIBLE (District Cut-off)</option>
                  <option value="LANDSLIDE_WARNING">LANDSLIDE WARNING (High Slope Instability)</option>
                  <option value="FLASH_FLOOD">FLASH FLOOD (Road Inundation)</option>
                  <option value="BRIDGE_MAINTENANCE">BRIDGE REPAIR / LOAD RESTRICTION</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Severity Level
                </label>
                <select
                  value={formData.severity}
                  onChange={e => setFormData({ ...formData, severity: e.target.value })}
                  className="input-field text-xs font-bold"
                >
                  <option value="CRITICAL">CRITICAL (Immediate Action Required)</option>
                  <option value="HIGH">HIGH (Hazardous Conditions)</option>
                  <option value="MEDIUM">MEDIUM (Caution / Single Lane)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Affected Districts (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.affectedDistricts}
                  onChange={e => setFormData({ ...formData, affectedDistricts: e.target.value })}
                  required
                  placeholder="e.g. Tawang, West Kameng, Ri Bhoi"
                  className="input-field text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Advisory Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="E.g. NH-13 near Sela Pass is blocked due to heavy rockfalls. All commercial convoys diverted to Kalaktang bypass."
                  className="input-field text-xs resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-ghost w-1/2 py-3 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={broadcasting || !formData.message.trim()}
                  className="btn btn-danger w-1/2 py-3 text-xs font-bold shadow-md shadow-red-500/20"
                >
                  {broadcasting ? <Loader2 size={14} className="animate-spin" /> : 'Emit Live Alert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

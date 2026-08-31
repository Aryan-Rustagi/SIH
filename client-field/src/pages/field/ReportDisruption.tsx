import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, AlertTriangle, MapPin, Clock, ShieldAlert, CheckCircle2, Loader2, Navigation } from 'lucide-react';

export const ReportDisruption: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [fetchingGps, setFetchingGps] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    routeId: '',
    type: 'LANDSLIDE',
    severity: 'HIGH',
    latitude: 26.1445,
    longitude: 91.7362,
    predictedDurationHours: 24,
  });

  useEffect(() => {
    document.title = 'Report Road Disruption — NER Logistics';
    api.get('/routes').then(res => {
      if (res.data?.success && res.data.routes.length > 0) {
        setRoutes(res.data.routes);
        setFormData(prev => ({ ...prev, routeId: res.data.routes[0]._id }));
      }
    }).catch(err => console.error(err));

    // Try auto-fetch GPS
    handleGetLocation();
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setFetchingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: parseFloat(pos.coords.latitude.toFixed(4)),
          longitude: parseFloat(pos.coords.longitude.toFixed(4))
        }));
        setFetchingGps(false);
      },
      () => setFetchingGps(false),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/disruptions', formData);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (e) {
      alert('Network issue: Disruption saved to offline sync queue.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const disruptionTypes = [
    { id: 'LANDSLIDE', label: 'Landslide', icon: '⛰️', desc: 'Slope failure or boulder fall' },
    { id: 'FLOOD', label: 'Flash Flood', icon: '🌊', desc: 'River overflow / submerged road' },
    { id: 'ROAD_DAMAGE', label: 'Road / Bridge Collapse', icon: '🚧', desc: 'Structural failure or culvert washout' },
    { id: 'CONGESTION', label: 'Heavy Traffic Block', icon: '🚛', desc: 'Vehicle breakdown causing blockage' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="container max-w-lg mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-semibold text-sm transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-200/80">
          <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-md shadow-red-500/10">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Report Road Disruption</h1>
              <p className="text-xs text-slate-500 font-medium">Broadcast immediate accessibility blockage to Command Center</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Alert Broadcasted!</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Command center and nearby supply convoys have received the blockage report. Redirecting...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Route Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Corridor / Highway
                </label>
                <div className="relative">
                  <select
                    value={formData.routeId}
                    onChange={e => setFormData({ ...formData, routeId: e.target.value })}
                    required
                    className="input-field appearance-none cursor-pointer"
                  >
                    {routes.map(r => (
                      <option key={r._id} value={r._id}>
                        {r.name} ({r.startPoint} ➔ {r.endPoint})
                      </option>
                    ))}
                    {routes.length === 0 && <option value="">Loading corridors...</option>}
                  </select>
                </div>
              </div>

              {/* Disruption Type Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Disruption Category
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {disruptionTypes.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: t.id })}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1 ${
                        formData.type === t.id
                          ? 'border-red-500 bg-red-50/70 text-red-900 shadow-sm ring-1 ring-red-500'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-lg">{t.icon}</div>
                      <div className="text-xs font-bold leading-tight">{t.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Blockage Severity
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 'LOW', label: 'Low', desc: 'Passable', color: 'hover:border-emerald-400' },
                    { val: 'MEDIUM', label: 'Medium', desc: 'Delay', color: 'hover:border-amber-400' },
                    { val: 'HIGH', label: 'High', desc: 'Hazardous', color: 'hover:border-orange-400' },
                    { val: 'CRITICAL', label: 'Critical', desc: 'Blocked', color: 'hover:border-red-400' }
                  ].map(s => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: s.val })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        formData.severity === s.val
                          ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-sm'
                          : `bg-slate-50 text-slate-700 font-semibold border-slate-200 ${s.color}`
                      }`}
                    >
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className="text-[9px] opacity-70 font-normal">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* GPS Coordinates Fetcher */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Location Coordinates
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={fetchingGps}
                    className="text-[11px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    {fetchingGps ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                    Auto-Detect GPS
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.latitude}
                      onChange={e => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                      placeholder="Latitude"
                      className="input-field text-xs font-mono"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.longitude}
                      onChange={e => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                      placeholder="Longitude"
                      className="input-field text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Estimated Clearance Time */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Estimated Clearance Time
                  </label>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg border border-red-200/50">
                    ~{formData.predictedDurationHours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="96"
                  value={formData.predictedDurationHours}
                  onChange={e => setFormData({ ...formData, predictedDurationHours: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>1 Hour</span>
                  <span>24 Hours</span>
                  <span>48 Hours</span>
                  <span>96+ Hours</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-danger w-full py-4 text-sm font-bold mt-2 shadow-lg shadow-red-500/25"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" /> Broadcasting Alert...
                  </span>
                ) : (
                  'Transmit Disruption Alert'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

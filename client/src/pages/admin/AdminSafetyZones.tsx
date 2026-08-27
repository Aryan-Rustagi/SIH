import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { SafetyZoneData, ZoneCard } from '../../components/ZoneCard';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle,
  MapPin,
} from 'lucide-react';

export const AdminSafetyZones: React.FC = () => {
  const [zones, setZones] = useState<SafetyZoneData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('LOW');
  const [latitude, setLatitude] = useState<number>(28.6139);
  const [longitude, setLongitude] = useState<number>(77.209);
  const [radiusMeters, setRadiusMeters] = useState<number>(500);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/safety-zones');
      if (res.data.success) {
        setZones(res.data.zones);
      }
    } catch (err) {
      console.warn('Failed to load zones', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setRiskLevel('LOW');
    setLatitude(28.6139);
    setLongitude(77.209);
    setRadiusMeters(500);
    setShowModal(true);
  };

  const handleOpenEdit = (zone: SafetyZoneData) => {
    setEditingId(zone._id);
    setName(zone.name);
    setDescription(zone.description || '');
    setRiskLevel(zone.riskLevel);
    setLatitude(zone.latitude);
    setLongitude(zone.longitude);
    setRadiusMeters(zone.radiusMeters);
    setShowModal(true);
  };

  const handleSaveZone = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      if (editingId) {
        const res = await api.put(`/safety-zones/${editingId}`, {
          name,
          description,
          riskLevel,
          latitude: Number(latitude),
          longitude: Number(longitude),
          radiusMeters: Number(radiusMeters),
        });
        if (res.data.success) {
          setFeedback({ type: 'success', message: 'Safety zone updated successfully' });
        }
      } else {
        const res = await api.post('/safety-zones', {
          name,
          description,
          riskLevel,
          latitude: Number(latitude),
          longitude: Number(longitude),
          radiusMeters: Number(radiusMeters),
        });
        if (res.data.success) {
          setFeedback({ type: 'success', message: 'New safety zone created successfully' });
        }
      }
      setShowModal(false);
      fetchZones();
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to save zone',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this safety perimeter?')) return;
    try {
      await api.delete(`/safety-zones/${id}`);
      fetchZones();
    } catch (err) {
      console.warn('Failed to delete zone', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            Perimeter Control
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Safety Zone Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure designated safe havens, tourist surveillance corridors, and critical hazard perimeters.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Zone
        </button>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Zones List with Admin Management Controls */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400 text-xs">
          Loading perimeter zones...
        </div>
      ) : zones.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800">
          <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Safety Zones Defined</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Create safe zones, embassy perimeters, or caution zones to notify tourists in real time.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
          >
            Create First Zone
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div key={zone._id} className="relative group">
              <ZoneCard zone={zone} />
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenEdit(zone)}
                  className="p-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 shadow-md"
                  title="Edit Zone"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(zone._id)}
                  className="p-1.5 rounded-lg bg-slate-900/90 text-rose-400 hover:text-rose-300 border border-slate-700 shadow-md"
                  title="Delete Zone"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingId ? 'Edit Safety Zone' : 'Create Safety Zone'}
            </h3>

            <form onSubmit={handleSaveZone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Zone Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tourist Police Safe Haven - Central Gate"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 24/7 manned security kiosk with first aid and translators"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Risk Level
                </label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="LOW">LOW (Safe Haven / Guarded Zone)</option>
                  <option value="MEDIUM">MEDIUM (Moderate Caution)</option>
                  <option value="HIGH">HIGH (Elevated Alert Area)</option>
                  <option value="CRITICAL">CRITICAL (Critical Hazard / Red Zone)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Perimeter Radius (Meters)
                </label>
                <input
                  type="number"
                  value={radiusMeters}
                  onChange={(e) => setRadiusMeters(parseInt(e.target.value, 10))}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
                >
                  Save Zone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

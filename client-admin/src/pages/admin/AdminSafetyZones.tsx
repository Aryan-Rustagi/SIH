import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { SafetyZoneData, ZoneCard } from '../../components/ZoneCard';
import { SafetyMap } from '../../components/SafetyMap';
import { Layers, Plus, Trash2, Edit2, CheckCircle, AlertTriangle } from 'lucide-react';

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
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    document.title = 'Zone Management — SafeTour Admin';
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
    <div className="container page">
      <div className="page-header-row page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div>
          <span className="badge badge-purple mb-sm">
            <Layers size={14} />
            Perimeter Control
          </span>
          <h1 className="page-title">Safety Zone Management</h1>
          <p className="page-desc">
            Configure designated safe havens, tourist surveillance corridors, and critical hazard perimeters.
          </p>
        </div>
        <button type="button" onClick={handleOpenAdd} className="btn btn-purple">
          <Plus size={16} />
          Create Zone
        </button>
      </div>

      {feedback && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {feedback.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="mb-xl mt-xl">{zones.length > 0 && <SafetyMap zones={zones} />}</div>

      {isLoading ? (
        <div className="grid grid-3">
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
        </div>
      ) : zones.length === 0 ? (
        <div className="empty-state">
          <Layers className="empty-state-icon" />
          <h3 className="empty-state-title">No Safety Zones Defined</h3>
          <p className="empty-state-desc">Create safe zones, embassy perimeters, or caution zones to notify tourists in real time.</p>
          <button type="button" onClick={handleOpenAdd} className="btn btn-purple mt-md">
            Create First Zone
          </button>
        </div>
      ) : (
        <div className="grid grid-3">
          {zones.map((zone) => (
            <div key={zone._id} className="zone-card-wrap">
              <ZoneCard zone={zone} />
              <div className="zone-card-actions">
                <button type="button" onClick={() => handleOpenEdit(zone)} className="icon-btn" title="Edit Zone">
                  <Edit2 size={12} />
                </button>
                <button type="button" onClick={() => handleDelete(zone._id)} className="icon-btn" title="Delete Zone">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="mb-md">{editingId ? 'Edit Safety Zone' : 'Create Safety Zone'}</h3>
            <form onSubmit={handleSaveZone} className="space-y">
              <div>
                <label className="label">Zone Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Tourist Police Safe Haven" required className="input" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. 24/7 manned security kiosk" className="input" />
              </div>
              <div>
                <label className="label">Risk Level</label>
                <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value as any)} className="input">
                  <option value="LOW">LOW (Safe Haven / Guarded Zone)</option>
                  <option value="MEDIUM">MEDIUM (Moderate Caution)</option>
                  <option value="HIGH">HIGH (Elevated Alert Area)</option>
                  <option value="CRITICAL">CRITICAL (Critical Hazard / Red Zone)</option>
                </select>
              </div>
              <div className="grid grid-2">
                <div>
                  <label className="label">Latitude</label>
                  <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} required className="input" />
                </div>
                <div>
                  <label className="label">Longitude</label>
                  <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} required className="input" />
                </div>
              </div>
              <div>
                <label className="label">Perimeter Radius (Meters)</label>
                <input type="number" value={radiusMeters} onChange={(e) => setRadiusMeters(parseInt(e.target.value, 10))} required className="input" />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-purple flex-1">
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

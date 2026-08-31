import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Navigation, Search, RefreshCw, Edit3, ShieldAlert, CheckCircle2, AlertTriangle, X, Loader2 } from 'lucide-react';

export const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [conditionFilter, setConditionFilter] = useState('ALL');
  
  // Modal state
  const [editingRoute, setEditingRoute] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);
  const [newCondition, setNewCondition] = useState('OPEN');
  const [newRisk, setNewRisk] = useState('LOW');

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/routes');
      if (res.data?.success) {
        setRoutes(res.data.routes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Corridor Management — Command Center';
    fetchRoutes();
  }, []);

  const handleOpenEdit = (r: any) => {
    setEditingRoute(r);
    setNewCondition(r.condition);
    setNewRisk(r.riskLevel);
  };

  const handleSaveCondition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoute) return;
    setUpdating(true);

    try {
      await api.patch(`/routes/${editingRoute._id}/condition`, {
        condition: newCondition,
        riskLevel: newRisk
      });

      setRoutes(prev =>
        prev.map(r =>
          r._id === editingRoute._id
            ? { ...r, condition: newCondition, riskLevel: newRisk }
            : r
        )
      );
      setEditingRoute(null);
    } catch (e) {
      alert('Failed to update corridor condition.');
    } finally {
      setUpdating(false);
    }
  };

  const filteredRoutes = routes.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.startPoint.toLowerCase().includes(search.toLowerCase()) ||
      r.endPoint.toLowerCase().includes(search.toLowerCase());

    const matchesCondition = conditionFilter === 'ALL' || r.condition === conditionFilter;
    return matchesSearch && matchesCondition;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Highway & Corridor Management</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Monitor and toggle transit status across critical arterial highways and bridge passes.
          </p>
        </div>

        <button
          onClick={fetchRoutes}
          disabled={loading}
          className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Corridors
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search highway or terminal points..."
            className="input-field pl-10 text-xs"
          />
        </div>

        {/* Condition Filter */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 w-full md:w-auto overflow-x-auto">
          {['ALL', 'OPEN', 'PARTIALLY_BLOCKED', 'CLOSED'].map(c => (
            <button
              key={c}
              onClick={() => setConditionFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                conditionFilter === c
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {c === 'ALL' ? 'All Corridors' : c.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Routes List */}
      <div className="flex flex-col gap-4">
        {filteredRoutes.map(r => (
          <div
            key={r._id}
            className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Navigation size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">{r.name}</h3>
                <div className="text-xs font-bold text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>{r.startPoint}</span>
                  <span className="text-teal-600 font-black">➔</span>
                  <span>{r.endPoint}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                  Districts: {r.districtsCovered?.join(', ') || 'Inter-State'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 justify-between md:justify-end">
              {/* Condition Badge */}
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  r.condition === 'OPEN' ? 'bg-emerald-100 text-emerald-800' :
                  r.condition === 'PARTIALLY_BLOCKED' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {r.condition.replace('_', ' ')}
                </span>
              </div>

              {/* Risk Level Badge */}
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Terrain Risk</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  r.riskLevel === 'LOW' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' :
                  r.riskLevel === 'MEDIUM' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                  'border-red-200 text-red-700 bg-red-50'
                }`}>
                  {r.riskLevel}
                </span>
              </div>

              {/* Edit Action */}
              <button
                onClick={() => handleOpenEdit(r)}
                className="p-2.5 bg-slate-100 hover:bg-teal-600 hover:text-white rounded-xl text-slate-600 transition-colors ml-2"
                title="Update Corridor Condition"
              >
                <Edit3 size={16} />
              </button>
            </div>
          </div>
        ))}

        {!loading && filteredRoutes.length === 0 && (
          <div className="card p-12 text-center text-slate-400">
            No transit corridors match the filter criteria.
          </div>
        )}
      </div>

      {/* Update Condition Modal */}
      {editingRoute && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800">Update Corridor Condition</h3>
                <p className="text-xs text-slate-500 font-medium">{editingRoute.name}</p>
              </div>
              <button
                onClick={() => setEditingRoute(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCondition} className="flex flex-col gap-4 py-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Transit Operational Condition
                </label>
                <select
                  value={newCondition}
                  onChange={e => setNewCondition(e.target.value)}
                  className="input-field text-xs font-bold"
                >
                  <option value="OPEN">OPEN (Normal Flow)</option>
                  <option value="PARTIALLY_BLOCKED">PARTIALLY BLOCKED (Single Lane / Delays)</option>
                  <option value="CLOSED">CLOSED (Complete Blockage)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Terrain Hazard Risk Level
                </label>
                <select
                  value={newRisk}
                  onChange={e => setNewRisk(e.target.value)}
                  className="input-field text-xs font-bold"
                >
                  <option value="LOW">LOW Risk</option>
                  <option value="MEDIUM">MEDIUM Risk</option>
                  <option value="HIGH">HIGH Risk (Active Rain)</option>
                  <option value="CRITICAL">CRITICAL Risk (Landslide Imminent)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingRoute(null)}
                  className="btn btn-ghost w-1/2 py-3 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary w-1/2 py-3 text-xs"
                >
                  {updating ? <Loader2 size={14} className="animate-spin" /> : 'Save & Broadcast'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

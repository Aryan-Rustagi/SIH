import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Map, RefreshCw, Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const DistrictView: React.FC = () => {
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/districts');
      if (res.data?.success) {
        setDistricts(res.data.districts || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'District Connectivity Matrix — Command Center';
    fetchDistricts();
  }, []);

  const states = ['ALL', 'Assam', 'Meghalaya', 'Arunachal Pradesh', 'Manipur', 'Nagaland', 'Mizoram', 'Tripura', 'Sikkim'];

  const filteredDistricts = districts.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState === 'ALL' || d.state === selectedState;
    const matchesStatus = statusFilter === 'ALL' || d.connectivityStatus === statusFilter;
    return matchesSearch && matchesState && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">District Connectivity Matrix</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Monitor real-time accessibility, road cut-offs, and active disruptions across all 8 NER states.
          </p>
        </div>
        <button
          onClick={fetchDistricts}
          disabled={loading}
          className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Status
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search district or state..."
            className="input-field pl-10 text-xs"
          />
        </div>

        {/* State & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Filter size={14} /> State:
          </div>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
          >
            {states.map(st => (
              <option key={st} value={st}>{st === 'ALL' ? 'All NER States' : st}</option>
            ))}
          </select>

          {/* Status Quick Chips */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            {['ALL', 'CONNECTED', 'PARTIAL', 'DISCONNECTED'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st === 'ALL' ? 'All' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* District Data Table */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">District Sector</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">Connectivity Status</th>
                <th className="px-6 py-4">Active Blockages</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400 font-semibold">
                    Loading district telemetry...
                  </td>
                </tr>
              ) : filteredDistricts.map(d => (
                <tr key={d._id} className="hover:bg-teal-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">{d.name}</td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{d.state}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      d.connectivityStatus === 'CONNECTED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : d.connectivityStatus === 'PARTIAL'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800 animate-pulse'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        d.connectivityStatus === 'CONNECTED' ? 'bg-emerald-500' : d.connectivityStatus === 'PARTIAL' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      {d.connectivityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${d.activeDisruptionsCount > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                      {d.activeDisruptionsCount || 0} Blockage(s)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedDistrict(d)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-teal-600 hover:text-white rounded-xl font-bold text-[11px] transition-colors"
                    >
                      View Sector
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && filteredDistricts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400">
                    No districts matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* District Detail Modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700">
                  {selectedDistrict.state}
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-1">{selectedDistrict.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3 py-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Access Posture</span>
                <span className="font-black text-slate-800">{selectedDistrict.connectivityStatus}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Reported Incidents</span>
                <span className="font-black text-red-600">{selectedDistrict.activeDisruptionsCount || 0} active</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Assigned Relief Convoys</span>
                <span className="font-black text-teal-700">2 In Transit</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDistrict(null)}
              className="btn btn-primary w-full mt-4 py-3 text-xs"
            >
              Close Sector View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

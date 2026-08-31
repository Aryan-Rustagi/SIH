import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Truck, Search, Phone, MapPin, Package, RefreshCw, Filter, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

export const VehicleTracking: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cargoFilter, setCargoFilter] = useState('ALL');

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/vehicles');
      if (res.data?.success) {
        setVehicles(res.data.vehicles || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Fleet & Delivery Tracking — Command Center';
    fetchVehicles();
  }, []);

  const cargoTypes = ['ALL', 'MEDICINE', 'FOOD', 'FUEL', 'CONSTRUCTION'];

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch =
      v.vehicleId.toLowerCase().includes(search.toLowerCase()) ||
      (v.driverName && v.driverName.toLowerCase().includes(search.toLowerCase())) ||
      (v.assignedRoute?.name && v.assignedRoute.name.toLowerCase().includes(search.toLowerCase()));

    const matchesCargo = cargoFilter === 'ALL' || v.cargoType?.toUpperCase() === cargoFilter;
    return matchesSearch && matchesCargo;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Essential Fleet & Deliveries</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Real-time GPS movement of medical convoys, food grains, and disaster supplies.
          </p>
        </div>

        <button
          onClick={fetchVehicles}
          disabled={loading}
          className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Fleet
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vehicle number or driver..."
            className="input-field pl-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 flex-shrink-0">
            <Filter size={13} /> Cargo:
          </span>
          {cargoTypes.map(c => (
            <button
              key={c}
              onClick={() => setCargoFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                cargoFilter === c
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c === 'ALL' ? 'All Cargo' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(v => (
          <div
            key={v._id}
            className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-200 flex flex-col justify-between gap-4"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-800 leading-tight">{v.vehicleId}</h3>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">{v.type}</span>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  v.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                  v.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {v.status.replace('_', ' ')}
                </span>
              </div>

              {/* Details List */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Cargo Manifest</div>
                  <div className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                    <Package size={12} className="text-teal-600" /> {v.cargoType}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Driver Contact</div>
                  <div className="font-bold text-slate-800 mt-0.5 truncate">{v.driverName}</div>
                </div>
              </div>

              {/* Assigned Route */}
              <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs">
                <div className="text-[10px] text-teal-700 font-bold uppercase">Assigned Transit Corridor</div>
                <div className="font-bold text-teal-950 mt-0.5 truncate">
                  {v.assignedRoute?.name || 'Guwahati - Shillong Corridor'}
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">GPS Active</span>
              {v.driverPhone && (
                <a
                  href={`tel:${v.driverPhone}`}
                  className="flex items-center gap-1.5 font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Phone size={13} /> {v.driverPhone}
                </a>
              )}
            </div>
          </div>
        ))}

        {!loading && filteredVehicles.length === 0 && (
          <div className="col-span-full card p-12 text-center text-slate-400">
            No supply vehicles matching the criteria.
          </div>
        )}
      </div>
    </div>
  );
};

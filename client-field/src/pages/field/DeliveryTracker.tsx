import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Clock, Phone, MapPin, Package, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../services/api';

export const DeliveryTracker: React.FC = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/deliveries');
      if (res.data?.success) {
        setDeliveries(res.data.deliveries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Incoming Deliveries — NER Logistics';
    fetchDeliveries();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="badge badge-success">Delivered</span>;
      case 'DELAYED':
        return <span className="badge badge-danger">Delayed (Landslide)</span>;
      default:
        return <span className="badge badge-info">In Transit</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="container max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <button
            onClick={fetchDeliveries}
            disabled={loading}
            className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 p-2 rounded-xl bg-white border border-slate-200 shadow-sm transition-colors"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 shadow-elevated border border-slate-200/80 mb-6 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-md shadow-blue-500/10">
            <Truck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Essential Commodity Tracking</h1>
            <p className="text-xs text-slate-500 font-medium">GPS monitoring for medicine, food grain, and fuel transport</p>
          </div>
        </div>

        {/* Deliveries List */}
        <div className="flex flex-col gap-4">
          {deliveries.map(d => {
            const vehicle = d.vehicleId;
            return (
              <div
                key={d._id}
                className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-200/80 flex flex-col gap-4"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <div className="text-base font-black text-slate-800 flex items-center gap-2">
                      <Truck size={18} className="text-teal-600" />
                      {vehicle?.vehicleId || 'AS-01-HC-1234'}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">
                      Type: <span className="font-semibold text-slate-700">{vehicle?.type || 'Heavy Transport'}</span>
                    </div>
                  </div>
                  {getStatusBadge(d.status || 'IN_TRANSIT')}
                </div>

                {/* Cargo Manifest */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cargo Manifest</div>
                    <div className="text-xs font-bold text-slate-800">{d.cargoManifest}</div>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={10} className="text-blue-500" /> Origin
                    </div>
                    <div className="font-bold text-slate-800 mt-1 truncate">{d.origin}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={10} className="text-teal-500" /> Destination
                    </div>
                    <div className="font-bold text-slate-800 mt-1 truncate">{d.destination}</div>
                  </div>
                </div>

                {/* Driver Contact & ETA footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-600">
                      Driver: <strong className="text-slate-800">{vehicle?.driverName || 'Sanjay Kumar'}</strong>
                    </span>
                    {vehicle?.driverPhone && (
                      <a
                        href={`tel:${vehicle.driverPhone}`}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Call Driver"
                      >
                        <Phone size={14} />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1 font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl">
                    <Clock size={13} />
                    <span>ETA ~2 Hours</span>
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && deliveries.length === 0 && (
            <div className="card p-10 text-center flex flex-col items-center justify-center gap-2 text-slate-400">
              <Truck size={36} className="text-slate-300" />
              <p className="text-sm font-semibold">No active incoming deliveries for your district.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FileWarning, MapPin, Search, RefreshCw, User, Calendar, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const FieldReportsView: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/field-reports');
      if (res.data?.success) {
        setReports(res.data.reports || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Ground Field Reports — Command Center';
    fetchReports();
  }, []);

  const filteredReports = reports.filter(r => {
    const descMatch = r.description?.toLowerCase().includes(search.toLowerCase());
    const districtMatch = r.district?.toLowerCase().includes(search.toLowerCase());
    const officerMatch = r.reportedBy?.name?.toLowerCase().includes(search.toLowerCase());
    return descMatch || districtMatch || officerMatch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Ground Intelligence & Field Reports</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Verified ground telemetry and damage photos submitted by deployed field officers.
          </p>
        </div>

        <button
          onClick={fetchReports}
          disabled={loading}
          className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Reports
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search observation, district or officer name..."
            className="input-field pl-10 text-xs"
          />
        </div>

        <span className="text-xs font-bold text-slate-400">
          Showing {filteredReports.length} Verified Reports
        </span>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map(r => {
          const photoUrl = r.photos && r.photos[0] ? r.photos[0] : 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop';
          return (
            <div
              key={r._id}
              className="bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo preview */}
                <div
                  onClick={() => setSelectedPhoto(photoUrl)}
                  className="h-44 bg-slate-900 relative cursor-pointer group overflow-hidden"
                >
                  <img
                    src={photoUrl}
                    alt="Field evidence"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {r.type?.replace(/_/g, ' ') || 'GROUND REPORT'}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-semibold text-white">
                    🔍 Click to Enlarge
                  </div>
                </div>

                {/* Description Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1 font-bold text-xs text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl">
                      <MapPin size={12} /> {r.district}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      {r.severity || 'MEDIUM'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>

              {/* Officer & Timestamp Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] flex justify-between items-center">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <User size={13} className="text-slate-400" />
                  <span>{r.reportedBy?.name || 'Field Unit 1'}</span>
                </div>
                <div className="text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{new Date(r.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}

        {!loading && filteredReports.length === 0 && (
          <div className="col-span-full card p-12 text-center text-slate-400">
            No ground reports matching the search criteria.
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-2 animate-scale-in">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            <img src={selectedPhoto} alt="Enlarged evidence" className="w-full h-auto rounded-2xl max-h-[80vh] object-contain mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

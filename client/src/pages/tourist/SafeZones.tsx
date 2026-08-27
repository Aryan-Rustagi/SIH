import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ZoneCard, SafetyZoneData } from '../../components/ZoneCard';
import {
  Compass,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  RefreshCw,
  Info,
} from 'lucide-react';

export const SafeZones: React.FC = () => {
  const [zones, setZones] = useState<SafetyZoneData[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentRiskStatus, setCurrentRiskStatus] = useState<{
    risk: string;
    activeZones: any[];
    evaluated: boolean;
  }>({
    risk: 'LOW',
    activeZones: [],
    evaluated: false,
  });
  const [evaluatingRisk, setEvaluatingRisk] = useState<boolean>(false);

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
      console.warn('Failed to fetch zones:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateCurrentLocation = () => {
    setEvaluatingRisk(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await api.get(
              `/safety-zones/check-risk?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`
            );
            if (res.data.success) {
              setCurrentRiskStatus({
                risk: res.data.currentRisk,
                activeZones: res.data.activeZones,
                evaluated: true,
              });
            }
          } catch (err) {
            console.warn(err);
          } finally {
            setEvaluatingRisk(false);
          }
        },
        () => {
          // Fallback simulation
          setCurrentRiskStatus({
            risk: 'LOW',
            activeZones: [],
            evaluated: true,
          });
          setEvaluatingRisk(false);
        }
      );
    } else {
      setEvaluatingRisk(false);
    }
  };

  const filteredZones = zones.filter((zone) => {
    const matchesFilter = filterLevel === 'ALL' || zone.riskLevel === filterLevel;
    const matchesSearch =
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (zone.description && zone.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getRiskBadgeDetails = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return { text: 'Critical Risk Alert Area', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'HIGH':
        return { text: 'Elevated Risk Caution', bg: 'bg-orange-500/20 text-orange-300 border-orange-500/40' };
      case 'MEDIUM':
        return { text: 'Moderate Caution Area', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      default:
        return { text: 'Safe & Monitored Zone', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Safety Perimeter Navigator
          </div>
          <h1 className="text-3xl font-extrabold text-white">Safe Havens & Monitored Zones</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified safe zones, tourist police booths, embassy zones, and areas requiring caution.
          </p>
        </div>

        {/* Real-time Proximity Radar Button */}
        <button
          onClick={evaluateCurrentLocation}
          disabled={evaluatingRisk}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-md self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${evaluatingRisk ? 'animate-spin' : ''}`} />
          {evaluatingRisk ? 'Scanning Perimeter...' : 'Scan My Location Risk'}
        </button>
      </div>

      {/* Evaluated Status Card */}
      {currentRiskStatus.evaluated && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl glass-panel-glow border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Current Location Safety Status
              </div>
              <div className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getRiskBadgeDetails(currentRiskStatus.risk).bg}`}>
                  {currentRiskStatus.risk}
                </span>
                <span>{getRiskBadgeDetails(currentRiskStatus.risk).text}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            {currentRiskStatus.activeZones.length > 0
              ? `Inside: ${currentRiskStatus.activeZones.map((z: any) => z.zone.name).join(', ')}`
              : 'Within standard safety corridor'}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search zones by name or landmark description..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterLevel === lvl
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lvl === 'ALL' ? 'All Zones' : `${lvl}`}
            </button>
          ))}
        </div>
      </div>

      {/* Zones Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Loading monitored safety zones...
        </div>
      ) : filteredZones.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 border border-slate-800">
          <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white">No zones found</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms or filter selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredZones.map((zone) => (
            <ZoneCard key={zone._id} zone={zone} />
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Truck, Map as MapIcon, AlertTriangle, FileWarning, ArrowRight, RefreshCw, Radio, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix default leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom colored map markers
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const greenIcon = createCustomIcon('#10b981');
const redIcon = createCustomIcon('#ef4444');
const blueIcon = createCustomIcon('#3b82f6');
const amberIcon = createCustomIcon('#f59e0b');

export const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState({
    activeDisruptions: 0,
    vehiclesInTransit: 0,
    districtsDisconnected: 0,
    pendingReports: 0
  });

  const [alerts, setAlerts] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Key NER Logistics Hubs coordinates
  const nerHubs = [
    { name: 'Guwahati Hub (Assam)', coords: [26.1445, 91.7362], status: 'CONNECTED', type: 'Primary Supply Depot', icon: greenIcon },
    { name: 'Shillong Sector (Meghalaya)', coords: [25.5788, 91.8833], status: 'CONNECTED', type: 'Transit Checkpoint', icon: greenIcon },
    { name: 'Tezpur Gateway (Assam)', coords: [26.6528, 92.7926], status: 'CONNECTED', type: 'Arunachal Transit Point', icon: greenIcon },
    { name: 'Tawang Sector (Arunachal Pradesh)', coords: [27.5878, 91.8673], status: 'DISCONNECTED', type: 'High Altitude Medical Post (Landslide Alert)', icon: redIcon },
    { name: 'Dimapur Junction (Nagaland)', coords: [25.9068, 93.7271], status: 'CONNECTED', type: 'Railhead & Warehouse', icon: greenIcon },
    { name: 'Imphal Valley (Manipur)', coords: [24.8170, 93.9368], status: 'PARTIAL', type: 'Supply Distribution Center', icon: amberIcon },
    { name: 'Silchar Corridor (Assam)', coords: [24.8333, 92.7789], status: 'CONNECTED', type: 'Barak Valley Hub', icon: greenIcon },
    { name: 'Aizawl Sector (Mizoram)', coords: [23.7307, 92.7173], status: 'CONNECTED', type: 'Hill Logistics Post', icon: greenIcon },
    { name: 'Agartala Port (Tripura)', coords: [23.8315, 91.2868], status: 'CONNECTED', type: 'Border Transit Depot', icon: greenIcon },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [distRes, vehRes, alertRes, routeRes, reportRes] = await Promise.all([
        api.get('/districts'),
        api.get('/vehicles'),
        api.get('/alerts/active'),
        api.get('/routes'),
        api.get('/field-reports')
      ]);

      const distList = distRes.data?.districts || [];
      const vehList = vehRes.data?.vehicles || [];
      const alertList = alertRes.data?.alerts || [];
      const routeList = routeRes.data?.routes || [];
      const reportList = reportRes.data?.reports || [];

      setDistricts(distList);
      setVehicles(vehList);
      setAlerts(alertList);
      setRoutes(routeList);

      const disconnectedCount = distList.filter((d: any) => d.connectivityStatus === 'DISCONNECTED').length;
      const inTransitCount = vehList.filter((v: any) => v.status === 'IN_TRANSIT').length;

      setStats({
        activeDisruptions: alertList.length,
        vehiclesInTransit: inTransitCount > 0 ? inTransitCount : vehList.length,
        districtsDisconnected: disconnectedCount,
        pendingReports: reportList.length
      });
    } catch (e) {
      console.error('Error loading command center overview:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Command Center Overview — NER Logistics';
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Live Operations Monitoring</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">NER Logistics Command Center</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Real-time terrain accessibility, road disruptions, and essential supply tracking.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="btn btn-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <Link to="/alerts" className="btn btn-sm btn-primary">
            <Radio size={14} /> Broadcast Alert
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Disruptions"
          value={stats.activeDisruptions}
          icon={<AlertTriangle size={22} />}
          color="red"
          trend="Landslides Active"
          trendUp={false}
        />
        <StatCard
          title="Vehicles In Transit"
          value={stats.vehiclesInTransit}
          icon={<Truck size={22} />}
          color="teal"
          trend="GPS Synced"
          trendUp={true}
        />
        <StatCard
          title="Disconnected Districts"
          value={stats.districtsDisconnected}
          icon={<MapIcon size={22} />}
          color="amber"
          trend="Tawang Sector"
          trendUp={false}
        />
        <StatCard
          title="Pending Ground Reports"
          value={stats.pendingReports}
          icon={<FileWarning size={22} />}
          color="blue"
          trend="Field Verified"
          trendUp={true}
        />
      </div>

      {/* Interactive GIS Map & Alert Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GIS Map Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-card border border-slate-200 flex flex-col h-[520px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Compass size={20} className="text-teal-600" /> Interactive NER GIS Logistics Map
              </h3>
              <p className="text-xs text-slate-500 font-medium">Click markers for live transit hub status & terrain conditions</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Open</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Partial</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Disrupted</span>
            </div>
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 relative z-0">
            <MapContainer
              center={[25.8, 92.8]}
              zoom={7}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Hub Markers */}
              {nerHubs.map((hub, idx) => (
                <Marker key={idx} position={hub.coords as [number, number]} icon={hub.icon}>
                  <Popup>
                    <div className="p-1 text-xs">
                      <div className="font-bold text-sm text-slate-800">{hub.name}</div>
                      <div className="text-slate-600 mt-0.5">{hub.type}</div>
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex justify-between items-center font-bold">
                        <span>Status:</span>
                        <span className={hub.status === 'CONNECTED' ? 'text-emerald-600' : hub.status === 'PARTIAL' ? 'text-amber-600' : 'text-red-600'}>
                          {hub.status}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Vehicle GPS Markers */}
              {vehicles.map((v, idx) => {
                const coords = v.currentLocation?.coordinates;
                if (coords && coords.length === 2) {
                  return (
                    <Marker key={`v-${idx}`} position={[coords[1], coords[0]]} icon={blueIcon}>
                      <Popup>
                        <div className="p-1 text-xs">
                          <div className="font-bold text-blue-700">🚚 {v.vehicleId}</div>
                          <div className="text-slate-600 font-medium">Cargo: {v.cargoType}</div>
                          <div className="text-slate-500">Driver: {v.driverName}</div>
                          <div className="mt-1 font-bold text-teal-600">{v.status}</div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}

              {/* Highway Corridor Line (Guwahati - Shillong) */}
              <Polyline
                positions={[
                  [26.1445, 91.7362],
                  [25.5788, 91.8833]
                ]}
                color="#10b981"
                weight={4}
                dashArray="6, 6"
              />

              {/* Tezpur to Tawang Highway Line (Blocked section) */}
              <Polyline
                positions={[
                  [26.6528, 92.7926],
                  [27.5878, 91.8673]
                ]}
                color="#ef4444"
                weight={4}
              />
            </MapContainer>
          </div>
        </div>

        {/* Recent Alerts Feed (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-card border border-slate-200 flex flex-col h-[520px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Critical Alerts</h3>
              <p className="text-xs text-slate-500 font-medium">Broadcasted to field units</p>
            </div>
            <Link to="/alerts" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              View All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
            {alerts.map(a => (
              <div
                key={a._id}
                className={`p-4 rounded-2xl border transition-all ${
                  a.severity === 'CRITICAL'
                    ? 'bg-red-50/70 border-red-200/80 text-red-900'
                    : 'bg-amber-50/70 border-amber-200/80 text-amber-900'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    a.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {a.severity}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-xs font-bold mt-1.5 leading-snug">{a.message}</div>
                <div className="text-[10px] opacity-75 font-semibold mt-2">
                  Sector: {a.affectedDistricts?.join(', ') || 'Regional Corridor'}
                </div>
              </div>
            ))}

            {alerts.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                <p className="text-xs font-bold text-slate-700">All Corridors Operational</p>
                <p className="text-[10px]">No active critical disruption alerts.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

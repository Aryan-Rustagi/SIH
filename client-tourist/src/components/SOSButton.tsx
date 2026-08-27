import React, { useState, useEffect } from 'react';
import { useAlerts } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Radio, AlertTriangle, CheckCircle, X, MapPin } from 'lucide-react';

export const SOSButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { myActiveAlert, triggerSOS, cancelAlert } = useAlerts();

  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('Detecting current GPS location...');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [customMsg, setCustomMsg] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Automatically acquire device location
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setAddress(
            `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
          );
          setIsLocating(false);
        },
        (error) => {
          console.warn('Geolocation error or permission denied:', error.message);
          // Fallback to default landmark for demo/testing
          setCoords({ latitude: 28.6139, longitude: 77.209 });
          setAddress('Central Tourist District (Default/Simulated GPS)');
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setCoords({ latitude: 28.6139, longitude: 77.209 });
      setAddress('Central Tourist District (Default/Simulated GPS)');
      setIsLocating(false);
    }
  };

  const handleStartSOS = () => {
    if (!isAuthenticated) {
      window.location.href = '/login?redirect=/';
      return;
    }
    setShowConfirmModal(true);
  };

  const executeSOSDispatch = async () => {
    setIsSubmitting(true);
    const activeCoords = coords || { latitude: 28.6139, longitude: 77.209 };

    await triggerSOS({
      latitude: activeCoords.latitude,
      longitude: activeCoords.longitude,
      address,
      message: customMsg || 'EMERGENCY SOS: Tourist in distress! Immediate rescue required.',
    });

    setIsSubmitting(false);
    setShowConfirmModal(false);
  };

  const handleCancelSOS = async () => {
    if (myActiveAlert) {
      await cancelAlert(myActiveAlert._id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* If an active SOS is already firing */}
      {myActiveAlert ? (
        <div className="w-full max-w-md p-6 rounded-2xl glass-panel-glow border-2 border-rose-500/80 animate-pulse bg-rose-950/40">
          <div className="flex items-center justify-center gap-2 mb-3 text-rose-400 font-bold text-lg">
            <Radio className="w-6 h-6 animate-spin" />
            <span>SOS BEACON ACTIVE</span>
          </div>

          <p className="text-slate-200 text-sm mb-4">
            Emergency distress signal transmitted to Police and Rescue Command Center. Responders are tracking your location.
          </p>

          <div className="p-3 bg-slate-900/80 rounded-xl mb-4 text-xs text-left border border-slate-800 space-y-1">
            <div className="text-slate-400">Status: <span className="text-rose-400 font-semibold">{myActiveAlert.status}</span></div>
            <div className="text-slate-400">GPS: <span className="text-slate-200">{myActiveAlert.latitude.toFixed(4)}, {myActiveAlert.longitude.toFixed(4)}</span></div>
            {myActiveAlert.acknowledgedBy && (
              <div className="text-emerald-400 font-medium">✓ Acknowledged by Rescue Dispatch</div>
            )}
          </div>

          <button
            onClick={handleCancelSOS}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <X className="w-4 h-4" />
            Cancel False Alarm
          </button>
        </div>
      ) : (
        /* Standby SOS Panic Button */
        <div className="relative flex flex-col items-center">
          {/* Pulsating radar backdrops */}
          <div className="absolute inset-0 rounded-full bg-rose-600/10 blur-3xl -z-10 scale-150"></div>

          <button
            onClick={handleStartSOS}
            disabled={isSubmitting}
            className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/50 hover:shadow-rose-600/80 hover:scale-105 active:scale-95 transition-all duration-300 animate-sos-pulse border-4 border-rose-400/40 cursor-pointer"
          >
            <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md text-white mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-2xl sm:text-3xl font-black tracking-widest uppercase drop-shadow-md">
              SOS
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider opacity-90 uppercase">
              One-Touch Rescue
            </span>
          </button>

          {/* Location status badge */}
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{isLocating ? 'Acquiring GPS...' : address}</span>
            <button
              onClick={fetchCurrentLocation}
              className="text-rose-400 hover:underline ml-1 font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/50 rounded-2xl p-6 text-left shadow-2xl shadow-rose-950">
            <div className="flex items-center gap-3 text-rose-500 mb-3">
              <div className="p-3 bg-rose-500/10 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Confirm Emergency SOS</h3>
                <p className="text-xs text-slate-400">Broadcast distress signal to emergency rescue units</p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              <label className="block text-xs font-medium text-slate-300">
                Optional Emergency Note:
              </label>
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="e.g. Lost in market, medical emergency, injured..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                📍 <strong>GPS Broadcast:</strong> {address}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeSOSDispatch}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? 'Dispatching...' : 'Transmit SOS Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

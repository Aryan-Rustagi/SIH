import React, { useEffect, useState } from 'react';
import { AlertOctagon, X } from 'lucide-react';
import { checkGeofence, GeofenceResponse } from '../services/aiService';

export const AiGeoFenceAlert: React.FC = () => {
  const [alertData, setAlertData] = useState<GeofenceResponse | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performCheck = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const result = await checkGeofence(latitude, longitude);
            
            if (result.is_in_zone) {
              setAlertData(result);
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          } catch (err: any) {
            console.error("Geofence check failed", err);
            // Optionally set error if you want to display an offline state, but for a popup, we usually fail silently.
            setError(err.message);
          }
        },
        (err) => console.error("GeoFence GPS Error:", err)
      );
    };

    // Initial check
    performCheck();

    // Check every 30 seconds
    const interval = setInterval(performCheck, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!isVisible || !alertData) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-lg w-full shadow-lg animate-in fade-in zoom-in duration-300 relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-all duration-200 p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <AlertOctagon className="w-12 h-12 text-red-600" />
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2 uppercase">
            DANGER
          </h2>
          <h3 className="text-xl font-bold text-red-700 mb-4">
            You are entering a High Risk Zone
          </h3>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 w-full mb-6 text-left">
            <p className="text-red-700">
              <span className="font-bold text-gray-900">Zone Name:</span> {alertData.zone_name}
            </p>
            <p className="text-red-700">
              <span className="font-bold text-gray-900">Risk Level:</span> {alertData.risk_level}
            </p>
          </div>

          <p className="text-gray-600 mb-6 font-medium">
            Please exercise extreme caution or leave the area immediately. Use the Safety Assistant if you need help.
          </p>

          <button 
            onClick={() => setIsVisible(false)}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 shadow-sm"
          >
            Leave Area
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EmergencySMSButtonProps {
  phoneNumber?: string; // Optional gateway number, defaults to +91YOURNUMBER
}

export const EmergencySMSButton: React.FC<EmergencySMSButtonProps> = ({ 
  phoneNumber = '+91YOURNUMBER' 
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendSOS = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userId = user?.id || 'UNKNOWN';
        const message = `ID:${userId}|LAT:${latitude.toFixed(6)}|LNG:${longitude.toFixed(6)}|SOS`;
        
        // Construct the SMS URI
        const encodedMessage = encodeURIComponent(message);
        const smsUri = `sms:${phoneNumber}?&body=${encodedMessage}`;
        
        // Open the native SMS app
        window.location.href = smsUri;
        
        setLoading(false);
      },
      (geoError) => {
        console.error('Error getting location:', geoError);
        setError('Failed to get GPS location. Cannot send offline SOS without location.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <button
        onClick={handleSendSOS}
        disabled={loading}
        className="w-full flex items-center justify-center p-4 text-xl font-bold text-white transition-all duration-300 transform bg-red-600 rounded-2xl shadow-xl hover:bg-red-700 hover:scale-105 active:scale-95 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <Loader2 className="w-8 h-8 mr-3 animate-spin" />
        ) : (
          <AlertTriangle className="w-8 h-8 mr-3 animate-pulse" />
        )}
        {loading ? 'Getting Location...' : 'Emergency Offline SOS'}
      </button>
      
      {error && (
        <div className="p-3 mt-4 text-sm font-medium text-red-800 bg-red-100 border border-red-300 rounded-lg shadow-sm">
          <p className="flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}
      
      <p className="mt-3 text-xs text-center text-gray-500 font-medium">
        Use this if you have no internet connection. Standard SMS rates may apply.
      </p>
    </div>
  );
};

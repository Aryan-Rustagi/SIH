import React, { useState, useEffect } from 'react';
import { CloudSun, CloudRain, AlertTriangle, MapPinOff, Loader2 } from 'lucide-react';
import api from '../services/api';

interface WeatherData {
  temperature: number;
  feels_like: number;
  humidity: number;
  main: string;
  description: string;
  wind_speed: number;
  icon: string;
}

export const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await api.get(`/weather?lat=${latitude}&lng=${longitude}`);
            if (res.data.success) {
              setWeather(res.data.data);
            } else {
              setError('Failed to fetch weather data');
            }
          } catch (err: any) {
            console.error('Error fetching weather:', err);
            setError('Weather service unavailable');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.warn('Geolocation error:', err);
          setError('Location access denied');
          setLoading(false);
        }
      );
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-card flex items-center justify-center min-h-[140px]">
        <Loader2 className="animate-spin text-blue-500 mb-2" size={24} />
        <p className="text-secondary text-sm">Getting local weather...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-icon dashboard-card-icon-gray"><MapPinOff size={22} /></div>
        <p className="dashboard-card-label">Weather</p>
        <h2 className="text-lg">Location unavailable</h2>
        <p className="text-secondary text-sm">{error || 'Could not load weather data. Please enable GPS.'}</p>
      </div>
    );
  }

  const isBadWeather = ['Thunderstorm', 'Rain', 'Snow', 'Extreme'].includes(weather.main);

  return (
    <div className={`dashboard-card ${isBadWeather ? 'border-amber-200 bg-amber-50' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className={`dashboard-card-icon ${isBadWeather ? 'dashboard-card-icon-amber' : 'dashboard-card-icon-blue'}`}>
          {isBadWeather ? <CloudRain size={22} /> : <CloudSun size={22} />}
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.description}
          className="w-12 h-12 -mt-2 -mr-2 drop-shadow-sm"
        />
      </div>
      
      <p className="dashboard-card-label">Weather</p>
      
      <div className="flex items-baseline gap-2 mb-1">
        <h2 className="text-2xl font-bold">{Math.round(weather.temperature)}°C</h2>
        <span className="text-sm font-medium capitalize text-gray-700">{weather.description}</span>
      </div>
      
      {isBadWeather ? (
        <p className="text-amber-700 text-sm flex items-center gap-1 mt-2">
          <AlertTriangle size={14} /> Warn: {weather.main} conditions.
        </p>
      ) : (
        <p className="text-secondary text-sm">Feels like {Math.round(weather.feels_like)}°C. Stay safe.</p>
      )}
    </div>
  );
};

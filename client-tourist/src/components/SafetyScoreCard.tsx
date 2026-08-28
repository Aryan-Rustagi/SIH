import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, Shield, AlertTriangle, Loader2 } from 'lucide-react';
import { getAdvancedRiskScore, RiskScoreResponse } from '../services/aiService';

export const SafetyScoreCard: React.FC = () => {
  const [data, setData] = useState<RiskScoreResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScore = () => {
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const currentHour = new Date().getHours();
            // Mocking weather_severity for now (0.0 - 1.0)
            const weatherSeverity = 0.2; 

            const result = await getAdvancedRiskScore(latitude, longitude, currentHour, weatherSeverity);
            setData(result);
            setError(null);
          } catch (err: any) {
            setError(err.message || 'AI Offline, showing basic safety info');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error(err);
          setError("Failed to get location");
          setLoading(false);
        }
      );
    };

    fetchScore();
    // Refresh score every 5 minutes
    const interval = setInterval(fetchScore, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-card flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-secondary">Analyzing environmental & spatial risks...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-card flex flex-col items-center justify-center min-h-[200px]">
        <Shield className="w-12 h-12 text-gray-600 mb-4" />
        <h3 className="text-xl font-bold mb-2">Safety Score Unavailable</h3>
        <p className="text-muted text-center">{error}</p>
      </div>
    );
  }

  // Determine styling based on risk level
  let colorClass = 'text-green-500';
  let bgGlowClass = 'shadow-[0_0_30px_rgba(34,197,94,0.15)]';
  let Icon = ShieldCheck;

  switch (data.risk_level) {
    case 'YELLOW':
      colorClass = 'text-yellow-500';
      bgGlowClass = 'shadow-[0_0_30px_rgba(234,179,8,0.15)]';
      Icon = ShieldAlert;
      break;
    case 'ORANGE':
      colorClass = 'text-orange-500';
      bgGlowClass = 'shadow-[0_0_30px_rgba(249,115,22,0.2)]';
      Icon = AlertTriangle;
      break;
    case 'RED':
      colorClass = 'text-red-500';
      bgGlowClass = 'shadow-[0_0_30px_rgba(239,68,68,0.3)] border-red-900/50';
      Icon = AlertTriangle;
      break;
  }

  return (
    <div className="dashboard-card flex flex-col min-h-[200px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-secondary font-medium uppercase tracking-wider text-sm mb-1">
            Real-Time AI Risk Score
          </h3>
          <p className="text-xs text-muted">Powered by XGBoost</p>
        </div>
        <div className={`p-3 rounded-xl bg-gray-50 ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className={`text-6xl font-bold tracking-tighter ${colorClass}`}>
          {data.risk_score}
        </span>
        <span className="text-muted text-xl font-medium mb-1.5">/ 100</span>
      </div>

      <div className="mt-auto bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-sm text-secondary leading-relaxed">
          <span className="font-semibold text-gray-900">AI Recommendation:</span> {data.recommended_action}
        </p>
      </div>
    </div>
  );
};

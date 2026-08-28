import api from './api';

export interface RiskScoreResponse {
  risk_score: number;
  risk_level: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';
  recommended_action: string;
}

export interface GeofenceResponse {
  is_in_zone: boolean;
  zone_name: string | null;
  risk_level: string | null;
}

export const getAdvancedRiskScore = async (
  lat: number,
  lng: number,
  hour: number,
  weather_severity: number
): Promise<RiskScoreResponse> => {
  try {
    // We add dummy values for month and crime_rate since the UI might not provide them
    const month = new Date().getMonth() + 1;
    const crime_rate = 0.5; 
    
    const res = await api.post('/ai/risk-score', {
      lat,
      lng,
      hour,
      month,
      weather_severity,
      crime_rate
    });
    const data = res.data.data || res.data;
    return {
      risk_score: data.risk_score ?? data.riskScore ?? 25,
      risk_level: data.risk_level ?? data.riskLevel ?? 'GREEN',
      recommended_action: data.recommended_action ?? data.suggestedAction ?? 'Stay aware of your surroundings and keep 112 handy.',
    };
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error('AI Offline');
  }
};

export const checkGeofence = async (lat: number, lng: number): Promise<GeofenceResponse> => {
  try {
    const res = await api.post('/ai/check-geofence', { lat, lng });
    return res.data;
  } catch (error) {
    console.error("AI Geofence Error:", error);
    throw new Error('AI Offline');
  }
};

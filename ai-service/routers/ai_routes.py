from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from services.ml_service import get_risk_score, detect_movement_anomaly
from services.geo_service import check_point_in_polygon, find_nearest_safe_havens

router = APIRouter(prefix="/api/ai", tags=["AI Services"])

# ---------------------------------------------------------
# Feature 1: Advanced AI Risk Scoring (XGBoost)
# ---------------------------------------------------------
class RiskScoreRequest(BaseModel):
    lat: float
    lng: float
    hour: int
    month: int
    weather_severity: float
    crime_rate: float

class RiskScoreResponse(BaseModel):
    risk_score: int
    risk_level: str
    recommended_action: str

@router.post("/advanced-risk-score", response_model=RiskScoreResponse)
async def advanced_risk_score(req: RiskScoreRequest):
    try:
        result = get_risk_score(
            req.lat, req.lng, req.hour, req.month, 
            req.weather_severity, req.crime_rate
        )
        return result
    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------------------------------------
# Feature 2: Behavioral Anomaly Detection
# ---------------------------------------------------------
class LocationPoint(BaseModel):
    lat: float
    lng: float
    timestamp: str

class AnomalyRequest(BaseModel):
    history: List[LocationPoint]
    current_location: LocationPoint

class AnomalyResponse(BaseModel):
    is_anomaly: bool
    anomaly_reason: str

@router.post("/anomaly-detection", response_model=AnomalyResponse)
async def anomaly_detection(req: AnomalyRequest):
    try:
        history_dicts = [h.model_dump() for h in req.history]
        curr_dict = req.current_location.model_dump()
        result = detect_movement_anomaly(history_dicts, curr_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------------------------------------
# Feature 3: Precise Geo-fencing (Shapely)
# ---------------------------------------------------------
class PolygonZone(BaseModel):
    name: str
    risk_level: str
    geojson: Dict[str, Any]

class GeofenceRequest(BaseModel):
    lat: float
    lng: float
    polygons: List[PolygonZone]

class GeofenceResponse(BaseModel):
    is_in_zone: bool
    zone_name: Optional[str] = None
    risk_level: Optional[str] = None

@router.post("/check-geofence", response_model=GeofenceResponse)
async def check_geofence(req: GeofenceRequest):
    try:
        poly_dicts = [p.model_dump() for p in req.polygons]
        result = check_point_in_polygon(req.lat, req.lng, poly_dicts)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------------------------------------
# Feature 4: Nearest Safe Haven (Geopy)
# ---------------------------------------------------------
class SafeLocation(BaseModel):
    id: str
    name: str
    type: str
    lat: float
    lng: float

class NearbyHelpRequest(BaseModel):
    lat: float
    lng: float
    safe_locations: List[SafeLocation]

class NearbyHelpResult(BaseModel):
    id: str
    name: str
    type: str
    distance_km: float
    lat: float
    lng: float

@router.post("/nearby-help", response_model=List[NearbyHelpResult])
async def nearby_help(req: NearbyHelpRequest):
    try:
        loc_dicts = [l.model_dump() for l in req.safe_locations]
        result = find_nearest_safe_havens(req.lat, req.lng, loc_dicts)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

import os
import numpy as np
import joblib
from xgboost import XGBClassifier
from sklearn.ensemble import IsolationForest
import math
from datetime import datetime

MODEL_PATH = os.getenv("RISK_MODEL_PATH", "models/risk_model.pkl")

# ---------------------------------------------------------
# Feature 1: XGBoost Advanced Risk Scoring
# ---------------------------------------------------------
def train_xgboost_model() -> str:
    """
    Trains a synthetic XGBoost model for risk scoring based on:
    hour, month, lat, lng, weather_severity, crime_rate.
    """
    print("Generating synthetic data for XGBoost...")
    # Generate synthetic training data
    np.random.seed(42)
    n_samples = 1000
    
    # Features: hour (0-23), month (1-12), lat, lng, weather (0-1), crime_rate (0-1)
    hours = np.random.randint(0, 24, n_samples)
    months = np.random.randint(1, 13, n_samples)
    lats = np.random.uniform(28.0, 29.0, n_samples) # Near Delhi
    lngs = np.random.uniform(77.0, 78.0, n_samples)
    weather_severity = np.random.rand(n_samples)
    crime_rate = np.random.rand(n_samples)
    
    X = np.column_stack((hours, months, lats, lngs, weather_severity, crime_rate))
    
    # Target: 0 (Green), 1 (Yellow), 2 (Orange), 3 (Red)
    # Simple synthetic logic: night time + high crime + bad weather = high risk
    y = []
    for i in range(n_samples):
        risk = 0
        if hours[i] < 6 or hours[i] > 20: risk += 1
        if crime_rate[i] > 0.6: risk += 1
        if weather_severity[i] > 0.8: risk += 1
        y.append(risk)
        
    y = np.array(y)
    
    # Train model
    print("Training XGBoost classifier...")
    model = XGBClassifier(n_estimators=50, max_depth=3, random_state=42)
    model.fit(X, y)
    
    # Ensure models dir exists
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    
    joblib.dump(model, MODEL_PATH)
    return f"Model trained and saved to {MODEL_PATH}"

def get_risk_score(lat: float, lng: float, hour: int, month: int, weather_severity: float, crime_rate: float) -> dict:
    """
    Loads XGBoost model and returns a risk score prediction.
    """
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Risk model not found. Run training script first.")
        
    model = joblib.load(MODEL_PATH)
    
    # XGBoost expects a 2D array
    X_input = np.array([[hour, month, lat, lng, weather_severity, crime_rate]])
    
    # Get probabilities
    probs = model.predict_proba(X_input)[0]
    
    # Calculate a 0-100 score based on probabilities of higher classes
    # classes: 0: GREEN, 1: YELLOW, 2: ORANGE, 3: RED
    score = (probs[1] * 33) + (probs[2] * 66) + (probs[3] * 100)
    score = int(min(max(score, 0), 100))
    
    class_pred = int(model.predict(X_input)[0])
    levels = ["GREEN", "YELLOW", "ORANGE", "RED"]
    level = levels[class_pred]
    
    actions = {
        "GREEN": "Normal precautions. Area is safe.",
        "YELLOW": "Stay alert. Some minor risks detected.",
        "ORANGE": "Exercise high caution. Stick to well-lit areas.",
        "RED": "Immediate danger zone. Seek safe shelter immediately!"
    }
    
    return {
        "risk_score": score,
        "risk_level": level,
        "recommended_action": actions[level]
    }

# ---------------------------------------------------------
# Feature 2: Behavioral Anomaly Detection
# ---------------------------------------------------------
def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate distance in km between two points."""
    R = 6371  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1-a))

def detect_movement_anomaly(history: list, current_loc: dict) -> dict:
    """
    Uses IsolationForest to detect anomaly in movement based on distance jumps.
    history: list of dicts {"lat": X, "lng": Y, "timestamp": timestamp}
    current_loc: {"lat": X, "lng": Y, "timestamp": timestamp}
    """
    if not history or len(history) < 2:
        return {"is_anomaly": False, "anomaly_reason": "Not enough history to detect anomaly"}
        
    # Extract features: distance from previous point and speed
    X = []
    
    # Parse timestamps
    def parse_ts(ts):
        if isinstance(ts, str):
            try:
                # ISO format
                return datetime.fromisoformat(ts.replace("Z", "+00:00")).timestamp()
            except:
                return float(ts)
        return float(ts)
        
    for i in range(1, len(history)):
        prev = history[i-1]
        curr = history[i]
        
        dist = haversine_distance(prev["lat"], prev["lng"], curr["lat"], curr["lng"])
        t_diff = parse_ts(curr["timestamp"]) - parse_ts(prev["timestamp"])
        
        speed = dist / (t_diff / 3600) if t_diff > 0 else 0
        X.append([dist, speed])
        
    # Train IsolationForest on history
    iso_forest = IsolationForest(contamination=0.1, random_state=42)
    
    # If not enough variance, just return false
    if len(X) < 3:
        return {"is_anomaly": False, "anomaly_reason": "Insufficient tracking data"}
        
    X_train = np.array(X)
    iso_forest.fit(X_train)
    
    # Test current location against last history point
    last_hist = history[-1]
    cur_dist = haversine_distance(last_hist["lat"], last_hist["lng"], current_loc["lat"], current_loc["lng"])
    cur_t_diff = parse_ts(current_loc["timestamp"]) - parse_ts(last_hist["timestamp"])
    cur_speed = cur_dist / (cur_t_diff / 3600) if cur_t_diff > 0 else 0
    
    X_test = np.array([[cur_dist, cur_speed]])
    
    # Predict (1 = normal, -1 = anomaly)
    pred = iso_forest.predict(X_test)[0]
    
    if pred == -1:
        reason = "Sudden deviation from route" if cur_dist > 5.0 else "Rapid movement detected"
        return {"is_anomaly": True, "anomaly_reason": reason}
        
    return {"is_anomaly": False, "anomaly_reason": "Movement is normal"}

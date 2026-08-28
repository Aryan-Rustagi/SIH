import requests
import json
import time

BASE_URL = "http://localhost:8000/api/ai"

print("--- Testing Python AI Microservice ---")

# 1. Advanced Risk Score
print("\n[1] Testing /advanced-risk-score")
try:
    risk_data = {
        "lat": 28.61, "lng": 77.23,
        "hour": 22, "month": 8,
        "weather_severity": 0.9, "crime_rate": 0.8
    }
    res = requests.post(f"{BASE_URL}/advanced-risk-score", json=risk_data)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2))
except Exception as e:
    print("Failed:", e)

# 2. Anomaly Detection
print("\n[2] Testing /anomaly-detection")
try:
    # Simulating a user jumping 10km in 5 minutes (an anomaly)
    history = [
        {"lat": 28.610, "lng": 77.230, "timestamp": str(time.time() - 600)},
        {"lat": 28.611, "lng": 77.231, "timestamp": str(time.time() - 300)}
    ]
    current = {"lat": 28.710, "lng": 77.330, "timestamp": str(time.time())}
    anomaly_data = {"history": history, "current_location": current}
    
    res = requests.post(f"{BASE_URL}/anomaly-detection", json=anomaly_data)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2))
except Exception as e:
    print("Failed:", e)

# 3. Geo-fencing
print("\n[3] Testing /check-geofence")
try:
    poly_data = {
        "lat": 28.61, "lng": 77.23,
        "polygons": [
            {
                "name": "Danger Zone A",
                "risk_level": "RED",
                "geojson": {
                    "type": "Polygon",
                    "coordinates": [[[77.22, 28.60], [77.24, 28.60], [77.24, 28.62], [77.22, 28.62], [77.22, 28.60]]]
                }
            }
        ]
    }
    res = requests.post(f"{BASE_URL}/check-geofence", json=poly_data)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2))
except Exception as e:
    print("Failed:", e)

# 4. Nearest Safe Haven
print("\n[4] Testing /nearby-help")
try:
    help_data = {
        "lat": 28.61, "lng": 77.23,
        "safe_locations": [
            {"id": "1", "name": "Delhi Police HQ", "type": "Police", "lat": 28.628, "lng": 77.243},
            {"id": "2", "name": "AIIMS Hospital", "type": "Hospital", "lat": 28.567, "lng": 77.210},
            {"id": "3", "name": "Local Clinic", "type": "Clinic", "lat": 28.615, "lng": 77.235}
        ]
    }
    res = requests.post(f"{BASE_URL}/nearby-help", json=help_data)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2))
except Exception as e:
    print("Failed:", e)

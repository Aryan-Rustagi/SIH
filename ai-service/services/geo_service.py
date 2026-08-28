from shapely.geometry import Point, shape
from geopy.distance import geodesic

# ---------------------------------------------------------
# Feature 3: Precise Geo-fencing
# ---------------------------------------------------------
def check_point_in_polygon(lat: float, lng: float, polygons: list) -> dict:
    """
    Checks if a point falls within any of the provided GeoJSON polygons.
    polygons: list of dicts {"name": "Zone A", "risk_level": "RED", "geojson": {...}}
    """
    point = Point(lng, lat)  # Shapely takes (x, y) which is (lng, lat)
    
    for poly_data in polygons:
        geojson_geom = poly_data.get("geojson")
        if not geojson_geom:
            continue
            
        try:
            poly = shape(geojson_geom)
            if poly.contains(point):
                return {
                    "is_in_zone": True,
                    "zone_name": poly_data.get("name", "Unknown Zone"),
                    "risk_level": poly_data.get("risk_level", "UNKNOWN")
                }
        except Exception as e:
            print(f"Error parsing polygon: {e}")
            continue
            
    return {
        "is_in_zone": False,
        "zone_name": None,
        "risk_level": None
    }

# ---------------------------------------------------------
# Feature 4: Nearest Safe Haven
# ---------------------------------------------------------
def find_nearest_safe_havens(lat: float, lng: float, locations: list, top_n: int = 3) -> list:
    """
    Finds the top N nearest safe locations using Geopy.
    locations: list of dicts {"id": str, "name": str, "lat": float, "lng": float, "type": str}
    """
    if not locations:
        return []
        
    user_coords = (lat, lng)
    
    results = []
    for loc in locations:
        loc_coords = (loc["lat"], loc["lng"])
        try:
            dist_km = geodesic(user_coords, loc_coords).kilometers
            results.append({
                "id": loc.get("id"),
                "name": loc.get("name"),
                "type": loc.get("type"),
                "distance_km": round(dist_km, 2),
                "lat": loc["lat"],
                "lng": loc["lng"]
            })
        except Exception as e:
            print(f"Error calculating distance for {loc.get('name')}: {e}")
            
    # Sort by distance
    results.sort(key=lambda x: x["distance_km"])
    
    return results[:top_n]

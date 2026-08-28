from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables from the root folder
load_dotenv(dotenv_path="../.env")

from routers import ai_routes
from services.openrouter_service import get_safety_response_with_fallback
from pydantic import BaseModel
from typing import Optional

class ChatFallbackRequest(BaseModel):
    message: str
    lat: Optional[float] = None
    lng: Optional[float] = None

app = FastAPI(
    title="Tourist Safety AI Microservice",
    description="Advanced ML and Geospatial API for the Tourist Safety App",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(ai_routes.router)

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Tourist Safety AI Microservice"}

@app.post("/api/ai/chat-fallback")
async def chat_fallback(req: ChatFallbackRequest):
    try:
        result = get_safety_response_with_fallback(req.message, req.lat, req.lng)
        
        # Check if it's our hardcoded error response
        if not result.get("success", False):
            # We can still return 200 with the safe fallback string
            # to ensure the frontend doesn't crash
            return {"response": result.get("reply", "AI is temporarily offline. Please call 112 for emergencies.")}
            
        return {"response": result.get("reply")}
    except Exception as e:
        print(f"Fallback Chat Endpoint Error: {str(e)}")
        # Ultimate safety fallback
        return {"response": "AI is temporarily offline. Please call 112 for emergencies."}

if __name__ == "__main__":
    import uvicorn
    # Allow running the script directly
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

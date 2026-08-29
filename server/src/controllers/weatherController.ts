import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// In-memory cache
// Key: "lat,lng" (rounded to 2 decimal places) -> ~1km precision
// Value: { data: any, timestamp: number }
const weatherCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export const getWeather = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      res.status(400).json({ success: false, message: 'lat and lng are required query parameters.' });
      return;
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);

    if (isNaN(latitude) || isNaN(longitude)) {
      res.status(400).json({ success: false, message: 'Invalid lat or lng.' });
      return;
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey === 'your_openweather_api_key') {
      // Mock data for demo purposes when API key is not set
      res.json({
        success: true,
        data: {
          temperature: 28,
          feels_like: 30,
          humidity: 60,
          main: 'Clear',
          description: 'clear sky',
          wind_speed: 3.5,
          icon: '01d',
        }
      });
      return;
    }

    // Cache key based on rounded coordinates (~1.1km precision for 2 decimal places)
    const cacheKey = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
    const now = Date.now();

    // Check cache
    const cachedItem = weatherCache.get(cacheKey);
    if (cachedItem && now - cachedItem.timestamp < CACHE_DURATION_MS) {
      res.json({
        success: true,
        data: cachedItem.data,
      });
      return;
    }

    // Fetch from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`OpenWeatherMap API returned status: ${response.status}`);
    }

    const weatherData = response.data;
    
    // Parse the required fields
    const result = {
      temperature: weatherData.main?.temp,
      feels_like: weatherData.main?.feels_like,
      humidity: weatherData.main?.humidity,
      main: weatherData.weather?.[0]?.main,
      description: weatherData.weather?.[0]?.description,
      wind_speed: weatherData.wind?.speed,
      icon: weatherData.weather?.[0]?.icon,
    };

    // Update cache
    weatherCache.set(cacheKey, {
      data: result,
      timestamp: now,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error fetching weather:', error.message || error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data.',
    });
  }
};

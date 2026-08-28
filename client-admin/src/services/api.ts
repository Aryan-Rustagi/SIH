import axios from 'axios';

const rawUrl = (import.meta.env.VITE_API_URL || '').trim();
export const API_BASE_URL = rawUrl
  ? (rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/+$/, '')}/api`)
  : '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tourist_safety_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauth and we are not on login/register, clear token
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        localStorage.removeItem('tourist_safety_token');
        localStorage.removeItem('tourist_safety_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

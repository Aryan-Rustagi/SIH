import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { useAuth } from './context/AuthContext';

// Tourist Pages
import { TouristHome } from './pages/tourist/TouristHome';
import { SafeZones } from './pages/tourist/SafeZones';
import { ReportIncident } from './pages/tourist/ReportIncident';
import { EmergencyContacts } from './pages/tourist/EmergencyContacts';

// Admin / Responder Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSafetyZones } from './pages/admin/AdminSafetyZones';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: Array<'TOURIST' | 'RESPONDER' | 'ADMIN'>;
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs text-slate-400">
        Authenticating session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-rose-500 selection:text-white">
      <AlertBanner />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public & Tourist Routes */}
          <Route path="/" element={<TouristHome />} />
          <Route path="/zones" element={<SafeZones />} />
          <Route path="/report" element={<ReportIncident />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <EmergencyContacts />
              </ProtectedRoute>
            }
          />

          {/* Admin & Responder Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['RESPONDER', 'ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/zones"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminSafetyZones />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SafeTour Guardian Network • MERN Stack Platform</span>
          <span className="text-slate-400">MongoDB • Express • React • Node.js • Socket.IO</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

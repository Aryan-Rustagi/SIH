import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { Footer } from './components/Footer';
import { useAuth } from './context/AuthContext';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSafetyZones } from './pages/admin/AdminSafetyZones';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: Array<'TOURIST' | 'ADMIN'>;
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-text">Authenticating session...</div>;
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
    <div className="app-wrapper">
      <AlertBanner />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/zones"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminSafetyZones />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer portal="admin" />
    </div>
  );
};

export default App;

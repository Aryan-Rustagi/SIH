import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { DistrictView } from './pages/DistrictView';
import { VehicleTracking } from './pages/VehicleTracking';
import { RouteManagement } from './pages/RouteManagement';
import { AlertCenter } from './pages/AlertCenter';
import { FieldReportsView } from './pages/FieldReportsView';
import { Login } from './pages/auth/Login';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div className="p-10 text-center text-slate-500 font-semibold">Authenticating session...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN') return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/districts" element={<DistrictView />} />
                <Route path="/vehicles" element={<VehicleTracking />} />
                <Route path="/routes" element={<RouteManagement />} />
                <Route path="/alerts" element={<AlertCenter />} />
                <Route path="/reports" element={<FieldReportsView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { Footer } from './components/Footer';
import { useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { FieldDashboard } from './pages/field/FieldDashboard';
import { ReportDisruption } from './pages/field/ReportDisruption';
import { FieldReportUpload } from './pages/field/FieldReportUpload';
import { RouteChecker } from './pages/field/RouteChecker';
import { DeliveryTracker } from './pages/field/DeliveryTracker';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { LayoutWrapper } from './components/LayoutWrapper';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: Array<'FIELD_OFFICER' | 'ADMIN'>;
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-text">Authenticating session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role as 'FIELD_OFFICER' | 'ADMIN')) {
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
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['FIELD_OFFICER']}>
                  <FieldDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report-disruption"
              element={
                <ProtectedRoute allowedRoles={['FIELD_OFFICER']}>
                  <ReportDisruption />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-report"
              element={
                <ProtectedRoute allowedRoles={['FIELD_OFFICER']}>
                  <FieldReportUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/route-checker"
              element={
                <ProtectedRoute allowedRoles={['FIELD_OFFICER']}>
                  <RouteChecker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deliveries"
              element={
                <ProtectedRoute allowedRoles={['FIELD_OFFICER']}>
                  <DeliveryTracker />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </main>

      <Footer portal="field" />
    </div>
  );
};

export default App;

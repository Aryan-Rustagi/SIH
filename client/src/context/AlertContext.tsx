import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { getSocket } from '../services/socket';
import { useAuth } from './AuthContext';

export interface SOSAlertItem {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role?: string;
  };
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'CANCELLED';
  latitude: number;
  longitude: number;
  address?: string;
  message?: string;
  acknowledgedBy?: {
    _id: string;
    name: string;
  };
  createdAt: string;
  resolvedAt?: string;
}

interface AlertContextType {
  activeAlerts: SOSAlertItem[];
  myActiveAlert: SOSAlertItem | null;
  triggerSOS: (coords: { latitude: number; longitude: number; address?: string; message?: string }) => Promise<{ success: boolean; message?: string; alert?: SOSAlertItem }>;
  acknowledgeAlert: (id: string) => Promise<boolean>;
  resolveAlert: (id: string) => Promise<boolean>;
  cancelAlert: (id: string) => Promise<boolean>;
  fetchActiveAlerts: () => Promise<void>;
  isLoading: boolean;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [activeAlerts, setActiveAlerts] = useState<SOSAlertItem[]>([]);
  const [myActiveAlert, setMyActiveAlert] = useState<SOSAlertItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchActiveAlerts = async () => {
    if (!isAuthenticated) return;
    try {
      setIsLoading(true);
      if (user?.role === 'ADMIN' || user?.role === 'RESPONDER') {
        const res = await api.get('/sos/active');
        if (res.data.success) {
          setActiveAlerts(res.data.alerts);
        }
      }

      // Fetch personal alerts for tourist
      const myRes = await api.get('/sos/my-alerts');
      if (myRes.data.success && myRes.data.alerts) {
        const active = myRes.data.alerts.find(
          (a: SOSAlertItem) => a.status === 'ACTIVE' || a.status === 'ACKNOWLEDGED'
        );
        setMyActiveAlert(active || null);
      }
    } catch (err) {
      console.warn('Failed to load active alerts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchActiveAlerts();
    }
  }, [isAuthenticated, user?.role]);

  // Real-time socket event listeners
  useEffect(() => {
    const socket = getSocket();

    if (user?.role === 'ADMIN' || user?.role === 'RESPONDER') {
      socket.emit('join_responders');
    }

    const handleNewAlert = (newAlert: SOSAlertItem) => {
      console.log('🚨 Incoming Real-time SOS Alert received:', newAlert);
      setActiveAlerts((prev) => {
        const filtered = prev.filter((a) => a._id !== newAlert._id);
        return [newAlert, ...filtered];
      });

      if (user && newAlert.userId?._id === user.id) {
        setMyActiveAlert(newAlert);
      }
    };

    const handleAcknowledged = (updatedAlert: SOSAlertItem) => {
      setActiveAlerts((prev) =>
        prev.map((a) => (a._id === updatedAlert._id ? updatedAlert : a))
      );
      if (user && updatedAlert.userId?._id === user.id) {
        setMyActiveAlert(updatedAlert);
      }
    };

    const handleResolved = (resolvedAlert: SOSAlertItem) => {
      setActiveAlerts((prev) => prev.filter((a) => a._id !== resolvedAlert._id));
      if (myActiveAlert?._id === resolvedAlert._id) {
        setMyActiveAlert(null);
      }
    };

    const handleCancelled = ({ id }: { id: string }) => {
      setActiveAlerts((prev) => prev.filter((a) => a._id !== id));
      if (myActiveAlert?._id === id) {
        setMyActiveAlert(null);
      }
    };

    socket.on('new_sos_alert', handleNewAlert);
    socket.on('alert_acknowledged', handleAcknowledged);
    socket.on('alert_resolved', handleResolved);
    socket.on('alert_cancelled', handleCancelled);

    return () => {
      socket.off('new_sos_alert', handleNewAlert);
      socket.off('alert_acknowledged', handleAcknowledged);
      socket.off('alert_resolved', handleResolved);
      socket.off('alert_cancelled', handleCancelled);
    };
  }, [user, myActiveAlert]);

  const triggerSOS = async (coords: {
    latitude: number;
    longitude: number;
    address?: string;
    message?: string;
  }) => {
    try {
      const res = await api.post('/sos', coords);
      if (res.data.success) {
        setMyActiveAlert(res.data.alert);
        return { success: true, message: res.data.message, alert: res.data.alert };
      }
      return { success: false, message: res.data.message || 'Failed to dispatch SOS' };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Emergency trigger failed',
      };
    }
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      const res = await api.patch(`/sos/${id}/acknowledge`);
      return res.data.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const resolveAlert = async (id: string) => {
    try {
      const res = await api.patch(`/sos/${id}/resolve`);
      if (res.data.success) {
        if (myActiveAlert?._id === id) setMyActiveAlert(null);
        setActiveAlerts((prev) => prev.filter((a) => a._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const cancelAlert = async (id: string) => {
    try {
      const res = await api.patch(`/sos/${id}/cancel`);
      if (res.data.success) {
        if (myActiveAlert?._id === id) setMyActiveAlert(null);
        setActiveAlerts((prev) => prev.filter((a) => a._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <AlertContext.Provider
      value={{
        activeAlerts,
        myActiveAlert,
        triggerSOS,
        acknowledgeAlert,
        resolveAlert,
        cancelAlert,
        fetchActiveAlerts,
        isLoading,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

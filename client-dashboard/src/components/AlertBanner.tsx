import React from 'react';
import { useAlerts } from '../context/AlertContext';
import { ShieldAlert, Radio, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AlertBanner: React.FC = () => {
  const { myActiveAlert, activeAlerts } = useAlerts();
  const { user } = useAuth();
  const isResponder = user?.role === 'ADMIN';

  if (myActiveAlert) {
    return (
      <div className="alert-banner alert-banner-danger">
        <Radio size={16} className="animate-spin" />
        <span>YOUR SOS EMERGENCY IS ACTIVE — RESCUE TEAMS HAVE BEEN DISPATCHED</span>
        <span className="badge badge-rose font-mono">{myActiveAlert.status}</span>
      </div>
    );
  }

  if (isResponder && activeAlerts.length > 0) {
    return (
      <div className="alert-banner alert-banner-danger">
        <ShieldAlert size={16} />
        <span>
          {activeAlerts.length} ACTIVE TOURIST SOS {activeAlerts.length === 1 ? 'ALERT' : 'ALERTS'} IN QUEUE
        </span>
        <Link to="/" className="btn btn-sm btn-amber">
          Open Dispatch Console <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return null;
};

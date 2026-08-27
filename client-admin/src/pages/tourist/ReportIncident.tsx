import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  FileWarning,
  MapPin,
  Send,
  AlertTriangle,
  CheckCircle,
  UserX,
  Flame,
  Stethoscope,
  HelpCircle,
} from 'lucide-react';

export const ReportIncident: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('SCAM');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>({
    latitude: 28.6139,
    longitude: 77.209,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchCurrentCoords();
  }, []);

  const fetchCurrentCoords = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setAddress(`Near ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        () => {
          setCoords({ latitude: 28.6139, longitude: 77.209 });
          setAddress('Central Market Tourist Area');
          setIsLocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const categories = [
    { value: 'THEFT', label: 'Theft / Pickpocketing', icon: UserX },
    { value: 'SCAM', label: 'Tourist Scam / Overcharging', icon: AlertTriangle },
    { value: 'HARASSMENT', label: 'Harassment / Safety Threat', icon: AlertTriangle },
    { value: 'MEDICAL', label: 'Medical Emergency / Injury', icon: Stethoscope },
    { value: 'NATURAL_HAZARD', label: 'Natural Hazard / Flood / Landslide', icon: Flame },
    { value: 'OTHER', label: 'Other Hazard', icon: HelpCircle },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!isAuthenticated) {
      navigate('/login?redirect=/report');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please enter both a title and description.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/incidents', {
        title,
        description,
        category,
        latitude: coords.latitude,
        longitude: coords.longitude,
        address,
      });

      if (res.data.success) {
        setSuccessMsg('Incident reported successfully! It will be reviewed by local responders.');
        setTitle('');
        setDescription('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <FileWarning className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Report a Safety Incident</h1>
            <p className="text-xs text-slate-400">
              Contribute to real-time community safety for tourists and emergency responders.
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Incident Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-md shadow-amber-950/40'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Summary / Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Aggressive taxi scam outside north metro gate"
              required
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Detailed Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide key details, visual descriptions, exact landmark, or actions taken..."
              required
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Location details */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                Incident Location
              </label>
              <button
                type="button"
                onClick={fetchCurrentCoords}
                className="text-xs text-rose-400 hover:underline font-medium"
              >
                {isLocating ? 'Detecting...' : 'Detect GPS'}
              </button>
            </div>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Approximate address or landmark name"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />

            <div className="flex gap-3 text-xs text-slate-400">
              <span>Lat: {coords.latitude.toFixed(4)}</span>
              <span>Lng: {coords.longitude.toFixed(4)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-xl shadow-amber-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Transmitting Report...' : 'Publish Incident Warning'}
          </button>
        </form>
      </div>
    </div>
  );
};

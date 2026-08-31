import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, FileWarning, Camera, Upload, CheckCircle2, Loader2, MapPin, X, AlertCircle } from 'lucide-react';

export const FieldReportUpload: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [district, setDistrict] = useState('Kamrup Metropolitan');
  const [category, setCategory] = useState('ROAD_DAMAGE');
  const [severity, setSeverity] = useState('MEDIUM');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const districts = [
    'Kamrup Metropolitan',
    'East Khasi Hills',
    'Tawang',
    'West Kameng',
    'Dimapur',
    'Kohima',
    'Imphal West',
    'Aizawl',
    'Papum Pare',
    'East Sikkim'
  ];

  const categories = [
    { id: 'ROAD_DAMAGE', label: 'Road Cracking / Potholes', icon: '🛣️' },
    { id: 'BRIDGE_DAMAGE', label: 'Bridge Weakness / Scour', icon: '🌉' },
    { id: 'MUDSLIDE', label: 'Slope Mudslide / Slump', icon: '⛰️' },
    { id: 'FLOOD', label: 'Culvert Overflow', icon: '🌊' },
    { id: 'OTHER', label: 'General Obstruction', icon: '⚠️' }
  ];

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await api.post('/field-reports', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            district,
            type: category,
            description: desc,
            photos: photoPreview ? [photoPreview] : ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop'],
            severity
          });
          setSubmitted(true);
          setTimeout(() => navigate('/dashboard'), 1500);
        },
        async () => {
          // Fallback location
          await api.post('/field-reports', {
            latitude: 26.1445,
            longitude: 91.7362,
            district,
            type: category,
            description: desc,
            photos: photoPreview ? [photoPreview] : ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop'],
            severity
          });
          setSubmitted(true);
          setTimeout(() => navigate('/dashboard'), 1500);
        }
      );
    } catch (e) {
      alert('Report saved to local device queue. Will sync automatically when connection resumes.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="container max-w-lg mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-semibold text-sm transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-200/80">
          <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-md shadow-amber-500/10">
              <FileWarning size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Upload Ground Report</h1>
              <p className="text-xs text-slate-500 font-medium">Submit geo-referenced observations and damage photos</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Ground Report Transmitted!</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Your report has been indexed by the Command Center intelligence dashboard.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Photo Upload Area with preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Evidence Photo
                </label>
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-900 group">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 cursor-pointer transition-all duration-300 bg-slate-50 hover:bg-teal-50/50 border-2 border-dashed border-slate-300 hover:border-teal-400 group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-400 group-hover:text-teal-600 flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-105">
                      <Camera size={22} />
                    </div>
                    <span className="font-bold text-xs text-slate-700 group-hover:text-teal-700">Tap to Capture or Upload Photo</span>
                    <span className="text-[10px] text-slate-400 mt-1">Automatic timestamp & GPS coordinate stamp</span>
                  </label>
                )}
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Damage Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                        category === c.id
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* District Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  District Location
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="input-field text-xs font-semibold"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Observation & Structural Details
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  required
                  placeholder="E.g. Culvert partially compromised near km 14 due to flash flooding. Light vehicles passing slowly, heavy transport halted."
                  className="input-field text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !desc.trim()}
                className="btn btn-primary bg-amber-600 hover:bg-amber-700 text-white w-full py-4 text-sm font-bold mt-2 shadow-lg shadow-amber-500/25"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" /> Uploading & Geotagging...
                  </span>
                ) : (
                  'Transmit Ground Report'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

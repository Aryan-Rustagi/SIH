import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigation, MapPinned, FileWarning, Truck, ArrowRight, Lock, Mail, AlertTriangle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('tourist@safetour.app');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'NER Logistics — Accessibility Intelligence';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Authentication failed. Please check credentials.');
    }
  };

  const fillDemo = () => {
    setEmail('tourist@safetour.app');
    setPassword('password123');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-slate-50">
      {/* Hero Section */}
      <section className="bg-navy-950 text-white py-16 px-4 relative overflow-hidden">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider w-fit">
              <Sparkles size={14} /> AI-Powered Logistics Accessibility Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Smarter Logistics Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">North East India</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Real-time monitoring of mountain passes, bridge accessibility, and transport networks across difficult terrain. Predict landslide disruptions and keep essential supply chains moving.
            </p>

            {/* Quick stats pills */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-black text-white">8</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase mt-0.5">NER States</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-black text-teal-400">24/7</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase mt-0.5">Live Tracking</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-black text-emerald-400">AI</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase mt-0.5">Detour Engine</div>
              </div>
            </div>
          </div>

          {/* Right Column - Field Officer Login Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Field Officer Login</h2>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Access regional ground dispatch portal</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <ShieldCheck size={22} />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3.5 rounded-xl flex items-center gap-2.5 mb-4 text-xs font-semibold border border-red-200/60">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="input-field pl-10"
                      placeholder="officer@ner.gov.in"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="input-field pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3.5 mt-2 text-sm"
                >
                  {loading ? 'Authenticating...' : 'Secure Access'} <ArrowRight size={18} />
                </button>
              </form>

              {/* Demo Fill Helper */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Evaluation Mode:</span>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="font-bold text-teal-600 hover:text-teal-700 underline"
                >
                  Fill Demo Credentials
                </button>
              </div>

              {/* Command Center Link */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Looking for Command Center?</span>
                <a href="http://localhost:3002" target="_blank" rel="noreferrer" className="text-teal-700 font-bold hover:underline">
                  Port 3002 ➔
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-14 container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Core Logistics Intelligence Capabilities</h3>
          <p className="text-sm text-slate-500 mt-1">Built specifically for the rugged terrain and monsoon challenges of the North East.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Navigation size={24} />
            </div>
            <h4 className="font-bold text-base text-slate-800">AI Route Predictor</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Analyzes rainfall and elevation data to forecast landslides and suggest alternate bypass corridors.
            </p>
          </div>

          <div className="card p-6 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileWarning size={24} />
            </div>
            <h4 className="font-bold text-base text-slate-800">Ground Field Reports</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Geo-tagged photo uploads from field officers with automatic offline sync in remote network zones.
            </p>
          </div>

          <div className="card p-6 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPinned size={24} />
            </div>
            <h4 className="font-bold text-base text-slate-800">District Connectivity</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-time matrix showing connected, partially blocked, and cut-off districts across all 8 NER states.
            </p>
          </div>

          <div className="card p-6 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Truck size={24} />
            </div>
            <h4 className="font-bold text-base text-slate-800">Essential Cargo GPS</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Live tracking for medical supplies, food grain convoys, and disaster relief transport fleets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

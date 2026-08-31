import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Truck, Lock, Mail, AlertTriangle, ArrowRight, Sparkles, ShieldCheck, MapPin, Compass } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('tourist@safetour.app');
  const [password, setPassword] = useState('password123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Field Officer Sign In — NER Logistics';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);
    if (res.success) {
      navigate(redirect);
    } else {
      setErrorMsg(res.message || 'Login failed. Please check credentials.');
    }
  };

  const fillDemo = () => {
    setEmail('tourist@safetour.app');
    setPassword('password123');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-elevated border border-slate-200/80">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 mb-3">
            <Truck size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Field Officer Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Sign in to report disruptions and track supply convoys</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-3.5 rounded-xl flex items-center gap-2.5 mb-5 text-xs font-semibold border border-red-200/60">
            <AlertTriangle size={16} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Official Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-field pl-10 text-sm"
                placeholder="officer@ner.gov.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="input-field pl-10 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full py-4 text-sm font-bold mt-2 shadow-lg shadow-teal-500/20"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        {/* 1-Click Demo Helper */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
          <button
            type="button"
            onClick={fillDemo}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles size={14} className="text-amber-500" /> Auto-Fill Demo Credentials
          </button>

          <div className="text-center text-xs text-slate-400">
            Sector Administrator?{' '}
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noreferrer"
              className="text-teal-600 font-bold hover:underline"
            >
              Open Command Center
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, AlertTriangle, ArrowRight, Sparkles, Radio } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('admin@safetour.app');
  const [password, setPassword] = useState('password123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Command Center Sign In — NER Logistics';
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
      setErrorMsg(res.message || 'Authentication failed. Please check administrator credentials.');
    }
  };

  const fillAdmin = () => {
    setEmail('admin@safetour.app');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-4 relative overflow-hidden">
      
      {/* Background glow circle */}
      <div className="absolute w-96 h-96 rounded-full bg-teal-500/10 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 mb-3">
            <Shield size={28} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider mb-1">
            <Radio size={12} className="text-red-500 animate-pulse" /> Command Center
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">NER Logistics Administrator</h1>
          <p className="text-xs text-slate-500 mt-1">Regional supply chain & corridor dispatch console</p>
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
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-field pl-10 text-sm"
                placeholder="admin@safetour.app"
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
            {isSubmitting ? 'Authenticating...' : 'Access Command Console'} <ArrowRight size={18} />
          </button>
        </form>

        {/* 1-Click Demo Helper */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
          <button
            type="button"
            onClick={fillAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles size={14} className="text-amber-500" /> Auto-Fill Admin Credentials
          </button>

          <div className="text-center text-xs text-slate-400">
            Deployed in the field?{' '}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="text-teal-600 font-bold hover:underline"
            >
              Open Field Officer Portal
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

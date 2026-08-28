import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import { Shield, Lock, Mail, User, Phone, AlertTriangle, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role] = useState<UserRole>('TOURIST');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Create Account — SafeTour Guardian';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    const res = await register(name, email, password, role, phone);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div className="auth-header">
          <div className="auth-icon">
            <Shield size={22} color="#fff" />
          </div>
          <h1>Create Your Account</h1>
          <p className="page-desc">Join the tourist safety and emergency response network</p>
        </div>

        <div className="card">
          {errorMsg && (
            <div className="alert alert-error">
              <AlertTriangle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="label">Full Name</label>
              <div className="input-group">
                <User className="input-icon" size={16} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required className="input input-with-icon" />
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <div className="input-group">
                <Mail className="input-icon" size={16} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required className="input input-with-icon" />
              </div>
            </div>
            <div className="grid grid-2">
              <div>
                <label className="label">Phone (Optional)</label>
                <div className="input-group">
                  <Phone className="input-icon" size={16} />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="input input-with-icon" />
                </div>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="input-group">
                  <Lock className="input-icon" size={16} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 chars" required className="input input-with-icon" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

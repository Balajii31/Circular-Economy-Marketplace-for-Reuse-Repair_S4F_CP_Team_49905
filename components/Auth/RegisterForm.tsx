
import React, { useState } from 'react';
import { User, Mail, Lock, Loader2, AlertCircle, UserCircle } from 'lucide-react';
import { authService } from '../../lib/auth';

interface RegisterFormProps {
  onSuccess: () => void;
  onToggle: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await authService.register(name, email, password);
      authService.setToken(user);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Join the Movement</h2>
        <p className="text-slate-500 mt-2">Start your circular economy journey today</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
          <div className="relative">
            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Green"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <p className="text-[10px] text-slate-400 leading-relaxed px-1">
          By signing up, you agree to our Terms of Service and Privacy Policy. We'll use your data to calculate your environmental impact.
        </p>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-emerald-600 font-bold hover:underline">Sign In</button>
      </p>
    </div>
  );
};

export default RegisterForm;

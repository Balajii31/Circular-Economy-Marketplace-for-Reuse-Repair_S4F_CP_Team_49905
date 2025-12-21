
import React, { useState } from 'react';
import { Leaf, Sparkles } from 'lucide-react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      {/* Left Side - Visuals */}
      <div className="hidden md:flex flex-1 bg-emerald-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Leaf size={28} />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">EcoLoop</span>
          </div>
          
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Rethink. <br />
            Repair. <br />
            Re-Loop.
          </h1>
          
          <p className="text-emerald-100/80 text-lg leading-relaxed mb-8">
            The world's first AI-powered circular economy marketplace. Save money, save the planet, and earn rewards for every sustainable action.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-emerald-800/50 backdrop-blur-md p-4 rounded-2xl border border-emerald-700/50">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">AI Impact Analysis</p>
                <p className="text-emerald-200/70 text-xs">Real-time carbon footprint calculations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 right-20 w-32 h-32 border-4 border-emerald-500/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-20 h-20 border-2 border-emerald-500/10 rounded-3xl rotate-12" />
      </div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="md:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Leaf className="text-emerald-600" size={32} />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">EcoLoop</span>
            </div>
          </div>
          
          {isLogin ? (
            <LoginForm onSuccess={onAuthSuccess} onToggle={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSuccess={onAuthSuccess} onToggle={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

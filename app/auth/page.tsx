'use client'

import { motion } from "motion/react";
import { useState } from "react";

interface AuthViewProps {
  initialMode: 'login' | 'signup';
  onSuccess: () => void;
  onBackToLanding: () => void;
}

export default function AuthView({ initialMode, onSuccess, onBackToLanding }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // UI states
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && !name) {
      setError('Please fill out your full name.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('potongin_auth', 'true');
      localStorage.setItem('potongin_user_name', mode === 'signup' ? name : email.split('@')[0]);
      onSuccess();
    }, 1200);
  };

  const handleOAuthSimulate = (platform: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('potongin_auth', 'true');
      localStorage.setItem('potongin_user_name', `Streamer_${platform}`);
      onSuccess();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased flex flex-col justify-center items-center p-6 relative">
      {/* Decorative background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#8b5cf6]/5 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#06b6d4]/5 blur-[150px]"></div>
      </div>

      {/* Floating Logo / Back button */}
      <div className="absolute top-8 left-8 flex items-center gap-4 z-10">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#cbc3d7] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#0b1326]/40 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative z-10"
      >
        {/* Brand visual header */}
        <div className="text-center flex flex-col items-center gap-1 mb-8">
          <span className="font-display text-3xl font-black tracking-tighter text-[#d0bcff]">
            potongin.ai
          </span>
          <p className="text-xs text-[#cbc3d7]/60 font-mono tracking-widest uppercase font-semibold">
            {mode === 'login' ? 'Welcome Back Creator' : 'Create Creator Account'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1 bg-[#171f33]/60 rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-[#d0bcff] text-black font-extrabold' : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup' ? 'bg-[#d0bcff] text-black font-extrabold' : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Status messages */}
        {error && (
          <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
            <span className="material-symbols-outlined text-sm text-red-400 mt-0.5">error</span>
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#cbc3d7] mb-1.5 font-bold">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3.5 text-[#cbc3d7]/40 text-base">person</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#171f33]/40 border border-white/5 focus:border-[#d0bcff]/40 rounded-xl text-xs text-white placeholder-white/20 outline-none transition-all focus:bg-[#171f33]/60"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#cbc3d7] mb-1.5 font-bold">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3.5 text-[#cbc3d7]/40 text-base">mail</span>
              <input
                type="email"
                required
                placeholder="you@streamer.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#171f33]/40 border border-white/5 focus:border-[#d0bcff]/40 rounded-xl text-xs text-white placeholder-white/20 outline-none transition-all focus:bg-[#171f33]/60"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#cbc3d7] font-bold">
                Password
              </label>
              {mode === 'login' && (
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert('Reset link sent to input email!'); }}
                  className="text-[10px] text-[#4cd7f6] hover:underline"
                >
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3.5 text-[#cbc3d7]/40 text-base">lock</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#171f33]/40 border border-white/5 focus:border-[#d0bcff]/40 rounded-xl text-xs text-white placeholder-white/20 outline-none transition-all focus:bg-[#171f33]/60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] hover:scale-[1.01] active:scale-95 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#d0bcff]/10 hover:shadow-[#d0bcff]/25 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Let’s Get Started' : 'Create My Account'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-[10px] font-mono text-[#cbc3d7]/30 uppercase">Or connect via</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuthSimulate('Google')}
            className="py-3 px-4 rounded-xl border border-white/5 bg-[#171f33]/30 hover:bg-[#171f33]/50 text-xs font-semibold text-[#cbc3d7] hover:text-white flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm text-[#4cd7f6]">google</span>
            <span>Google</span>
          </button>
          <button
            onClick={() => handleOAuthSimulate('Discord')}
            className="py-3 px-4 rounded-xl border border-white/5 bg-[#171f33]/30 hover:bg-[#171f33]/50 text-xs font-semibold text-[#cbc3d7] hover:text-white flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm text-[#8b5cf6]">sports_esports</span>
            <span>Discord</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
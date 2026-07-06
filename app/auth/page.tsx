'use client'

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface AuthViewProps {
  initialMode: 'login' | 'signup';
  onSuccess: () => void;
  onBackToLanding: () => void;
}

export default function AuthView({ initialMode, onSuccess, onBackToLanding }: AuthViewProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDevHelper, setShowDevHelper] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState('');
  const [useSandbox, setUseSandbox] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setCurrentOrigin(window.location.origin);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        return;
      }

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        onSuccess();
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        const errType = event.data.error;
        const errDesc = event.data.errorDescription || '';

        if (errType === 'non_sandbox_target') {
          setError(
            'TikTok Error: non_sandbox_target. This means you are using Sandbox Mode, but your TikTok account has not been added as a target tester. Please turn off Sandbox Mode in the helper panel below, or add your TikTok username in Sandbox > Manage target users.'
          );
        } else {
          setError(`TikTok Error: ${errDesc} (${errType})`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess]);

  const handleTikTokLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/tiktok/auth-url?sandbox=${useSandbox}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve TikTok authorization URL from server.');
      }
      const data = await response.json();
      if (!data.url) {
        throw new Error('Missing authorization URL in response.');
      }

      // Calculate center coordinates
      const width = 580;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        data.url,
        'tiktok_oauth',
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
      );

      if (!popup) {
        throw new Error('Popup blocked! Please allow popups for this site to sign in with TikTok.');
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'An error occurred during TikTok connection.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased flex flex-col justify-center items-center p-6 relative">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#8b5cf6]/5 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#06b6d4]/5 blur-[150px]"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col gap-6 z-10">
        {/* Auth Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0b1326]/40 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative"
        >
          {/* Header branding */}
          <div className="text-center flex flex-col items-center gap-2 mb-8">
            <span className="font-display text-4xl font-black tracking-tighter text-[#d0bcff]">
              potongin.ai
            </span>
            <p className="text-xs text-[#cbc3d7]/60 font-mono tracking-widest uppercase font-semibold">
              AI Clip Workspace
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold font-display text-white mb-2">
              Connect Your TikTok Account
            </h2>
            <p className="text-xs text-[#cbc3d7] leading-relaxed max-w-xs mx-auto">
              Authorize potongin.ai to import, analyze, and publish your viral clip highlights directly to your feed.
            </p>
          </div>

          {/* Error messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-xs text-red-200">
              <span className="material-symbols-outlined text-sm text-red-400 mt-0.5">error</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* TikTok Login Button */}
          <button
            onClick={handleTikTokLogin}
            disabled={isLoading}
            className="w-full py-4 bg-black border border-white/10 hover:border-[#FE2C55]/50 hover:bg-[#0a0a0a] rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer relative overflow-hidden group shadow-xl"
          >
            {/* TikTok Accent border glows */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#25F4EE] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#FE2C55] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {/* Custom Vector TikTok Logo style using HTML elements for modern crisp rendering */}
                <div className="w-5 h-5 flex items-center justify-center relative bg-white rounded-full">
                  <span className="text-black font-black text-xs font-sans tracking-tighter">d</span>
                </div>
                <span className="text-white font-extrabold text-sm tracking-wide">
                  Continue with TikTok
                </span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[#cbc3d7]/40 font-mono mt-6">
            By connecting, you agree to our Terms and Privacy Policy.
          </p>
        </motion.div>

        {/* Developer Helper Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0b1326]/20 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-md"
        >
          <button
            onClick={() => setShowDevHelper(!showDevHelper)}
            className="w-full flex items-center justify-between text-left font-mono text-[11px] font-bold text-[#cbc3d7] hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#4cd7f6]">settings</span>
              <span>OAUTH DEVELOPMENT HELPER</span>
            </div>
            <span className="material-symbols-outlined text-sm transition-transform duration-200">
              {showDevHelper ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>

          {showDevHelper && (
            <div className="mt-4 space-y-4 text-xs text-[#cbc3d7]/80 font-mono border-t border-white/5 pt-4">
              {/* Sandbox Toggle Switch */}
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex flex-col gap-0.5 max-w-[70%]">
                  <span className="text-white font-bold text-[11px] uppercase tracking-wide">Use TikTok Sandbox Mode</span>
                  <span className="text-[10px] text-[#cbc3d7]/60 leading-tight">Enable only if using a Sandbox-specific Developer client key.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUseSandbox(!useSandbox);
                    setError(null);
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${useSandbox ? 'bg-[#FE2C55]' : 'bg-white/10'}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${useSandbox ? 'translate-x-4' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* Troubleshooter for non_sandbox_target */}
              <div className="border border-yellow-500/20 bg-yellow-500/5 p-3 rounded-xl space-y-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <span className="material-symbols-outlined text-sm">help_outline</span>
                  <span>HOW TO FIX &quot;non_sandbox_target&quot;:</span>
                </div>
                <p className="text-[#cbc3d7]/90 leading-normal">
                  If you got a <strong className="text-white">&quot;non_sandbox_target&quot;</strong> error inside TikTok login:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#cbc3d7]/85 pl-1 leading-relaxed">
                  <li><strong>Turn OFF Sandbox Mode</strong> (above) if your developer credentials are for a regular production application.</li>
                  <li><strong>If using Sandbox keys:</strong> Register your login TikTok account under <em>Sandbox &gt; Manage target users</em> inside your TikTok Developer Portal.</li>
                </ul>
              </div>

              <div>
                <p className="text-white font-bold mb-1">1. TikTok Callback Redirect URL:</p>
                <div className="bg-[#020617] p-2.5 rounded-xl border border-white/5 select-all break-all text-[11px] font-semibold text-[#4cd7f6]">
                  {currentOrigin ? `${currentOrigin}/api/tiktok/callback` : 'Loading...'}
                </div>
                <p className="text-[10px] text-[#cbc3d7]/40 mt-1">
                  Configure this exact redirect URI in your TikTok Developer portal app settings.
                </p>
              </div>

              <div>
                <p className="text-white font-bold mb-1">2. Environment Variables Checklist:</p>
                <ul className="space-y-1 pl-1 text-[11px]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                    <span>TIKTOK_CLIENT_KEY</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                    <span>TIKTOK_CLIENT_SECRET</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                    <span>TIKTOK_REDIRECT_URI</span>
                  </li>
                </ul>
                <p className="text-[10px] text-[#cbc3d7]/40 mt-1">
                  Ensure these are defined in the Settings tab of Google AI Studio.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

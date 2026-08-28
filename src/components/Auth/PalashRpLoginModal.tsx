import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  X, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface PalashRpLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PalashRpLoginModal: React.FC<PalashRpLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginPalashRp } = useApp();
  
  const [rpId, setRpId] = useState<string>('jaipal.murmu@palash.gov.in');
  const [pin, setPin] = useState<string>('2026');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const success = await loginPalashRp(rpId, pin);
      if (success) {
        onSuccess();
        onClose();
      } else {
        setErrorMsg('Invalid Resource Person credentials. Please verify your RP ID and PIN.');
      }
    } catch {
      setErrorMsg('An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (demoRpId: string, demoPin: string) => {
    setRpId(demoRpId);
    setPin(demoPin);
    loginPalashRp(demoRpId, demoPin).then((success) => {
      if (success) {
        onSuccess();
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center shadow-inner border border-amber-200">
            <ShieldCheck className="w-9 h-9 text-amber-700" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded-full uppercase tracking-wider">
              Jharkhand PALASH Initiative
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              PALASH RP Sign In
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              Restricted access for certified Bilingual Resource Persons & Reviewers to approve curriculum lessons.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Resource Person (RP) ID / Email</span>
            </label>
            <input
              type="text"
              required
              value={rpId}
              onChange={(e) => setRpId(e.target.value)}
              placeholder="e.g. jaipal.murmu@palash.gov.in"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Security PIN / Password</span>
            </label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN (e.g. 2026)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl text-sm shadow-lg shadow-amber-600/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In as PALASH RP'}</span>
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            One-Click Verified Demo Accounts
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('jaipal.murmu@palash.gov.in', '2026')}
              className="w-full p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl border border-amber-200 text-xs font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <div className="text-left">
                  <div className="font-extrabold">Jaipal Murmu (Santhali RP)</div>
                  <div className="text-[10px] text-amber-700 font-normal">Dumka District • Ol Chiki Specialist</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('soma.munda@palash.gov.in', '2026')}
              className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div className="text-left">
                  <div className="font-extrabold">Soma Munda (Mundari RP)</div>
                  <div className="text-[10px] text-emerald-700 font-normal">Khunti District • Mundari Specialist</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

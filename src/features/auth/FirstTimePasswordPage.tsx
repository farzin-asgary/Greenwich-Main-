
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { KeyRound, Loader2, AlertCircle } from 'lucide-react';

export const FirstTimePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      // Direct to normal logic
      navigate('/');
    }, 1000);
  };

  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-sm mx-auto space-y-6 pb-20">
        <div className="text-center space-y-2 pt-8">
          <GreenwichLogo size="md" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif] pt-2">
            تغییر رمز اجباری
          </h1>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] shadow-2xl">
          <div className="mb-6 p-3 rounded-xl bg-orange-900/20 border border-orange-900/50 text-orange-200 flex items-start gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-orange-400" />
            <span className="leading-relaxed">شما برای اولین بار وارد شده‌اید. لطفاً به دلایل امنیتی، رمز عبور موقت خود را تغییر دهید.</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-emerald-200">رمز عبور جدید (حداقل ۱۲ کاراکتر)</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
                <input
                  type="password"
                  required
                  minLength={12}
                  disabled={status === 'loading'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl pl-10 pr-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors dir-ltr text-right font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || password.length < 12}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-[#d4af37]/30"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
              ) : (
                <span>تغییر رمز و ادامه</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

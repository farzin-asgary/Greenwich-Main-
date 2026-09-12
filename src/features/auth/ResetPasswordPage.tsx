
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { KeyRound, ShieldCheck, Loader2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-sm mx-auto space-y-6 pb-20">
        <div className="text-center space-y-2 pt-8">
          <GreenwichLogo size="md" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif] pt-2">
            تعیین رمز عبور جدید
          </h1>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] shadow-2xl">
          {status === 'success' ? (
            <div className="text-center space-y-4 fade-in">
              <div className="w-16 h-16 rounded-full bg-[#1b4332]/50 border border-[#2d6a4f] text-[#d4af37] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed font-bold">
                رمز عبور شما با موفقیت تغییر کرد.
              </p>
              <Link to="/login" className="mt-4 block w-full py-3 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-600 transition-colors">
                ورود به حساب کاربری
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs fade-in">
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
                className="w-full py-3.5 rounded-xl bg-emerald-700 text-[#fbf9f5] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                ) : (
                  <span>ذخیره رمز جدید</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

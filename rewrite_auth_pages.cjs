const fs = require('fs');

fs.mkdirSync('src/features/auth', { recursive: true });

const loginPageCode = `
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { useAuth } from '../../app/auth/AuthContext';
import { getDefaultRouteForRole } from '../../app/permissions';
import { KeyRound, User, Loader2, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate backend call (In real app, fetch /api/auth/login)
    setTimeout(() => {
      // Dummy check for testing UI
      if (password === '12345678') {
        let role = 'CAFE';
        if (username.includes('admin')) role = 'ADMIN';
        if (username.includes('staff')) role = 'STAFF';
        if (username.includes('writer')) role = 'CONTENT_WRITER';
        
        // Use any string as role (cast to any for mock)
        login(username, role as any);
        navigate(getDefaultRouteForRole(role as any));
      } else {
        setStatus('error');
        // SECURITY REQUIREMENT: Generic error message
        setErrorMsg('نام کاربری یا رمز عبور اشتباه است.');
      }
    }, 1000);
  };

  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-sm mx-auto space-y-6 pb-20">
        <div className="text-center space-y-2 pt-8">
          <GreenwichLogo size="md" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif] pt-2">
            ورود پرسنل و مدیران
          </h1>
          <p className="text-xs text-emerald-300/70">
            لطفاً اطلاعات حساب کاربری خود را وارد کنید.
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] shadow-2xl">
          
          {status === 'error' && (
            <div className="mb-6 p-3 rounded-xl bg-red-900/20 border border-red-900/50 text-red-200 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-emerald-200">نام کاربری یا موبایل</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  required
                  disabled={status === 'loading'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="demo.cafe"
                  className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl pl-10 pr-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors dir-ltr text-right placeholder:text-emerald-900/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-emerald-200">رمز عبور</label>
                <Link to="/login/forgot" className="text-[#d4af37] hover:underline font-bold">فراموشی رمز؟</Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
                <input
                  type="password"
                  required
                  disabled={status === 'loading'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl pl-10 pr-3 py-2.5 text-emerald-100 font-mono focus:outline-none focus:border-[#d4af37] transition-colors dir-ltr text-right"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 border border-[#d4af37]/30"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
              ) : (
                <span>ورود به سیستم</span>
              )}
            </button>
          </form>
          
        </div>
        
        <div className="text-center text-[11px] text-emerald-500/70 pt-4">
          <p>سیستم یکپارچه مدیریت کافه گرینویچ</p>
        </div>
      </div>
    </PublicLayout>
  );
};
`;

const forgotPasswordCode = `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate backend call
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
            بازیابی رمز عبور
          </h1>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] shadow-2xl">
          {status === 'success' ? (
            <div className="text-center space-y-4 fade-in">
              <div className="w-16 h-16 rounded-full bg-[#1b4332]/50 border border-[#2d6a4f] text-[#d4af37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed">
                در صورت وجود حساب کاربری، لینک بازیابی رمز عبور به ایمیل یا شماره موبایل شما ارسال خواهد شد.
              </p>
              <Link to="/login" className="mt-4 block w-full py-3 rounded-xl bg-[#121e1c] text-emerald-300 text-xs font-bold hover:bg-[#1b4332] border border-emerald-800 transition-colors">
                بازگشت به صفحه ورود
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs fade-in">
              <p className="text-emerald-300/80 leading-relaxed text-center mb-6">
                برای تغییر رمز عبور، نام کاربری یا ایمیل ثبت‌شده خود را وارد کنید.
              </p>
              
              <div className="space-y-1.5">
                <label className="font-bold text-emerald-200">نام کاربری یا ایمیل</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
                  <input
                    type="text"
                    required
                    disabled={status === 'loading'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#121e1c] border border-emerald-900 rounded-xl pl-10 pr-3 py-2.5 text-emerald-100 focus:outline-none focus:border-[#d4af37] transition-colors dir-ltr text-right"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !username}
                className="w-full py-3.5 rounded-xl bg-emerald-700 text-[#fbf9f5] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                ) : (
                  <span>درخواست لینک بازیابی</span>
                )}
              </button>
            </form>
          )}
        </div>
        
        {status !== 'success' && (
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-xs text-[#d4af37] hover:underline font-bold">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به صفحه ورود</span>
            </Link>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};
`;

const resetPasswordCode = `
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
`;

const firstTimePasswordCode = `
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
`;

const lockedAccountCode = `
import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Lock, Clock } from 'lucide-react';

export const LockedAccountPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-sm mx-auto space-y-6 pb-20">
        <div className="text-center space-y-2 pt-8">
          <GreenwichLogo size="md" />
          <h1 className="text-2xl font-bold text-red-400 font-['Playfair_Display',serif] pt-2">
            حساب کاربری مسدود شد
          </h1>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-red-900/60 bg-[#1a0f0f] shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-900/30 border border-red-900/50 text-red-500 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          
          <p className="text-xs text-red-200 leading-relaxed font-bold">
            به دلیل ۵ تلاش ناموفق متوالی برای ورود، حساب کاربری شما موقتاً مسدود شده است.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#0b1312] border border-red-900 px-4 py-2 rounded-xl text-red-300 text-xs font-mono">
            <Clock className="w-4 h-4" />
            <span>بازگشایی: ۱۵ دقیقه دیگر</span>
          </div>

          <Link to="/login/forgot" className="mt-4 block w-full py-3 rounded-xl bg-red-900/40 text-red-200 text-xs font-bold hover:bg-red-900/60 transition-colors border border-red-900">
            فراموشی رمز عبور
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};
`;

fs.writeFileSync('src/features/auth/LoginPage.tsx', loginPageCode);
fs.writeFileSync('src/features/auth/ForgotPasswordPage.tsx', forgotPasswordCode);
fs.writeFileSync('src/features/auth/ResetPasswordPage.tsx', resetPasswordCode);
fs.writeFileSync('src/features/auth/FirstTimePasswordPage.tsx', firstTimePasswordCode);
fs.writeFileSync('src/features/auth/LockedAccountPage.tsx', lockedAccountCode);

// Optional cleanup
if (fs.existsSync('src/features/marketing/LoginPage.tsx')) {
  fs.unlinkSync('src/features/marketing/LoginPage.tsx');
}

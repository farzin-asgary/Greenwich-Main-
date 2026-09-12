
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

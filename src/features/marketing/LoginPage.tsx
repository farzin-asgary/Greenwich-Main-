import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { useAuth } from '../../app/auth/AuthContext';
import { UserRole, getDefaultRouteForRole } from '../../app/permissions';
import { User, Store, Shield, PenTool, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('CAFE');
  const [phone, setPhone] = useState('09121112233');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone, selectedRole);
    navigate(getDefaultRouteForRole(selectedRole));
  };

  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <GreenwichLogo size="md" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif] pt-2">
            ورود به سامانه گرینویچ کلاب
          </h1>
          <p className="text-xs text-emerald-300/70">
            برای ورود به بخش مدیریت یا حساب کاربری، نقش خود را انتخاب کنید.
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 border border-emerald-900/80 space-y-5">
          {/* Role selector buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-emerald-200 block">انتخاب نقش و سطح دسترسی:</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedRole('CUSTOMER')}
                className={`p-3 rounded-2xl border text-right flex items-center gap-2 transition-all ${
                  selectedRole === 'CUSTOMER'
                    ? 'bg-[#2d6a4f] text-[#fbf9f5] border-[#d4af37]'
                    : 'bg-[#0b1312] text-emerald-400 border-emerald-900 hover:border-emerald-700'
                }`}
              >
                <User className="w-4 h-4 text-[#d4af37]" />
                <div>
                  <span className="block">مشتری کافه</span>
                  <span className="text-[10px] font-normal text-emerald-300/70">پنل مراجعات</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('CAFE')}
                className={`p-3 rounded-2xl border text-right flex items-center gap-2 transition-all ${
                  selectedRole === 'CAFE'
                    ? 'bg-[#2d6a4f] text-[#fbf9f5] border-[#d4af37]'
                    : 'bg-[#0b1312] text-emerald-400 border-emerald-900 hover:border-emerald-700'
                }`}
              >
                <Store className="w-4 h-4 text-[#d4af37]" />
                <div>
                  <span className="block">مدیریت کافه</span>
                  <span className="text-[10px] font-normal text-emerald-300/70">CRM و کوپن‌ها</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('CONTENT_WRITER')}
                className={`p-3 rounded-2xl border text-right flex items-center gap-2 transition-all ${
                  selectedRole === 'CONTENT_WRITER'
                    ? 'bg-[#2d6a4f] text-[#fbf9f5] border-[#d4af37]'
                    : 'bg-[#0b1312] text-emerald-400 border-emerald-900 hover:border-emerald-700'
                }`}
              >
                <PenTool className="w-4 h-4 text-[#d4af37]" />
                <div>
                  <span className="block">نویسنده محتوا</span>
                  <span className="text-[10px] font-normal text-emerald-300/70">استودیو مجله</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('ADMIN')}
                className={`p-3 rounded-2xl border text-right flex items-center gap-2 transition-all ${
                  selectedRole === 'ADMIN'
                    ? 'bg-[#2d6a4f] text-[#fbf9f5] border-[#d4af37]'
                    : 'bg-[#0b1312] text-emerald-400 border-emerald-900 hover:border-emerald-700'
                }`}
              >
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <div>
                  <span className="block">مدیریت ارشد</span>
                  <span className="text-[10px] font-normal text-emerald-300/70">کنترل پلتفرم</span>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-emerald-200">شماره همراه ورود</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09121112233"
                className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 font-mono focus:outline-none focus:border-[#d4af37] dir-ltr text-right"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs hover:brightness-110 transition-all border border-[#d4af37]/40 shadow-xl flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-[#d4af37]" />
              <span>ورود به پنل انتخاب شده</span>
            </button>
          </form>

          <div className="border-t border-emerald-900/60 pt-3 text-[11px] text-emerald-400/80 text-center">
            <span>در حالت آزمایشی، ورود بدون نیاز به رمز یکبارمصرف انجام می‌شود.</span>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

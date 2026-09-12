
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

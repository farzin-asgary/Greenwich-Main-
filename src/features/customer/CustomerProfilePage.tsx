import React from 'react';
import { CustomerLayout } from '../../layouts/customer/CustomerLayout';
import { useAuth } from '../../app/auth/AuthContext';
import { User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <CustomerLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پروفایل کاربر
          </h1>
          <p className="text-xs text-emerald-300/70">
            مشخصات فردی و ترجیحات شما
          </p>
        </div>

        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4 text-xs">
          <div className="flex items-center gap-4 border-b border-emerald-900/40 pb-4">
            <div className="w-14 h-14 rounded-full bg-[#1b4332] text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center font-bold text-xl">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-100">{user?.name}</h3>
              <span className="font-mono text-emerald-400 text-xs dir-ltr block text-right">{user?.phone}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-emerald-400 font-bold block">مود ذهنی ترجیحی در کافه</span>
              <span className="text-emerald-100 font-bold bg-[#121e1c] px-3 py-1.5 rounded-xl border border-emerald-900 block">
                آرامش و مطالعه (Relaxation)
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-emerald-400 font-bold block">کافه اصلی مورد علاقه</span>
              <span className="text-emerald-100 font-bold bg-[#121e1c] px-3 py-1.5 rounded-xl border border-emerald-900 block">
                کافه نادری — شعبه جمهوری
              </span>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

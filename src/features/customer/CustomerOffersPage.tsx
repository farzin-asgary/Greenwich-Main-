import React from 'react';
import { CustomerLayout } from '../../layouts/customer/CustomerLayout';
import { Tag, Coffee, Check, Clock, QrCode } from 'lucide-react';

export const CustomerOffersPage: React.FC = () => {
  const coupons = [
    {
      code: 'NADERI-WELCOME-20',
      title: '۲۰٪ تخفیف خوش‌آمدگویی',
      cafe: 'کافه نادری — شعبه جمهوری',
      valueDisplay: '۲۰٪ تخفیف',
      status: 'claimed',
      expiresAt: '۳۰ مرداد ۱۴۰۳'
    },
    {
      code: 'FREE-ESPRESSO-88',
      title: 'یک فنجان اسپرسو رایگان',
      cafe: 'کافه نادری — شعبه جمهوری',
      valueDisplay: 'اسپرسو رایگان',
      status: 'claimed',
      expiresAt: '۱۵ شهریور ۱۴۰۳'
    }
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پیشنهادها و کوپن‌های من
          </h1>
          <p className="text-xs text-emerald-300/70">
            این کدها را هنگام پرداخت به صندوقدار کافه نشان دهید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons?.map((c) => (
            <div key={c.code} className="greenwich-card rounded-2xl p-5 border-2 border-[#d4af37]/40 space-y-4 text-xs greenwich-gold-glow bg-gradient-to-b from-[#121e1c] to-[#0b1312]">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
                <span className="font-bold text-[#d4af37] text-sm">{c.valueDisplay}</span>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                  آماده استفاده
                </span>
              </div>

              <div>
                <h3 className="font-bold text-emerald-100 text-sm">{c.title}</h3>
                <span className="text-[11px] text-emerald-400 block mt-0.5">{c.cafe}</span>
              </div>

              <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-900 text-center space-y-1">
                <span className="text-[10px] text-emerald-500 block">کد اختصاصی جهت نشان دادن به صندوقدار</span>
                <span className="font-mono text-base font-extrabold text-[#d4af37] tracking-widest block">{c.code}</span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-emerald-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  مهلت: {c.expiresAt}
                </span>
                <span>فقط در محل کافه</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

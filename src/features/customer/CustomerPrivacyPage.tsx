import React, { useState } from 'react';
import { CustomerLayout } from '../../layouts/customer/CustomerLayout';
import { ShieldCheck, Check, Trash2 } from 'lucide-react';

export const CustomerPrivacyPage: React.FC = () => {
  const [consents, setConsents] = useState({
    termsAccepted: true,
    visitHistoryConsented: true,
    cafeMarketingConsented: true,
    greenwichMarketingConsented: false
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <CustomerLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            تنظیمات حریم خصوصی و رضایت داده‌ها (PII)
          </h1>
          <p className="text-xs text-emerald-300/70">
            شما کنترل کامل روی نحوه استفاده از داده‌های شماره همراه خود دارید
          </p>
        </div>

        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-5 text-xs">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer p-3 bg-[#0b1312] rounded-xl border border-emerald-900">
              <input
                type="checkbox"
                checked={consents.visitHistoryConsented}
                onChange={(e) => setConsents({ ...consents, visitHistoryConsented: e.target.checked })}
                className="mt-1 accent-[#d4af37]"
              />
              <div>
                <span className="font-bold text-emerald-100 block">ثبت تاریخچه مراجعات به کافه‌ها</span>
                <span className="text-[11px] text-emerald-400/80 leading-relaxed block">
                  به کافه اجازه می‌دهد تعداد مراجعات قبلی و زمان‌های حضور شما روی میز را برای ارائه پیشنهادهای هوشمند مشاهده کند.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-3 bg-[#0b1312] rounded-xl border border-emerald-900">
              <input
                type="checkbox"
                checked={consents.cafeMarketingConsented}
                onChange={(e) => setConsents({ ...consents, cafeMarketingConsented: e.target.checked })}
                className="mt-1 accent-[#d4af37]"
              />
              <div>
                <span className="font-bold text-emerald-100 block">دریافت پیامک‌های پیشنهاد و تخفیف از کافه نادری</span>
                <span className="text-[11px] text-emerald-400/80 leading-relaxed block">
                  ارسال کوپن‌های هدیه ماه تولد و تخفیف‌های اختصاصی بازگشت از طریق SMS.
                </span>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between border-t border-emerald-900/60 pt-4">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-xs hover:bg-[#1b4332] transition-colors border border-[#d4af37]/30"
            >
              ذخیره تغییرات حریم خصوصی
            </button>

            {savedMessage && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-4 h-4 text-[#d4af37]" />
                تنظیمات به روز شد
              </span>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

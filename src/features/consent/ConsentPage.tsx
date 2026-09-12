import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Shield, Check, ArrowLeft, Lock } from 'lucide-react';

export const ConsentPage: React.FC = () => {
  const navigate = useNavigate();

  const [visitHistory, setVisitHistory] = useState(true);
  const [personalization, setPersonalization] = useState(true);
  const [cafeMarketing, setCafeMarketing] = useState(true);

  const mutation = useMutation({
    mutationFn: () =>
      api.updateConsent({
        termsAccepted: true,
        visitHistoryConsented: visitHistory,
        personalizationConsented: personalization,
        cafeMarketingConsented: cafeMarketing,
        greenwichMarketingConsented: false
      }),
    onSuccess: () => {
      navigate('/app/home');
    }
  });

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col justify-between max-w-md mx-auto p-6 relative">
      <header className="pt-6 text-center">
        <GreenwichLogo size="md" />
      </header>

      <main className="my-auto">
        <div className="greenwich-card rounded-3xl p-6 border border-[#2d6a4f]/40 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-100">تنظیمات حریم خصوصی و اختیارات</h3>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              اطلاعات شما نزد کافه محفوظ است. شما می‌توانید سطح دسترسی داده‌های خود را انتخاب کنید.
            </p>
          </div>

          <div className="space-y-3">
            {/* Required Terms */}
            <div className="p-3.5 bg-[#0b1312] rounded-2xl border border-emerald-900 flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-[#2d6a4f] text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-emerald-100">پذیرش شرایط خدمات کافه نادری (الزامی)</h5>
                <p className="text-[10px] text-emerald-400/70 mt-0.5">
                  جهت استفاده از شبکه دیجیتال و امکانات زمان‌دار میز کافه.
                </p>
              </div>
            </div>

            {/* Visit History */}
            <label className="p-3.5 bg-[#0b1312] rounded-2xl border border-emerald-900/60 flex items-start gap-3 cursor-pointer hover:border-emerald-700 transition-colors">
              <input
                type="checkbox"
                checked={visitHistory}
                onChange={(e) => setVisitHistory(e.target.checked)}
                className="mt-1 accent-[#2d6a4f] w-4 h-4 rounded"
              />
              <div>
                <h5 className="text-xs font-bold text-emerald-100">ثبت تاریخچه حضور و نشست‌ها</h5>
                <p className="text-[10px] text-emerald-400/70 mt-0.5">
                  کمک به محاسبه امتیازهای وفاداری و پیشنهادهای ویژه در مراجعه بعدی شما.
                </p>
              </div>
            </label>

            {/* Personalization */}
            <label className="p-3.5 bg-[#0b1312] rounded-2xl border border-emerald-900/60 flex items-start gap-3 cursor-pointer hover:border-emerald-700 transition-colors">
              <input
                type="checkbox"
                checked={personalization}
                onChange={(e) => setPersonalization(e.target.checked)}
                className="mt-1 accent-[#2d6a4f] w-4 h-4 rounded"
              />
              <div>
                <h5 className="text-xs font-bold text-emerald-100">پیشنهاد هوشمند محتوا بر اساس سلیقه</h5>
                <p className="text-[10px] text-emerald-400/70 mt-0.5">
                  پیشنهاد داستان‌ها، پادکست‌ها و موسیقی متناسب با زمان و حال‌وهوای شما.
                </p>
              </div>
            </label>

            {/* Cafe Marketing */}
            <label className="p-3.5 bg-[#0b1312] rounded-2xl border border-emerald-900/60 flex items-start gap-3 cursor-pointer hover:border-emerald-700 transition-colors">
              <input
                type="checkbox"
                checked={cafeMarketing}
                onChange={(e) => setCafeMarketing(e.target.checked)}
                className="mt-1 accent-[#2d6a4f] w-4 h-4 rounded"
              />
              <div>
                <h5 className="text-xs font-bold text-emerald-100">دریافت پیشنهادات و تخفیف‌های کافه</h5>
                <p className="text-[10px] text-emerald-400/70 mt-0.5">
                  ارسال کدهای تخفیف و اطلاع‌رسانی رویدادهای هنری و فرهنگی کافه نادری.
                </p>
              </div>
            </label>
          </div>

          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg greenwich-emerald-glow"
          >
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <span>تایید و ورود به گرینویچ کلاب</span>
            <ArrowLeft className="w-4 h-4 ml-1" />
          </button>
        </div>
      </main>

      <footer className="text-center text-[10px] text-emerald-500/70 pb-4">
        اطلاعات شما محفوظ بوده و به هیچ وجه فروخته یا افشا نمی‌شود.
      </footer>
    </div>
  );
};

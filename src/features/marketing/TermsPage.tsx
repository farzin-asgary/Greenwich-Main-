import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Scale, Calendar } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Scale className="w-12 h-12 text-[#d4af37] mx-auto" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            شرایط و قوانین استفاده
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b4332]/50 border border-emerald-900/50 text-xs text-emerald-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>نسخه ۱٫۰ — از تاریخ ۱۴۰۴/۰۶/۲۲</span>
          </div>
          <p className="text-xs text-emerald-300/70 pt-2">
            قرارداد ارائه خدمات و شرایط استفاده از زیرساخت‌های گرینویچ کلاب
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] space-y-8 text-sm text-emerald-200/90 leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۱. قوانین ویژه کافه‌داران (B2B)</h3>
            <p>
              کافه‌هایی که از پلتفرم استفاده می‌کنند موظف‌اند QR اختصاصی میزها را صرفاً در محیط فیزیکی کافه قرار دهند. استفاده و انتشار این بارکدها در فضای مجازی یا رسانه‌ها نقض قرارداد محسوب می‌شود.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۲. محتوای هوش مصنوعی و پرسوناهای تعاملی</h3>
            <p>
              گرینویچ کلاب تلاش می‌کند تا محتوای تولیدشده توسط هوش مصنوعی همواره دقیق و سازنده باشد. با این حال، مسئولیت تفسیر و برخورد با پیشنهادات یا مکالمات پرسوناهای مجازی (مانند الکسی یا دکتر وارن) بر عهده خود کاربر است.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۳. سوءاستفاده از سیستم بازخرید و کوپن</h3>
            <p>
              ثبت بازخورد غیرواقعی با هدف دریافت کوپن‌های تخفیف، یا تلاش برای دور زدن سیستم مصرف کوپن، منجر به مسدود شدن موقت یا دائم شماره تماس شخص در شبکه سراسری کافه‌های متصل به گرینویچ خواهد شد.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <FileText className="w-10 h-10 text-[#d4af37] mx-auto" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            شرایط و قوانین استفاده از خدمات
          </h1>
          <p className="text-xs text-emerald-300/70">
            مقررات عمومی استفاده از خدمات گرینویچ کلاب برای کاربران و مدیران کافه
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 space-y-6 text-xs text-emerald-200/90 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-[#d4af37]">۱. تعهدات کافه‌ها</h3>
            <p>
              کافه‌ها متعهد می‌شوند که از کوپن‌ها و تخفیف‌های ثبت‌شده پشتیبانی کرده و کد QR روی میزها را در وضعیت فعال و امن نگه دارند.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-[#d4af37]">۲. قوانین بازخرید کوپن‌ها</h3>
            <p>
              هر کوپن صادرشده دارای تاریخ انقضا و شرایط استفاده مشخص است. بازخرید کوپن تنها با تایید صندوقدار کافه از طریق ورود پین اختصاصی معتبر خواهد بود.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

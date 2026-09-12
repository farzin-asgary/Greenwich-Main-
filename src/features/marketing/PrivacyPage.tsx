import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <ShieldCheck className="w-10 h-10 text-[#d4af37] mx-auto" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            سیاست حریم خصوصی و حفاظت از داده‌ها (PII)
          </h1>
          <p className="text-xs text-emerald-300/70">
            اصول شفافیت گرینویچ کلاب در حفاظت از اطلاعات شخصی کاربران و مشتریان کافه
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 space-y-6 text-xs text-emerald-200/90 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-[#d4af37]">۱. جمع‌آوری داده‌ها با رضایت صریح (Consent)</h3>
            <p>
              شماره تلفن همراه و نام شما تنها زمانی ذخیره می‌شود که صریحاً موافقت خود را در چک‌باکس رضایت حریم خصوصی ثبت کنید. شما در هر زمان می‌توانید موافقت خود جهت دریافت پیامک‌های اطلاع‌رسانی را لغو کنید.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-[#d4af37]">۲. جداسازی داده‌های کافه‌ها</h3>
            <p>
              بانک اطلاعاتی مشتریان هر کافه به‌صورت کاملاً ایزوله نگهداری می‌شود. اطلاعات مراجعات شما به یک کافه به سایر کافه‌ها یا شخص ثالث فروخته یا منتقل نخواهد شد.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-[#d4af37]">۳. حق فراموشی و حذف حساب (Right to be forgotten)</h3>
            <p>
              هر کاربر حق دارد از طریق پنل شخصی خود درخواست پاکسازی تاریخچه مراجعات یا حذف کامل شماره تماس از بانک اطلاعاتی کافه‌ها را ثبت کند.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

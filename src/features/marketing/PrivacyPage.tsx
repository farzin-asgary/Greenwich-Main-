import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { ShieldCheck, Calendar } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-[#d4af37] mx-auto" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            سیاست حریم خصوصی و حفاظت از داده‌ها
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b4332]/50 border border-emerald-900/50 text-xs text-emerald-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>نسخه ۱٫۰ — از تاریخ ۱۴۰۴/۰۶/۲۲</span>
          </div>
          <p className="text-xs text-emerald-300/70 pt-2">
            اصول شفافیت گرینویچ کلاب در حفاظت از اطلاعات شخصی کاربران و مشتریان کافه
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] space-y-8 text-sm text-emerald-200/90 leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۱. جمع‌آوری داده‌ها با رضایت صریح (Consent)</h3>
            <p>
              شماره تلفن همراه و نام شما تنها زمانی ذخیره می‌شود که صریحاً موافقت خود را در چک‌باکس رضایت حریم خصوصی ثبت کنید. داده‌هایی که جمع‌آوری می‌شوند (مانند زمان ورود، خروج، و پاسخ‌های تعاملی) به طور شفاف به کاربر نمایش داده می‌شوند.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۲. جداسازی داده‌های کافه‌ها</h3>
            <p>
              بانک اطلاعاتی مشتریان هر کافه به‌صورت کاملاً ایزوله نگهداری می‌شود. اطلاعات مراجعات شما به کافه «الف» تحت هیچ شرایطی با کافه «ب» به اشتراک گذاشته نمی‌شود و امکان فروش داده‌ها به شخص ثالث وجود ندارد.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۳. شخصی‌سازی و هوش مصنوعی</h3>
            <p>
              استفاده از هوش مصنوعی برای تولید داستان‌ها یا تحلیل رفتار مشتریان تنها بر اساس داده‌های تجمیع‌شده (Aggregated) یا داده‌هایی صورت می‌پذیرد که شما با تیک تایید شخصی‌سازی در زمان ورود، اجازه پردازش آن را داده باشید.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

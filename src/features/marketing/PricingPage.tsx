import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Check, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="space-y-16 pb-20">
        
        {/* Header */}
        <section className="text-center space-y-4 pt-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            سرمایه‌گذاری برای خلق ثروت
          </h1>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl mx-auto leading-relaxed">
            طرح‌های اشتراکی گرینویچ کلاب بر اساس ظرفیت کافه شما و سطح استفاده از موتورهای هوش مصنوعی طراحی شده‌اند.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          
          {/* Tier 1: Basic */}
          <div className="greenwich-card rounded-3xl p-8 border border-emerald-900/60 flex flex-col space-y-6 bg-[#0b1312]">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-emerald-100">نسخه پایه (Boutique)</h3>
              <p className="text-xs text-emerald-400">مناسب برای کافه‌های کوچک و تخصصی</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-bold text-[#d4af37]">تماس بگیرید</span>
            </div>
            <div className="flex-1 space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">پشتیبانی تا ۱۰ میز فعال</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">تولید نامحدود QR استاتیک</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">دسترسی به محتوای متنی پایه</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">سیستم ساده بازخرید کوپن</span>
              </div>
            </div>
            <Link to="/contact" className="w-full py-3 text-center rounded-xl border border-emerald-700 text-emerald-300 font-bold text-sm hover:bg-emerald-900/30 transition-colors">
              شروع با نسخه پایه
            </Link>
          </div>

          {/* Tier 2: Pro */}
          <div className="greenwich-card rounded-3xl p-8 border-2 border-[#d4af37]/60 flex flex-col space-y-6 bg-gradient-to-b from-[#121e1c] to-[#0b1312] relative transform md:-translate-y-4 shadow-2xl shadow-[#1b4332]/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] text-[#0b1312] text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
              پیشنهاد ویژه
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-emerald-100">نسخه حرفه‌ای (Premium)</h3>
              <p className="text-xs text-emerald-400">مناسب برای کافه‌های پرتردد و زنجیره‌ای</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-bold text-[#d4af37]">تماس بگیرید</span>
            </div>
            <div className="flex-1 space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-100 font-bold">پشتیبانی تا ۵۰ میز فعال</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">دسترسی به موتور هوش مصنوعی (جمنای)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">سیستم اتوماتیک بیش‌فروشی (Up-selling)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">دسترسی به محتوای صوتی و پادکست‌ها</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">داشبورد پیش‌بینی ریزش مشتری</span>
              </div>
            </div>
            <Link to="/contact" className="w-full py-3 text-center rounded-xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-sm hover:bg-[#1b4332] transition-colors shadow-lg">
              درخواست نسخه حرفه‌ای
            </Link>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="greenwich-card rounded-3xl p-8 border border-emerald-900/60 flex flex-col space-y-6 bg-[#0b1312]">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-emerald-100">نسخه سازمانی (Enterprise)</h3>
              <p className="text-xs text-emerald-400">مناسب برای هولدینگ‌ها و شعبات زنجیره‌ای وسیع</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-bold text-[#d4af37]">توافقی</span>
            </div>
            <div className="flex-1 space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">میزها و اسکن نامحدود</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">اتصال به نرم‌افزارهای حسابداری (سپیدز و ...)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">طراحی پرسونای هوش مصنوعی اختصاصی برند</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-emerald-300/80">سرور اختصاصی ایزوله</span>
              </div>
            </div>
            <Link to="/contact" className="w-full py-3 text-center rounded-xl border border-emerald-700 text-emerald-300 font-bold text-sm hover:bg-emerald-900/30 transition-colors">
              تماس با بخش فروش
            </Link>
          </div>

        </section>

        {/* Note */}
        <div className="text-center max-w-xl mx-auto flex items-start gap-2 text-[11px] text-emerald-500/70 p-4">
          <Info className="w-4 h-4 shrink-0" />
          <p className="leading-relaxed">
            قیمت‌گذاری نهایی پس از جلسه مشاوره و بررسی ترافیک ماهانه کافه، تعداد میزها و نیاز به تولید محتوای اختصاصی مشخص می‌شود. هدف ما ایجاد یک سیستم با نرخ بازگشت سرمایه (ROI) مثبت و تضمین شده است.
          </p>
        </div>

      </div>
    </PublicLayout>
  );
};

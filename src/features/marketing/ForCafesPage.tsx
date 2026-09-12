import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { TrendingUp, Database, Coins, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ForCafesPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="space-y-16 pb-20">
        
        {/* Header */}
        <section className="text-center space-y-4 pt-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            ویژه کافه‌ها: خلق ثروت از داده
          </h1>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl mx-auto leading-relaxed">
            سیستم گرینویچ فقط یک سرگرمی برای میز مشتری نیست. این یک موتور خلق ثروت است که با استفاده از مفاهیم روانشناسی و داده‌های دسته اول (Zero-Party Data) فروش شما را افزایش می‌دهد.
          </p>
        </section>

        {/* ROI and Zero Party Data */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="greenwich-card p-8 rounded-3xl border border-emerald-900/60 space-y-4 bg-gradient-to-br from-[#0b1312] to-[#121e1c]">
            <Database className="w-10 h-10 text-[#d4af37]" />
            <h3 className="text-xl font-bold text-emerald-100">داده‌های دسته اول (Zero-Party Data)</h3>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              در دنیای امروز که حریم خصوصی اهمیت زیادی دارد، خریدن لیست شماره تلفن یا تبلیغات کور بازدهی ندارد. مشتریان گرینویچ با رضایت کامل و برای دسترسی به محتوای روی میز، سلیقه قهوه، روز تولد، مود روانی و شماره تماس خود را در اختیار شما قرار می‌دهند.
            </p>
          </div>
          <div className="greenwich-card p-8 rounded-3xl border border-emerald-900/60 space-y-4 bg-gradient-to-br from-[#0b1312] to-[#121e1c]">
            <TrendingUp className="w-10 h-10 text-[#d4af37]" />
            <h3 className="text-xl font-bold text-emerald-100">بیش‌فروشی (Up-selling) هدفمند</h3>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              وقتی مشتری در حال مطالعه یک داستان جنایی است، سیستم هوشمند گرینویچ به او یک پیشنهاد پاپ‌آپ می‌دهد: «یک اسپرسوی دبل با ۲۰٪ تخفیف چطور است؟» فروش جانبی بر اساس مود و محتوای در حال مصرف، نرخ تبدیل را تا ۴۰٪ افزایش می‌دهد.
            </p>
          </div>
          <div className="greenwich-card p-8 rounded-3xl border border-emerald-900/60 space-y-4 bg-gradient-to-br from-[#0b1312] to-[#121e1c]">
            <RefreshCw className="w-10 h-10 text-[#d4af37]" />
            <h3 className="text-xl font-bold text-emerald-100">بازگشت سرمایه و وفاداری</h3>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              پیش‌بینی ریزش مشتری (Churn Prediction). الگوریتم‌های گرینویچ متوجه می‌شوند کدام مشتری وفادار اخیراً به کافه سر نزده است. با ارسال یک کمپین پیامکی حاوی یک هدیه شخصی‌سازی شده، او را به کافه برمی‌گردانیم.
            </p>
          </div>
          <div className="greenwich-card p-8 rounded-3xl border border-emerald-900/60 space-y-4 bg-gradient-to-br from-[#0b1312] to-[#121e1c]">
            <Coins className="w-10 h-10 text-[#d4af37]" />
            <h3 className="text-xl font-bold text-emerald-100">بهینه‌سازی منو</h3>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              داده‌های ثبت شده نشان می‌دهد کدام آیتم‌های منو بین کدام تیپ شخصیتی محبوب‌ترند. آیا مشتریانی که کتاب‌های رمانتیک می‌خوانند، چای و دسر بیشتری سفارش می‌دهند؟ این بینش‌ها مستقیماً بر مهندسی منوی کافه تأثیر می‌گذارند.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pt-8 border-t border-emerald-900/40 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-emerald-100 mb-6">برای دریافت فایل کامل پرزنتیشن کلیک کنید</h2>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-2xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-sm hover:brightness-110 transition-all inline-flex items-center gap-2 border border-[#d4af37]/40 shadow-lg"
          >
            مشاوره و راه‌اندازی
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          </Link>
        </section>
      </div>
    </PublicLayout>
  );
};

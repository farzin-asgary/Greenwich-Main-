import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Check, Sparkles, Coffee, Store, Building2, ArrowLeft } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'پلن پایه (Starter)',
      tagline: 'مناسب کافه‌های مستقل و تک‌شعبه‌ای',
      icon: Coffee,
      badge: 'پایه‌ای',
      features: [
        'تا ۱۰ میز با QR اختصاصی',
        'مجله و داستان‌های متنی و صوتی',
        'کارت‌های گفتگوی دونفره',
        'ثبت تا ۵۰ لید مشتری در ماه',
        'گزارش‌گیری پایه مراجعات',
        'پشتیبانی آنلاین'
      ],
      cta: 'درخواست مشاوره پلن پایه',
      popular: false
    },
    {
      name: 'پلن رشد و CRM (Growth)',
      tagline: 'ویژه کافه‌های پرتردد و علاقه‌مند به وفادارسازی',
      icon: Store,
      badge: 'پیشنهاد شده ⭐',
      features: [
        'تعداد میزهای نامحدود',
        'بانک اطلاعاتی مشتریان (CRM کاملا اختصاصی)',
        'تعریف پیشنهادها و کمپین‌های تخفیف پویای صندوق',
        'ابزار بازخرید کوپن ویژه پرسنل با پین امنیتی',
        'ثبت رضایت حریم خصوصی (PII Consent)',
        'تحلیل دقیق بازخوردها و تگ‌های نظرسنجی',
        'پشتیبانی تلفنی و اختصاصی'
      ],
      cta: 'درخواست دمو و فعال‌سازی پلن رشد',
      popular: true
    },
    {
      name: 'پلن سازمانی (Multi-Branch)',
      tagline: 'ویژه مجموعه‌ها و کافه‌های زنجیره‌ای چند شعبه‌ای',
      icon: Building2,
      badge: 'سازمانی',
      features: [
        'مدیریت متمرکز چندین شعبه در یک پنل',
        'تخصیص سطح دسترسی پرسنل و مدیران شعبه‌ها',
        'گزارش‌های تحلیلی مقایسه‌ای بین شعبه‌ها',
        'کمپین‌های تخفیف سراسری و شعبه‌ای',
        'محتوای اختصاصی و شخصی‌سازی شده برند',
        'اتصال به سیستم‌های POS و صندوق کافه (سفارشی)',
        'مدیر حساب اختصاصی و پشتیبانی ۲۴/۷'
      ],
      cta: 'تماس با بخش فروش سازمانی',
      popular: false
    }
  ];

  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پلن‌های شفاف و انعطاف‌پذیر</span>
          </div>

          <h1 className="text-3xl font-extrabold text-emerald-100 font-['Playfair_Display',serif]">
            قیمت‌گذاری و تعرفه‌های گرینویچ کلاب
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-xl mx-auto">
            متناسب با اندازه کافه، تعداد میزها و نیاز به ابزارهای هوشمند وفادارسازی مشتریان.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={idx}
                className={`greenwich-card rounded-3xl p-6 border flex flex-col justify-between space-y-6 relative transition-transform hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-[#d4af37] greenwich-gold-glow bg-gradient-to-b from-[#121e1c] to-[#1b4332]/50'
                    : 'border-emerald-900/60 bg-[#121e1c]/80'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      plan.popular
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-emerald-100">{plan.name}</h3>
                    <p className="text-xs text-emerald-300/70 mt-1">{plan.tagline}</p>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/40">
                    <span className="text-sm font-bold text-[#d4af37]">استعلام قیمت سفارشی</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">بر اساس تعداد میزها و دوره اشتراک</span>
                  </div>

                  <ul className="space-y-2.5 pt-2 text-xs text-emerald-200">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-[#d4af37] text-black hover:brightness-110 shadow-lg'
                      : 'bg-[#2d6a4f] text-[#fbf9f5] hover:bg-[#1b4332] border border-[#d4af37]/30'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="bg-[#121e1c] p-6 rounded-3xl border border-emerald-900/60 text-center space-y-2 max-w-2xl mx-auto">
          <h4 className="text-xs font-bold text-emerald-100">آیا نیاز به دمو آزمایشی رایگان در کافه خود دارید؟</h4>
          <p className="text-xs text-emerald-300/70">
            تیم گرینویچ کلاب امکان تست ۱۴ روزه پلتفرم را روی دو میز کافه شما بدون هیچ‌گونه هزینه اولیه فراهم می‌کند.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Coffee, Users, ShieldAlert, ArrowLeft, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const ForCafesPage: React.FC = () => {
  const problemsAndSolutions = [
    {
      problem: 'مشتریان مراجعه می‌کنند اما کاملاً ناشناس باقی می‌مانند.',
      solution: 'با اسکن QR روی میز و ورود سریع به گرینویچ، لیدهای واقعی با شماره همراه و اسم ثبت می‌شوند.'
    },
    {
      problem: 'کافه قادر به تشخیص مشتریان وفادار و مراجعات مجدد نیست.',
      solution: 'داشبورد کافه، تعداد مراجعات، تاریخچه حضور و سلیقه مشتری را به‌صورت منظم نمایش می‌دهد.'
    },
    {
      problem: 'تخفیف‌ها و پیشنهادهای تبلیغاتی عمومی و بی‌هدف هستند.',
      solution: 'تعریف کوپن‌های تخفیف پویای صندوق براساس رفتار، اولین مراجعه یا ماه تولد مشتری.'
    },
    {
      problem: 'ارتباط با مشتری پس از خروج از محیط فیزیکی کافه قطع می‌شود.',
      solution: 'امکان ارسال پیشنهادهای بازگشت و دعوت به رویدادهای بعدی با حفظ کامل رضایت حریم خصوصی.'
    }
  ];

  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <Coffee className="w-3.5 h-3.5" />
            <span>حل چالش‌های واقعی مدیران کافه</span>
          </div>

          <h1 className="text-3xl font-extrabold text-emerald-100 font-['Playfair_Display',serif]">
            چرا کافه‌های پیشرو به گرینویچ کلاب نیاز دارند؟
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-xl mx-auto">
            از یک کافه سنتی به یک محیط تعاملی و هوشمند با مشتریان شناخته‌شده تبدیل شوید.
          </p>
        </div>

        {/* Problem vs Solution Comparison */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-emerald-100 text-center">مقایسه چالش‌های کافه و راهکار گرینویچ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problemsAndSolutions?.map((item, idx) => (
              <div
                key={idx}
                className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-3"
              >
                <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/40 text-xs text-amber-200 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-300">چالش کافه:</span>
                    <span>{item.problem}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/60 text-xs text-emerald-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-emerald-300">راهکار گرینویچ کلاب:</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="greenwich-card rounded-3xl p-8 border border-[#d4af37]/40 space-y-6 greenwich-gold-glow bg-gradient-to-br from-[#121e1c] to-[#1b4332]/60">
          <h3 className="text-lg font-bold text-emerald-100 text-center">دستاوردهای ملموس برای کافه شما</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-2">
              <span className="text-2xl font-bold text-[#d4af37] block font-mono">+۳۵٪</span>
              <span className="font-bold text-emerald-100 block">افزایش نرخ مراجعات مجدد</span>
              <p className="text-[11px] text-emerald-400/80">با ارائه کوپن‌های بازگشت و یادآوری پیشنهادهای اختصاصی</p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-2">
              <span className="text-2xl font-bold text-[#d4af37] block font-mono">۱۰۰٪</span>
              <span className="font-bold text-emerald-100 block">رضایت و شفافیت PII</span>
              <p className="text-[11px] text-emerald-400/80">ثبت داده‌ها صرفاً با موافقت صریح و آگاهانه مهمان</p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-2">
              <span className="text-2xl font-bold text-[#d4af37] block font-mono font-sans">۰ ثانیه</span>
              <span className="font-bold text-emerald-100 block">نیاز به نصب نرم‌افزار برای کاربر</span>
              <p className="text-[11px] text-emerald-400/80">اجرا مستقیم در وب بدون اشغال حافظه گوشی</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <RouterLink
            to="/contact"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs hover:brightness-110 transition-all border border-[#d4af37]/40 shadow-xl inline-flex items-center gap-2"
          >
            <span>درخواست دمو و فعال‌سازی در کافه</span>
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          </RouterLink>
        </div>
      </div>
    </PublicLayout>
  );
};

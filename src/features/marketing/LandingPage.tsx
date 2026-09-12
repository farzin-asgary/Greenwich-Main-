import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { ArrowLeft, UserCheck, BarChart3, MessageSquare, Coffee, ShieldCheck, QrCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="space-y-24 pb-20">
        
        {/* 1. Hero Section */}
        <section className="text-center space-y-6 pt-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2d6a4f]/20 rounded-full blur-3xl pointer-events-none"></div>
          <h1 className="text-3xl sm:text-5xl font-bold text-emerald-100 font-['Playfair_Display',serif] leading-tight">
            مشتری‌ها را فقط پذیرایی نکنید؛ <br className="hidden sm:block" />
            <span className="text-[#d4af37] italic">بشناسیدشان</span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl mx-auto leading-relaxed">
            گرینویچ پلتفرم هوشمند ارتباط با مشتری (CRM) ویژه کافه‌هاست. با استفاده از هوش مصنوعی، روایات تعاملی و جمع‌آوری داده، کافه شما دیگر یک فضای ناشناس نیست؛ به یک شبکه از مشتریان وفادار تبدیل می‌شود.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 border border-[#d4af37]/40 shadow-lg greenwich-emerald-glow"
            >
              درخواست دمو و مشاوره
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0b1312] text-emerald-400 font-bold text-sm hover:bg-[#121e1c] transition-colors flex items-center justify-center gap-2 border border-emerald-800"
            >
              مشاهده قابلیت‌ها
            </Link>
          </div>
        </section>

        {/* 2. The Problem */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-[#121e1c] rounded-3xl p-8 sm:p-12 border border-red-900/30 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full blur-2xl"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-100">نقطه کور کافه‌های سنتی کجاست؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0b1312] border border-red-900/50 rounded-2xl mx-auto flex items-center justify-center text-red-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-emerald-200 text-sm">مشتریان ناشناس</h3>
                <p className="text-[11px] text-emerald-400/70 leading-relaxed">
                  روزانه ده‌ها نفر وارد کافه می‌شوند و می‌روند بدون اینکه بدانید چه کسی وفادار است و چه کسی دیگر برنمی‌گردد.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0b1312] border border-red-900/50 rounded-2xl mx-auto flex items-center justify-center text-red-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-emerald-200 text-sm">نبود داده رفتار مصرف‌کننده</h3>
                <p className="text-[11px] text-emerald-400/70 leading-relaxed">
                  منو و پیشنهادات شما بر اساس حدس و گمان چیده می‌شوند، نه بر اساس داده‌های واقعی از سلیقه مشتریان.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0b1312] border border-red-900/50 rounded-2xl mx-auto flex items-center justify-center text-red-400">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-emerald-200 text-sm">زمان مرده روی میز</h3>
                <p className="text-[11px] text-emerald-400/70 leading-relaxed">
                  مشتری منتظر سفارش است یا در حال استراحت. این زمان طلایی بدون هیچ تعامل موثری با برند شما از دست می‌رود.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Solution & Positioning */}
        <section className="max-w-5xl mx-auto text-center space-y-10">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af37]">جایگزینی فرم‌های خسته‌کننده با روایت‌های تعاملی</h2>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              گرینویچ یک CRM هوشمند است که داده‌ها (Zero-Party Data) را نه از طریق فرم‌های نظرسنجی طولانی، بلکه با خلق یک تجربه کاربری جذاب، داستان‌های کوتاه، و پرسوناهای هوش مصنوعی جمع‌آوری می‌کند. ما میز کافه شما را به یک نقطه تماس دیجیتال تبدیل می‌کنیم.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="greenwich-card p-6 rounded-3xl border border-emerald-900/60 bg-gradient-to-br from-[#121e1c] to-[#1b4332]/20">
              <MessageSquare className="w-8 h-8 text-[#d4af37] mb-4" />
              <h3 className="text-lg font-bold text-emerald-100 mb-2">تعامل از طریق پرسونای هوش مصنوعی</h3>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                مشتریان با کاراکترهای روایی و هوش مصنوعی ما تعامل می‌کنند (بازی، کوییز، داستان). این تعاملات به طور نامحسوس سلیقه و مود مشتری را ثبت کرده و به پروفایل او در داشبورد شما متصل می‌کند.
              </p>
            </div>
            <div className="greenwich-card p-6 rounded-3xl border border-emerald-900/60 bg-gradient-to-bl from-[#121e1c] to-[#1b4332]/20">
              <ShieldCheck className="w-8 h-8 text-[#d4af37] mb-4" />
              <h3 className="text-lg font-bold text-emerald-100 mb-2">داده‌های تمیز و ایمن (Zero-Party)</h3>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                مشتریان با کمال میل شماره تماس و سلایق خود را برای دسترسی به محتوای جذاب میز ارائه می‌دهند. داده‌هایی که با رضایت کامل اخذ شده و بالاترین نرخ تبدیل را دارند.
              </p>
            </div>
          </div>
        </section>

        {/* 4. The Plan (Workflow) */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-100">جریان کار چگونه است؟</h2>
            <p className="text-sm text-emerald-400">یک فرآیند واضح از اسکن تا بازگشت مجدد</p>
          </div>
          
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-emerald-900/50"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#1b4332] border-2 border-[#d4af37]/60 rounded-full mx-auto flex items-center justify-center text-[#d4af37] shadow-lg">
                  <QrCode className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-emerald-100">۱. اسکن QR میز</h4>
                <p className="text-[11px] text-emerald-400/80">مشتری QR فیزیکی اختصاصی میز را اسکن می‌کند.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#1b4332] border-2 border-[#d4af37]/60 rounded-full mx-auto flex items-center justify-center text-[#d4af37] shadow-lg">
                  <UserCheck className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-emerald-100">۲. ورود و ثبت لید</h4>
                <p className="text-[11px] text-emerald-400/80">ورود با شماره موبایل و ساخت پروفایل دیجیتال مشتری.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#1b4332] border-2 border-[#d4af37]/60 rounded-full mx-auto flex items-center justify-center text-[#d4af37] shadow-lg">
                  <Coffee className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-emerald-100">۳. تجربه نشست جذاب</h4>
                <p className="text-[11px] text-emerald-400/80">مشتری مشغول مطالعه، بازی و استفاده از پلتفرم می‌شود.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#1b4332] border-2 border-[#d4af37]/60 rounded-full mx-auto flex items-center justify-center text-[#d4af37] shadow-lg">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-emerald-100">۴. پیشنهاد هدفمند</h4>
                <p className="text-[11px] text-emerald-400/80">ارسال کوپن و پیشنهاد شخصی‌سازی شده برای بازگشت مجدد.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Social Proof / Stats */}
        <section className="bg-[#121e1c] border-y border-emerald-900/40 py-12 text-center">
          <div className="max-w-4xl mx-auto space-y-8 px-6">
            <h2 className="text-lg font-bold text-emerald-200">تبدیل زمان میز به داده‌های خلق ثروت</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <span className="text-3xl font-bold text-[#d4af37] font-mono dir-ltr">65%</span>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider">نرخ تبدیل لاگین</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-bold text-[#d4af37] font-mono dir-ltr">18m</span>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider">متوسط زمان تعامل</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-bold text-[#d4af37] font-mono dir-ltr">2.4x</span>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider">بازگشت سرمایه (ROI)</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-bold text-[#d4af37] font-mono dir-ltr">+10k</span>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider">دیتاپوینت روانشناختی</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="text-center space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-emerald-100">آماده ارتقای کافه خود هستید؟</h2>
          <p className="text-sm text-emerald-300/80 max-w-lg mx-auto">
            گرینویچ در حال حاضر به صورت محدود و دعوتی در حال پذیرش کافه‌های پیشرو است.
          </p>
          <div className="flex justify-center pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-2xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 border border-[#d4af37]/40 shadow-lg"
            >
              درخواست دمو
              <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            </Link>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
};

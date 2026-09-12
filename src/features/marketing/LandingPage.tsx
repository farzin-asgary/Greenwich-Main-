import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import {
  QrCode,
  Users,
  Gift,
  Coffee,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  MessageCircle,
  BarChart3,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden border-b border-emerald-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2d6a4f]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مدیریت هوشمند زمان و تجربه مشتری پای میز کافه</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-emerald-100 font-['Playfair_Display',serif] leading-tight max-w-3xl mx-auto">
            مشتری‌ها را فقط پذیرایی نکنید؛ <span className="text-[#d4af37] underline decoration-[#d4af37]/40 underline-offset-8">بشناسیدشان.</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl mx-auto leading-relaxed">
            گرینویچ کلاب به کافه‌ها کمک می‌کند با کد QR اختصاصی روی هر میز، تجربه‌ای متفاوت و به‌یادماندنی برای مشتریان بسازند، مراجعات را شناسایی کرده و ارتباط با مشتری را بعد از خروج از کافه ادامه دهند.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-sm hover:brightness-110 transition-all border border-[#d4af37]/40 shadow-xl flex items-center gap-2 greenwich-gold-glow"
            >
              <span>درخواست دمو کافه</span>
              <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            </Link>

            <Link
              to="/g/demo-table-12"
              className="px-6 py-3.5 rounded-2xl bg-[#121e1c] text-emerald-200 font-bold text-sm hover:bg-[#1b4332] transition-colors border border-emerald-800 flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              <span>مشاهده نمونه زنده روی میز کافه</span>
            </Link>
          </div>

          {/* Product Flow Graphic */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto text-xs font-bold">
            <div className="bg-[#121e1c] p-3 rounded-xl border border-emerald-900 text-emerald-200 flex flex-col items-center gap-1.5">
              <QrCode className="w-5 h-5 text-[#d4af37]" />
              <span>۱. اسکن QR میز</span>
            </div>
            <div className="bg-[#121e1c] p-3 rounded-xl border border-emerald-900 text-emerald-200 flex flex-col items-center gap-1.5">
              <Coffee className="w-5 h-5 text-emerald-400" />
              <span>۲. تجربه نشست</span>
            </div>
            <div className="bg-[#121e1c] p-3 rounded-xl border border-emerald-900 text-emerald-200 flex flex-col items-center gap-1.5">
              <Users className="w-5 h-5 text-[#d4af37]" />
              <span>۳. ثبت لید واقعی</span>
            </div>
            <div className="bg-[#121e1c] p-3 rounded-xl border border-emerald-900 text-emerald-200 flex flex-col items-center gap-1.5">
              <Gift className="w-5 h-5 text-purple-400" />
              <span>۴. پیشنهاد هدفمند</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-[#121e1c] p-3 rounded-xl border border-emerald-900 text-emerald-200 flex flex-col items-center gap-1.5">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>۵. مراجعه مجدد</span>
            </div>
          </div>

          {/* Dashboard Preview Visual */}
          <div className="pt-8">
            <div className="greenwich-card rounded-3xl p-4 border border-[#d4af37]/40 shadow-2xl max-w-4xl mx-auto bg-gradient-to-b from-[#121e1c] to-[#0b1312] greenwich-gold-glow">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-4 px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-200">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="mr-2 text-emerald-400">داشبورد زنده مدیریت کافه نادری</span>
                </div>
                <span className="text-[10px] font-mono text-[#d4af37] bg-[#0b1312] px-2.5 py-1 rounded-full border border-emerald-900">
                  وضعیت زنده: ۲ نشست فعال
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right">
                <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
                  <span className="text-[11px] text-emerald-400 block">مشتریان شناسایی‌شده امروز</span>
                  <span className="text-2xl font-bold font-mono text-[#d4af37]">۲۴ لید</span>
                  <span className="text-[10px] text-emerald-500 block">همراه با شماره موبایل و رضایت PII</span>
                </div>
                <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
                  <span className="text-[11px] text-emerald-400 block">کوپن‌های بازخریدشده</span>
                  <span className="text-2xl font-bold font-mono text-emerald-200">۱۸ کوپن</span>
                  <span className="text-[10px] text-emerald-500 block">ارزش افزوده مستقیم روی فاکتور</span>
                </div>
                <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
                  <span className="text-[11px] text-emerald-400 block">میانگین زمان ماندگاری</span>
                  <span className="text-2xl font-bold font-mono text-emerald-200">۴۸ دقیقه</span>
                  <span className="text-[10px] text-emerald-500 block">مطالعه داستان و گفتگو دونفره</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">روند ساده ۴ مرحله‌ای</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            گرینویچ کلاب چگونه در کافه شما کار می‌کند؟
          </h2>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-xl mx-auto">
            در کمتر از ۳۰ ثانیه، تجربه مشتری را از نشست معمولی به ارتباطی ماندگار تبدیل کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#d4af37]/30 font-mono">۰۱</span>
            <h3 className="text-sm font-bold text-emerald-100">اسکن QR روی میز</h3>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              مشتری بدون نیاز به نصب هیچ‌گونه اپلیکیشن، کد QR اختصاصی میز خود را اسکن می‌کند.
            </p>
          </div>

          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#d4af37]/30 font-mono">۰۲</span>
            <h3 className="text-sm font-bold text-emerald-100">ورود به تجربه گرینویچ</h3>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              نشست زمانی آغاز شده و مشتری دسترسی به داستان‌ها، موسیقی، کارت‌های گفتگو و پیشنهادها پیدا می‌کند.
            </p>
          </div>

          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#d4af37]/30 font-mono">۰۳</span>
            <h3 className="text-sm font-bold text-emerald-100">دریافت پیشنهاد و کوپن</h3>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              مشتری با ثبت شماره همراه، کوپن‌های تخفیف اختصاصی را دریافت و پای صندوق استفاده می‌کند.
            </p>
          </div>

          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#d4af37]/30 font-mono">۰۴</span>
            <h3 className="text-sm font-bold text-emerald-100">تحلیل و بازگشت مشتری</h3>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              کافه در پنل مدیریتی، هویت مشتری را شناخته و برای مراجعات بعدی پیشنهادهای بازگشت ارسال می‌کند.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT CAPABILITIES SECTION */}
      <section className="py-20 px-6 bg-[#070d0c] border-y border-emerald-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#d4af37]">قابلیت‌های اصلی پلتفرم</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              چهار رکن هوشمند پلتفرم گرینویچ کلاب
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Group 1 */}
            <div className="greenwich-card rounded-3xl p-6 border border-emerald-900/60 space-y-4">
              <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-100">۱. تجربه مهمان (Guest Experience)</h3>
                  <span className="text-[11px] text-emerald-400">محتوا و سرگرمی اختصاصی پای میز کافه</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-emerald-300/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> داستان‌ها، مقالات و داستان‌های صوتی کوتاه</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> کارت‌های گفتگوی دونفره برای تعامل عمیق پای میز</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> پادکست‌ها و قطعات موسیقی متناسب با فضای کافه</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> مدیریت زمان نشست و تایمر حضور روی میز</li>
              </ul>
            </div>

            {/* Group 2 */}
            <div className="greenwich-card rounded-3xl p-6 border border-emerald-900/60 space-y-4">
              <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-100">۲. هوش مشتری (Customer Intelligence)</h3>
                  <span className="text-[11px] text-emerald-400">شناسایی رفتار و ترجیحات مراجعات</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-emerald-300/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> شناسایی مشتریان واقعی با شماره همراه و رضایت PII</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> تاریخچه مراجعات و تشخیص مشتریان وفادار و قدیمی</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> تحلیل علاقه به نوع محتوا و مودهای مختلف</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> ثبت بازخوردها و نظرات مشتریان پای میز</li>
              </ul>
            </div>

            {/* Group 3 */}
            <div className="greenwich-card rounded-3xl p-6 border border-emerald-900/60 space-y-4">
              <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-100">۳. پنل مدیریت کافه (Café CRM)</h3>
                  <span className="text-[11px] text-emerald-400">مدیریت عملیاتی میزها، کوپن‌ها و لیدها</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-emerald-300/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> بانک اطلاعاتی مشتریان اختصاصی کافه</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> تعریف کمپین‌های تخفیف و هدیه اختصاصی</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> ابزار سریع صندوقدار جهت بازخرید کوپن‌ها با پین امنیتی</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> مدیریت و چاپ کدهای QR امن روی میزها</li>
              </ul>
            </div>

            {/* Group 4 */}
            <div className="greenwich-card rounded-3xl p-6 border border-emerald-900/60 space-y-4">
              <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-100">۴. حفظ و بازگشت مشتری (Retention)</h3>
                  <span className="text-[11px] text-emerald-400">ارتباط فراتر از زمان حضور در کافه</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-emerald-300/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> پیشنهادهای ویژه ماه تولد مشتریان</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> پیام‌های بازگشت برای مشتریان غیرفعال (به‌زودی)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> دعوت‌نامه‌های اختصاصی برای رویدادهای کافه</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> کوپن‌های وفاداری برای مراجعه‌های چندباره</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="greenwich-card rounded-3xl p-8 border-2 border-[#d4af37]/40 space-y-4 greenwich-gold-glow bg-gradient-to-br from-[#121e1c] to-[#1b4332]">
          <h2 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            آماده‌اید تجربه کافه خود را ارتقا دهید؟
          </h2>
          <p className="text-xs sm:text-sm text-emerald-300/80 max-w-xl mx-auto leading-relaxed">
            با راه‌اندازی گرینویچ کلاب در کمتر از ۲۴ ساعت، میزهای کافه خود را به کانال ارتباطی دائم با مشتریان تبدیل کنید.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-extrabold text-xs hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-xl"
            >
              <span>درخواست دموی رایگان و مشاوره کافه</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import {
  Sparkles,
  BookOpen,
  MessageCircle,
  BarChart3,
  Coffee,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Users
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مشخصات فنی و کاربردی پلتفرم</span>
          </div>

          <h1 className="text-3xl font-extrabold text-emerald-100 font-['Playfair_Display',serif]">
            قابلیت‌های کلیدی گرینویچ کلاب
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-xl mx-auto">
            بررسی دقیق امکانات کافه، تجربه مهمان پای میز و ابزارهای CRM.
          </p>
        </div>

        {/* SECTION 1: Guest Experience */}
        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-100">تجربه مهمان روی میز (Guest Experience)</h2>
                <p className="text-xs text-emerald-400">بدون نیاز به نصب اپلیکیشن — اجرا در مرورگر گوشی</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
              فعال و عملیاتی ●
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">مجله و داستان‌های کوتاه</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                داستان‌های ۳ تا ۱۰ دقیقه‌ای با حالت شب، تایمر مطالعه و دسته‌بندی مودهای ذهنی.
              </p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">کارت‌های گفتگو (Together Deck)</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                سوالات عمیق و عاشقانه برای زوج‌ها و همراهان پای میز کافه نادری.
              </p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">پخش‌کننده صوتی و موسیقی</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                موسیقی‌های آرامش‌بخش، بی‌کلام و روایت‌های صوتی با پلیر شناور در کل اپ.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Customer Intelligence */}
        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-100">هوش مشتری و لیدهای واقعی (Customer Intelligence)</h2>
                <p className="text-xs text-emerald-400">تبدیل بازدیدکننده ناشناس به لید شناخته‌شده</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
              فعال و عملیاتی ●
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">احراز هویت با شماره همراه</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                ورود سریع با رمز یکبارمصرف (OTP) و ذخیره مطمئن در بانک اطلاعاتی کافه.
              </p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">کسب رضایت حریم خصوصی (Consent)</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                شفافیت کامل مطابق با اصول PII و اخذ موافقت کاربر برای پیامک‌های بازاریابی.
              </p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">تشخیص مراجعات مجدد</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                محاسبه خودکار تعداد مراجعات، فاصله بین مراجعات و کوپن‌های بازخریدشده.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Café CRM */}
        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-100">پنل عملیاتی کافه (Café CRM)</h2>
                <p className="text-xs text-emerald-400">ویژه مدیریت کافه و صندوقداران</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
              فعال و عملیاتی ●
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">ابزار بازخرید کوپن صندوقدار</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                ورود پین اختصاصی پرسنل برای ثبت سریع بازخرید کوپن و جلوگیری از استفاده مجدد.
              </p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">مدیریت کدهای QR میزها</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                امکان بازسازی توکن QR جهت حفظ امنیت و جلوگیری از سوءاستفاده خارج از کافه.
              </p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-950 space-y-2">
              <h4 className="text-xs font-bold text-[#d4af37]">ثبت نظرات و بازخوردها</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                مشاهده امتیازات و تگ‌های نظرسنجی کیفیت قهوه و موسیقی در لحظه.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-2xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-xs hover:bg-[#1b4332] transition-colors inline-flex items-center gap-2 border border-[#d4af37]/40 shadow-lg"
          >
            <span>مشاوره و درخواست فعال‌سازی برای کافه</span>
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

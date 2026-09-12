import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { MessageCircleQuestion, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      q: "گرینویچ کلاب چیست؟",
      a: "گرینویچ کلاب یک پلتفرم هوشمند (CRM و وفاداری) برای کافه‌هاست که با استفاده از کدهای QR روی میز، هوش مصنوعی و روایت‌های تعاملی، زمان نشستن مشتریان را به تجربه‌ای جذاب تبدیل کرده و داده‌های مفیدی برای کافه‌دار فراهم می‌کند."
    },
    {
      id: 2,
      q: "آیا مشتریان برای استفاده باید اپلیکیشن نصب کنند؟",
      a: "خیر، پلتفرم گرینویچ کلاب به صورت وب‌اپلیکیشن (PWA) طراحی شده است. مشتریان تنها با اسکن کد QR میز خود، بدون نیاز به هیچ نصب یا دانلودی، مستقیماً وارد محیط تعاملی می‌شوند."
    },
    {
      id: 3,
      q: "چگونه داده‌های مشتریان (Zero-Party Data) جمع‌آوری می‌شود؟",
      a: "ما به جای فرم‌های خسته‌کننده، از تعامل با پرسوناهای هوش مصنوعی، کوئیزهای جذاب روانشناختی و روایت‌های شخصی‌سازی‌شده استفاده می‌کنیم. کاربر با کمال میل و برای ارتقای تجربه خود در کافه، به این سؤالات پاسخ می‌دهد."
    },
    {
      id: 4,
      q: "مدل قیمت‌گذاری به چه صورت است؟",
      a: "قیمت‌گذاری بر اساس ظرفیت کافه شما (تعداد میز فعال) و سطح دسترسی به ماژول‌های هوش مصنوعی (AI) متغیر است. برای دریافت بهترین پیشنهاد مناسب ابعاد کافه شما، لطفاً فرم درخواست دمو را پر کنید."
    },
    {
      id: 5,
      q: "آیا امنیت اطلاعات مشتریان ما حفظ می‌شود؟",
      a: "بله. اطلاعات هر کافه به‌صورت کاملاً ایزوله در سرورهای ابری امن نگهداری می‌شود. علاوه بر این، طبق قوانین حفظ حریم خصوصی، کاربران در زمان ورود صریحاً رضایت خود را ثبت می‌کنند."
    }
  ];

  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-3xl mx-auto space-y-8 pb-20">
        <div className="text-center space-y-4">
          <MessageCircleQuestion className="w-12 h-12 text-[#d4af37] mx-auto" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            سوالات متداول
          </h1>
          <p className="text-xs text-emerald-300/70 pt-2">
            پاسخ به مهمترین پرسش‌های مدیران و صاحبان کافه درباره پلتفرم
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`greenwich-card rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${openId === faq.id ? 'border-[#d4af37]/60 bg-[#121e1c]' : 'border-emerald-900/60 bg-[#0b1312] hover:bg-[#121e1c]/50'}`}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <div className="flex items-center justify-between p-5">
                <h3 className={`text-sm font-bold transition-colors ${openId === faq.id ? 'text-[#d4af37]' : 'text-emerald-200'}`}>
                  {faq.q}
                </h3>
                {openId === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-[#d4af37]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              
              <div className={`px-5 pb-5 text-xs text-emerald-300/80 leading-relaxed transition-all duration-300 ${openId === faq.id ? 'block' : 'hidden'}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

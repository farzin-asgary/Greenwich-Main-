import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Clock, Heart, Users, Coffee } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <GreenwichLogo size="md" />
          <h1 className="text-3xl font-extrabold text-emerald-100 font-['Playfair_Display',serif] pt-2">
            درباره گرینویچ کلاب
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-lg mx-auto">
            تلاشی برای بازگرداندن ارزش زمان، ارتباط عمیق انسانی و حضور کیفیت‌محور در کافه‌ها.
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-8 border border-emerald-900/60 space-y-6 text-xs text-emerald-200/90 leading-relaxed">
          <p>
            گرینویچ کلاب با الهام از مفهوم نصف‌النهار گرینویچ و اندازه‌گیری دقیق زمان متولد شد. در دنیایی که توجه انسان‌ها توسط شبکه‌های اجتماعی شتاب‌زده بلعیده می‌شود، کافه‌ها یکی از آخرین سنگرهای ارتباط حقیقی فیزیکی هستند.
          </p>

          <p>
            هدف ما تبدیل زمان صرف‌شده پای میز کافه به یک تجربه غنی از مطالعه، گفتگو، موسیقی و ارتباط صمیمانه است. گرینویچ کلاب نه تنها کیفیتی متفاوت به وقت‌گذرانی مهمان می‌بخشد، بلکه به مدیریت کافه قدرت می‌دهد تا مخاطبان خود را به‌خوبی بشناسد و ارتباطی فراتر از یک فاکتور ساده با آن‌ها برقرار سازد.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
              <Clock className="w-5 h-5 text-[#d4af37] mx-auto" />
              <h4 className="font-bold text-emerald-100">ارزش زمان</h4>
              <p className="text-[10px] text-emerald-400/70">قدردانی از دقیقه‌های حضور در کافه</p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
              <Heart className="w-5 h-5 text-pink-400 mx-auto" />
              <h4 className="font-bold text-emerald-100">ارتباط انسانی</h4>
              <p className="text-[10px] text-emerald-400/70">تعامل صمیمانه پای میز با کارت‌های گفتگو</p>
            </div>

            <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
              <Coffee className="w-5 h-5 text-[#d4af37] mx-auto" />
              <h4 className="font-bold text-emerald-100">مهمان‌نوازی هوشمند</h4>
              <p className="text-[10px] text-emerald-400/70">ابزار وفادارسازی مدرن برای کافه‌ها</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

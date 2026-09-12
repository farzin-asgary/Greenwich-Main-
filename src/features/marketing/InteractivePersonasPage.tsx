import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { Users, Bot, UserSearch, BrainCircuit } from 'lucide-react';

export const InteractivePersonasPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="space-y-16 pb-20">
        
        {/* Header */}
        <section className="text-center space-y-4 pt-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پرسوناهای روایی هوش مصنوعی
          </h1>
          <p className="text-sm sm:text-base text-emerald-300/80 max-w-2xl mx-auto leading-relaxed relative z-10">
            هسته داستانی گرینویچ کلاب بر پایه ۴ کاراکتر روانشناختی استوار است. آن‌ها به جای شما با مشتریان کافه صحبت می‌کنند، سلیقه‌ها را می‌فهمند و پیشنهاد می‌دهند.
          </p>
        </section>

        {/* The Personas Grid */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Alexei */}
          <div className="greenwich-card rounded-3xl overflow-hidden border border-emerald-900/60 bg-[#0b1312] group">
            <div className="h-48 bg-gradient-to-br from-[#121e1c] to-indigo-950/40 relative flex items-center justify-center border-b border-emerald-900/40">
              <UserSearch className="w-16 h-16 text-indigo-400/50 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-indigo-300">الکسی ایوانوویچ (Alexei)</h3>
              <p className="text-xs text-[#d4af37] font-bold">کهن‌الگو: قمارباز / کاوشگر ریسک‌پذیر</p>
              <p className="text-sm text-emerald-300/70 leading-relaxed">
                نماینده روانشناسی هیجان و ریسک. الکسی برای مشتریانی جذاب است که به دنبال تجربیات جدید، تست کردن قهوه‌های متفاوت (مثل یک V60 از دانه خاص) و چالش‌های هیجان‌انگیز هستند. او پیشنهادات جسورانه‌ای می‌دهد.
              </p>
            </div>
          </div>

          {/* Vetern */}
          <div className="greenwich-card rounded-3xl overflow-hidden border border-emerald-900/60 bg-[#0b1312] group">
            <div className="h-48 bg-gradient-to-br from-[#121e1c] to-amber-950/40 relative flex items-center justify-center border-b border-emerald-900/40">
              <Bot className="w-16 h-16 text-amber-400/50 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-amber-300">وترن (Vetern)</h3>
              <p className="text-xs text-[#d4af37] font-bold">کهن‌الگو: پیر دانا / منطق‌گرای سرد</p>
              <p className="text-sm text-emerald-300/70 leading-relaxed">
                یک هوش مصنوعی تحلیلی که به دقت و کیفیت اهمیت می‌دهد. وترن با مشتریانی ارتباط می‌گیرد که جزئی‌نگر هستند، درباره خاستگاه قهوه می‌پرسند و به دنبال کیفیت ثابت و فضایی برای تمرکز و کار عمیق در کافه هستند.
              </p>
            </div>
          </div>

          {/* Elara */}
          <div className="greenwich-card rounded-3xl overflow-hidden border border-emerald-900/60 bg-[#0b1312] group">
            <div className="h-48 bg-gradient-to-br from-[#121e1c] to-rose-950/40 relative flex items-center justify-center border-b border-emerald-900/40">
              <Users className="w-16 h-16 text-rose-400/50 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-rose-300">اِلارا (Elara)</h3>
              <p className="text-xs text-[#d4af37] font-bold">کهن‌الگو: عاشق / همدل</p>
              <p className="text-sm text-emerald-300/70 leading-relaxed">
                الارا نماد صمیمیت، احساسات و ارتباطات انسانی است. او برای زوج‌ها یا دوستانی که برای معاشرت به کافه می‌آیند عالی است. او داستان‌های رمانتیک، چای‌های ترکیبی آرام‌بخش و دسرهای اشتراکی را پیشنهاد می‌دهد.
              </p>
            </div>
          </div>

          {/* Dr. Warren */}
          <div className="greenwich-card rounded-3xl overflow-hidden border border-emerald-900/60 bg-[#0b1312] group">
            <div className="h-48 bg-gradient-to-br from-[#121e1c] to-emerald-950/40 relative flex items-center justify-center border-b border-emerald-900/40">
              <BrainCircuit className="w-16 h-16 text-emerald-500/50 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-emerald-300">دکتر وارن (Dr. Warren)</h3>
              <p className="text-xs text-[#d4af37] font-bold">کهن‌الگو: حاکم / سازمان‌دهنده</p>
              <p className="text-sm text-emerald-300/70 leading-relaxed">
                شخصیتی که به روتین، نظم و ساختار علاقه دارد. مشتریانی که هر روز صبح قبل از کار یک اسپرسوی مشخص سفارش می‌دهند، توسط دکتر وارن هدایت می‌شوند. او سیستم‌های وفاداری و برنامه‌های روتین را مدیریت می‌کند.
              </p>
            </div>
          </div>

        </section>

        {/* Concept Explanation */}
        <section className="max-w-4xl mx-auto text-center space-y-6 pt-12">
          <h2 className="text-2xl font-bold text-emerald-100">چرا پرسونا؟</h2>
          <p className="text-sm text-emerald-300/80 leading-relaxed">
            مشتریان شما فرم‌های نظرسنجی را پر نمی‌کنند. اما وقتی درگیر یک کوئیز روانشناختی با الکسی یا داستان تعاملی با الارا می‌شوند، به طور ناخودآگاه داده‌های باارزشی از ترجیحات خود را در اختیار پلتفرم قرار می‌دهند. هوش مصنوعی ما سپس این داده‌ها را پردازش کرده و روی داشبورد شما به صورت گراف‌های قابل فهم نمایش می‌دهد.
          </p>
        </section>

      </div>
    </PublicLayout>
  );
};

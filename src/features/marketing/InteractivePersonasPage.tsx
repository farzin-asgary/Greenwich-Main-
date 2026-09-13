import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { BookOpen } from 'lucide-react';

export const InteractivePersonasPage: React.FC = () => {
  const personas = [
    {
      id: 'alexi',
      name: 'آلکسی ایوانوویچ',
      enName: 'Alexei',
      archetype: 'قمارباز / کاوشگر ریسک‌پذیر',
      desc: 'نماینده هیجان و ریسک. الکسی برای مشتریانی جذاب است که به دنبال تجربیات جدید، تست کردن قهوه‌های متفاوت و چالش‌های هیجان‌انگیز هستند.',
      image: '/images/personas/alexi.jpg'
    },
    {
      id: 'elara',
      name: 'اِلارا',
      enName: 'Elara',
      archetype: 'عاشق / همدل',
      desc: 'نماد صمیمیت، احساسات و ارتباطات انسانی. او داستان‌های رمانتیک، چای‌های ترکیبی آرام‌بخش و دسرهای اشتراکی را پیشنهاد می‌دهد.',
      image: '/images/personas/elara.jpg'
    },
    {
      id: 'dr_waren',
      name: 'دکتر وارن',
      enName: 'Dr. Warren',
      archetype: 'حاکم / سازمان‌دهنده',
      desc: 'شخصیتی که به روتین، نظم و ساختار علاقه دارد. مشتریانی که هر روز یک سفارش مشخص دارند توسط او هدایت می‌شوند.',
      image: '/images/personas/Dr.waren.jpg'
    },
    {
      id: 'voutern',
      name: 'ووترن',
      enName: 'Voutern',
      archetype: 'منطق‌گرای سرد / تحلیل‌گر',
      desc: 'یک هوش مصنوعی تحلیلی که به دقت و کیفیت اهمیت می‌دهد. وترن با مشتریانی ارتباط می‌گیرد که جزئی‌نگر هستند و به دنبال کیفیت ثابت می‌باشند.',
      image: '/images/personas/voutern.jpg'
    },
    {
      id: 'old_man',
      name: 'پیرمرد خردمند',
      enName: 'The Wise Elder',
      archetype: 'پیر دانا / راهنما',
      desc: 'روایتگری از جنس تجربه و سکوت. او برای کسانی حضور دارد که به دنبال معنای عمیق‌تری در یک عصر آرام و یک فنجان قهوه تلخ هستند.',
      image: '/images/personas/old_man.jpg' // Placeholder for the 5th image
    }
  ];

  return (
    <PublicLayout>
      <div className="space-y-16 pb-24">
        
        {/* Header Section */}
        <section className="text-center space-y-6 pt-16 px-4 relative max-w-3xl mx-auto">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b4332]/30 border border-emerald-900/50 text-[#d4af37] text-xs font-bold relative z-10">
            <BookOpen className="w-3.5 h-3.5" />
            <span>راویان گرینویچ</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-100 leading-[1.4] relative z-10">
            صفحه راویان
          </h1>
          
          <p className="text-sm sm:text-base text-emerald-200/80 leading-[1.7] relative z-10 text-justify sm:text-center">
            میزها، طعم‌ها و جریان یک بعدازظهر برای همه یکسان رخ می‌دهند؛ تفاوت واقعی در نحوه بازخوانی آنهاست. دیدگاه‌های تازه به هر چیزی معنا می‌دهند؛ از یک تصمیم بزرگ گرفته تا آرامشِ عمیق پشت یک فنجان چای خوش‌طعم در کافه. راویان گرینویچ دریچه‌ای باز می‌کنند تا جهان معمولی را از زاویه‌هایی نو بچشید؛ جایی که یک رخداد ساده، سرآغاز حسی غنی و تجربه‌ای منحصربه‌فرد می‌شود.
          </p>
        </section>

        {/* The Personas Grid */}
        <section className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {personas.map((persona, index) => (
              <div 
                key={persona.id} 
                className={`greenwich-card group relative rounded-3xl overflow-hidden border border-emerald-900/40 bg-[#0b1312] aspect-[4/5] flex flex-col justify-end transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-2xl hover:shadow-emerald-900/20 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm`}
              >
                {/* Background Image with Fallback Pattern */}
                <div className="absolute inset-0 bg-[#121e1c]">
                  <img 
                    src={persona.image} 
                    alt={persona.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => {
                      // Fallback if image not found during dev
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('fallback-bg');
                    }}
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a09] via-[#050a09]/80 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-1">
                    <p className="text-xs text-[#d4af37] font-bold tracking-widest">{persona.archetype}</p>
                    <h3 className="text-2xl font-bold text-emerald-50 flex items-end gap-2">
                      {persona.name}
                      <span className="text-sm font-['Playfair_Display',serif] text-emerald-400/50 mb-1">{persona.enName}</span>
                    </h3>
                  </div>
                  
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <p className="text-sm text-emerald-200/80 leading-[1.7] pt-2 border-t border-emerald-900/50 mt-2">
                      {persona.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

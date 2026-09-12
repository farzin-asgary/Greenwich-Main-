import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { BookOpen, Clock, Tag, ArrowLeft } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      id: '1',
      title: 'چگونه کافه‌های پیشرو مشتریان پای میز را به مشتریان وفادار دائمی تبدیل می‌کنند؟',
      summary: 'بررسی راهکارهای مدرن CRM و شخصی‌سازی پیشنهادهای تخفیف بر اساس رفتار مهمانان در محیط فیزیکی کافه.',
      category: 'رشد کافه و CRM',
      readTime: '۵ دقیقه',
      date: '۱۸ مرداد ۱۴۰۳',
      author: 'تیم تحقیقات گرینویچ'
    },
    {
      id: '2',
      title: 'نقش فرهنگ کافه‌نشینی و داستان‌های کوتاه در افزایش زمان ماندگاری مشتری',
      summary: 'چرا ارائه محتوای متنی و صوتی ارزشمند، تجربه حضور در کافه را از یک صرف قهوه ساده به لحظاتی ماندگار ارتقا می‌دهد.',
      category: 'تجربه مهمان',
      readTime: '۴ دقیقه',
      date: '۱۲ مرداد ۱۴۰۳',
      author: 'مریم سهرابی'
    },
    {
      id: '3',
      title: 'حفظ حریم خصوصی PII در سیستم‌های آنلاین و جلب اعتماد مشتریان کافه',
      summary: 'چگونه بدون مزاحمت برای مشتری و با دریافت رضایت آگاهانه، اطلاعات ارتباطی ارزشمند برای بازاریابی جمع‌آوری کنیم.',
      category: 'قوانین و حریم خصوصی',
      readTime: '۶ دقیقه',
      date: '۰۵ مرداد ۱۴۰۳',
      author: 'تیم فنی گرینویچ'
    }
  ];

  return (
    <PublicLayout>
      <div className="py-12 px-6 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>مجله تخصصی کافه‌داری و تجربه مشتری</span>
          </div>

          <h1 className="text-3xl font-extrabold text-emerald-100 font-['Playfair_Display',serif]">
            وبلاگ گرینویچ کلاب
          </h1>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-lg mx-auto">
            مقالات علمی و کاربردی درباره فرهنگ کافه، وفادارسازی مشتریان و مدیریت هوشمند زمان.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 flex flex-col justify-between space-y-4 greenwich-card-hover"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-emerald-400">
                  <span className="bg-[#1b4332] text-[#d4af37] font-bold px-2 py-0.5 rounded-full border border-[#d4af37]/30">
                    {post.category}
                  </span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-emerald-100 leading-snug hover:text-[#d4af37] transition-colors cursor-pointer">
                  {post.title}
                </h3>

                <p className="text-xs text-emerald-300/70 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-emerald-400">
                <span>{post.author}</span>
                <span className="text-[#d4af37] font-bold flex items-center gap-1">
                  مطالعه مطلب <ArrowLeft className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

import React from 'react';
import { PublicLayout } from '../../layouts/public/PublicLayout';
import { DatabaseZap, Calendar } from 'lucide-react';

export const DataRetentionPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <DatabaseZap className="w-12 h-12 text-[#d4af37] mx-auto" />
          <h1 className="text-2xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            سیاست نگهداری داده‌ها
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b4332]/50 border border-emerald-900/50 text-xs text-emerald-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>نسخه ۱٫۰ — از تاریخ ۱۴۰۴/۰۶/۲۲</span>
          </div>
          <p className="text-xs text-emerald-300/70 pt-2">
            اصول شفافیت در ذخیره‌سازی، انقضا و امحای اطلاعات مراجعین کافه‌ها
          </p>
        </div>

        <div className="greenwich-card rounded-3xl p-6 sm:p-8 border border-emerald-900/60 bg-[#0b1312] space-y-8 text-sm text-emerald-200/90 leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۱. چرخه عمر نشست (Visit Session)</h3>
            <p>
              اطلاعات زمان شروع نشست شما بر سر میز تنها برای مدیریت جلسه (معمولاً ۱۲۰ دقیقه) در حافظه فعال کش (Cache) باقی می‌ماند و پس از پایان، وضعیت نشست به عنوان منقضی شده، صرفاً برای ارائه تاریخچه در لاگ ذخیره می‌گردد.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۲. نگهداری سوابق بازخورد و تعاملات</h3>
            <p>
              داده‌های مربوط به رویدادها (Product Events)، بازخورد کیفیت، و گفتگو با پرسوناها، به صورت نامستعار (Pseudonymous) ذخیره می‌شوند. این داده‌ها تنها از طریق شناسه سیستمی قابل اتصال به کاربر هستند، و هرگز شماره تماس شما در ردیف‌های خام جداول تحلیلی درج نمی‌گردد.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#d4af37]">۳. حق فراموشی و حذف فیزیکی (Hard Delete)</h3>
            <p>
              شما در هر زمان می‌توانید با مراجعه به پنل کاربری خود درخواست حذف حساب را ثبت کنید. این عمل یک UPDATE ساده نیست؛ درخواست حذف باعث می‌شود تمامی شناسه تلفن همراه از جدول اصلی کاربران (Guests) به صورت دائمی پاک شده و سوابق رفتاری صرفاً به عنوان آمار بی‌هویت باقی بمانند.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};

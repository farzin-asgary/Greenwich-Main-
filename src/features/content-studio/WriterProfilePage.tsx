import React from 'react';
import { ContentStudioLayout } from '../../layouts/content/ContentStudioLayout';
import { useAuth } from '../../app/auth/AuthContext';
import { PenTool } from 'lucide-react';

export const WriterProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <ContentStudioLayout>
      <div className="space-y-6 max-w-xl">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پروفایل نویسنده
          </h1>
          <p className="text-xs text-emerald-300/70">اطلاعات بیوگرافی و رزومه نویسنده مجله گرینویچ</p>
        </div>

        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4 text-xs">
          <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-3">
            <div className="w-12 h-12 rounded-full bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-100 text-sm">{user?.name}</h3>
              <span className="text-[10px] text-emerald-400">نویسنده ارشد داستان کوتاه</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-emerald-300 block">درباره نویسنده</span>
            <p className="text-emerald-200/80 leading-relaxed">
              نویسنده و پژوهشگر حوزه تاریخ تهران و فرهنگ کافه‌نشینی با بیش از ۵ سال تجربه در تولید محتوای ادبی و داستان‌های کوتاه متناسب با زمان‌های ۱۰ دقیقه‌ای.
            </p>
          </div>
        </div>
      </div>
    </ContentStudioLayout>
  );
};

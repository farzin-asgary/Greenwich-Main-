import React from 'react';
import { Link } from 'react-router-dom';
import { ContentStudioLayout } from '../../layouts/content/ContentStudioLayout';
import { LayoutDashboard, FileText, PlusCircle, Eye, Heart, BookOpen, Clock } from 'lucide-react';

export const WriterDashboardPage: React.FC = () => {
  return (
    <ContentStudioLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-900/60 pb-4">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              استودیو محتوای گرینویچ
            </h1>
            <p className="text-xs text-emerald-300/70 mt-0.5">
              مدیریت مطالب، داستان‌های صوتی و سوالات تعاملی دونفره برای میز کافه‌ها
            </p>
          </div>

          <Link
            to="/content-studio/publications/new"
            className="px-4 py-2.5 rounded-xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-xs hover:bg-[#1b4332] transition-colors border border-[#d4af37]/40 shadow-md flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-[#d4af37]" />
            <span>ایجاد مطلب یا داستان جدید</span>
          </Link>
        </div>

        {/* Analytics stats for writer */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">مطالب منتشرشده</span>
              <FileText className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۱۴ مطلب</span>
          </div>

          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">بازدید کل پای میزها</span>
              <Eye className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-[#d4af37]">۳,۴۵۰ بار</span>
          </div>

          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">پسندها (Likes)</span>
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۴۸۰ لایک</span>
          </div>

          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">میانگین زمان مطالعه</span>
              <Clock className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۴.۲ دقیقه</span>
          </div>
        </div>

        {/* Writer Content List Preview */}
        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span>آخرین مطالب شما</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-200 block">قهوه و زمان در تاریخ کافه نادری</span>
                <span className="text-[10px] text-emerald-400/80">دسته‌بندی: داستان کوتاه ● مود: آرامش ● بازدید: ۱,۲۰۰</span>
              </div>
              <Link
                to="/content-studio/publications/pub-2"
                className="px-3 py-1 rounded-lg bg-[#121e1c] text-[#d4af37] font-bold text-[11px] hover:bg-[#1b4332]"
              >
                ویرایش
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentStudioLayout>
  );
};

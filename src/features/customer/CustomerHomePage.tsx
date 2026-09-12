import React from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/customer/CustomerLayout';
import { useAuth } from '../../app/auth/AuthContext';
import { Clock, Tag, Bookmark, Coffee, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="greenwich-card rounded-3xl p-6 border border-emerald-900/60 bg-gradient-to-r from-[#121e1c] to-[#1b4332]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs text-[#d4af37] font-bold block">خوش آمدید، {user?.name} عزیز</span>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              خلاصه وضعیت حساب کاربری
            </h1>
            <p className="text-xs text-emerald-300/70 mt-1">
              مدیریت مراجعات، کوپن‌های تخفیف و محتواهای ذخیره‌شده شما در کافه‌ها.
            </p>
          </div>

          <Link
            to="/g/demo-table-12"
            className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-black font-extrabold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Coffee className="w-4 h-4" />
            <span>تجربه زنده میز کافه نادری</span>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">تعداد کل مراجعات</span>
              <Clock className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-[#d4af37]">۱۲ مراجعه</span>
            <span className="text-[10px] text-emerald-500 block">آخرین مراجعه: ۲ روز پیش در کافه نادری</span>
          </div>

          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">کوپن‌های فعال شما</span>
              <Tag className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۲ کوپن</span>
            <span className="text-[10px] text-emerald-500 block">آماده بازخرید پای صندوق کافه</span>
          </div>

          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">محتوای ذخیره‌شده</span>
              <Bookmark className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۵ مطلب</span>
            <span className="text-[10px] text-emerald-500 block">داستان‌ها و پادکست‌های موردعلاقه</span>
          </div>
        </div>

        {/* Recent Visits Preview */}
        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>مراجعات اخیر شما به کافه‌ها</span>
            </h3>
            <Link to="/panel/user/visits" className="text-xs text-[#d4af37] font-bold hover:underline flex items-center gap-1">
              <span>مشاهده همه</span>
              <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-200 block">کافه نادری — میز ۱۲</span>
                <span className="text-[10px] text-emerald-400/80">۱۶ مرداد ۱۴۰۳ ● مدت حضور: ۴۵ دقیقه</span>
              </div>
              <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-800">
                پایان یافته
              </span>
            </div>

            <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-200 block">کافه نادری — میز ۴</span>
                <span className="text-[10px] text-emerald-400/80">۱۰ مرداد ۱۴۰۳ ● مدت حضور: ۶۰ دقیقه</span>
              </div>
              <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-800">
                پایان یافته
              </span>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

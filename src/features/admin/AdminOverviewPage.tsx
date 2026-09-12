import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { Shield, Building2, GitBranch, Users, Activity, CheckCircle2, QrCode } from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              نمای کلی پلتفرم گرینویچ کلاب
            </h1>
            <p className="text-xs text-emerald-300/70">مرکز فرماندهی و نظارت ارشد بر کافه‌ها، شعب و کاربران</p>
          </div>

          <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            سیستم پایدار (All Systems Operational)
          </span>
        </div>

        {/* Global Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">کافه‌ها / سازمان‌ها</span>
              <Building2 className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-[#d4af37]">۱۲ مجموعه</span>
          </div>

          <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">شعبه‌های فعال</span>
              <GitBranch className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۱۸ شعبه</span>
          </div>

          <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">کل لیدهای ثبت‌شده</span>
              <Users className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-200">۴,۲۵۰ لید</span>
          </div>

          <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">اسکن‌های ماه جاری</span>
              <QrCode className="w-4 h-4 text-[#d4af37]" />
            </div>
            <span className="text-2xl font-bold font-mono text-[#d4af37]">۱۸,۶۰۰ اسکن</span>
          </div>
        </div>

        {/* Active Organizations Table Preview */}
        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#d4af37]" />
              <span>آخرین کافه‌های عضو پلتفرم</span>
            </h3>
            <Link to="/admin-panel/organizations" className="text-xs text-[#d4af37] font-bold hover:underline">
              مدیریت همه
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-100 block">کافه نادری</span>
                <span className="text-[10px] text-emerald-400/80">تعداد شعب: ۱ ● میزهای فعال: ۱۵ ● لیدها: ۳۴۰</span>
              </div>
              <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-800">
                فعال ●
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

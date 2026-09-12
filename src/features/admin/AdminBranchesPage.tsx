import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { GitBranch, QrCode } from 'lucide-react';

export const AdminBranchesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            مدیریت شعبه‌ها و کدهای QR میزها
          </h1>
          <p className="text-xs text-emerald-300/70">نظارت بر وضعیت فعال و چاپی کدهای QR در کلیه کافه‌ها</p>
        </div>

        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <div>
              <h3 className="font-bold text-emerald-100">کافه نادری — شعبه جمهوری</h3>
              <span className="text-[10px] text-emerald-400">تعداد میزهای فعال: ۱۵ میز</span>
            </div>
            <span className="bg-[#1b4332] text-[#d4af37] font-bold px-2.5 py-1 rounded-full text-[10px]">
              کد QR تایید شده
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

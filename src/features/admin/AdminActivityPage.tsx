import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { Activity } from 'lucide-react';

export const AdminActivityPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            لوگ فعالیت‌ها و رویدادهای سیستم (System Audit)
          </h1>
          <p className="text-xs text-emerald-300/70">رصد کلیه رویدادهای اسکن QR، بازخرید کوپن‌ها و ورودهای پرسنل</p>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-950 text-emerald-300 flex justify-between">
            <span>[18:24:10] QR_SCAN_EVENT: Table 12, Cafe Naderi</span>
            <span className="text-emerald-500">SUCCESS</span>
          </div>
          <div className="bg-[#0b1312] p-3 rounded-xl border border-emerald-950 text-emerald-300 flex justify-between">
            <span>[18:15:02] COUPON_REDEEM_EVENT: Code NADERI-WELCOME-20</span>
            <span className="text-emerald-500">SUCCESS</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

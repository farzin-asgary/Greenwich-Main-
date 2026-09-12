import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { HelpCircle } from 'lucide-react';

export const AdminSupportPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پشتیبانی فنی و تیکت‌های کافه‌ها
          </h1>
          <p className="text-xs text-emerald-300/70">مدیریت درخواست‌های پشتیبانی و چاپ مجدد کدهای QR</p>
        </div>

        <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 text-xs text-emerald-300">
          تیکت بازی بدون پاسخ وجود ندارد.
        </div>
      </div>
    </AdminLayout>
  );
};

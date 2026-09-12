import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { FileText } from 'lucide-react';

export const AdminContentPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            نظارت ارشد بر محتوا و مجله
          </h1>
          <p className="text-xs text-emerald-300/70">بررسی و تایید مطالب نویسندگان قبل از قرارگیری روی میز کافه‌ها</p>
        </div>

        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-2 text-xs">
          <h3 className="font-bold text-emerald-100">قهوه و زمان در تاریخ کافه نادری</h3>
          <p className="text-emerald-300/70">نویسنده: مریم سهرابی ● وضعیت: تایید و منتشر شده</p>
        </div>
      </div>
    </AdminLayout>
  );
};

import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { UserCheck, ShieldCheck } from 'lucide-react';

export const AdminGuestsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            نظارت بر بانک اطلاعاتی مشتریان و اصول PII
          </h1>
          <p className="text-xs text-emerald-300/70">حفاظت و ممیزی صریح رضایت‌های حریم خصوصی مشتریان کافه‌ها</p>
        </div>

        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <span className="font-bold">ممیزی حریم خصوصی: ۱۰۰٪ لیدهای موجود دارای رضایت صریح ثبت‌شده هستند.</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

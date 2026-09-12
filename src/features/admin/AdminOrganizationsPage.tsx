import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { Building2, Plus, Edit, ShieldCheck } from 'lucide-react';

export const AdminOrganizationsPage: React.FC = () => {
  const orgs = [
    { id: '1', name: 'کافه نادری', code: 'NADERI', branches: 1, users: 3, status: 'active', createdAt: '۱۴۰۲/۱۱/۰۱' },
    { id: '2', name: 'کافه رومنس', code: 'ROMANCE', branches: 2, users: 5, status: 'active', createdAt: '۱۴۰۳/۰۱/۱۵' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-emerald-900/60 pb-3">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              مدیریت کافه‌ها و سازمان‌ها
            </h1>
            <p className="text-xs text-emerald-300/70">تعریف و آنبوردینگ مجموعه‌های جدید به پلتفرم گرینویچ</p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-xs hover:bg-[#1b4332] flex items-center gap-1.5 border border-[#d4af37]/30">
            <Plus className="w-4 h-4 text-[#d4af37]" />
            <span>ثبت کافه جدید</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {orgs?.map((o) => (
            <div key={o.id} className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100">{o.name} <span className="font-mono text-emerald-400 text-[10px]">({o.code})</span></h3>
                  <span className="text-[10px] text-emerald-400 block">{o.branches} شعبه ● {o.users} کاربر پرسنل</span>
                </div>
              </div>

              <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-800">
                فعال ●
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

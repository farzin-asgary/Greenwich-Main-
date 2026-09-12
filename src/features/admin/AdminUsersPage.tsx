import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { Users, Shield } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const users = [
    { id: '1', name: 'راهبر سیستم گرینویچ', role: 'ADMIN', phone: '09120000000' },
    { id: '2', name: 'مدیریت کافه نادری', role: 'CAFE', phone: '09128889900' },
    { id: '3', name: 'مریم سهرابی (نویسنده)', role: 'CONTENT_WRITER', phone: '09125556677' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            مدیریت کاربران و نقش‌های پلتفرم
          </h1>
          <p className="text-xs text-emerald-300/70">مدیریت سطوح دسترسی مدیران، مدیران کافه و نویسندگان</p>
        </div>

        <div className="space-y-2 text-xs">
          {users?.map((u) => (
            <div key={u.id} className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-emerald-100">{u.name}</h3>
                <span className="font-mono text-emerald-400 text-[11px] dir-ltr block text-right">{u.phone}</span>
              </div>
              <span className="bg-[#1b4332] text-[#d4af37] font-bold px-3 py-1 rounded-full text-[10px] border border-[#d4af37]/30">
                نقش: {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

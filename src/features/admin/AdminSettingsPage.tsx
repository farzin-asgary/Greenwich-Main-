import React from 'react';
import { AdminLayout } from '../../layouts/admin/AdminLayout';
import { Settings } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-xl">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            تنظیمات کلی پلتفرم گرینویچ
          </h1>
          <p className="text-xs text-emerald-300/70">پیکربندی زمان انقضای نشست‌های QR و تنظیمات پیامک SMS OTP</p>
        </div>

        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-emerald-200">زمان پیش‌فرض انقضای نشست روی میز (دقیقه)</label>
            <input
              type="number"
              defaultValue={90}
              className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 font-mono"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

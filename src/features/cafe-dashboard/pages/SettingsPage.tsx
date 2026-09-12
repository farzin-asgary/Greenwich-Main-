import React from 'react';
import { Settings, Shield, Bell } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
          تنظیمات سیستم
        </h1>
        <p className="text-xs text-emerald-300/70">
          تنظیمات عمومی پنل و پیکربندی‌های کلی
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4">
          <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#d4af37]" />
            اعلان‌ها (Notifications)
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#d4af37]" />
              <span className="text-sm text-emerald-200">اعلان ورود مهمان جدید (صدا)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#d4af37]" />
              <span className="text-sm text-emerald-200">اعلان دریافت کوپن جدید</span>
            </label>
          </div>
        </div>

        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4">
          <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#d4af37]" />
            امنیت و حریم خصوصی
          </h2>
          <p className="text-xs text-emerald-300/70 leading-relaxed">
            اطلاعات مشتریان (شامل شماره تماس‌ها) با استانداردهای امنیتی بالا در Greenwich Cloud نگهداری می‌شوند. شما تنها مجاز به استفاده از این اطلاعات برای کمپین‌های داخل سیستم هستید.
          </p>
        </div>
      </div>
    </div>
  );
};

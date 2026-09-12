import React from 'react';
import { Button } from '../../../shared/ui/Button';
import { Users, Plus, ShieldCheck } from 'lucide-react';

export const StaffPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            مدیریت کارکنان
          </h1>
          <p className="text-xs text-emerald-300/70">
            دسترسی‌ها و نقش‌های پرسنل کافه را مدیریت کنید.
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          افزودن پرسنل
        </Button>
      </div>

      <div className="greenwich-card rounded-2xl p-12 border border-emerald-900/60 text-center space-y-4">
        <Users className="w-12 h-12 text-emerald-800 mx-auto" />
        <h3 className="text-lg font-bold text-emerald-100">بزودی...</h3>
        <p className="text-sm text-emerald-300/70 max-w-md mx-auto">
          ماژول مدیریت کارکنان در حال توسعه است. به زودی می‌توانید سطوح دسترسی (ادمین، مدیر شعبه، صندوق‌دار و ...) را تعیین کنید.
        </p>
      </div>
    </div>
  );
};

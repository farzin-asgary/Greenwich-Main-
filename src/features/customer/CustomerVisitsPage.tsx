import React from 'react';
import { CustomerLayout } from '../../layouts/customer/CustomerLayout';
import { Clock, Coffee, MapPin } from 'lucide-react';

export const CustomerVisitsPage: React.FC = () => {
  const visits = [
    { id: '1', cafe: 'کافه نادری', branch: 'شعبه جمهوری', table: 'میز ۱۲', date: '۱۶ مرداد ۱۴۰۳', time: '۱۸:۳۰ تا ۱۹:۱۵', duration: '۴۵ دقیقه' },
    { id: '2', cafe: 'کافه نادری', branch: 'شعبه جمهوری', table: 'میز ۴', date: '۱۰ مرداد ۱۴۰۳', time: '۱۷:۰۰ تا ۱۸:۰۰', duration: '۶۰ دقیقه' },
    { id: '3', cafe: 'کافه نادری', branch: 'شعبه جمهوری', table: 'میز ۸', date: '۰۲ مرداد ۱۴۰۳', time: '۱۹:۱۵ تا ۲۰:۰۰', duration: '۴۵ دقیقه' },
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            مراجعات من به کافه‌ها
          </h1>
          <p className="text-xs text-emerald-300/70">
            تاریخچه نشست‌ها و زمان‌های ثبت‌شده پای میزها
          </p>
        </div>

        <div className="space-y-3">
          {visits?.map((v) => (
            <div key={v.id} className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-100">{v.cafe} — {v.branch}</h3>
                  <span className="text-[11px] text-emerald-400 block">{v.table} ● {v.date} ({v.time})</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="bg-[#0b1312] px-3 py-1 rounded-full text-emerald-300 border border-emerald-900">
                  {v.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

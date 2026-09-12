import React from 'react';
import { CustomerLayout } from '../../layouts/customer/CustomerLayout';
import { Bookmark, BookOpen, Music, Layers } from 'lucide-react';

export const CustomerSavedContentPage: React.FC = () => {
  const saved = [
    { id: '1', title: 'قهوه و زمان در تاریخ تهران', type: 'داستان متنی', author: 'مریم سهرابی', duration: '۵ دقیقه' },
    { id: '2', title: 'بی‌کلام در گام اصفهان (پیانو کافه)', type: 'صوتی', author: 'آرش رضایی', duration: '۱۲ دقیقه' },
    { id: '3', title: 'کارت‌های گفتگوی خاطره‌بازی', type: 'مجموعه کارت', author: 'استودیو گرینویچ', duration: '۱۵ کارت' },
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="border-b border-emerald-900/60 pb-3">
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            محتواهای ذخیره‌شده من
          </h1>
          <p className="text-xs text-emerald-300/70">
            داستان‌ها، پادکست‌ها و کارت‌های گفتگو که برای مطالعه بعدی پسندیده‌اید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {saved?.map((item) => (
            <div key={item.id} className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="bg-[#1b4332] text-[#d4af37] font-bold px-2 py-0.5 rounded-full text-[10px] border border-[#d4af37]/30">
                  {item.type}
                </span>
                <Bookmark className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
              </div>

              <h3 className="font-bold text-emerald-100 text-sm">{item.title}</h3>

              <div className="flex items-center justify-between text-[11px] text-emerald-400 border-t border-emerald-900/40 pt-2">
                <span>{item.author}</span>
                <span className="font-mono">{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

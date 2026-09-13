import React from 'react';
import { ArrowRight, Plus, Minus, Edit2 } from 'lucide-react';

interface DiffChange {
  type: 'added' | 'removed' | 'modified';
  description: string;
  oldContent?: string;
  newContent?: string;
}

const MOCK_DIFFS: DiffChange[] = [
  { type: 'modified', description: 'پاراگراف ۳ عوض شد', oldContent: 'فنجان دوم را آن روز نبردم.', newContent: 'فنجان دوم را آن روز نبردم. و بعد رفت.' },
  { type: 'added', description: '۲ پاراگراف اضافه شد', newContent: 'یک متن جدید در اینجا قرار دارد.' },
  { type: 'removed', description: 'تصویر حذف شد', oldContent: '![میز خالی کنار پنجره](miz.jpg)' }
];

export const BlockDiff: React.FC = () => {
  return (
    <div className="bg-[#050a09] p-6 max-w-3xl mx-auto space-y-6 text-emerald-50 dir-rtl font-['Vazirmatn']">
      <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif] mb-6 border-b border-emerald-900/30 pb-4">مقایسه‌ی نسخه‌ها</h2>
      
      {MOCK_DIFFS.map((diff, i) => (
        <div key={i} className="rounded-2xl border border-emerald-900/30 overflow-hidden bg-[#0b1312]">
          <div className="bg-emerald-950/40 p-3 border-b border-emerald-900/30 flex items-center gap-2">
            {diff.type === 'added' && <Plus className="w-4 h-4 text-green-500" />}
            {diff.type === 'removed' && <Minus className="w-4 h-4 text-red-500" />}
            {diff.type === 'modified' && <Edit2 className="w-4 h-4 text-blue-400" />}
            <span className="text-sm font-bold text-emerald-200">{diff.description}</span>
          </div>
          
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {diff.oldContent && (
              <div className="bg-red-950/10 border border-red-900/20 rounded-xl p-4">
                <div className="text-[10px] text-red-400 font-bold mb-2 uppercase tracking-wider">نسخه قبلی</div>
                <p className="text-sm text-red-100/80 leading-relaxed">{diff.oldContent}</p>
              </div>
            )}
            
            {diff.newContent && (
              <div className="bg-green-950/10 border border-green-900/20 rounded-xl p-4">
                <div className="text-[10px] text-green-400 font-bold mb-2 uppercase tracking-wider">نسخه جدید</div>
                <p className="text-sm text-green-100/80 leading-relaxed">{diff.newContent}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

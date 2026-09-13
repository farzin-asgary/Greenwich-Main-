import React from 'react';
import { History, GitMerge, CheckCircle, RotateCcw } from 'lucide-react';

interface VersionInfo {
  id: string;
  versionNumber: number;
  date: string;
  author: string;
  status: 'draft' | 'review' | 'published';
}

const MOCK_VERSIONS: VersionInfo[] = [
  { id: 'v4', versionNumber: 4, date: '۱۴۰۴/۰۶/۲۲ ساعت ۱۴:۳۰', author: 'مریم سهرابی', status: 'published' },
  { id: 'v3', versionNumber: 3, date: '۱۴۰۴/۰۶/۲۰ ساعت ۱۰:۱۵', author: 'ویراستار', status: 'review' },
  { id: 'v2', versionNumber: 2, date: '۱۴۰۴/۰۶/۱۸ ساعت ۱۸:۰۰', author: 'مریم سهرابی', status: 'draft' },
];

export const VersionList: React.FC = () => {
  const handleRestore = (v: number) => {
    if (confirm(`نسخه‌ی ${v} به‌عنوان نسخه‌ی جدید کپی می‌شود. نسخه‌های بین حذف نمی‌شوند.`)) {
      console.log('Restored', v);
    }
  };

  return (
    <div className="space-y-4">
      {MOCK_VERSIONS.map((v, i) => (
        <div key={v.id} className="p-3 bg-[#0b1312] border border-emerald-900/30 rounded-xl flex items-start gap-3 relative">
          {i !== MOCK_VERSIONS.length - 1 && (
            <div className="absolute top-10 bottom-[-16px] right-5 w-px bg-emerald-900/30"></div>
          )}
          
          <div className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-900/50 z-10">
            {v.status === 'published' ? <CheckCircle className="w-3 h-3 text-[#d4af37]" /> : <History className="w-3 h-3 text-emerald-500" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-xs font-bold text-emerald-100">نسخه {v.versionNumber}</h4>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                v.status === 'published' ? 'bg-[#d4af37]/20 text-[#d4af37]' :
                v.status === 'review' ? 'bg-blue-900/30 text-blue-400' : 'bg-emerald-900/30 text-emerald-500'
              }`}>
                {v.status === 'published' ? 'منتشرشده' : v.status === 'review' ? 'در حال بررسی' : 'پیش‌نویس'}
              </span>
            </div>
            
            <p className="text-[10px] text-emerald-500/70 font-mono mb-1">{v.date}</p>
            <p className="text-[10px] text-emerald-400 mb-3">{v.author}</p>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2 py-1 bg-emerald-900/20 text-emerald-300 hover:bg-emerald-900/40 rounded text-[10px] font-bold transition-colors">
                <GitMerge className="w-3 h-3" />
                مقایسه
              </button>
              {v.status !== 'published' && (
                <button 
                  onClick={() => handleRestore(v.versionNumber)}
                  className="flex items-center gap-1.5 px-2 py-1 border border-emerald-900/30 text-emerald-400 hover:text-emerald-200 hover:bg-emerald-900/20 rounded text-[10px] font-bold transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  بازگشت
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

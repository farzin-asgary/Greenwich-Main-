import React, { useState } from 'react';
import { QrCode, RefreshCw, ExternalLink, Printer } from 'lucide-react';

export const TablesView: React.FC = () => {
  const [tables, setTables] = useState([
    { id: '1', number: '۱۲', name: 'میز ۱۲ (کنار پنجره)', qrToken: 'demo-table-12', status: 'active', activeVisitsToday: 5 },
    { id: '2', number: '۵', name: 'میز ۵ (تراس)', qrToken: 'demo-table-05', status: 'active', activeVisitsToday: 3 },
    { id: '3', number: '۸', name: 'میز ۸ (سالن اصلی)', qrToken: 'demo-table-08', status: 'active', activeVisitsToday: 2 }
  ]);

  const rotateToken = (id: string) => {
    const newToken = `table-${Math.random().toString(36).substring(2, 7)}`;
    setTables(prev =>
      prev.map(t => (t.id === id ? { ...t, qrToken: newToken } : t))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#d4af37]" />
            میزها و کدهای QR کافه نادری
          </h2>
          <p className="text-xs text-emerald-300/70">
            مدیریت، چاپ و بازسازی توکن‌های امنیتی QR روی میزهای فیزیکی.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tables?.map((t) => (
          <div
            key={t.id}
            className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-emerald-900/40 pb-3">
              <span className="font-bold text-sm text-[#d4af37]">میز {t.number}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                {t.status === 'active' ? 'QR فعال' : 'غیرفعال'}
              </span>
            </div>

            <p className="text-xs text-emerald-200 font-medium">{t.name}</p>

            <div className="bg-[#0b1312] p-3 rounded-xl border border-dashed border-emerald-800 space-y-2 text-center">
              <span className="text-[10px] text-emerald-500 block">لینک اسکن QR:</span>
              <code className="text-xs font-mono text-[#d4af37] block truncate dir-ltr">
                /g/{t.qrToken}
              </code>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <a
                href={`/g/${t.qrToken}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-300 hover:text-[#d4af37] flex items-center gap-1 font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>تست صفحه landing</span>
              </a>

              <button
                onClick={() => rotateToken(t.id)}
                className="p-1.5 rounded-lg bg-[#121e1c] border border-emerald-800 text-amber-400 hover:text-amber-200"
                title="تغییر توکن QR برای امنیت"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Button } from '../../../shared/ui/Button';

interface Props {
  onGenerate: (from: number, to: number) => void;
  onCancel: () => void;
}

export const BulkQrGenerator: React.FC<Props> = ({ onGenerate, onCancel }) => {
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from <= to && from > 0) {
      onGenerate(from, to);
    }
  };

  return (
    <div className="greenwich-card rounded-2xl p-5 border border-[#d4af37]/40 space-y-4 bg-[#121e1c]">
      <div className="space-y-1">
        <h3 className="font-bold text-emerald-100 text-sm">ساخت سریع چند میز و QR</h3>
        <p className="text-xs text-emerald-400">میزها و توکن‌های امنیتی آن‌ها بلافاصله ساخته می‌شوند.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="space-y-2 flex-1">
          <label className="text-xs text-emerald-300">از میز شماره</label>
          <input 
            type="number" 
            min="1" 
            value={from} 
            onChange={(e) => setFrom(Number(e.target.value))}
            className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100"
          />
        </div>
        <div className="space-y-2 flex-1">
          <label className="text-xs text-emerald-300">تا میز شماره</label>
          <input 
            type="number" 
            min="1" 
            value={to} 
            onChange={(e) => setTo(Number(e.target.value))}
            className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100"
          />
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            انصراف
          </Button>
          <Button type="submit" variant="primary">
            ساخت میزها
          </Button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { QrCode, CheckCircle2, AlertCircle, KeyRound, ArrowLeft } from 'lucide-react';

export const CouponRedeemer: React.FC = () => {
  const queryClient = useQueryClient();

  const [code, setCode] = useState<string>('GREENWICH-20-8912');
  const [pin, setPin] = useState<string>('1234');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const mutation = useMutation({
    mutationFn: () => api.redeemCoupon(code, pin),
    onSuccess: (res) => {
      setResult({ success: true, message: res.message });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (err: any) => {
      setResult({ success: false, message: err.message || 'خطا در ثبت کوپن' });
    }
  });

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    if (!code) return;
    mutation.mutate();
  };

  return (
    <div className="greenwich-card rounded-2xl p-5 border border-[#d4af37]/40 space-y-4 greenwich-gold-glow bg-gradient-to-br from-[#121e1c] to-[#1b4332]/40">
      <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
        <h4 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
          <QrCode className="w-4 h-4 text-[#d4af37]" />
          بازخرید و اعمال کوپن تخفیف (ویژه پرسنل صندوق)
        </h4>
        <span className="text-[10px] text-emerald-300 bg-[#0b1312] px-2 py-0.5 rounded-full font-mono border border-emerald-900">
          پین پرسنل: 1234
        </span>
      </div>

      <form onSubmit={handleRedeem} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-emerald-200 mb-1">کد کوپن مشتری</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="مثال: GREENWICH-20-8912"
            className="w-full px-3 py-2 rounded-xl bg-[#0b1312] border border-emerald-800 text-xs font-mono font-bold text-[#d4af37] focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-emerald-200 mb-1">کد پین پرسنل</label>
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="1234"
            className="w-full px-3 py-2 rounded-xl bg-[#0b1312] border border-emerald-800 text-xs font-mono font-bold text-center text-emerald-100 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-emerald-50 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md border border-[#d4af37]/40"
          >
            <span>{mutation.isPending ? 'در حال ثبت...' : 'ثبت بازخرید در سیستم'}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {result && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            result.success
              ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-200'
              : 'bg-amber-950/90 border border-amber-500 text-amber-200'
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
};

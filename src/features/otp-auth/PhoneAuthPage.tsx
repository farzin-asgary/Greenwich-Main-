import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Smartphone, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

export const PhoneAuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const qrToken = searchParams.get('qr') || 'demo-table-12';
  const navigate = useNavigate();

  const [phone, setPhone] = useState<string>('09123456789');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (p: string) => api.requestOTP(p, qrToken),
    onSuccess: () => {
      navigate(`/auth/verify?phone=${encodeURIComponent(phone)}&qr=${qrToken}`);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || 'خطا در ارسال کد تایید');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!phone || !phone.match(/^09\d{9}$/)) {
      setErrorMsg('لطفاً یک شماره همراه معتبر ۱۱ رقمی وارد کنید (مانند 09123456789)');
      return;
    }
    mutation.mutate(phone);
  };

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col justify-between max-w-md mx-auto p-6 relative">
      <header className="pt-6 text-center">
        <GreenwichLogo size="md" />
      </header>

      <main className="my-auto">
        <div className="greenwich-card rounded-3xl p-6 border border-[#2d6a4f]/40 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1b4332] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-emerald-100">ورود با شماره همراه</h3>
            <p className="text-xs text-emerald-300/70">
              جهت فعال‌سازی نشست اختصاصی روی میز و دریافت کد تخفیف، شماره همراه خود را وارد کنید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-2">
                شماره همراه شما
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09123456789"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl bg-[#0b1312] border border-emerald-800 text-center font-mono text-base font-bold text-[#d4af37] focus:outline-none focus:border-[#d4af37] transition-colors"
                autoFocus
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending}
              variant="primary"
              className="w-full"
              rightIcon={<ArrowLeft className="w-4 h-4 ml-1" />}
            >
              {mutation.isPending ? 'در حال ارسال کد...' : 'دریافت کد تایید'}
            </Button>
          </form>

          <div className="bg-[#121e1c] p-3 rounded-xl border border-emerald-900/50 text-[11px] text-emerald-300/70 text-center">
            💡 راهنما: جهت تست سریع می‌توانید از همین شماره 09123456789 استفاده کنید.
          </div>
        </div>
      </main>

      <footer className="text-center text-[10px] text-emerald-500/70 pb-4">
        سبک زندگی و مدیریت زمان در کافه‌ها با گرینویچ کلاب
      </footer>
    </div>
  );
};

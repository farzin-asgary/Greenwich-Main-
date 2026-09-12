import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { KeyRound, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

export const OTPVerifyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone') || '09123456789';
  const qrToken = searchParams.get('qr') || 'demo-table-12';
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string>('12345');
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const mutation = useMutation({
    mutationFn: (code: string) => api.verifyOTP(phone, code, qrToken),
    onSuccess: () => {
      // Proceed to Privacy Consent page
      navigate('/auth/consent');
    },
    onError: (err: any) => {
      setErrorMsg(err.message || 'کد تایید اشتباه است.');
    }
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (otp.length < 5) {
      setErrorMsg('لطفاً کد ۵ رقمی ارسال شده را کامل وارد کنید.');
      return;
    }
    mutation.mutate(otp);
  };

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col justify-between max-w-md mx-auto p-6 relative">
      <header className="pt-6 text-center">
        <GreenwichLogo size="md" />
      </header>

      <main className="my-auto">
        <div className="greenwich-card rounded-3xl p-6 border border-[#2d6a4f]/40 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1b4332] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-emerald-100">تایید شماره همراه</h3>
            <p className="text-xs text-emerald-300/70">
              کد ۵ رقمی ارسال شده به شماره <span className="font-mono text-[#d4af37] font-bold">{phone}</span> را وارد کنید.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            {/* 5 digit OTP inputs visual or central input */}
            <div className="flex justify-center">
              <input
                type="text"
                maxLength={5}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-48 px-4 py-3 rounded-2xl bg-[#0b1312] border-2 border-[#2d6a4f] text-center font-mono text-2xl font-bold tracking-[0.4em] text-[#d4af37] focus:outline-none focus:border-[#d4af37]"
                autoFocus
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-amber-950/80 border border-amber-600/50 rounded-xl text-amber-200 text-xs flex items-center gap-2 justify-center">
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
              {mutation.isPending ? 'در حال بررسی...' : 'تایید و ادامه'}
            </Button>
          </form>

          {/* Resend Timer */}
          <div className="text-xs text-emerald-300/60 pt-2 flex items-center justify-center gap-2">
            {timerSeconds > 0 ? (
              <span>ارسال مجدد کد تا {timerSeconds} ثانیه دیگر</span>
            ) : (
              <Button
                onClick={() => setTimerSeconds(45)}
                variant="link"
                className="text-[#d4af37]"
                leftIcon={<RefreshCw className="w-3 h-3" />}
              >
                ارسال مجدد کد پیامکی
              </Button>
            )}
          </div>

          <div className="bg-[#121e1c] p-2.5 rounded-xl border border-emerald-900/50 text-[11px] text-[#d4af37]">
            🔑 کد آزمایشی: <b>12345</b>
          </div>
        </div>
      </main>

      <footer className="text-center text-[10px] text-emerald-500/70 pb-4">
        گرینویچ کلاب | امنیت و حریم خصوصی محفوظ است
      </footer>
    </div>
  );
};

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { LoadingState } from '../../shared/ui/LoadingState';
import { ErrorState } from '../../shared/ui/ErrorState';
import { Button } from '../../shared/ui/Button';
import { Compass, Clock, ShieldCheck, ArrowLeft, QrCode } from 'lucide-react';

export const QRLandingPage: React.FC = () => {
  const { qrToken = 'demo-table-12' } = useParams<{ qrToken: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['qrEntry', qrToken],
    queryFn: () => api.getQREntry(qrToken)
  });

  if (isLoading) return <LoadingState message="در حال اعتبارسنجی کد QR میز..." />;

  if (isError || !data?.data || data.data.status === 'revoked') {
    return (
      <div className="min-h-screen bg-[#0b1312] p-6 flex flex-col items-center justify-center text-center">
        <GreenwichLogo size="lg" />
        <ErrorState
          title="کد QR نامعتبر است"
          message="این کد میز غیرفعال شده یا منقضی شده است. لطفاً کد جدید روی میز را اسکن کنید یا از پرسنل کافه راهنمایی بخواهید."
          onRetry={() => navigate('/g/demo-table-12')}
        />
        <Button
          onClick={() => navigate('/g/demo-table-12')}
          variant="primary"
          size="md"
          className="mt-4"
        >
          ورود به نسخه آزمایشی (میز ۱۲ کافه نادری)
        </Button>
      </div>
    );
  }

  const qr = data.data;

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col justify-between max-w-md mx-auto relative overflow-hidden">
      {/* Background Editorial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1b4332]/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="p-6 text-center z-10 pt-8">
        <GreenwichLogo size="md" />
      </header>

      {/* Hero Card */}
      <main className="px-6 z-10 flex-1 flex flex-col justify-center">
        <div className="greenwich-card rounded-3xl p-6 border border-[#2d6a4f]/40 space-y-6 text-center greenwich-gold-glow">
          {/* Table Image Badge */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-emerald-800/40 shadow-inner">
            <img
              src={qr.coverImage}
              alt={qr.branchName}
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1312] via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
              <span className="bg-[#0b1312]/90 border border-emerald-700/50 text-[#d4af37] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                📍 {qr.branchName}
              </span>
              <span className="bg-[#1b4332]/90 border border-[#d4af37]/40 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full font-mono">
                میز {qr.tableNumber}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              زمان با ارزش است.
            </h2>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xs mx-auto">
              مطالعه داستان‌های کوتاه، پادکست، موسیقی، تست‌های شخصیت و پیشنهادهای اختصاصی ویژه حضور شما در کافه.
            </p>
          </div>

          {/* Features pills */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-300/80">
            <div className="bg-[#121e1c] p-2 rounded-xl border border-emerald-900/40 flex items-center gap-1.5 justify-center">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{qr.sessionDurationMinutes} دقیقه نشست فعال</span>
            </div>
            <div className="bg-[#121e1c] p-2 rounded-xl border border-emerald-900/40 flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>بدون نیاز به نصب اپ</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <Button
            onClick={() => navigate(`/auth/phone?qr=${qr.qrToken}`)}
            variant="primary"
            className="w-full shadow-lg greenwich-emerald-glow"
            leftIcon={<QrCode className="w-4 h-4 text-[#d4af37]" />}
            rightIcon={<ArrowLeft className="w-4 h-4 ml-1" />}
          >
            ورود و شروع نشست
          </Button>
        </div>
      </main>

      {/* Footer info */}
      <footer className="p-6 text-center text-[10px] text-emerald-400/60 z-10">
        <p>با ورود به برنامه، قوانین حریم خصوصی و تجربه گرینویچ کلاب را می‌پذیرید.</p>
        <div className="mt-2 flex justify-center gap-4 text-emerald-500/80">
          <Button variant="link" onClick={() => navigate('/dashboard/overview')} className="text-[10px]">
            ورود به پنل مدیریتی کافه داران
          </Button>
        </div>
      </footer>
    </div>
  );
};

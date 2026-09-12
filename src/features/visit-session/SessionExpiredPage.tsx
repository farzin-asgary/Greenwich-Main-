import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Clock, QrCode, ArrowLeft } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

export const SessionExpiredPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col justify-between max-w-md mx-auto p-6 text-center">
      <header className="pt-6">
        <GreenwichLogo size="md" />
      </header>

      <main className="my-auto space-y-6">
        <div className="greenwich-card rounded-3xl p-8 border border-amber-800/40 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-600/40 text-amber-400 flex items-center justify-center mx-auto text-2xl">
            <Clock className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            زمان نشست شما به پایان رسید
          </h3>

          <p className="text-xs text-emerald-300/80 leading-relaxed max-w-xs mx-auto">
            امیدواریم از لحظات حضور در کافه نادری و محتواهای گرینویچ کلاب لذت برده باشید.
          </p>

          <div className="bg-[#0b1312] p-4 rounded-2xl border border-emerald-900 text-xs text-emerald-300/70 space-y-2">
            <p>در صورت تمایل به تمدید نشست یا سفارش مجدد، می‌توانید با پرسنل کافه هماهنگ کنید یا کد QR میز را مجدداً اسکن نمایید.</p>
          </div>

          <Button
            onClick={() => navigate('/g/demo-table-12')}
            variant="primary"
            className="w-full"
            leftIcon={<QrCode className="w-4 h-4 text-[#d4af37]" />}
            rightIcon={<ArrowLeft className="w-4 h-4" />}
          >
            اسکن مجدد میز یا ورود آزمایشی
          </Button>
        </div>
      </main>

      <footer className="text-xs text-emerald-500/70 pb-4">
        گرینویچ کلاب | مدیریت هوشمند زمان و تجربه مشتری در کافه
      </footer>
    </div>
  );
};

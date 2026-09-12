import React, { useState, useEffect } from 'react';
import { Clock, MapPin, AlertCircle, Compass } from 'lucide-react';
import { VisitSession } from '../types';

interface SessionTimerHeaderProps {
  session: VisitSession | null;
  onSessionExpired?: () => void;
}

export const SessionTimerHeader: React.FC<SessionTimerHeaderProps> = ({ session, onSessionExpired }) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);

  useEffect(() => {
    if (!session || session.status !== 'active') return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const exp = new Date(session.expiresAt).getTime();
      const diff = Math.max(0, Math.floor((exp - now) / 1000));
      setTimeLeftSeconds(diff);

      if (diff === 0 && onSessionExpired) {
        onSessionExpired();
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [session, onSessionExpired]);

  const formatHMS = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeftSeconds > 0 && timeLeftSeconds < 15 * 60;

  return (
    <header className="sticky top-0 z-30 bg-[#0b1312]/90 border-b border-[#2d6a4f]/30 backdrop-blur-md px-4 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Table & Venue badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#121e1c] border border-emerald-800/40 flex items-center justify-center text-[#d4af37]">
            <Compass className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-100 flex items-center gap-1">
              {session?.branchName || 'کافه نادری'}
              <span className="text-[10px] bg-[#1b4332] text-[#d4af37] px-1.5 py-0.2 rounded-full font-mono">
                {session?.tableNumber ? `میز ${session.tableNumber}` : 'میز ۱۲'}
              </span>
            </span>
            <span className="text-[9px] text-emerald-400/70">نشست زمان‌دار فعال</span>
          </div>
        </div>

        {/* Meridian Timer */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-colors ${
          isLowTime
            ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 animate-pulse'
            : 'bg-[#121e1c] border-emerald-800/40 text-[#d4af37]'
        }`}>
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{formatHMS(timeLeftSeconds)}</span>
        </div>
      </div>

      {isLowTime && (
        <div className="max-w-md mx-auto mt-2 bg-amber-950/80 border border-amber-600/40 text-amber-200 text-[10px] px-3 py-1 rounded-lg flex items-center justify-between">
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            کمتر از ۱۵ دقیقه از زمان نشست شما باقی مانده است.
          </span>
        </div>
      )}
    </header>
  );
};

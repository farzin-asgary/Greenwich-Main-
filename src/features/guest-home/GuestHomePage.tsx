import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { SessionTimerHeader } from '../../shared/ui/SessionTimerHeader';
import { GuestBottomNav } from '../../shared/ui/GuestBottomNav';
import { LoadingState } from '../../shared/ui/LoadingState';
import { useAudio } from '../../shared/ui/AudioPlayer';
import {
  Clock,
  Sparkles,
  BookOpen,
  Headphones,
  Heart,
  Tag,
  MessageSquare,
  Play,
  ChevronLeft,
  Coffee,
  Brain,
  Smile,
  Zap
} from 'lucide-react';

export const GuestHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { playTrack } = useAudio();

  const [selectedTime, setSelectedTime] = useState<number>(120); // minutes
  const [selectedMood, setSelectedMood] = useState<string>('all');

  const { data: sessionData } = useQuery({
    queryKey: ['guestSession'],
    queryFn: () => api.getGuestSession()
  });

  const { data: contentData, isLoading } = useQuery({
    queryKey: ['contentList', selectedMood],
    queryFn: () => api.getContentList('all', selectedMood)
  });

  const { data: offersData } = useQuery({
    queryKey: ['offers'],
    queryFn: () => api.getOffers()
  });

  const session = sessionData?.data || null;
  const contentList = contentData?.data || [];
  const activeOffer = offersData?.data?.[0];

  const moods = [
    { id: 'all', label: 'همه', icon: Sparkles },
    { id: 'relaxation', label: 'آرامش', icon: Coffee },
    { id: 'focus', label: 'تمرکز', icon: Clock },
    { id: 'inspiration', label: 'انگیزه', icon: Zap },
    { id: 'romantic', label: 'عاشقانه', icon: Heart },
    { id: 'thinking', label: 'تفکر', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 pb-24 max-w-md mx-auto relative">
      <SessionTimerHeader
        session={session}
        onSessionExpired={() => navigate('/app/session-expired')}
      />

      <main className="px-4 py-4 space-y-6">
        {/* Welcome Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden p-6 border border-[#2d6a4f]/40 greenwich-card greenwich-emerald-glow">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-[#1b4332]/20 to-[#0b1312] pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] bg-[#0b1312]/80 px-2.5 py-1 rounded-full border border-emerald-800/40">
                GREENWICH EXPERIENCE
              </span>
              <span className="text-[11px] text-emerald-300/80">خوش آمدید ✨</span>
            </div>

            <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif] leading-tight">
              به گرینویچ کلاب خوش آمدید
            </h2>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              زمانتان را هوشمندانه سپری کنید. داستان بخوانید، به موسیقی گوش دهید و از پیشنهادهای ویژه لذت ببرید.
            </p>

            {/* Time budget selector */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-[#d4af37] mb-2">
                چقدر زمان دارید؟
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[
                  { m: 120, label: '۲ ساعت' },
                  { m: 60, label: '۶۰ دقیقه' },
                  { m: 30, label: '۳۰ دقیقه' },
                  { m: 15, label: '۱۵ دقیقه' },
                ].map((t) => (
                  <button
                    key={t.m}
                    onClick={() => setSelectedTime(t.m)}
                    className={`py-2 rounded-xl text-[11px] font-bold transition-all border ${
                      selectedTime === t.m
                        ? 'bg-[#d4af37] text-emerald-950 border-[#d4af37] shadow-md'
                        : 'bg-[#121e1c] text-emerald-200/80 border-emerald-900 hover:border-emerald-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mood Selector Pills */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-emerald-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            بر اساس حال و هوای شما
          </h3>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {moods?.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedMood === m.id
                      ? 'bg-[#2d6a4f] text-[#fbf9f5] border-[#d4af37] shadow-md'
                      : 'bg-[#121e1c] text-emerald-300/80 border-emerald-900/60 hover:border-emerald-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Story Section: "مطالعه کنید" */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              مطالعه کنید
            </h3>
            <button
              onClick={() => navigate('/app/discover')}
              className="text-xs text-[#d4af37] hover:underline flex items-center"
            >
              مشاهده همه
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {isLoading ? (
            <LoadingState message="در حال دریافت لیست داستان‌ها..." />
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {contentList
                .filter((c) => c.type === 'article')
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/app/publications/${item.slug}`)}
                    className="w-48 shrink-0 greenwich-card rounded-2xl overflow-hidden border border-emerald-900/40 cursor-pointer greenwich-card-hover group"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 bg-[#0b1312]/80 text-[#d4af37] text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-800">
                        {item.readTimeMinutes} دقیقه
                      </span>
                    </div>
                    <div className="p-3 space-y-1">
                      <h4 className="text-xs font-bold text-emerald-100 group-hover:text-[#d4af37] transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-emerald-300/70 truncate">{item.author}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Audio Section: "گوش کنید" */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#d4af37]" />
              گوش کنید (پادکست و موسیقی)
            </h3>
            <button
              onClick={() => navigate('/app/audio')}
              className="text-xs text-[#d4af37] hover:underline flex items-center"
            >
              مشاهده همه
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {contentList
              .filter((c) => c.type === 'audio' || c.type === 'podcast')
              .map((item) => (
                <div
                  key={item.id}
                  className="w-48 shrink-0 greenwich-card rounded-2xl overflow-hidden border border-emerald-900/40 p-3 space-y-2 relative group"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => playTrack(item)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center text-[#d4af37] opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1b4332] border border-[#d4af37] flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </button>
                    <span className="absolute bottom-2 left-2 bg-[#0b1312]/90 text-emerald-300 text-[9px] font-mono px-2 py-0.5 rounded-full">
                      {item.audioDurationMinutes} دقیقه
                    </span>
                  </div>
                  <div onClick={() => navigate(`/app/publications/${item.slug}`)} className="cursor-pointer">
                    <h4 className="text-xs font-bold text-emerald-100 truncate">{item.title}</h4>
                    <p className="text-[10px] text-emerald-300/70 truncate">{item.author}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Interactive Grid: Couple Deck & Cafe Offer */}
        <section className="grid grid-cols-2 gap-3">
          {/* Couple / Together Card */}
          <div
            onClick={() => navigate('/app/together')}
            className="greenwich-card rounded-2xl p-4 border border-emerald-800/40 cursor-pointer greenwich-card-hover flex flex-col justify-between h-36 relative overflow-hidden bg-gradient-to-br from-[#121e1c] to-[#1b4332]"
          >
            <div className="space-y-1">
              <span className="w-8 h-8 rounded-xl bg-pink-950/60 border border-pink-700/40 text-pink-400 flex items-center justify-center mb-2">
                <Heart className="w-4 h-4 fill-current" />
              </span>
              <h4 className="text-xs font-bold text-emerald-100">بخش دونفره</h4>
              <p className="text-[10px] text-emerald-300/70 leading-snug">
                سوالات صمیمی برای صحبت کردن پای میز کافه
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#d4af37] flex items-center">
              شروع گفتگو 💬
            </span>
          </div>

          {/* Active Cafe Offer Card */}
          {activeOffer && (
            <div
              onClick={() => navigate('/app/offers')}
              className="greenwich-card rounded-2xl p-4 border border-[#d4af37]/40 cursor-pointer greenwich-card-hover flex flex-col justify-between h-36 relative overflow-hidden bg-gradient-to-br from-[#121e1c] to-amber-950/30"
            >
              <div className="space-y-1">
                <span className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-600/40 text-[#d4af37] flex items-center justify-center mb-2 font-bold text-xs">
                  <Tag className="w-4 h-4" />
                </span>
                <h4 className="text-xs font-bold text-emerald-100">{activeOffer.title}</h4>
                <p className="text-[10px] text-emerald-300/70 line-clamp-2">
                  {activeOffer.description}
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#d4af37] bg-[#1b4332] px-2 py-0.5 rounded-full w-max border border-[#d4af37]/30">
                دریافت کد تخفیف 🎁
              </span>
            </div>
          )}
        </section>

        {/* Feedback Teaser */}
        <section
          onClick={() => navigate('/app/feedback')}
          className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 cursor-pointer hover:border-emerald-700 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-100">ثبت نظر و نظر سنجی کافه</h4>
              <p className="text-[10px] text-emerald-300/70">
                تجربه شما برای مدیریت کافه نادری ارزشمند است
              </p>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-emerald-400" />
        </section>
      </main>

      <GuestBottomNav />
    </div>
  );
};

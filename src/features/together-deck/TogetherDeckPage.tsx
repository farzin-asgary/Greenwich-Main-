import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { SessionTimerHeader } from '../../shared/ui/SessionTimerHeader';
import { GuestBottomNav } from '../../shared/ui/GuestBottomNav';
import { LoadingState } from '../../shared/ui/LoadingState';
import { Heart, RefreshCw, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

export const TogetherDeckPage: React.FC = () => {
  const [cardIndex, setCardIndex] = useState<number>(0);

  const { data: sessionData } = useQuery({
    queryKey: ['guestSession'],
    queryFn: () => api.getGuestSession()
  });

  const { data: deckData, isLoading } = useQuery({
    queryKey: ['togetherDeck'],
    queryFn: () => api.getTogetherDeck()
  });

  if (isLoading) return <LoadingState message="در حال دریافت کارت‌های سوال دونفره..." />;

  const deck = deckData?.data;
  const cards = deck?.cards || [];
  const currentCard = cards[cardIndex % (cards.length || 1)];

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 pb-28 max-w-md mx-auto relative">
      <SessionTimerHeader session={sessionData?.data || null} />

      <main className="px-5 py-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-pink-700/40 text-pink-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>بخش دونفره و گفتگو</span>
          </div>

          <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            گفتگوی عمیق پای میز کافه
          </h2>
          <p className="text-xs text-emerald-300/70">
            یک کارت انتخاب کنید، سوال را با هم بخوانید و دقایقی صمیمانه گفتگو کنید.
          </p>
        </div>

        {/* Interactive Question Card */}
        {currentCard && (
          <div className="greenwich-card rounded-3xl p-8 border-2 border-[#d4af37]/40 min-h-[280px] flex flex-col justify-between text-center relative greenwich-gold-glow bg-gradient-to-b from-[#121e1c] to-[#1b4332]/40">
            <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono">
              <span>کارت شماره {cardIndex + 1} از {cards.length}</span>
              <span className="bg-[#1b4332] text-[#d4af37] px-2 py-0.5 rounded-full font-bold">
                {currentCard.category === 'romantic' ? 'عاشقانه 🤍' : currentCard.category === 'deep_talk' ? 'گفتگوی عمیق 🧠' : 'خاطره ☕'}
              </span>
            </div>

            <div className="my-auto space-y-4">
              <MessageCircle className="w-8 h-8 text-[#d4af37] mx-auto opacity-80" />
              <p className="text-lg font-bold text-emerald-100 leading-relaxed font-['Vazirmatn',sans-serif]">
                « {currentCard.question} »
              </p>
            </div>

            <Button
              onClick={() => {
                setCardIndex(prev => prev + 1);
                api.recordEvent('together_card_viewed', 'question', currentCard.id);
              }}
              variant="primary"
              className="w-full border border-[#d4af37]/30"
              leftIcon={<RefreshCw className="w-4 h-4 text-[#d4af37]" />}
            >
              کارت بعدی
            </Button>
          </div>
        )}

        <div className="bg-[#121e1c] rounded-2xl p-4 border border-emerald-900/50 text-center space-y-2">
          <Sparkles className="w-5 h-5 text-[#d4af37] mx-auto" />
          <h4 className="text-xs font-bold text-emerald-100">ارزش زمان حضور در کافه</h4>
          <p className="text-[11px] text-emerald-300/70 leading-relaxed">
            هدف گرینویچ کلاب، ایجاد ارتباط حقیقی و ماندگار بین شما و همراهان‌تان در فضای فیزیکی کافه نادری است.
          </p>
        </div>
      </main>

      <GuestBottomNav />
    </div>
  );
};

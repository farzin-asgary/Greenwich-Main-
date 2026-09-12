import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { SessionTimerHeader } from '../../shared/ui/SessionTimerHeader';
import { GuestBottomNav } from '../../shared/ui/GuestBottomNav';
import { LoadingState } from '../../shared/ui/LoadingState';
import { EmptyState } from '../../shared/ui/EmptyState';
import { Offer, Coupon } from '../../shared/types';
import { Tag, CheckCircle2, Clock, ShieldAlert, QrCode, Gift, AlertCircle, Copy } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const { data: sessionData } = useQuery({
    queryKey: ['guestSession'],
    queryFn: () => api.getGuestSession()
  });

  const { data: offersData, isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: () => api.getOffers()
  });

  const claimMutation = useMutation({
    mutationFn: (offerId: string) => api.claimOffer(offerId),
    onSuccess: (res) => {
      setActiveCoupon(res.data);
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    }
  });

  if (isLoading) return <LoadingState message="در حال دریافت پیشنهادات ویژه کافه..." />;

  const offers = offersData?.data || [];

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 pb-28 max-w-md mx-auto relative">
      <SessionTimerHeader session={sessionData?.data || null} />

      <main className="px-5 py-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold">
            <Gift className="w-3.5 h-3.5" />
            <span>پیشنهادهای اختصاصی کافه نادری</span>
          </div>

          <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            تخفیف‌ها و هدیه‌های نشست فعال
          </h2>
          <p className="text-xs text-emerald-300/70">
            با اسکن QR میز و فعال بودن نشست، امکان دریافت کدهای تخفیف اختصاصی را خواهید داشت.
          </p>
        </div>

        {/* Claimed Coupon Visual Modal/Box if Active */}
        {activeCoupon && (
          <div className="greenwich-card rounded-3xl p-6 border-2 border-[#d4af37] space-y-4 greenwich-gold-glow bg-gradient-to-b from-amber-950/40 to-[#121e1c]">
            <div className="flex items-center justify-between border-b border-amber-900/50 pb-3">
              <span className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                کوپن تخفیف با موفقیت دریافت شد
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeCoupon.status === 'claimed'
                  ? 'bg-amber-900/80 text-amber-200 border border-amber-500/40'
                  : 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/40'
              }`}>
                {activeCoupon.status === 'claimed' ? 'در انتظار بازخرید در صندوق' : 'بازخرید شده'}
              </span>
            </div>

            <div className="text-center space-y-2 py-2">
              <span className="text-xs text-emerald-300">{activeCoupon.offerTitle}</span>
              <div className="bg-[#0b1312] p-4 rounded-2xl border border-dashed border-[#d4af37] flex flex-col items-center justify-center gap-2">
                <span className="font-mono text-xl font-bold tracking-widest text-[#d4af37]">
                  {activeCoupon.code}
                </span>
                {/* Barcode visual simulation */}
                <div className="w-48 h-8 bg-white p-1 rounded flex justify-between items-center overflow-hidden opacity-90">
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-2 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-3 h-full bg-black"></div>
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-2 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-2 h-full bg-black"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-emerald-300/80 pt-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeCoupon.code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-[#d4af37] font-bold hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'کپی شد!' : 'کپی کد کوپن'}</span>
              </button>
              <span>اعتبار تا پایان نشست</span>
            </div>

            <div className="bg-[#0b1312]/80 p-3 rounded-xl border border-amber-900/40 text-[10px] text-amber-200/90 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                لطفاً این کد یا صفحه را هنگام سفارش یا تسویه حساب به پرسنل کافه نشان دهید.
              </span>
            </div>
          </div>
        )}

        {/* Offer Cards List */}
        <div className="space-y-4">
          {offers.length === 0 ? (
            <EmptyState title="پیشنهادی یافت نشد" description="در حال حاضر پیشنهاد فعال دیگری وجود ندارد." />
          ) : (
            offers?.map((offer) => (
              <div
                key={offer.id}
                className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4 greenwich-card-hover relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-[#1b4332] text-[#d4af37] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                      {offer.valueDisplay}
                    </span>
                    <h3 className="text-sm font-bold text-emerald-100 mt-2">{offer.title}</h3>
                  </div>
                  <Tag className="w-5 h-5 text-[#d4af37]" />
                </div>

                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  {offer.description}
                </p>

                <div className="text-[10px] text-emerald-400/60 bg-[#0b1312] p-2.5 rounded-xl border border-emerald-900/40">
                  <b>شرایط:</b> {offer.terms}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-900/40 text-xs">
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    استفاده شده: {offer.claimedCount} از {offer.maxRedemptions || 'نامحدود'}
                  </span>

                  <button
                    onClick={() => claimMutation.mutate(offer.id)}
                    disabled={claimMutation.isPending}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs hover:brightness-110 transition-all shadow-md border border-[#d4af37]/30"
                  >
                    {claimMutation.isPending ? 'در حال دریافت...' : 'دریافت کوپن'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <GuestBottomNav />
    </div>
  );
};

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { LoadingState } from '../../shared/ui/LoadingState';
import { Tag, Plus, Check, X, Gift } from 'lucide-react';

export const OffersView: React.FC = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);

  // New Offer Form State
  const [title, setTitle] = useState<string>('تخفیف ۱۰٪ ویژه قهوه دمی');
  const [description, setDescription] = useState<string>('۱۰ درصد تخفیف برای سفارش قهوه‌های دمی کمکس و وی ۶۰.');
  const [valueDisplay, setValueDisplay] = useState<string>('۱۰٪ تخفیف');
  const [terms, setTerms] = useState<string>('فقط برای سفارش‌های حضوری پای میز.');

  const { data, isLoading } = useQuery({
    queryKey: ['dashboardOffers'],
    queryFn: () => api.getDashboardOffers()
  });

  const createMutation = useMutation({
    mutationFn: () =>
      api.createDashboardOffer({
        title,
        description,
        valueDisplay,
        terms,
        branchId: 'br-naderi-01',
        branchName: 'کافه نادری',
        offerType: 'percentage',
        status: 'active',
        eligibility: 'all_guests',
        maxRedemptions: 50,
        startsAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
      }),
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['dashboardOffers'] });
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    }
  });

  if (isLoading) return <LoadingState message="در حال دریافت لیست کمپین‌های تخفیف..." />;

  const offers = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#d4af37]" />
            مدیریت پیشنهادها و کمپین‌ها (Offers & Campaigns)
          </h2>
          <p className="text-xs text-emerald-300/70">
            تعریف تخفیف‌های هدفمند بر اساس رفتار مشتریان پای میز کافه.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs flex items-center gap-1.5 shadow-md border border-[#d4af37]/40"
        >
          <Plus className="w-4 h-4 text-[#d4af37]" />
          <span>ایجاد پیشنهاد جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers?.map((offer) => (
          <div
            key={offer.id}
            className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4"
          >
            <div className="flex justify-between items-start border-b border-emerald-900/40 pb-3">
              <div>
                <span className="bg-[#1b4332] text-[#d4af37] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                  {offer.valueDisplay}
                </span>
                <h3 className="text-sm font-bold text-emerald-100 mt-2">{offer.title}</h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                {offer.status === 'active' ? 'فعال ●' : 'متوقف'}
              </span>
            </div>

            <p className="text-xs text-emerald-300/80">{offer.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#0b1312] p-2 rounded-xl border border-emerald-900 text-center">
                <span className="text-[10px] text-emerald-500 block">کوپن‌های دریافتی:</span>
                <span className="text-[#d4af37] font-bold">{offer.claimedCount}</span>
              </div>
              <div className="bg-[#0b1312] p-2 rounded-xl border border-emerald-900 text-center">
                <span className="text-[10px] text-emerald-500 block">بازخریدشده در صندوق:</span>
                <span className="text-emerald-300 font-bold">{offer.redeemedCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal create offer */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="greenwich-card rounded-3xl p-6 border border-[#d4af37] max-w-md w-full space-y-4 greenwich-gold-glow">
            <div className="flex justify-between items-center border-b border-emerald-800/40 pb-3">
              <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#d4af37]" />
                تعریف پیشنهاد تخفیف جدید
              </h3>
              <button onClick={() => setShowModal(false)} className="text-emerald-400 hover:text-emerald-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-emerald-200 mb-1">عنوان پیشنهاد</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0b1312] border border-emerald-800 text-emerald-100"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-200 mb-1">مقدار و برچسب تخفیف</label>
                <input
                  type="text"
                  value={valueDisplay}
                  onChange={(e) => setValueDisplay(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0b1312] border border-emerald-800 text-[#d4af37] font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-200 mb-1">توضیحات</label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-[#0b1312] border border-emerald-800 text-emerald-100"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-200 mb-1">شرایط استفاده</label>
                <input
                  type="text"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0b1312] border border-emerald-800 text-emerald-100"
                />
              </div>
            </div>

            <button
              onClick={() => createMutation.mutate()}
              disabled={createMutation.isPending}
              className="w-full py-3 rounded-2xl bg-[#2d6a4f] hover:bg-[#1b4332] text-emerald-50 font-bold text-xs transition-colors shadow-md border border-[#d4af37]/40"
            >
              {createMutation.isPending ? 'در حال انتشار...' : 'انتشار پیشنهاد برای مهمانان'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

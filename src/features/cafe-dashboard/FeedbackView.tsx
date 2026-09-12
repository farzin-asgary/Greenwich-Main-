import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { LoadingState } from '../../shared/ui/LoadingState';
import { Star, MessageSquare } from 'lucide-react';

export const FeedbackView: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardFeedback'],
    queryFn: () => api.getDashboardFeedback()
  });

  if (isLoading) return <LoadingState message="در حال بارگذاری نظرات مشتریان..." />;

  const feedbackList = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#d4af37]" />
          نظرات و بازخوردهای مهمانان
        </h2>
        <p className="text-xs text-emerald-300/70">
          نظرات ثبت‌شده توسط مشتریان حین حضور روی میزهای کافه.
        </p>
      </div>

      <div className="space-y-4">
        {feedbackList?.map((fb) => (
          <div
            key={fb.id}
            className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#1b4332] text-[#d4af37] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  میز {fb.tableNumber}
                </span>
                <span className="text-xs font-mono text-emerald-400">{fb.guestPhone}</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= fb.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-emerald-950'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-emerald-200 leading-relaxed font-['Vazirmatn',sans-serif]">
              « {fb.comment} »
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {fb.tags?.map((t, i) => (
                <span
                  key={i}
                  className="bg-[#0b1312] text-emerald-300 text-[10px] px-2.5 py-1 rounded-lg border border-emerald-900"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

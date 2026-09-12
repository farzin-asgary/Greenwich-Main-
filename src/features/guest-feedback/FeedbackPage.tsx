import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { SessionTimerHeader } from '../../shared/ui/SessionTimerHeader';
import { GuestBottomNav } from '../../shared/ui/GuestBottomNav';
import { Star, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['کیفیت قهوه', 'موسیقی']);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { data: sessionData } = useQuery({
    queryKey: ['guestSession'],
    queryFn: () => api.getGuestSession()
  });

  const availableTags = [
    'کیفیت قهوه',
    'برخورد پرسنل',
    'موسیقی و فضا',
    'سرعت سرویس‌دهی',
    'داستان‌ها و محتوا',
    'تنوع منو'
  ];

  const mutation = useMutation({
    mutationFn: () => api.submitFeedback(rating, comment, selectedTags),
    onSuccess: () => {
      setSubmitted(true);
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 pb-28 max-w-md mx-auto relative">
      <SessionTimerHeader session={sessionData?.data || null} />

      <main className="px-5 py-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121e1c] border border-emerald-800/40 text-[#d4af37] text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>بازخورد و نظرسنجی کافه</span>
          </div>

          <h2 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            نظر شما درباره تجربه امروز
          </h2>
          <p className="text-xs text-emerald-300/70">
            نظرات شما مستقیماً به مدیریت کافه نادری برای بهبود سرویس‌دهی ارسال می‌شود.
          </p>
        </div>

        {submitted ? (
          <div className="greenwich-card rounded-3xl p-8 border-2 border-emerald-500 text-center space-y-4 greenwich-emerald-glow">
            <div className="w-16 h-16 rounded-full bg-[#1b4332] text-[#d4af37] flex items-center justify-center mx-auto text-2xl">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-emerald-100">با تشکر از ثبت نظر شما!</h3>
            <p className="text-xs text-emerald-300/80 leading-relaxed max-w-xs mx-auto">
              بازخورد شما ثبت شد. مدیریت کافه نادری قدردان توجه شما به ارتقای کیفیت است.
            </p>
          </div>
        ) : (
          <div className="greenwich-card rounded-3xl p-6 border border-emerald-800/40 space-y-6">
            {/* Star Rating */}
            <div className="text-center space-y-2">
              <label className="block text-xs font-bold text-emerald-200">
                امتیاز شما به تجربه حضور در کافه
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'text-[#d4af37] fill-[#d4af37]'
                          : 'text-emerald-900 fill-emerald-950'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">
                چه نکاتی بیشتر توجه شما را جلب کرد؟
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags?.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-[#2d6a4f] text-[#d4af37] border-[#d4af37]'
                          : 'bg-[#0b1312] text-emerald-300/70 border-emerald-900/60'
                      }`}
                    >
                      {tag} {isSelected ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">
                توضیحات یا پیشنهادات تکمیلی
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="نظرات، پیشنهادات یا انتقادات خود را بنویسید..."
                rows={4}
                className="w-full p-3 rounded-2xl bg-[#0b1312] border border-emerald-800 text-xs text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg greenwich-emerald-glow"
            >
              <Send className="w-4 h-4 text-[#d4af37]" />
              <span>{mutation.isPending ? 'در حال ارسال...' : 'ثبت نهایی نظرسنجی'}</span>
            </button>
          </div>
        )}
      </main>

      <GuestBottomNav />
    </div>
  );
};

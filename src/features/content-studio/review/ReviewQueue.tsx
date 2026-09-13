import React, { useState } from 'react';
import { Check, Calendar, ArrowRightLeft, AlertTriangle } from 'lucide-react';

export const ReviewQueue: React.FC = () => {
  const [returnReason, setReturnReason] = useState('');
  const [hasChangedSinceReview, setHasChangedSinceReview] = useState(true);

  return (
    <div className="p-6 bg-[#050a09] border border-emerald-900/40 rounded-2xl max-w-md mx-auto text-emerald-50 dir-rtl font-['Vazirmatn']">
      <h2 className="text-lg font-bold text-emerald-100 mb-6">صف بازبینی</h2>
      
      {hasChangedSinceReview && (
        <div className="mb-6 bg-red-950/20 border border-red-900/30 p-3 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-200 leading-relaxed">متن از زمان شروع بازبینی عوض شده است. لطفاً پیش از تأیید، تغییرات را مرور کنید.</p>
        </div>
      )}

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#b5952f] transition-colors">
          <Check className="w-4 h-4" />
          تأیید و انتشار
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-900/30 text-emerald-300 font-bold rounded-xl hover:bg-emerald-900/50 border border-emerald-900/40 transition-colors">
          <Calendar className="w-4 h-4" />
          زمان‌بندی انتشار
        </button>

        <div className="pt-6 border-t border-emerald-900/30 mt-6">
          <h3 className="text-sm font-bold text-emerald-400 mb-3">بازگشت به نویسنده</h3>
          <textarea 
            className="w-full h-24 bg-[#0b1312] border border-emerald-900/50 rounded-xl p-3 text-sm text-emerald-100 outline-none focus:border-[#d4af37]/50 resize-none mb-3"
            placeholder="دلیل بازگشت (اجباری)..."
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
          />
          <button 
            disabled={!returnReason.trim()}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-950/40 text-red-400 font-bold rounded-xl hover:bg-red-900/50 border border-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightLeft className="w-4 h-4" />
            بازگشت با یادداشت
          </button>
        </div>
      </div>
    </div>
  );
};

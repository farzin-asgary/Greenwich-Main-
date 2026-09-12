import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { Tag, Plus, CheckCircle2, AlertCircle, Percent, Gift } from 'lucide-react';

export const OffersHomePage: React.FC = () => {
  const navigate = useNavigate();

  const mockOffers = [
    { id: 'o1', title: 'تخفیف ۲۰٪ ویژه مشترکین جدید', type: 'percent', value: 20, status: 'active', claims: 145, redeems: 89, end: '۱۰ شهریور' },
    { id: 'o2', title: 'کیک هویج رایگان با قهوه دمی', type: 'free_item', value: 0, status: 'scheduled', claims: 0, redeems: 0, end: '۳۰ مهر' },
    { id: 'o3', title: '۵۰ هزار تومان تخفیف یکشنبه‌ها', type: 'fixed', value: 50000, status: 'ended', claims: 320, redeems: 290, end: 'پایان یافته' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پیشنهادها و کمپین‌ها
          </h1>
          <p className="text-xs text-emerald-300/70">
            برای مشتری‌ها پیشنهاد بسازید و نتیجه آن را دنبال کنید.
          </p>
        </div>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => navigate('/dashboard/offers/new')}>
          پیشنهاد جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockOffers.map(offer => (
          <div key={offer.id} className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 hover:border-emerald-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0b1312] border border-emerald-800 flex items-center justify-center shrink-0">
                  {offer.type === 'percent' && <Percent className="w-5 h-5 text-emerald-400" />}
                  {offer.type === 'free_item' && <Gift className="w-5 h-5 text-purple-400" />}
                  {offer.type === 'fixed' && <Tag className="w-5 h-5 text-[#d4af37]" />}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  offer.status === 'active' ? 'bg-emerald-900 text-emerald-300' :
                  offer.status === 'scheduled' ? 'bg-blue-900 text-blue-300' :
                  'bg-zinc-800 text-zinc-400'
                }`}>
                  {offer.status === 'active' ? 'فعال' : offer.status === 'scheduled' ? 'زمان‌بندی شده' : 'پایان یافته'}
                </span>
              </div>
              <h3 className="font-bold text-emerald-100 mb-2 leading-relaxed">{offer.title}</h3>
              <p className="text-xs text-emerald-400/80 mb-6">انقضا: {offer.end}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 border-t border-emerald-900/40 pt-4">
              <div>
                <span className="block text-[10px] text-emerald-500 mb-0.5">دریافت شده (Claim)</span>
                <span className="font-bold text-emerald-200 font-mono">{offer.claims}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#d4af37] mb-0.5">استفاده شده (Redeem)</span>
                <span className="font-bold text-[#d4af37] font-mono">{offer.redeems}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

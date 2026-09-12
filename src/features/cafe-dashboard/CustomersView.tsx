import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { LoadingState } from '../../shared/ui/LoadingState';
import { Users, Phone, Calendar, ShieldCheck, Tag } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardCustomers'],
    queryFn: () => api.getDashboardCustomers()
  });

  if (isLoading) return <LoadingState message="در حال بارگذاری لیست لیدهای کافه..." />;

  const customers = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#d4af37]" />
            مشتریان و لیدهای واقعی (Café CRM)
          </h2>
          <p className="text-xs text-emerald-300/70">
            تبدیل مشتریان ناشناس به لیدهای شناخته شده با شماره تلفن و رضایت حریم خصوصی.
          </p>
        </div>
        <span className="text-xs font-mono bg-[#1b4332] text-[#d4af37] px-3 py-1 rounded-full border border-[#d4af37]/30">
          تعداد کل: {customers.length} لید
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers?.map((cust) => (
          <div
            key={cust.id}
            className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-[#d4af37] flex items-center justify-center font-bold text-sm">
                  {cust.name?.[0] || 'م'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-100">{cust.name || 'مهمان کافه'}</h4>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 dir-ltr">
                    <Phone className="w-3 h-3 text-[#d4af37]" />
                    {cust.phone}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold bg-[#121e1c] text-[#d4af37] px-2.5 py-1 rounded-full border border-emerald-800">
                {cust.totalVisits} مراجعه
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-emerald-300/80">
              <div className="bg-[#0b1312] p-2.5 rounded-xl border border-emerald-900">
                <span className="text-[10px] text-emerald-500 block">آخرین مراجعه:</span>
                <span className="font-mono text-emerald-200">
                  {new Date(cust.lastVisitAt).toLocaleDateString('fa-IR')}
                </span>
              </div>
              <div className="bg-[#0b1312] p-2.5 rounded-xl border border-emerald-900">
                <span className="text-[10px] text-emerald-500 block">کودهای دریافتی/بازخرید:</span>
                <span className="font-mono text-[#d4af37] font-bold">
                  {cust.claimedCouponsCount} دریافت / {cust.redeemedCouponsCount} استفاده
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-emerald-400/80 pt-2 border-t border-emerald-900/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>رضایت بازاریابی: {cust.consents.cafeMarketingConsented ? 'تایید شده ✓' : 'رد شده ✕'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

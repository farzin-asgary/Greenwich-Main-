import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../shared/api/client';
import { LoadingState } from '../../shared/ui/LoadingState';
import { CouponRedeemer } from './CouponRedeemer';
import {
  Users,
  Compass,
  Gift,
  CheckCircle2,
  Clock,
  Activity,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => api.getDashboardSummary()
  });

  if (isLoading) return <LoadingState message="در حال بارگذاری آمار داشبورد کافه..." />;

  const summary = data?.data;

  const statCards = [
    {
      title: 'میزهای فعال هم‌اکنون',
      value: summary?.activeVisitsCount || 0,
      sub: 'میز ۱۲ و میز ۵',
      icon: Compass,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
    },
    {
      title: 'مشتریان شناسایی‌شده امروز',
      value: summary?.todayTotalGuests || 0,
      sub: 'لیدهای واقعی با شماره تلفن',
      icon: Users,
      color: 'text-[#d4af37] bg-amber-950/60 border-amber-800'
    },
    {
      title: 'کوپن‌های دریافت‌شده',
      value: summary?.offersClaimedToday || 0,
      sub: 'توسط مهمانان پای میز',
      icon: Gift,
      color: 'text-purple-400 bg-purple-950/60 border-purple-800'
    },
    {
      title: 'کوپن‌های بازخریدشده',
      value: summary?.couponsRedeemedToday || 0,
      sub: 'دریافت شده در صندوق',
      icon: CheckCircle2,
      color: 'text-blue-400 bg-blue-950/60 border-blue-800'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Staff Coupon Redeemer */}
      <CouponRedeemer />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs text-emerald-300/70">{card.title}</span>
                <h3 className="text-2xl font-bold font-mono text-emerald-100">{card.value}</h3>
                <p className="text-[10px] text-emerald-400/60">{card.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Visits Table */}
      <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
          <h3 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#d4af37]" />
            نشست‌های زنده رویدادهای میز کافه (Real-time Live Table Visits)
          </h3>
          <span className="text-xs text-emerald-400 font-mono">بروزرسانی زنده</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs text-emerald-200">
            <thead className="bg-[#0b1312] text-emerald-400/80 font-semibold uppercase border-b border-emerald-900">
              <tr>
                <th className="p-3">میز</th>
                <th className="p-3">مهمان (شماره همراه)</th>
                <th className="p-3">زمان شروع</th>
                <th className="p-3">زمان باقی‌مانده</th>
                <th className="p-3">وضعیت نشست</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950">
              {summary?.recentVisits?.map((v) => (
                <tr key={v.sessionId} className="hover:bg-[#121e1c]/80 transition-colors">
                  <td className="p-3 font-bold text-[#d4af37]">میز {v.tableNumber}</td>
                  <td className="p-3">
                    <div className="font-bold">{v.guestName || 'مهمان کافه'}</div>
                    <div className="text-[10px] font-mono text-emerald-400/70">{v.guestPhone}</div>
                  </td>
                  <td className="p-3 font-mono dir-ltr text-right">
                    {new Date(v.startedAt).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3 font-mono text-emerald-300">
                    {v.status === 'active' ? '۴۲ دقیقه باقی‌مانده' : 'پایان یافته'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      v.status === 'active'
                        ? 'bg-emerald-900 text-emerald-200 border border-emerald-500/40'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {v.status === 'active' ? 'فعال ●' : 'منقضی شده'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { Search, Filter, Users, Star, Clock, Download, ChevronLeft } from 'lucide-react';

export const CustomersListPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mockCustomers = [
    { id: 'c1', name: 'علی رضایی', phone: '0912***3456', status: 'returning', visits: 12, lastVisit: '۲ روز پیش' },
    { id: 'c2', name: 'سارا احمدی', phone: '0935***7890', status: 'new', visits: 1, lastVisit: 'امروز' },
    { id: 'c3', name: 'کاربر مهمان', phone: '0902***1122', status: 'regular', visits: 5, lastVisit: '۱ هفته پیش' },
    { id: 'c4', name: 'محمد کریمی', phone: '0910***5566', status: 'inactive', visits: 3, lastVisit: '۲ ماه پیش' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new': return <span className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-800/50 text-[10px]">جدید</span>;
      case 'returning': return <span className="px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 text-[10px]">بازگشتی</span>;
      case 'regular': return <span className="px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-800/50 text-[10px] flex items-center gap-1"><Star className="w-3 h-3"/> منظم</span>;
      case 'inactive': return <span className="px-2 py-0.5 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 text-[10px]">غیرفعال</span>;
      default: return null;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            مدیریت مشتریان
          </h1>
          <p className="text-xs text-emerald-300/70">
            مشتری‌هایی که از طریق Greenwich با کافه شما ارتباط داشته‌اند.
          </p>
        </div>
        <Button variant="secondary" size="md" leftIcon={<Download className="w-4 h-4" />}>
          خروجی لیست (CSV)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-400 block mb-1">کل مشتریان شناسایی‌شده</span>
            <span className="text-xl font-bold text-emerald-100 font-mono">1,245</span>
          </div>
          <Users className="w-8 h-8 text-emerald-800" />
        </div>
        <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-blue-400 block mb-1">مشتریان جدید (ماه)</span>
            <span className="text-xl font-bold text-blue-100 font-mono">124</span>
          </div>
          <Users className="w-8 h-8 text-blue-900" />
        </div>
        <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-amber-400 block mb-1">مشتریان منظم</span>
            <span className="text-xl font-bold text-amber-100 font-mono">86</span>
          </div>
          <Star className="w-8 h-8 text-amber-900" />
        </div>
      </div>

      <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="جستجوی نام یا شماره همراه..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-[#0b1312] border border-emerald-900 rounded-xl text-emerald-100 text-sm focus:outline-none focus:border-emerald-600"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Button variant="secondary" size="md" leftIcon={<Filter className="w-4 h-4" />}>
            وضعیت
          </Button>
          <Button variant="secondary" size="md">
            شعبه
          </Button>
        </div>
      </div>

      <div className="greenwich-card rounded-2xl border border-emerald-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm text-emerald-200">
            <thead className="bg-[#121e1c] text-emerald-400 font-semibold border-b border-emerald-900/60">
              <tr>
                <th className="p-4">مشتری</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4 text-center">تعداد مراجعه</th>
                <th className="p-4">آخرین مراجعه</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/40">
              {mockCustomers.map(customer => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-[#1b4332]/40 transition-colors cursor-pointer"
                  onClick={() => navigate(`/dashboard/customers/${customer.id}`)}
                >
                  <td className="p-4">
                    <div className="font-bold text-emerald-100">{customer.name}</div>
                    <div className="text-xs text-emerald-500 font-mono mt-1 dir-ltr text-right">{customer.phone}</div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-emerald-100">
                    {customer.visits}
                  </td>
                  <td className="p-4 text-xs text-emerald-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {customer.lastVisit}
                    </div>
                  </td>
                  <td className="p-4 text-left">
                    <ChevronLeft className="w-5 h-5 text-emerald-600" />
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

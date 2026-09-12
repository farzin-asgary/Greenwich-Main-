import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { Search, Plus, Filter, Image as ImageIcon, MoreVertical } from 'lucide-react';

export const ItemLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mockItems = [
    { id: 'i1', name: 'اسپرسو سینگل', category: 'قهوه گرم', price: 65000, status: 'active', hasImage: true },
    { id: 'i2', name: 'لاته', category: 'قهوه گرم', price: 95000, status: 'active', hasImage: true },
    { id: 'i3', name: 'آمریکانو', category: 'قهوه گرم', price: 75000, status: 'active', hasImage: false },
    { id: 'i6', name: 'کیک هویج', category: 'دسر', price: 85000, status: 'out_of_stock', hasImage: true },
    { id: 'i7', name: 'چای سیاه', category: 'چای', price: 45000, status: 'active', hasImage: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            کتابخانه آیتم‌ها
          </h1>
          <p className="text-xs text-emerald-300/70">
            مخزن اصلی تمام آیتم‌های کافه شما
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" size="md" onClick={() => navigate('/dashboard/menu/modifiers')}>
            گروه‌های افزودنی (Modifiers)
          </Button>
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => navigate('/dashboard/menu/items/new')}>
            آیتم جدید
          </Button>
        </div>
      </div>

      <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="جستجوی نام آیتم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-[#0b1312] border border-emerald-900 rounded-xl text-emerald-100 text-sm focus:outline-none focus:border-emerald-600"
          />
        </div>
        <Button variant="secondary" size="md" leftIcon={<Filter className="w-4 h-4" />}>
          فیلترها
        </Button>
      </div>

      <div className="greenwich-card rounded-2xl border border-emerald-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm text-emerald-200">
            <thead className="bg-[#121e1c] text-emerald-400 font-semibold border-b border-emerald-900/60">
              <tr>
                <th className="p-4 w-12 text-center">عکس</th>
                <th className="p-4">نام آیتم</th>
                <th className="p-4">دسته‌بندی (Category)</th>
                <th className="p-4">قیمت پایه</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/40">
              {mockItems.map(item => (
                <tr key={item.id} className="hover:bg-[#121e1c]/50 transition-colors">
                  <td className="p-4 text-center">
                    {item.hasImage ? (
                      <div className="w-10 h-10 rounded-lg bg-emerald-900/40 flex items-center justify-center border border-emerald-800">
                        <ImageIcon className="w-4 h-4 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#0b1312] border border-dashed border-emerald-900 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-emerald-900" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-bold text-emerald-100">{item.name}</td>
                  <td className="p-4 text-emerald-400">{item.category}</td>
                  <td className="p-4 font-mono">{(item.price).toLocaleString('fa-IR')} <span className="text-xs text-emerald-500">تومان</span></td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'active' 
                        ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50'
                        : 'bg-amber-950/50 text-amber-400 border border-amber-800/50'
                    }`}>
                      {item.status === 'active' ? 'موجود' : 'ناموجود'}
                    </span>
                  </td>
                  <td className="p-4 text-left">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/menu/items/${item.id}`)}>
                      <MoreVertical className="w-4 h-4 text-emerald-500" />
                    </Button>
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

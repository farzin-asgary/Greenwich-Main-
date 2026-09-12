import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { Store, ArrowRight, Save, Clock, MapPin, Map, QrCode } from 'lucide-react';

export const BranchDetailPage: React.FC = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard/branches')}
          >
            <ArrowRight className="w-5 h-5 text-emerald-300" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              شعبه جمهوری
            </h1>
            <p className="text-xs text-emerald-300/70 font-mono mt-1">
              ID: {branchId}
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-6">
            <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <Store className="w-4 h-4 text-[#d4af37]" />
              اطلاعات شعبه
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-emerald-200">نام شعبه</label>
                <input
                  type="text"
                  defaultValue="شعبه جمهوری"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-emerald-200">شماره تماس اختصاصی شعبه</label>
                <input
                  type="tel"
                  defaultValue="021-66778899"
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors text-right"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-emerald-200">آدرس دقیق</label>
                <textarea
                  rows={2}
                  defaultValue="خیابان جمهوری، روبروی سفارت، پلاک ۴۲"
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-emerald-200">لینک نقشه (Google Maps / Neshan)</label>
                <input
                  type="url"
                  dir="ltr"
                  placeholder="https://maps.google.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors text-right"
                />
              </div>
            </div>
          </form>

          {/* Business Hours */}
          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-6">
            <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              ساعات کاری
            </h2>
            
            <div className="space-y-4">
              {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, idx) => (
                <div key={day} className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-2 border-b border-emerald-900/30 last:border-0">
                  <div className="w-24 text-sm text-emerald-200 font-bold">{day}</div>
                  
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue={idx === 6 ? "10:00" : "08:00"} className="bg-[#0b1312] border border-emerald-900 text-emerald-100 px-2 py-1.5 rounded-lg text-sm focus:outline-none focus:border-[#d4af37]" />
                    <span className="text-emerald-500 text-xs">تا</span>
                    <input type="time" defaultValue="23:30" className="bg-[#0b1312] border border-emerald-900 text-emerald-100 px-2 py-1.5 rounded-lg text-sm focus:outline-none focus:border-[#d4af37]" />
                  </div>
                  
                  <label className="flex items-center gap-2 mr-auto cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#d4af37]" />
                    <span className="text-xs text-emerald-400">باز است</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4">
            <h3 className="text-sm font-bold text-[#d4af37]">وضعیت شعبه</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-emerald-900/30">
                <span className="text-emerald-300">وضعیت فعلی</span>
                <span className="bg-emerald-900 text-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold">فعال</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-900/30">
                <span className="text-emerald-300">منوی متصل</span>
                <span className="text-emerald-100 font-bold">منوی اصلی</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-900/30">
                <span className="text-emerald-300">تعداد میزها</span>
                <span className="text-emerald-100 font-bold font-mono">۲۴</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full mt-4" onClick={() => navigate('/dashboard/tables')}>
              مدیریت میزهای این شعبه
            </Button>
          </div>

          <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-4">
            <h3 className="text-sm font-bold text-[#d4af37]">تنظیمات نشست (Session)</h3>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              مدت زمان پیش‌فرض حضور هر میز پس از اسکن QR در این شعبه چقدر است؟
            </p>
            
            <select className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm">
              <option value="60">۶۰ دقیقه (۱ ساعت)</option>
              <option value="90">۹۰ دقیقه (۱.۵ ساعت)</option>
              <option value="120" selected>۱۲۰ دقیقه (۲ ساعت)</option>
              <option value="180">۱۸۰ دقیقه (۳ ساعت)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

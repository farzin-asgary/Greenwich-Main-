import React, { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import { Save, Upload, MapPin, Building, Image as ImageIcon, Camera } from 'lucide-react';

export const CafeProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            پروفایل کافه
          </h1>
          <p className="text-xs text-emerald-300/70">
            اطلاعات پایه و هویت بصری کسب‌وکار شما
          </p>
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

      {success && (
        <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-3 rounded-xl text-sm font-bold flex items-center justify-center">
          تغییرات با موفقیت ذخیره شد.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* برند و مدیا */}
        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-6">
          <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#d4af37]" />
            برند و هویت بصری
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-emerald-200">لوگوی کافه</label>
                <div className="w-24 h-24 rounded-2xl bg-[#0b1312] border border-emerald-900/60 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-6 h-6 text-emerald-300" />
                  </div>
                  <span className="text-3xl font-serif text-[#d4af37]">N</span>
                </div>
                <p className="text-[10px] text-emerald-400/60">فرمت‌های مجاز: PNG, JPG (حداکثر ۲ مگابایت)</p>
              </div>
            </div>

            <div className="flex-[2] space-y-2">
              <label className="block text-xs font-bold text-emerald-200">تصویر اصلی پروفایل (کاور)</label>
              <div className="w-full h-32 rounded-2xl bg-[#0b1312] border border-emerald-900/60 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                  <Upload className="w-6 h-6 text-emerald-300" />
                  <span className="text-xs font-bold text-emerald-100">تغییر تصویر کاور</span>
                </div>
                <ImageIcon className="w-8 h-8 text-emerald-800" />
              </div>
            </div>
          </div>
        </div>

        {/* اطلاعات پایه */}
        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-6">
          <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#d4af37]" />
            اطلاعات پایه
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">نام کافه (رسمی)</label>
              <input
                type="text"
                defaultValue="کافه نادری"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">نام نمایشی (انگلیسی - برای لینک)</label>
              <input
                type="text"
                defaultValue="cafe-naderi"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-emerald-200">توضیح کوتاه</label>
              <textarea
                rows={3}
                defaultValue="کافه نادری، میزبان خاطرات نسل‌ها. تجربه‌ای نو از طعم‌های کلاسیک."
                className="w-full px-4 py-3 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* تماس و ارتباطات */}
        <div className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 space-y-6">
          <h2 className="text-sm font-bold text-emerald-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            راه‌های ارتباطی
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">شماره تماس اصلی</label>
              <input
                type="tel"
                defaultValue="021-88997766"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors text-right"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">شهر اصلی</label>
              <input
                type="text"
                defaultValue="تهران"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">آدرس وب‌سایت</label>
              <input
                type="url"
                defaultValue="https://cafenaderi.com"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors text-right"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-200">اینستاگرام</label>
              <input
                type="text"
                defaultValue="@cafenaderi"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b1312] border border-emerald-900 focus:outline-none focus:border-[#d4af37] text-emerald-100 text-sm transition-colors text-right"
              />
            </div>
          </div>
        </div>
        
      </form>
    </div>
  );
};

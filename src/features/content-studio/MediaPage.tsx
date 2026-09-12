import React from 'react';
import { ContentStudioLayout } from '../../layouts/content/ContentStudioLayout';
import { Image, Music, Upload, FileText, Trash2, Search } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

export const MediaPage: React.FC = () => {
  const mockMedia = [
    { id: 1, name: 'cover-dostoevsky.jpg', type: 'image', size: '240 KB', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c' },
    { id: 2, name: 'boof-koor-banner.jpg', type: 'image', size: '1.2 MB', url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765' },
    { id: 3, name: 'audio-chapter-1.mp3', type: 'audio', size: '8.4 MB' },
    { id: 4, name: 'tolstoy-portrait.png', type: 'image', size: '890 KB', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  ];

  return (
    <ContentStudioLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-end border-b border-emerald-900/60 pb-3">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              کتابخانه رسانه و کاورها
            </h1>
            <p className="text-xs text-emerald-300/70">آپلود و مدیریت تصاویر کاور داستان‌ها و فایل‌های صوتی</p>
          </div>
          <div className="relative">
             <Search className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 transform -translate-y-1/2" />
             <input type="text" placeholder="جستجوی فایل..." className="bg-[#0b1312] border border-emerald-900/60 rounded-xl py-2 pl-4 pr-10 text-xs text-emerald-100 focus:outline-none focus:border-emerald-500 w-64" />
          </div>
        </div>

        {/* Upload Zone */}
        <div className="greenwich-card rounded-2xl p-8 border-2 border-dashed border-[#d4af37]/40 text-center space-y-4 hover:bg-[#121e1c]/80 transition-colors cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-[#121e1c] flex items-center justify-center mx-auto border border-emerald-900/60 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-[#d4af37]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-100">بارگذاری تصویر یا فایل صوتی جدید</h3>
            <p className="text-xs text-emerald-400 mt-2">برای آپلود کلیک کنید یا فایل‌ها را اینجا رها کنید</p>
            <p className="text-[10px] text-emerald-500/70 mt-1">فرمت‌های مجاز: JPG, PNG, MP3 (حداکثر ۱۰ مگابایت)</p>
          </div>
        </div>

        {/* Media Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-emerald-200">فایل‌های اخیر</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockMedia.map((media) => (
              <div key={media.id} className="greenwich-card rounded-xl p-3 border border-emerald-900/40 hover:border-emerald-700 transition-colors group">
                <div className="h-32 rounded-lg bg-[#0b1312] border border-emerald-900/30 flex items-center justify-center overflow-hidden mb-3 relative">
                  {media.type === 'image' && media.url ? (
                    <img src={media.url} alt={media.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Music className="w-8 h-8 text-emerald-700" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full" leftIcon={<Search className="w-4 h-4" />}></Button>
                    <Button variant="danger" size="icon" className="rounded-full" leftIcon={<Trash2 className="w-4 h-4" />}></Button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="truncate pr-2 w-3/4">
                    <p className="text-xs font-bold text-emerald-100 truncate" dir="ltr">{media.name}</p>
                    <p className="text-[10px] text-emerald-500 mt-0.5">{media.size}</p>
                  </div>
                  {media.type === 'image' ? <Image className="w-4 h-4 text-emerald-600" /> : <Music className="w-4 h-4 text-amber-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentStudioLayout>
  );
};

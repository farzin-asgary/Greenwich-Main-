import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentStudioLayout } from '../../../layouts/content/ContentStudioLayout';
import { api as apiClient } from '../../../shared/api/client';
import { ArrowLeft, Save, FileText, LayoutList, Upload } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';

export const PublicationEditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  // Publication fields
  const [type, setType] = useState('ARTICLE');
  const [format, setFormat] = useState('NATIVE_STRUCTURED');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [bodyText, setBodyText] = useState(''); // Simple text representation for prototype
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew && id) {
      const load = async () => {
        try {
          const res = await apiClient.getPublicationBySlug(id);
          const p = res.data;
          setType(p.publication_type);
          setFormat(p.reader_format);
          setTitle(p.title);
          setAuthor(p.author);
          setDescription(p.description);
          // For a real app we'd load sections here if it's an article
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [id, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      navigate('/content-studio/publications');
    }, 1000);
  };

  if (loading) return <ContentStudioLayout><LoadingState message="در حال بارگذاری..." /></ContentStudioLayout>;

  return (
    <ContentStudioLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center border-b border-emerald-900/60 pb-3">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              {isNew ? 'ایجاد اثر جدید' : 'ویرایش اثر'}
            </h1>
            <p className="text-xs text-emerald-300/70">تکمیل متادیتا و بارگذاری محتوا</p>
          </div>

          <div className="flex items-center gap-2">
            {!isNew && format === 'NATIVE_STRUCTURED' && type === 'BOOK' && (
              <button onClick={() => navigate(`/content-studio/publications/${id}/chapters`)} className="px-3 py-2 rounded-xl bg-[#0b1312] text-[#d4af37] font-bold text-xs hover:bg-[#121e1c] border border-emerald-900 flex items-center gap-1">
                <LayoutList className="w-4 h-4" />
                مدیریت فصل‌ها
              </button>
            )}
            <button
              onClick={() => navigate('/content-studio/publications')}
              className="px-3 py-2 rounded-xl bg-[#121e1c] text-emerald-300 text-xs font-bold hover:bg-[#1b4332] flex items-center gap-1 border border-emerald-900"
            >
              <ArrowLeft className="w-4 h-4" />
              بازگشت
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-sm">
          {/* Step 1: Type & Format */}
          <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
            <h2 className="font-bold text-emerald-200 border-b border-emerald-900/40 pb-2">۱. ساختار اثر</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400">نوع اثر (Publication Type)</label>
                <select 
                  value={type} 
                  onChange={e => setType(e.target.value)}
                  disabled={!isNew}
                  className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 disabled:opacity-50"
                >
                  <option value="ARTICLE">مقاله / داستان کوتاه</option>
                  <option value="BOOK_SUMMARY">خلاصه کتاب</option>
                  <option value="BOOK">کتاب کامل</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400">فرمت مطالعه (Reader Format)</label>
                <select 
                  value={format} 
                  onChange={e => setFormat(e.target.value)}
                  disabled={!isNew}
                  className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2.5 text-emerald-100 disabled:opacity-50"
                >
                  <option value="NATIVE_STRUCTURED">متن بومی گرینویچ</option>
                  <option value="PDF">فایل PDF</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Metadata */}
          <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
            <h2 className="font-bold text-emerald-200 border-b border-emerald-900/40 pb-2">۲. شناسنامه اثر</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400">عنوان اصلی</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400">نام نویسنده</label>
                <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400">خلاصه توضیحات</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-3 py-2 text-emerald-100 leading-relaxed"></textarea>
            </div>
          </div>

          {/* Step 3: Content Editor based on format */}
          {format === 'NATIVE_STRUCTURED' && type !== 'BOOK' && (
            <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
              <h2 className="font-bold text-emerald-200 border-b border-emerald-900/40 pb-2 flex items-center justify-between">
                <span>۳. ویرایشگر متن ساختاریافته</span>
                {type === 'BOOK_SUMMARY' && <span className="text-[10px] bg-emerald-900/40 text-emerald-300 px-2 py-1 rounded">پشتیبانی از بخش‌بندی</span>}
              </h2>
              
              <div className="space-y-2">
                <p className="text-xs text-emerald-400/80 mb-2">در نسخه نهایی، در اینجا بلوک‌های محتوایی (متن، تیتر، نقل‌قول) به صورت ساختاریافته قرار می‌گیرند.</p>
                <textarea 
                  rows={15} 
                  value={bodyText} 
                  onChange={e => setBodyText(e.target.value)} 
                  placeholder="محتوای مقاله یا خلاصه را وارد کنید..."
                  className="w-full bg-[#0b1312] border border-emerald-900 rounded-xl px-4 py-3 text-emerald-100 leading-loose"
                ></textarea>
              </div>
            </div>
          )}

          {format === 'NATIVE_STRUCTURED' && type === 'BOOK' && (
            <div className="greenwich-card rounded-2xl p-8 border border-dashed border-[#d4af37]/40 text-center space-y-3 bg-[#0b1312]">
              <LayoutList className="w-8 h-8 text-[#d4af37] mx-auto" />
              <h3 className="font-bold text-emerald-100">مدیریت فصول کتاب</h3>
              <p className="text-xs text-emerald-400 max-w-md mx-auto">
                شما در حال ایجاد یک کتاب کامل هستید. پس از ذخیره اولیه شناسنامه، می‌توانید از طریق دکمه «مدیریت فصل‌ها» محتوای هر فصل را جداگانه وارد کنید.
              </p>
            </div>
          )}

          {format === 'PDF' && (
            <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 space-y-4">
              <h2 className="font-bold text-emerald-200 border-b border-emerald-900/40 pb-2">۳. بارگذاری فایل PDF</h2>
              <div className="border-2 border-dashed border-emerald-800 rounded-xl p-8 flex flex-col items-center justify-center bg-[#0b1312] cursor-pointer hover:border-[#d4af37]/50 transition-colors">
                <Upload className="w-8 h-8 text-emerald-600 mb-3" />
                <span className="text-sm font-bold text-emerald-300">برای انتخاب فایل کلیک کنید یا فایل را بکشید</span>
                <span className="text-[10px] text-emerald-500 mt-1">حداکثر حجم مجاز: ۵۰ مگابایت</span>
                {pdfFile && <span className="mt-4 text-[#d4af37] font-mono text-xs">{pdfFile.name} انتخاب شد</span>}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex gap-4 pt-4 border-t border-emerald-900/60">
            <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-[#2d6a4f] text-[#fbf9f5] font-bold text-sm hover:bg-[#1b4332] transition-colors border border-[#d4af37]/40 flex items-center justify-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4 text-[#d4af37]" />
              {saving ? 'در حال ذخیره...' : 'ذخیره پیش‌نویس'}
            </button>
            <button type="button" className="flex-1 py-3 rounded-xl bg-[#0b1312] text-emerald-400 font-bold text-sm hover:bg-[#121e1c] transition-colors border border-emerald-900">
              پیش‌نمایش در Reader
            </button>
          </div>

        </form>
      </div>
    </ContentStudioLayout>
  );
};

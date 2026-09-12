import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentStudioLayout } from '../../../layouts/content/ContentStudioLayout';
import { api as apiClient } from '../../../shared/api/client';
import { PublicationSection } from '../../../shared/types';
import { ArrowLeft, Plus, GripVertical, Edit, Trash2 } from 'lucide-react';
import { LoadingState } from '../../../shared/ui/LoadingState';
import { Button } from '../../../shared/ui/Button';

export const ChapterManagerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [sections, setSections] = useState<PublicationSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const res = await apiClient.getPublicationSections(id);
        setSections(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <ContentStudioLayout><LoadingState message="در حال بارگذاری فصول..." /></ContentStudioLayout>;

  return (
    <ContentStudioLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center border-b border-emerald-900/60 pb-3">
          <div>
            <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
              مدیریت فصول کتاب
            </h1>
            <p className="text-xs text-emerald-300/70">ویرایش، جابه‌جایی و ایجاد فصول ساختاریافته</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(`/content-studio/publications/${id}`)}
              variant="tertiary"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              بازگشت به شناسنامه
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Chapter List */}
          <div className="w-full md:w-1/3 space-y-3">
            <Button variant="secondary" className="w-full border-[#d4af37]/40 text-[#d4af37]" leftIcon={<Plus className="w-4 h-4" />}>
              افزودن فصل جدید
            </Button>

            <div className="space-y-2">
              {sections?.map((sec, idx) => (
                <div key={sec.id} className={`greenwich-card rounded-xl p-3 border flex items-center gap-3 cursor-pointer transition-colors ${idx === 0 ? 'bg-[#1b4332] border-[#d4af37]/40' : 'bg-[#121e1c] border-emerald-900/60 hover:bg-[#1b4332]/50'}`}>
                  <GripVertical className="w-4 h-4 text-emerald-600 cursor-move" />
                  <div className="flex-1">
                    <span className="text-[10px] text-emerald-400 block font-mono">بخش {sec.order}</span>
                    <span className="font-bold text-emerald-100 text-sm block">{sec.title}</span>
                  </div>
                </div>
              ))}
              {sections.length === 0 && (
                <div className="text-center p-4 border border-dashed border-emerald-900/40 rounded-xl text-emerald-500 text-xs">
                  هیچ فصلی ایجاد نشده است.
                </div>
              )}
            </div>
          </div>

          {/* Chapter Editor Area */}
          <div className="w-full md:w-2/3 greenwich-card rounded-2xl p-6 border border-emerald-900/60">
            {sections.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
                  <h2 className="text-lg font-bold text-emerald-100">ویرایش: {sections[0].title}</h2>
                  <div className="flex gap-2">
                    <Button variant="tertiary" size="icon" leftIcon={<Edit className="w-4 h-4" />}></Button>
                    <Button variant="danger" size="icon" leftIcon={<Trash2 className="w-4 h-4" />}></Button>
                  </div>
                </div>
                
                {/* Block Editor UI */}
                <div className="space-y-4">
                  <div className="relative group">
                    <textarea 
                       rows={3} 
                       defaultValue="در این بخش در نسخه نهایی ویرایشگر ساختاریافته (Native Editor) قرار می‌گیرد. هر پاراگراف یک بلاک مجزاست." 
                       className="w-full bg-[#0b1312] border border-transparent hover:border-emerald-900 focus:border-emerald-700 rounded-xl px-4 py-3 text-emerald-100 leading-loose text-sm resize-none outline-none transition-colors"
                    ></textarea>
                  </div>
                  
                  <div className="relative group">
                     <div className="w-full bg-[#0b1312] border border-emerald-900/40 rounded-xl p-4 flex items-center justify-center min-h-[120px] text-emerald-700 hover:text-emerald-500 cursor-pointer transition-colors">
                        <div className="text-center space-y-2">
                           <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center mx-auto">
                              <Plus className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-bold block">افزودن مدیا (عکس/صدا)</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea 
                       rows={2} 
                       defaultValue="این یک بلاک نقل قول است که متمایز نمایش داده می‌شود." 
                       className="w-full bg-[#121e1c] border-r-4 border-[#d4af37] border-y-transparent border-l-transparent focus:border-emerald-700 rounded-l-xl px-4 py-3 text-emerald-100 italic leading-loose text-sm resize-none outline-none transition-colors"
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between items-center border-t border-emerald-900/40">
                  <div className="flex gap-2">
                     <Button variant="tertiary" size="sm" leftIcon={<Plus className="w-3 h-3" />}>پاراگراف</Button>
                     <Button variant="tertiary" size="sm" leftIcon={<Plus className="w-3 h-3" />}>نقل قول</Button>
                  </div>
                  <Button variant="secondary" size="md">
                    ذخیره محتوای فصل
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 text-emerald-500 text-sm">
                یک فصل را برای ویرایش انتخاب کنید یا فصل جدید بسازید.
              </div>
            )}
          </div>

        </div>
      </div>
    </ContentStudioLayout>
  );
};

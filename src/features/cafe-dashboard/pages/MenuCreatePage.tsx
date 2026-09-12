import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { Coffee, Utensils, CupSoda, Croissant, Plus, ArrowRight, FileText } from 'lucide-react';

export const MenuCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 't-classic', name: 'کافه کلاسیک', icon: Coffee, desc: 'شامل اسپرسوبار، قهوه‌های دمی، چای، کیک و دسر.' },
    { id: 't-specialty', name: 'Specialty Coffee', icon: CupSoda, desc: 'تمرکز بر قهوه‌های تخصصی، متدهای دمی و دانه‌های سینگل اوریجین.' },
    { id: 't-breakfast', name: 'صبحانه و Brunch', icon: Croissant, desc: 'ترکیب کامل منوی صبحانه سرد و گرم، پنکیک‌ها و نوشیدنی‌ها.' },
    { id: 't-restaurant', name: 'کافه رستوران', icon: Utensils, desc: 'منوی کامل شامل پیش‌غذا، غذای اصلی، پیتزا، پاستا و بار.' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/menu')}>
          <ArrowRight className="w-5 h-5 text-emerald-300" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            ساخت منوی جدید
          </h1>
          <p className="text-xs text-emerald-300/70">
            می‌خواهید از کجا شروع کنید؟
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-[#d4af37]">شروع سریع با قالب‌های گرینویچ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map(tpl => {
            const Icon = tpl.icon;
            return (
              <div 
                key={tpl.id}
                onClick={() => navigate(`/dashboard/menu/new?template=${tpl.id}`)}
                className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 hover:border-[#d4af37]/60 hover:bg-[#121e1c] transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b1312] border border-emerald-900/80 flex items-center justify-center shrink-0 group-hover:bg-[#1b4332] group-hover:border-emerald-700 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-400 group-hover:text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-100 mb-1 group-hover:text-white">{tpl.name}</h3>
                    <p className="text-[11px] text-emerald-400/80 leading-relaxed">{tpl.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-emerald-900/60"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#0b1312] px-4 text-xs text-emerald-500">یا</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          onClick={() => navigate(`/dashboard/menu/new?scratch=true`)}
          className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 hover:border-emerald-600 transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-950 flex items-center justify-center shrink-0">
            <Plus className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-100">شروع از منوی خالی</h3>
            <p className="text-[11px] text-emerald-400/80">ساخت ساختار منو از صفر</p>
          </div>
        </div>

        <div className="greenwich-card rounded-2xl p-5 border border-emerald-900/60 hover:border-emerald-600 transition-all cursor-pointer flex items-center gap-4 opacity-50 cursor-not-allowed">
          <div className="w-10 h-10 rounded-full bg-emerald-950 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-100">کپی از منوی موجود</h3>
            <p className="text-[11px] text-emerald-400/80">فعلاً منویی برای کپی وجود ندارد</p>
          </div>
        </div>
      </div>

    </div>
  );
};

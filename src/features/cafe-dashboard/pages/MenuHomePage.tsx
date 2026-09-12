import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { MenuSquare, Plus, FileText, ChevronLeft, Search } from 'lucide-react';

export const MenuHomePage: React.FC = () => {
  const navigate = useNavigate();

  const mockMenus = [
    {
      id: 'menu-main',
      name: 'منوی اصلی کافه',
      sectionsCount: 5,
      itemsCount: 32,
      activeIn: ['شعبه جمهوری'],
      lastUpdate: '۲ ساعت پیش'
    },
    {
      id: 'menu-breakfast',
      name: 'منوی صبحانه',
      sectionsCount: 2,
      itemsCount: 12,
      activeIn: ['شعبه جمهوری', 'شعبه ولیعصر'],
      lastUpdate: '۱ روز پیش'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-emerald-100 font-['Playfair_Display',serif]">
            مدیریت منوها
          </h1>
          <p className="text-xs text-emerald-300/70">
            منوی کافه را بسازید و به شعبه‌های مختلف متصل کنید.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/dashboard/menu/items')}
          >
            کتابخانه آیتم‌ها
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/dashboard/menu/new')}
          >
            ساخت منو
          </Button>
        </div>
      </div>

      {mockMenus.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockMenus.map(menu => (
            <div key={menu.id} className="greenwich-card rounded-2xl p-6 border border-emerald-900/60 hover:border-emerald-700 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-100">{menu.name}</h3>
                    <p className="text-xs text-emerald-400 mt-1">آخرین تغییر: {menu.lastUpdate}</p>
                  </div>
                </div>
                <Button 
                  variant="tertiary" 
                  size="sm"
                  onClick={() => navigate(`/dashboard/menu/${menu.id}`)}
                >
                  ویرایش منو
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm border-t border-emerald-900/40 pt-4">
                <div>
                  <span className="block text-[10px] text-emerald-500 mb-1">ساختار</span>
                  <span className="font-bold text-emerald-200 font-mono">{menu.itemsCount} آیتم در {menu.sectionsCount} بخش</span>
                </div>
                <div>
                  <span className="block text-[10px] text-emerald-500 mb-1">فعال در</span>
                  <span className="font-bold text-emerald-200 truncate block">
                    {menu.activeIn.join('، ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="greenwich-card rounded-2xl p-12 border border-emerald-900/60 text-center space-y-4">
          <MenuSquare className="w-12 h-12 text-emerald-800 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-100">هنوز منویی نساخته‌اید</h3>
          <p className="text-sm text-emerald-300/70 max-w-md mx-auto">
            برای شروع می‌توانید از یکی از قالب‌های گرینویچ استفاده کنید یا منوی خودتان را از صفر بسازید.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button variant="primary" onClick={() => navigate('/dashboard/menu/new')}>
              ساخت اولین منو
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

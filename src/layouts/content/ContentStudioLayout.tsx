import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { useAuth } from '../../app/auth/AuthContext';
import { PenTool, LayoutDashboard, FileText, PlusCircle, Layers, Image, User, ShieldAlert } from 'lucide-react';

export const ContentStudioLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, switchRole } = useAuth();

  const navItems = [
    { path: '/content-studio/dashboard', label: 'داشبورد نویسنده', icon: LayoutDashboard },
    { path: '/content-studio/publications', label: 'مدیریت انتشارات', icon: FileText },
    { path: '/content-studio/publications/new', label: 'اثر جدید', icon: PlusCircle },
    { path: '/content-studio/collections', label: 'مجموعه‌ها و کارت‌ها', icon: Layers },
    { path: '/content-studio/media', label: 'کتابخانه رسانه', icon: Image },
    { path: '/content-studio/profile', label: 'پروفایل نویسنده', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col font-['Vazirmatn',sans-serif] dir-rtl">
      {/* Top Header */}
      <header className="bg-[#121e1c] border-b border-emerald-900/60 px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <GreenwichLogo size="sm" showSubtext={false} />
          </Link>
          <div className="h-5 w-px bg-emerald-800/60 hidden sm:block"></div>
          <span className="text-xs font-bold text-emerald-200 hidden sm:inline-flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-[#d4af37]" />
            استودیو تولید محتوا و مجله گرینویچ
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { switchRole('CAFE'); navigate('/dashboard/overview'); }}
            className="px-3 py-1.5 rounded-xl bg-[#0b1312] text-emerald-300 text-xs font-bold hover:text-emerald-100 transition-colors border border-emerald-900"
          >
            سوئیچ به پنل کافه
          </button>
        </div>
      </header>

      {/* Security Info Banner */}
      <div className="bg-[#0b1312] border-b border-emerald-900/40 py-1.5 px-6 text-[11px] text-emerald-400/80 flex items-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>دسترسی محدود نویسندگان: شما به CRM کافه‌ها، شماره تماس مشتریان و کوپن‌های مالی دسترسی ندارید.</span>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar Nav */}
        <aside className="md:col-span-1 space-y-3">
          <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 space-y-3">
            <div className="border-b border-emerald-900/40 pb-3">
              <span className="text-[10px] text-emerald-400 block font-mono">Content Creator</span>
              <h3 className="text-sm font-bold text-emerald-100">{user?.name}</h3>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path) && (item.path !== '/content-studio/publications' || location.pathname === '/content-studio/publications');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#2d6a4f] text-[#fbf9f5] border border-[#d4af37]/40 shadow-sm'
                        : 'text-emerald-300/70 hover:bg-[#121e1c] hover:text-emerald-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : ''}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-4">
          {children}
        </main>
      </div>
    </div>
  );
};

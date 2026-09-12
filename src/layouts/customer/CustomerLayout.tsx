import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { useAuth } from '../../app/auth/AuthContext';
import { User, Clock, Bookmark, Tag, ShieldCheck, LogOut, Coffee, Sparkles } from 'lucide-react';

export const CustomerLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, switchRole, logout } = useAuth();

  const navItems = [
    { path: '/panel/user/home', label: 'خانه و خلاصه‌وضعیت', icon: User },
    { path: '/panel/user/visits', label: 'مراجعات من به کافه‌ها', icon: Clock },
    { path: '/panel/user/saved', label: 'محتواهای ذخیره‌شده', icon: Bookmark },
    { path: '/panel/user/offers', label: 'پیشنهادها و کوپن‌های من', icon: Tag },
    { path: '/panel/user/profile', label: 'پروفایل من', icon: User },
    { path: '/panel/user/privacy', label: 'تنظیمات حریم خصوصی', icon: ShieldCheck },
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
            <User className="w-4 h-4 text-[#d4af37]" />
            حساب کاربری مشتری: {user?.name || 'مهمان گرینویچ'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/g/demo-table-12"
            className="px-3 py-1.5 rounded-xl bg-[#1b4332] text-[#d4af37] text-xs font-bold hover:bg-[#2d6a4f] transition-colors border border-[#d4af37]/30 flex items-center gap-1"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>تجربه زنده میز کافه</span>
          </Link>
          <button
            onClick={() => { switchRole('CAFE'); navigate('/dashboard/overview'); }}
            className="px-3 py-1.5 rounded-xl bg-[#0b1312] text-emerald-300 text-xs font-bold hover:text-emerald-100 transition-colors border border-emerald-900"
          >
            سوئیچ به پنل کافه
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Customer Sidebar Nav */}
        <aside className="md:col-span-1 space-y-3">
          <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/60 space-y-3">
            <div className="border-b border-emerald-900/40 pb-3">
              <span className="text-[10px] text-emerald-400 block font-mono">حساب کاربری اختصاصی</span>
              <h3 className="text-sm font-bold text-emerald-100">{user?.name}</h3>
              <span className="text-xs font-mono text-emerald-300 dir-ltr block">{user?.phone}</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
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

        {/* Customer Main View */}
        <main className="md:col-span-4">
          {children}
        </main>
      </div>
    </div>
  );
};

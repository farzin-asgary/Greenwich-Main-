import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Button } from '../../shared/ui/Button';
import {
  Activity,
  Users,
  Tag,
  QrCode,
  MessageSquare,
  Home,
  LogOut,
  Coffee,
  MenuSquare,
  Store,
  Settings,
  UserCheck,
  ChevronDown,
  Menu,
  Clock
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNav = [
    { id: 'overview', path: '/dashboard', label: 'نمای کلی', icon: Activity, exact: true },
    { id: 'menu', path: '/dashboard/menu', label: 'منو', icon: MenuSquare, exact: false },
    { id: 'customers', path: '/dashboard/customers', label: 'مشتریان', icon: Users, exact: false },
    { id: 'visits', path: '/dashboard/visits', label: 'مراجعات', icon: Clock, exact: false },
    { id: 'offers', path: '/dashboard/offers', label: 'پیشنهادها و کوپن‌ها', icon: Tag, exact: false },
    { id: 'tables', path: '/dashboard/tables', label: 'میزها و QR', icon: QrCode, exact: false },
    { id: 'feedback', path: '/dashboard/feedback', label: 'بازخورد', icon: MessageSquare, exact: false }
  ];

  const adminNav = [
    { id: 'branches', path: '/dashboard/branches', label: 'کافه و شعب', icon: Store, exact: false },
    { id: 'staff', path: '/dashboard/staff', label: 'کارکنان', icon: UserCheck, exact: false },
    { id: 'settings', path: '/dashboard/settings', label: 'تنظیمات', icon: Settings, exact: false }
  ];

  const checkIsActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const NavItem: React.FC<{ item: any }> = ({ item }) => {
    const isActive = checkIsActive(item.path, item.exact);
    const Icon = item.icon;
    return (
      <Link
        to={item.path}
        onClick={() => setMobileMenuOpen(false)}
        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
          isActive
            ? 'bg-[#2d6a4f] text-[#fbf9f5] shadow-md border border-[#d4af37]/40'
            : 'text-emerald-300/70 hover:bg-[#121e1c] hover:text-emerald-100'
        }`}
      >
        <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : ''}`} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col dir-rtl">
      {/* Top Emerald Header */}
      <header className="bg-[#121e1c] border-b border-emerald-800/40 px-4 md:px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-5 h-5 text-emerald-300" />
            </Button>
          </div>
          <GreenwichLogo size="sm" showSubtext={false} />
          
          <div className="h-6 w-px bg-emerald-800/60 hidden sm:block"></div>
          
          {/* Branch Switcher */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#1b4332]/50 transition-colors border border-transparent hover:border-emerald-800/60">
            <Coffee className="w-4 h-4 text-[#d4af37]" />
            <div className="text-right">
              <span className="text-[10px] text-emerald-400 block font-bold">کافه نادری</span>
              <span className="text-xs text-emerald-100 font-bold block">شعبه جمهوری</span>
            </div>
            <ChevronDown className="w-3 h-3 text-emerald-500 ml-1" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/g/demo-table-12')}
            leftIcon={<Home className="w-3.5 h-3.5" />}
            className="hidden sm:flex border-[#d4af37]/30 text-[#d4af37]"
          >
            اپلیکیشن مهمان
          </Button>
          
          {/* User Profile */}
          <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center border border-emerald-700 cursor-pointer">
            <span className="text-xs font-bold text-emerald-100">ع.ع</span>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex gap-6 relative">
        {/* Sidebar Nav */}
        <aside className={`md:w-64 space-y-4 shrink-0 absolute md:static z-20 top-0 right-0 h-[calc(100vh-65px)] md:h-auto bg-[#0b1312] md:bg-transparent p-4 md:p-0 border-l border-emerald-900/60 md:border-none transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <div className="greenwich-card rounded-2xl p-3 border border-emerald-900/60 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-emerald-500/70">عملیات</div>
            {mainNav.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
            
            <div className="px-3 pt-4 pb-2 text-[10px] font-bold text-emerald-500/70">مدیریت</div>
            {adminNav.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>

          <div className="bg-[#121e1c] p-4 rounded-2xl border border-emerald-900/60 text-[11px] text-emerald-400/80 space-y-1">
            <span className="font-bold text-[#d4af37] block">گرینویچ کلاب نسخه ۲.۰</span>
            <p className="text-emerald-500">پلتفرم مدیریت هوشمند کافه</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

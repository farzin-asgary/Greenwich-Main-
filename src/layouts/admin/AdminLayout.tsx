import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { useAuth } from '../../app/auth/AuthContext';
import { Shield, Building2, GitBranch, Users, UserCheck, FileText, Activity, HelpCircle, Settings, Coffee, Home } from 'lucide-react';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, switchRole } = useAuth();

  const navItems = [
    { path: '/admin-panel/overview', label: 'نمای کلی پلتفرم', icon: Shield },
    { path: '/admin-panel/organizations', label: 'کافه‌ها و سازمان‌ها', icon: Building2 },
    { path: '/admin-panel/branches', label: 'شعبه‌ها و میزها', icon: GitBranch },
    { path: '/admin-panel/users', label: 'کاربران و پرسنل', icon: Users },
    { path: '/admin-panel/guests', label: 'مدیریت مشتریان و PII', icon: UserCheck },
    { path: '/admin-panel/content', label: 'نظارت بر محتوا', icon: FileText },
    { path: '/admin-panel/activity', label: 'فعالیت‌های سیستم', icon: Activity },
    { path: '/admin-panel/support', label: 'پشتیبانی کافه‌ها', icon: HelpCircle },
    { path: '/admin-panel/settings', label: 'تنظیمات پلتفرم', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070d0c] text-emerald-50 flex flex-col font-['Vazirmatn',sans-serif] dir-rtl">
      {/* Top Header */}
      <header className="bg-[#0b1312] border-b border-emerald-900/80 px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <GreenwichLogo size="sm" showSubtext={false} />
          </Link>
          <div className="h-5 w-px bg-emerald-800/60 hidden sm:block"></div>
          <span className="text-xs font-bold text-[#d4af37] hidden sm:inline-flex items-center gap-1.5 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700/50">
            <Shield className="w-3.5 h-3.5" />
            پنل مدیریت ارشد پلتفرم گرینویچ کلاب
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { switchRole('CAFE'); navigate('/dashboard/overview'); }}
            className="px-3 py-1.5 rounded-xl bg-[#1b4332] text-emerald-300 text-xs font-bold hover:text-emerald-100 transition-colors border border-emerald-800"
          >
            پنل کافه
          </button>
          <button
            onClick={() => { switchRole('CONTENT_WRITER'); navigate('/content-studio/dashboard'); }}
            className="px-3 py-1.5 rounded-xl bg-[#121e1c] text-emerald-300 text-xs font-bold hover:text-emerald-100 transition-colors border border-emerald-900"
          >
            استودیو نویسنده
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Admin Sidebar */}
        <aside className="md:col-span-1 space-y-3">
          <div className="greenwich-card rounded-2xl p-4 border border-emerald-900/80 space-y-3 bg-[#0b1312]">
            <div className="border-b border-emerald-900/60 pb-3">
              <span className="text-[10px] text-[#d4af37] block font-mono font-bold">Platform Super Admin</span>
              <h3 className="text-sm font-bold text-emerald-100">{user?.name}</h3>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#1b4332] text-[#d4af37] border border-[#d4af37]/50 shadow-sm'
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

        {/* Admin Content Area */}
        <main className="md:col-span-4">
          {children}
        </main>
      </div>
    </div>
  );
};

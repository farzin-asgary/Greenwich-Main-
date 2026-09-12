import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { useAuth } from '../../app/auth/AuthContext';
import { UserRole } from '../../app/permissions';
import { Coffee, ArrowLeft, Shield, User, Store, PenTool, LayoutDashboard, Sparkles } from 'lucide-react';

export const PublicLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { path: '/features', label: 'قابلیت‌ها' },
    { path: '/pricing', label: 'قیمت‌گذاری' },
    { path: '/for-cafes', label: 'ویژه کافه‌ها' },
    { path: '/interactive-personas', label: 'پرسوناهای روایی' },
    { path: '/about', label: 'درباره ما' },
    { path: '/blog', label: 'وبلاگ' },
    { path: '/contact', label: 'تماس و دمو' },
  ];

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col font-['Vazirmatn',sans-serif] dir-rtl selection:bg-[#d4af37] selection:text-black">
            {/* Main Public Header */}
      <header className="sticky top-0 z-40 bg-[#0b1312]/90 backdrop-blur-md border-b border-emerald-900/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <GreenwichLogo size="sm" showSubtext={true} />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-emerald-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-[#d4af37] ${
                  location.pathname === link.path ? 'text-[#d4af37] font-bold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-bold text-emerald-200 hover:text-[#d4af37] transition-colors px-3 py-2"
            >
              ورود به سامانه
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-[#fbf9f5] font-bold text-xs hover:brightness-110 transition-all border border-[#d4af37]/40 shadow-md flex items-center gap-1.5"
            >
              <span>درخواست دمو</span>
              <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Public Footer */}
      <footer className="bg-[#070d0c] border-t border-emerald-950 py-12 px-6 text-xs text-emerald-400/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <GreenwichLogo size="sm" showSubtext={true} />
            <p className="text-emerald-300/70 leading-relaxed max-w-sm">
              پلتفرم هوشمند مدیریت زمان و تجربه مشتری در کافه. گرینویچ کلاب به کافه‌ها کمک می‌کند مراجعه‌کنندگان پای میز را شناسایی کنند و ارتباط ماندگار بسازند.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#d4af37] text-sm">محصول</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-emerald-100">قابلیت‌ها</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-100">قیمت‌گذاری</Link></li>
              <li><Link to="/for-cafes" className="hover:text-emerald-100">ویژه کافه‌ها</Link></li>
              <li><Link to="/g/demo-table-12" className="hover:text-emerald-100">دموی زنده میز کافه</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#d4af37] text-sm">شرکت و ارتباط</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-emerald-100">درباره گرینویچ</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-100">وبلاگ و مقالات</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-100">تماس با ما</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#d4af37] text-sm">قوانین و پلتفرم</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-emerald-100">حریم خصوصی</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-100">شرایط استفاده</Link></li>
              <li><Link to="/login" className="hover:text-emerald-100">ورود اعضا و پرسنل</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-500/80 text-[11px]">
          <span>© ۱۴۰۳ گرینویچ کلاب (Greenwich Club) — تمامی حقوق محفوظ است.</span>
          <span>طراحی شده برای کافه‌های پیشرو و فضاهای تعاملی</span>
        </div>
      </footer>
    </div>
  );
};

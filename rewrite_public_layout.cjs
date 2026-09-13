const fs = require('fs');

const code = `
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GreenwichLogo } from '../../shared/ui/GreenwichLogo';
import { Phone, MapPin, UserRound, Menu, X } from 'lucide-react';

export const PublicLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'خانه' },
    { path: '/interactive-personas', label: 'راویان' },
    { path: '/pricing', label: 'تعرفه‌ها' },
    { path: '/blog', label: 'وبلاگ' },
    { path: '/about', label: 'درباره ما' },
    { path: '/contact', label: 'تماس با ما' },
  ];

  return (
    <div className="min-h-screen bg-[#0b1312] text-emerald-50 flex flex-col font-['Vazirmatn',sans-serif] dir-rtl selection:bg-[#d4af37] selection:text-black">
      
      {/* Two-Tier Header Architecture */}
      <header className="w-full z-50">
        
        {/* Top Tier: Brand & Contact & Actions */}
        <div className="bg-[#050a09] border-b border-emerald-950/60 hidden lg:block">
          <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <GreenwichLogo size="md" showSubtext={false} />
            </Link>

            {/* Middle: Contact Info */}
            <div className="flex items-center gap-12 pr-12 text-sm">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-emerald-900/50 flex items-center justify-center text-emerald-400 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-emerald-100 font-['Playfair_Display',serif]">موقعیت ما</p>
                  <p className="text-xs text-emerald-500 font-mono dir-ltr text-right">Tehran, IR</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-emerald-900/50 flex items-center justify-center text-emerald-400 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-emerald-100 font-['Playfair_Display',serif]">پشتیبانی و فروش</p>
                  <p className="text-xs text-emerald-500 font-mono dir-ltr text-right">+98 21 000 0000</p>
                </div>
              </div>
            </div>

            {/* Actions: Button & Login Avatar */}
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-[2rem] border border-emerald-700/50 hover:border-[#d4af37] text-emerald-100 hover:text-[#d4af37] font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#d4af37]/5"
              >
                درخواست دمو
              </Link>
              <Link 
                to="/login"
                className="w-12 h-12 rounded-full bg-emerald-900/20 border border-emerald-900/50 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] text-emerald-100 transition-all overflow-hidden group"
                title="ورود به سامانه"
              >
                <UserRound className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile Header (Unified) */}
        <div className="lg:hidden bg-[#050a09] border-b border-emerald-900/50 px-4 h-20 flex items-center justify-between sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-3">
            <GreenwichLogo size="sm" showSubtext={false} />
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="w-10 h-10 rounded-full bg-emerald-900/20 border border-emerald-900/50 flex items-center justify-center text-emerald-100"
            >
              <UserRound className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-emerald-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Bottom Tier: Navigation Bar (Desktop) */}
        <div className={\`hidden lg:block w-full transition-all duration-300 \${isScrolled ? 'fixed top-0 bg-[#0b1312]/95 backdrop-blur-md shadow-2xl border-b border-emerald-900/50' : 'bg-[#0b1312] border-b border-emerald-900/20'}\`}>
          <div className="max-w-[1400px] mx-auto px-6 flex justify-center">
            <nav className="flex items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || 
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={\`relative px-8 py-5 text-[13px] font-bold uppercase tracking-widest transition-colors \${
                      isActive ? 'text-[#d4af37]' : 'text-emerald-100 hover:text-emerald-50'
                    }\`}
                  >
                    {link.label}
                    {/* Active Indicator Underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]"></span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0b1312] border-b border-emerald-900/50 py-4 px-6 space-y-4 shadow-2xl z-40">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={\`block py-2 text-sm font-bold \${
                  location.pathname === link.path ? 'text-[#d4af37]' : 'text-emerald-100'
                }\`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-emerald-900/30">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 rounded-xl border border-[#d4af37] text-[#d4af37] font-bold text-sm"
              >
                درخواست دمو
              </Link>
            </div>
          </div>
        )}

      </header>

      {/* Main Page Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Public Footer */}
      <footer className="bg-[#050a09] border-t border-emerald-950 py-16 px-6 text-xs text-emerald-400/80">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 space-y-6">
            <GreenwichLogo size="md" showSubtext={false} />
            <p className="text-emerald-300/70 leading-relaxed text-justify">
              پلتفرم هوشمند مدیریت زمان و تجربه مشتری در کافه. گرینویچ کلاب به کافه‌ها کمک می‌کند مراجعه‌کنندگان پای میز را شناسایی کنند و ارتباط ماندگار بسازند.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-[#d4af37] text-sm font-['Playfair_Display',serif]">محصول</h4>
            <ul className="space-y-3">
              <li><Link to="/interactive-personas" className="hover:text-[#d4af37] transition-colors">راویان گرینویچ</Link></li>
              <li><Link to="/pricing" className="hover:text-[#d4af37] transition-colors">تعرفه‌ها</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4af37] transition-colors">درخواست دمو</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-[#d4af37] text-sm font-['Playfair_Display',serif]">شرکت</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-[#d4af37] transition-colors">درباره ما</Link></li>
              <li><Link to="/blog" className="hover:text-[#d4af37] transition-colors">وبلاگ و مقالات</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4af37] transition-colors">تماس با ما</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-[#d4af37] text-sm font-['Playfair_Display',serif]">قوانین</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="hover:text-[#d4af37] transition-colors">حریم خصوصی</Link></li>
              <li><Link to="/terms" className="hover:text-[#d4af37] transition-colors">شرایط استفاده</Link></li>
              <li><Link to="/login" className="hover:text-[#d4af37] transition-colors text-emerald-200">ورود به پنل مدیریت</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 mt-12 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-500/60 text-[11px]">
          <span>© ۱۴۰۳ گرینویچ کلاب (Greenwich Club) — تمامی حقوق محفوظ است.</span>
          <span>طراحی شده برای فضاهای تعاملی</span>
        </div>
      </footer>
    </div>
  );
};
`;

fs.writeFileSync('src/layouts/public/PublicLayout.tsx', code);

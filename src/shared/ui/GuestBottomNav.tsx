import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Headphones, Heart, Tag, User } from 'lucide-react';

export const GuestBottomNav: React.FC = () => {
  const navItems = [
    { to: '/app/home', label: 'خانه', icon: Home },
    { to: '/app/discover', label: 'مطالعه', icon: BookOpen },
    { to: '/app/audio', label: 'گوش کنید', icon: Headphones },
    { to: '/app/together', label: 'دونفره', icon: Heart },
    { to: '/app/offers', label: 'پیشنهادها', icon: Tag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto bg-[#0b1312]/95 border-t border-[#2d6a4f]/30 backdrop-blur-md py-2 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all px-2 py-1 rounded-xl ${
                  isActive
                    ? 'text-[#d4af37] font-bold bg-[#121e1c] border border-emerald-800/40'
                    : 'text-emerald-400/60 hover:text-emerald-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

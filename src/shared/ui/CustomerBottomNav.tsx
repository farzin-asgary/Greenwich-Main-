import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Coffee, BookOpen, User } from 'lucide-react';

export const CustomerBottomNav: React.FC = () => {
  const navItems = [
    { to: '/app/home', label: 'خانه', icon: Home },
    { to: '/app/discover', label: 'کشف', icon: Compass },
    { to: '/app/cafe', label: 'کافه', icon: Coffee },
    { to: '/app/library', label: 'کتابخانه', icon: BookOpen },
    { to: '/app/profile', label: 'من', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b1312]/95 border-t border-emerald-900/60 backdrop-blur-md pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#d4af37]'
                    : 'text-emerald-500/70 hover:text-emerald-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-full ${isActive ? 'bg-[#1b4332]/50' : ''}`}>
                    <Icon className={`w-5 h-5`} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                  <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

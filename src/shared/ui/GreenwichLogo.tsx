import React from 'react';

interface GreenwichLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export const GreenwichLogo: React.FC<GreenwichLogoProps> = ({ size = 'md', showSubtext = true }) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-xs' }
  }[size];

  return (
    <div className="flex flex-col items-center justify-center text-center select-none">
      <div className={`relative ${sizeClasses.icon} flex items-center justify-center mb-1`}>
        {/* Meridian Compass Ring */}
        <div className="absolute inset-0 rounded-full border border-[#d4af37]/60 animate-pulse"></div>
        <div className="absolute inset-[3px] rounded-full border border-dashed border-[#2d6a4f]"></div>
        {/* Compass Meridian Symbol */}
        <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 text-[#d4af37] fill-current">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <span className={`font-bold tracking-wider text-[#d4af37] font-['Playfair_Display',serif] ${sizeClasses.text}`}>
          GREENWICH
        </span>
        {showSubtext && (
          <span className={`tracking-[0.25em] text-emerald-200/70 uppercase font-medium -mt-1 ${sizeClasses.sub}`}>
            C L U B
          </span>
        )}
      </div>
    </div>
  );
};

import React from 'react';

interface MidasLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const MidasLogo: React.FC<MidasLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const crownDimensions = {
    sm: { width: 22, height: 16 },
    md: { width: 30, height: 20 },
    lg: { width: 44, height: 30 },
  }[size];

  const textSize = {
    sm: 'text-sm tracking-[0.24em]',
    md: 'text-base sm:text-lg tracking-[0.26em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.3em]',
  }[size];

  const subSize = {
    sm: 'text-[8px] tracking-[0.35em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.42em]',
    lg: 'text-xs tracking-[0.48em]',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Stylized Imperial Crown Logo (Exact icon of Midas Gold Toledo) */}
      <svg
        width={crownDimensions.width}
        height={crownDimensions.height}
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-1 text-[#d4af37] filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
      >
        {/* Crown base band with pearls */}
        <path
          d="M6 26H42V29C42 29.5 41.5 30 41 30H7C6.5 30 6 29.5 6 29V26Z"
          fill="url(#goldGradient)"
        />
        <circle cx="12" cy="28" r="1.2" fill="#0b0c10" />
        <circle cx="20" cy="28" r="1.2" fill="#0b0c10" />
        <circle cx="28" cy="28" r="1.2" fill="#0b0c10" />
        <circle cx="36" cy="28" r="1.2" fill="#0b0c10" />

        {/* Crown peaks / fleur-de-lis peaks */}
        <path
          d="M6 25L9 11L18 19L24 5L30 19L39 11L42 25H6Z"
          fill="url(#goldGradient)"
          stroke="#f6e05e"
          strokeWidth="0.8"
        />

        {/* Pearls / Jewels on crown tips */}
        <circle cx="24" cy="4" r="2.2" fill="#fff" stroke="#d4af37" strokeWidth="0.8" />
        <circle cx="9" cy="10" r="1.8" fill="#fff" stroke="#d4af37" strokeWidth="0.8" />
        <circle cx="39" cy="10" r="1.8" fill="#fff" stroke="#d4af37" strokeWidth="0.8" />
        <circle cx="18" cy="18" r="1.4" fill="#f3e5ab" />
        <circle cx="30" cy="18" r="1.4" fill="#f3e5ab" />

        {/* Center imperial fleur-de-lis accent inside the crown */}
        <path
          d="M24 10C23 13 22 15 22 18H26C26 15 25 13 24 10Z"
          fill="#0b0c10"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldGradient" x1="6" y1="5" x2="42" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f7ebc3" />
            <stop offset="0.35" stopColor="#d4af37" />
            <stop offset="0.7" stopColor="#b8860b" />
            <stop offset="1" stopColor="#ecc94b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Title: MIDAS GOLD */}
      <span className={`font-display font-bold text-[#f5ebd7] leading-none whitespace-nowrap ${textSize}`}>
        MIDAS GOLD
      </span>

      {/* Subtitle: TOLEDO */}
      {showSubtitle && (
        <div className="flex items-center gap-2 mt-1">
          <span className="w-3 sm:w-5 h-[0.8px] bg-gradient-to-r from-transparent to-[#d4af37]"></span>
          <span className={`font-display font-medium text-[#d4af37] uppercase leading-none whitespace-nowrap ${subSize}`}>
            TOLEDO
          </span>
          <span className="w-3 sm:w-5 h-[0.8px] bg-gradient-to-l from-transparent to-[#d4af37]"></span>
        </div>
      )}
    </div>
  );
};

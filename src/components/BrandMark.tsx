import React from 'react';
import { BRAND } from '../data/brand';

interface BrandMarkProps {
  tone?: 'light' | 'dark';
  size?: 'nav' | 'footer';
}

export const BrandMark: React.FC<BrandMarkProps> = ({ tone = 'light', size = 'nav' }) => {
  const textColor = tone === 'light' ? 'text-white' : 'text-[#19344B]';

  const emblemSize =
    size === 'footer'
      ? 'w-16 h-16 sm:w-20 sm:h-20'
      : 'w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14';
  const textSize =
    size === 'footer'
      ? 'text-xl sm:text-2xl tracking-[0.06em]'
      : 'text-sm sm:text-base md:text-xl tracking-[0.06em]';

  return (
    <span className="inline-flex items-center gap-3 sm:gap-4 whitespace-nowrap shrink-0 select-none">
      <img
        src={BRAND.logoSrc}
        alt="Plumbing In Style official logo"
        referrerPolicy="no-referrer"
        className={`${emblemSize} rounded-full object-cover shrink-0 block`}
      />
      <span
        className={`font-display font-extrabold uppercase leading-none ${textSize} ${textColor} transition-colors duration-200`}
      >
        PLUMBING IN STYLE
      </span>
    </span>
  );
};

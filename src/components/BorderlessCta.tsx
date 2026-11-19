import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BorderlessCtaProps {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  tone?: 'light' | 'navy' | 'copper';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  className?: string;
  ariaLabel?: string;
}

export const BorderlessCta: React.FC<BorderlessCtaProps> = ({
  label,
  href,
  external = false,
  onClick,
  tone = 'navy',
  size = 'md',
  type = 'button',
  className = '',
  ariaLabel,
}) => {
  const toneClasses =
    tone === 'light'
      ? 'text-white hover:text-[#BEA16B]'
      : tone === 'copper'
        ? 'text-[#B97851] hover:text-[#19344B]'
        : 'text-[#19344B] hover:text-[#B97851]';

  const sizeClasses =
    size === 'sm'
      ? 'text-xs'
      : size === 'lg'
        ? 'text-sm md:text-base'
        : 'text-xs md:text-sm';

  const content = (
    <>
      <span className="whitespace-nowrap">{label}</span>
      <ArrowRight className="cta-arrow w-4 h-4 shrink-0" aria-hidden="true" />
    </>
  );

  const combinedClass = `cta-borderless min-h-[44px] ${toneClasses} ${sizeClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={(e) => {
          if (onClick && !external) {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={ariaLabel}
        className={combinedClass}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={combinedClass}>
      {content}
    </button>
  );
};

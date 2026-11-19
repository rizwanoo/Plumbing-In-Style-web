import React from 'react';
import { BRAND, PageRoute } from '../data/brand';
import { BrandMark } from './BrandMark';
import { BorderlessCta } from './BorderlessCta';

interface FooterProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#19344B] text-white border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                aria-label="Plumbing In Style Home"
              >
                <BrandMark tone="light" size="footer" />
              </a>
              <p className="mt-5 font-display text-xl md:text-2xl font-semibold text-white/95 max-w-md leading-snug">
                {BRAND.tagline}
              </p>
              <p className="mt-3 text-sm text-white/75 max-w-md leading-relaxed">
                {BRAND.displayIdentity} — Residential and commercial plumbing services covering repairs,
                installations, and renovations across New York, New Jersey, and Connecticut.
              </p>
            </div>

            <div>
              <BorderlessCta
                label="Message Us On Instagram"
                href={BRAND.instagramUrl}
                external
                tone="light"
                size="md"
              />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.14em] text-[#BEA16B] font-semibold">
              Navigation
            </h2>
            <ul className="mt-5 space-y-3 list-none p-0 m-0 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="text-white/85 hover:text-[#BEA16B] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="text-white/85 hover:text-[#BEA16B] transition-colors"
                >
                  Plumbing Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="text-white/85 hover:text-[#BEA16B] transition-colors"
                >
                  About &amp; Our Work
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="text-white/85 hover:text-[#BEA16B] transition-colors"
                >
                  Contact &amp; Service Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Scope Column */}
          <div className="lg:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.14em] text-[#BEA16B] font-semibold">
              Service Scope &amp; Regions
            </h2>
            <div className="mt-5 space-y-4 text-sm text-white/80">
              <div>
                <p className="font-semibold text-white">Sectors</p>
                <p className="mt-1 text-white/75">Residential · Commercial</p>
              </div>
              <div>
                <p className="font-semibold text-white">Confirmed Services</p>
                <p className="mt-1 text-white/75">Repairs · Installations · Renovations</p>
              </div>
              <div>
                <p className="font-semibold text-white">Official Service Area</p>
                <p className="mt-1 text-white/75">New York (NY) · New Jersey (NJ) · Connecticut (CT)</p>
              </div>
              <div>
                <p className="font-semibold text-white">Direct Contact</p>
                <p className="mt-1 text-white/75">
                  Instagram Direct Message ({BRAND.instagramHandle})
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p className="m-0">
            © {new Date().getFullYear()} Plumbing In Style — Tiffany. Serving NY, NJ &amp; CT.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <p className="m-0">
              Official Instagram:{' '}
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-[#BEA16B] underline underline-offset-4"
              >
                @plumbinginstyle
              </a>
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              className="bg-transparent border-none p-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#BEA16B] hover:text-white cursor-pointer transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BRAND, PageRoute } from '../data/brand';
import { BrandMark } from './BrandMark';
import { BorderlessCta } from './BorderlessCta';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const SERVICE_DROPDOWN_ITEMS = [
  { label: 'Residential Plumbing', hash: '#residential' },
  { label: 'Commercial Plumbing', hash: '#commercial' },
  { label: 'Repairs', hash: '#repairs' },
  { label: 'Installations', hash: '#installations' },
  { label: 'Renovations', hash: '#renovations' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownTimerRef = useRef<number | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openDropdown = () => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setDropdownOpen(true);
  };

  const closeDropdownDelayed = () => {
    dropdownTimerRef.current = window.setTimeout(() => {
      setDropdownOpen(false);
    }, 160);
  };

  const handleLinkClick = (route: PageRoute, hash?: string) => {
    setDropdownOpen(false);
    setMobileOpen(false);
    onNavigate(route, hash);
  };

  const isLightHeader = scrolled || mobileOpen;
  const linkColor = isLightHeader
    ? 'text-[#19344B] hover:text-[#B97851]'
    : 'text-white/95 hover:text-[#BEA16B]';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLightHeader
            ? 'bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#19344B]/12 py-3'
            : 'bg-gradient-to-b from-[#19344B]/65 via-[#19344B]/25 to-transparent py-5'
        }`}
      >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="focus-visible:outline-2 focus-visible:outline-[#B97851] focus-visible:outline-offset-4"
          aria-label="Plumbing In Style Home"
        >
          <BrandMark tone={isLightHeader ? 'dark' : 'light'} size="nav" />
        </a>

        {/* Zone 2: Desktop Single-Line Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-[0.1em] uppercase"
        >
          <a
            href="/"
            data-active={currentRoute === '/'}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className={`nav-editorial-link py-2 ${linkColor}`}
          >
            Home
          </a>

          {/* Services with hover/keyboard persistent dropdown */}
          <div
            ref={dropdownContainerRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdownDelayed}
          >
            <div className="inline-flex items-center gap-1">
              <a
                href="/services"
                data-active={currentRoute === '/services'}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/services');
                }}
                onFocus={openDropdown}
                className={`nav-editorial-link py-2 ${linkColor}`}
              >
                Services
              </a>
              <button
                type="button"
                aria-label="Toggle Services Submenu"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`p-1 bg-transparent border-none cursor-pointer transition-transform duration-200 ${linkColor} ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {dropdownOpen && (
              <div
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdownDelayed}
                className="absolute left-0 top-full pt-3 min-w-[240px] z-50"
              >
                <div
                  role="menu"
                  aria-label="Plumbing Services"
                  className="bg-[#FAF8F4] border-t-2 border-[#B97851] shadow-xl py-3 px-5 flex flex-col gap-1"
                >
                  {SERVICE_DROPDOWN_ITEMS.map((item) => (
                    <a
                      key={item.hash}
                      role="menuitem"
                      href={`/services${item.hash}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('/services', item.hash);
                      }}
                      className="py-2 text-xs font-semibold tracking-[0.06em] uppercase text-[#19344B] hover:text-[#B97851] border-b border-[#19344B]/8 last:border-b-0 transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="/services#residential"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/services', '#residential');
            }}
            className={`nav-editorial-link py-2 ${linkColor}`}
          >
            Residential &amp; Commercial
          </a>

          <a
            href="/about"
            data-active={currentRoute === '/about'}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/about');
            }}
            className={`nav-editorial-link py-2 ${linkColor}`}
          >
            About
          </a>

          <a
            href="/contact"
            data-active={currentRoute === '/contact'}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/contact');
            }}
            className={`nav-editorial-link py-2 ${linkColor}`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Borderless Action & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:block">
            <BorderlessCta
              label="Message Us"
              href={BRAND.instagramUrl}
              external
              tone={isLightHeader ? 'navy' : 'light'}
              size="sm"
              ariaLabel="Message Plumbing In Style on Instagram"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] bg-transparent border-none cursor-pointer ${
              isLightHeader ? 'text-[#19344B]' : 'text-white'
            }`}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      </header>

      {/* Full-Height Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[#FAF8F4] text-[#19344B] px-6 py-8 overflow-y-auto flex flex-col justify-between z-40"
        >
          <nav className="flex flex-col divide-y divide-[#19344B]/12">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className="py-4 font-display text-2xl font-bold tracking-tight text-[#19344B] hover:text-[#B97851]"
            >
              Home
            </a>

            <div className="py-4">
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/services');
                }}
                className="font-display text-2xl font-bold tracking-tight text-[#19344B] hover:text-[#B97851] block"
              >
                Services
              </a>
              <div className="mt-3 pl-4 flex flex-col gap-2.5">
                {SERVICE_DROPDOWN_ITEMS.map((item) => (
                  <a
                    key={item.hash}
                    href={`/services${item.hash}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/services', item.hash);
                    }}
                    className="text-sm font-medium text-[#3D474D] hover:text-[#B97851]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/services#residential"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/services', '#residential');
              }}
              className="py-4 font-display text-2xl font-bold tracking-tight text-[#19344B] hover:text-[#B97851]"
            >
              Residential &amp; Commercial
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/about');
              }}
              className="py-4 font-display text-2xl font-bold tracking-tight text-[#19344B] hover:text-[#B97851]"
            >
              About &amp; Our Work
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact');
              }}
              className="py-4 font-display text-2xl font-bold tracking-tight text-[#19344B] hover:text-[#B97851]"
            >
              Contact &amp; Service Areas
            </a>
          </nav>

          <div className="pt-8 border-t border-[#19344B]/15">
            <p className="text-xs uppercase tracking-[0.14em] text-[#527B91] font-semibold">
              NY · NJ · CT — Direct Enquiry
            </p>
            <div className="mt-2">
              <BorderlessCta
                label="Message Us On Instagram"
                href={BRAND.instagramUrl}
                external
                tone="copper"
                size="lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

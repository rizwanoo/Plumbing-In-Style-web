import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, MEDIA_ASSETS, PageRoute, SERVICE_SECTIONS } from '../data/brand';
import { BorderlessCta } from '../components/BorderlessCta';
import { EditorialImage } from '../components/EditorialImage';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-hero-item', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.service-band').forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={rootRef}>
      {/* Page Hero Header (Transparent Navbar Sits Over Full-Width Image) */}
      <section className="relative min-h-[64vh] flex items-end pb-14 md:pb-20 pt-36 overflow-hidden bg-[#19344B]">
        <div className="absolute inset-0">
          <img
            src={MEDIA_ASSETS.installationManifold.src}
            alt={MEDIA_ASSETS.installationManifold.alt}
            loading="eager"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#19344B]/92 via-[#19344B]/74 to-[#19344B]/38"
          />
        </div>

        <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          <p className="services-hero-item text-xs font-semibold uppercase tracking-[0.18em] text-[#EAD6AC]">
            Residential · Commercial · NY · NJ · CT
          </p>
          <h1 className="services-hero-item mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight max-w-3xl text-balance">
            Plumbing Services Built For Clean Finishes
          </h1>
          <p className="services-hero-item mt-5 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
            {BRAND.displayIdentity} provides residential and commercial plumbing repairs,
            installations, and renovations. {BRAND.tagline}
          </p>
        </div>
      </section>

      {/* Borderless Editorial Jump Navigation */}
      <div className="bg-[#FAF8F4] border-b border-[#19344B]/12">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 min-w-max">
            {SERVICE_SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpToSection(item.id)}
                className="bg-transparent border-none p-0 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B] hover:text-[#B97851] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="text-[#B97851] mr-2 tabular-nums">{item.number}.</span>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alternating Editorial Service Sections */}
      {SERVICE_SECTIONS.map((section, index) => {
        const isDark = section.surface === 'navy';
        const bgClass =
          section.surface === 'navy'
            ? 'bg-[#19344B] text-white'
            : section.surface === 'stone'
              ? 'bg-[#EDEBE6] text-[#26343D]'
              : section.surface === 'pale-blue'
                ? 'bg-[#E7EEF1] text-[#26343D]'
                : 'bg-[#FAF8F4] text-[#26343D]';

        const headingColor = isDark ? 'text-white' : 'text-[#19344B]';
        const bodyColor = isDark ? 'text-white/80' : 'text-[#3D474D]';
        const kickerColor = isDark ? 'text-[#BEA16B]' : 'text-[#B97851]';
        const dividerColor = isDark ? 'border-white/15' : 'border-[#19344B]/12';
        const imageFirst = index % 2 === 1;

        return (
          <section
            key={section.id}
            id={section.id}
            className={`${bgClass} py-20 md:py-28 scroll-mt-24`}
          >
            <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="service-band grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div
                  className={`lg:col-span-6 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${kickerColor}`}>
                    <span className="tabular-nums mr-2">{section.number}</span>
                    <span aria-hidden="true">·</span>
                    <span className="ml-2">{section.sectorTag}</span>
                  </p>
                  <h2
                    className={`mt-4 font-display font-bold text-3xl md:text-4xl leading-tight ${headingColor}`}
                  >
                    {section.title}
                  </h2>
                  <p className={`mt-5 text-base md:text-lg leading-relaxed ${bodyColor}`}>
                    {section.summary}
                  </p>

                  <ul
                    className={`mt-8 divide-y ${dividerColor} border-t border-b ${dividerColor} list-none p-0 m-0`}
                  >
                    {section.scopeNotes.map((note) => (
                      <li key={note} className={`py-3.5 text-sm font-medium ${bodyColor}`}>
                        {note}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-8">
                    <BorderlessCta
                      label="Message Us On Instagram"
                      href={BRAND.instagramUrl}
                      external
                      tone={isDark ? 'light' : 'copper'}
                    />
                    <BorderlessCta
                      label="Request Project Enquiry"
                      href="/contact"
                      onClick={() => onNavigate('/contact')}
                      tone={isDark ? 'light' : 'navy'}
                      size="sm"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 ${imageFirst ? 'lg:order-1' : 'lg:order-2'} ${
                    section.id === 'renovations' ? 'aspect-[3/4] max-h-[560px]' : 'aspect-[4/3]'
                  }`}
                >
                  <EditorialImage
                    src={section.image.src}
                    alt={section.image.alt}
                    caption={section.image.caption}
                    captionTone={isDark ? 'light' : 'dark'}
                    className="h-full"
                  />
                </div>
              </div>

              {/* Extra Commercial Mechanical Pair on Commercial Section */}
              {section.id === 'commercial' && (
                <div className="service-band mt-16 pt-14 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 aspect-[4/3]">
                    <EditorialImage
                      src={MEDIA_ASSETS.commercialMechanical.src}
                      alt={MEDIA_ASSETS.commercialMechanical.alt}
                      caption={MEDIA_ASSETS.commercialMechanical.caption}
                      captionTone="light"
                      className="h-full"
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#BEA16B]">
                      Commercial Infrastructure
                    </p>
                    <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-white">
                      Orderly Piping &amp; Isolation Systems
                    </h3>
                    <p className="mt-4 text-base text-white/80 leading-relaxed">
                      Whether updating washroom fixtures or servicing commercial plumbing lines, every
                      installation is approached with clear routing and reliable shut-off access.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

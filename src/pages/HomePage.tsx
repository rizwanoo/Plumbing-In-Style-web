import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, MEDIA_ASSETS, PageRoute } from '../data/brand';
import { BorderlessCta } from '../components/BorderlessCta';
import { EditorialImage } from '../components/EditorialImage';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.to('.hero-parallax-img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-band').forEach((el) => {
        gsap.from(el, {
          y: 28,
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

  return (
    <div ref={rootRef}>
      {/* 1. Full-Bleed Cinematic Hero */}
      <section className="hero-section relative min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden bg-[#19344B]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={MEDIA_ASSETS.heroSmilingPlumber.src}
            alt={MEDIA_ASSETS.heroSmilingPlumber.alt}
            loading="eager"
            decoding="sync"
            referrerPolicy="no-referrer"
            className="hero-parallax-img w-full h-[112%] -top-[6%] relative object-cover object-[72%_25%] md:object-center block"
          />
          {/* Local left-weighted scrim preserving bright sunlit interior & smiling professional on the right */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#19344B]/92 via-[#19344B]/62 to-[#19344B]/15 md:from-[#19344B]/88 md:via-[#19344B]/52 md:to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#19344B]/75 to-transparent"
          />
        </div>

        <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="hero-stagger text-xs font-semibold uppercase tracking-[0.18em] text-[#EAD6AC]">
              {BRAND.displayIdentity} · NY · NJ · CT
            </p>
            <h1 className="hero-stagger mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.06] tracking-tight text-balance">
              Plumbing Done Right.
              <br />
              Finished In Style.
            </h1>
            <p className="hero-stagger mt-6 text-base md:text-lg text-white/95 leading-relaxed max-w-[54ch]">
              Residential and commercial plumbing services across New York, New Jersey and Connecticut.{' '}
              <span className="text-[#FAF8F4] font-medium">{BRAND.tagline}</span>
            </p>

            <div className="hero-stagger mt-9 flex flex-wrap items-center gap-8">
              <BorderlessCta
                label="Explore Our Services"
                href="/services"
                onClick={() => onNavigate('/services')}
                tone="light"
                size="lg"
              />
              <BorderlessCta
                label="Message Us"
                href={BRAND.instagramUrl}
                external
                tone="light"
                size="lg"
                ariaLabel="Message Plumbing In Style on Instagram"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Introduction & Tri-State Positioning (Warm Ivory) */}
      <section className="bg-[#FAF8F4] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-band grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#527B91]">
                The Plumbing In Style Standard
              </p>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[#19344B] leading-[1.14] tracking-tight text-balance">
                {BRAND.tagline}
              </h2>
              <p className="mt-6 text-base md:text-lg text-[#3D474D] leading-relaxed max-w-2xl">
                Built around dependable craft and tidy architectural finishes, Plumbing In Style serves
                both residential homeowners and commercial properties with repairs, installations, and
                renovations across the tri-state region.
              </p>
              <div className="mt-8">
                <BorderlessCta
                  label="About Plumbing In Style"
                  href="/about"
                  onClick={() => onNavigate('/about')}
                  tone="navy"
                />
              </div>
            </div>

            <div className="lg:col-span-5 divide-y divide-[#19344B]/15 border-t border-b border-[#19344B]/15">
              <div className="py-5 flex items-baseline justify-between gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#527B91]">
                  Sectors
                </span>
                <span className="font-display font-semibold text-base text-[#19344B] text-right">
                  Residential · Commercial
                </span>
              </div>
              <div className="py-5 flex items-baseline justify-between gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#527B91]">
                  Services
                </span>
                <span className="font-display font-semibold text-base text-[#19344B] text-right">
                  Repairs · Installations · Renovations
                </span>
              </div>
              <div className="py-5 flex items-baseline justify-between gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#527B91]">
                  Service Area
                </span>
                <span className="font-display font-semibold text-base text-[#19344B] text-right">
                  NY · NJ · CT
                </span>
              </div>
              <div className="py-5 flex items-baseline justify-between gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#527B91]">
                  Direct Contact
                </span>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-base text-[#B97851] hover:text-[#19344B] transition-colors text-right"
                >
                  {BRAND.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Residential & Commercial Split Storytelling */}
      <section className="bg-[#EDEBE6]">
        <div className="reveal-band grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="min-h-[380px] lg:min-h-[540px]">
            <EditorialImage
              src={MEDIA_ASSETS.residentialKitchen.src}
              alt={MEDIA_ASSETS.residentialKitchen.alt}
              className="h-full"
            />
          </div>
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B97851]">
              Residential Plumbing
            </p>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl text-[#19344B] leading-tight text-balance">
              Thoughtful plumbing for everyday living spaces.
            </h2>
            <p className="mt-5 text-base text-[#3D474D] leading-relaxed max-w-lg">
              From kitchen and bathroom fixture upgrades to dependable repairs and full plumbing
              renovations, every residential visit prioritizes clean surfaces and lasting reliability.
            </p>
            <div className="mt-8">
              <BorderlessCta
                label="Residential Plumbing"
                href="/services#residential"
                onClick={() => onNavigate('/services', '#residential')}
                tone="navy"
              />
            </div>
          </div>
        </div>

        <div className="reveal-band grid grid-cols-1 lg:grid-cols-2 items-stretch bg-[#19344B] text-white">
          <div className="order-2 lg:order-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#BEA16B]">
              Commercial Plumbing
            </p>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl text-white leading-tight text-balance">
              Clean execution for commercial environments.
            </h2>
            <p className="mt-5 text-base text-white/80 leading-relaxed max-w-lg">
              Reliable commercial plumbing repairs, fixture installations, and workspace renovations
              engineered for tidy presentation and consistent performance across NY, NJ, and CT.
            </p>
            <div className="mt-8">
              <BorderlessCta
                label="Commercial Plumbing"
                href="/services#commercial"
                onClick={() => onNavigate('/services', '#commercial')}
                tone="light"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 min-h-[380px] lg:min-h-[540px]">
            <EditorialImage
              src={MEDIA_ASSETS.commercialWashroom.src}
              alt={MEDIA_ASSETS.commercialWashroom.alt}
              className="h-full"
            />
          </div>
        </div>
      </section>

      {/* 4. Confirmed Services Sequence: Repairs, Installations & Renovations (Pale Blue Grey) */}
      <section className="bg-[#E7EEF1] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-band flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#19344B]/15">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#527B91]">
                Core Disciplines
              </p>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-[#19344B] leading-tight">
                Repairs, Installations &amp; Renovations
              </h2>
            </div>
            <BorderlessCta
              label="View All Services"
              href="/services"
              onClick={() => onNavigate('/services')}
              tone="navy"
            />
          </div>

          {/* 01 Repairs — Asymmetric Left-Weighted Composition */}
          <div className="reveal-band grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-14 border-b border-[#19344B]/12">
            <div className="lg:col-span-6 aspect-[4/3]">
              <EditorialImage
                src={MEDIA_ASSETS.repairFitting.src}
                alt={MEDIA_ASSETS.repairFitting.alt}
                className="h-full"
              />
            </div>
            <div className="lg:col-span-6 lg:pl-6">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B97851] tabular-nums">
                01 · Repairs
              </span>
              <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-[#19344B]">
                Attentive Plumbing Repairs
              </h3>
              <p className="mt-4 text-base text-[#3D474D] leading-relaxed max-w-lg">
                Targeted repair service for residential and commercial plumbing lines, valves, and
                fixtures—executed cleanly without disruption to surrounding finishes.
              </p>
              <div className="mt-6">
                <BorderlessCta
                  label="Explore Repairs"
                  href="/services#repairs"
                  onClick={() => onNavigate('/services', '#repairs')}
                  tone="navy"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* 02 Installations — Wide Horizontal Editorial Composition */}
          <div className="reveal-band grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-14 border-b border-[#19344B]/12">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B97851] tabular-nums">
                02 · Installations
              </span>
              <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-[#19344B]">
                Precision Installations
              </h3>
              <p className="mt-4 text-base text-[#3D474D] leading-relaxed">
                Clean, aligned fixture and pipework installations where behind-the-wall order and
                visible hardware symmetry receive equal care.
              </p>
              <div className="mt-6">
                <BorderlessCta
                  label="Explore Installations"
                  href="/services#installations"
                  onClick={() => onNavigate('/services', '#installations')}
                  tone="navy"
                  size="sm"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 aspect-[16/9]">
              <EditorialImage
                src={MEDIA_ASSETS.installationManifold.src}
                alt={MEDIA_ASSETS.installationManifold.alt}
                className="h-full"
              />
            </div>
          </div>

          {/* 03 Renovations — Vertical Architectural Composition */}
          <div className="reveal-band grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-14">
            <div className="lg:col-span-5 aspect-[3/4] max-h-[540px]">
              <EditorialImage
                src={MEDIA_ASSETS.renovationShower.src}
                alt={MEDIA_ASSETS.renovationShower.alt}
                className="h-full"
              />
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B97851] tabular-nums">
                03 · Renovations
              </span>
              <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-[#19344B]">
                Bathroom &amp; Kitchen Renovations
              </h3>
              <p className="mt-4 text-base text-[#3D474D] leading-relaxed max-w-xl">
                Modern plumbing renovations for refreshed residential baths, kitchens, and commercial
                washrooms—built to deliver a clean, enduring finish.
              </p>
              <div className="mt-7 flex flex-wrap gap-8">
                <BorderlessCta
                  label="Explore Renovations"
                  href="/services#renovations"
                  onClick={() => onNavigate('/services', '#renovations')}
                  tone="navy"
                  size="sm"
                />
                <BorderlessCta
                  label="View Our Work"
                  href="/about"
                  onClick={() => onNavigate('/about')}
                  tone="copper"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Regional Coverage & Instagram Direct Enquiry Band (Warm Ivory) */}
      <section className="bg-[#FAF8F4] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-band grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 aspect-square">
              <EditorialImage
                src={MEDIA_ASSETS.detailBrass.src}
                alt={MEDIA_ASSETS.detailBrass.alt}
                className="h-full"
              />
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A9B98]">
                Serving New York · New Jersey · Connecticut
              </p>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[#19344B] leading-[1.14] text-balance">
                Ready to discuss your plumbing project?
              </h2>
              <p className="mt-5 text-base md:text-lg text-[#3D474D] leading-relaxed max-w-xl">
                Connect directly with {BRAND.displayIdentity} via Instagram Direct Message for
                residential or commercial repairs, installations, and renovations across NY, NJ, and CT.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-8">
                <BorderlessCta
                  label="Message Us On Instagram"
                  href={BRAND.instagramUrl}
                  external
                  tone="copper"
                  size="lg"
                />
                <BorderlessCta
                  label="Prepare Project Enquiry"
                  href="/contact"
                  onClick={() => onNavigate('/contact')}
                  tone="navy"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

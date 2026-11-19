import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BRAND, BrandMediaAsset, MEDIA_ASSETS, PageRoute } from '../data/brand';
import { BorderlessCta } from '../components/BorderlessCta';
import { EditorialImage } from '../components/EditorialImage';

gsap.registerPlugin(ScrollTrigger);

interface AboutWorkPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const GALLERY_FILTERS = [
  'All',
  'Residential',
  'Commercial',
  'Repairs',
  'Installations',
  'Renovations',
] as const;

type GalleryFilter = (typeof GALLERY_FILTERS)[number];

const ILLUSTRATIVE_GALLERY: BrandMediaAsset[] = [
  MEDIA_ASSETS.heroSmilingPlumber,
  MEDIA_ASSETS.heroBath,
  MEDIA_ASSETS.residentialKitchen,
  MEDIA_ASSETS.commercialWashroom,
  MEDIA_ASSETS.repairFitting,
  MEDIA_ASSETS.installationManifold,
  MEDIA_ASSETS.renovationShower,
  MEDIA_ASSETS.commercialMechanical,
  MEDIA_ASSETS.detailBrass,
];

export const AboutWorkPage: React.FC<AboutWorkPageProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('All');

  const filteredAssets = useMemo(() => {
    if (activeFilter === 'All') return ILLUSTRATIVE_GALLERY;
    return ILLUSTRATIVE_GALLERY.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-hero-item', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollTrack = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const delta = direction === 'next' ? 460 : -460;
    trackRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div ref={rootRef}>
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-end pb-14 md:pb-20 pt-36 overflow-hidden bg-[#19344B]">
        <div className="absolute inset-0">
          <img
            src={MEDIA_ASSETS.commercialWashroom.src}
            alt={MEDIA_ASSETS.commercialWashroom.alt}
            loading="eager"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#19344B]/88 via-[#19344B]/62 to-[#19344B]/30"
          />
        </div>

        <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          <p className="about-hero-item text-xs font-semibold uppercase tracking-[0.18em] text-[#EAD6AC]">
            {BRAND.displayIdentity}
          </p>
          <h1 className="about-hero-item mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight max-w-3xl text-balance">
            About Plumbing In Style &amp; Our Visual Craft
          </h1>
          <p className="about-hero-item mt-5 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
            {BRAND.tagline}
          </p>
        </div>
      </section>

      {/* Verified Brand Story (Warm Ivory) */}
      <section className="bg-[#FAF8F4] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="about-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#527B91]">
                Verified Brand Identity
              </p>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl text-[#19344B] leading-tight text-balance">
                A modern residential and commercial plumbing practice led with clarity.
              </h2>
              <p className="mt-6 text-base text-[#3D474D] leading-relaxed">
                Presented publicly as <strong>{BRAND.displayIdentity}</strong>, the brand focuses
                directly on three essential pillars: <strong>repairs</strong>,{' '}
                <strong>installations</strong>, and <strong>renovations</strong> for both
                residential homes and commercial spaces.
              </p>
              <p className="mt-4 text-base text-[#3D474D] leading-relaxed">
                Serving New York, New Jersey, and Connecticut, every enquiry begins directly through{' '}
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B97851] font-semibold underline underline-offset-4 hover:text-[#19344B]"
                >
                  {BRAND.instagramHandle}
                </a>{' '}
                on Instagram so clients receive clear, direct communication without middlemen.
              </p>

              <div className="mt-8 flex flex-wrap gap-8">
                <BorderlessCta
                  label="View Instagram Profile"
                  href={BRAND.instagramUrl}
                  external
                  tone="copper"
                />
                <BorderlessCta
                  label="Contact &amp; Service Areas"
                  href="/contact"
                  onClick={() => onNavigate('/contact')}
                  tone="navy"
                />
              </div>
            </div>

            <div className="lg:col-span-6 aspect-square max-h-[540px]">
              <EditorialImage
                src={MEDIA_ASSETS.detailBrass.src}
                alt={MEDIA_ASSETS.detailBrass.alt}
                caption="Illustrative architectural fixture detail — clean lines and surface care"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Honest Distinction: Live Instagram Work vs Illustrative Photography (Soft Stone) */}
      <section className="bg-[#EDEBE6] py-16 md:py-24 border-t border-b border-[#19344B]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="about-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B97851]">
                Authentic Work &amp; Transparency
              </p>
              <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl text-[#19344B] leading-snug">
                Verified Project Updates Live on Instagram
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base text-[#3D474D] leading-relaxed">
                Plumbing In Style shares real on-site posts, reels, and updates directly on{' '}
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#19344B] font-semibold underline underline-offset-4 hover:text-[#B97851]"
                >
                  instagram.com/plumbinginstyle
                </a>
                . In keeping with our commitment to honest representation, the gallery below presents{' '}
                <strong>custom illustrative architectural visuals</strong> demonstrating residential,
                commercial, repair, installation, and renovation environments—not fabricated
                customer job claims.
              </p>
              <div className="mt-6">
                <BorderlessCta
                  label="See Live Posts On @plumbinginstyle"
                  href={BRAND.instagramUrl}
                  external
                  tone="navy"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Editorial Visual Sequence (Deep Navy) */}
      <section className="bg-[#19344B] text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/15">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#BEA16B]">
                Illustrative Visual Collection
              </p>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-white">
                Plumbing Environments &amp; Finishes
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <div role="tablist" aria-label="Filter visual gallery" className="flex flex-wrap gap-4">
                {GALLERY_FILTERS.map((filter) => {
                  const active = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveFilter(filter)}
                      className={`bg-transparent border-none p-0 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer transition-colors whitespace-nowrap ${
                        active
                          ? 'text-[#BEA16B] border-b border-[#BEA16B]'
                          : 'text-white/65 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pl-4 border-l border-white/15">
                <button
                  type="button"
                  onClick={() => scrollTrack('prev')}
                  aria-label="Scroll gallery left"
                  className="bg-transparent border-none text-white/80 hover:text-[#BEA16B] min-w-[40px] min-h-[40px] inline-flex items-center justify-center cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack('next')}
                  aria-label="Scroll gallery right"
                  className="bg-transparent border-none text-white/80 hover:text-[#BEA16B] min-w-[40px] min-h-[40px] inline-flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Open Borderless Horizontal Track */}
        <div
          ref={trackRef}
          className="mt-12 pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1360px)/2+3rem))] pr-8 flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {filteredAssets.map((asset, i) => (
            <div
              key={asset.id}
              className="snap-start shrink-0 w-[84vw] sm:w-[460px] lg:w-[540px] flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <EditorialImage src={asset.src} alt={asset.alt} className="h-full" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/15 pt-3">
                <span className="text-xs uppercase tracking-[0.14em] text-[#BEA16B] font-semibold">
                  {asset.category}
                </span>
                <span className="text-xs text-white/50 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">{asset.caption}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

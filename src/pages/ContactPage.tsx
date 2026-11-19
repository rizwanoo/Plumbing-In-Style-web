import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check, Copy } from 'lucide-react';
import { BRAND, MEDIA_ASSETS } from '../data/brand';
import {
  EnquiryErrors,
  EnquiryFormData,
  INITIAL_ENQUIRY_FORM,
  PreferredContactMethod,
  ProjectSector,
  ProjectService,
  ProjectState,
  formatInstagramBrief,
  validateEnquiryForm,
} from '../utils/enquiry';
import { BorderlessCta } from '../components/BorderlessCta';
import { EditorialImage } from '../components/EditorialImage';

export const ContactPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<EnquiryFormData>(INITIAL_ENQUIRY_FORM);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [preparedBrief, setPreparedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-item', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const updateField = <K extends keyof EnquiryFormData>(key: K, value: EnquiryFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEnquiryForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setPreparedBrief(null);
      return;
    }
    const brief = formatInstagramBrief(formData);
    setPreparedBrief(brief);
    setCopied(false);
  };

  const handleCopyBrief = async () => {
    if (!preparedBrief) return;
    try {
      await navigator.clipboard.writeText(preparedBrief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div ref={rootRef}>
      {/* Contact Hero Header */}
      <section className="relative min-h-[56vh] flex items-end pb-14 md:pb-20 pt-36 overflow-hidden bg-[#19344B]">
        <div className="absolute inset-0">
          <img
            src={MEDIA_ASSETS.detailBrass.src}
            alt={MEDIA_ASSETS.detailBrass.alt}
            loading="eager"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#19344B]/90 via-[#19344B]/70 to-[#19344B]/35"
          />
        </div>

        <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          <p className="contact-hero-item text-xs font-semibold uppercase tracking-[0.18em] text-[#EAD6AC]">
            Direct Enquiries · NY · NJ · CT
          </p>
          <h1 className="contact-hero-item mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight max-w-3xl text-balance">
            Contact &amp; Service Areas
          </h1>
          <p className="contact-hero-item mt-5 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
            Reach {BRAND.displayIdentity} directly via Instagram Direct Message for residential and
            commercial repairs, installations, and renovations.
          </p>
        </div>
      </section>

      {/* Primary Contact: Instagram Direct Message (Warm Ivory) */}
      <section className="bg-[#FAF8F4] py-16 md:py-24 border-b border-[#19344B]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B97851]">
                Official Contact Channel
              </p>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl text-[#19344B] leading-tight">
                Direct Message on Instagram
              </h2>
              <p className="mt-5 text-base md:text-lg text-[#3D474D] leading-relaxed max-w-2xl">
                Instagram Direct Message is Plumbing In Style&apos;s verified contact method. Send a
                direct message to{' '}
                <span className="font-semibold text-[#19344B]">{BRAND.instagramHandle}</span>{' '}
                with your state (NY, NJ, or CT) and whether you need residential or commercial
                repairs, installations, or renovations.
              </p>

              <div className="mt-8">
                <BorderlessCta
                  label="Message Us On Instagram"
                  href={BRAND.instagramUrl}
                  external
                  tone="copper"
                  size="lg"
                />
              </div>
            </div>

            <div className="lg:col-span-5 divide-y divide-[#19344B]/15 border-t border-b border-[#19344B]/15">
              <div className="py-4 flex items-baseline justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#527B91] font-semibold">
                  Profile
                </span>
                <span className="text-sm font-semibold text-[#19344B]">{BRAND.displayIdentity}</span>
              </div>
              <div className="py-4 flex items-baseline justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#527B91] font-semibold">
                  Instagram
                </span>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#B97851] hover:text-[#19344B]"
                >
                  {BRAND.instagramHandle}
                </a>
              </div>
              <div className="py-4 flex items-baseline justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#527B91] font-semibold">
                  Categories
                </span>
                <span className="text-sm font-medium text-[#26343D]">Residential · Commercial</span>
              </div>
              <div className="py-4 flex items-baseline justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#527B91] font-semibold">
                  Services
                </span>
                <span className="text-sm font-medium text-[#26343D]">
                  Repairs · Installations · Renovations
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NY • NJ • CT Regional Service Area Presentation (Pale Blue Grey) */}
      <section className="bg-[#E7EEF1] py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="pb-10 border-b border-[#19344B]/15">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#527B91]">
              Official Tri-State Coverage
            </p>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-[#19344B]">
              New York · New Jersey · Connecticut
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#19344B]/15 pt-10">
            {BRAND.serviceRegions.map((region, idx) => (
              <div
                key={region.code}
                className={`py-6 md:py-0 ${
                  idx === 0 ? 'md:pr-10' : idx === 1 ? 'md:px-10' : 'md:pl-10'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B97851] tabular-nums">
                  {region.code}
                </span>
                <h3 className="mt-2 font-display font-bold text-2xl text-[#19344B] uppercase tracking-wide">
                  {region.name}
                </h3>
                <p className="mt-3 text-sm text-[#3D474D] leading-relaxed">{region.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Enquiry Brief Builder (Warm Ivory + Architectural Photography) */}
      <section className="bg-[#FAF8F4] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#527B91]">
                Project Enquiry Brief
              </p>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-[#19344B]">
                Prepare Your Project Details
              </h2>
              <p className="mt-4 text-sm md:text-base text-[#3D474D] leading-relaxed">
                No external email inbox is configured on this site. Complete the validated fields
                below to format a clean, copy-ready project brief you can paste directly into an
                Instagram Direct Message to{' '}
                <span className="font-semibold text-[#19344B]">{BRAND.instagramHandle}</span>.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-7">
                {/* Spam honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company-website">Website</label>
                  <input
                    id="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => updateField('honeypot', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Full Name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.fullName)}
                      className="editorial-input mt-1"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Email Address
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className="editorial-input mt-1"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Phone Number
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="(555) 000-0000"
                      aria-invalid={Boolean(errors.phone)}
                      className="editorial-input mt-1"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-preferred"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Preferred Contact Method
                    </label>
                    <select
                      id="enquiry-preferred"
                      value={formData.preferredContact}
                      onChange={(e) =>
                        updateField('preferredContact', e.target.value as PreferredContactMethod)
                      }
                      className="editorial-input mt-1 cursor-pointer"
                    >
                      <option value="Instagram DM">Instagram DM</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="enquiry-state"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Project State
                    </label>
                    <select
                      id="enquiry-state"
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value as ProjectState | '')}
                      aria-invalid={Boolean(errors.state)}
                      className="editorial-input mt-1 cursor-pointer"
                    >
                      <option value="">Select NY, NJ, or CT</option>
                      <option value="NY">New York (NY)</option>
                      <option value="NJ">New Jersey (NJ)</option>
                      <option value="CT">Connecticut (CT)</option>
                    </select>
                    {errors.state && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-city"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Project City
                    </label>
                    <input
                      id="enquiry-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="City or town"
                      aria-invalid={Boolean(errors.city)}
                      className="editorial-input mt-1"
                    />
                    {errors.city && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="enquiry-sector"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Residential or Commercial
                    </label>
                    <select
                      id="enquiry-sector"
                      value={formData.sector}
                      onChange={(e) => updateField('sector', e.target.value as ProjectSector | '')}
                      aria-invalid={Boolean(errors.sector)}
                      className="editorial-input mt-1 cursor-pointer"
                    >
                      <option value="">Select property type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                    {errors.sector && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.sector}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-service"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                    >
                      Service Needed
                    </label>
                    <select
                      id="enquiry-service"
                      value={formData.service}
                      onChange={(e) =>
                        updateField('service', e.target.value as ProjectService | '')
                      }
                      aria-invalid={Boolean(errors.service)}
                      className="editorial-input mt-1 cursor-pointer"
                    >
                      <option value="">Select service</option>
                      <option value="Repairs">Repairs</option>
                      <option value="Installations">Installations</option>
                      <option value="Renovations">Renovations</option>
                    </select>
                    {errors.service && (
                      <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-description"
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#19344B]"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="enquiry-description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Share your plumbing repair, installation, or renovation details..."
                    aria-invalid={Boolean(errors.description)}
                    className="editorial-input mt-1 resize-y"
                  />
                  {errors.description && (
                    <p role="alert" className="mt-2 text-xs font-medium text-[#B97851]">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-8">
                  <BorderlessCta
                    label="Prepare Instagram Brief"
                    type="submit"
                    tone="navy"
                    size="lg"
                  />
                  <BorderlessCta
                    label="Direct Message @plumbinginstyle"
                    href={BRAND.instagramUrl}
                    external
                    tone="copper"
                    size="md"
                  />
                </div>
              </form>

              {/* Formatted Brief Result (Borderless Architectural Output, Zero Fake Sent Claims) */}
              {preparedBrief && (
                <div
                  aria-live="polite"
                  className="mt-12 pt-10 border-t-2 border-[#B97851]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A9B98]">
                    Brief Ready For Instagram Direct Message
                  </p>
                  <h3 className="mt-2 font-display font-bold text-2xl text-[#19344B]">
                    Copy &amp; Send via @plumbinginstyle
                  </h3>
                  <pre className="mt-5 p-0 bg-transparent font-sans text-sm text-[#26343D] whitespace-pre-wrap leading-relaxed border-l-0">
                    {preparedBrief}
                  </pre>
                  <div className="mt-7 flex flex-wrap items-center gap-8">
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="cta-borderless min-h-[44px] text-xs md:text-sm text-[#19344B] hover:text-[#B97851]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#4A9B98]" aria-hidden="true" />
                          <span>Brief Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copy Project Brief</span>
                        </>
                      )}
                    </button>

                    <BorderlessCta
                      label="Open Instagram DM To Send"
                      href={BRAND.instagramUrl}
                      external
                      tone="copper"
                      size="md"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Supporting Editorial Photo Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 aspect-[3/4] max-h-[680px]">
              <EditorialImage
                src={MEDIA_ASSETS.renovationShower.src}
                alt={MEDIA_ASSETS.renovationShower.alt}
                caption={`${BRAND.displayIdentity} — ${BRAND.tagline}`}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

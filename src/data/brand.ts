export type PageRoute = '/' | '/services' | '/about' | '/contact';

export interface BrandMediaAsset {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'Hero' | 'Residential' | 'Commercial' | 'Repairs' | 'Installations' | 'Renovations' | 'Details';
  aspect: '16/9' | '4/3' | '3/4' | '1/1';
  isIllustrative: true;
}

export const BRAND = {
  name: 'PLUMBING IN STYLE',
  displayIdentity: 'Tiffany | Plumbing In Style',
  publicContactName: 'Tiffany',
  instagramHandle: '@plumbinginstyle',
  instagramUrl: 'https://www.instagram.com/plumbinginstyle/',
  logoSrc: '/assets/images/plumbing-in-style/brand/logo-hd.jpg',
  ogImageSrc: '/assets/images/plumbing-in-style/brand/og-share-card.jpg',
  tagline: 'Quality Work. Clean Finish. Reliable Service.',
  category: 'Product / Service',
  sectors: ['Residential', 'Commercial'] as const,
  coreServices: ['Repairs', 'Installations', 'Renovations'] as const,
  serviceRegions: [
    { code: 'NY', name: 'New York', summary: 'Residential & commercial plumbing across New York State.' },
    { code: 'NJ', name: 'New Jersey', summary: 'Repairs, installations, and renovations throughout New Jersey.' },
    { code: 'CT', name: 'Connecticut', summary: 'Reliable service and clean architectural finishes across Connecticut.' },
  ] as const,
};

export const MEDIA_ASSETS: Record<string, BrandMediaAsset> = {
  heroSmilingPlumber: {
    id: 'hero-smiling-plumber',
    src: '/src/assets/images/hero_smiling_plumber_1795082812144.jpg',
    alt: 'Smiling plumbing professional in a clean navy cap and work shirt standing beside brushed brass bathroom vanity faucets in morning light',
    caption: 'Warm, reliable residential plumbing service — illustrative editorial visual',
    category: 'Hero',
    aspect: '16/9',
    isIllustrative: true,
  },
  heroBath: {
    id: 'hero-bath',
    src: '/src/assets/images/hero_modern_bath_1795081779401.jpg',
    alt: 'Modern residential bathroom featuring brushed brass wall-mounted faucets, honed limestone double vanity, and frameless walk-in glass shower',
    caption: 'Architectural residential bath presentation — illustrative editorial visual',
    category: 'Hero',
    aspect: '16/9',
    isIllustrative: true,
  },
  residentialKitchen: {
    id: 'residential-kitchen',
    src: '/src/assets/images/residential_kitchen_faucet_1795081779032.jpg',
    alt: 'Brushed brass gooseneck kitchen faucet mounted on honed soapstone countertop with natural window light',
    caption: 'Residential kitchen fixture presentation — illustrative editorial visual',
    category: 'Residential',
    aspect: '4/3',
    isIllustrative: true,
  },
  repairFitting: {
    id: 'repair-fitting',
    src: '/src/assets/images/repair_precision_fitting_1795081779291.jpg',
    alt: 'Close-up of gloved hands adjusting a solid brass shut-off valve and braided supply line beneath a vanity',
    caption: 'Precision valve and supply line repair — illustrative editorial visual',
    category: 'Repairs',
    aspect: '4/3',
    isIllustrative: true,
  },
  installationManifold: {
    id: 'installation-manifold',
    src: '/src/assets/images/installation_copper_manifold_1795081778259.jpg',
    alt: 'Neatly aligned copper plumbing manifold with soldered joints, pressure gauge, and brass isolation ball valves',
    caption: 'Clean copper distribution manifold installation — illustrative editorial visual',
    category: 'Installations',
    aspect: '16/9',
    isIllustrative: true,
  },
  renovationShower: {
    id: 'renovation-shower',
    src: '/src/assets/images/renovation_walkin_shower_1795081779186.jpg',
    alt: 'Renovated travertine walk-in shower with brushed bronze rainfall showerhead, thermostatic valve, and linear drain',
    caption: 'Modern shower renovation finish — illustrative editorial visual',
    category: 'Renovations',
    aspect: '3/4',
    isIllustrative: true,
  },
  commercialWashroom: {
    id: 'commercial-washroom',
    src: '/src/assets/images/commercial_washroom_architecture_1795081779540.jpg',
    alt: 'Modern commercial washroom with honed stone trough sink and wall-mounted stainless sensor faucets',
    caption: 'Commercial washroom plumbing environment — illustrative editorial visual',
    category: 'Commercial',
    aspect: '16/9',
    isIllustrative: true,
  },
  commercialMechanical: {
    id: 'commercial-mechanical',
    src: '/src/assets/images/commercial_mechanical_piping_1795081779168.jpg',
    alt: 'Commercial building mechanical room with insulated vertical copper and steel water risers and brass valves',
    caption: 'Commercial water distribution risers and isolation controls — illustrative editorial visual',
    category: 'Commercial',
    aspect: '4/3',
    isIllustrative: true,
  },
  detailBrass: {
    id: 'detail-brass',
    src: '/src/assets/images/detail_brass_fixture_1795081779466.jpg',
    alt: 'Macro close-up of a minimalist brushed brass single-lever faucet and escutcheon against warm limestone',
    caption: 'Fixture proportion and surface finish detail — illustrative editorial visual',
    category: 'Details',
    aspect: '1/1',
    isIllustrative: true,
  },
};

export interface ServiceSectionItem {
  id: string;
  number: string;
  sectorTag: string;
  title: string;
  summary: string;
  scopeNotes: string[];
  image: BrandMediaAsset;
  surface: 'ivory' | 'stone' | 'pale-blue' | 'navy';
}

export const SERVICE_SECTIONS: ServiceSectionItem[] = [
  {
    id: 'residential',
    number: '01',
    sectorTag: 'Residential Plumbing',
    title: 'Residential Plumbing',
    summary:
      'Dependable home plumbing across New York, New Jersey, and Connecticut—handled with respect for your home’s surfaces, finishes, and daily routine.',
    scopeNotes: [
      'Kitchen and bathroom plumbing work',
      'Fixture replacements and clean finish upgrades',
      'Household repairs, installations, and renovations',
    ],
    image: MEDIA_ASSETS.residentialKitchen,
    surface: 'ivory',
  },
  {
    id: 'commercial',
    number: '02',
    sectorTag: 'Commercial Plumbing',
    title: 'Commercial Plumbing',
    summary:
      'Clean, reliable plumbing execution for commercial properties and workspaces requiring disciplined coordination and lasting performance.',
    scopeNotes: [
      'Commercial washroom fixtures and supply connections',
      'Repairs, installations, and renovation upgrades',
      'Serving commercial properties across NY, NJ, and CT',
    ],
    image: MEDIA_ASSETS.commercialWashroom,
    surface: 'navy',
  },
  {
    id: 'repairs',
    number: '03',
    sectorTag: 'Confirmed Service',
    title: 'Repairs',
    summary:
      'Straightforward diagnostics and attentive repair work focused on resolving plumbing issues cleanly and leaving the workspace tidy.',
    scopeNotes: [
      'Residential and commercial plumbing repairs',
      'Valves, connections, fixtures, and everyday plumbing upkeep',
      'Clear communication from first message to completion',
    ],
    image: MEDIA_ASSETS.repairFitting,
    surface: 'stone',
  },
  {
    id: 'installations',
    number: '04',
    sectorTag: 'Confirmed Service',
    title: 'Installations',
    summary:
      'Carefully aligned fixture and plumbing installations where clean lines, solid connections, and finished appearance matter equally.',
    scopeNotes: [
      'Residential and commercial plumbing installations',
      'Kitchen, bathroom, and utility fixture fittings',
      'Executed with attention to alignment and clean finish',
    ],
    image: MEDIA_ASSETS.installationManifold,
    surface: 'pale-blue',
  },
  {
    id: 'renovations',
    number: '05',
    sectorTag: 'Confirmed Service',
    title: 'Renovations',
    summary:
      'Plumbing renovations tailored for refreshed bathrooms, kitchens, and commercial interiors across the tri-state area.',
    scopeNotes: [
      'Bathroom and kitchen plumbing renovation work',
      'Updated fixture rough-ins and finished trim installation',
      'Clean finish aligned with modern interior architecture',
    ],
    image: MEDIA_ASSETS.renovationShower,
    surface: 'ivory',
  },
];

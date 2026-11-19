import { PageRoute } from '../data/brand';

export interface RouteMeta {
  route: PageRoute;
  title: string;
  description: string;
}

export const ROUTE_META: Record<PageRoute, RouteMeta> = {
  '/': {
    route: '/',
    title: 'Plumbing In Style — Tiffany | Residential & Commercial Plumbing (NY • NJ • CT)',
    description:
      'Residential and commercial plumbing services across New York, New Jersey, and Connecticut. Quality Work. Clean Finish. Reliable Service.',
  },
  '/services': {
    route: '/services',
    title: 'Plumbing Services | Plumbing In Style — Tiffany',
    description:
      'Explore residential plumbing, commercial plumbing, repairs, installations, and renovations across NY, NJ, and CT.',
  },
  '/about': {
    route: '/about',
    title: 'About & Our Work | Plumbing In Style — Tiffany',
    description:
      'Learn about Tiffany | Plumbing In Style, our tri-state service focus across NY, NJ, and CT, and our commitment to quality work and a clean finish.',
  },
  '/contact': {
    route: '/contact',
    title: 'Contact & Service Areas | Plumbing In Style — Tiffany',
    description:
      'Message Plumbing In Style on Instagram (@plumbinginstyle) or prepare your NY, NJ, or CT residential or commercial plumbing enquiry.',
  },
};

export function normalizeRoute(pathname: string): PageRoute {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/services' || cleaned === '/pages/services.php') return '/services';
  if (cleaned === '/about' || cleaned === '/about-work' || cleaned === '/pages/about-work.php') {
    return '/about';
  }
  if (cleaned === '/contact' || cleaned === '/pages/contact.php') return '/contact';
  return '/';
}

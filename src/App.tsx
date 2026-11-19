import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageRoute } from './data/brand';
import { ROUTE_META, normalizeRoute } from './utils/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutWorkPage } from './pages/AboutWorkPage';
import { ContactPage } from './pages/ContactPage';

interface NavState {
  route: PageRoute;
  hash: string;
  navKey: number;
}

function forceScrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function App() {
  const [navState, setNavState] = useState<NavState>(() => ({
    route: normalizeRoute(window.location.pathname),
    hash: window.location.hash,
    navKey: 0,
  }));

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const onPopState = () => {
      setNavState((prev) => ({
        route: normalizeRoute(window.location.pathname),
        hash: window.location.hash,
        navKey: prev.navKey + 1,
      }));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const meta = ROUTE_META[navState.route];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
  }, [navState.route]);

  useLayoutEffect(() => {
    if (!navState.hash) {
      forceScrollTop();
      const raf = window.requestAnimationFrame(() => {
        forceScrollTop();
        ScrollTrigger.refresh();
      });
      return () => window.cancelAnimationFrame(raf);
    }

    const targetId = navState.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        forceScrollTop();
      }
      ScrollTrigger.refresh();
    }, 90);
    return () => window.clearTimeout(timer);
  }, [navState.route, navState.hash, navState.navKey]);

  const navigate = useCallback((nextRoute: PageRoute, hash = '') => {
    const normalizedHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
    const targetUrl = normalizedHash ? `${nextRoute}${normalizedHash}` : nextRoute;

    if (window.location.pathname + window.location.hash !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    if (!normalizedHash) {
      forceScrollTop();
    }

    setNavState((prev) => ({
      route: nextRoute,
      hash: normalizedHash,
      navKey: prev.navKey + 1,
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#26343D]">
      <Navbar currentRoute={navState.route} onNavigate={navigate} />
      <main id="main-content" className="flex-1">
        {navState.route === '/' && <HomePage onNavigate={navigate} />}
        {navState.route === '/services' && <ServicesPage onNavigate={navigate} />}
        {navState.route === '/about' && <AboutWorkPage onNavigate={navigate} />}
        {navState.route === '/contact' && <ContactPage />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

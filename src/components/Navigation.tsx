import { useState, useEffect } from 'react';
import { NavView, SiteSettings, NavItemConfig } from '../types';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentView: NavView;
  setView: (view: NavView) => void;
  resetProject: () => void;
  settings?: SiteSettings;
  navItems?: NavItemConfig[];
}

export default function Navigation({ currentView, setView, resetProject, settings, navItems }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultNavItems: NavItemConfig[] = [
    { id: 'nav_home', label: 'Home', view: 'home', labelKr: '홈', order: 1, show: true },
    { id: 'nav_portfolio', label: 'Portfolio', view: 'portfolio', labelKr: '포트폴리오', order: 2, show: true },
    { id: 'nav_categories', label: 'Services', view: 'categories', labelKr: '분야별 서비스', order: 3, show: true },
    { id: 'nav_pricing', label: 'Pricing', view: 'pricing', labelKr: '요금정찰제', order: 4, show: true },
    { id: 'nav_estimate', label: 'Estimate', view: 'estimate', labelKr: '견적문의', order: 5, show: true },
    { id: 'nav_reviews', label: 'Reviews', view: 'reviews', labelKr: '고객후기', order: 6, show: true },
    { id: 'nav_blog', label: 'Journal', view: 'blog', labelKr: '건축칼럼', order: 7, show: true },
    { id: 'nav_faq', label: 'FAQ', view: 'faq', labelKr: 'Q&A', order: 8, show: true },
    { id: 'nav_admin', label: 'Admin', view: 'admin', labelKr: '관리자', order: 9, show: true },
  ];

  const activeNavItems = [...(navItems && navItems.length > 0 ? navItems : defaultNavItems)]
    .filter(item => item.show)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleNavClick = (view: NavView) => {
    setView(view);
    resetProject();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-4 border-brand-border/60 shadow-xs'
          : 'bg-transparent py-7 border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          id="nav-logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex flex-col tracking-[0.22em] text-[#111111] transition-opacity duration-300 hover:opacity-75 focus:outline-none"
        >
          <span className="text-sm font-semibold md:text-base tracking-[0.28em] uppercase">{settings?.brandName || 'GANG IN STUDIO'}</span>
          <span className="text-[7.5px] text-brand-dark font-medium tracking-[0.45em] uppercase mt-0.5">{settings?.subTitle || 'Architecture & Space'}</span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center space-x-12">
          {activeNavItems.map((item) => (
            <button
              key={item.view}
              id={`nav-item-${item.view}`}
              onClick={() => handleNavClick(item.view)}
              className={`relative text-[13px] tracking-[0.05em] font-semibold py-2 cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none flex flex-col items-center ${
                currentView === item.view
                  ? 'text-[#111111]'
                  : 'text-brand-muted hover:text-[#111111]'
              }`}
            >
              <span>{item.labelKr}</span>
              {/* Ultra minimalist active dot */}
              <span
                className={`absolute bottom-0 w-1.5 h-1.5 rounded-full bg-brand-dark transition-all duration-300 ${
                  currentView === item.view ? 'opacity-100' : 'opacity-0 scale-50'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#111111] hover:opacity-70 focus:outline-none p-1 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Slide Menu Overlay */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 top-0 left-0 bg-white z-40 flex flex-col justify-between p-12 transition-all duration-700 convenience-slide-menu md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 mt-24">
          {activeNavItems.map((item, idx) => (
            <button
              key={item.view}
              id={`mobile-nav-item-${item.view}`}
              onClick={() => handleNavClick(item.view)}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className={`text-start text-xl font-semibold uppercase tracking-[0.1em] focus:outline-none transition-all duration-500 transform ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              } ${currentView === item.view ? 'text-[#111111]' : 'text-brand-muted'}`}
            >
              <div className="flex justify-between items-baseline border-b border-brand-border/40 pb-2">
                <span>{item.labelKr}</span>
                <span className="text-[11px] uppercase tracking-[0.1em] text-brand-dark font-semibold">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div
          className={`flex flex-col space-y-4 text-[10px] tracking-widest text-brand-muted transition-all duration-700 delay-300 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-light">{(settings?.brandName || 'GANG IN STUDIO').toUpperCase()} — 광주 직영 대표 시공사</p>
          <p className="font-light">T. {settings?.phone || '062 - 515 - 1204'}</p>
          <p className="font-light">E. {settings?.email || 'contact@ganginstudio.com'}</p>
          <p className="font-light text-brand-muted/50 text-[9px] mt-4">
            © 2026 {(settings?.brandName || 'GANG IN STUDIO').toUpperCase()}. LEIBAL INSPIRED.
          </p>
        </div>
      </div>
    </header>
  );
}

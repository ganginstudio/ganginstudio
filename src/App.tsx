import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavView, Project } from './types';
import {
  getInitialState,
  saveState,
  DEFAULT_CATEGORIES,
  ServiceCategory,
  ServicePackage,
  FAQItem,
  CustomerReview,
  BlogPost,
  SiteSettings
} from './store';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import Pricing from './components/Pricing';
import Estimate from './components/Estimate';
import About from './components/About';
import Contact from './components/Contact';

// New Subview Imports
import Categories from './components/Categories';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import Admin from './components/Admin';

import { Phone, MessageSquare, Calculator, FileText, Instagram, BookOpen, Clock, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<NavView>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Exit intent hook listener
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse cursor moves past the top viewport edge (clientY < 15)
      if (e.clientY < 15) {
        const alreadyDismissed = sessionStorage.getItem('gangin_exit_intent_dismissed');
        if (!alreadyDismissed) {
          setShowExitModal(true);
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Load Initialized Storage state
  const storeInit = getInitialState();
  const [isHydrated, setIsHydrated] = useState(false);
  const [projects, setProjects] = useState<Project[]>(storeInit.projects);
  const [packages, setPackages] = useState<ServicePackage[]>(storeInit.packages);
  const [faq, setFaq] = useState<FAQItem[]>(storeInit.faq);
  const [reviews, setReviews] = useState<CustomerReview[]>(storeInit.reviews);
  const [blog, setBlog] = useState<BlogPost[]>(storeInit.blog);
  const [settings, setSettings] = useState<SiteSettings>(storeInit.settings);
  
  // Also persist/manage categories state
  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    const saved = localStorage.getItem('gangin_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // Hydrate state from Supabase on mount if configured
  useEffect(() => {
    async function loadSupabase() {
      const { fetchSupabaseState, isSupabaseConfigured } = await import('./lib/supabase');
      if (isSupabaseConfigured) {
        try {
          console.log('[Supabase] Hydrating state from remote database...');
          const remoteProjects = await fetchSupabaseState<Project[]>('gangin_projects', storeInit.projects);
          const remotePackages = await fetchSupabaseState<ServicePackage[]>('gangin_packages', storeInit.packages);
          const remoteFaq = await fetchSupabaseState<FAQItem[]>('gangin_faq', storeInit.faq);
          const remoteReviews = await fetchSupabaseState<CustomerReview[]>('gangin_reviews', storeInit.reviews);
          const remoteBlog = await fetchSupabaseState<BlogPost[]>('gangin_blog', storeInit.blog);
          const remoteSettings = await fetchSupabaseState<SiteSettings>('gangin_settings', storeInit.settings);
          
          const defaultCategories = DEFAULT_CATEGORIES;
          const remoteCategories = await fetchSupabaseState<ServiceCategory[]>('gangin_categories', defaultCategories);

          setProjects(remoteProjects);
          setPackages(remotePackages);
          setFaq(remoteFaq);
          setReviews(remoteReviews);
          setBlog(remoteBlog);
          setSettings(remoteSettings);
          setCategories(remoteCategories);
        } catch (e) {
          console.error('[Supabase] Hydration failed, using defaults and localStorage:', e);
        }
      }
      setIsHydrated(true);
    }
    loadSupabase();
  }, []);

  // Dynamic automatic synchronization to localStorage/Supabase on state alteration
  useEffect(() => {
    if (!isHydrated) return;
    
    saveState({
      projects,
      packages,
      faq,
      reviews,
      blog,
      settings
    });
    localStorage.setItem('gangin_categories', JSON.stringify(categories));

    // Asynchronously save categories to Supabase
    async function syncCategories() {
      const { saveSupabaseState, isSupabaseConfigured } = await import('./lib/supabase');
      if (isSupabaseConfigured) {
        saveSupabaseState('gangin_categories', categories);
      }
    }
    syncCategories();
  }, [projects, packages, faq, reviews, blog, settings, categories, isHydrated]);

  // States to pre-fill estimate inputs when user clicks an inquiry CTA in a specific project's detail
  const [prefillCategory, setPrefillCategory] = useState<string>('');
  const [prefillSpace, setPrefillSpace] = useState<string>('');

  const resetProject = () => {
    setSelectedProjectId(null);
  };

  const setEstimatePrefill = (category: string, title: string) => {
    setPrefillCategory(category);
    setPrefillSpace(title);
  };

  // Automatically scroll to the top during page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  // Dynamic document title update (SEO Basics)
  useEffect(() => {
    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }
  }, [settings.seoTitle]);

  // Render detail screen of a project with callbacks
  const renderDetailView = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return <div className="text-center py-20 font-light text-xs text-brand-muted">Space not found</div>;
    return (
      <ProjectDetail
        project={project}
        onBack={() => setSelectedProjectId(null)}
        setView={setView}
        setEstimatePrefill={setEstimatePrefill}
      />
    );
  };

  return (
    <div id="gangin-app-root" className="min-h-screen bg-white flex flex-col justify-between selection:bg-brand-dark selection:text-white">
      {/* Premium Navigation Header */}
      <Navigation
        currentView={currentView}
        setView={setView}
        resetProject={resetProject}
      />

      {/* Main Page Layout Dynamic Routing */}
      <main id="gangin-main-content" className="flex-grow">
        {currentView === 'home' && (
          <Home
            projects={projects}
            setView={setView}
            setSelectedProjectId={setSelectedProjectId}
            settings={settings}
          />
        )}

        {currentView === 'portfolio' && (
          <Portfolio
            projects={projects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            renderDetailView={renderDetailView}
          />
        )}

        {currentView === 'pricing' && (
          <Pricing
            setView={setView}
            packages={packages}
          />
        )}

        {currentView === 'estimate' && (
          <Estimate
            prefillCategory={prefillCategory}
            prefillSpace={prefillSpace}
            clearPrefill={() => {
              setPrefillCategory('');
              setPrefillSpace('');
            }}
            setView={setView}
          />
        )}

        {currentView === 'about' && (
          <About />
        )}

        {currentView === 'contact' && (
          <Contact />
        )}

        {/* 1204DESIGN-Inspired New Core Views */}
        {currentView === 'categories' && (
          <Categories
            categories={categories}
            projects={projects}
            packages={packages}
            faq={faq}
            reviews={reviews}
            setView={setView}
            setSelectedProjectId={setSelectedProjectId}
            setEstimatePrefill={setEstimatePrefill}
          />
        )}

        {currentView === 'faq' && (
          <FAQ
            faqList={faq}
            setView={setView}
          />
        )}

        {currentView === 'reviews' && (
          <Reviews
            reviews={reviews}
            setView={setView}
          />
        )}

        {currentView === 'blog' && (
          <Blog
            blogPosts={blog}
            setView={setView}
          />
        )}

        {currentView === 'admin' && (
          <Admin
            projects={projects}
            packages={packages}
            faq={faq}
            reviews={reviews}
            blog={blog}
            settings={settings}
            categories={categories}
            onUpdateProjects={setProjects}
            onUpdatePackages={setPackages}
            onUpdateFAQ={setFaq}
            onUpdateReviews={setReviews}
            onUpdateBlog={setBlog}
            onUpdateSettings={setSettings}
            onUpdateCategories={setCategories}
          />
        )}
      </main>

      {/* 5. RESPONSIVE FLOATING STICKY CTA PORTAL SYSTEM (ON:SAEMI inspired - LEIBAL STYLE) */}
      <div id="sticky-cta-hub" className="relative z-40">
        
        {/* A. Fixed Right-Side Floating Quick Menu (Desktop/Tablet) */}
        <div id="desktop-fixed-cta" className="hidden sm:flex flex-col fixed bottom-24 right-8 space-y-2 z-50">
          <button
            onClick={() => { setView('estimate'); resetProject(); }}
            className="w-14 h-14 bg-[#111111] text-white border border-[#111111] flex flex-col justify-center items-center hover:bg-black transition-all cursor-pointer shadow-sm group font-semibold"
            title="실시간 예상견적"
          >
            <Calculator size={14} className="group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold">정밀견적</span>
          </button>

          <button
            onClick={() => { setView('contact'); resetProject(); }}
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group font-semibold"
            title="정밀기획 및 간편상담"
          >
            <Clock size={14} className="text-indigo-600 group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">간편상담</span>
          </button>
          
          <a
            href={settings.kakaotalk}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="카카오톡 1:1 채팅"
          >
            <MessageSquare size={14} className="text-yellow-600 group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">카카오톡</span>
          </a>

          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="인스타그램 방문"
          >
            <Instagram size={14} className="text-[#e1306c] group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">인스타</span>
          </a>

          <a
            href={settings.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="공식 블로그 칼럼"
          >
            <BookOpen size={14} className="text-emerald-700 group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">블로그</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="대표 연락 유선 직통 연결"
          >
            <Phone size={14} className="text-brand-dark group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">직통유선</span>
          </a>
        </div>

        {/* B. Mobile Bottom Sticky bar for hand-held accessibility (5 key buttons) */}
        <div id="mobile-sticky-cta" className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-brand-border z-50 grid grid-cols-5 h-16 shadow-lg divide-x divide-brand-border/60">
          <button
            onClick={() => { setView('portfolio'); resetProject(); }}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <FileText size={15} />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">포폴검색</span>
          </button>

          <button
            onClick={() => { setView('estimate'); resetProject(); }}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Calculator size={15} className="text-indigo-600 animate-pulse" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">예상견적</span>
          </button>

          <button
            onClick={() => { setView('contact'); resetProject(); }}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Clock size={15} className="text-pink-600" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">간편상담</span>
          </button>

          <a
            href={settings.kakaotalk}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <MessageSquare size={15} className="text-yellow-600" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">카톡문의</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Phone size={15} className="text-emerald-700" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">기술전화</span>
          </a>
        </div>
      </div>

      {/* C. Minimalist Exit Intent Modal in elegant LEIBAL Aesthetic */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="bg-[#FFFFFF] border border-[#111111] max-w-md w-full p-8 text-left space-y-6 relative"
            >
              {/* Close pin */}
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem('gangin_exit_intent_dismissed', 'true');
                  setShowExitModal(false);
                }}
                className="absolute top-6 right-6 text-brand-muted hover:text-[#111111] transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="space-y-3">
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#e11d48] font-bold block flex items-center gap-1.5 animate-pulse">
                  <Sparkles size={10} />
                  <span>SPECIAL LEAD OFFER</span>
                </span>
                <h3 className="text-sm font-normal text-brand-dark tracking-widest leading-relaxed">
                  잠시만요, 귀하의 기획 공간 예상견적을 <br/>3분 만에 무료로 확인해 보시겠습니까?
                </h3>
                <p className="text-[11px] font-light text-brand-muted leading-relaxed tracking-wide">
                  강인스튜디오는 계약 전 도면과 상세 원가 명세서를 투명하게 검수해 이중 지출 요소를 배제하고 있습니다. 성함과 평수만으로 즉시 시방 분석안을 배정받으십시오.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem('gangin_exit_intent_dismissed', 'true');
                    setShowExitModal(false);
                    setView('estimate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 bg-[#111111] hover:bg-black text-white text-[10px] tracking-[0.2em] font-bold uppercase transition-colors text-center cursor-pointer"
                >
                  3분 예상견적 바로 받기 →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem('gangin_exit_intent_dismissed', 'true');
                    setShowExitModal(false);
                  }}
                  className="w-full py-2.5 bg-transparent hover:bg-brand-bg/40 text-brand-muted hover:text-brand-dark text-[9px] tracking-widest uppercase transition-all text-center cursor-pointer font-light"
                >
                  아니요, 다음에 하겠습니다
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Minimal Footer */}
      <Footer
        setView={setView}
        resetProject={resetProject}
      />
    </div>
  );
}

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, NavView, HeroCmsConfig, HomepageCmsConfig, CustomerReview } from '../types';
import { ArrowRight, MoveDown, Sparkles, Send, Check } from 'lucide-react';

interface HomeProps {
  projects: Project[];
  reviews: CustomerReview[];
  setView: (view: NavView) => void;
  setSelectedProjectId: (id: string | null) => void;
  settings: any;
  heroCms: HeroCmsConfig;
  homepageCms: HomepageCmsConfig;
}

export default function Home({ projects, reviews, setView, setSelectedProjectId, settings, heroCms, homepageCms }: HomeProps) {
  // Pull 3 featured projects for the homepage grid
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  // Pull maximum 3 sorted featured customer reviews
  const featuredReviews = (reviews || [])
    .filter(r => r.featured && r.show)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .slice(0, 3);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe Fallback initialization for Hero Slider
  const hCms = heroCms || {
    image1: "/src/assets/images/gangin_hero_1779412179856.png",
    image2: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200",
    image3: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    show1: true,
    show2: true,
    show3: true,
    order: "1,2,3",
    interval: 4000,
    headlineLine1: "공간을 디자인하고",
    headlineLine2: "시공까지 책임집니다.",
    label1: "Interior Design",
    label2: "Construction",
    label3: "After Service",
    button1Text: "포트폴리오",
    button1Url: "portfolio",
    button2Text: "견적문의",
    button2Url: "estimate"
  };

  const hpCms = homepageCms || {
    philosophyNum: "01",
    philosophyLabel: "GANG IN STUDIO",
    philosophyTitle: "Brand Philosophy",
    philosophyHeadline: "우리는 쓸모없는 화려한 장식과 소음을 지우고 오직 본질적인 선과 기하학적 비례에 집중합니다.",
    philosophyPara1: "나무, 석재, 콘크리트, 금속. 자연에서 길러낸 가공되지 않은 자재에 빛의 춤을 더해 거주자가 매일 진정한 마음의 응집력과 고요함을 발견하도록 설계합니다.",
    philosophyPara2: "강인스튜디오는 디자인 단계에서 기획한 1mm의 미세한 공차와 음영 디테일을 현장 시공 소장들이 한치의 오차 없이 그대로 구축해 나갑니다. 그것이 우리 인테리어의 품위이자 책임감입니다.",

    featuredNum: "02",
    featuredLabel: "Editorial Curation",
    featuredTitle: "Featured Spaces (선정작)",
    featuredBtnText: "전체 포트폴리오 보기",
    featuredBtnUrl: "portfolio",

    integrityNum: "03",
    integrityLabel: "Integrity & Precision",
    integrityTitle: "투명성 회계제도와 직직영 책임 시공의 약속",
    integrityDesc: "광주 인테리어 업체 중 유일하게 투명한 상세 명세 자재 원가 내역서를 계약 전 100% 가감 없이 공유하며, 중간 마진 명세 일체의 요소를 정출하는 정제된 1204DESIGN 비즈니스 투명성 공식을 엄수합니다.",
    
    col1Num: "01",
    col1Title: "자재 등급 정찰제",
    col1Desc: "계약하는 세밀 자재 하나까지 단위 수량과 도소매 단가를 투명하게 공개해 가라 자재나 임의 변경 행위가 애초에 불가능하도록 회계 감독선을 수립합니다.",
    col2Num: "02",
    col2Title: "직영 소장제",
    col2Desc: "외주 대마에 전적으로 시공을 위탁하는 타 업체들과 달리 본사의 15년 차 경력 정규 면허 기술진이 도면과 동일한 자재의 접합률을 실시간 전담 감독합니다.",
    col3Num: "03",
    col3Title: "3개년 웰니스 점검",
    col3Desc: "하자 이행 증권 상의 기간을 뛰어넘어, 사후 3개년간 자사 소속 시공 사후 수련팀이 6달 간격으로 실내 습도 밸런스와 오크 가구 뒤틀림 복원을 무료로 리포팅합니다.",

    conversionNum: "04",
    conversionLabel: "HIGH CONVERSION PORTALS",
    conversionTitle: "공학적 투명성과 시적 여백의 기획 채널",
    conversionDesc: "광주 인테리어 업체 중 유일하게 투명한 상세 명세 자재 원가 내역서를 계약 전 100% 가감 없이 공유하며...",

    portal1Title: "우리집 예상견적 받아보기",
    portal1Desc: "평수와 원가 기준을 빠르게 연산하여 가도면 상담을 예약하는 간섭 없는 인스턴트 견적 채널입니다. 더 면밀한 정보는 언제든 견적문의 탭의 7단계 도구를 실행하십시오.",
    portal2Title: "간편 유선 긴급상담 받아보기",
    portal2Desc: "복잡한 서류 절차가 아닌, 단순 시공 가부 여부 및 사옥 예약 방법론 등을 바리스타 처럼 빠르고 격조 있게 물어보는 1분 직통 신청 창구입니다.",

    form1NameLabel: "고객 성함",
    form1PhoneLabel: "대표 번호",
    form1TypeLabel: "공간 분야",
    form1AreaLabel: "분양 면적 (평형)",
    form1BudgetLabel: "보유 예산 규모",
    form2NameLabel: "대표 성함",
    form2PhoneLabel: "전화 번호",
    form2TypeLabel: "문의 카테고리",
    form2TimeLabel: "통화 희망 시간대",
    form2DescLabel: "간단 문의 사항"
  };

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Compile Active Hero Slide Images list in specified Custom Order
  const slideTemplates = [
    { id: '1', url: (isMobile && hCms.image1Mobile) ? hCms.image1Mobile : (hCms.image1 || "/src/assets/images/gangin_hero_1779412179856.png"), show: hCms.show1 !== false },
    { id: '2', url: (isMobile && hCms.image2Mobile) ? hCms.image2Mobile : (hCms.image2 || "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200"), show: hCms.show2 !== false },
    { id: '3', url: (isMobile && hCms.image3Mobile) ? hCms.image3Mobile : (hCms.image3 || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"), show: hCms.show3 !== false },
  ];

  const orderPattern = (hCms.order || "1,2,3")
    .split(',')
    .map(val => val.trim())
    .filter(val => val === '1' || val === '2' || val === '3');

  const orderedSlides = orderPattern
    .map(id => slideTemplates.find(s => s.id === id))
    .filter((s): s is { id: string; url: string; show: boolean } => !!s && s.show);

  // Fallback if zero items shown
  const finalSlides = orderedSlides.length > 0 ? orderedSlides : [slideTemplates[0]];

  const [slideIdx, setSlideIdx] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Record<string, boolean>>({});

  // Background Preloading for Hero Slides to prevent flash / broken image symbols on mobile
  useEffect(() => {
    finalSlides.forEach(slide => {
      if (slide && slide.url && !loadedSlides[slide.id]) {
        const img = new Image();
        img.src = slide.url;
        img.onload = () => {
          setLoadedSlides(prev => ({ ...prev, [slide.id]: true }));
        };
      }
    });
  }, [finalSlides]);

  // Automatic transition clock
  useEffect(() => {
    if (finalSlides.length <= 1) return;
    const intervalTime = hCms.interval || 4000;
    const intervalId = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % finalSlides.length);
    }, intervalTime);
    return () => clearInterval(intervalId);
  }, [finalSlides.length, hCms.interval]);

  const activeSlide = finalSlides[slideIdx] || finalSlides[0];
  const isCurrentlyLoaded = loadedSlides[activeSlide?.id];

  return (
    <div id="home-view-container" className="pt-24 min-h-screen">
      {/* 1. HERO SECTION WITH IMAGE SLIDER */}
      <section id="hero-section" className="relative h-[85vh] md:h-[90vh] bg-neutral-950 flex items-center px-6 md:px-12 mb-32 overflow-hidden">
        {/* Slider Background wrapper - Pure fade transitions */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeSlide?.id || 'fallback'}
              src={activeSlide?.url}
              alt="GANG IN STUDIO Principal Space Slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: isCurrentlyLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover grayscale-10 brightness-[0.93] contrast-[1.02]"
              referrerPolicy="no-referrer"
              onLoad={() => {
                if (activeSlide) {
                  setLoadedSlides(prev => ({ ...prev, [activeSlide.id]: true }));
                }
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-y-0 left-0 w-full h-full bg-[#111111]/10 bg-gradient-to-t from-[#ffffff] via-transparent to-transparent z-10" />
        </div>

        {/* Text Area */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col justify-end h-full pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl text-[#111111]"
          >
            {/* Super strong/premium architectural heading */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-widest leading-[1.6] mb-8 font-sans">
              {hCms.headlineLine1 || "공간을 디자인하고"} <br />
              <span className="font-semibold">{hCms.headlineLine2 || "시공까지 책임집니다."}</span>
            </h1>

            {/* Sub-capabilities */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.25em] uppercase text-brand-muted/90 mb-12 font-light">
              {hCms.label1 && (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40" /> {hCms.label1}
                </span>
              )}
              {hCms.label2 && (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40" /> {hCms.label2}
                </span>
              )}
              {hCms.label3 && (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40" /> {hCms.label3}
                </span>
              )}
            </div>

            {/* CTAs following LEIBAL aesthetics */}
            <div className="flex items-center gap-x-6">
              {hCms.button1Text && (
                <button
                  id="hero-cta-portfolio"
                  onClick={() => setView((hCms.button1Url || 'portfolio') as any)}
                  className="group relative px-7 py-3 text-[11px] uppercase tracking-[0.2em] bg-brand-dark text-white hover:bg-brand-dark/90 transition-all duration-300 rounded-none cursor-pointer focus:outline-none flex items-center gap-2"
                >
                  <span>{hCms.button1Text}</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              
              {hCms.button2Text && (
                <button
                  id="hero-cta-estimate"
                  onClick={() => setView((hCms.button2Url || 'estimate') as any)}
                  className="group px-7 py-3 text-[11px] uppercase tracking-[0.2em] border border-brand-dark/30 text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-500 rounded-none cursor-pointer focus:outline-none"
                >
                  {hCms.button2Text}
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Manual Dot Navigation overrides */}
        {finalSlides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
            {finalSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  slideIdx === i ? 'bg-brand-dark scale-125' : 'bg-brand-dark/30 hover:bg-brand-dark/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll down indicator to maintain editorial feel */}
        <div className="absolute right-12 bottom-12 hidden md:flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-brand-muted/75 vertical-text">
          <span className="transform rotate-90 origin-right whitespace-nowrap mb-4">아래로 스크롤</span>
          <MoveDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* 2. PHILOSOPHY HIGHLIGHT */}
      <section id="introduction-philosophy" className="max-w-[1400px] mx-auto px-6 md:px-12 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-baseline mb-16">
          {/* Tag */}
          <div className="lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              {hpCms.philosophyNum} — {hpCms.philosophyLabel}
            </span>
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#111111] mt-2 font-normal">
              {hpCms.philosophyTitle}
            </h2>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl md:text-2xl font-light tracking-[0.1em] text-brand-dark font-sans leading-relaxed">
              {hpCms.philosophyHeadline}
            </h3>
          </div>

          <div className="lg:col-span-4 text-xs font-light tracking-wide text-brand-muted leading-relaxed space-y-4">
            <p>
              {hpCms.philosophyPara1}
            </p>
            <p>
              {hpCms.philosophyPara2}
            </p>
          </div>
        </div>

        {/* Dynamic Featured Reviews Integration inside Brand Philosophy/History */}
        {featuredReviews.length > 0 && (
          <div className="pt-16 border-t border-brand-border/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
                  SELECTED VOICES
                </span>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#111111] mt-2 font-normal">
                  고객 상생 수기
                </h4>
              </div>
              
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
                {featuredReviews.map((rev) => (
                  <div key={rev.id} className="space-y-4 font-sans text-justify flex flex-col justify-between h-full">
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline border-b border-brand-border/20 pb-2">
                        <span className="text-[10px] font-medium tracking-wider text-[#111111]">{rev.clientName}</span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-brand-muted font-light">{rev.category}</span>
                      </div>
                      <p className="text-[11px] font-light leading-relaxed text-brand-muted tracking-wide italic whitespace-pre-line">
                        {rev.quote}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-brand-muted/70 pt-4 font-mono mt-auto border-t border-brand-border/10">
                      <span className="tracking-widest">{rev.date || 'N/A'}</span>
                      {rev.rating !== undefined && rev.rating > 0 && (
                        <span className="tracking-widest flex items-center gap-0.5 text-[#111111] text-[8px]">
                          {'★'.repeat(rev.rating)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. FEATURED PROJECTS ARCHITECTURAL GRID */}
      <section id="featured-projects" className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
        <div className="flex justify-between items-baseline border-b border-brand-border pb-6 mb-12">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              {hpCms.featuredNum} — {hpCms.featuredLabel}
            </span>
            <h3 className="text-sm uppercase tracking-[0.2em] text-[#111111] font-semibold">
              {(hpCms.featuredTitle === "Featured Spaces (선정작)" || !hpCms.featuredTitle) ? "PORTFOLIO" : hpCms.featuredTitle.replace(" (선정작)", "")}
            </h3>
          </div>
          <button
            id="view-all-portfolio"
            onClick={() => setView((hpCms.featuredBtnUrl || 'portfolio') as any)}
            className="text-[10px] tracking-[0.1em] text-brand-muted hover:text-[#111111] transition-colors focus:outline-none flex items-center gap-2 cursor-pointer pb-1 border-b border-transparent hover:border-brand-dark font-medium"
          >
            <span>{hpCms.featuredBtnText}</span>
            <ArrowRight size={10} />
          </button>
        </div>

        {/* Asymmetrical composition for high-end look / gap tighter to fix spacing on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={project.id}
                id={`featured-${project.id}`}
                onClick={() => handleProjectClick(project.id)}
                className={`group cursor-pointer flex flex-col ${isEven ? 'md:mt-24' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {/* Image Wrap - h-auto on mobile prevents cropping and keeps high-contrast bg */}
                <div className="w-full h-auto md:aspect-[3/2] overflow-hidden bg-brand-bg relative mb-3 md:mb-6 border border-brand-border/40">
                  <img
                    src={project.imageMobile || project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
                    alt={project.title || "Bathroom Interior Project"}
                    loading="lazy"
                    className="w-full h-auto block md:h-full md:object-cover bg-[#fafaf9] transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#111111]/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Metadata Column */}
                <div className="grid grid-cols-3 gap-4 border-b border-brand-border/40 pb-4">
                  <div className="col-span-2">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-brand-muted/80">{(project.category || 'Space')} — {project.year || '2026'}</p>
                    <h4 className="text-sm font-semibold text-[#111111] tracking-wider mt-1.5 mb-1 group-hover:text-brand-muted transition-colors duration-300">
                      {project.title || 'GANGIN Space'}
                    </h4>
                    <p className="text-[10px] text-brand-muted font-light tracking-wide">{project.titleEn || ''}</p>
                  </div>
                  <div className="text-right flex flex-col justify-end">
                    <span className="text-[10px] text-brand-muted font-light tracking-widest">{project.location || 'Gwangju'}</span>
                    <span className="text-[9px] text-brand-muted/50 font-mono mt-1">{project.area || 'N/A'}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. BUSINESS CORE VALUES */}
      <section id="trust-core-business" className="bg-white/40 border-y border-brand-border py-28 mb-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              {hpCms.integrityNum} — {hpCms.integrityLabel}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold tracking-[0.1em] text-[#111111] mt-2 mb-6">
              {hpCms.integrityTitle}
            </h2>
            <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wide">
              {hpCms.integrityDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block">{hpCms.col1Num}</span>
              <h3 className="text-sm font-semibold tracking-widest text-[#111111]">{hpCms.col1Title}</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                {hpCms.col1Desc}
              </p>
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block">{hpCms.col2Num}</span>
              <h3 className="text-sm font-semibold tracking-widest text-[#111111]">{hpCms.col2Title}</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                {hpCms.col2Desc}
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block">{hpCms.col3Num}</span>
              <h3 className="text-sm font-semibold tracking-widest text-[#111111]">{hpCms.col3Title}</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                {hpCms.col3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIMARY CONVERSION CTA SYSTEM */}
      <section id="conversion-cta-block" className="max-w-[1400px] mx-auto px-6 md:px-12 mb-36 border-t border-brand-border/60 pt-28">
        <div className="max-w-xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
            {hpCms.conversionNum} — {hpCms.conversionLabel}
          </span>
          <h2 className="text-xl md:text-2xl font-light tracking-[0.1em] text-[#111111] mt-2 mb-4">
            {hpCms.conversionTitle}
          </h2>
          <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wide">
            {hpCms.conversionDesc}
          </p>
        </div>

        <HomeConversionCTAs setView={setView} homepageCms={hpCms} />
      </section>
    </div>
  );
}

// Interactive Subcomponent with customized labels
interface HomeConversionCTAsProps {
  setView: (view: NavView) => void;
  homepageCms: HomepageCmsConfig;
}

function HomeConversionCTAs({ setView, homepageCms }: HomeConversionCTAsProps) {
  // Form 01 - Fast Estimate Inquiry
  const [estName, setEstName] = useState('');
  const [estPhone, setEstPhone] = useState('');
  const [estType, setEstType] = useState('아파트 인테리어');
  const [estArea, setEstArea] = useState('');
  const [estBudget, setEstBudget] = useState('5천~1억');
  const [showEstSuccess, setShowEstSuccess] = useState(false);

  // Form 02 - Fast Quick Consultation
  const [conName, setConName] = useState('');
  const [conPhone, setConPhone] = useState('');
  const [conType, setConType] = useState('아파트 인테리어');
  const [conInquiry, setConInquiry] = useState('');
  const [conTime, setConTime] = useState('오후 12시 ~ 3시');
  const [showConSuccess, setShowConSuccess] = useState(false);

  // Submit handers
  const handleEstSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!estName || !estPhone) {
      alert('성함과 연락처를 모두 기입해 주십시오.');
      return;
    }

    const newEst = {
      id: 'EST_Q_' + Date.now(),
      clientName: estName,
      phone: estPhone,
      category: estType,
      spaceType: estType,
      area: estArea ? `${estArea}평` : '미기재',
      budget: estBudget,
      schedule: '미정 (빠른 견적 신청)',
      designPreference: '따뜻하고 미니멀한 (Warm Minimal)',
      details: '[퀵 가이드 홈 견적 접수]',
      consultationType: 'Call' as const,
      submittedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending' as const
    };

    // Save lead submission directly to Supabase Database
    const newLead = {
      id: newEst.id,
      type: 'Quick Estimate (우선 견적 신청)',
      name: estName,
      phone: estPhone,
      category: estType,
      region: '광수 전남 전역',
      area: estArea ? `${estArea}평` : '협의 예정',
      budget: estBudget,
      schedule: '협의 예정',
      details: '[홈페이지 하단 간편 견적 인서트]',
      uploadsCount: 0,
      uploads: [],
      timestamp: newEst.submittedAt
    };

    import('../lib/leads').then(({ addLeadSubmission }) => {
      addLeadSubmission({
        lead: newLead,
        estimate: newEst
      });
    });

    setEstName('');
    setEstPhone('');
    setEstArea('');
    setShowEstSuccess(true);
    setTimeout(() => setShowEstSuccess(false), 5000);
  };

  const handleConSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!conName || !conPhone) {
      alert('성함과 연락처를 모두 기입해 주십시오.');
      return;
    }

    const newConPort = {
      id: 'CON_' + Date.now(),
      type: 'Quick Phone Call (간편 전화 상담)',
      name: conName,
      phone: conPhone,
      category: conType,
      region: '지정 없음',
      area: '지정 없음',
      budget: '지정 없음',
      schedule: '지정 없음',
      details: `[간편상담 신청] 문의내용: ${conInquiry || '없음'} / 희망시간: ${conTime}`,
      uploadsCount: 0,
      uploads: [],
      timestamp: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save consultation submission directly to Supabase Database
    import('../lib/leads').then(({ addLeadSubmission }) => {
      addLeadSubmission({
        lead: newConPort,
        consultation: newConPort
      });
    });

    setConName('');
    setConPhone('');
    setConInquiry('');
    setShowConSuccess(true);
    setTimeout(() => setShowConSuccess(false), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* CTA MODULE 01 */}
      <div className="border border-brand-border p-8 bg-brand-bg/10 relative space-y-6 flex flex-col justify-between">
        {showEstSuccess && (
          <div className="absolute inset-0 bg-[#111111]/95 text-white p-8 flex flex-col justify-center items-center text-center z-10 space-y-3">
            <Sparkles size={20} className="animate-pulse" />
            <h4 className="text-xs uppercase tracking-[0.2em] font-normal">정밀 간편 견적서 접정 완료</h4>
            <p className="text-[10px] text-brand-muted font-light max-w-xs leading-relaxed">
              성공적으로 기본 구조가 검사되었습니다. 영업 시간 기준 3시간 이내 담당 디렉터가 배치 검토안과 시공 기준 단가표를 전송하겠습니다.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-widest text-brand-dark flex justify-between items-baseline border-b border-brand-border/40 pb-4">
            <span>01 / {homepageCms.portal1Title}</span>
            <span className="text-[9px] text-brand-muted font-mono tracking-wider font-light">ESTIMATE PORTAL</span>
          </h3>
          <p className="text-[11px] font-light text-brand-muted leading-relaxed tracking-wide">
            {homepageCms.portal1Desc}
          </p>
          
          <form onSubmit={handleEstSubmit} className="space-y-3.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form1NameLabel}</label>
                <input
                  type="text"
                  placeholder="실명 입력"
                  value={estName}
                  onChange={(e) => setEstName(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form1PhoneLabel}</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={estPhone}
                  onChange={(e) => setEstPhone(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form1TypeLabel}</label>
                <select
                  value={estType}
                  onChange={(e) => setEstType(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none"
                >
                  <option value="아파트 인테리어">아파트 인테리어</option>
                  <option value="욕실 인테리어">욕실 인테리어</option>
                  <option value="상가 인테리어">상가 인테리어</option>
                  <option value="카페 인테리어">카페 인테리어</option>
                  <option value="오피스 인테리어">오피스 인테리어</option>
                  <option value="키즈풀 인테리어">키즈풀 인테리어</option>
                  <option value="주거 리모델링">주거 리모델링</option>
                  <option value="상업공간 인테리어">상업공간 인테리어</option>
                  <option value="맞춤 프로젝트">맞춤 프로젝트</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form1AreaLabel}</label>
                <input
                  type="number"
                  placeholder="예: 32"
                  value={estArea}
                  onChange={(e) => setEstArea(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form1BudgetLabel}</label>
              <select
                value={estBudget}
                onChange={(e) => setEstBudget(e.target.value)}
                className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none"
              >
                <option value="3천만원 이하">3천만원 이하</option>
                <option value="3천~5천">3천~5천</option>
                <option value="5천~1억">5천~1억</option>
                <option value="1억~2억">1억~2억</option>
                <option value="2억 이상">2억 이상</option>
                <option value="상담 후 조정">상담 후 원가 산출</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-dark text-white text-[10px] tracking-widest uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={11} />
                <span>예상 공간 견적 즉시 받기</span>
              </button>
            </div>
          </form>
        </div>

        <div className="pt-6 border-t border-brand-border/40 text-[9px] text-brand-muted font-light flex justify-between items-baseline">
          <span>* 1204 정찰 가격 분석 공식 적용</span>
          <button 
            type="button"
            onClick={() => { setView('estimate'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-brand-dark hover:underline cursor-pointer"
          >
            기능 고도화 7단계 도구 실행 →
          </button>
        </div>
      </div>

      {/* CTA MODULE 02 */}
      <div className="border border-brand-border p-8 bg-brand-bg/10 relative space-y-6 flex flex-col justify-between">
        {showConSuccess && (
          <div className="absolute inset-0 bg-[#111111]/95 text-white p-8 flex flex-col justify-center items-center text-center z-10 space-y-3">
            <Check size={20} className="text-emerald-500 animate-bounce" />
            <h4 className="text-xs uppercase tracking-[0.2em] font-normal">통화 예약 접정 완료</h4>
            <p className="text-[10px] text-brand-muted font-light max-w-xs leading-relaxed">
              귀하의 소중한 의견이 등록되었습니다. 전담 플래너가 기재해 주신 최적 시간대에 맞춰 기술 시방 사양을 가지고 연락드리겠습니다.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-widest text-brand-dark flex justify-between items-baseline border-b border-brand-border/40 pb-4">
            <span>02 / {homepageCms.portal2Title}</span>
            <span className="text-[9px] text-brand-muted font-mono tracking-wider font-light">QUICK CALL</span>
          </h3>
          <p className="text-[11px] font-light text-brand-muted leading-relaxed tracking-wide">
            {homepageCms.portal2Desc}
          </p>
          
          <form onSubmit={handleConSubmit} className="space-y-3.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form2NameLabel}</label>
                <input
                  type="text"
                  placeholder="실명 기재"
                  value={conName}
                  onChange={(e) => setConName(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form2PhoneLabel}</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={conPhone}
                  onChange={(e) => setConPhone(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form2TypeLabel}</label>
                <select
                  value={conType}
                  onChange={(e) => setConType(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none"
                >
                  <option value="아파트 인테리어">아파트 인테리어</option>
                  <option value="욕실 인테리어">욕실 인테리어</option>
                  <option value="상가 인테리어">상가 인테리어</option>
                  <option value="카페 인테리어">카페 인테리어</option>
                  <option value="오피스 인테리어">오피스 인테리어</option>
                  <option value="키즈풀 인테리어">키즈풀 인테리어</option>
                  <option value="주거 리모델링">주거 리모델링</option>
                  <option value="상업공간 인테리어">상업공간 인테리어</option>
                  <option value="맞춤 프로젝트">맞춤 프로젝트</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form2TimeLabel}</label>
                <select
                  value={conTime}
                  onChange={(e) => setConTime(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none"
                >
                  <option value="오전 10시 ~ 12시">오전 10시 ~ 12시</option>
                  <option value="오후 12시 ~ 3시">오후 12시 ~ 3시</option>
                  <option value="오후 3시 ~ 6시">오후 3시 ~ 6시</option>
                  <option value="상관 없음">아무 때나 상관 없음</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-brand-muted tracking-wider uppercase">{homepageCms.form2DescLabel}</label>
              <input
                type="text"
                placeholder="예: 예산 한계 속 조적 욕실 구현 가능 여부"
                value={conInquiry}
                onChange={(e) => setConInquiry(e.target.value)}
                className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-dark text-white text-[10px] tracking-widest uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={11} />
                <span>간편 우선상담 신청</span>
              </button>
            </div>
          </form>
        </div>

        <div className="pt-6 border-t border-brand-border/40 text-[9px] text-brand-muted font-light flex justify-between items-baseline">
          <span>* 직영 상담 플래너 정속 예약제</span>
          <button 
            type="button"
            onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-brand-dark hover:underline cursor-pointer"
          >
            카카오톡 & 유선 직접 연결 →
          </button>
        </div>
      </div>
    </div>
  );
}

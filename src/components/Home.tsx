import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Project, NavView, SiteSettings } from '../types';
import { ArrowRight, MoveDown, Sparkles, Send, Check } from 'lucide-react';

interface HomeProps {
  projects: Project[];
  setView: (view: NavView) => void;
  setSelectedProjectId: (id: string | null) => void;
  settings: SiteSettings;
}

export default function Home({ projects, setView, setSelectedProjectId, settings }: HomeProps) {
  // Pull 3 featured projects for the homepage grid
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-view-container" className="pt-24 min-h-screen">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative h-[85vh] md:h-[90vh] bg-brand-bg flex items-center px-6 md:px-12 mb-32 overflow-hidden">
        {/* Background Image - Muted and extremely precise */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.visualHeroImage || "/src/assets/images/gangin_hero_1779412179856.png"}
            alt="GANG IN STUDIO Principal Space"
            className="w-full h-full object-cover grayscale-10 brightness-[0.93] contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle light overlay to match LEIBAL palette values */}
          <div className="absolute inset-0 bg-[#F7F6F2]/10 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F7F6F2] to-transparent" />
        </div>

        {/* Text Area */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col justify-end h-full pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl text-[#111111]"
          >
            {/* Super thin architectural heading */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-widest leading-[1.6] mb-8 font-sans">
              공간을 <span className="font-light">디자인하고</span> <br />
              시공까지 <span className="font-light">책임집니다.</span>
            </h1>

            {/* Sub-capabilities */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.25em] uppercase text-brand-muted/90 mb-12 font-light">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40" /> Interior Design
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40" /> Construction
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/40" /> After Service
              </span>
            </div>

            {/* CTAs following LEIBAL aesthetics: thin borders, muted response, premium styling */}
            <div className="flex items-center gap-x-6">
              <button
                id="hero-cta-portfolio"
                onClick={() => setView('portfolio')}
                className="group relative px-7 py-3 text-[11px] uppercase tracking-[0.2em] bg-brand-dark text-white hover:bg-brand-dark/90 transition-all duration-300 rounded-none cursor-pointer focus:outline-none flex items-center gap-2"
              >
                <span>포트폴리오</span>
                <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-cta-estimate"
                onClick={() => setView('estimate')}
                className="group px-7 py-3 text-[11px] uppercase tracking-[0.2em] border border-brand-dark/30 text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-500 rounded-none cursor-pointer focus:outline-none"
              >
                견적문의
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator to maintain editorial feel */}
        <div className="absolute right-12 bottom-12 hidden md:flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-brand-muted/75 vertical-text">
          <span className="transform rotate-90 origin-right whitespace-nowrap mb-4">아래로 스크롤</span>
          <MoveDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* 2. PHILOSOPHY HIGHLIGHT */}
      <section id="introduction-philosophy" className="max-w-[1400px] mx-auto px-6 md:px-12 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-baseline">
          {/* Tag */}
          <div className="lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              01 — Brand Philosophy
            </span>
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#111111] mt-2 font-normal">
              GANG IN STUDIO
            </h2>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl md:text-2xl font-light tracking-[0.1em] text-brand-dark font-sans leading-relaxed">
              우리는 쓸모없는 화려한 장식과 소음을 지우고 오직 본질적인 선과 기하학적 비례에 집중합니다.
            </h3>
          </div>

          <div className="lg:col-span-4 text-xs font-light tracking-wide text-brand-muted leading-relaxed space-y-4">
            <p>
              나무, 석재, 콘크리트, 금속. 자연에서 길러낸 가공되지 않은 자재에 빛의 춤을 더해 거주자가 매일 진정한 마음의 응집력과 고요함을 발견하도록 설계합니다.
            </p>
            <p>
              강인스튜디오는 디자인 단계에서 기획한 1mm의 미세한 공차와 음영 디테일을 현장 시공 소장들이 한치의 오차 없이 그대로 구축해 나갑니다. 그것이 우리 인테리어의 품위이자 책임감입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS ARCHITECTURAL GRID */}
      <section id="featured-projects" className="max-w-[1400px] mx-auto px-6 md:px-12 mb-36">
        <div className="flex justify-between items-baseline border-b border-brand-border pb-6 mb-16">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              02 — Editorial Curation
            </span>
            <h3 className="text-sm uppercase tracking-[0.2em] text-[#111111] font-light">
              Featured Spaces (선정작)
            </h3>
          </div>
          <button
            id="view-all-portfolio"
            onClick={() => setView('portfolio')}
            className="text-[10px] tracking-[0.1em] text-brand-muted hover:text-[#111111] transition-colors focus:outline-none flex items-center gap-2 cursor-pointer pb-1 border-b border-transparent hover:border-brand-dark"
          >
            <span>전체 포트폴리오 보기</span>
            <ArrowRight size={10} />
          </button>
        </div>

        {/* Asymmetrical composition for high-end look */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {featuredProjects.map((project, idx) => {
            // Give even projects an offset to create dynamic asymmetric vertical flow
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
                {/* Image Wrap */}
                <div className="w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-brand-border relative mb-6">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
                    alt={project.title || "Bathroom Interior Project"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
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
                    <h4 className="text-sm font-light text-[#111111] tracking-wider mt-1.5 mb-1 group-hover:text-brand-muted transition-colors duration-300">
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

      {/* 4. BUSINESS CORE VALUES (1204DESIGN INSPIRED FUNCTIONALITY) */}
      <section id="trust-core-business" className="bg-white/40 border-y border-brand-border py-28 mb-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
              03 — Integrity & Precision
            </span>
            <h2 className="text-xl md:text-2xl font-light tracking-[0.1em] text-[#111111] mt-2 mb-6">
              투명성 회계제도와 직직영 책임 시공의 약속
            </h2>
            <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wide">
              광주 인테리어 업체 중 유일하게 투명한 상세 명세 자재 원가 내역서를 계약 전 100% 가감 없이 공유하며, 중간 마진 명세 일체의 요소를 정출하는 정제된 1204DESIGN 비즈니스 투명성 공식을 엄수합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block">01 / 정가 원가 공개</span>
              <h3 className="text-sm font-light tracking-widest text-[#111111]">자재 등급 정찰제</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                계약하는 세밀 자재 하나까지 단위 수량과 도소매 단가를 투명하게 공개해 가라 자재나 임의 변경 행위가 애초에 불가능하도록 회계 감독선을 수립합니다.
              </p>
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block">02 / 직영 소장제</span>
              <h3 className="text-sm font-light tracking-widest text-[#111111]">실내건축공업 라이선스 소지</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                외주 대마에 전적으로 시공을 위탁하는 타 업체들과 달리 본사의 15년 차 경력 정규 면허 기술진이 도면과 동일한 자재의 접합률을 실시간 전담 감독합니다.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block">03 / 3개년 웰니스 점검</span>
              <h3 className="text-sm font-light tracking-widest text-[#111111]">무상 AS 및 사후 복구 기술</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                하자 이행 증권 상의 기간을 뛰어넘어, 사후 3개년간 자사 소속 시공 사후 수련팀이 6달 간격으로 실내 습도 밸런스와 오크 가구 뒤틀림 복원을 무료로 리포팅합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIMARY CONVERSION CTA SYSTEM (CTA MODULE 01 + CTA MODULE 02) */}
      <section id="conversion-cta-block" className="max-w-[1400px] mx-auto px-6 md:px-12 mb-36 border-t border-brand-border/60 pt-28">
        <div className="max-w-xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
            04 — HIGH CONVERSION PORTALS
          </span>
          <h2 className="text-xl md:text-2xl font-light tracking-[0.1em] text-[#111111] mt-2 mb-4">
            공학적 투명성과 시적 여백의 기획 채널
          </h2>
          <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wide">
            강인스튜디오가 제공하는 두 가지 특화 상담 포털입니다. 정밀한 원가 설계를 위한 예상 견적서 제출과 간편하고 신속한 대표 전속 통화 예약 중 선호하시는 경로를 이행하십시오.
          </p>
        </div>

        <HomeConversionCTAs setView={setView} />
      </section>
    </div>
  );
}

// Subcomponent to organize forms cleanly in interactive state
function HomeConversionCTAs({ setView }: { setView: (view: NavView) => void }) {
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
      consultationType: 'Call',
      submittedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending'
    };

    // Store estimate
    const currentEsts = JSON.parse(localStorage.getItem('gangin_estimates') || '[]');
    localStorage.setItem('gangin_estimates', JSON.stringify([newEst, ...currentEsts]));

    const allLeads = JSON.parse(localStorage.getItem('gangin_all_leads') || '[]');
    localStorage.setItem('gangin_all_leads', JSON.stringify([
      {
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
      },
      ...allLeads
    ]));

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

    const allLeads = JSON.parse(localStorage.getItem('gangin_all_leads') || '[]');
    localStorage.setItem('gangin_all_leads', JSON.stringify([newConPort, ...allLeads]));

    // Also save in a dedicated consultations key for redundancy
    const currentCons = JSON.parse(localStorage.getItem('gangin_consultations') || '[]');
    localStorage.setItem('gangin_consultations', JSON.stringify([newConPort, ...currentCons]));

    setConName('');
    setConPhone('');
    setConInquiry('');
    setShowConSuccess(true);
    setTimeout(() => setShowConSuccess(false), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* CTA MODULE 01: 우리집 / 나의가게 예상견적 받아보기 */}
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
          <h3 className="text-sm font-normal tracking-widest text-brand-dark flex justify-between items-baseline border-b border-brand-border/40 pb-4">
            <span>01 / 우리집 예상견적 받아보기</span>
            <span className="text-[9px] text-brand-muted font-mono tracking-wider font-light">ESTIMATE PORTAL</span>
          </h3>
          <p className="text-[11px] font-light text-brand-muted leading-relaxed tracking-wide">
            평수와 원가 기준을 빠르게 연산하여 가도면 상담을 예약하는 간섭 없는 인스턴트 견적 채널입니다. 더 면밀한 정보는 언제든 견적문의 탭의 7단계 도구를 실행하십시오.
          </p>
          
          <form onSubmit={handleEstSubmit} className="space-y-3.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">고객 성함</label>
                <input
                  type="text"
                  placeholder="실명 입력"
                  value={estName}
                  onChange={(e) => setEstName(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">대표 번호</label>
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
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">공간 분야</label>
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
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">분양 면적 (평형)</label>
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
              <label className="text-[9px] text-brand-muted tracking-wider uppercase">보유 예산 규모</label>
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

      {/* CTA MODULE 02: 간편상담 받아보기 (QUICK CONSULTATION) */}
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
          <h3 className="text-sm font-normal tracking-widest text-brand-dark flex justify-between items-baseline border-b border-brand-border/40 pb-4">
            <span>02 / 간편 유선 긴급상담 받아보기</span>
            <span className="text-[9px] text-brand-muted font-mono tracking-wider font-light">QUICK CALL</span>
          </h3>
          <p className="text-[11px] font-light text-brand-muted leading-relaxed tracking-wide">
            복잡한 서류 절차가 아닌, 단순 시공 가부 여부 및 사옥 예약 방법론 등을 바리스타 처럼 빠르고 격조 있게 물어보는 1분 직통 신청 창구입니다.
          </p>
          
          <form onSubmit={handleConSubmit} className="space-y-3.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">대표 성함</label>
                <input
                  type="text"
                  placeholder="실명 기재"
                  value={conName}
                  onChange={(e) => setConName(e.target.value)}
                  className="w-full text-xs font-light p-2.5 bg-white border border-brand-border/60 focus:outline-none focus:border-brand-dark"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">전화 번호</label>
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
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">문의 카테고리</label>
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
                <label className="text-[9px] text-brand-muted tracking-wider uppercase">통화 희망 시간대</label>
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
              <label className="text-[9px] text-brand-muted tracking-wider uppercase">간단 문의 사항</label>
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


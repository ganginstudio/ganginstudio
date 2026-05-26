import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavView, Project, ServiceCategory, ServicePackage, FAQItem, CustomerReview } from '../types';
import { ArrowRight, ClipboardList, Package, HelpCircle, Star, Palette, RefreshCw } from 'lucide-react';

interface CategoriesProps {
  categories: ServiceCategory[];
  projects: Project[];
  packages: ServicePackage[];
  faq: FAQItem[];
  reviews: CustomerReview[];
  setView: (view: NavView) => void;
  setSelectedProjectId: (id: string | null) => void;
  setEstimatePrefill: (category: string, title: string) => void;
}

export default function Categories({
  categories,
  projects,
  packages,
  faq,
  reviews,
  setView,
  setSelectedProjectId,
  setEstimatePrefill,
}: CategoriesProps) {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || 'apartment');

  const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  // Projects linked to active category
  const filteredProjects = projects.filter(
    (p) => p.category.toLowerCase() === activeCategory.id.toLowerCase() || 
           (p.category === 'Residential' && activeCategory.id === 'apartment') ||
           (p.category === 'Cafe' && activeCategory.id === 'cafe') ||
           (p.category === 'Commercial' && activeCategory.id === 'commercial') ||
           (p.category === 'Bathroom' && activeCategory.id === 'bathroom') ||
           (p.category === 'Office' && activeCategory.id === 'office') ||
           (p.category === 'Kids Pool' && activeCategory.id === 'kidspool') ||
           (p.category === 'Custom Project' && activeCategory.id === 'custom_project')
  );

  // Package linked to active category
  const connectedPackage = packages.find((p) => p.categoryKey === activeCategory.id);

  // FAQs linked
  const connectedFAQs = faq.slice(0, 3); // Grab a few elegant FAQs as placeholders

  // Reviews linked
  const connectedReviews = reviews.filter(
    (r) => r.category === activeCategory.nameKr || r.id === 'rev_01'
  ).slice(0, 2);

  const handleInquiryAction = () => {
    setEstimatePrefill(activeCategory.nameKr, activeCategory.nameEn);
    setView('estimate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-28 pb-32 max-w-[1400px] mx-auto px-6 md:px-12"
    >
      {/* Editorial Header */}
      <div className="mb-14 space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
          SPECIALIZED SOLUTIONS
        </span>
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.16em] text-[#111111] uppercase">
          분야별 공간 제안
        </h1>
        <p className="text-xs font-light text-brand-muted max-w-xl leading-relaxed tracking-wider">
          단순한 마감을 뛰어넘어 공간 사용자의 정서적 침묵과 비즈니스의 원초적 목적을 보증하기 위해, 강인스튜디오는 9가지 독자적 구조 설계 카테고리를 고유한 맞춤 시방 기준으로 운영합니다.
        </p>
      </div>

      {/* Categories Modern Tab Selector */}
      <div className="overflow-x-auto scrollbar-none border-b border-brand-border/60 pb-3 mb-16">
        <div className="flex gap-x-8 md:gap-x-12 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`text-[11px] md:text-xs tracking-[0.08em] pb-3 font-normal transition-colors relative focus:outline-none cursor-pointer ${
                activeTab === cat.id
                  ? 'text-[#111111] font-semibold'
                  : 'text-brand-muted hover:text-[#111111]'
              }`}
            >
              <span>{cat.nameKr}</span>
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeCategoryBorder"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-dark"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Vista */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="space-y-24"
        >
          {/* A. Minimal hero block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block">
                Category Code: {activeCategory.nameEn}
              </span>
              <h2 className="text-xl md:text-3xl font-light tracking-wide text-[#111111] leading-snug">
                {activeCategory.nameKr}
              </h2>
              <p className="text-xs md:text-sm font-light text-brand-muted leading-relaxed tracking-wide">
                {activeCategory.description}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={handleInquiryAction}
                  className="px-8 py-3.5 bg-brand-dark text-white text-[11px] tracking-widest uppercase hover:bg-black transition-all cursor-pointer rounded-none"
                >
                  {activeCategory.nameKr} 견적서 신청하기
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-7 bg-brand-bg relative aspect-[16/10] overflow-hidden border border-brand-border/60 shadow-xs">
              <img
                src={activeCategory.heroImage}
                alt={activeCategory.nameKr}
                className="w-full h-full object-cover grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* B. Service scope & Material Curation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-12 border-t border-brand-border/40">
            {/* Scope */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <ClipboardList size={14} className="text-brand-muted" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111]">
                  세부 설계 및 완벽 시공 범위
                </h3>
              </div>
              <ul className="space-y-4 text-xs font-light text-brand-dark/90 leading-relaxed tracking-wide">
                {activeCategory.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-brand-muted/70 mt-0.5">0{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <Palette size={14} className="text-brand-muted" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111]">
                  천연 프리미엄 자재 매칭 큐레이션
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {activeCategory.materials.map((mat, idx) => (
                  <div key={idx} className="bg-white p-5 border border-brand-border/60 space-y-2 flex flex-col justify-between">
                    <span className="text-[10px] font-medium text-brand-dark block tracking-widest">{mat.name}</span>
                    <p className="text-[10px] leading-relaxed text-brand-muted font-light">{mat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* C. Pricing Framework starting display */}
          {connectedPackage && (
            <div className="bg-white border border-brand-border p-8 md:p-12 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 border-b border-brand-border/40 pb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-brand-muted">standard rates</span>
                  <h3 className="text-md font-light text-brand-dark tracking-wide mt-1">
                    {connectedPackage.name}
                  </h3>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[10px] tracking-widest text-brand-muted block uppercase">Starting From</span>
                  <span className="text-lg md:text-xl font-light text-brand-dark tracking-widest block mt-1">
                    {connectedPackage.startingPrice}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/80 block font-normal">
                    포함 및 완결 범위 (Included Specs)
                  </span>
                  <ul className="space-y-2.5 text-xs text-brand-muted font-light">
                    {connectedPackage.includedScope.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-dark/30" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/80 block font-normal">
                    공사 표준 스케줄 (Construction Timeline)
                  </span>
                  <p className="text-xs text-brand-muted font-light leading-relaxed">
                    {connectedPackage.timelineSummary}
                  </p>
                  <div className="bg-brand-bg/40 p-3.5 border border-brand-border/40">
                    <span className="text-[9px] text-brand-muted font-mono block pb-1 border-b border-brand-border/40 uppercase">Process summary</span>
                    <p className="text-[10px] text-brand-muted/95 leading-relaxed font-light mt-1">{connectedPackage.processSummary}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* D. Process Explanation Timeline */}
          <div className="space-y-8">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#111111] font-medium flex items-center gap-2.5">
              <RefreshCw size={13} strokeWidth={1.5} />
              <span>진행 절차 프로세스 (Process Flow)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
              {activeCategory.process.map((step, idx) => (
                <div key={idx} className="relative p-5 border border-brand-border/40 bg-white space-y-2">
                  <span className="text-[10px] font-mono font-bold text-brand-muted block">STEP 0{idx + 1}</span>
                  <p className="text-xs font-light text-brand-dark leading-relaxed">
                    {step.split('. ')[1] || step}
                  </p>
                  {idx < 4 && (
                    <span className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-brand-border z-10 text-xs">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* E. Connected Portfolio Showcase (VIBRANT NATURAL COLORS) */}
          {filteredProjects.length > 0 && (
            <div className="space-y-8 pt-6 border-t border-brand-border/40">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-brand-muted block">
                linked archives
              </span>
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-dark">
                이 분야 실제 시공 완료작 (Color Archive)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProjectClick(p.id)}
                    className="group cursor-pointer space-y-3"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-brand-border relative">
                      <img
                        src={p.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
                        alt={p.title || "Bathroom Interior Project"}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-baseline border-b border-brand-border/30 pb-2">
                      <div>
                        <h4 className="text-xs font-normal text-brand-dark">{p.title || 'GANGIN Space'}</h4>
                        <span className="text-[9px] text-brand-muted font-light">{p.location || 'Gwangju'}</span>
                      </div>
                      <span className="text-[9px] text-brand-muted/70 font-mono">{p.area || 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* F. FAQs & Client Reviews Combination */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-brand-border/40">
            {/* Reviews */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111] font-medium flex items-center gap-2">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <span>이 설계 분야 고객 수공 스토리</span>
              </h3>
              
              <div className="space-y-6">
                {connectedReviews.map((rev) => (
                  <div key={rev.id} className="bg-brand-bg/40 p-6 border border-brand-border/50 space-y-3">
                    <span className="text-[10px] font-mono text-brand-muted">{rev.clientName} | {rev.date}</span>
                    <h4 className="text-xs font-normal text-brand-dark">"{rev.highlight}"</h4>
                    <p className="text-[11px] leading-relaxed text-brand-muted font-light">{rev.story}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* General Inquiry Link */}
            <div className="bg-brand-bg/50 p-8 flex flex-col justify-center items-center text-center space-y-6 border border-brand-border/40">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-brand-muted">conversion hub</span>
              <h3 className="text-md font-light text-brand-dark tracking-wide max-w-sm">
                해당 공간 레이아웃 맞춤 시안 및 미팅 신청
              </h3>
              <p className="text-xs text-brand-muted font-light max-w-sm">
                온라인 신청 후 평면도 분석 및 자재 연구를 사전에 준비하여 최상의 솔루션으로 1시간 미팅을 보증해 드립니다.
              </p>
              <button
                onClick={handleInquiryAction}
                className="group relative px-8 py-3.5 text-[10px] uppercase tracking-widest bg-brand-dark text-white hover:bg-black transition-all cursor-pointer flex items-center gap-2"
              >
                <span>간편 문의하러 가기</span>
                <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

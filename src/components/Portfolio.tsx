import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, NavView } from '../types';
import { Maximize2 } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
  setSelectedProjectId: (id: string | null) => void;
  selectedProjectId: string | null;
  renderDetailView: (id: string) => ReactNode;
}

const categoryTranslations: Record<string, string> = {
  All: '전체 아카이브',
  Commercial: '상가 인테리어',
  Bathroom: '욕실 인테리어',
  Residential: '아파트 인테리어',
  Cafe: '카페 인테리어',
  Office: '오피스 인테리어',
  'Kids Pool': '키즈풀 인테리어',
  Architecture: '맞춤 건축',
  Retail: '리테일 매장',
  'Custom Project': '맞춤 프로젝트',
};

export default function Portfolio({ projects, setSelectedProjectId, selectedProjectId, renderDetailView }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = [
    'All',
    'Residential',
    'Bathroom',
    'Commercial',
    'Cafe',
    'Office',
    'Kids Pool',
    'Custom Project'
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Reset page limit whenever category filter changes
  const handleFilterClick = (cat: string) => {
    setActiveFilter(cat);
    setVisibleCount(6);
  };

  // If a project is selected, render the detail view right inside!
  if (selectedProjectId) {
    return (
      <div id="portfolio-detail-outer-container">
        {renderDetailView(selectedProjectId)}
      </div>
    );
  }

  return (
    <div id="portfolio-list-container" className="pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      {/* Intro Header */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[#111111] text-white text-[10px] font-bold shrink-0">01</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#111111] block">
            Archived Works — 시공실적 선집
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-[0.18em] text-[#111111] uppercase leading-relaxed">
          포트폴리오
        </h1>
      </div>

      {/* Category filter row with high-readability thicker gothic styling */}
      <div 
        id="portfolio-category-filter-row"
        className="flex flex-wrap gap-x-6 gap-y-3 border-b border-brand-border/60 pb-3 mb-8 overflow-x-auto hide-scrollbar"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
            onClick={() => handleFilterClick(cat)}
            className={`text-[12px] md:text-[13px] uppercase tracking-[0.05em] py-2 cursor-pointer transition-all duration-300 font-bold focus:outline-none whitespace-nowrap border-b-2 ${
              activeFilter === cat
                ? 'text-[#111111] border-[#111111] scale-105'
                : 'text-brand-muted border-transparent hover:text-[#111111] hover:border-brand-muted/40'
            }`}
          >
            {categoryTranslations[cat] || cat}
          </button>
        ))}
      </div>

      {/* Grid wrapper */}
      <div id="portfolio-frame-wrapper" className="mb-16">
        {/* Grid of Projects */}
        <motion.div 
          layout
          id="portfolio-grid-layout"
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                key={project.id}
                id={`portfolio-card-${project.id}`}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Frame with rounded corners tailored for mobile & desktop */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-[#fafaf9] rounded-[10px] sm:rounded-[14px] relative mb-2 sm:mb-4 shadow-sm">
                  <img
                    src={project.imageMobile || project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
                    alt={project.title || "Interior Project"}
                    loading="lazy"
                    className="w-full h-full object-cover bg-[#fafaf9] transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                    }}
                  />
                  <div className="absolute inset-0 bg-neutral-900/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Minimalist modern metadata labels directly mimicking reference image */}
                <div className="text-left font-sans pl-1">
                  <h4 className="text-[12px] sm:text-[16px] font-bold text-[#111111] tracking-tight leading-snug group-hover:text-brand-muted transition-colors duration-300">
                    {project.title || 'GANGIN Space'}
                  </h4>
                  <p className="text-[10px] sm:text-[12px] text-neutral-400 font-normal mt-1 sm:mt-1.5 tracking-wide">
                    {project.location || '광주'}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* The More Button styled exactly like the attached image */}
        {hasMore && (
          <div className="flex justify-center mt-12 mb-2">
            <button 
              onClick={handleShowMore}
              className="px-8 py-3.5 bg-[#DEDAD2] text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 text-[11px] tracking-[0.25em] font-bold uppercase cursor-pointer"
            >
              THE MORE
            </button>
          </div>
        )}
      </div>

      {/* No Results Fallback */}
      {filteredProjects.length === 0 && (
        <div id="portfolio-no-results" className="text-center py-24 space-y-4">
          <p className="text-sm font-bold text-brand-muted tracking-widest">
            선택하신 카테고리의 커스텀 프로젝트 시안을 정교히 기획 중입니다.
          </p>
          <button 
            onClick={() => handleFilterClick('All')}
            className="text-[11px] tracking-widest font-bold text-[#111111] border-b border-brand-dark pb-1 focus:outline-none cursor-pointer"
          >
            전체 프로젝트 보기
          </button>
        </div>
      )}
    </div>
  );
}

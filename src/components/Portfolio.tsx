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
    <div id="portfolio-list-container" className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      {/* Intro Header */}
      <div className="mb-20 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark block">
          Archived Works — 시공실적 선집
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-[0.1em] text-[#111111] uppercase">
          포트폴리오
        </h1>
      </div>

      {/* Category filter row with high-readability thicker gothic styling */}
      <div 
        id="portfolio-category-filter-row"
        className="flex flex-wrap gap-x-6 gap-y-3 border-b border-brand-border/60 pb-8 mb-16 overflow-x-auto pb-4 hide-scrollbar"
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

      {/* Grid wrapper with pure white background */}
      <div id="portfolio-frame-wrapper" className="bg-[#ffffff] p-4 sm:p-8 md:p-14 mb-16 shadow-xs">
        {/* Grid of Projects */}
        <motion.div 
          layout
          id="portfolio-grid-layout"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                key={project.id}
                id={`portfolio-card-${project.id}`}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer relative h-auto sm:aspect-square bg-[#FFFFFF]/30 overflow-hidden border border-brand-border/40"
              >
                {/* Image Frame */}
                <div className="w-full h-auto sm:h-full overflow-hidden bg-[#fafaf9]">
                  <img
                    src={project.imageMobile || project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
                    alt={project.title || "Bathroom Interior Project"}
                    loading="lazy"
                    className="w-full h-auto block sm:h-full sm:object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                    }}
                  />
                </div>

                {/* Minimal elegant overlay on hover */}
                <div className="absolute inset-0 bg-[#ECE9E2]/95 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out flex flex-col justify-between p-7 select-none">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold block">
                      {project.category || 'Space'} — {project.year || '2026'}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#111111] tracking-wide line-clamp-1">
                      {project.title || 'GANGIN Space'}
                    </h3>
                    <p className="text-[11px] text-[#555] font-semibold italic">
                      {project.titleEn || ''}
                    </p>
                  </div>
                  
                  <div className="border-t border-brand-dark/15 pt-5 flex justify-between items-end">
                    <div className="text-left space-y-0.5">
                      <span className="text-[10.5px] font-bold text-brand-dark block">
                        {(project.location || '').split(' ')[2] || project.location || 'Gwangju'}
                      </span>
                      <span className="text-[9.5px] font-bold text-brand-muted/80 block">
                        {project.area || 'N/A'}
                      </span>
                    </div>
                    <span className="text-[9px] font-extrabold tracking-widest text-brand-dark uppercase border-b border-brand-dark pb-0.5">
                      자세히 보기
                    </span>
                  </div>
                </div>

                {/* Mobile backup text layer only visible when under touch screen & not hovered */}
                <div className="sm:hidden absolute bottom-0 left-0 w-full bg-[#111111]/70 backdrop-blur-xs p-2 text-center">
                  <span className="text-[10px] text-white font-bold">{project.title}</span>
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

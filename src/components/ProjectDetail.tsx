import { motion } from 'motion/react';
import { Project, NavView } from '../types';
import { ArrowLeft, ArrowRight, ShieldCheck, Calendar, MapPin, Hash, Ruler } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  setView: (view: NavView) => void;
  setEstimatePrefill: (category: string, title: string) => void;
}

export default function ProjectDetail({ project, onBack, setView, setEstimatePrefill }: ProjectDetailProps) {
  const handleInquiryTrigger = () => {
    setEstimatePrefill(project.category, project.title);
    setView('estimate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      id={`project-detail-${project.id}`}
      className="bg-brand-bg min-h-screen pt-24 pb-32"
    >
      {/* Editorial Sub Navigation Bar - Sticky */}
      <div className="sticky top-[73px] bg-brand-bg/95 backdrop-blur-xs border-y border-brand-border/60 z-30 px-6 md:px-12 py-3.5">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[10px] tracking-[0.25em] uppercase font-light">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-dark hover:text-brand-muted transition-colors focus:outline-none cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>아카이브 목록</span>
          </button>
          
          <span className="text-[#111111] hidden sm:inline tracking-[0.15em] font-normal">
            {project.title}
          </span>
          
          <button
            onClick={handleInquiryTrigger}
            className="text-brand-dark hover:text-brand-muted font-normal underline underline-offset-4 focus:outline-none cursor-pointer"
          >
            이 공간 견적 문의
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12">
        {/* 1. LARGE WIDESCREEN HERO */}
        <section className="mb-24">
          <div className="w-full h-auto md:h-[75vh] md:aspect-auto overflow-hidden bg-[#fafaf9] border border-brand-border/40">
            <img
              src={project.imageMobile || project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
              alt={project.title || "Bathroom Interior Project"}
              loading="lazy"
              className="w-full h-auto block md:h-full md:object-cover animate-fade-in"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
              }}
            />
          </div>
        </section>

        {/* 2. SPECIFICATION ASYMMETRIC SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-28 border-b border-brand-border/50 pb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block">Identity Specs</span>
            <h2 className="text-xl md:text-2xl font-semibold tracking-widest text-[#111111] uppercase leading-relaxed">
              {project.title || 'GANGIN Space'} <br/>
              <span className="text-xs tracking-[0.2em] text-brand-muted font-normal block mt-1">
                {project.titleEn || ''}
              </span>
            </h2>
          </div>

          {/* Quick Specifications list */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/75 flex items-center gap-1.5"><MapPin size={10} /> Location</span>
              <p className="text-xs text-brand-dark font-light">{project.location || 'Gwangju, Korea'}</p>
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/75 flex items-center gap-1.5"><Ruler size={10} /> Sizing Area</span>
              <p className="text-xs text-brand-dark font-light">{project.area || 'N/A'}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/75 flex items-center gap-1.5"><Calendar size={10} /> Timeline</span>
              <p className="text-xs text-brand-dark font-light">{project.timeline || 'N/A'}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/75 flex items-center gap-1.5"><Hash size={10} /> Category</span>
              <p className="text-xs text-brand-dark font-light">{project.category || 'Space'}</p>
            </div>

            <div className="space-y-1.5 col-span-2">
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-muted/75 flex items-center gap-1.5"><ShieldCheck size={10} /> Lead Architect / Client</span>
              <p className="text-xs text-brand-dark font-light">GANG IN Technical Division for {project.client || 'Private Client'}</p>
            </div>
          </div>
        </section>

        {/* 2. GALLERY SYSTEM */}
        {(project.gallery || []).length > 0 && (
          <section className="mb-32">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block mb-12">
              Gallery Special — 공간별 상세 갤러리 아카이브
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(project.gallery || []).map((img, index) => (
                <div key={index} className="space-y-3">
                   <div className="w-full h-auto md:aspect-[4/3] overflow-hidden bg-[#fafaf9] border border-brand-border/40">
                    <img 
                      src={img.urlMobile || img.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'} 
                      alt={img.caption || "Bathroom Interior Project"} 
                      loading="lazy"
                      className="w-full h-auto block md:h-full md:object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. MINI CTA PORT CONVERSION Gaining Studio (ON:SAEMI inspired) */}
        <section className="border-t border-brand-border pt-20 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted block">Inquiry Flow</span>
            <h4 className="text-lg md:text-xl font-semibold tracking-widest text-brand-dark">
              {project.title} 스타일로 시공 설계 상담하기
            </h4>
            <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wider">
              위 주거/상가 구조 설계 및 자재 사양이 마음에 드십니까? 견적문의 섹션으로 이동하여 전문가로부터 무상 공간 설계 예비 진단과 가치 컨설팅을 즉시 받아보실 수 있습니다.
            </p>
            <div className="pt-4">
              <button
                id="details-cta"
                onClick={handleInquiryTrigger}
                className="cursor-pointer px-10 py-4 text-[10px] bg-brand-dark text-white hover:bg-black transition-colors duration-400"
              >
                이 프로젝트 스타일로 견적 문의하기
              </button>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}

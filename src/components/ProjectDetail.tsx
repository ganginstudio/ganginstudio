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
          <div className="w-full h-[60vh] md:h-[75vh] overflow-hidden bg-brand-border">
            <img
              src={project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'}
              alt={project.title || "Bathroom Interior Project"}
              loading="lazy"
              className="w-full h-full object-cover animate-fade-in"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
              }}
            />
          </div>
          <p className="text-[10px] tracking-widest text-brand-muted/70 mt-3 text-right">
            01 / Cover Design Frame — {project.titleEn || ''}
          </p>
        </section>

        {/* 2. SPECIFICATION ASYMMETRIC SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-28 border-b border-brand-border/50 pb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block">Identity Specs</span>
            <h2 className="text-xl md:text-2xl font-light tracking-widest text-[#111111] uppercase leading-relaxed">
              {project.title || 'GANGIN Space'} <br/>
              <span className="text-xs tracking-[0.2em] text-brand-muted font-extralight block mt-1">
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

        {/* 3. DESIGN PHILOSOPHY/CONCEPT STORY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32 items-baseline">
          <div className="lg:col-span-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block">02 — Concept Narrative</span>
            <h3 className="text-sm uppercase tracking-[0.25em] text-[#111111] mt-2 font-normal">
              Design Philosophy
            </h3>
          </div>
          <div className="lg:col-span-8">
            <p className="text-[14px] md:text-[15px] font-light leading-loose tracking-widest text-brand-dark/95 text-justify">
              {project.concept || '강인스튜디오만의 철학으로 설계하고 완벽하게 구축한 고품격 공간 지향 디자인입니다.'}
            </p>
          </div>
        </section>

        {/* 4. MATERIAL PALETTE LABELS DESIGN */}
        <section className="mb-32">
          <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block mb-8">03 — Tactile Materials</span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(project.materials || ['천연 보수 스펙', '매트 텍스처 패널']).map((mat, i) => (
              <div 
                key={mat}
                className="border border-brand-border p-6 flex flex-col justify-between h-40 bg-white/30"
              >
                <div className="flex justify-between items-start text-[10px] text-brand-muted/50 font-mono">
                  <span>SPEC 0{i + 1}</span>
                  <span>A-TYPE</span>
                </div>
                <div>
                  <h4 className="text-xs font-light text-brand-dark tracking-widest mb-1.5">{mat}</h4>
                  <p className="text-[9px] tracking-wide text-brand-muted">프리미엄 원산지 친환경 인증 스펙</p>
                </div>
              </div>
            ))}
            {/* Added standard stone background node mock to enhance LEIBAL realism */}
            <div className="border border-brand-border p-6 flex flex-col justify-between h-40 bg-brand-stone/40">
              <div className="flex justify-between items-start text-[10px] text-brand-muted/70 font-mono">
                <span>AMBIENT TONE</span>
                <span>STONE BEIGE</span>
              </div>
              <div>
                <h4 className="text-xs font-light text-brand-dark tracking-widest mb-1.5">Warm Gray Plaster</h4>
                <p className="text-[9px] tracking-wide text-brand-muted/70">반사율 18% 시각적 온화선 필터</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. STEP-BY-STEP DETAILED CONSTRUCTION PROCESS */}
        <section className="mb-32">
          <div className="border-b border-brand-border/40 pb-4 mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block">04 — Construction Execution</span>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#111111] mt-2 font-normal">
              단계별 책임 시공 공정
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {(project.constructionProcess || [
              { title: '수치 설계 및 도안 조율', description: '골조 수평 밸런스 점검 및 설계 레이아웃 조감 구축' }
            ]).map((step, idx) => (
              <div key={idx} className="space-y-4">
                <span className="text-[12px] font-mono tracking-widest text-[#111111]/45 block">
                  0{idx + 1} — PHASE
                </span>
                <h4 className="text-xs font-light text-[#111111] tracking-widest leading-relaxed">
                  {step?.title || ''}
                </h4>
                <p className="text-xs text-brand-muted font-light leading-relaxed tracking-wide">
                  {step?.description || ''}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. BEFORE / AFTER STORY INTERACTION */}
        <section className="mb-32 bg-white/40 border border-brand-border p-8 md:p-12">
          <div className="max-w-xl mb-12">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block">05 — Transformation Report</span>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#111111] mt-2 font-normal">
              구조적 대조 비포 & 애프터
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pb-8 border-b border-brand-border/40 mb-8">
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-widest text-[red]/70 font-semibold">
                ● BEFORE STATE
              </span>
              <p className="text-xs text-brand-muted font-light leading-relaxed text-justify">
                {project.beforeAfter?.beforeDescription || '철거 및 보수 보강이 시급해 보이던 공간입니다.'}
              </p>
            </div>
            
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-widest text-[green]/60 font-semibold">
                ● AFTER RECONSTRUCTION
              </span>
              <p className="text-xs text-[#111111] font-light leading-relaxed text-justify">
                {project.beforeAfter?.afterDescription || '하나의 완벽한 미적 질감이 흐르는 공간으로 거듭났습니다.'}
              </p>
            </div>
          </div>

          <p className="text-xs text-brand-muted italic font-light tracking-wide leading-relaxed">
            * {project.beforeAfter?.desc || '불필요한 디테일을 비워 감도 높은 구조적 균형을 선물해 드렸습니다.'}
          </p>
        </section>

        {/* 7. GALLERY SYSTEM */}
        {(project.gallery || []).length > 0 && (
          <section className="mb-32">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-muted block mb-12">
              06 — Gallery & Photographic Chronicles
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(project.gallery || []).map((img, index) => (
                <div key={index} className="space-y-3">
                   <div className="w-full aspect-[4/3] overflow-hidden bg-brand-border">
                    <img 
                      src={img.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'} 
                      alt={img.caption || "Bathroom Interior Project"} 
                      loading="lazy"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';
                      }}
                    />
                  </div>
                  <p className="text-[10px] tracking-wider text-brand-muted font-light">
                    Fig. 0{index + 2} — {img.caption || ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. MINI CTA PORT CONVERSION Gaining Studio (ON:SAEMI inspired) */}
        <section className="border-t border-brand-border pt-20 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted block">Inquiry Flow</span>
            <h4 className="text-lg md:text-xl font-light tracking-widest text-brand-dark">
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

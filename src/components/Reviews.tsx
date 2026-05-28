import { motion } from 'motion/react';
import { CustomerReview, NavView } from '../types';
import { Star, MessageSquareCode, ArrowRight } from 'lucide-react';

interface ReviewsProps {
  reviews: CustomerReview[];
  setView: (view: NavView) => void;
}

export default function Reviews({ reviews, setView }: ReviewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-16 md:pt-24 pb-16 md:pb-24 max-w-[1400px] mx-auto px-6 md:px-12"
    >
      {/* Page Header */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[#111111] text-white text-[10px] font-bold shrink-0">01</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111] font-bold block">
            SHARED EXPERIENCES — 고객 후기 선집
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-[0.18em] text-[#111111] uppercase leading-relaxed">
          고객 후기
        </h1>
        <p className="text-[13px] font-normal text-[#222222] max-w-xl leading-relaxed tracking-wider mt-2 text-justify">
          공간은 결국 사람이 누려야 합니다. 강인스튜디오와 정교하게 설계를 조율하고 한 치의 오차 없이 완공을 마주한 구성원들의 잔잔한 시방 건축 이야기를 가만히 안아 대화해 보세요.
        </p>
      </div>

      {/* Numerical Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 border-y border-brand-border/60 py-10 mb-20 text-center md:text-left">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-brand-muted block font-mono">01 — Completed Jobs</span>
          <span className="text-2xl font-extralight tracking-wider text-brand-dark mt-1 block">180+ 세대 시공 완료</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-brand-muted block font-mono">02 — Service Regions</span>
          <span className="text-2xl font-extralight tracking-wider text-brand-dark mt-1 block">호남권 직영 감리</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-brand-muted block font-mono">03 — Satisfaction Index</span>
          <span className="text-2xl font-extralight tracking-wider text-brand-dark mt-1 block">99.4% 신뢰 평정</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-brand-muted block font-mono">04 — A/S Commitment</span>
          <span className="text-2xl font-extralight tracking-wider text-brand-dark mt-1 block">무상 3개년 정기 웰니스</span>
        </div>
      </div>

      {/* Review Cards Grid - Editorial Minimal Column List */}
      <div className="space-y-24">
        {reviews.map((rev, idx) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-brand-border/40 pb-20 items-baseline"
          >
            {/* Left metadata */}
            <div className="lg:col-span-4 space-y-4">
              <span className="inline-block px-3 py-1 border-2 border-[#111111] bg-white text-[9px] uppercase tracking-[0.2em] font-bold text-[#111111]">
                {rev.category}
              </span>
              <h3 className="text-md sm:text-lg font-bold text-[#111111] tracking-wide font-sans">
                {rev.projectTitle}
              </h3>
              
              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={11} className="fill-[#111111] text-[#111111]" />
                ))}
              </div>

              <div className="text-[12px] text-[#222222] space-y-1.5 font-semibold tracking-wide pt-2">
                <p>작성자: {rev.clientName}</p>
                <p>준공일자: {rev.date}</p>
                <p>시공인증: 강인 책임소장팀 완공</p>
              </div>
            </div>

            {/* Right quotation and narrative */}
            <div className="lg:col-span-8 space-y-8">
              {/* Giant quote layout following LEIBAL */}
              <div className="relative pl-6 md:pl-10 space-y-4">
                <div className="absolute left-0 top-0 text-brand-muted/30">
                  <MessageSquareCode size={22} strokeWidth={1.2} />
                </div>
                <h4 className="text-base md:text-xl font-bold leading-relaxed tracking-wide text-[#111111] italic">
                  {rev.quote}
                </h4>
              </div>

              {/* Story */}
              <div className="space-y-4 text-[13px] font-normal leading-relaxed text-[#222222] tracking-wider pl-6 md:pl-10">
                <p className="leading-7 whitespace-pre-line text-justify">
                  {rev.story}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Conversion Portal */}
      <div className="mt-28 bg-[#FDFDFD] border border-brand-border p-8 md:p-14 text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-brand-muted block">A SPACE BUILT FOR REAL LIFE</span>
        <h3 className="text-lg md:text-2xl font-light text-brand-dark tracking-wide max-w-2xl mx-auto leading-relaxed">
          클라이언트의 라이프스타일과 공간의 본질만을 남깁니다
        </h3>
        <p className="text-xs text-brand-muted font-light max-w-sm mx-auto leading-relaxed">
          예산 내 정가 분석부터 시방 규격까지, 신뢰할 수 있는 강인의 디자이너들과 지금 상세 공간 기도를 조율해 보세요
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setView('estimate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group px-8 py-3.5 bg-brand-dark hover:bg-black text-white text-[10px] tracking-widest uppercase transition-all cursor-pointer rounded-none flex items-center gap-2 mx-auto"
          >
            <span>상담 신청하기</span>
            <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { PHILOSOPHY_NARRATIVES } from '../data';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="about-studio-container"
      className="pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen"
    >
      {/* Intro Header */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[#111111] text-white text-[10px] font-bold shrink-0">01</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111] font-bold block">
            Studio Philosophy & Approaches — 디자인 철학 및 시공 접근법
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-[0.18em] text-[#111111] uppercase leading-relaxed">
          강인 소개
        </h1>
        <p className="text-[13px] font-normal text-[#222222] max-w-2xl leading-relaxed tracking-wider mt-2 text-justify">
          “{PHILOSOPHY_NARRATIVES.intro}”
        </p>
      </div>

      {/* Philosophy Editorial Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-16 pb-12 border-b border-brand-border/60">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#111111] text-white text-[9px] font-bold shrink-0">01</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#111111] font-bold block">PHILOSOPHY 01</span>
          </div>
          <h2 className="text-base uppercase tracking-widest text-[#111111] mt-3 font-bold">
            Aesthetic Retrenchment (공간 미학)
          </h2>
        </div>
        <div className="lg:col-span-8 text-[14px] font-normal text-[#222222] leading-loose tracking-widest text-justify space-y-4">
          <p className="text-[#111111] text-base md:text-lg mb-4 font-bold">
            우리는 채우기 위해 비워내는 고유한 환원의 힘을 가치 삼습니다.
          </p>
          <p className="leading-relaxed">
            {PHILOSOPHY_NARRATIVES.philosophyDesign}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-16 pb-12 border-b border-brand-border/60">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#111111] text-white text-[9px] font-bold shrink-0">02</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#111111] font-bold block">PHILOSOPHY 02</span>
          </div>
          <h2 className="text-base uppercase tracking-widest text-[#111111] mt-3 font-bold">
            Structural Sincerity (책임 시공과 정밀)
          </h2>
        </div>
        <div className="lg:col-span-8 text-[14px] font-normal text-[#222222] leading-loose tracking-widest text-justify space-y-4">
          <p className="text-[#111111] text-base md:text-lg mb-4 font-bold">
            설계 도면은 단순한 낙서가 아니라 반드시 실현되어야 할 영원한 전제 조건입니다.
          </p>
          <p className="leading-relaxed">
            {PHILOSOPHY_NARRATIVES.philosophyConstruction}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-16 pb-12 border-b border-brand-border/60">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#111111] text-white text-[9px] font-bold shrink-0">03</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#111111] font-bold block">PRIME SERVICE 03</span>
          </div>
          <h2 className="text-base uppercase tracking-widest text-[#111111] mt-3 font-bold">
            After-service Guarantee (사후 무상 케어)
          </h2>
        </div>
        <div className="lg:col-span-8 text-[14px] font-normal text-[#222222] leading-loose tracking-widest text-justify space-y-4">
          <p className="text-[#111111] text-base md:text-lg mb-4 font-bold">
            공사가 끝나도 강인과 클라이언트의 정서적인 신뢰는 가치 있게 이어집니다.
          </p>
          <p className="leading-relaxed">
            {PHILOSOPHY_NARRATIVES.afterService}
          </p>
        </div>
      </div>

      {/* Tiny Editorial Team Grid */}
      <section id="studio-directors-team">
        <div className="mb-12">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#111111] text-white text-[9px] font-bold shrink-0">04</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#111111] font-bold block">04 — Leadership Roles</span>
          </div>
          <h3 className="text-base uppercase tracking-[0.2em] text-[#111111] mt-2 font-bold">
            Studio Directors / 기술진 소개
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="border-2 border-[#111111] p-6 bg-white space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#111111] block">CHIEF ARCHITECT</span>
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-widest text-[#111111]">안 강 인 (Kang-In An)</h4>
              <p className="text-xs text-[#222222] font-semibold tracking-wide">공간 총괄설계 소장 / 대표 이사</p>
            </div>
            <p className="text-xs text-[#222222] leading-relaxed font-normal">
              홍익대학교 건축디자인 전공. 15년간 Gwangju 및 Seoul 내 하이엔드 주거 평면과 조형 노출 콘크리트 상하부 설비선을 감리 및 실도안해왔습니다.
            </p>
          </div>

          <div className="border border-brand-border/60 p-6 bg-white space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#111111] block">TECHNOLOGY 감리 소장</span>
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-widest text-[#111111]">백 윤 기 (Yun-Ki Baek)</h4>
              <p className="text-xs text-[#222222] font-semibold tracking-wide">직영 기술 시공 총소장</p>
            </div>
            <p className="text-xs text-[#222222] leading-relaxed font-normal">
              실내건축공업 라이선스 기수 수석. 물의 구배, 아스팔트 하이브리드 수막 방조 등 시공 마감선과 내단열 성능을 한 치의 오차 없이 검토합니다.
            </p>
          </div>

          <div className="border border-brand-border/60 p-6 bg-white space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-[#111111] block">INTERIOR 디렉터</span>
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-widest text-[#111111]">송 소 율 (So-Yul Song)</h4>
              <p className="text-xs text-[#222222] font-semibold tracking-wide">자재 큐레이션 및 조닝 연구원</p>
            </div>
            <p className="text-xs text-[#222222] leading-relaxed font-normal">
              수입 디테일 포셀린, 천연석, 이탈리아 트래버틴 광택도별 배광 각도를 큐레이션하여 공간에 스며드는 미끄러운 빛의 결을 가이드합니다.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

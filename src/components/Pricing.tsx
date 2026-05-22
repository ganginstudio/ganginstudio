import { motion } from 'motion/react';
import { NavView } from '../types';
import { Check } from 'lucide-react';

interface PricingProps {
  setView: (view: NavView) => void;
}

export default function Pricing({ setView }: PricingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      id="pricing-container"
      className="pt-32 pb-32 px-6 md:px-12 max-w-[1300px] mx-auto min-h-screen selection:bg-brand-dark selection:text-white"
    >
      {/* Centered Image-Style Header */}
      <div className="text-center mb-20 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted font-bold block">
          DESIGN SERVICE
        </span>
        <h1 className="text-2xl md:text-[36px] font-extrabold tracking-tight text-[#111111] leading-tight">
          가격보다 앞선 브랜드의 <span className="border-b-2 border-brand-dark pb-1 text-brand-dark">진실된 가치</span>
        </h1>
        <p className="text-xs md:text-[13px] font-light text-[#6B7280] max-w-2xl mx-auto leading-relaxed tracking-wide">
          강인스튜디오는 단순한 마감이 아닌 브랜드의 가치와 라이프스타일을 바꾸는 전략적이고 고집스러운 시공을 추구합니다.
        </p>
      </div>

      {/* Responsive Multi-Card Pricing Grid matching the image */}
      <div id="pricing-packages-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24 max-w-[1150px] mx-auto">
        
        {/* Card 1: BASIC */}
        <div
          id="pricing-card-basic"
          className="border border-brand-border bg-white rounded-none p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] relative"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-black text-[#111111] tracking-wider uppercase font-sans">BASIC</h2>
              <p className="text-[11px] text-[#8C93A3] font-normal leading-relaxed tracking-tight min-h-[32px]">
                실속있고 깔끔한 마감 요소와 실용적 평면 구성을 정립하는 기본 리모델링 스타트 패키지
              </p>
            </div>

            {/* Price Text */}
            <div className="py-4 border-y border-brand-border">
              <span className="text-[22px] md:text-[28px] font-extrabold text-[#111111] tracking-tight block">
                상담 후 안내
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-1">
              <ul className="space-y-4 text-[12px] text-[#374151] font-medium tracking-normal">
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>공간 구성 설계 레이아웃 2안 제안</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>주택/상업 기본 설계 수정 2회 제공</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>고해상도 공간 3D 그래픽 투시 오버플 프리뷰</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>정밀 시공 자재 표준 규격 수작 가이드 기초</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => {
                setView('estimate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-center py-4 text-xs font-bold text-[#4B5563] bg-[#F3F4F6] hover:bg-black hover:text-white transition-all duration-300 rounded-none cursor-pointer"
            >
              상담 예약하기
            </button>
          </div>
        </div>

        {/* Card 2: STANDARD (Highlight BEST CHOICE Outline & Glow) */}
        <div
          id="pricing-card-standard"
          className="border-2 border-brand-dark bg-white rounded-none p-9 flex flex-col justify-between shadow-[0_12px_44px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
        >
          {/* Best Choice Pill nested beautifully on the border */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#111111] text-white text-[9px] font-black px-4 py-1.5 uppercase tracking-[0.16em] rounded-none shadow-[0_4px_12px_rgba(0,0,0,0.1)] select-none">
            BEST CHOICE
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-black text-[#111111] tracking-wider uppercase font-sans">STANDARD</h2>
              <p className="text-[11px] text-[#8C93A3] font-normal leading-relaxed tracking-tight min-h-[32px]">
                한층 더 견고한 무설계선 마감 및 독사색과 배광 매치까지 완성하는 실전 설계 패키지
              </p>
            </div>

            {/* Price Text */}
            <div className="py-4 border-y border-brand-border">
              <span className="text-[22px] md:text-[28px] font-extrabold text-[#111111] tracking-tight block">
                상담 후 안내
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-1">
              <ul className="space-y-4 text-[12px] text-[#374151] font-medium tracking-normal">
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>공간 구성 최적 설계 레이아웃 4안 제안</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>실용 편의적 완벽 실사 무제한 수정 지원</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>마감 전용 고밀 천연 마크 수입 자재/컬러 매칭</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>빌트인 마이너스 숨김 구조 가구 맞춤 제작 설계</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => {
                setView('estimate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-center py-4 text-xs font-bold text-white bg-black hover:bg-black/90 shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-none cursor-pointer"
            >
              상담 예약하기
            </button>
          </div>
        </div>

        {/* Card 3: PREMIUM */}
        <div
          id="pricing-card-premium"
          className="border border-brand-border bg-white rounded-none p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] relative"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-black text-[#111111] tracking-wider uppercase font-sans">PREMIUM</h2>
              <p className="text-[11px] text-[#8C93A3] font-normal leading-relaxed tracking-tight min-h-[32px]">
                장인 사색 플라스터, 조적 오버플 Wellness 욕탕 등 고전 하이엔드 예술 가치를 총망라한 통합 패키지
              </p>
            </div>

            {/* Price Text */}
            <div className="py-4 border-y border-brand-border">
              <span className="text-[22px] md:text-[28px] font-extrabold text-[#111111] tracking-tight block">
                상담 후 안내
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-1">
              <ul className="space-y-4 text-[12px] text-[#374151] font-medium tracking-normal">
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>공간 흐름 설계 정밀 레이아웃 6안 제안</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>프랙탈 수치 피드백 자유 수정 기한제한 무</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>하이엔드 마이크로시멘트 3종 시립 다각 공법</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={14} className="text-brand-dark shrink-0" strokeWidth={3} />
                  <span>완제품 책임 보증 및 프리미엄 원케어 AS 케어 적용</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => {
                setView('estimate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-center py-4 text-xs font-bold text-[#4B5563] bg-[#F3F4F6] hover:bg-black hover:text-white transition-all duration-300 rounded-none cursor-pointer"
            >
              상담 예약하기
            </button>
          </div>
        </div>

      </div>

      {/* Process list inspired by 1204DESIGN sequence transparency */}
      <section id="pricing-process-workflow" className="border-t border-brand-border/60 pt-24 max-w-[1150px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-dark block font-mono">01 — Process Steps</span>
            <h3 className="text-sm uppercase tracking-[0.25em] text-[#111111] font-normal">
              설계부터 완공까지 무설계선 과정
            </h3>
            <p className="text-xs font-light text-brand-muted leading-relaxed tracking-wide">
              클라이언트와 첫 대면 미팅부터 완벽한 하자 인증서 발급까지 일관적으로 집행되는 강인만의 5단계 올인원 기술 흐름입니다.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-2 border-brand-dark/30 pl-6 space-y-2">
                <span className="text-xs font-mono text-brand-muted">STEP 01</span>
                <h4 className="text-xs font-normal text-brand-dark tracking-widest">대면 기술 인터뷰 & 현장 정밀 계측</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                  구조적인 누수 소음 지장물 진단 및 실평수 레이아웃 가능 여부를 위한 건축 엔지니어 전문 가선 측정이 무료로 시행됩니다.
                </p>
              </div>

              <div className="border-l-2 border-brand-dark/30 pl-6 space-y-2">
                <span className="text-xs font-mono text-brand-muted">STEP 02</span>
                <h4 className="text-xs font-normal text-brand-dark tracking-widest">3D 가공 시안 렌더링 피드백</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                  자재의 단독 반사율과 조명을 매치한 3차원 예술관식 VR 프레임을 제공해, 완공 후 일어날 색체 이질감을 제로화합니다.
                </p>
              </div>

              <div className="border-l-2 border-brand-dark/30 pl-6 space-y-2">
                <span className="text-xs font-mono text-brand-muted">STEP 03</span>
                <h4 className="text-xs font-normal text-brand-dark tracking-widest">품목별 명세 자재 원가 검증 계약</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                  타일, 접착 시멘트 브랜드 수준까지 투명 나열한 상세 견적서를 완성지은 후 계약을 성립해 단 1%의 추후 강제 추가 청구도 방지합니다.
                </p>
              </div>

              <div className="border-l-2 border-brand-dark/30 pl-6 space-y-2">
                <span className="text-xs font-mono text-brand-muted">STEP 04</span>
                <h4 className="text-xs font-normal text-brand-dark tracking-widest">일간 시공 밴드 공실 리포팅 및 기술 감리</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                  자체 소장제가 작동하여, 매일 철거/목공/설비 공정이 표준 시방에 맞춰 작동되고 있음을 사진과 메신저 리포트로 실시간 피드백 전파합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}


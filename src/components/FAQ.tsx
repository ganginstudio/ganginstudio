import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem, NavView } from '../types';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';

interface FAQProps {
  faqList: FAQItem[];
  setView: (view: NavView) => void;
}

const FAQ_CATEGORIES: { key: string; labelKr: string }[] = [
  { key: 'All', labelKr: '전체 보기' },
  { key: 'Estimate', labelKr: '견적 문의' },
  { key: 'Pricing', labelKr: '요금 정찰제' },
  { key: 'Timeline', labelKr: '시공 기간' },
  { key: 'Materials', labelKr: '사용 자재' },
  { key: 'Design', labelKr: '디자인 설계' },
  { key: 'Construction', labelKr: '직영 시공' },
  { key: 'Warranty_AS', labelKr: '3개년 안심 AS' },
];

export default function FAQ({ faqList, setView }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleOpen = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((oId) => oId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFAQ = faqList.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-16 md:pt-24 pb-16 md:pb-24 max-w-[1400px] mx-auto px-6 md:px-12"
    >
      {/* Page Heading */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[#111111] text-white text-[10px] font-bold shrink-0">01</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111] font-bold block">
            TRANSPARENT Q&A REPOSITORY — 자주 묻는 질문 아카이브
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-[0.18em] text-[#111111] uppercase leading-relaxed">
          자주 묻는 질문
        </h1>
        <p className="text-[13px] font-normal text-[#222222] max-w-xl leading-relaxed tracking-wider mt-2 text-justify">
          투명한 원가 회계 공개 방식과 자체 직영 관리, 무상 3개년 웰니스 AS 순회제도 등 시공 전반의 모든 우려 사항에 대해 솔직하고 명확하게 답해 드립니다.
        </p>
      </div>

      {/* Modern Search Row */}
      <div className="mb-10 relative max-w-md">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          placeholder="궁금하신 공간 질문 혹은 키워드를 입력해 보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs font-semibold bg-white border-2 border-[#111111] px-10 py-3.5 focus:outline-none focus:bg-neutral-50 transition-colors rounded-none placeholder:text-neutral-400 text-[#111111]"
        />
      </div>

      {/* Filter Tabs Grid */}
      <div className="flex gap-x-6 gap-y-3 mb-10 items-center overflow-x-auto scrollbar-none border-b border-brand-border/60 pb-3">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`text-[11px] md:text-xs tracking-wide pb-1 cursor-pointer transition-colors duration-300 font-bold focus:outline-none whitespace-nowrap ${
              activeCategory === cat.key
                ? 'text-[#111111] border-b-2 border-[#111111]'
                : 'text-neutral-400 hover:text-[#111111]'
            }`}
          >
            {cat.labelKr}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFAQ.length > 0 ? (
          filteredFAQ.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="border-b-2 border-[#111111]/10 pb-4 transition-colors"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full py-4 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-semibold text-[11px] text-[#111111] mt-0.5 bg-neutral-100 px-1.5 py-0.5 rounded-xs shrink-0">
                      Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#111111] group-hover:text-neutral-500 transition-colors tracking-wide leading-relaxed">
                      {item.question}
                    </span>
                  </div>
                  <div className="text-[#111111] group-hover:text-black transition-colors shrink-0">
                    {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                  </div>
                </button>

                {/* Animated Body/Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pr-4 pb-6 pt-2 text-[13px] font-normal leading-relaxed text-[#222222] tracking-wider space-y-3">
                        <p className="whitespace-pre-line leading-7 text-justify">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-[#111111]/20 space-y-3">
            <HelpCircle size={28} className="text-[#111111]/40 mx-auto" />
            <p className="text-xs font-bold text-[#111111]">
              검색 키워드에 부합하는 질문 명세를 찾을 수 없습니다.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-[10px] text-[#111111] border-b border-[#111111] focus:outline-none cursor-pointer font-bold"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Floating Inquiry Guide CTA */}
      <div className="mt-16 bg-white border-2 border-[#111111] p-8 text-center space-y-4 hover:bg-neutral-50 transition-colors duration-300">
        <h4 className="text-xs uppercase tracking-widest text-[#111111] font-bold">
          ● 원하시는 해답을 발견하지 못하셨습니까?
        </h4>
        <p className="text-[13px] text-[#222222] font-normal max-w-sm mx-auto leading-relaxed">
          대지 위치와 도안 상황, 인테리어 고민 스펙을 전달해 주시면 오피스 분석 디자이너가 1:1로 직접 유선 상담해 드립니다.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setView('estimate');
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
            className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-[10px] tracking-widest uppercase transition-all cursor-pointer font-bold border border-[#111111] hover:border-black"
          >
            상세 견적 바로 접수하기
          </button>
        </div>
      </div>
    </motion.div>
  );
}

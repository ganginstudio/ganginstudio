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
      className="pt-28 pb-32 max-w-[1000px] mx-auto px-6 md:px-12"
    >
      {/* Page Heading */}
      <div className="mb-14 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted/70 block">
          Transparent Q&A Repository
        </span>
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.16em] text-[#111111] uppercase">
          자주 묻는 질문
        </h1>
        <p className="text-xs font-light text-brand-muted max-w-lg mx-auto leading-relaxed tracking-wider mt-2">
          투명한 원가 회계 공개 방식과 자체 직영 관리, 무상 3개년 웰니스 AS 순회제도 등 시공 전반의 모든 우려 사항에 대해 솔직하고 명확하게 답해 드립니다.
        </p>
      </div>

      {/* Modern Search Row */}
      <div className="mb-12 relative max-w-md mx-auto">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          type="text"
          placeholder="궁금하신 공간 질문 혹은 키워드를 입력해 보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs font-light bg-white border border-brand-border/80 px-10 py-3 focus:outline-none focus:border-brand-dark transition-colors rounded-none placeholder:text-brand-muted/50 text-brand-dark"
        />
      </div>

      {/* Filter Tabs Grid */}
      <div className="flex gap-x-6 gap-y-2 mb-14 items-center justify-center flex-wrap border-b border-brand-border/40 pb-4">
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`text-[11px] tracking-wide py-1.5 px-3 cursor-pointer transition-colors duration-300 font-light focus:outline-none whitespace-nowrap ${
              activeCategory === cat.key
                ? 'text-[#111111] border-b border-brand-dark font-medium'
                : 'text-brand-muted hover:text-[#111111]'
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
                className="border-b border-brand-border/60 pb-4 transition-colors"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full py-4 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-brand-muted mt-0.5">
                      Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-light text-[#111111] group-hover:text-brand-muted transition-colors tracking-wide">
                      {item.question}
                    </span>
                  </div>
                  <div className="text-brand-muted group-hover:text-brand-dark transition-colors">
                    {isOpen ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
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
                      <div className="pl-10 pr-4 pb-6 pt-2 text-xs sm:text-sm font-light leading-relaxed text-brand-muted tracking-wide space-y-3">
                        <p className="whitespace-pre-line leading-7">
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
          <div className="text-center py-16 border border-dashed border-brand-border/60 space-y-3">
            <HelpCircle size={28} className="text-brand-muted/50 mx-auto" />
            <p className="text-xs font-light text-brand-muted">
              검색 키워드에 부합하는 질문 명세를 찾을 수 없습니다.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-[10px] text-brand-dark border-b border-brand-dark focus:outline-none cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* Floating Inquiry Guide CTA */}
      <div className="mt-20 bg-brand-bg/40 border border-brand-border/60 p-8 text-center space-y-4">
        <h4 className="text-xs uppercase tracking-widest text-[#111111] font-medium">
          원하시는 해답을 발견하지 못하셨습니까?
        </h4>
        <p className="text-xs text-brand-muted font-light max-w-sm mx-auto leading-relaxed">
          대지 위치와 도안 상황, 인테리어 고민 사펙을 전달해 주시면 오피스 분석 디자이너가 1:1로 직접 유선 상담해 드립니다.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setView('estimate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-brand-dark hover:bg-black text-white text-[10px] tracking-widest uppercase transition-all cursor-pointer rounded-none"
          >
            상세 견적 바로 접수하기
          </button>
        </div>
      </div>
    </motion.div>
  );
}

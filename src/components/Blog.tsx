import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost, NavView, BlogCmsConfig } from '../types';
import { ArrowLeft, BookOpen, Clock, Calendar } from 'lucide-react';

interface BlogProps {
  blogPosts: BlogPost[];
  setView: (view: NavView) => void;
  blogCms?: BlogCmsConfig;
}

const BLOG_CATEGORIES = [
  'All',
  'Interior Trends',
  'Material Guide',
  'Design Guide',
  'Estimate Guide',
  'Construction Knowledge',
];

const CATEGORY_LABELS: Record<string, string> = {
  All: '전체 칼럼',
  'Interior Trends': '인테리어 트렌드',
  'Material Guide': '건축 자재 가이드',
  'Design Guide': '공간 레이아웃 가이드',
  'Estimate Guide': '금액 견적 분석론',
  'Construction Knowledge': '전담 시공 디테일',
};

export default function Blog({ blogPosts, setView, blogCms }: BlogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(
    (post) => activeCategory === 'All' || post.category === activeCategory
  );

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-16 md:pt-24 pb-16 md:pb-24 max-w-[1400px] mx-auto px-6 md:px-12"
    >
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          // Vista 1: Editorial Articles List
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Header */}
            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[#111111] text-white text-[10px] font-bold shrink-0">01</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111] font-bold block">
                  {blogCms?.topLabel || "EDITORIAL STUDY & DIALOGUE — 건축칼럼 및 시방 보증서"}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-[0.18em] text-[#111111] uppercase leading-relaxed">
                {blogCms?.title || "건축칼럼"}
              </h1>
              <p className="text-[13px] font-normal text-[#222222] max-w-xl leading-relaxed tracking-wider mt-2 text-justify">
                {blogCms?.description || "인테리어 전 아셔야 하는 자재 하자 요인과 원가 검토 노하우까지. 강인스튜디오 대표 기술진이 심혈을 기울여 다듬은 무슬릿 미미아 지식을 나누어 드립니다."}
              </p>
            </div>

            {/* Category Submenu */}
            <div className="overflow-x-auto scrollbar-none border-b border-brand-border/60 pb-3 flex gap-x-8 md:gap-x-12">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] md:text-xs tracking-wide pb-1 transition-colors relative focus:outline-none cursor-pointer whitespace-nowrap font-bold ${
                    activeCategory === cat
                      ? 'text-[#111111] border-b-2 border-[#111111]'
                      : 'text-neutral-400 hover:text-[#111111]'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>

            {/* Posts Linear List/Grid - Asymmetrical, Natural color */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="group cursor-pointer space-y-4 flex flex-col justify-between border-2 border-[#111111] p-6 bg-white hover:bg-neutral-50 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Image Frame - Natural Color */}
                      <div className="w-full h-auto aspect-video md:aspect-[16/10] overflow-hidden bg-[#fafaf9] relative border border-[#111111]/20">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-auto md:h-full object-contain md:object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#111111] border-2 border-[#111111] px-2 py-0.5 inline-block bg-white">
                          {CATEGORY_LABELS[post.category] || post.category}
                        </span>
                        
                        <h3 className="text-sm font-bold text-[#111111] group-hover:text-neutral-500 transition-colors tracking-wide leading-snug">
                          {post.title}
                        </h3>
                        
                        <p className="text-[12px] leading-relaxed text-[#222222] font-normal line-clamp-3 text-justify">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-500 font-semibold pt-4 border-t border-[#111111]/10">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-[#111111]" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} className="text-[#111111]" /> {post.readTime}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-brand-border/50">
                <p className="text-xs text-brand-muted font-light">등록된 칼럼 명세가 없습니다.</p>
              </div>
            )}
          </motion.div>
        ) : (
          // Vista 2: Single Article Deep Read View
          <motion.div
            key="read"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="max-w-[800px] mx-auto space-y-12"
          >
            {/* Back Button */}
            <button
              onClick={handleBackToList}
              className="group flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none cursor-pointer"
            >
              <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
              <span>칼럼 아카이브 목록으로 돌아가기</span>
            </button>

            {/* Post Metadata */}
            <div className="space-y-4 pt-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#111111] border-2 border-[#111111] px-2 py-0.5 inline-block bg-white">
                {CATEGORY_LABELS[selectedPost.category] || selectedPost.category}
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-[#111111] leading-snug tracking-wide uppercase">
                {selectedPost.title}
              </h1>
              
              <div className="flex gap-4 text-[10px] text-neutral-500 font-semibold pb-6 border-b-2 border-[#111111]">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
                <span>•</span>
                <span>작성자: 강인스튜디오 기술미학연구원</span>
              </div>
            </div>

            {/* Natural Rich Image banner */}
            <div className="w-full h-auto aspect-video md:aspect-[16/9] overflow-hidden bg-[#fafaf9] relative border-2 border-[#111111]">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-auto md:h-full object-contain md:object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Post Articles Body Container with custom semantic styles */}
            <div className="prose max-w-none text-[13px] sm:text-sm font-normal leading-8 text-[#111111] tracking-wider space-y-6">
              {selectedPost.content.split('\n\n').map((para, i) => {
                const trimmed = para.trim();
                if (trimmed.startsWith('##')) {
                  return (
                    <h2 key={i} className="text-base uppercase tracking-widest font-bold text-[#111111] pt-6 border-b-2 border-[#111111] pb-2">
                      {trimmed.replace('##', '').trim()}
                    </h2>
                  );
                }
                if (trimmed.startsWith('###')) {
                  return (
                    <h3 key={i} className="text-sm uppercase tracking-widest font-bold text-[#111111] pt-4">
                      ● {trimmed.replace('###', '').trim()}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="whitespace-pre-line leading-7 text-justify text-[#222222]">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Post Footnote CTA */}
            <div className="bg-white border-2 border-[#111111] p-8 text-center space-y-4 mt-20 hover:bg-neutral-50 transition-colors duration-300">
              <BookOpen size={20} className="text-[#111111] mx-auto" />
              <h4 className="text-xs uppercase tracking-widest text-[#111111] font-bold">
                ● 공간의 한 끗을 바꾸는 지식과 실천력
              </h4>
              <p className="text-[13px] text-[#222222] max-w-sm mx-auto leading-relaxed">
                시안 한 선, 몰딩 마이너스 접합 1mm 차이가 완성도를 가릅니다. 고민하고 계시는 평면 요지를 제출하시면 가설 분석서와 스터디를 준비해 드립니다.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setView('estimate');
                    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                  }}
                  className="px-6 py-3 bg-[#111111] hover:bg-black text-white text-[10px] tracking-widest uppercase transition-all cursor-pointer font-bold border border-[#111111] hover:border-black"
                >
                  상세 견적 바로 신청하기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

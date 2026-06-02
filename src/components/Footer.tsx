import { NavView, SiteSettings } from '../types';
import { KakaoTalkIcon, NaverBlogIcon, InstagramIcon } from './BrandIcons';

interface FooterProps {
  setView: (view: NavView) => void;
  resetProject: () => void;
  settings?: SiteSettings;
}

export default function Footer({ setView, resetProject, settings }: FooterProps) {
  const handleNavClick = (view: NavView) => {
    setView(view);
    resetProject();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seoTags = [
    '광주 인테리어',
    '광주 상가 인테리어',
    '광주 욕실 인테리어',
    '광주 카페 인테리어',
    '광주 인테리어 업체',
    '상업공간 인테리어',
    '욕실 인테리어 디자인'
  ];

  const brandName = settings?.brandName || 'GANG IN STUDIO';
  const address = settings?.address || '광주광역시 남구 양림동 24-12 강인스튜디오 빌딩 1F';
  const phone = settings?.phone || '062.515.1204';
  const email = settings?.email || 'contact@ganginstudio.com';
  const blogUrl = settings?.blog || 'https://blog.naver.com';
  const instagramUrl = settings?.instagram || 'https://instagram.com';
  const kakaotalkUrl = settings?.kakaotalk || 'https://pf.kakao.com';

  return (
    <footer id="main-footer" className="bg-[#111111] text-[#F7F6F2] pt-24 pb-16 px-6 md:px-12 border-t border-brand-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-brand-muted/20">
          
          {/* Column 1: Brand block */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-light tracking-[0.25em] text-[#F7F6F2]">{brandName}</h3>
            <p className="text-[11px] leading-relaxed tracking-widest text-[#6B6B6B] font-light max-w-sm">
              우리는 완벽한 디테일과 순수 건축 가치를 기반으로 주거와 상가를 기획하고 시공하는 광주 대표 인테리어 전문 디자인 오피스입니다. 
            </p>
            <p className="text-[10px] tracking-widest text-[#F7F6F2]/40 pt-4">
              직영 시공 및 책임 보증 시스템 등록 업체
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#F7F6F2]/50 font-normal">Sitemap</h4>
            <ul className="space-y-3.5 text-[11px] font-light tracking-wider text-brand-muted">
              <li>
                <button 
                  onClick={() => handleNavClick('home')} 
                  className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  홈 (Home)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('portfolio')} 
                  className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  포트폴리오 (Portfolio)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('pricing')} 
                  className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  요금정찰제 (Transparency Pricing)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('estimate')} 
                  className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  견적신청 (Online Estimate)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  소개 & 철학 (Philosophy)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#F7F6F2]/50 font-normal">Contact</h4>
            <div className="space-y-2.5 text-[11px] font-light tracking-wide text-brand-muted leading-relaxed">
              <p>주소: {address}</p>
              <p>전화: <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="hover:text-white transition-colors duration-300 font-light">{phone}</a> (상담문의)</p>
              <p>이메일: <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></p>
              <p>운영시간: 월 - 금 10:00 - 18:00 (토/일 예약 미팅)</p>
            </div>
          </div>

          {/* Column 4: Channels & Socials */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#F7F6F2]/50 font-normal">Channels</h4>
            <div className="space-y-3.5 text-[11px] font-light tracking-wide text-brand-muted">
              <p>
                <a href={blogUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2.5 animate-pulse-subtle">
                  <NaverBlogIcon size={14} />
                  <span>Naver Blog — 네이버 블로그 포트폴리오</span>
                </a>
              </p>
              <p>
                <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2.5">
                  <InstagramIcon size={14} />
                  <span>Instagram — 인스타그램 스토리</span>
                </a>
              </p>
              <p>
                <a href={kakaotalkUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2.5">
                  <KakaoTalkIcon size={14} />
                  <span>KakaoTalk — 강인스튜디오 카카오톡 채널</span>
                </a>
              </p>
              <p className="text-[9px] text-[#6B6B6B] leading-relaxed pt-2">
                사업등록번호: 215-84-12045<br/>
                실내건축공사업 면허등록 필
              </p>
            </div>
          </div>
        </div>

        {/* SEO Tag Bar & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-4xl">
            {seoTags.map((tag) => (
              <span key={tag} className="text-[9px] tracking-widest text-brand-muted/45 font-light">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-[9px] tracking-widest text-[#6B6B6B] font-light whitespace-normal md:whitespace-nowrap">
            © 2026 GANG IN STUDIO. ALL RIGHTS RESERVED. LEIBAL DIRECTED.
          </p>
        </div>
      </div>
    </footer>
  );
}

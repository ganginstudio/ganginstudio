import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavView, Project, NavItemConfig, HeroCmsConfig, HomepageCmsConfig, ContactCmsConfig, PopupCmsConfig, BlogCmsConfig, PricingCmsConfig, EstimateCmsConfig } from './types';
import {
  getInitialState,
  saveState,
  DEFAULT_CATEGORIES,
  ServiceCategory,
  ServicePackage,
  FAQItem,
  CustomerReview,
  BlogPost,
  SiteSettings
} from './store';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import Pricing from './components/Pricing';
import Estimate from './components/Estimate';
import About from './components/About';
import Contact from './components/Contact';

// New Subview Imports
import Categories from './components/Categories';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import Admin from './components/Admin';

import { Phone, MessageSquare, Calculator, FileText, Instagram, BookOpen, Clock, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<NavView>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Load Initialized Storage state
  const storeInit = getInitialState();
  const [isHydrated, setIsHydrated] = useState(false);

  const DEFAULT_POPUP_CMS: PopupCmsConfig = {
    showPopup: true,
    topLabel: "SPECIAL LEAD OFFER",
    title: "잠시만요, 귀하의 기획 공간 예상견적을 3분 만에 무료로 확인해 보시겠습니까?",
    description: "강인스튜디오는 계약 전 도면과 상세 원가 명세서를 투명하게 검수해 이중 지출 요소를 배제하고 있습니다. 성함과 평수만으로 즉시 시방 분석안을 배정받으십시오.",
    ctaText: "3분 예상견적 바로 받기 →",
    ctaUrl: "estimate",
    dismissText: "아니요, 다음에 하겠습니다",
    delayTime: 1
  };

  const [popupCms, setPopupCms] = useState<PopupCmsConfig>(DEFAULT_POPUP_CMS);

  // Popup init and mobile check logs
  useEffect(() => {
    console.log('[POPUP INIT]');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
    console.log('[POPUP MOBILE CHECK]', isMobile ? 'Mobile/Tablet detected' : 'Desktop detected');
  }, []);

  // Exit intent hook listener
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse cursor moves past the top viewport edge (clientY < 15)
      if (e.clientY < 15) {
        const alreadyDismissed = sessionStorage.getItem('gangin_exit_intent_dismissed');
        if (!alreadyDismissed && popupCms.showPopup) {
          setShowExitModal(true);
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [popupCms.showPopup]);

  // Automated trigger after page load
  useEffect(() => {
    if (!isHydrated) return;
    const alreadyDismissed = sessionStorage.getItem('gangin_exit_intent_dismissed');
    if (!alreadyDismissed && popupCms.showPopup) {
      const ms = (popupCms.delayTime ?? 1) * 1000;
      const timer = setTimeout(() => {
        const stillNotDismissed = sessionStorage.getItem('gangin_exit_intent_dismissed');
        if (!stillNotDismissed) {
          setShowExitModal(true);
        }
      }, ms);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, popupCms.showPopup, popupCms.delayTime]);

  // Track show log
  useEffect(() => {
    if (showExitModal) {
      console.log('[POPUP SHOW]');
    }
  }, [showExitModal]);
  const [projects, setProjects] = useState<Project[]>(storeInit.projects);
  const [packages, setPackages] = useState<ServicePackage[]>(storeInit.packages);
  const [faq, setFaq] = useState<FAQItem[]>(storeInit.faq);
  const [reviews, setReviews] = useState<CustomerReview[]>(storeInit.reviews);
  const [blog, setBlog] = useState<BlogPost[]>(storeInit.blog);
  const [settings, setSettings] = useState<SiteSettings>(storeInit.settings);
  
  // Also persist/manage categories state (No localStorage fallback)
  const [categories, setCategories] = useState<ServiceCategory[]>(DEFAULT_CATEGORIES);

  const DEFAULT_HERO_CMS: HeroCmsConfig = {
    image1: "/src/assets/images/gangin_hero_1779412179856.png",
    image2: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200",
    image3: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    show1: true,
    show2: true,
    show3: true,
    order: "1,2,3",
    interval: 4000,
    headlineLine1: "공간을 디자인하고",
    headlineLine2: "시공까지 책임집니다.",
    label1: "Interior Design",
    label2: "Construction",
    label3: "After Service",
    button1Text: "포트폴리오",
    button1Url: "portfolio",
    button2Text: "견적문의",
    button2Url: "estimate"
  };

  const DEFAULT_HOMEPAGE_CMS: HomepageCmsConfig = {
    philosophyNum: "01",
    philosophyLabel: "GANG IN STUDIO",
    philosophyTitle: "Brand Philosophy",
    philosophyHeadline: "우리는 쓸모없는 화려한 장식과 소음을 지우고 오직 본질적인 선과 기하학적 비례에 집중합니다.",
    philosophyPara1: "나무, 석재, 콘크리트, 금속. 자연에서 길러낸 가공되지 않은 자재에 빛의 춤을 더해 거주자가 매일 진정한 마음의 응집력과 고요함을 발견하도록 설계합니다.",
    philosophyPara2: "강인스튜디오는 디자인 단계에서 기획한 1mm의 미세한 공차와 음영 디테일을 현장 시공 소장들이 한치의 오차 없이 그대로 구축해 나갑니다. 그것이 우리 인테리어의 품위이자 책임감입니다.",

    featuredNum: "02",
    featuredLabel: "Editorial Curation",
    featuredTitle: "Featured Spaces (선정작)",
    featuredBtnText: "전체 포트폴리오 보기",
    featuredBtnUrl: "portfolio",

    integrityNum: "03",
    integrityLabel: "Integrity & Precision",
    integrityTitle: "투명성 회계제도와 직직영 책임 시공의 약속",
    integrityDesc: "광주 인테리어 업체 중 유일하게 투명한 상세 명세 자재 원가 내역서를 계약 전 100% 가감 없이 공유하며, 중간 마진 명세 일체의 요소를 정출하는 정제된 1204DESIGN 비즈니스 투명성 공식을 엄수합니다.",
    
    col1Num: "01",
    col1Title: "자재 등급 정찰제",
    col1Desc: "계약하는 세밀 자재 하나까지 단위 수량과 도소매 단가를 투명하게 공개해 가라 자재나 임의 변경 행위가 애초에 불가능하도록 회계 감독선을 수립합니다.",
    col2Num: "02",
    col2Title: "직영 소장제",
    col2Desc: "외주 대마에 전적으로 시공을 위탁하는 타 업체들과 달리 본사의 15년 차 경력 정규 면허 기술진이 도면과 동일한 자재의 접합률을 실시간 전담 감독합니다.",
    col3Num: "03",
    col3Title: "3개년 웰니스 점검",
    col3Desc: "하자 이행 증권 상의 기간을 뛰어넘어, 사후 3개년간 자사 소속 시공 사후 수련팀이 6달 간격으로 실내 습도 밸런스와 오크 가구 뒤틀림 복원을 무료로 리포팅합니다.",

    conversionNum: "04",
    conversionLabel: "HIGH CONVERSION PORTALS",
    conversionTitle: "공학적 투명성과 시적 여백의 기획 채널",
    conversionDesc: "공학적 투명성과 시적 여백의 기획 채널",

    portal1Title: "우리집 예상견적 받아보기",
    portal1Desc: "평수와 원가 기준을 빠르게 연산하여 가도면 상담을 예약하는 간섭 없는 인스턴트 견적 채널입니다. 더 면밀한 정보는 언제든 견적문의 탭의 7단계 도구를 실행하십시오.",
    portal2Title: "간편 유선 긴급상담 받아보기",
    portal2Desc: "복잡한 서류 절차가 아닌, 단순 시공 가부 여부 및 사옥 예약 방법론 등을 바리스타 처럼 빠르고 격조 있게 물어보는 1분 직통 신청 창구입니다.",

    form1NameLabel: "고객 성함",
    form1PhoneLabel: "대표 번호",
    form1TypeLabel: "공간 분야",
    form1AreaLabel: "분양 면적 (평형)",
    form1BudgetLabel: "보유 예산 규모",
    form2NameLabel: "대표 성함",
    form2PhoneLabel: "전화 번호",
    form2TypeLabel: "문의 카테고리",
    form2TimeLabel: "통화 희망 시간대",
    form2DescLabel: "간단 문의 사항"
  };

  const DEFAULT_CONTACT_CMS: ContactCmsConfig = {
    topLabel: "Establish Connection — 커뮤니케이션 오피스 연결",
    topTitle: "오시는 길 & 기획 문의",
    topDesc: "강인스튜디오 사옥은 광주 남구 양림동 역사문화거리에 위치해 있습니다. 설계 미팅 및 자재 큐레이션 체험은 사전 예약제로 진행되오니 출발 전 온라인 정밀 양식 또는 유선 채널로 문의 주십시오.",
    addressSectionTitle: "● STUDIO ADdRESS",
    addressMain: "광주광역시 남구 양림동 24-12 강인스튜디오 빌딩 1F",
    addressSub: "지번: 남구 양림동 24-12 (기독병원 근처 복합거리)",
    addressMapLinkText: "Naver Map으로 경로 확인",
    addressMapLinkUrl: "https://map.naver.com",
    channelSectionTitle: "● CALL & CHANNEL",
    channelMainPhone: "062.515.1204",
    channelMobilePhone: "010.5515.1204",
    channelEmail: "contact@ganginstudio.com",
    channelKakaoText: "@강인스튜디오",
    channelKakaoUrl: "https://pf.kakao.com/_xganginstudio",
    workSectionTitle: "● WORK HOUR SCheDULE",
    workWeekday: "평일: 10:00 - 18:00 (전면 예약제)",
    workWeekend: "주말/공휴일: 사전 약정 미팅 수렴 건 운영",
    workHolidayNotice: "* 현장 기술 감리 중 전화 수신이 다소 늦어질 수 있어, 부재중일 경우 직통 번호로 카카오톡을 남기시면 감사하겠습니다.",
    workAdditionalNote: "",
    mapImage: "",
    mapEmbed: "",
    mapMarkerTitle: "GANG IN STUDIO HQ",
    mapMarkerDesc: "남구 양림동 24-12 사옥 1F",
    naverMapLink: "https://map.naver.com",
    kakaoMapLink: "https://map.kakao.com",
    buttonText: "카카오톡 공식 채널 빠른 상담",
    buttonUrl: "https://pf.kakao.com/_xganginstudio",
    buttonShow: true
  };

  const DEFAULT_BLOG_CMS: BlogCmsConfig = {
    topLabel: "EDITORIAL STUDY & DIALOGUE — 건축칼럼 및 시방 보증서",
    title: "건축칼럼",
    description: "인테리어 전 아셔야 하는 자재 하자 요인과 원가 검토 노하우까지. 강인스튜디오 대표 기술진이 심혈을 기울여 다듬은 무슬릿 미미아 지식을 나누어 드립니다."
  };

  const DEFAULT_PRICING_CMS: PricingCmsConfig = {
    topLabel: "DESIGN SERVICE",
    title: "가격보다 앞선 브랜드의 진실된 가치",
    description: "강인스튜디오는 단순한 마감이 아닌 브랜드의 가치와 라이프스타일을 바꾸는 전략적이고 고집스러운 시공을 추구합니다."
  };

  const DEFAULT_ESTIMATE_CMS: EstimateCmsConfig = {
    step1Title: "어떤 공간을 예술화할지 선택해 주십시오.",
    step1Desc: "주거 리모델링 및 프리미엄 조적 욕실, 고품격 상가 라운지 등 분야에 맞는 최적의 전문가를 배정합니다.",
    sideLabel: "01 — Multi-Step Custom Estimate",
    sideTitle: "우리집 / 나의가게 예상견적 받아보기",
    sideDesc: "정량화된 시공 원가와 디테일한 도면 큐레이션을 제공하기 위해 운영되는 다단계 간편 가산출 시스템입니다. 각 항목을 성실히 이행해 주시면, 시공 원가 오차율 5% 이내의 정밀한 명세를 검수해 드립니다.",
    techRuleTitle: "● 프리미엄 기술 규정",
    techRule1: "라이선스 정규 면허 기술진 본사 고정 배치",
    techRule2: "중간 수수료 소거 원가 명세 정찰제",
    techRule3: "하자 보완을 극대화한 건조 및 방수 4회 레이징 보증",
    techRule4: "하자 이행 초과 3개년 오피스 무료 복구권 제공"
  };

  const [heroCms, setHeroCms] = useState<HeroCmsConfig>(DEFAULT_HERO_CMS);
  const [homepageCms, setHomepageCms] = useState<HomepageCmsConfig>(DEFAULT_HOMEPAGE_CMS);
  const [contactCms, setContactCms] = useState<ContactCmsConfig>(DEFAULT_CONTACT_CMS);
  const [blogCms, setBlogCms] = useState<BlogCmsConfig>(DEFAULT_BLOG_CMS);
  const [pricingCms, setPricingCms] = useState<PricingCmsConfig>(DEFAULT_PRICING_CMS);
  const [estimateCms, setEstimateCms] = useState<EstimateCmsConfig>(DEFAULT_ESTIMATE_CMS);

  const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
    { id: 'nav_home', label: 'Home', view: 'home', labelKr: '홈', order: 1, show: true },
    { id: 'nav_portfolio', label: 'Portfolio', view: 'portfolio', labelKr: '포트폴리오', order: 2, show: true },
    { id: 'nav_categories', label: 'Services', view: 'categories', labelKr: '분야별 서비스', order: 3, show: true },
    { id: 'nav_pricing', label: 'Pricing', view: 'pricing', labelKr: '요금정찰제', order: 4, show: true },
    { id: 'nav_estimate', label: 'Estimate', view: 'estimate', labelKr: '견적문의', order: 5, show: true },
    { id: 'nav_reviews', label: 'Reviews', view: 'reviews', labelKr: '고객후기', order: 6, show: true },
    { id: 'nav_blog', label: 'Journal', view: 'blog', labelKr: '건축칼럼', order: 7, show: true },
    { id: 'nav_faq', label: 'FAQ', view: 'faq', labelKr: 'Q&A', order: 8, show: true },
    { id: 'nav_admin', label: 'Admin', view: 'admin', labelKr: '관리자', order: 9, show: true },
  ];

  const [navItems, setNavItems] = useState<NavItemConfig[]>(DEFAULT_NAV_ITEMS);

  const lastSavedState = useRef<{
    projects?: string;
    packages?: string;
    faq?: string;
    reviews?: string;
    blog?: string;
    settings?: string;
    categories?: string;
    navItems?: string;
    heroCms?: string;
    homepageCms?: string;
    contactCms?: string;
    popupCms?: string;
  }>({});

  // Hydrate state from Supabase on mount if configured
  useEffect(() => {
    async function loadSupabase() {
      const { fetchSupabaseState, isSupabaseConfigured } = await import('./lib/supabase');
      if (isSupabaseConfigured) {
        try {
          console.log('[Supabase] Hydrating state from remote database...');
          const remoteProjects = await fetchSupabaseState<Project[]>('gangin_projects', storeInit.projects);
          const remotePackages = await fetchSupabaseState<ServicePackage[]>('gangin_packages', storeInit.packages);
          const remoteFaq = await fetchSupabaseState<FAQItem[]>('gangin_faq', storeInit.faq);
          const remoteReviews = await fetchSupabaseState<CustomerReview[]>('gangin_reviews', storeInit.reviews);
          console.log('[FEATURED REVIEW FETCH SUCCESS]');
          const remoteBlog = await fetchSupabaseState<BlogPost[]>('gangin_blog', storeInit.blog);
          const remoteSettings = await fetchSupabaseState<SiteSettings>('gangin_settings', storeInit.settings);
          
          const defaultCategories = DEFAULT_CATEGORIES;
          const remoteCategories = await fetchSupabaseState<ServiceCategory[]>('gangin_categories', defaultCategories);

          const remoteNavItems = await fetchSupabaseState<NavItemConfig[]>('gangin_nav_items', DEFAULT_NAV_ITEMS);

          const remoteHeroCms = await fetchSupabaseState<HeroCmsConfig>('gangin_hero_cms', DEFAULT_HERO_CMS);
          console.log('[HERO CONTENT FETCH SUCCESS]');

          const remoteHomepageCms = await fetchSupabaseState<HomepageCmsConfig>('gangin_homepage_cms', DEFAULT_HOMEPAGE_CMS);
          console.log('[HOMEPAGE SECTION FETCH SUCCESS]');

          const remoteContactCms = await fetchSupabaseState<ContactCmsConfig>('gangin_contact_cms', DEFAULT_CONTACT_CMS);
          console.log('[CONTACT PAGE FETCH SUCCESS]');

          const remotePopupCms = await fetchSupabaseState<PopupCmsConfig>('gangin_popup_cms', DEFAULT_POPUP_CMS);
          console.log('[POPUP CONTENT FETCH SUCCESS]');

          const remoteBlogCms = await fetchSupabaseState<BlogCmsConfig>('gangin_blog_cms', DEFAULT_BLOG_CMS);
          const remotePricingCms = await fetchSupabaseState<PricingCmsConfig>('gangin_pricing_cms', DEFAULT_PRICING_CMS);
          const remoteEstimateCms = await fetchSupabaseState<EstimateCmsConfig>('gangin_estimate_cms', DEFAULT_ESTIMATE_CMS);

          // Seed state cache to bypass redundant initial mount writebacks
          lastSavedState.current = {
            projects: JSON.stringify(remoteProjects),
            packages: JSON.stringify(remotePackages),
            faq: JSON.stringify(remoteFaq),
            reviews: JSON.stringify(remoteReviews),
            blog: JSON.stringify(remoteBlog),
            settings: JSON.stringify(remoteSettings),
            categories: JSON.stringify(remoteCategories),
            navItems: JSON.stringify(remoteNavItems),
            heroCms: JSON.stringify(remoteHeroCms),
            homepageCms: JSON.stringify(remoteHomepageCms),
            contactCms: JSON.stringify(remoteContactCms),
            popupCms: JSON.stringify(remotePopupCms),
            blogCms: JSON.stringify(remoteBlogCms),
            pricingCms: JSON.stringify(remotePricingCms),
            estimateCms: JSON.stringify(remoteEstimateCms)
          };

          setProjects(remoteProjects);
          setPackages(remotePackages);
          setFaq(remoteFaq);
          setReviews(remoteReviews);
          setBlog(remoteBlog);
          setSettings(remoteSettings);
          setCategories(remoteCategories);
          setNavItems(remoteNavItems);
          setHeroCms(remoteHeroCms);
          setHomepageCms(remoteHomepageCms);
          setContactCms(remoteContactCms);
          setPopupCms(remotePopupCms);
          setBlogCms(remoteBlogCms);
          setPricingCms(remotePricingCms);
          setEstimateCms(remoteEstimateCms);
        } catch (e) {
          console.error('[Supabase] Hydration failed, using default states:', e);
        }
      }
      setIsHydrated(true);
    }
    loadSupabase();
  }, []);

  // Dynamic automatic synchronization exclusively to Supabase on state alteration (Optimized difference checked writes)
  useEffect(() => {
    if (!isHydrated) return;
    
    async function syncState() {
      const { saveSupabaseState, isSupabaseConfigured } = await import('./lib/supabase');
      if (!isSupabaseConfigured) return;

      const pStr = JSON.stringify(projects);
      if (pStr !== lastSavedState.current.projects) {
        lastSavedState.current.projects = pStr;
        await saveSupabaseState('gangin_projects', projects);
      }

      const pkgStr = JSON.stringify(packages);
      if (pkgStr !== lastSavedState.current.packages) {
        lastSavedState.current.packages = pkgStr;
        await saveSupabaseState('gangin_packages', packages);
      }

      const faqStr = JSON.stringify(faq);
      if (faqStr !== lastSavedState.current.faq) {
        lastSavedState.current.faq = faqStr;
        await saveSupabaseState('gangin_faq', faq);
      }

      const revStr = JSON.stringify(reviews);
      if (revStr !== lastSavedState.current.reviews) {
        lastSavedState.current.reviews = revStr;
        console.log('[FEATURED REVIEW SAVE START]');
        try {
          await saveSupabaseState('gangin_reviews', reviews);
          console.log('[FEATURED REVIEW SAVE SUCCESS]');
        } catch (err) {
          console.error(err);
          console.log('[FEATURED REVIEW SAVE FAILED]');
        }
      }

      const blogStr = JSON.stringify(blog);
      if (blogStr !== lastSavedState.current.blog) {
        lastSavedState.current.blog = blogStr;
        await saveSupabaseState('gangin_blog', blog);
      }

      const setStr = JSON.stringify(settings);
      if (setStr !== lastSavedState.current.settings) {
        lastSavedState.current.settings = setStr;
        await saveSupabaseState('gangin_settings', settings);
      }

      const catStr = JSON.stringify(categories);
      if (catStr !== lastSavedState.current.categories) {
        lastSavedState.current.categories = catStr;
        await saveSupabaseState('gangin_categories', categories);
      }

      const navStr = JSON.stringify(navItems);
      if (navStr !== lastSavedState.current.navItems) {
        lastSavedState.current.navItems = navStr;
        await saveSupabaseState('gangin_nav_items', navItems);
      }

      const hcStr = JSON.stringify(heroCms);
      if (hcStr !== lastSavedState.current.heroCms) {
        lastSavedState.current.heroCms = hcStr;
        await saveSupabaseState('gangin_hero_cms', heroCms);
      }

      const hmcStr = JSON.stringify(homepageCms);
      if (hmcStr !== lastSavedState.current.homepageCms) {
        lastSavedState.current.homepageCms = hmcStr;
        await saveSupabaseState('gangin_homepage_cms', homepageCms);
      }

      const ccStr = JSON.stringify(contactCms);
      if (ccStr !== lastSavedState.current.contactCms) {
        lastSavedState.current.contactCms = ccStr;
        console.log('[CONTACT PAGE SAVE START]');
        try {
          await saveSupabaseState('gangin_contact_cms', contactCms);
          console.log('[CONTACT PAGE SAVE SUCCESS]');
        } catch (err) {
          console.error(err);
          console.log('[CONTACT PAGE SAVE FAILED]');
        }
      }

      const popStr = JSON.stringify(popupCms);
      if (popStr !== lastSavedState.current.popupCms) {
        lastSavedState.current.popupCms = popStr;
        try {
          await saveSupabaseState('gangin_popup_cms', popupCms);
        } catch (err) {
          console.error('Failed to sync popup CMS state:', err);
        }
      }

      const blgStr = JSON.stringify(blogCms);
      if (blgStr !== lastSavedState.current.blogCms) {
        lastSavedState.current.blogCms = blgStr;
        try {
          await saveSupabaseState('gangin_blog_cms', blogCms);
        } catch (err) {
          console.error('Failed to sync blog CMS state:', err);
        }
      }

      const prcStr = JSON.stringify(pricingCms);
      if (prcStr !== lastSavedState.current.pricingCms) {
        lastSavedState.current.pricingCms = prcStr;
        try {
          await saveSupabaseState('gangin_pricing_cms', pricingCms);
        } catch (err) {
          console.error('Failed to sync pricing CMS state:', err);
        }
      }

      const estStr = JSON.stringify(estimateCms);
      if (estStr !== lastSavedState.current.estimateCms) {
        lastSavedState.current.estimateCms = estStr;
        try {
          await saveSupabaseState('gangin_estimate_cms', estimateCms);
        } catch (err) {
          console.error('Failed to sync estimate CMS state:', err);
        }
      }
    }

    syncState();
  }, [projects, packages, faq, reviews, blog, settings, categories, navItems, heroCms, homepageCms, contactCms, popupCms, blogCms, pricingCms, estimateCms, isHydrated]);

  // Supabase Real-time Subscription for true live updates across tabs/clients
  useEffect(() => {
    let channel: any = null;
    
    async function subscribeRealtime() {
      const { supabase, isSupabaseConfigured } = await import('./lib/supabase');
      if (!isSupabaseConfigured || !supabase) return;
      
      channel = supabase
        .channel('gangin_cms_live_updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'gangin_cms' },
          (payload: any) => {
            const row = payload.new;
            if (!row || !row.key) return;
            const key = row.key;
            const value = row.value;
            
            console.log(`[Supabase Live Update] "${key}" changed remotely.`, value);
            if (value === undefined || value === null) return;
            
            const stringified = JSON.stringify(value);
            
            if (key === 'gangin_projects') {
              lastSavedState.current.projects = stringified;
              setProjects(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_packages') {
              lastSavedState.current.packages = stringified;
              setPackages(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_faq') {
              lastSavedState.current.faq = stringified;
              setFaq(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_reviews') {
              lastSavedState.current.reviews = stringified;
              setReviews(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_blog') {
              lastSavedState.current.blog = stringified;
              setBlog(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_settings') {
              lastSavedState.current.settings = stringified;
              setSettings(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_categories') {
              lastSavedState.current.categories = stringified;
              setCategories(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_nav_items') {
              lastSavedState.current.navItems = stringified;
              setNavItems(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_hero_cms') {
              lastSavedState.current.heroCms = stringified;
              setHeroCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_homepage_cms') {
              lastSavedState.current.homepageCms = stringified;
              setHomepageCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_contact_cms') {
              lastSavedState.current.contactCms = stringified;
              setContactCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_popup_cms') {
              lastSavedState.current.popupCms = stringified;
              setPopupCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_blog_cms') {
              lastSavedState.current.blogCms = stringified;
              setBlogCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_pricing_cms') {
              lastSavedState.current.pricingCms = stringified;
              setPricingCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            } else if (key === 'gangin_estimate_cms') {
              lastSavedState.current.estimateCms = stringified;
              setEstimateCms(prev => JSON.stringify(prev) !== stringified ? value : prev);
            }
          }
        )
        .subscribe((status) => {
          console.log('[Supabase Realtime Channel Status]:', status);
        });
    }
    
    if (isHydrated) {
      subscribeRealtime();
    }
    
    return () => {
      if (channel) {
        import('./lib/supabase').then(({ supabase }) => {
          if (supabase) supabase.removeChannel(channel);
        });
      }
    };
  }, [isHydrated]);

  // States to pre-fill estimate inputs when user clicks an inquiry CTA in a specific project's detail
  const [prefillCategory, setPrefillCategory] = useState<string>('');
  const [prefillSpace, setPrefillSpace] = useState<string>('');

  const resetProject = () => {
    setSelectedProjectId(null);
  };

  const setEstimatePrefill = (category: string, title: string) => {
    setPrefillCategory(category);
    setPrefillSpace(title);
  };

  // Automatically scroll to the top during page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  // Dynamic document title update (SEO Basics)
  useEffect(() => {
    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }
  }, [settings.seoTitle]);

  // Render detail screen of a project with callbacks
  const renderDetailView = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return <div className="text-center py-20 font-light text-xs text-brand-muted">Space not found</div>;
    return (
      <ProjectDetail
        project={project}
        onBack={() => setSelectedProjectId(null)}
        setView={setView}
        setEstimatePrefill={setEstimatePrefill}
      />
    );
  };

  return (
    <div id="gangin-app-root" className="min-h-screen bg-white flex flex-col justify-between selection:bg-brand-dark selection:text-white">
      {/* Premium Navigation Header */}
      <Navigation
        currentView={currentView}
        setView={setView}
        resetProject={resetProject}
        settings={settings}
        navItems={navItems}
      />

      {/* Main Page Layout Dynamic Routing */}
      <main id="gangin-main-content" className="flex-grow">
        {currentView === 'home' && (
          <Home
            projects={projects}
            reviews={reviews}
            setView={setView}
            setSelectedProjectId={setSelectedProjectId}
            settings={settings}
            heroCms={heroCms}
            homepageCms={homepageCms}
          />
        )}

        {currentView === 'portfolio' && (
          <Portfolio
            projects={projects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            renderDetailView={renderDetailView}
          />
        )}

        {currentView === 'pricing' && (
          <Pricing
            setView={setView}
            packages={packages}
            pricingCms={pricingCms}
          />
        )}

        {currentView === 'estimate' && (
          <Estimate
            prefillCategory={prefillCategory}
            prefillSpace={prefillSpace}
            clearPrefill={() => {
              setPrefillCategory('');
              setPrefillSpace('');
            }}
            setView={setView}
            estimateCms={estimateCms}
          />
        )}

        {currentView === 'about' && (
          <About />
        )}

        {currentView === 'contact' && (
          <Contact contactCms={contactCms} />
        )}

        {/* 1204DESIGN-Inspired New Core Views */}
        {currentView === 'categories' && (
          <Categories
            categories={categories}
            projects={projects}
            packages={packages}
            faq={faq}
            reviews={reviews}
            setView={setView}
            setSelectedProjectId={setSelectedProjectId}
            setEstimatePrefill={setEstimatePrefill}
          />
        )}

        {currentView === 'faq' && (
          <FAQ
            faqList={faq}
            setView={setView}
          />
        )}

        {currentView === 'reviews' && (
          <Reviews
            reviews={reviews}
            setView={setView}
          />
        )}

        {currentView === 'blog' && (
          <Blog
            blogPosts={blog}
            setView={setView}
            blogCms={blogCms}
          />
        )}

        {currentView === 'admin' && (
          <Admin
            projects={projects}
            packages={packages}
            faq={faq}
            reviews={reviews}
            blog={blog}
            settings={settings}
            categories={categories}
            navItems={navItems}
            heroCms={heroCms}
            homepageCms={homepageCms}
            contactCms={contactCms}
            popupCms={popupCms}
            blogCms={blogCms}
            pricingCms={pricingCms}
            estimateCms={estimateCms}
            onUpdateProjects={setProjects}
            onUpdatePackages={setPackages}
            onUpdateFAQ={setFaq}
            onUpdateReviews={setReviews}
            onUpdateBlog={setBlog}
            onUpdateSettings={setSettings}
            onUpdateCategories={setCategories}
            onUpdateNavItems={setNavItems}
            onUpdateHeroCms={setHeroCms}
            onUpdateHomepageCms={setHomepageCms}
            onUpdateContactCms={setContactCms}
            onUpdatePopupCms={setPopupCms}
            onUpdateBlogCms={setBlogCms}
            onUpdatePricingCms={setPricingCms}
            onUpdateEstimateCms={setEstimateCms}
          />
        )}
      </main>

      {/* 5. RESPONSIVE FLOATING STICKY CTA PORTAL SYSTEM (ON:SAEMI inspired - LEIBAL STYLE) */}
      <div id="sticky-cta-hub" className="relative z-40">
        
        {/* A. Fixed Right-Side Floating Quick Menu (Desktop/Tablet) */}
        <div id="desktop-fixed-cta" className="hidden sm:flex flex-col fixed bottom-24 right-8 space-y-2 z-50">
          <button
            onClick={() => { setView('estimate'); resetProject(); }}
            className="w-14 h-14 bg-[#111111] text-white border border-[#111111] flex flex-col justify-center items-center hover:bg-black transition-all cursor-pointer shadow-sm group font-semibold"
            title="실시간 예상견적"
          >
            <Calculator size={14} className="group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold">정밀견적</span>
          </button>

          <button
            id="panel-cta-contact"
            onClick={() => { setView('contact'); resetProject(); }}
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group font-semibold"
            title="정밀기획 및 간편상담"
          >
            <Clock size={14} className="text-brand-dark group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">간편상담</span>
          </button>
          
          <a
            href={settings.kakaotalk}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="카카오톡 1:1 채팅"
          >
            <MessageSquare size={14} className="text-brand-dark group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">카카오톡</span>
          </a>

          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="인스타그램 방문"
          >
            <Instagram size={14} className="text-brand-dark group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">인스타</span>
          </a>

          <a
            href={settings.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="공식 블로그 칼럼"
          >
            <BookOpen size={14} className="text-brand-dark group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">블로그</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            className="w-14 h-14 bg-white text-brand-dark border border-brand-border flex flex-col justify-center items-center hover:bg-brand-bg transition-all cursor-pointer shadow-sm group"
            title="대표 연락 유선 직통 연결"
          >
            <Phone size={14} className="text-brand-dark group-hover:scale-105 transition-transform" />
            <span className="text-[7.5px] mt-1 tracking-widest font-bold text-brand-dark">직통유선</span>
          </a>
        </div>

        {/* B. Mobile Bottom Sticky bar for hand-held accessibility (5 key buttons) */}
        <div id="mobile-sticky-cta" className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-brand-border z-50 grid grid-cols-5 h-16 shadow-lg divide-x divide-brand-border/60">
          <button
            onClick={() => { setView('portfolio'); resetProject(); }}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <FileText size={15} className="text-brand-dark" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">포트폴리오</span>
          </button>

          <button
            onClick={() => { setView('estimate'); resetProject(); }}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Calculator size={15} className="text-brand-dark" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">예상견적</span>
          </button>

          <button
            onClick={() => { setView('contact'); resetProject(); }}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Clock size={15} className="text-brand-dark" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">간편상담</span>
          </button>

          <a
            href={`tel:${settings.phone}`}
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Phone size={15} className="text-brand-dark" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">전화문의</span>
          </a>

          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center items-center text-brand-dark cursor-pointer active:bg-brand-bg select-none"
          >
            <Instagram size={15} className="text-brand-dark" />
            <span className="text-[8.5px] mt-1 font-bold tracking-widest text-[#111111]">인스타그램</span>
          </a>
        </div>
      </div>

      {/* C. Minimalist Exit Intent Modal in elegant LEIBAL Aesthetic */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="bg-[#FFFFFF] border border-[#111111] w-[92%] sm:w-full max-w-md p-6 sm:p-8 text-left space-y-5 sm:space-y-6 relative max-h-[92vh] overflow-y-auto shadow-2xl"
            >
              {/* Close pin */}
              <button
                type="button"
                onClick={() => {
                  console.log('[POPUP DISMISS]');
                  sessionStorage.setItem('gangin_exit_intent_dismissed', 'true');
                  setShowExitModal(false);
                }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-brand-muted hover:text-[#111111] transition-colors cursor-pointer p-2.5"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="space-y-3.5 pr-4">
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#e11d48] font-bold block flex items-center gap-1.5 animate-pulse">
                  <Sparkles size={10} />
                  <span>{popupCms.topLabel || "SPECIAL LEAD OFFER"}</span>
                </span>
                <h3 className="text-sm font-normal text-brand-dark tracking-widest leading-relaxed whitespace-pre-line text-balance">
                  {popupCms.title}
                </h3>
                <p className="text-[11.5px] font-light text-brand-muted leading-relaxed tracking-wide whitespace-pre-line">
                  {popupCms.description}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    console.log('[POPUP DISMISS]');
                    sessionStorage.setItem('gangin_exit_intent_dismissed', 'true');
                    setShowExitModal(false);
                    if (popupCms.ctaUrl && (popupCms.ctaUrl.startsWith('http://') || popupCms.ctaUrl.startsWith('https://'))) {
                      window.open(popupCms.ctaUrl, '_blank', 'noreferrer');
                    } else {
                      setView((popupCms.ctaUrl || 'estimate') as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3.5 bg-[#111111] hover:bg-black text-white text-[10px] tracking-[0.2em] font-bold uppercase transition-colors text-center cursor-pointer active:scale-[0.99]"
                >
                  {popupCms.ctaText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('[POPUP DISMISS]');
                    sessionStorage.setItem('gangin_exit_intent_dismissed', 'true');
                    setShowExitModal(false);
                  }}
                  className="w-full py-2.5 bg-transparent hover:bg-brand-bg/40 text-brand-muted hover:text-brand-dark text-[9px] tracking-widest uppercase transition-all text-center cursor-pointer font-light active:bg-brand-bg/80"
                >
                  {popupCms.dismissText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Minimal Footer */}
      <Footer
        setView={setView}
        resetProject={resetProject}
        settings={settings}
      />
    </div>
  );
}

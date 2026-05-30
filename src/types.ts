export type NavView = 'home' | 'portfolio' | 'pricing' | 'estimate' | 'about' | 'contact' | 'categories' | 'faq' | 'reviews' | 'blog' | 'admin';

export interface ProjectStep {
  title: string;
  description: string;
}

export interface BeforeAfterPair {
  beforeDescription: string;
  afterDescription: string;
  desc: string;
  imageAfter: string;
  comment?: string;
}

export interface GalleryItem {
  url: string;
  urlMobile?: string;
  caption: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  location: string;
  locationDetails?: string;
  category: 'Commercial' | 'Bathroom' | 'Residential' | 'Cafe' | 'Office' | 'Kids Pool' | 'Architecture' | 'Retail' | 'Custom Project';
  year: string;
  area: string; // e.g. "135㎡ / 41평"
  client: string;
  image: string; // primary image path
  imageMobile?: string; // primary mobile image path (optional)
  concept: string; // Design philosophy story
  materials: string[];
  timeline: string;
  constructionProcess: ProjectStep[];
  beforeAfter: BeforeAfterPair;
  gallery: GalleryItem[];
  featured?: boolean;
  featuredOrder?: number;
}

export interface EstimateSubmit {
  id: string;
  clientName: string;
  phone: string;
  category: string;
  spaceType: string;
  area: string; // in pyeong or sqm
  budget: string;
  schedule: string;
  designPreference: string;
  details: string;
  consultationType: 'Call' | 'Visit';
  submittedAt: string;
  status: 'Pending' | 'Reviewing' | 'Scheduled';
}

export interface PricingPackage {
  id: string;
  title: string;
  subtitle: string;
  priceRange: string;
  features: string[];
  details: string;
  process: string[];
}

export interface NavItemConfig {
  id: string;
  label: string;
  view: NavView;
  labelKr: string;
  order: number;
  show: boolean;
}

export interface HeroCmsConfig {
  image1: string;
  image1Mobile?: string;
  image2: string;
  image2Mobile?: string;
  image3: string;
  image3Mobile?: string;
  show1: boolean;
  show2: boolean;
  show3: boolean;
  order: string;
  interval: number;
  headlineLine1: string;
  headlineLine2: string;
  label1: string;
  label2: string;
  label3: string;
  button1Text: string;
  button1Url: string;
  button2Text: string;
  button2Url: string;
}

export interface HomepageCmsConfig {
  philosophyNum: string;
  philosophyLabel: string;
  philosophyTitle: string;
  philosophyHeadline: string;
  philosophyPara1: string;
  philosophyPara2: string;

  featuredNum: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredBtnText: string;
  featuredBtnUrl: string;

  integrityNum: string;
  integrityLabel: string;
  integrityTitle: string;
  integrityDesc: string;
  
  col1Num: string;
  col1Title: string;
  col1Desc: string;
  col2Num: string;
  col2Title: string;
  col2Desc: string;
  col3Num: string;
  col3Title: string;
  col3Desc: string;

  conversionNum: string;
  conversionLabel: string;
  conversionTitle: string;
  conversionDesc: string;

  portal1Title: string;
  portal1Desc: string;
  portal2Title: string;
  portal2Desc: string;

  form1NameLabel: string;
  form1PhoneLabel: string;
  form1TypeLabel: string;
  form1AreaLabel: string;
  form1BudgetLabel: string;
  form2NameLabel: string;
  form2PhoneLabel: string;
  form2TypeLabel: string;
  form2TimeLabel: string;
  form2DescLabel: string;
}

export interface ContactCmsConfig {
  topLabel: string;
  topTitle: string;
  topDesc: string;

  addressSectionTitle: string;
  addressMain: string;
  addressSub: string;
  addressMapLinkText: string;
  addressMapLinkUrl: string;

  channelSectionTitle: string;
  channelMainPhone: string;
  channelMobilePhone: string;
  channelEmail: string;
  channelKakaoText: string;
  channelKakaoUrl: string;

  workSectionTitle: string;
  workWeekday: string;
  workWeekend: string;
  workHolidayNotice: string;
  workAdditionalNote: string;

  mapImage: string;
  mapEmbed: string;
  mapMarkerTitle: string;
  mapMarkerDesc: string;
  naverMapLink: string;
  kakaoMapLink: string;

  buttonText: string;
  buttonUrl: string;
  buttonShow: boolean;
}

export interface PopupCmsConfig {
  showPopup: boolean;
  topLabel: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  dismissText: string;
  delayTime: number; // in seconds
}

export interface BlogCmsConfig {
  topLabel: string;
  title: string;
  description: string;
}

export interface PricingCmsConfig {
  topLabel: string;
  title: string;
  description: string;
}

export interface EstimateCmsConfig {
  step1Title: string;
  step1Desc: string;
  sideLabel: string;
  sideTitle: string;
  sideDesc: string;
  techRuleTitle: string;
  techRule1: string;
  techRule2: string;
  techRule3: string;
  techRule4: string;
}

export interface StatsCmsConfig {
  show: boolean;
  smallLabel: string;
  mainTitle: string;
  stat1Label: string;
  stat1Number: number;
  stat2Label: string;
  stat2Number: number;
  stat3Label: string;
  stat3Number: number;
}



import { FAQItem, CustomerReview, BlogPost, SiteSettings, ServicePackage, ServiceCategory } from './store';
export type { FAQItem, CustomerReview, BlogPost, SiteSettings, ServicePackage, ServiceCategory };

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
  concept: string; // Design philosophy story
  materials: string[];
  timeline: string;
  constructionProcess: ProjectStep[];
  beforeAfter: BeforeAfterPair;
  gallery: GalleryItem[];
  featured?: boolean;
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

import { FAQItem, CustomerReview, BlogPost, SiteSettings, ServicePackage, ServiceCategory } from './store';
export type { FAQItem, CustomerReview, BlogPost, SiteSettings, ServicePackage, ServiceCategory };

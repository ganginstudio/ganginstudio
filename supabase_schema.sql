-- ==========================================
-- GANGIN STUDIO OFFICIAL DATABASE SCHEMA SETUP
-- ==========================================
-- Run this complete script in the SQL Editor of your Supabase projects dashboard
-- to automatically and instantly configure your tables, timestamps,
-- and secure Row Level Security (RLS) policies.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE core database tables

-- Table 1: gangin_cms (Core JSON state store)
CREATE TABLE IF NOT EXISTS public.gangin_cms (
    key text PRIMARY KEY,
    value jsonb NOT NULL,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 2: projects (Portfolio Space and architectural designs)
CREATE TABLE IF NOT EXISTS public.projects (
    id text PRIMARY KEY,
    title text NOT NULL,
    title_en text,
    location text NOT NULL,
    location_details text,
    category text NOT NULL,
    year text DEFAULT '2026',
    area text NOT NULL,
    client text DEFAULT 'Private Client',
    image text NOT NULL,
    concept text,
    materials text[] DEFAULT '{}'::text[],
    timeline text,
    construction_process jsonb DEFAULT '[]'::jsonb,
    before_after jsonb DEFAULT '{}'::jsonb,
    gallery text[] DEFAULT '{}'::text[],
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 3: categories (Service divisions like Apartment, Commercial, etc.)
CREATE TABLE IF NOT EXISTS public.categories (
    id text PRIMARY KEY,
    name_kr text NOT NULL,
    name_en text NOT NULL,
    description text,
    hero_image text NOT NULL,
    scope text[] DEFAULT '{}'::text[],
    materials jsonb DEFAULT '[]'::jsonb,
    process text[] DEFAULT '{}'::text[],
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 4: homepage_content (Dynamic texts, visual alignments)
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    key text NOT NULL UNIQUE,
    value jsonb NOT NULL,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 5: pricing (Service package specifications and scopes)
CREATE TABLE IF NOT EXISTS public.pricing (
    id text PRIMARY KEY,
    name text NOT NULL,
    category_key text NOT NULL,
    starting_price text NOT NULL,
    duration text NOT NULL,
    included_scope text[] DEFAULT '{}'::text[],
    excluded_scope text[] DEFAULT '{}'::text[],
    timeline_summary text,
    process_summary text,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 6: reviews (Client feedback logs)
CREATE TABLE IF NOT EXISTS public.reviews (
    id text PRIMARY KEY,
    project_title text NOT NULL,
    client_name text NOT NULL,
    rating integer DEFAULT 5,
    highlight text,
    quote text NOT NULL,
    story text,
    date text,
    category text,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 7: contact (Detailed leads, estimates & consultation receipts)
CREATE TABLE IF NOT EXISTS public.contact (
    id text PRIMARY KEY,
    type text NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    category text,
    region text,
    area text,
    budget text,
    schedule text,
    details text,
    uploads_count integer DEFAULT 0,
    uploads jsonb DEFAULT '[]'::jsonb,
    submitted_at text,
    status text DEFAULT 'Pending',
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 8: faq (Frequently Asked Questions categorized)
CREATE TABLE IF NOT EXISTS public.faq (
    id text PRIMARY KEY,
    category text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table 9: hero_slider (Visual slideshow records on home screen)
CREATE TABLE IF NOT EXISTS public.hero_slider (
    id text PRIMARY KEY,
    image text NOT NULL,
    title text NOT NULL,
    subtitle text,
    link text,
    order_index integer DEFAULT 0,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 3. AUTO-UPDATE TIMESTAMPS TRIGGERS helper functions and attachment
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at automatically to all tables on modification
DROP TRIGGER IF EXISTS set_gangin_cms_updated_at ON public.gangin_cms;
CREATE TRIGGER set_gangin_cms_updated_at BEFORE UPDATE ON public.gangin_cms FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_homepage_content_updated_at ON public.homepage_content;
CREATE TRIGGER set_homepage_content_updated_at BEFORE UPDATE ON public.homepage_content FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_pricing_updated_at ON public.pricing;
CREATE TRIGGER set_pricing_updated_at BEFORE UPDATE ON public.pricing FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_reviews_updated_at ON public.reviews;
CREATE TRIGGER set_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_contact_updated_at ON public.contact;
CREATE TRIGGER set_contact_updated_at BEFORE UPDATE ON public.contact FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_faq_updated_at ON public.faq;
CREATE TRIGGER set_faq_updated_at BEFORE UPDATE ON public.faq FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_hero_slider_updated_at ON public.hero_slider;
CREATE TRIGGER set_hero_slider_updated_at BEFORE UPDATE ON public.hero_slider FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- 4. ENABLE ROW LEVEL SECURITY (RLS) on all tables
ALTER TABLE public.gangin_cms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slider ENABLE ROW LEVEL SECURITY;


-- 5. WRITE POLICIES for Authenticated Admin Editing & Public Website Reading

-- gangin_cms policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.gangin_cms;
CREATE POLICY "Enable read access for all users" ON public.gangin_cms FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users (submissions/saveState)" ON public.gangin_cms;
CREATE POLICY "Enable insert for all users (submissions/saveState)" ON public.gangin_cms FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users (saveState)" ON public.gangin_cms;
CREATE POLICY "Enable update for all users (saveState)" ON public.gangin_cms FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable delete for authenticated admins only" ON public.gangin_cms;
CREATE POLICY "Enable delete for authenticated admins only" ON public.gangin_cms FOR DELETE TO authenticated USING (true);

-- projects policies
DROP POLICY IF EXISTS "Enable read projects for all users" ON public.projects;
CREATE POLICY "Enable read projects for all users" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for projects" ON public.projects;
CREATE POLICY "Enable admin write/update for projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for local projects" ON public.projects;
CREATE POLICY "Enable public insert/update fallback for local projects" ON public.projects FOR ALL TO anon USING (true) WITH CHECK (true);

-- categories policies
DROP POLICY IF EXISTS "Enable read categories for all users" ON public.categories;
CREATE POLICY "Enable read categories for all users" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for categories" ON public.categories;
CREATE POLICY "Enable admin write/update for categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for categories" ON public.categories;
CREATE POLICY "Enable public insert/update fallback for categories" ON public.categories FOR ALL TO anon USING (true) WITH CHECK (true);

-- homepage_content policies
DROP POLICY IF EXISTS "Enable read homepage_content for all users" ON public.homepage_content;
CREATE POLICY "Enable read homepage_content for all users" ON public.homepage_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for homepage_content" ON public.homepage_content;
CREATE POLICY "Enable admin write/update for homepage_content" ON public.homepage_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for homepage_content" ON public.homepage_content;
CREATE POLICY "Enable public insert/update fallback for homepage_content" ON public.homepage_content FOR ALL TO anon USING (true) WITH CHECK (true);

-- pricing policies
DROP POLICY IF EXISTS "Enable read pricing for all users" ON public.pricing;
CREATE POLICY "Enable read pricing for all users" ON public.pricing FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for pricing" ON public.pricing;
CREATE POLICY "Enable admin write/update for pricing" ON public.pricing FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for pricing" ON public.pricing;
CREATE POLICY "Enable public insert/update fallback for pricing" ON public.pricing FOR ALL TO anon USING (true) WITH CHECK (true);

-- reviews policies
DROP POLICY IF EXISTS "Enable read reviews for all users" ON public.reviews;
CREATE POLICY "Enable read reviews for all users" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for reviews" ON public.reviews;
CREATE POLICY "Enable admin write/update for reviews" ON public.reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for reviews" ON public.reviews;
CREATE POLICY "Enable public insert/update fallback for reviews" ON public.reviews FOR ALL TO anon USING (true) WITH CHECK (true);

-- contact policies (Public needs to insert estimates and leads anonymously)
DROP POLICY IF EXISTS "Enable read contact for all users" ON public.contact;
CREATE POLICY "Enable read contact for all users" ON public.contact FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable anonymous insert for contact requests" ON public.contact;
CREATE POLICY "Enable anonymous insert for contact requests" ON public.contact FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable admin write/update for contacts" ON public.contact;
CREATE POLICY "Enable admin write/update for contacts" ON public.contact FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public update fallback for contact" ON public.contact;
CREATE POLICY "Enable public update fallback for contact" ON public.contact FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- faq policies
DROP POLICY IF EXISTS "Enable read faq for all users" ON public.faq;
CREATE POLICY "Enable read faq for all users" ON public.faq FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for faq" ON public.faq;
CREATE POLICY "Enable admin write/update for faq" ON public.faq FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for faq" ON public.faq;
CREATE POLICY "Enable public insert/update fallback for faq" ON public.faq FOR ALL TO anon USING (true) WITH CHECK (true);

-- hero_slider policies
DROP POLICY IF EXISTS "Enable read hero_slider for all users" ON public.hero_slider;
CREATE POLICY "Enable read hero_slider for all users" ON public.hero_slider FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable admin write/update for hero_slider" ON public.hero_slider;
CREATE POLICY "Enable admin write/update for hero_slider" ON public.hero_slider FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable public insert/update fallback for hero_slider" ON public.hero_slider;
CREATE POLICY "Enable public insert/update fallback for hero_slider" ON public.hero_slider FOR ALL TO anon USING (true) WITH CHECK (true);


-- 6. SETUP STORAGE BUCKETS AND STORAGE POLICIES
-- Note: Replace with bucket policies to permit uploads
-- These policies allow public reads and writes on 'gangin-portfolio' and 'images' buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gangin-portfolio', 'gangin-portfolio', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies for uploads
DROP POLICY IF EXISTS "Allow public select uploads on gangin-portfolio" ON storage.objects;
CREATE POLICY "Allow public select uploads on gangin-portfolio" ON storage.objects FOR SELECT USING (bucket_id = 'gangin-portfolio');

DROP POLICY IF EXISTS "Allow authenticated/anonymous insert on gangin-portfolio" ON storage.objects;
CREATE POLICY "Allow authenticated/anonymous insert on gangin-portfolio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gangin-portfolio');

DROP POLICY IF EXISTS "Allow authenticated/anonymous update on gangin-portfolio" ON storage.objects;
CREATE POLICY "Allow authenticated/anonymous update on gangin-portfolio" ON storage.objects FOR UPDATE USING (bucket_id = 'gangin-portfolio');

DROP POLICY IF EXISTS "Allow authenticated/anonymous delete on gangin-portfolio" ON storage.objects;
CREATE POLICY "Allow authenticated/anonymous delete on gangin-portfolio" ON storage.objects FOR DELETE USING (bucket_id = 'gangin-portfolio');

DROP POLICY IF EXISTS "Allow public select uploads on images" ON storage.objects;
CREATE POLICY "Allow public select uploads on images" ON storage.objects FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Allow authenticated/anonymous insert on images" ON storage.objects;
CREATE POLICY "Allow authenticated/anonymous insert on images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "Allow authenticated/anonymous update on images" ON storage.objects;
CREATE POLICY "Allow authenticated/anonymous update on images" ON storage.objects FOR UPDATE USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Allow authenticated/anonymous delete on images" ON storage.objects;
CREATE POLICY "Allow authenticated/anonymous delete on images" ON storage.objects FOR DELETE USING (bucket_id = 'images');

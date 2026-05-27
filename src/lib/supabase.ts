import { createClient } from '@supabase/supabase-js';

// Read values from Vite environment variables safely, with hardcoded production fallbacks
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://fgmzebxdynouqhydljp.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uoTGEI5iASt05HFZpZm8fw_VowyPFlU';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export let isSupabaseOffline = false;

// Custom event dispatcher to dynamically notify UI components of Supabase connection dropouts
function setSupabaseOfflineStatus(offline: boolean) {
  if (isSupabaseOffline !== offline) {
    isSupabaseOffline = offline;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('supabase-status-change', { detail: { offline } }));
    }
  }
}

/**
 * Robust Supabase persistence Layer.
 * Employs a single robust key-value model which is error-safe, migration-free,
 * and maintains full-fidelity JSON representations of all projects, settings, packages, etc.
 */
export async function fetchSupabaseState<T>(key: string, fallback: T): Promise<T> {
  if (!supabase) {
    return fallback;
  }
  try {
    const { data, error } = await supabase
      .from('gangin_cms')
      .select('value')
      .eq('key', key)
      .single();

    if (error || !data) {
      if (error && (error.message.includes('Failed to fetch') || error.message.includes('fetch failed') || error.message.includes('getaddrinfo'))) {
        setSupabaseOfflineStatus(true);
        console.warn(`[Supabase Status] Connection offline or project paused (fgmzebxdynouqhydljp). Please verify your Supabase endpoint is active.`);
      } else {
        console.warn(`[Supabase] Row fetch failed for "${key}". Using fallback.`, error?.message);
      }
      return fallback;
    }
    setSupabaseOfflineStatus(false);
    return data.value as T;
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (errMsg.includes('Failed to fetch') || errMsg.includes('fetch failed') || errMsg.includes('getaddrinfo')) {
      setSupabaseOfflineStatus(true);
      console.warn(`[Supabase Status] Connection exception. Supabase project (fgmzebxdynouqhydljp) is currently unreachable. Operating in-memory.`);
    } else {
      console.error(`[Supabase] Exception fetching "${key}":`, err);
    }
    return fallback;
  }
}

export async function saveSupabaseState<T>(key: string, value: T): Promise<boolean> {
  if (!supabase) {
    return false;
  }
  try {
    // Attempt to upsert
    const { error } = await supabase
      .from('gangin_cms')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

    if (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('fetch failed') || error.message.includes('getaddrinfo')) {
        setSupabaseOfflineStatus(true);
        console.warn(`[Supabase Status] Connection offline during save of "${key}". Your change is saved in-memory but did not sync to the cloud database.`);
      } else {
        console.error(`[Supabase] Upsert error for "${key}":`, error.message);
      }
      return false;
    }
    setSupabaseOfflineStatus(false);

    // Asynchronously update corresponding individual relational schemas for double-write reliability
    syncIndividualTables(key, value);

    return true;
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (errMsg.includes('Failed to fetch') || errMsg.includes('fetch failed') || errMsg.includes('getaddrinfo')) {
      setSupabaseOfflineStatus(true);
      console.warn(`[Supabase Status] Exception during save of "${key}". Supabase is offline. Change persistent online update skipped.`);
    } else {
      console.error(`[Supabase] Exception saving "${key}":`, err);
    }
    return false;
  }
}

/**
 * Sync logic mapping core states into relational database columns.
 */
async function syncIndividualTables(key: string, value: any) {
  if (!supabase) return;
  try {
    if (key === 'gangin_projects' && Array.isArray(value)) {
      for (const p of value) {
        if (!p || !p.id) continue;
        await supabase.from('projects').upsert({
          id: String(p.id),
          title: String(p.title || 'Untitled'),
          title_en: p.titleEn ? String(p.titleEn) : null,
          location: String(p.location || ''),
          location_details: p.locationDetails ? String(p.locationDetails) : null,
          category: String(p.category || 'Residential'),
          year: String(p.year || '2026'),
          area: String(p.area || ''),
          client: String(p.client || 'Private Client'),
          image: String(p.image || ''),
          concept: p.concept ? String(p.concept) : null,
          materials: Array.isArray(p.materials) ? p.materials.map(String) : [],
          timeline: p.timeline ? String(p.timeline) : null,
          construction_process: Array.isArray(p.constructionProcess) ? p.constructionProcess : [],
          before_after: p.beforeAfter || {},
          gallery: Array.isArray(p.gallery) ? p.gallery.map(String) : [],
          featured: Boolean(p.featured),
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    } else if (key === 'gangin_categories' && Array.isArray(value)) {
      for (const c of value) {
        if (!c || !c.id) continue;
        await supabase.from('categories').upsert({
          id: String(c.id),
          name_kr: String(c.nameKr || ''),
          name_en: String(c.nameEn || ''),
          description: c.description ? String(c.description) : null,
          hero_image: String(c.heroImage || ''),
          scope: Array.isArray(c.scope) ? c.scope.map(String) : [],
          materials: c.materials || [],
          process: Array.isArray(c.process) ? c.process.map(String) : [],
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    } else if (key === 'gangin_faq' && Array.isArray(value)) {
      for (const f of value) {
        if (!f || !f.id) continue;
        await supabase.from('faq').upsert({
          id: String(f.id),
          category: String(f.category || ''),
          question: String(f.question || ''),
          answer: String(f.answer || ''),
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    } else if (key === 'gangin_reviews' && Array.isArray(value)) {
      for (const r of value) {
        if (!r || !r.id) continue;
        await supabase.from('reviews').upsert({
          id: String(r.id),
          project_title: String(r.projectTitle || ''),
          client_name: String(r.clientName || ''),
          rating: Number(r.rating || 5),
          highlight: r.highlight ? String(r.highlight) : null,
          quote: String(r.quote || ''),
          story: r.story ? String(r.story) : null,
          date: r.date ? String(r.date) : null,
          category: r.category ? String(r.category) : null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    } else if (key === 'gangin_packages' && Array.isArray(value)) {
      for (const pkg of value) {
        if (!pkg || !pkg.id) continue;
        await supabase.from('pricing').upsert({
          id: String(pkg.id),
          name: String(pkg.name || ''),
          category_key: String(pkg.categoryKey || ''),
          starting_price: String(pkg.startingPrice || ''),
          duration: String(pkg.duration || ''),
          included_scope: Array.isArray(pkg.includedScope) ? pkg.includedScope.map(String) : [],
          excluded_scope: Array.isArray(pkg.excludedScope) ? pkg.excludedScope.map(String) : [],
          timeline_summary: pkg.timelineSummary ? String(pkg.timelineSummary) : null,
          process_summary: pkg.processSummary ? String(pkg.processSummary) : null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    } else if (key === 'gangin_settings') {
      await supabase.from('homepage_content').upsert({
        key: 'settings',
        value: value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
      
      if (value && value.visualHeroImage) {
        await supabase.from('hero_slider').upsert({
          id: 'hero_main',
          image: String(value.visualHeroImage),
          title: String(value.brandName || 'GANG I N STUDIO'),
          subtitle: String(value.subTitle || 'ARCHITECTURE & SPACE'),
          order_index: 0,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    } else if ((key === 'gangin_estimates' || key === 'gangin_all_leads' || key === 'gangin_consultations') && Array.isArray(value)) {
      for (const lead of value) {
        if (!lead || !lead.id) continue;
        await supabase.from('contact').upsert({
          id: String(lead.id),
          type: String(lead.type || 'Consultation'),
          name: String(lead.name || lead.clientName || ''),
          phone: String(lead.phone || ''),
          category: String(lead.category || ''),
          region: String(lead.region || ''),
          area: String(lead.area || ''),
          budget: String(lead.budget || ''),
          schedule: String(lead.schedule || ''),
          details: String(lead.details || ''),
          uploads_count: Number(lead.uploadsCount || (lead.uploads ? lead.uploads.length : 0)),
          uploads: lead.uploads || [],
          submitted_at: String(lead.timestamp || lead.submittedAt || ''),
          status: String(lead.status || 'Pending'),
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
    }
  } catch (err) {
    console.warn(`[Supabase Optional Target Table Sync] Skipped or column mismatch for "${key}":`, err);
  }
}

/**
 * Handle portfolio image upload to Supabase Storage if configured.
 * Bucket name: 'gangin-portfolio'
 * If storage upload fails, attempts fallback bucket and automatic creation if permissions allow.
 */
export async function uploadPortfolioImage(file: File): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized.');
  }

  const fileExt = file.name.split('.').pop() || 'webp';
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;
  const bucketName = 'gangin-portfolio';

  // Ensure bucket exists by attempting to create it
  try {
    await supabase.storage.createBucket(bucketName, { public: true });
  } catch (err) {
    // Already exists or no create permissions which is completely fine
  }

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.warn(`[Supabase Storage] Failed to upload to "${bucketName}". Trying "images" fallback bucket...`, error.message);
    try {
      await supabase.storage.createBucket('images', { public: true });
    } catch (e) {}
    
    const fallbackRes = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (fallbackRes.error) {
      throw new Error(`Supabase Storage 업로드 실패. 버킷을 'gangin-portfolio' 또는 'images' 이름으로 생성하세요. 에러: ${fallbackRes.error.message}`);
    }
    
    const { data: fallbackUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return fallbackUrlData.publicUrl;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

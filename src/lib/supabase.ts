import { createClient } from '@supabase/supabase-js';

// Read values from Vite environment variables safely, with hardcoded production fallbacks
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://fgmzebxdynouqhydljp.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uoTGEI5iASt05HFZpZm8fw_VowyPFlU';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
      console.warn(`[Supabase] Row fetch failed for "${key}". Using fallback.`, error?.message);
      return fallback;
    }
    return data.value as T;
  } catch (err) {
    console.error(`[Supabase] Exception fetching "${key}":`, err);
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
      console.error(`[Supabase] Upsert error for "${key}":`, error.message);
      // Try to create the table if missing by doing RPC or letting user know we need SQL
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Exception saving "${key}":`, err);
    return false;
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

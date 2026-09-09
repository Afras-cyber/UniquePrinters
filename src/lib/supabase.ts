import { createClient } from '@supabase/supabase-js';

// Environment variables can be provided via .env
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-unique-printers.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key-development';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('mock')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Database helper functions with automatic fallback to local datasets
export async function fetchCatalogBooks() {
  if (!isSupabaseConfigured) {
    return null; // Will fallback to local sample data
  }
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase fetch books error, using local fallback:', err);
    return null;
  }
}

export async function submitCustomerEnquiry(payload: {
  name: string;
  phone: string;
  serviceType: string;
  notes: string;
}) {
  if (!isSupabaseConfigured) {
    console.log('[Dev Mode] Enquiry received (no remote DB configured):', payload);
    return { success: true, mock: true };
  }
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([payload]);
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to submit enquiry to Supabase:', err);
    return { success: false, error: err };
  }
}

import { createClient } from '@supabase/supabase-js';

// User provided keys
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://hvpkfsnddnhddopfbcei.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cGtmc25kZG5oZGRvcGZiY2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNzE5ODEsImV4cCI6MjA5Nzc0Nzk4MX0.DEWLKmoW8zhu9FhKZOIiXYpoNydcAgIGSQ2b8wmq_Z0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

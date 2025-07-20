import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enmtpjatwkvptijqsngg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubXRwamF0d2t2cHRpanFzbmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzczNzUsImV4cCI6MjA2ODUxMzM3NX0.Q1gVsE7hDnod-v64Sf8WUud-rGfOHr0iP5ymbJ_V898';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mdbwnmbnunlnltfnlieq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYndubWJudW5sbmx0Zm5saWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTcwMTEsImV4cCI6MjEwMzMzMzAxMX0.YYcP2elqOL8aNmV8-HNA0YfxR0U7Fv7F6qugHW43K3w';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false
  }
});

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zrilskvmgxpkoqqiicaf.supabase.co";
export const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaWxza3ZtZ3hwa29xcWlpY2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzAyMDQsImV4cCI6MjA3NDgwNjIwNH0.1ykkgHX9vYlBzVQyPq8etp4E4STrqOjr71vPZnxiqt0";

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in dev to surface misconfiguration
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnfxkxosxkitbnyywsao.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZnhreG9zeGtpdGJueXl3c2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3NzUxMzIsImV4cCI6MjAwNzM1MTEzMn0.0kGlp3tAST3D8iJ9-ce0rJqfVMtEsSpjzVPE1dfOYC4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

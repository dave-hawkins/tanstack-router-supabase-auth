import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xltlddwylyayozjfskpa.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGxkZHd5bHlheW96amZza3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4Mzg3NTksImV4cCI6MjAyMzQxNDc1OX0.ZTJRXlj4vwWDXoZ0fbJkmhYqyy1FVbO3zmXL-u_-bqE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

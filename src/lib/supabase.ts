import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://xltlddwylyayozjfskpa.supabase.co";
// const supabaseAnonKey =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGxkZHd5bHlheW96amZza3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4Mzg3NTksImV4cCI6MjAyMzQxNDc1OX0.ZTJRXlj4vwWDXoZ0fbJkmhYqyy1FVbO3zmXL-u_-bqE";

const supabaseUrl = "https://dcdyqdxkbosadxzhlmwi.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZHlxZHhrYm9zYWR4emhsbXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwNDQ3NTcsImV4cCI6MjAyMzYyMDc1N30.DfuNIyZKTvDVWnF0ClNFPuT-lEcTHh0PswHGUb3OAxY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {});

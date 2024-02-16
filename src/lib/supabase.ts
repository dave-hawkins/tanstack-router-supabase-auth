import { createClient } from "@supabase/supabase-js";

//supabase credentials here

const supabaseUrl = "";
const supabaseAnonKey = "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {});

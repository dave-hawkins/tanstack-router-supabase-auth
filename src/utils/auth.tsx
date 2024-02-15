import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xltlddwylyayozjfskpa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGxkZHd5bHlheW96amZza3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4Mzg3NTksImV4cCI6MjAyMzQxNDc1OX0.ZTJRXlj4vwWDXoZ0fbJkmhYqyy1FVbO3zmXL-u_-bqE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth: Auth = {
  status: "loggedOut",
  username: undefined,
  login: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (data) {
      auth.status = "loggedIn";
      auth.username = "hello world";
    } else if (error) {
      console.error("Login failed:", error.message);
    }
  },
  refreshSession: async () => {
    const { error } = await supabase.auth.refreshSession();
    if (!error) {
      auth.status = "loggedIn";
      auth.username = "hello world"; // Assuming username is set here for demonstration
    } else {
      console.error("Session refresh failed:", error.message);
      throw error;
    }
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      auth.status = "loggedOut";
      auth.username = undefined;
    } else {
      console.error("Logout failed:", error.message);
    }
  },
};

export type Auth = {
  login: () => Promise<void>;
  refreshSession: () => Promise<void>; // Updated signature to match implementation
  logout: () => Promise<void>;
  status: "loggedOut" | "loggedIn";
  username?: string;
};

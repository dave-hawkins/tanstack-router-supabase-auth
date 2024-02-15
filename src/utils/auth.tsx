import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "";
const supabaseAnonKey = "e";

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

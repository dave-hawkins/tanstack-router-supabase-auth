import * as React from "react";
import { supabase } from "./supabase";
import type { Session } from "@supabase/supabase-js";

export type AuthContext = {
	status: "loggedIn" | "loggedOut";
	session: Session | null;
	client: typeof supabase;
	logout: () => Promise<void>;
	login: (provider: "google") => Promise<void>;
};

const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [status, setStatus] =
		React.useState<AuthContext["status"]>("loggedOut");
	const [session, setSession] = React.useState<Session | null>(null);

	const login: AuthContext["login"] = React.useCallback(
		async (provider = "google") => {
			switch (provider) {
				case "google":
				default:
					const { data, error } = await supabase.auth.signInWithOAuth({
						provider: "google",
					});
					// supabase.auth.getSession().then(({ data }) => {});
					// console.log("login with google");
					break;
			}
		},
		[]
	);

	const logout: AuthContext["logout"] = React.useCallback(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Logout failed:", error.message);
			return;
		}
		setStatus("loggedOut");

		/**
		if (!error) {
      auth.status = "loggedOut";
      auth.username = undefined;
    } else {
      console.error("Logout failed:", error.message);
    }
		 */
	}, []);

	React.useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, newSessionState) => {
			setSession(newSessionState);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				client: supabase,
				status,
				logout,
				login,
				session,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

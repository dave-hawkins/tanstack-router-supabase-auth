import * as React from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "./supabase";

export type AuthContext = {
	status: "loggedIn" | "loggedOut";
	session: Session | null;
	client: typeof supabase;
	logout: () => Promise<void>;
	login: (provider: "google", redirectUrl?: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = React.useState<Session | null>(null);
	const status: AuthContext["status"] = session ? "loggedIn" : "loggedOut";

	const login: AuthContext["login"] = React.useCallback(
		async (provider = "google", redirectUrl = "/") => {
			switch (provider) {
				case "google":
				default:
					window.localStorage.setItem("redirectUrl", redirectUrl);

					await supabase.auth.signInWithOAuth({
						provider: "google",
						options: {
							redirectTo: `${window.location.origin}/auth-callback`,
						},
					});
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
		window.location.reload();
	}, []);

	// event listener for auth state changes
	React.useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
		});

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

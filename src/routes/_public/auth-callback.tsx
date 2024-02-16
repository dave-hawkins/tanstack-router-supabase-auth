import { createFileRoute, redirect } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/_public/auth-callback")({
	component: () => <div>Hello /_public/auth-callback!</div>,

	loader: async () => {
		let redirectUrl = "/";

		const localStorageRedirectUrl = window.localStorage.getItem("redirectUrl");
		if (localStorageRedirectUrl) {
			redirectUrl = localStorageRedirectUrl;
			window.localStorage.removeItem("redirectUrl");
		}

		if (redirectUrl.includes("/login")) {
			redirectUrl = "/";
		}

		throw redirect({ to: redirectUrl });
	},
});

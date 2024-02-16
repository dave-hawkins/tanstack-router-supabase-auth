import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/_public/auth-callback")({
	component: () => <div>Hello /_public/auth-callback!</div>,

	loader: async ({ preload, context, navigate }) => {
		if (preload) return;

		let redirectUrl = "/";

		const localStorageRedirectUrl = window.localStorage.getItem("redirectUrl");
		if (localStorageRedirectUrl) {
			redirectUrl = localStorageRedirectUrl;
			window.localStorage.removeItem("redirectUrl");
		}

		await navigate({ to: redirectUrl });

		console.log("loader auth", context.auth);
	},
});

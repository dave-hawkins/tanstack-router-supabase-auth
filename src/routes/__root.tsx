import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { AuthContext } from "../lib/auth";

export const Route = createRootRouteWithContext<{
	auth: AuthContext;
}>()({
	beforeLoad: async ({ context }) => {
		await context.auth.client.auth.initialize();
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className={`min-h-screen flex flex-col`}>
				<Outlet />
			</div>
			<TanStackRouterDevtools position='bottom-right' />
		</>
	);
}

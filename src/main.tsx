import * as React from "react";
import ReactDOM from "react-dom/client";
import {
	RouterProvider,
	ErrorComponent,
	createRouter,
} from "@tanstack/react-router";
import { auth } from "./utils/auth";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	context: {
		auth: undefined!, // We'll inject this when we render
	},
	defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<>
			<RouterProvider
				router={router}
				defaultPreload='intent'
				context={{
					auth,
				}}
			/>
		</>
	);
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}

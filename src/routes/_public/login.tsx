import React from "react";
import { Navigate, createFileRoute, getRouteApi } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../../lib/auth";

export const Route = createFileRoute("/_public/login")({
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	component: LoginComponent,
});

const routeApi = getRouteApi("/_public/login");

function LoginComponent() {
	const search = routeApi.useSearch();
	const auth = useAuth();

	const redirectUrl = search.redirect || "/";

	const loginWithGoogle = async () => {
		await auth.login("google", redirectUrl);
	};

	if (auth.status === "loggedIn") {
		return <Navigate to={redirectUrl} replace={true} />;
	}

	return (
		<div className='p-2 h-screen bg-gray-100 w-full flex flex-col'>
			<div>Please log in.</div>
			<button
				onClick={loginWithGoogle}
				className='text-sm bg-blue-500 text-white border w-max inline-block py-1 px-2 rounded'
			>
				Login with Google
			</button>
		</div>
	);
}

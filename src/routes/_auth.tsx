import * as React from "react";
import {
	Link,
	Outlet,
	createFileRoute,
	redirect,
} from "@tanstack/react-router";
import { useAuth } from "../lib/auth";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context, location }) => {
		if (
			context.auth.status !== "loggedIn" &&
			!window.localStorage.getItem("redirectUrl")
		) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.pathname,
				},
			});
		}
	},
	component: AuthLayout,
});

function AuthLayout() {
	const auth = useAuth();

	return (
		<>
			<div className={`divide-y w-56 border-r`}>
				{(
					[
						["/", "Home"],
						["/profile", "Profile"],
						["/login", "Login"],
					] as const
				).map(([to, label]) => {
					return (
						<div key={to}>
							<Link
								to={to}
								activeOptions={
									{
										// If the route points to the root of it's parent,
										// make sure it's only active if it's exact
										// exact: to === '.',
									}
								}
								preload='intent'
								className={`block py-2 px-3 text-blue-700`}
								activeProps={{ className: `font-bold` }}
							>
								{label}
							</Link>
						</div>
					);
				})}
				<button
					onClick={() => {
						auth.logout().then(() => {
							window.location.reload();
						});
					}}
					className='text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded'
				>
					Log out
				</button>
			</div>
			<Outlet />
		</>
	);
}

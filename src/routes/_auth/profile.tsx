import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth";

export const Route = createFileRoute("/_auth/profile")({
	component: ProfileComponent,
});

function ProfileComponent() {
	const auth = useAuth();

	return (
		<div className='p-2 space-y-2'>
			<div>
				Email:<strong>{auth?.session?.user?.email}</strong>
			</div>
		</div>
	);
}

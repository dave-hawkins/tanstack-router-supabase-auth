import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth";

export const Route = createFileRoute("/_auth/")({
	component: IndexComponent,
});

function IndexComponent() {
	const auth = useAuth();
	return (
		<div className='p-2'>
			<div className='text-lg'>Welcome!</div>
		</div>
	);
}

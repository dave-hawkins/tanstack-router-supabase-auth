import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/policies")({
	component: PoliciesComponent,
});

function PoliciesComponent() {
	const {
		auth: { username },
	} = Route.useRouteContext();

	return (
		<div className='p-2 space-y-2'>
			<div>hey</div>
		</div>
	);
}

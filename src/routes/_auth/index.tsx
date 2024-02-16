import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
	component: IndexComponent,
});

function IndexComponent() {
	return (
		<div className='p-2'>
			<div className='text-lg'>Welcome!</div>
		</div>
	);
}

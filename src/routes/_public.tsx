import * as React from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
	component: () => <Outlet />,
});

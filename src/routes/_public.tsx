import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Component } from "react";

export const Route = createFileRoute("/_public")({
  component: () => <Outlet />,
});

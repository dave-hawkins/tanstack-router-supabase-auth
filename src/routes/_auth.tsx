import * as React from "react";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "../utils/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.status === "loggedOut") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: () => <Outlet />,
});

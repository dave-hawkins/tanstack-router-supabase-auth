import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Auth } from "../utils/auth";

export const Route = createRootRouteWithContext<{
  auth: Auth;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  const { auth, status } = Route.useRouteContext({
    select: ({ auth }) => ({ auth, status: auth.status }),
  });
  return (
    <>
      <div className={`min-h-screen flex flex-col`}>
        <div className={`flex-1 flex`}>
          {auth.status === "loggedIn" && (
            <div className={`divide-y w-56 border-r`}>
              {(
                [
                  ["/", "Home"],
                  ["/profile", "Profile"],
                  ["/login", "Login"],
                  ["/policies", "Policies"],
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
                      preload="intent"
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
                  auth.logout();
                  router.invalidate();
                }}
                className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
              >
                Log out
              </button>
            </div>
          )}

          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

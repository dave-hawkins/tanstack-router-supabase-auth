import React from "react"; // Ensure this import is at the top of your file

import { useEffect, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "../utils/auth";
import LoginButton from "../components/login-button";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: listenerData } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        console.log("Auth state changed. Logged in:", !!session);
        if (session) {
          navigateToRedirectUrl();
        }
      }
    );

    return () => {
      listenerData.subscription.unsubscribe();
    };
  }, []);

  const navigateToRedirectUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectParam = queryParams.get("redirect");
    let redirectUrl = redirectParam
      ? decodeURIComponent(redirectParam)
      : "/profile";
    const hashIndex = redirectUrl.indexOf("#");
    if (hashIndex > -1) {
      redirectUrl = redirectUrl.substring(0, hashIndex);
    }
    router.history.push(redirectUrl);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signIn({
      provider: "google",
    });
    if (error) console.error("Login error:", error.message);
  };

  return session?.user ? (
    <div>
      Logged in as <strong>{session.user.email}</strong>
      <button
        onClick={() => supabase.auth.signOut()}
        className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
      >
        Log out
      </button>
    </div>
  ) : (
    <div className="p-2 h-screen bg-gray-100 w-full flex flex-col">
      <div>Please log in.</div>
      <LoginButton onClick={loginWithGoogle} />
    </div>
  );
}

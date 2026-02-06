"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="17">
    <g fill="none" fillRule="evenodd">
      <path
        d="M13.448 7.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11 3.11 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944"
        fill="#4285F4"
      />
      <path
        d="M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.728 6.728 0 0 0 6.01 3.703"
        fill="#34A853"
      />
      <path
        d="M3.212 8.267a4.034 4.034 0 0 1 0-2.572V3.964H.978A6.678 6.678 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017l2.234-1.731z"
        fill="#FABB05"
      />
      <path
        d="M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.728 6.728 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774"
        fill="#E94235"
      />
    </g>
  </svg>
);

export default function SystemLogin() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "checking" | "denied">("idle");
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null);

  const checkAccess = async () => {
    setStatus("checking");

    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email?.toLowerCase() ?? null;

    if (!email) {
      setStatus("idle");
      return;
    }

    // Check system_admins table (RLS policy allows selecting only own row)
    const { data, error } = await supabase
      .from("system_admins")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error || !data?.email) {
      // Not allowed
      setDeniedEmail(email);
      await supabase.auth.signOut();
      setStatus("denied");
      return;
    }

    // Allowed
    setDeniedEmail(null);
    navigate("/system", { replace: true });
  };

  useEffect(() => {
    // On page load or after OAuth return, Supabase may already have processed the URL.
    void checkAccess();

    const { data: sub } = supabase.auth.onAuthStateChange((_event) => {
      // After sign-in completes, re-check
      void checkAccess();
    });

    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithGoogle = async () => {
    setDeniedEmail(null);
    setStatus("checking");

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Always return to this same page (works for dev now, prod later)
        redirectTo: `${window.location.origin}/system/login`,
        queryParams: { prompt: "select_account" },
      },
    });
  };

  if (status === "checking") {
    return (
      <main className="min-h-screen grid place-items-center bg-background px-6">
        <p className="text-sm text-muted-foreground">Checking access…</p>
      </main>
    );
  }

  if (status === "denied") {
    return (
      <main className="min-h-screen grid place-items-center bg-background px-6">
        <div className="w-full max-w-md rounded-xl border p-6 text-center">
          <h1 className="text-lg font-semibold text-red-600">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This Google account is not authorized to access the system.
          </p>
          {deniedEmail ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Signed in as <span className="font-mono">{deniedEmail}</span>
            </p>
          ) : null}
          <button
            onClick={signInWithGoogle}
            className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
          >
            <GoogleIcon />
            Sign in with a different Google account
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center bg-background px-6">
      <button
        onClick={signInWithGoogle}
        className="inline-flex items-center justify-center gap-3 rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
      >
        <GoogleIcon />
        Sign in with Google
      </button>
    </main>
  );
}

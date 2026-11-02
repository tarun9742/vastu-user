"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";

export default function AdminRedirectPage() {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3002";

  useEffect(() => {
    // If running in browser, redirect directly to admin workspace
    if (typeof window !== "undefined") {
      window.location.href = adminUrl;
    }
  }, [adminUrl]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-950">
          <ShieldCheck size={28} />
        </div>
        <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight">Admin Workspace</h1>
        <p className="mt-2 text-xs text-zinc-400">
          Administrator panel has been separated into its dedicated project running at{" "}
          <span className="font-mono text-zinc-200">{adminUrl}</span>.
        </p>
        <a
          href={adminUrl}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition"
        >
          <span>Open Admin Dashboard</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

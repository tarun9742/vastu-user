"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function verifyAdmin() {
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
        const response = await fetch(`${apiBase}/api/auth/me`, { credentials: "include", cache: "no-store" });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result?.data?.role !== "admin") {
          router.replace("/");
          return;
        }
        if (!cancelled) setAuthChecked(true);
      } catch {
        router.replace("/");
      }
    }
    verifyAdmin();
    return () => { cancelled = true; };
  }, [router]);

  if (!authChecked) {
    return <div className="min-h-screen bg-zinc-50" aria-label="Checking administrator access" />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-h-screen lg:pl-[270px]">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</div>
        <footer className="border-t border-zinc-200 bg-white px-5 py-5 text-center text-xs text-zinc-500 lg:ml-0">
          © {new Date().getFullYear()} Bhuwneshwari Scientific Vastu · Master Admin
        </footer>
      </div>
    </div>
  );
}

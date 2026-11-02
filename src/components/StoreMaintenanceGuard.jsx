"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";
import { Wrench, Clock, ShieldCheck, Mail, Phone, Lock, Sparkles, MessageCircle } from "lucide-react";

export default function StoreMaintenanceGuard({ children }) {
  const [settings, setSettings] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");

    function verifyUser(cfg) {
      const u = getCurrentUser();
      const adminMobile = cfg?.security?.adminMobile || "8690708302";
      const cleanPhone = String(u?.phone || "").replace(/\D/g, "");
      const isAdm = u?.role === "admin" || (cleanPhone && cleanPhone.endsWith(adminMobile.slice(-10)));
      setIsAdmin(Boolean(isAdm));
    }

    fetch(`${apiBase}/api/settings`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && res.data) {
          setSettings(res.data);
          verifyUser(res.data);
        }
      })
      .catch((err) => console.error("Settings load error:", err))
      .finally(() => setChecked(true));

    const onAuthChange = () => {
      verifyUser(settings);
    };

    window.addEventListener("bsv-auth-updated", onAuthChange);
    return () => window.removeEventListener("bsv-auth-updated", onAuthChange);
  }, []);

  const maintenance = settings?.maintenance;
  const isMaintenanceActive = Boolean(maintenance?.enabled);

  if (isMaintenanceActive && !isAdmin && checked) {
    const message = maintenance.message || "We are improving our store. Please check back soon.";
    const estimatedReturn = maintenance.showEstimatedReturn ? maintenance.estimatedReturn : null;
    const supportEmail = settings?.general?.supportEmail || "support@example.com";
    const supportPhone = settings?.general?.supportPhone || "+91 8690708302";
    const whatsapp = settings?.general?.contactWhatsapp || "918690708302";

    return (
      <div className="min-h-screen bg-[#faf7f0] flex flex-col justify-between text-[#382b20]">
        {/* Top bar */}
        <header className="border-b border-[#eadecf] bg-white/80 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#8e571e] to-[#b77b32] text-white shadow-md">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="font-serif text-sm font-bold tracking-tight text-[#382b20]">
                  {settings?.general?.storeName || "Bhuwneshwari Scientific Vastu"}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#a16c2a]">
                  Scientific Vastu Consultation
                </p>
              </div>
            </div>

            <button
              onClick={() => openLoginPopup()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#d6c4aa] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#8e571e] hover:bg-[#faf4e8]"
            >
              <Lock size={13} />
              <span>Admin Access</span>
            </button>
          </div>
        </header>

        {/* Hero Card */}
        <main className="mx-auto my-auto max-w-xl px-5 py-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100/70 text-amber-900 shadow-sm border border-amber-200">
            <Wrench size={38} className="stroke-[1.8]" />
          </div>

          <span className="mt-6 inline-block rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-200 uppercase tracking-widest">
            Scheduled Harmonization & Maintenance
          </span>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#382b20] sm:text-4xl">
            We Will Be Back Soon
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#6d5b46] sm:text-base">
            {message}
          </p>

          {estimatedReturn && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#eadfce] bg-white px-5 py-3 text-xs font-bold text-[#8e571e] shadow-sm">
              <Clock size={16} />
              <span>Estimated Return: {estimatedReturn}</span>
            </div>
          )}

          {/* Contact help */}
          <div className="mt-8 rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm text-xs">
            <p className="font-semibold text-[#493827]">Need Urgent Vastu Consultation or Order Support?</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Hello%20Bhuwneshwari%20Vastu,%20I%20need%20urgent%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white shadow hover:bg-emerald-700"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 font-semibold text-zinc-800 hover:bg-zinc-100"
              >
                <Mail size={14} />
                <span>{supportEmail}</span>
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#eadecf] py-4 text-center text-xs text-[#8c7a65]">
          © {new Date().getFullYear()} {settings?.general?.storeName || "Bhuwneshwari Scientific Vastu"}. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <>
      {isMaintenanceActive && isAdmin && (
        <div className="bg-amber-900 text-amber-100 text-xs py-2 px-4 text-center font-semibold sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md">
          <Wrench size={14} />
          <span>Store Maintenance Mode is currently ACTIVE. Public visitors see maintenance screen. (Admin view bypass active)</span>
        </div>
      )}
      {children}
    </>
  );
}

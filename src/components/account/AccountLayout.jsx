"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: "▦" },
  { label: "My Orders", href: "/orders", icon: "▤" },
  { label: "NGO Donations", href: "/my-donations", icon: "🕊️" },
  { label: "My Profile", href: "/profile", icon: "♙" },
];

export default function AccountLayout({ title, subtitle, user, children }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#faf7f0] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#35251a] via-[#68451f] to-[#a36d2d] p-6 text-white shadow-xl sm:p-9"
        >
          <div className="relative z-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f1d5a5]">
              Bhuwneshwari Scientific Vastu
            </p>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              {subtitle}
            </p>
            <p className="mt-4 text-sm text-[#f7dfb6]">
              Welcome back, {user?.name || "Valued Customer"}
            </p>
          </div>

          <div className="pointer-events-none relative">
            <div className="absolute -right-4 -top-36 h-52 w-52 rounded-full border border-white/15 sm:-right-8 sm:-top-44 sm:h-64 sm:w-64" />
            <div className="absolute -right-1 -top-28 h-36 w-36 rounded-full border border-white/15 sm:-right-1 sm:-top-36 sm:h-48 sm:w-48" />
          </div>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-[#eadfce] bg-white p-4 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#faf4e8] p-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e6c68e] to-[#a56b27] font-serif text-xl font-bold text-white">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#382b20]">
                  {user?.name || "My Account"}
                </p>
                <p className="truncate text-xs text-[#8b7a66]">
                  {user?.email || user?.mobile || "Customer"}
                </p>
              </div>
            </div>

            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a47a42]">
              Account menu
            </p>

            <nav className="space-y-1">
              {links.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-gradient-to-r from-[#8e571e] to-[#b77b32] text-white shadow-md"
                        : "text-[#62513e] hover:bg-[#f8f0e3] hover:text-[#8e571e]"
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.label}
                    {active && <span className="ml-auto">›</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 border-t border-[#eee4d5] pt-4">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#d9bd8e] px-4 py-3 text-sm font-semibold text-[#8e571e] transition hover:bg-[#faf4e8]"
              >
                Explore Vastu Products <span>→</span>
              </Link>
            </div>
          </motion.aside>

          <motion.section
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0"
          >
            {children}
          </motion.section>
        </div>
      </div>
    </main>
  );
}

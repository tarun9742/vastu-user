"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CalendarDays,
  GraduationCap,
  FileText,
  Settings,
  MessageSquare,
  CreditCard,
  Heart,
  ChevronLeft,
  Sparkles,
  X,
  ShieldCheck,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Due Payments", href: "/admin/due-payments", icon: CreditCard },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Consultations", href: "/admin/consultations", icon: CalendarDays },
  { label: "Training", href: "/admin/training", icon: GraduationCap },
  { label: "Tickets & Inquiries", href: "/admin/tickets", icon: MessageSquare },
  { label: "NGO Donations", href: "/admin/donations", icon: Heart },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ mobileOpen = false, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : 0 }}
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-100 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-[78px] items-center justify-between border-b border-zinc-800/80 px-5">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-zinc-950 shadow-md">
              <Sparkles size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <p className="font-serif text-sm font-bold tracking-tight text-white">
                BHUWSNESHWARI
              </p>
              <p className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-zinc-400">
                ADMIN PANEL
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pb-2 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Workspace
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {menu.map((item, index) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.025 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "bg-white text-zinc-950 font-bold shadow-md shadow-black/20"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.3 : 1.8}
                    className={active ? "text-zinc-950" : "text-zinc-400 group-hover:text-white"}
                  />
                  <span>{item.label}</span>
                  {active && (
                    <ChevronLeft
                      size={16}
                      className="ml-auto rotate-180 text-zinc-950"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="m-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4">
          <div className="mb-2 flex items-center gap-2 text-zinc-100">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="text-xs font-bold">Live System</span>
          </div>
          <p className="text-xs leading-5 text-zinc-400">
            Connected to live database and PayU payment infrastructure.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse" />
            <span className="text-[11px] font-semibold text-zinc-300">
              Operational
            </span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell, ExternalLink } from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between gap-3 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-xl border border-zinc-200 p-2.5 text-zinc-700 transition hover:bg-zinc-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="text-xs font-medium text-zinc-500">Workspace / Overview</p>
          <h2 className="mt-0.5 truncate font-serif text-lg font-bold text-zinc-900">
            Admin Dashboard
          </h2>
        </div>
        <h2 className="truncate font-serif text-base font-bold text-zinc-900 sm:hidden">
          Admin Panel
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 md:flex lg:w-64 focus-within:border-zinc-400 focus-within:bg-white transition">
          <Search size={16} className="shrink-0 text-zinc-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search dashboard..."
            className="w-full bg-transparent text-xs text-zinc-900 outline-none placeholder:text-zinc-400"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          title="Live Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2 border-l border-zinc-200 pl-3 sm:pl-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white shadow-sm">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-zinc-900">Administrator</p>
            <p className="mt-0.5 text-[10px] font-medium text-zinc-500">Master Access</p>
          </div>
        </div>

        <Link
          href="/"
          title="View storefront"
          aria-label="View storefront"
          className="hidden h-10 w-10 place-items-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 sm:grid"
        >
          <ExternalLink size={17} />
        </Link>
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { openLoginPopup, getCurrentUser, logoutUser } from "@/lib/auth";
import Image from "next/image";

const navigation = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Home Page", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Our Services",
    href: "/services",
    children: [
      { label: "Residential Vastu", href: "/services/residential-vastu" },
      { label: "Commercial Vastu", href: "/services/commercial-vastu" },
      { label: "Industrial Vastu", href: "/services/industrial-vastu" },
      { label: "Site Visit", href: "/services/site-visit" },
      {
        label: "Vastu for Single Person",
        href: "/services/vastu-for-single-person",
      },
    ],
  },
  {
    label: "Vastu Products",
    href: "/products",
    children: [{ label: "All Products", href: "/products" }],
  },
  { label: "Training & Classes", href: "/training" },
  { label: "NGO Donation", href: "/donation" },
  { label: "Contact Us", href: "/contact" },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/settings`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if ((data?.general?.announcementEnabled || data?.appearance?.showAnnouncementBar) && data?.general?.announcementText) {
            setAnnouncement(data.general.announcementText);
          }
        }
      } catch {}
    }
    loadSettings();
  }, []);

  function handleLogout() {
    logoutUser();
    setCurrentUser(null);
    setAccountOpen(false);
    setMobileOpen(false);
    window.location.href = "/";
  }

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getCurrentUser());
    };

    syncUser();

    window.addEventListener("bsv-auth-updated", syncUser);

    return () => {
      window.removeEventListener("bsv-auth-updated", syncUser);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  function isActive(item) {
    if (item.href === "/") return pathname === "/";
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  return (
    <header className="sticky top-0 z-[100] w-full">
      {announcement && (
        <div className="bg-[#b47a2d] px-4 py-2 text-center text-xs font-semibold tracking-wide text-white shadow-inner sm:text-sm">
          {announcement}
        </div>
      )}
      {/* Top contact bar */}
      <div className=" block border-b border-[#e9dfce] bg-[#f8f4ec]">
        <div className="mx-auto flex max-w-[1500px] flex-col px-4 sm:px-6 lg:px-8">
          {/* Contact information */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2 text-[12px] font-medium text-[#46392c] sm:gap-x-6 sm:text-sm lg:justify-start lg:py-2.5">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jaipur+Rajasthan+India"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-[#a66b26]"
            >
              <span className="text-base text-[#a66b26]">📍</span>
              <span>Jaipur, Rajasthan, India</span>
            </a>

            <a
              href="tel:+919928383192"
              className="flex items-center gap-2 transition hover:text-[#a66b26]"
            >
              <span className="text-base text-[#a66b26]">☎</span>
              <span>+91 99283 83192</span>
            </a>

            <a
              href="mailto:bhuwneshwarscientificvastu@gmail.com"
              className="hidden md:flex items-center gap-2 transition hover:text-[#a66b26]"
            >
              <span className="text-base text-[#a66b26]">✉</span>
              <span className="break-all">
                bhuwneshwarscientificvastu@gmail.com
              </span>
            </a>
          </div>

          {/* Social links and appointment */}
          <div className="hidden md:flex items-center justify-center gap-4 border-t border-[#e9dfce] py-2 lg:absolute lg:right-8 lg:top-0 lg:h-[45px] lg:border-0 lg:py-0">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-lg font-bold text-white transition hover:scale-110"
            >
              ◎
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid h-7 w-7 place-items-center rounded-full bg-[#e62117] text-sm text-white transition hover:scale-110"
            >
              ▶
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-7 w-7 place-items-center rounded-full bg-[#1877f2] text-base font-bold text-white transition hover:scale-110"
            >
              f
            </a>

            <Link
              href="/appointment"
              className="hidden md:flex min-h-6 items-center gap-2 rounded-md bg-gradient-to-r from-[#8e571e] to-[#ad762f] px-4 py-1 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 sm:text-sm"
            >
              <span>▦</span>
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
      {/* Desktop navigation */}
      <div className="hidden border-b border-[#e9dfce] bg-white/95 backdrop-blur-xl md:block">
        <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between gap-6 px-6 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Bhuwneshwari Scientific Vastu home"
            className="group flex w-40 shrink-0 items-center sm:w-48"
          >
            <Image
              src="/assets/logo1.png"
              width={1600}
              height={400}
              alt="Bhuwneshwari Scientific Vastu"
              priority
              className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 160px, 192px"
            />
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="Main navigation"
            className="flex h-full items-center gap-1 lg:gap-2"
          >
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative flex h-full items-center"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.label}
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === item.label ? null : item.label,
                        )
                      }
                      className={`relative flex items-center gap-1 whitespace-nowrap px-2 py-3 text-[11px] font-semibold transition-colors lg:px-2.5 lg:text-sm ${
                        isActive(item) || openDropdown === item.label
                          ? "text-[#9c6120]"
                          : "text-[#342c25] hover:text-[#9c6120]"
                      }`}
                    >
                      {item.label}
                      <motion.span
                        animate={{
                          rotate: openDropdown === item.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-[10px]"
                      >
                        ▾
                      </motion.span>

                      {isActive(item) && (
                        <span className="absolute bottom-1 left-2 right-2 h-[2px] rounded-full bg-[#a96b20]" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-0 top-[calc(100%-2px)] w-64 overflow-hidden rounded-xl border border-[#eadcc5] bg-[#fffdf8] p-2 shadow-[0_16px_40px_rgba(48,31,14,0.15)]"
                        >
                          <div className="mb-1 border-b border-[#eee3d2] px-3 py-2">
                            <p className="font-serif text-sm font-bold text-[#8f5b20]">
                              {item.label}
                            </p>
                          </div>

                          {item.children.map((child, index) => (
                            <motion.div
                              key={child.href}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.035,
                                duration: 0.2,
                              }}
                            >
                              <Link
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs transition-colors ${
                                  isActive(child)
                                    ? "bg-[#f5ead6] font-semibold text-[#995d1b]"
                                    : "text-[#504337] hover:bg-[#f8f0e3] hover:text-[#995d1b]"
                                }`}
                              >
                                {child.label}
                                <span className="text-[#b18443]">→</span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`relative whitespace-nowrap px-2 py-3 text-[11px] font-semibold transition-colors lg:px-2.5 lg:text-sm ${
                      isActive(item)
                        ? "text-[#9c6120]"
                        : "text-[#342c25] hover:text-[#9c6120]"
                    }`}
                  >
                    {item.label}

                    {isActive(item) && (
                      <motion.span
                        layoutId="desktop-nav-underline"
                        className="absolute bottom-1 left-2 right-2 h-[2px] rounded-full bg-[#a96b20]"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}

            <div className="relative shrink-0">
              {currentUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((open) => !open)}
                    aria-expanded={accountOpen}
                    className="flex items-center gap-2 cursor-pointer rounded-xl border border-[#eadcc5] bg-[#fffaf0] px-3 py-2.5 text-xs font-semibold text-[#87541d] transition hover:bg-[#f5ead6]"
                  >
                    <span className="max-w-[100px] truncate">My Account</span>
                    <span>▾</span>
                  </button>

                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full z-[150] mt-3 w-56 overflow-hidden rounded-2xl border border-[#eadcc5] bg-[#fffdf8] p-2 shadow-xl"
                      >
                        <div className="border-b border-[#eee3d2] px-3 py-3">
                          <p className="truncate text-sm font-bold text-[#382d22]">
                            {currentUser.name || "Welcome"}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#887967]">
                            {currentUser.email || currentUser.mobile || ""}
                          </p>
                        </div>

                        {[
                          { label: "My Profile", href: "/profile", icon: "♙" },
                          { label: "My Orders", href: "/orders", icon: "▤" },
                          { label: "Dashboard", href: "/dashboard", icon: "▦" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#504337] transition hover:bg-[#f8f0e3] hover:text-[#995d1b]"
                          >
                            <span className="text-base text-[#a56b27]">
                              {item.icon}
                            </span>
                            {item.label}
                          </Link>
                        ))}

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center gap-3 rounded-xl border-t border-[#eee3d2] px-3 py-3 text-left text-sm font-semibold text-[#9b382d] transition hover:bg-red-50"
                        >
                          <span>↪</span>
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openLoginPopup("/")}
                  className="inline-flex items-center gap-2 rounded-full cursor-pointer bg-gradient-to-r from-[#955a1e] to-[#b77b32] px-4 py-2 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile header: logo + hamburger only */}
      <div className="border-b border-[#e9dfce] bg-white/95 backdrop-blur-xl md:hidden">
        <div className="flex h-[72px] items-center justify-between px-4">
          <Link
            href="/"
            aria-label="Bhuwneshwari Scientific Vastu home"
            className="flex items-center gap-2"
          >
             <Image src="/assets/logo1.png" alt="logo" width={150} height={60}/>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadcc5] bg-[#fffaf0] text-[#87541d] transition hover:bg-[#f3e5cc]"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="h-[2px] w-5 rounded-full bg-current" />
              <span className="h-[2px] w-5 rounded-full bg-current" />
              <span className="h-[2px] w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile backdrop + right-to-left sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[110] cursor-default bg-black/50 backdrop-blur-[3px] md:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 z-[99999] flex w-[min(88vw,380px)] flex-col border-l border-[#e9d8b9] bg-[#fffdf8] shadow-2xl md:hidden"
            >
              {/* Sidebar top */}
              <div className="flex items-center justify-between border-b border-[#eee3d2] bg-gradient-to-r from-[#fff9ec] to-white p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#a96b20] bg-[#f5e4bf] font-serif text-3xl font-bold text-[#8e1c13]">
                    B
                  </span>
                  <div>
                    <p className="font-serif text-sm font-bold text-[#951f17]">
                      BHUWNSHWARI
                    </p>
                    <p className="text-[9px] font-bold tracking-[0.14em] text-[#966024]">
                      SCIENTIFIC VASTU
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#eadcc5] text-2xl text-[#87541d] transition hover:bg-[#f5ead6]"
                >
                  ×
                </button>
              </div>

              {/* Sidebar links */}
              <nav
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto px-4 py-5"
              >
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a67b40]">
                  Explore
                </p>

                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.045, duration: 0.25 }}
                    >
                      {item.children ? (
                        <div className="overflow-hidden rounded-xl">
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className={`flex-1 px-3 py-3.5 text-sm font-medium ${
                                isActive(item)
                                  ? "text-[#9b6120]"
                                  : "text-[#382d22]"
                              }`}
                            >
                              {item.label}
                            </Link>

                            <button
                              type="button"
                              aria-label={`Toggle ${item.label} submenu`}
                              aria-expanded={mobileSubmenu === item.label}
                              onClick={() =>
                                setMobileSubmenu((current) =>
                                  current === item.label ? null : item.label,
                                )
                              }
                              className="mr-2 grid h-9 w-9 place-items-center rounded-lg text-[#a96b20] transition hover:bg-[#f5ead6]"
                            >
                              <motion.span
                                animate={{
                                  rotate:
                                    mobileSubmenu === item.label ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                ▾
                              </motion.span>
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {mobileSubmenu === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="mb-2 ml-3 border-l-2 border-[#d6b276] pl-3">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className={`block rounded-lg px-3 py-3 text-[13px] transition hover:bg-[#f5ead6] ${
                                        isActive(child)
                                          ? "font-semibold text-[#9b6120]"
                                          : "text-[#6d5a46]"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition hover:bg-[#f8f0e3] ${
                            isActive(item)
                              ? "bg-[#f5ead6] text-[#9b6120]"
                              : "text-[#382d22]"
                          }`}
                        >
                          {item.label}
                          <span className="text-[#b18443]">→</span>
                        </Link>
                      )}

                      <div className="mx-3 border-b border-[#f0e8dc]" />
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Sidebar CTA */}
              <div className="border-t border-[#eadcc5] bg-[#fbf5e9] p-5">
                <p className="mb-3 text-xs leading-5 text-[#766552]">
                  Need expert guidance for your space?
                </p>

                <Link
                  href="/appointment"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#955a1e] to-[#b77b32] px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                >
                  ▦ Book an Appointment <span>→</span>
                </Link>

                <a
                  href="tel:+919928383192"
                  className="mt-3 flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#8f5b20]"
                >
                  ☎ +91 99283 83192
                </a>
              </div>
              {currentUser ? (
                <div className="mt-4 rounded-xl border border-[#eadcc5] bg-white p-3">
                  <p className="mb-2 truncate text-sm font-bold text-[#382d22]">
                    Welcome, {currentUser.name || "User"}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-[#f8f0e3] px-3 py-3 text-center text-xs font-semibold text-[#87541d]"
                    >
                      Profile
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-[#f8f0e3] px-3 py-3 text-center text-xs font-semibold text-[#87541d]"
                    >
                      My Orders
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-[#f8f0e3] px-3 py-3 text-center text-xs font-semibold text-[#87541d]"
                    >
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-lg bg-red-50 px-3 py-3 text-xs font-semibold text-red-700"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openLoginPopup(pathname);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#955a1e] to-[#b77b32] px-4 py-3.5 text-sm font-semibold text-white shadow-lg"
                >
                  ♙ Login to Your Account →
                </button>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

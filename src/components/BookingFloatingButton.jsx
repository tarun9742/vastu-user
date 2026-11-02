"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function BookingFloatingButton() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function checkSetting() {
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/settings`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data?.appearance?.showFloatingBookNow === false) {
            setVisible(false);
          }
        }
      } catch {
        // keep visible by default
      }
    }
    checkSetting();
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed right-0 top-1/2 z-[90] -translate-y-1/2"
    >
      <Link
        href="/appointment"
        aria-label="Book a Vastu consultation now"
        className="group relative flex items-center gap-2 overflow-hidden rounded-l-2xl border border-r-0 border-white/40 bg-gradient-to-b from-[#bd8736] via-[#a86b20] to-[#844b12] px-3 py-4 text-white shadow-[-5px_8px_28px_rgba(95,55,13,0.25)] transition-all duration-300 hover:px-5 hover:shadow-[-8px_10px_35px_rgba(95,55,13,0.35)] sm:gap-3 sm:px-4 sm:py-5 animate-pulse-glow"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent opacity-70" />

        <motion.span
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-xl sm:text-2xl"
        >
          ▦
        </motion.span>

        <span className="relative flex flex-col">
          <span className="whitespace-nowrap text-xs font-bold sm:text-sm">
            Book Now
          </span>
          <span className="hidden whitespace-nowrap text-[10px] text-white/80 sm:block">
            Vastu Consultation
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

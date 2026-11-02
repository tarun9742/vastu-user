"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCartCount } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";

export default function FloatingCart() {
  const [count, setCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      setCount(getCartCount());
      setPulse(true);
      window.setTimeout(() => setPulse(false), 350);
    };

    updateCount();

    window.addEventListener("bsv-cart-updated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("bsv-cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label={`Open shopping cart, ${count} items`}
        aria-haspopup="dialog"
        aria-expanded={drawerOpen}
        className="group fixed bottom-6 right-5 z-[99] flex h-[62px] w-[62px] items-center justify-center rounded-full border border-white/30 bg-[#211b17]/90 text-[#f5d99a] shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-[#39291e] sm:bottom-8 sm:right-8 sm:h-[68px] sm:w-[68px]"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        <AnimatePresence>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: pulse ? [1, 1.25, 1] : 1,
                opacity: 1,
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute -right-1 -top-1 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-[#211b17] bg-[#d9ad59] px-1.5 text-xs font-bold text-[#211b17]"
            >
              {count > 99 ? "99+" : count}
            </motion.span>
          )}
        </AnimatePresence>

        <span className="pointer-events-none absolute right-[76px] whitespace-nowrap rounded-lg bg-[#211b17]/95 px-3 py-2 text-xs text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
          View cart
        </span>
      </motion.button>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

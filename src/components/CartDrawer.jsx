"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getCart, getCartCount, saveCart } from "@/lib/cart";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(price) || 0);

export default function CartDrawer({ open, onClose }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  const syncCart = useCallback(() => {
    setCart(getCart());
    setReady(true);
  }, []);

  useEffect(() => {
    syncCart();

    window.addEventListener("bsv-cart-updated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("bsv-cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, [syncCart]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  function updateQuantity(slug, amount) {
    const updated = cart.map((item) =>
      item.slug === slug
        ? {
            ...item,
            quantity: Math.max(1, (Number(item.quantity) || 1) + amount),
          }
        : item,
    );

    setCart(updated);
    saveCart(updated);
  }

  function removeItem(slug) {
    const updated = cart.filter((item) => item.slug !== slug);
    setCart(updated);
    saveCart(updated);
  }

  const itemCount = cart.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0,
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) * Math.max(0, Number(item.quantity) || 0),
    0,
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close shopping cart"
            className="fixed inset-0 z-[109] cursor-default bg-black/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="fixed inset-y-0 right-0 z-[110] flex h-dvh w-full max-w-[460px] flex-col border-l border-white/40 bg-[#faf8f3] text-[#2b241d] shadow-[-20px_0_70px_rgba(0,0,0,0.22)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#ded6c8] px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b783e]">
                  Your selection
                </p>
                <h2
                  id="cart-drawer-title"
                  className="mt-1 text-2xl font-semibold tracking-tight"
                >
                  Shopping Cart
                  <span className="ml-2 text-base font-normal text-[#8b8174]">
                    ({getSafeCount(cart)})
                  </span>
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0d8cb] text-2xl transition hover:bg-[#eee7db]"
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {!ready ? (
                <p className="py-10 text-center text-sm text-[#74695c]">
                  Loading your cart…
                </p>
              ) : cart.length === 0 ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#e6ddce] bg-white text-[#a17d40]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="h-9 w-9"
                      aria-hidden="true"
                    >
                      <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" />
                      <circle cx="10" cy="20" r="1" />
                      <circle cx="19" cy="20" r="1" />
                    </svg>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    Your cart is waiting
                  </h3>
                  <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#74695c]">
                    Discover meaningful Vastu essentials for your space.
                  </p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="mt-6 rounded-full bg-[#292119] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#59432d]"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.article
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="flex gap-4 border-b border-[#e6dfd4] pb-5"
                      >
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={onClose}
                          className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eee8dd]"
                        >
                          {item.image ? (
                            <div
                              role="img"
                              aria-label={item.name}
                              className="h-full w-full bg-cover bg-center transition duration-500 hover:scale-105"
                              style={{
                                backgroundImage: `url("${item.image}")`,
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-[#857867]">
                              No image
                            </div>
                          )}
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={onClose}
                            className="line-clamp-2 text-sm font-semibold leading-5 hover:text-[#98733a]"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-base font-semibold text-[#8d6a32]">
                            {formatPrice(item.price)}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                            <div className="flex h-9 items-center rounded-full border border-[#ded5c7] bg-white">
                              <button
                                type="button"
                                aria-label={`Decrease ${item.name} quantity`}
                                disabled={Number(item.quantity) <= 1}
                                onClick={() => updateQuantity(item.slug, -1)}
                                className="h-9 w-9 rounded-full text-lg transition hover:bg-[#eee7db] disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                −
                              </button>

                              <span className="min-w-6 text-center text-sm font-medium tabular-nums">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                aria-label={`Increase ${item.name} quantity`}
                                onClick={() => updateQuantity(item.slug, 1)}
                                className="h-9 w-9 rounded-full text-lg transition hover:bg-[#eee7db]"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.slug)}
                              className="text-xs font-medium text-[#8b7561] underline underline-offset-4 transition hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#ded6c8] bg-white/75 px-5 pb-6 pt-5 sm:px-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#74695c]">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="text-xl font-semibold tracking-tight">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#817668]">
                  Shipping, taxes, and any applicable charges are calculated at
                  checkout.
                </p>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#292119] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#292119]/10 transition hover:-translate-y-0.5 hover:bg-[#59432d]"
                >
                  Proceed to Checkout
                  <span aria-hidden="true">→</span>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full py-2 text-center text-sm font-medium text-[#74695c] transition hover:text-[#292119]"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function getSafeCount(items) {
  return items.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0,
  );
}

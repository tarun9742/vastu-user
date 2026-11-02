"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, saveCart } from "@/lib/cart";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(price) || 0);

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setCart(getCart());
      setReady(true);
    };
    sync();
    window.addEventListener("bsv-cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bsv-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  function removeItem(id) {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
    setCart(updated);
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeItem(id);
    const updated = cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
    saveCart(updated);
    setCart(updated);
  }

  if (!ready) {
    return <div className="min-h-[50vh] p-8 text-center text-sm text-[#796c5c]">Loading your cart...</div>;
  }

  return (
    <main className="min-h-[70vh] bg-[#fcfaf5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-bold text-[#302116] mb-6">Shopping Cart</h1>

        {!cart.length ? (
          <div className="rounded-2xl border border-[#ecdcc3] bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-[#796c5c] mb-4">Your cart is currently empty.</p>
            <Link
              href="/products"
              className="inline-flex rounded-xl bg-[#21150c] px-6 py-3 text-xs font-bold text-white hover:bg-[#382416] transition"
            >
              Explore Products →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#ecdcc3] bg-white p-4 shadow-sm"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded-xl object-cover border border-gray-100"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[#302116] truncate">{item.title}</h3>
                    <p className="text-xs text-[#a56b27] font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, (item.quantity || 1) - 1)}
                        className="h-6 w-6 rounded border border-gray-300 text-xs flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold px-1">{item.quantity || 1}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, (item.quantity || 1) + 1)}
                        className="h-6 w-6 rounded border border-gray-300 text-xs flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-600 hover:text-red-800 p-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#ecdcc3] bg-white p-6 shadow-sm h-fit space-y-4">
              <h2 className="text-base font-bold text-[#302116]">Order Summary</h2>
              <div className="flex justify-between text-sm text-[#796c5c]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#302116]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#796c5c]">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-700">Calculated at checkout</span>
              </div>
              <div className="border-t border-[#ecdcc3] pt-4 flex justify-between font-bold text-base text-[#302116]">
                <span>Estimated Total</span>
                <span className="text-[#a56b27]">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#21150c] hover:bg-[#382416] py-3.5 text-xs font-bold text-white shadow-md transition"
              >
                Proceed to Checkout →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

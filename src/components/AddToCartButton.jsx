"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { addToCart } from "@/lib/cart";

export default function AddToCartButton({
  product,
  className = "",
  compact = false,
}) {
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const reduceMotion = useReducedMotion();

  function handleAdd(event) {
    // Prevent a product-card link from navigating when the button is clicked.
    event.preventDefault();
    event.stopPropagation();

    try {
      addToCart(
        {
          id: product.id || product.slug,
          slug: product.slug,
          name: product.name || product.title,
          price: Number(product.price) || 0,
          images: product.images || [product.image || product.imageUrl || ""],
          image: product.image || product.imageUrl || "",
        },
        1,
      );

      setAdded(true);
      setError(false);
      window.setTimeout(() => setAdded(false), 1800);
    } catch {
      setError(true);
      setAdded(false);
      window.setTimeout(() => setError(false), 2500);
    }
  }

  return (
    <div className="relative min-w-0">
      <motion.button
        type="button"
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        onClick={handleAdd}
        className={`flex cursor-pointer w-full items-center text-black justify-center gap-2 rounded-full border px-4 font-semibold transition-colors duration-200 ${
          compact ? "min-h-8 text-xs" : "min-h-12 text-sm"
        } ${
          added
            ? "border-emerald-700 bg-emerald-700 text-black"
            : "border-[#30271e] bg-[#30271e] text-black hover:border-[#59432d] hover:bg-[#59432d]"
        } ${className}`}
      >
        {added ? <>Added to Cart</> : <>Add to Cart</>}
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-700"
          >
            Couldn't add this item. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

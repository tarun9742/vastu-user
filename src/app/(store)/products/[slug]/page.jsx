"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { addToCart } from "@/lib/cart";

const fallbackCatalogue = {
  "7-chakra-energy-globe": {
    id: 1,
    name: "7 Chakra Energy Globe",
    category: "Energy Globes",
    price: 7500,
    oldPrice: 8500,
    sku: "BSV-EG-001",
    stock: "Confirm availability",
    description: "A decorative chakra-inspired globe for your home, office, or personal collection.",
    features: [
      "Chakra-inspired decorative design",
      "Suitable for home or office display",
      "Ask about dimensions and materials",
      "Confirm specifications before ordering",
    ],
    specifications: [
      ["Product Type", "Energy Globe"],
      ["Brand", "Bhuwneshwari Scientific Vastu"],
    ],
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=90",
    ],
  },
};

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

function Reveal({ children, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const reduceMotion = useReducedMotion();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/products/${slug}`, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json?.success && json?.data) {
            const d = json.data;
            const normalizedImages = (d.images && d.images.length > 0)
              ? d.images.map((img) => (typeof img === "string" ? img : img.url)).filter(Boolean)
              : ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=90"];

            const normalizedSpecs = Array.isArray(d.specifications) && d.specifications.length > 0
              ? d.specifications.map((s) => [s.label || "Feature", s.value || ""])
              : [
                  ["Category", d.category || "Vastu Remedies"],
                  ["Stock Status", d.stock > 0 ? "In Stock" : "Available on Request"],
                  ["Currency", d.currency || "INR"],
                ];

            const normalizedFeatures = Array.isArray(d.tags) && d.tags.length > 0
              ? d.tags.map((t) => `Purified and energized for ${t}`)
              : [
                  "Authentic Vastu Consecration",
                  "High Vibrational Vedic Frequency",
                  "100% Genuine Energized Materials",
                  "Safe Dispatch within 24-48 Hours",
                ];

            if (!cancelled) {
              setProduct({
                id: d._id,
                slug: d.slug,
                name: d.title,
                category: d.category || "Vastu Remedies",
                price: d.salePrice || d.regularPrice || 0,
                oldPrice: (d.salePrice && d.regularPrice && d.regularPrice > d.salePrice) ? d.regularPrice : null,
                sku: d.sku || "BSV-PRD",
                stock: d.stock > 0 ? `In Stock (${d.stock} units available)` : "In Stock - Consecrated on Order",
                description: d.description || d.shortDescription || "Authentic energized Vastu remedy crafted for optimal spatial harmony.",
                features: normalizedFeatures,
                specifications: normalizedSpecs,
                images: normalizedImages,
              });
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch product from live API, falling back:", err);
      }

      // Fallback
      if (!cancelled) {
        setProduct(fallbackCatalogue[slug] || null);
        setLoading(false);
      }
    }

    loadProduct();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#fcfaf5] px-5">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#b17a34] border-t-transparent" />
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7b68]">
            Loading Product Details...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#fcfaf5] px-5">
        <div className="max-w-md text-center">
          <span className="text-5xl text-[#b17a34]">◇</span>
          <h1 className="mt-4 font-serif text-3xl font-bold">
            Product not found
          </h1>
          <p className="mt-3 text-base leading-7 text-[#796c5c]">
            This product may have moved or is not in our current catalogue.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-[#a56b27] px-6 py-3.5 text-base font-bold text-white hover:bg-[#89551f]"
          >
            Shop All Products →
          </Link>
        </div>
      </main>
    );
  }

  function handleAddToCart() {
    try {
      addToCart(
        {
          id: product.id,
          slug,
          name: product.name,
          price: product.price,
          images: product.images,
          image: product.images?.[0] || "",
        },
        quantity,
      );

      setCartMessage(`${product.name} added to your cart.`);
      setCartCount((c) => c + quantity);
    } catch {
      setCartMessage("Couldn't update your cart. Please try again.");
    }
  }

  const checkoutHref = `/checkout?product=${encodeURIComponent(
    slug,
  )}&quantity=${quantity}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfaf5] text-[#302116]">
      {/* BREADCRUMB */}
      <div className="border-b border-[#eee4d4] bg-white px-4 py-4 sm:px-7 lg:px-12">
        <nav className="mx-auto flex max-w-[1450px] flex-wrap items-center gap-2 text-sm text-[#8b7b68]">
          <Link href="/" className="hover:text-[#a56b27]">
            Home
          </Link>
          <span>›</span>
          <Link href="/products" className="hover:text-[#a56b27]">
            Vastu Products
          </Link>
          <span>›</span>
          <span className="font-semibold text-[#a56b27]">{product.name}</span>
        </nav>
      </div>

      {/* MAIN PRODUCT */}
      <section className="px-3 py-6 sm:px-6 sm:py-9 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-7 lg:grid-cols-2 lg:gap-12">
          {/* IMAGE GALLERY */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <div className="rounded-2xl border border-[#e8decd] bg-white p-2.5 shadow-sm sm:p-3">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f1e9dc] sm:aspect-[1.05/0.92]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.images[activeImage] || activeImage}
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url("${product.images[activeImage] || product.images[0]}")`,
                      backgroundColor: "#fffdf9",
                    }}
                    role="img"
                    aria-label={`${product.name}, image ${activeImage + 1}`}
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

                {product.oldPrice && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#a56b27] px-4 py-2 text-xs font-bold text-white shadow">
                    SPECIAL OFFER
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setWishlisted((current) => !current)}
                  aria-pressed={wishlisted}
                  aria-label={wishlisted ? "Remove wishlist" : "Add wishlist"}
                  className={`absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/90 text-2xl shadow-md backdrop-blur transition hover:scale-105 ${
                    wishlisted ? "text-red-600" : "text-[#725b3f]"
                  }`}
                >
                  {wishlisted ? "♥" : "♡"}
                </button>

                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage(
                          (activeImage - 1 + product.images.length) %
                            product.images.length,
                        )
                      }
                      aria-label="Previous product image"
                      className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/90 text-2xl shadow transition hover:bg-white"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage((activeImage + 1) % product.images.length)
                      }
                      aria-label="Next product image"
                      className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/90 text-2xl shadow transition hover:bg-white"
                    >
                      ›
                    </button>

                    <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                      {activeImage + 1} / {product.images.length}
                    </span>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              {product.images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-2.5">
                  {product.images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View product image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
                        activeImage === index
                          ? "border-[#a56b27] ring-2 ring-[#a56b27]/15"
                          : "border-transparent hover:border-[#d9c4a1]"
                      }`}
                    >
                      <span
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat p-1"
                        style={{ backgroundImage: `url("${image}")` }}
                      />
                      {activeImage === index && (
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-[#a56b27]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                ["◇", "Product Guidance"],
                ["▤", "100% Genuine"],
                ["⌖", "Secure Packaging"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#eee4d4] bg-white px-2 py-3 text-center sm:py-4"
                >
                  <span className="text-2xl text-[#a56b27]">{icon}</span>
                  <p className="mt-1.5 text-xs font-semibold leading-5 text-[#796c5c] sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PRODUCT DETAILS */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="min-w-0"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a56b27]">
              {product.category}
            </p>

            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#302116]">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#796c5c]">
              <span>Product SKU: <span className="font-mono font-medium text-zinc-900">{product.sku}</span></span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-[#e9dfce] pb-5">
              <span className="font-serif text-4xl font-bold text-[#9b4d25]">
                {money(product.price)}
              </span>

              {product.oldPrice && (
                <>
                  <span className="text-lg text-[#9b8e7c] line-through">
                    {money(product.oldPrice)}
                  </span>
                  <span className="rounded-md bg-[#e6f3df] px-3 py-1.5 text-xs font-bold text-[#39733a]">
                    SAVE {money(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-base leading-8 text-[#6f604e]">
              {product.description}
            </p>

            {/* AVAILABILITY */}
            <div className="mt-5 rounded-xl border border-[#e8dcc7] bg-[#fff8ec] p-4 sm:p-5">
              <p className="text-base font-bold text-[#4c3a27]">Stock & Delivery</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#796c5c]">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                {product.stock}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#897866]">
                Consecrated under Vedic guidance. Packaged securely with sacred care and dispatched within 24 to 48 hours.
              </p>
            </div>

            {/* QUANTITY */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-base font-bold">Quantity</p>
                <p className="mt-1 text-sm text-[#897866]">
                  Select the quantity you need
                </p>
              </div>

              <div className="flex items-center overflow-hidden rounded-xl border border-[#dfd0b8] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="grid h-12 w-12 place-items-center text-2xl transition hover:bg-[#fff4df] disabled:opacity-40"
                >
                  −
                </button>

                <span
                  aria-live="polite"
                  className="min-w-12 text-center text-base font-bold"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.min(99, value + 1))
                  }
                  disabled={quantity >= 99}
                  aria-label="Increase quantity"
                  className="grid h-12 w-12 place-items-center text-2xl transition hover:bg-[#fff4df] disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            {/* SUBTOTAL */}
            <div className="mt-5 rounded-xl bg-[#f5eddf] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-[#796c5c]">Subtotal</span>
                <span className="text-xl font-bold text-[#302116]">
                  {money(product.price * quantity)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#897866]">
                Free delivery on orders above ₹1,999.
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-[#a56b27] bg-white px-4 py-4 text-base font-bold text-[#8b5a24] transition hover:bg-[#fff4df]"
              >
                <span aria-hidden="true">🛒</span>
                Add to Cart
              </button>

              <Link
                href={checkoutHref}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-4 py-4 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Buy Now
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* CART FEEDBACK */}
            {cartMessage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="mt-4 rounded-xl border border-[#c9dfbc] bg-[#f0f8e9] p-4 text-sm leading-6 text-[#35652e]"
              >
                <p className="font-semibold">{cartMessage}</p>
                <Link
                  href="/cart"
                  className="mt-1 inline-flex items-center gap-2 font-bold underline underline-offset-4"
                >
                  View Cart ({cartCount}) →
                </Link>
              </motion.div>
            )}

            <Link
              href="/products"
              className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#e8dcc7] px-4 py-3 text-base font-semibold text-[#796c5c] transition hover:border-[#c8a36d] hover:text-[#8b5a24]"
            >
              ← Continue Shopping
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT INFORMATION */}
      <section className="px-3 pb-9 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px] rounded-2xl border border-[#e9dfce] bg-white p-4 shadow-sm sm:p-7">
          <div className="flex flex-wrap gap-2 border-b border-[#eee4d4] pb-4">
            {[
              ["description", "Description"],
              ["features", "Key Features & Energization"],
              ["specifications", "Specifications"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
                  activeTab === key
                    ? "bg-[#a56b27] text-white"
                    : "bg-[#f8f2e8] text-[#796c5c] hover:bg-[#f1e3cd]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="pt-6"
            >
              {activeTab === "description" && (
                <div className="max-w-4xl">
                  <h2 className="font-serif text-2xl font-bold">
                    About {product.name}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-[#796c5c]">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <h2 className="font-serif text-2xl font-bold">
                    Product Highlights
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={`${feature}-${idx}`}
                        className="flex items-start gap-3 rounded-xl bg-[#fcf8f0] p-4 text-base leading-7 text-[#6f604e]"
                      >
                        <span className="mt-1 font-bold text-[#a56b27]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h2 className="font-serif text-2xl font-bold">
                    Product Specifications
                  </h2>

                  <div className="mt-5 overflow-hidden rounded-xl border border-[#eee4d4]">
                    {product.specifications.map(([label, value], index) => (
                      <div
                        key={`${label}-${index}`}
                        className={`grid grid-cols-[0.8fr_1.2fr] gap-4 px-4 py-4 text-sm sm:grid-cols-2 sm:px-5 ${
                          index % 2 === 0 ? "bg-[#fcf8f0]" : "bg-white"
                        }`}
                      >
                        <span className="font-semibold text-[#6f604e]">
                          {label}
                        </span>
                        <span className="leading-6 text-[#897866]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

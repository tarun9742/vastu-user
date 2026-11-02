"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";

const categories = [
  {
    id: "all",
    name: "All Products",
    icon: "✺",
    description: "Complete catalogue of energized Vastu products.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Oils & Sprays",
    name: "Oils & Sprays",
    icon: "♧",
    description: "Sacred vibrational mists and essential roll-ons.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Navagraha Remedies",
    name: "Navagraha Remedies",
    icon: "◉",
    description: "Astrological 9-planet balancing sprays and roll-ons.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Pyramids & Yantras",
    name: "Pyramids & Yantras",
    icon: "△",
    description: "Vastu Purusha plates, sacred frames & Ashoka pillars.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Vastu Rods & Neutralizers",
    name: "Vastu Rods",
    icon: "╫",
    description: "Solid brass boundary neutralizer rods.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Purification & Salts",
    name: "Purification & Salts",
    icon: "✧",
    description: "Bhimseni camphor, 7-chakra bath salts & dosh powder.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Aura & Quantum Healing",
    name: "Quantum & Aura",
    icon: "▣",
    description: "Quantum energy bio-defense and BrainPWR blends.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "Protective Strips",
    name: "Protective Strips",
    icon: "⬡",
    description: "Door, kitchen, and toilet dosh barrier boxes.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85",
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

function Reveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({
  product,
  isWishlisted,
  onWishlist,
  reduceMotion,
}) {
  return (
    <motion.article
      layout
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e9dfce] bg-white shadow-[0_3px_12px_rgba(55,37,16,0.04)] transition-all hover:shadow-xl"
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[1/1] overflow-hidden bg-white p-3 border-b border-[#f3ebde]"
      >
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url("${product.image}")` }}
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-[#fffaf0]/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#9a6426] shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}

        {product.oldPrice && product.oldPrice > product.price && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
            Save ₹{product.oldPrice - product.price}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#a56b27]">
          {product.category}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-[#3c2b1c] transition-colors hover:text-[#a56b27] sm:text-sm"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-base font-bold text-[#9a4d26] sm:text-lg">
            {money(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-[#9b8e7c] line-through">
              {money(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <AddToCartButton
            product={product}
            compact
            className="rounded-xl border border-[#d9c4a1] bg-white px-2 py-2 text-[11px] font-bold text-[#83531f] transition hover:bg-[#fff4df]"
          />
          <Link
            href={`/checkout?product=${encodeURIComponent(product.slug)}&quantity=1`}
            className="rounded-xl bg-gradient-to-r from-[#a56b27] to-[#bd8236] px-2 py-2 text-center text-[11px] font-bold text-white transition hover:brightness-110 flex items-center justify-center"
          >
            Buy Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => onWishlist(product.id)}
          aria-pressed={isWishlisted}
          className={`mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium transition ${
            isWishlisted
              ? "text-red-600"
              : "text-[#897866] hover:text-red-600"
          }`}
        >
          <span className="text-xs">{isWishlisted ? "♥" : "♡"}</span>
          <span>{isWishlisted ? "In Wishlist" : "Save to Wishlist"}</span>
        </button>
      </div>
    </motion.article>
  );
}

export default function ProductsPage() {
  const reduceMotion = useReducedMotion();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchLiveProducts() {
      setLoading(true);
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/products?limit=100`, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json?.success && Array.isArray(json?.data)) {
            const mapped = json.data.map((p) => ({
              id: p._id,
              slug: p.slug,
              name: p.title,
              category: p.category || "Vastu Remedies",
              price: p.salePrice || p.regularPrice || 0,
              oldPrice: (p.salePrice && p.regularPrice && p.regularPrice > p.salePrice) ? p.regularPrice : null,
              image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85",
              badge: p.featured ? "Popular" : "",
              description: p.shortDescription || p.description || "",
              stock: p.stock,
              stockStatus: p.stockStatus,
            }));
            if (!cancelled) {
              setProducts(mapped);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
      }
      if (!cancelled) setLoading(false);
    }

    fetchLiveProducts();
    return () => { cancelled = true; };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, search, sort]);

  function toggleWishlist(id) {
    const alreadySaved = wishlist.includes(id);
    setWishlist((current) =>
      alreadySaved ? current.filter((item) => item !== id) : [...current, id],
    );
    setNotice(alreadySaved ? "Removed from wishlist." : "Added to wishlist.");
    setTimeout(() => setNotice(""), 2000);
  }

  return (
    <main className="min-h-screen bg-[#fcfaf5] text-[#302116]">
      {/* HERO SECTION */}
      <section className="hidden md:block relative overflow-hidden bg-[#241a11] px-4 py-14 text-white sm:px-8 sm:py-20 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#b47a2d_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e0b777]">
            Sacred Vastu Essentials
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#fffaf0] sm:text-5xl lg:text-6xl">
            Energized Vastu Products
          </h1>
          <p className="mt-4 max-w-2xl text-xs leading-6 text-[#f3eedf]/80 sm:text-sm sm:leading-7">
            Explore authentic, consecrated remedies, planetary sprays, sacred yantras, and non-destructive Vastu harmonizers crafted to revitalize your home and workspace.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#b47a2d]/40 bg-white/5 px-4 py-1.5 text-xs text-[#f1d7a3]">
              {products.length} Consecrated Products
            </span>
            <span className="rounded-full border border-[#b47a2d]/40 bg-white/5 px-4 py-1.5 text-xs text-[#f1d7a3]">
              100% Genuine Vedic Energization
            </span>
            <span className="rounded-full border border-[#b47a2d]/40 bg-white/5 px-4 py-1.5 text-xs text-[#f1d7a3]">
              Free Shipping Over ₹1,999
            </span>
          </div>
        </div>
      </section>

      {/* NOTICE TOAST */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-zinc-900 px-5 py-3 text-xs font-medium text-white shadow-2xl">
          {notice}
        </div>
      )}

      {/* MAIN CATALOG */}
      <section className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 sm:py-12">
        {/* CATEGORY SELECTOR CAROUSEL/TABS */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                  isSelected
                    ? "border-[#a56b27] bg-[#a56b27] text-white shadow-sm"
                    : "border-[#e6dbcc] bg-white text-[#635341] hover:border-[#b4874b] hover:bg-[#fffcf7]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* SEARCH AND SORT BAR */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#ede3d5] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, remedy, or keyword..."
              className="w-full rounded-xl border border-[#dfd2c0] bg-[#fbf9f4] px-4 py-2.5 text-xs text-[#302116] outline-none transition focus:border-[#a56b27] focus:bg-white"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-[#796c5c]">Sort By:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-[#dfd2c0] bg-white px-3 py-2 text-xs font-medium text-[#302116] outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="grid min-h-[400px] place-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#a56b27] border-t-transparent" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7b68]">
                Loading Live Products...
              </p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-[#ede3d5] bg-white py-16 text-center">
            <span className="text-4xl text-[#b47a2d]">◇</span>
            <h3 className="mt-3 font-serif text-xl font-bold text-[#302116]">No products found</h3>
            <p className="mt-1 text-xs text-[#897866]">Try adjusting your search query or selecting a different category.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearch(""); }}
              className="mt-4 rounded-xl bg-[#a56b27] px-4 py-2 text-xs font-bold text-white hover:bg-[#8d581c]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between text-xs text-[#897866]">
              <span>Showing <strong>{filteredProducts.length}</strong> live products</span>
              <span>100% In Stock</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id || prod.slug}
                  product={prod}
                  isWishlisted={wishlist.includes(prod.id)}
                  onWishlist={toggleWishlist}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

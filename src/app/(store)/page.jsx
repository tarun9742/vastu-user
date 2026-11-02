"use client";

import { useState, useEffect } from "react";
import { addToCart as addGlobalCart } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "../../components/Header";

const typewriterWords = [
  "Build a Better Life.",
  "Harmonious Living & Work.",
  "Scientific Spatial Energy.",
  "Attract Peace & Prosperity.",
  "Traditional Wisdom, Modern Science.",
];

function useTypewriter(words, speed = 50, eraseSpeed = 15, delay = 300) {
  const [text, setText] = useState(words[0]); 
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const current = words[wordIdx % words.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(current.substring(0, text.length - 1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        }
      }, eraseSpeed);
    } else {
      timer = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
        if (text.length === current.length) {
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIdx, words, speed, eraseSpeed, delay]);

  return text;
}

const services = [
  {
    title: "Residential Vastu",
    description:
      "Create a harmonious and positive home environment with personalized Vastu guidance.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    icon: "⌂",
    features: [
      "Home Vastu Consultation",
      "Plan Analysis & Corrections",
      "Remedies & Enhancements",
      "On-Site / Online Consultation",
    ],
    href: "/services/residential-vastu",
  },
  {
    title: "Commercial Vastu",
    description:
      "Enhance business growth, productivity, and prosperity with thoughtful workspace planning.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85",
    icon: "▥",
    features: [
      "Office & Retail Vastu",
      "Business Growth Solutions",
      "Workspace Energy Balancing",
      "On-Site / Online Consultation",
    ],
    href: "/services/commercial-vastu",
  },
  {
    title: "Industrial Vastu",
    description:
      "Improve industrial layouts and optimize space planning for factories and production facilities.",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=85",
    icon: "⚒",
    features: [
      "Factory & Industrial Vastu",
      "Production Layout Guidance",
      "Energy Flow Optimization",
      "Practical Recommendations",
    ],
    href: "/services/industrial-vastu",
  },
  {
    title: "Site Visit (On Location)",
    description:
      "Receive an on-site property assessment with practical, space-specific recommendations.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
    icon: "⌖",
    features: [
      "Detailed Site Inspection",
      "Practical On-Ground Solutions",
      "Remedies & Recommendations",
      "Residential & Commercial Sites",
    ],
    href: "/services/site-visit",
  },
  {
    title: "Vastu for Single Person",
    description:
      "Get personalized Vastu guidance for your home, office, or individual living space.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    icon: "♙",
    features: [
      "Digital Report (Photo / Video)",
      "Online or Office Consultation",
      "Personalized Recommendations",
      "Practical & Easy Remedies",
    ],
    href: "/services/personal-vastu",
  },
];

const categories = [
  {
    title: "Energy Globes",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Vastu Machines",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Oils & Sprays",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Vastu Remedies",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=85",
  },
  {
    title: "Pyramids & Yantras",
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=600&q=85",
  },
];

const products = [
  {
    id: 1,
    name: "7 Chakra Energy Globe",
    price: 7500,
    category: "Energy Globes",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=85",
    tag: "POPULAR",
  },
  {
    id: 2,
    name: "Vastu Analysis Machine",
    price: 175000,
    category: "Vastu Machines",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=85",
    tag: "PREMIUM",
  },
  {
    id: 3,
    name: "Energy Cleanse Oil",
    price: 1200,
    category: "Oils & Sprays",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85",
    tag: "",
  },
  {
    id: 4,
    name: "Vastu Pyramid Set",
    price: 2800,
    category: "Vastu Remedies",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=85",
    tag: "FEATURED",
  },
];

const benefits = [
  {
    icon: "✦",
    title: "Experienced Guidance",
    description: "Personalized consultation for different property needs.",
  },
  {
    icon: "⌂",
    title: "Multiple Property Types",
    description: "Explore residential, commercial, and industrial services.",
  },
  {
    icon: "◇",
    title: "Practical Recommendations",
    description: "Discuss options suited to your property requirements.",
  },
  {
    icon: "◎",
    title: "Personalized Support",
    description: "Find a consultation option that suits your needs.",
  },
];

const steps = [
  {
    number: "01",
    title: "Share Your Requirements",
    description: "Tell us about your property and goals.",
  },
  {
    number: "02",
    title: "Provide Property Details",
    description: "Share the relevant location and property information.",
  },
  {
    number: "03",
    title: "Schedule a Consultation",
    description: "Discuss an appropriate date and time.",
  },
  {
    number: "04",
    title: "Receive Your Guidance",
    description: "Discuss observations and recommendations.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a86e21] sm:text-xs">
          {eyebrow}
        </p>
        <h2
          className={`max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? "text-[#fff7e9]" : "text-[#29251e]"
          }`}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={`max-w-md text-sm leading-7 ${
            dark ? "text-white/65" : "text-[#777166]"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Photo({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

function Price({ amount }) {
  return (
    <>
      ₹
      {amount.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}
    </>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [liveProducts, setLiveProducts] = useState([]);
  const typewriterText = useTypewriter(typewriterWords);

  useEffect(() => {
    let cancelled = false;
    async function loadFeatured() {
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || '').replace(/\/$/, '');
        const res = await fetch(`${apiBase}/api/products?limit=8`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json?.success && Array.isArray(json?.data) && json.data.length > 0) {
            const mapped = json.data.map((p) => ({
              id: p._id,
              slug: p.slug,
              name: p.title,
              category: p.category || 'Vastu Remedies',
              price: p.salePrice || p.regularPrice || 0,
              image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85',
              tag: p.featured ? 'POPULAR' : '',
            }));
            if (!cancelled) setLiveProducts(mapped);
          }
        }
      } catch (err) {
        console.error('Home products fetch failed:', err);
      }
    }
    loadFeatured();
    return () => { cancelled = true; };
  }, []);


  

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  function handleAddToCart(product) {
    if (!product) return;
    const key = product.slug || product.id;
    setCart((current) => ({
      ...current,
      [key]: (current[key] || 0) + 1,
    }));
    try {
      addGlobalCart(
        {
          id: product.id || product.slug,
          slug: product.slug,
          name: product.name,
          price: Number(product.price) || 0,
          images: [product.image || ""],
          image: product.image || "",
        },
        1,
      );
    } catch (e) {
      console.error("Cart error:", e);
    }
  }

  function addToCart(item) {
    if (typeof item === "object" && item !== null) {
      handleAddToCart(item);
    } else {
      setCart((current) => ({
        ...current,
        [item]: (current[item] || 0) + 1,
      }));
    }
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="overflow-hidden bg-[#fbf8f1] text-[#29251e]">
      {/* HERO */}
      <section className="pb-0 relative">
        <div className="relative mx-auto min-h-[640px] overflow-hidden bg-[#21180e] sm:min-h-[680px] lg:min-h-[740px]">
          <Photo
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary luxury home and landscaped surroundings"
            priority
            sizes="100vw"
            className="object-cover"
          />

          <motion.div
            initial={reduceMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-[#17140f]/95 via-[#21180e]/75 to-[#21180e]/20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17140f]/60 via-transparent to-black/20" />

          {/* Continuous Rotating Sacred Geometry Compass Watermark */}
          <div className="pointer-events-none absolute right-4 lg:right-24 top-1/2 -translate-y-1/2 opacity-25 hidden md:block">
            <svg
              className="animate-spin-slow w-[420px] h-[420px] lg:w-[540px] lg:h-[540px] text-[#f5d48c]"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="100" cy="100" r="92" strokeWidth="0.8" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="74" strokeWidth="1.2" />
              <circle cx="100" cy="100" r="54" strokeWidth="0.8" />
              <polygon points="100,12 122,78 188,100 122,122 100,188 78,122 12,100 78,78" strokeWidth="1.2" />
              <polygon points="100,32 114,86 168,100 114,114 100,168 86,114 32,100 86,86" strokeWidth="0.8" opacity="0.6" />
              <circle cx="100" cy="100" r="14" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>

          {/* Top-Right Floating Pill Badge */}
          <div className="animate-float-slow absolute top-24 right-10 hidden xl:flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#c78b37]/35 text-xl text-[#f3c875]">✦</span>
            <div>
              <p className="text-xs font-bold text-white tracking-wide">Scientific Vastu Architecture</p>
              <p className="text-[11px] text-[#f3c875]">15,000+ Properties Harmonized</p>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={stagger}
            className="relative z-10 flex min-h-[640px] items-center px-6 py-16 sm:min-h-[680px] sm:px-12 lg:min-h-[740px] lg:px-20"
          >
            <div className="max-w-3xl">
              {/* Live Availability Pill with Pulsing Beacon */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#d8b36d]/45 bg-black/40 px-4 py-2 text-xs font-semibold text-[#f2d79b] backdrop-blur-md shadow-lg"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Ar. Kuldeep Swami Available for Consultations</span>
                <span className="text-[#e2bd73] font-bold">✦</span>
              </motion.div>

              {/* Typewriter Animated Main Title */}
              <motion.h1
                variants={fadeUp}
                className="mt-6 font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] tracking-tight text-white"
              >
                <span className="block text-white/95">Balance Energy.</span>
                <span className="inline-block bg-gradient-to-r from-[#ffd885] via-[#f3c875] to-[#c78b37] bg-clip-text text-transparent">
                  {typewriterText}
                </span> 
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 font-normal"
              >
                Experience verified scientific Vastu consultations and energized spatial remedies for your home, commercial enterprise, and industrial architecture.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3.5 sm:flex-row"
              >
                <Link
                  href="/appointment"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#b57a2d] px-8 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#c68b3d] hover:shadow-2xl animate-pulse-glow"
                >
                  <span>Book Consultation Online</span>
                  <span className="transition-transform group-hover:translate-x-1 font-bold">
                    →
                  </span>
                </Link>

                <Link
                  href="/products"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/35 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Explore Products <span>↗</span>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-7"
              >
                {[
                  ["Personalized", "Scientific Guidance"],
                  ["Commercial", "Growth & Stability"],
                  ["Industrial", "Energy Balancing"],
                ].map(([title, subtitle]) => (
                  <div key={title} className="group">
                    <p className="text-base sm:text-xl font-bold text-[#edcd8a] group-hover:text-white transition">
                      {title}
                    </p>
                    <p className="mt-1 text-[11px] text-white/70">
                      {subtitle}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <div
            className="animate-float-reverse absolute bottom-9 right-8 hidden max-w-[240px] rounded-2xl border border-white/25 bg-black/40 p-5 text-white shadow-2xl backdrop-blur-xl xl:block"
          >
            <span className="text-3xl text-[#e9c47f]">✧</span>
            <p className="mt-2 text-lg font-bold text-white">Thoughtful Spaces.</p>
            <p className="mt-1 text-xs leading-5 text-white/75">
              Directional alignment engineered for peace, health, and prosperity.
            </p>
          </div>
        </div>

        {/* CONTINUOUS SEAMLESS MARQUEE BANNER */}
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#21150c] via-[#332011] to-[#21150c] py-3 border-y border-[#d4a757]/30 shadow-md">
          <div className="animate-marquee whitespace-nowrap text-xs font-bold tracking-widest text-[#f5d99b] uppercase flex items-center gap-8">
            <span>✦ 100% Scientific Directional Corrections</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Non-Destructive Vastu Remedies</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Ar. Kuldeep Swami (Bhuwneshwari Vastu)</span>
            <span className="text-[#a5702b]">✦</span>
            <span>15,000+ Harmonized Properties</span>
            <span className="text-[#a5702b]">✦</span>
            <span>On-Site Compass & Energy Rod Scans</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Residential, Commercial & Industrial</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Online Video & In-Person Sessions</span>
            <span className="text-[#a5702b]">✦</span>
            {/* Seamless duplicate for loop */}
            <span>✦ 100% Scientific Directional Corrections</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Non-Destructive Vastu Remedies</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Ar. Kuldeep Swami (Bhuwneshwari Vastu)</span>
            <span className="text-[#a5702b]">✦</span>
            <span>15,000+ Harmonized Properties</span>
            <span className="text-[#a5702b]">✦</span>
            <span>On-Site Compass & Energy Rod Scans</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Residential, Commercial & Industrial</span>
            <span className="text-[#a5702b]">✦</span>
            <span>Online Video & In-Person Sessions</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section
        id="services"
        className="relative overflow-hidden bg-[#faf7ef] px-4 py-16 sm:px-8 sm:py-20 lg:px-8"
      >
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#c49a58]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8e5c2b]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px]">
          <SectionHeading
            eyebrow="Personalized Vastu Solutions"
            title="A Better Space for Every Purpose"
            description="Expert guidance for homes, businesses, industrial spaces, and personalized Vastu consultations."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8ddc9] bg-[#fffdf8] shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Service image */}
                <div className="relative h-48 overflow-hidden bg-[#e9e0d0] sm:h-44">
                  <Photo
                    src={service.image}
                    alt={service.title}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#21170e]/50 via-transparent to-transparent" />

                  {/* Gold icon */}
                  <motion.span
                    whileHover={
                      reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    className={`absolute bottom-3 left-4 grid h-12 w-12 place-items-center rounded-full border border-[#fff7e8]/80 bg-[#fff6e2]/95 font-serif text-2xl text-[#956326] shadow-lg backdrop-blur-md ${
                      index % 2 === 0 ? "animate-float-slow" : "animate-float-reverse"
                    }`}
                  >
                    {service.icon}
                  </motion.span>

                  <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5d99b] backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Vastu Care
                  </span>
                </div>

                {/* Service details */}
                <div className="flex flex-1 flex-col p-4 sm:p-4">
                  <h3 className="font-serif text-xl font-semibold leading-snug text-[#382719]">
                    {service.title}
                  </h3>

                  <p className="mt-2 min-h-[60px] text-[13px] leading-[1.7] text-[#796c5c]">
                    {service.description}
                  </p>

                  {/* Feature list: use service.features when available */}
                  <ul className="mb-5 mt-3 space-y-2.5">
                    {(
                      service.features || [
                        "Personalized Vastu Guidance",
                        "Practical Recommendations",
                        "Space & Layout Analysis",
                        "Expert Consultation",
                      ]
                    ).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[11px] leading-relaxed text-[#574939] sm:text-xs"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#a87332] text-[9px] text-white">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto border-t border-[#eee4d3] pt-4">
                    <Link
                      href={service.href}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#956027] to-[#b47c37] px-3 py-3 text-sm font-semibold text-white shadow-md shadow-[#956027]/15 transition-all duration-300 hover:from-[#78491f] hover:to-[#956027] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58a4a] focus-visible:ring-offset-2"
                    >
                      Know More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Consultation information strip */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#e6d8c0] bg-white/75 p-5 shadow-sm backdrop-blur-md sm:flex-row sm:px-7"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3e5c9] text-2xl text-[#956326]">
                ☎
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#382719]">
                  Not sure which service you need?
                </h3>
                <p className="mt-1 text-sm text-[#796c5c]">
                  Let us help you choose the right Vastu consultation.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#a87332]/40 px-5 py-3 text-sm font-semibold text-[#8e5c2b] transition-all hover:bg-[#a87332] hover:text-white"
            >
              Talk to Our Experts <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      {/* <section className="border-y border-[#e9dfcd] bg-[#f2ebdd] px-4 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="Explore the Collection"
            title="Shop by Category"
            description="Browse the categories and discover products for your shopping needs."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {categories.map((category, index) => (
              <motion.article
                key={category.title}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="group rounded-2xl border border-white/80 bg-[#fffdf8] p-3 shadow-sm transition-shadow hover:shadow-lg sm:p-4"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(category.title)}`}
                >
                  <div className="relative aspect-[4/4.5] overflow-hidden rounded-xl bg-[#eee4d2]">
                    <Photo
                      src={category.image}
                      alt={category.title}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-1 pb-1 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ae792f]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-serif text-lg leading-snug sm:text-xl">
                      {category.title}
                    </h3>
                    <p className="mt-4 text-sm font-semibold text-[#98621d]">
                      Explore <span className="ml-1">↗</span>
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* FEATURED PRODUCTS */}
      <section className="px-4 py-6 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="The Curated Collection"
            title="Featured Vastu Products"
            description="Discover our featured products and explore the wider collection."
          />

          <motion.div
          
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
          >
            {(liveProducts.length > 0 ? liveProducts : products).map((product) => {
              const prodKey = product.slug || product.id;
              const saved = wishlist.includes(prodKey);
              const quantity = cart[prodKey] || 0;

              return (
                <motion.article
                  key={prodKey}
                  variants={fadeUp}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="group overflow-hidden rounded-[20px] border border-[#eae2d4] bg-white transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/4.3] overflow-hidden bg-[#f0e9dc]">
                    <Photo
                      src={product.image}
                      alt={product.name}
                      sizes="(max-width: 768px) 48vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {product.tag && (
                      <span className="animate-float-slow absolute left-3 top-3 rounded-full bg-[#3a2a19]/90 border border-[#f5dba6]/30 px-3 py-1.5 text-[9px] font-bold tracking-wider text-[#f5dba6] shadow-md">
                        ✦ {product.tag}
                      </span>
                    )}

                    <motion.button
                      type="button"
                      whileTap={reduceMotion ? undefined : { scale: 0.85 }}
                      onClick={() => toggleWishlist(prodKey)}
                      aria-label={
                        saved ? "Remove from wishlist" : "Add to wishlist"
                      }
                      aria-pressed={saved}
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-xl text-[#8d5c25] shadow-sm backdrop-blur"
                    >
                      {saved ? "♥" : "♡"}
                    </motion.button>
                  </div>

                  <div className="p-3 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a87a39]">
                      {product.category}
                    </p>
                    <h3 className="mt-2 min-h-[42px] text-sm font-semibold leading-5 text-[#30291f] sm:text-base">
                      {product.name}
                    </h3>
                    <p className="mt-3 font-serif text-xl font-semibold text-[#99631f]">
                      <Price amount={product.price} />
                    </p>

                    <div className="mt-4 grid gap-2">
                      <motion.button
                        type="button"
                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                        onClick={() => handleAddToCart(product)}
                        className="rounded-full bg-[#a86e25] px-3 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#87551b]"
                      >
                        {quantity ? `✓ Added (${quantity})` : "＋ Add to Cart"}
                      </motion.button>

                      <Link
                        href={`/products/${product.slug || product.id}`}
                        className="rounded-full border border-[#e4d7c2] px-3 py-3 text-center text-xs font-semibold text-[#6b4a24] transition-colors hover:bg-[#f8f1e6]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <Reveal className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full border border-[#b48649] px-7 py-4 text-sm font-semibold text-[#87551b] transition-all hover:bg-[#a86e25] hover:text-white"
            >
              Explore All Products <span>→</span>
            </Link>
          </Reveal>

          {cartCount > 0 && (
            <Reveal className="mt-6 text-center">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 rounded-full bg-[#2f4c30] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#233b24]"
              >
                🛒 Cart ({cartCount} items)
              </Link>
              <p className="mt-2 text-xs text-[#777166]">
                Demo cart state only; checkout is not connected yet.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#21190f] px-4 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="The Bhuwneshwari Difference"
            title="Thoughtful Guidance. Personal Attention."
            description="Explore a consultation experience centered around your property and requirements."
            dark
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className="rounded-2xl border border-[#d3ad69]/20 bg-white/[0.035] p-7 transition-colors hover:bg-white/[0.07]"
              >
                <span className={`grid h-14 w-14 place-items-center rounded-full border border-[#cba05d]/35 bg-[#b27a2f]/15 font-serif text-3xl text-[#e7c581] shadow-sm ${
                  index % 2 === 0 ? "animate-float-slow" : "animate-float-reverse"
                }`}>
                  {benefit.icon}
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#d7b16c]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-serif text-2xl">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONSULTATION PROCESS */}
      <section className="px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="Simple and Personalized"
            title="Your Consultation Journey"
            description="Four straightforward steps to get started."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                variants={fadeUp}
                className="relative rounded-2xl border border-[#e8decd] bg-white p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl text-[#c6a36c]">
                    {step.number}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f5ead7] text-lg text-[#98621f]">
                    {["✉", "⌖", "▦", "✧"][index]}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#777166]">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRAINING BANNER */}
      <section className="px-4 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-[#332315]"
        >
          <div className="absolute inset-0">
            <Photo
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85"
              alt="Elegant professional workspace"
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#21180f] via-[#21180f]/90 to-[#21180f]/35" />

          <div className="relative grid gap-10 px-7 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e2be7a]">
                Learn · Practice · Grow
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Deepen Your Understanding of Vastu
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Explore training opportunities, practical learning, and
                personalized guidance for your learning journey.
              </p>
            </div>

            <Link
              href="/training"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#bd873b] px-7 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#d09a4c]"
            >
              Explore Training <span>→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-10 sm:px-8 lg:px-12">
        <Reveal className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-7 rounded-[24px] border border-[#e7d9c1] bg-[#f2e7d4] p-7 sm:p-10 lg:flex-row lg:items-center lg:px-14 lg:py-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[#9a6827]">
              Begin Your Journey
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Let&apos;s Talk About Your Space.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#716657]">
              Contact our team to discuss your property, explore products, or
              learn more about consultation services.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#a66b24] px-7 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#87551b]"
          >
            Get in Touch <span>→</span>
          </Link>
        </Reveal>
      </section>

      {/* FOOTER */}
     
    </main>
  );
}

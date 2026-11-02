"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const categories = [
  "All Articles",
  "Residential Vastu",
  "Commercial Vastu",
  "Vastu Tips",
  "Vastu Remedies",
  "Architecture",
];

const blogs = [
  {
    id: 1,
    slug: "vastu-for-a-harmonious-home",
    title: "Vastu for a Harmonious Home: A Practical Guide",
    excerpt:
      "Explore practical ways to think about room layouts, natural light, entrances, and everyday living spaces through the principles of Vastu.",
    category: "Residential Vastu",
    date: "2026-09-24",
    readTime: "7 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    id: 2,
    slug: "vastu-for-business-and-offices",
    title: "Vastu for Business: Planning a More Balanced Workspace",
    excerpt:
      "Learn about workspace arrangement, circulation, lighting, and other practical considerations for commercial environments.",
    category: "Commercial Vastu",
    date: "2026-09-18",
    readTime: "6 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    slug: "understanding-the-five-elements-in-vastu",
    title: "Understanding the Five Elements in Vastu Shastra",
    excerpt:
      "An introduction to the traditional concepts of earth, water, fire, air, and space and their role in Vastu philosophy.",
    category: "Vastu Tips",
    date: "2026-09-12",
    readTime: "8 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    slug: "vastu-tips-for-a-new-home",
    title: "Moving Into a New Home? Vastu Points to Consider",
    excerpt:
      "A helpful checklist of layout, orientation, ventilation, and planning considerations when evaluating a new home.",
    category: "Residential Vastu",
    date: "2026-09-05",
    readTime: "5 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    slug: "natural-light-and-space-planning",
    title: "Natural Light, Ventilation and Thoughtful Space Planning",
    excerpt:
      "Discover why daylight, airflow, circulation, and the way a space is used deserve attention in architectural planning.",
    category: "Architecture",
    date: "2026-08-28",
    readTime: "6 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    slug: "understanding-vastu-remedies",
    title: "Understanding Vastu Remedies and Practical Adjustments",
    excerpt:
      "A measured look at assessing a property and discussing suitable adjustments before making major changes.",
    category: "Vastu Remedies",
    date: "2026-08-21",
    readTime: "7 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    slug: "planning-a-commercial-property",
    title: "Planning a Commercial Property: What to Review First",
    excerpt:
      "Review key planning topics including entrances, movement through the building, functional zones, and workspace needs.",
    category: "Commercial Vastu",
    date: "2026-08-14",
    readTime: "5 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 8,
    slug: "vastu-and-architectural-design",
    title: "Bringing Vastu Principles Into Architectural Design",
    excerpt:
      "Explore how traditional spatial principles can be considered alongside contemporary architectural requirements.",
    category: "Architecture",
    date: "2026-08-07",
    readTime: "8 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 9,
    slug: "everyday-vastu-tips",
    title: "Everyday Vastu Tips for a More Thoughtful Living Space",
    excerpt:
      "Simple topics to review around organization, lighting, furniture placement, and the everyday use of your home.",
    category: "Vastu Tips",
    date: "2026-07-30",
    readTime: "4 min read",
    author: "Bhuwneshwari Scientific Vastu",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#a56b27]">
        <span className="h-px w-7 bg-[#b18443]" />
        {eyebrow}
        <span className="h-px w-7 bg-[#b18443]" />
      </span>

      <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#302116] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#796c5c] sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}

function BlogCard({ blog, reduceMotion }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={reduceMotion ? undefined : { y: -7 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e9dfce] bg-white shadow-[0_5px_25px_rgba(55,37,16,0.045)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(55,37,16,0.12)]"
    >
      <Link
        href={`/blog/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#eee5d6]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url("${blog.image}")` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />

        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#956024] shadow-sm backdrop-blur-md">
          {blog.category}
        </span>

        <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-white/50 bg-white/90 text-lg text-[#956024] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#8b7b69]">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#b18443]">▦</span>
            {formatDate(blog.date)}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#c7ad87]" />
          <span>{blog.readTime}</span>
        </div>

        <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-[#302116] transition-colors group-hover:text-[#9c6524] sm:text-2xl">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-[#796c5c]">
          {blog.excerpt}
        </p>

        <div className="mt-5 border-t border-[#eee5d8] pt-4">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9e6829] transition-all duration-300 hover:gap-3"
          >
            Read Article <span>→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const reduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const featured = blogs.find((blog) => blog.featured);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const categoryMatch =
        activeCategory === "All Articles" || blog.category === activeCategory;

      const searchMatch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch && !blog.featured;
    });
  }, [activeCategory, search]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  function changeCategory(category) {
    setActiveCategory(category);
    setVisibleCount(6);
  }

  return (
    <main className="overflow-hidden bg-[#fcfaf5] text-[#302116]">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-[#21160d]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1b1109]/95 via-[#21160d]/85 to-[#21160d]/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#fcfaf5]/20 to-transparent" />

        <div className="mx-auto max-w-[1450px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#e5bc76]">
              <span className="h-px w-9 bg-[#c18b43]" />
              Knowledge & Inspiration
            </div>

            <h1 className="font-serif text-4xl font-bold leading-[1.12] text-white sm:text-6xl lg:text-7xl">
              Insights for
              <span className="mt-2 block text-[#e5bc76]">Better Spaces.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Explore articles on Vastu Shastra, thoughtful architecture,
              residential planning, commercial spaces, and practical ideas for
              your property.
            </p>

            <a
              href="#latest-articles"
              className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[#e0b66f]/50 bg-gradient-to-r from-[#a56a25] to-[#bd893f] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Articles <span>↓</span>
            </a>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-14 w-full bg-gradient-to-t from-[#fcfaf5] to-transparent" />
      </section>

      {/* ================= FEATURED ARTICLE ================= */}
      {featured && (
        <section className="relative z-10 mx-auto -mt-3 max-w-[1400px] px-4 pt-3 sm:px-8 lg:px-12">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65 }}
            className="grid overflow-hidden rounded-3xl border border-[#e8ddc9] bg-white shadow-[0_15px_45px_rgba(55,37,16,0.09)] lg:grid-cols-[1.05fr_0.95fr]"
          >
            <Link
              href={`/blog/${featured.slug}`}
              aria-label={`Read featured article: ${featured.title}`}
              className="group relative block min-h-[260px] overflow-hidden bg-[#e8dece] sm:min-h-[360px] lg:min-h-[430px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url("${featured.image}")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <span className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#925c20] shadow-md backdrop-blur-md">
                Featured Article
              </span>
            </Link>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a56b27]">
                {featured.category}
              </span>

              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#302116] sm:text-4xl">
                {featured.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#796c5c] sm:text-base">
                {featured.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[#897965]">
                <span>{formatDate(featured.date)}</span>
                <span className="h-1 w-1 rounded-full bg-[#bd8b45]" />
                <span>{featured.readTime}</span>
              </div>

              <Link
                href={`/blog/${featured.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-3 rounded-xl bg-[#9e6626] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#80501d] hover:shadow-lg"
              >
                Read Featured Article <span>→</span>
              </Link>
            </div>
          </motion.article>
        </section>
      )}

      {/* ================= ARTICLE LIST ================= */}
      <section
        id="latest-articles"
        className="scroll-mt-24 px-4 py-20 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="From Our Journal"
            title="Explore Our Latest Articles"
            description="Helpful perspectives and ideas for understanding Vastu, property planning, and the spaces where life happens."
          />

          {/* Search */}
          <div className="mb-6 flex justify-center">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[#e6ddce] bg-white px-4 py-3 shadow-sm transition-all focus-within:border-[#b18443] focus-within:shadow-md">
              <span className="text-xl text-[#a56b27]">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Search articles, topics or categories..."
                aria-label="Search blog articles"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#a39889]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-lg text-[#8c7a66] hover:text-[#9e6626]"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  type="button"
                  key={category}
                  onClick={() => changeCategory(category)}
                  className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    active
                      ? "border-[#a56b27] bg-gradient-to-r from-[#a56b27] to-[#bd8b45] text-white shadow-md shadow-[#a56b27]/15"
                      : "border-[#e7ddcd] bg-white/80 text-[#6e5b46] hover:border-[#c6a36d] hover:bg-[#fff5e4]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="font-serif text-xl font-bold sm:text-2xl">
              {activeCategory === "All Articles"
                ? "Latest Articles"
                : activeCategory}
            </p>
            <span className="text-xs text-[#8b7a67]">
              {filteredBlogs.length} articles
            </span>
          </div>

          {/* Cards */}
          {visibleBlogs.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${search}`}
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d9c9ae] bg-white/70 px-5 py-16 text-center">
              <span className="text-4xl text-[#b18443]">⌕</span>
              <h3 className="mt-4 font-serif text-2xl font-bold">
                No articles found
              </h3>
              <p className="mt-2 text-sm text-[#796c5c]">
                Try another search term or choose a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Articles");
                }}
                className="mt-5 rounded-xl bg-[#a56b27] px-5 py-3 text-sm font-semibold text-white"
              >
                View All Articles
              </button>
            </div>
          )}

          {visibleCount < filteredBlogs.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((current) => current + 3)}
                className="inline-flex items-center gap-3 rounded-xl border border-[#c4a16d] bg-white px-7 py-3.5 text-sm font-bold text-[#946024] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#fff5e5] hover:shadow-lg"
              >
                Load More Articles <span>↓</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= NEWSLETTER / CTA ================= */}
      <section className="relative isolate overflow-hidden bg-[#1e140b] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1e140b] via-[#2b1a0b]/95 to-[#1e140b]/85" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e4bb76]">
            Continue Exploring
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            Thoughtful Spaces Begin With Better Understanding
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Have questions about your property or want personalized Vastu
            guidance? Get in touch with our team to discuss your requirements.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c08b42] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              Contact Our Team <span>→</span>
            </Link>

            <Link
              href="/appointment"
              className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Book a Consultation
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

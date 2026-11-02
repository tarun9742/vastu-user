"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const stats = [
  { icon: "🏆", number: "25+", label: "Years of Experience" },
  { icon: "⌂", number: "1000+", label: "Properties Consulted" },
  { icon: "✥", number: "5+", label: "Consultation Categories" },
  { icon: "✧", number: "Scientific", label: "Approach & Solutions" },
  { icon: "▤", number: "Expert", label: "Training & Classes" },
];

const services = [
  {
    title: "Residential Vastu",
    description:
      "Harmonious homes for a balanced and positive living environment.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85",
    href: "/services/residential-vastu",
    icon: "⌂",
  },
  {
    title: "Commercial Vastu",
    description: "Thoughtful spaces for business growth and success.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85",
    href: "/services/commercial-vastu",
    icon: "▥",
  },
  {
    title: "Industrial Vastu",
    description: "Practical planning for industrial layouts and facilities.",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=85",
    href: "/services/industrial-vastu",
    icon: "⚒",
  },
  {
    title: "Site Visit",
    description: "On-location assessment with property-specific guidance.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=85",
    href: "/services/site-visit",
    icon: "⌖",
  },
];

const values = [
  {
    icon: "◎",
    title: "Scientific Thinking",
    description:
      "We aim to combine traditional Vastu principles with structured analysis and practical property assessment.",
  },
  {
    icon: "◇",
    title: "Integrity & Honesty",
    description:
      "We value clear communication, realistic recommendations, and an honest consultation experience.",
  },
  {
    icon: "✥",
    title: "Personalized Solutions",
    description:
      "Every property is different. Our approach considers its layout, purpose, and individual requirements.",
  },
  {
    icon: "♧",
    title: "Continuous Learning",
    description:
      "We believe in continually improving our knowledge and the way we guide homeowners and businesses.",
  },
];

const process = [
  {
    number: "01",
    title: "Understand Your Needs",
    description:
      "We discuss your property, concerns, objectives, and expectations.",
  },
  {
    number: "02",
    title: "Study the Property",
    description:
      "We review available plans, layouts, directions, and relevant site details.",
  },
  {
    number: "03",
    title: "Recommend Solutions",
    description:
      "We explain practical recommendations tailored to your requirements.",
  },
  {
    number: "04",
    title: "Guide You Forward",
    description:
      "We help you understand the next steps and implement agreed recommendations.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
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
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.65, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <span
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${
          light ? "text-[#e7bd76]" : "text-[#a56b27]"
        }`}
      >
        <span className="h-px w-7 bg-current" />
        {eyebrow}
        <span className="h-px w-7 bg-current" />
      </span>

      <h2
        className={`mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-[#302116]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base ${
            light ? "text-white/70" : "text-[#786a58]"
          }`}
        >
          {description}
        </p>
      )}

      <div className="mx-auto mt-6 flex max-w-[180px] items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b78a4c]" />
        <span className={light ? "text-[#e7bd76]" : "text-[#b18443]"}>✦</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b78a4c]" />
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#fcfaf5] text-[#302116]">
      {/* ================= HERO ================= */}
      <section className="relative isolate flex min-h-[510px] items-center overflow-hidden bg-[#1b120b] sm:min-h-[570px] lg:min-h-[620px]">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black via-black/85 to-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Decorative gold glow */}
        <div className="pointer-events-none absolute -right-24 top-12 -z-10 h-80 w-80 rounded-full bg-[#c38c3c]/20 blur-[100px]" />

        <div className="mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-9 lg:px-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85 }}
            className="max-w-2xl"
          >
            <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#e7bd76]">
              <span>About Us</span>
              <span className="h-px w-14 bg-[#c18b43]" />
            </div>

            <h1 className="font-serif text-4xl font-bold leading-[1.12] text-white sm:text-6xl lg:text-7xl">
              Guided by Science.
              <span className="mt-2 block text-[#e8bd72]">
                Rooted in Vastu.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              At Bhuwneshwari Scientific Vastu, we bring traditional Vastu
              knowledge together with structured analysis to help create
              harmonious living and working spaces.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl border border-[#d9ae66]/50 bg-gradient-to-r from-[#a86a20] to-[#c18a3e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(170,105,31,0.25)] transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Connect With Us
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/60 hover:bg-white/15"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#fcfaf5] to-transparent" />
      </section>

      {/* ================= STATS ================= */}
      <section className="relative z-10 mx-auto -mt-4 max-w-[1450px] px-4 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#e9deca] bg-white/95 shadow-[0_12px_40px_rgba(65,44,20,0.10)] backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className={`flex items-center gap-3 p-4 sm:p-5 ${
                index !== stats.length - 1 ? "border-r border-[#eee4d4]" : ""
              } ${index > 1 ? "border-t border-[#eee4d4] lg:border-t-0" : ""}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#fff4d9] to-[#ead1a0] font-serif text-2xl text-[#98601e]">
                {stat.icon}
              </span>
              <div>
                <p className="font-serif text-lg font-bold text-[#392719] sm:text-xl">
                  {stat.number}
                </p>
                <p className="mt-1 text-[11px] leading-4 text-[#776858] sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#d8bb83]/15 blur-[90px]" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Founder image */}
          <Reveal>
            <div className="relative mx-auto max-w-[570px]">
              <div className="absolute -left-4 -top-4 h-32 w-32 rounded-tl-[40px] border-l-2 border-t-2 border-[#bb8a43]/70" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-br-[40px] border-b-2 border-r-2 border-[#bb8a43]/70" />

              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e8dece] shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1100&q=85')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="font-serif text-4xl text-[#e7bd76]">“</span>
                  <p className="max-w-md font-serif text-lg italic leading-7 text-white sm:text-xl">
                    Our goal is to help people make more informed decisions
                    about their spaces through thoughtful Vastu guidance.
                  </p>
                  <div className="mt-5 h-px w-16 bg-[#c18b43]" />
                  <p className="mt-4 font-semibold text-white">
                    Ar. Kuldeep Swami
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#e7bd76]">
                    Vastu Consultant & Architect
                  </p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Story copy */}
          <div>
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a56b27]">
                Our Story
              </span>

              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                About Bhuwneshwari Scientific Vastu
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#706251] sm:text-base sm:leading-8">
                Bhuwneshwari Scientific Vastu is dedicated to providing
                personalized Vastu consultation for residential, commercial, and
                industrial properties. Our approach focuses on understanding the
                individual property and its requirements before suggesting
                practical recommendations.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#706251] sm:text-base sm:leading-8">
                Guided by Ar. Kuldeep Swami, our work brings attention to
                property layouts, spatial planning, and the principles of Vastu.
                We aim to make the consultation process clear, informative, and
                relevant to the people who use each space.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {[
                {
                  icon: "◎",
                  title: "Our Vision",
                  text: "To support harmonious spaces and informed decisions through thoughtful Vastu consultation.",
                },
                {
                  icon: "✥",
                  title: "Our Mission",
                  text: "To provide practical, personalized guidance with clarity, care, and integrity.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#eadcc4] bg-white/80 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-3xl text-[#a56b27]">{item.icon}</span>
                  <h3 className="mt-3 font-serif text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#786a58]">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="relative overflow-hidden bg-[#f2eadb] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-white/60 blur-[100px]" />

        <div className="relative mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Vision, Mission & Values"
            description="The principles that shape how we understand your needs, assess your space, and deliver our recommendations."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                className="group rounded-2xl border border-[#e3d4ba] bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl sm:p-7"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#e8d4ad] bg-gradient-to-br from-[#fff7e6] to-[#ead2a0] font-serif text-3xl text-[#9d6928] transition-transform duration-300 group-hover:rotate-6">
                  {value.icon}
                </span>

                <p className="mt-6 text-xs font-bold tracking-[0.15em] text-[#ad7a37]">
                  0{index + 1}
                </p>

                <h3 className="mt-2 font-serif text-xl font-bold">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#786a58]">
                  {value.description}
                </p>

                <div className="mt-6 h-0.5 w-10 rounded-full bg-[#bd8b45] transition-all duration-300 group-hover:w-20" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="What We Do"
            title="Vastu Guidance for Every Space"
            description="Explore our consultation categories and find the support that fits your property and goals."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {services.map((service) => (
              <motion.article
                key={service.title}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -7 }}
                className="group overflow-hidden rounded-2xl border border-[#e8dece] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-[#e7ddcc]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url("${service.image}")` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-white/85 font-serif text-2xl text-[#9d671f] shadow-lg backdrop-blur-md">
                    {service.icon}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-3 min-h-[68px] text-sm leading-6 text-[#786a58]">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a56b27] transition-all hover:gap-3"
                  >
                    Explore Service <span>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= OUR PROCESS ================= */}
      <section className="relative overflow-hidden bg-[#21160d] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#21160d]/95 via-[#21160d]/90 to-[#21160d]/80" />

        <div className="relative mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="Our Approach"
            title="A Clear Path to Better Understanding"
            description="We structure every consultation around your requirements, the property, and practical next steps."
            light
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
          >
            {process.map((step) => (
              <motion.article
                key={step.number}
                variants={fadeUp}
                className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md transition-colors hover:border-[#d5aa62]/50 hover:bg-white/[0.08]"
              >
                <p className="font-serif text-5xl font-bold text-[#d8ad66]/80">
                  {step.number}
                </p>

                <div className="my-5 h-px w-full bg-gradient-to-r from-[#bd8b45] to-transparent" />

                <h3 className="font-serif text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= TRAINING ================= */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 rounded-3xl border border-[#e6d5b8] bg-gradient-to-br from-[#fffdf8] via-[#f5ead6] to-[#ead7b6] p-6 shadow-sm sm:p-10 lg:grid-cols-[1fr_0.85fr] lg:p-14">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#a56b27]">
              Learn With Us
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Discover the Principles of Vastu
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#786a58] sm:text-base">
              Interested in learning more about Vastu? Explore our training and
              classes for an introduction to spatial principles, property
              analysis, and practical applications.
            </p>

            <Link
              href="/training"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#9e6626] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#7e4d1a]"
            >
              Explore Training <span>→</span>
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[350px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/30 bg-white/15 p-5 text-white backdrop-blur-lg">
                <p className="font-serif text-xl font-bold">
                  Knowledge. Practice. Understanding.
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Learn at your pace and explore the fundamentals.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative isolate overflow-hidden bg-[#160e07] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160e07] via-[#26170b]/95 to-[#160e07]/80" />

        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e3b66b]">
            Start a Conversation
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Let&apos;s Create a Better Tomorrow
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Have questions about your home, workplace, or property? Connect with
            us to discuss your requirements and explore the right consultation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#ad7027] to-[#d1a354] px-7 py-4 text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-[#c18b43]/20"
            >
              Contact Our Team <span>→</span>
            </Link>

            <a
              href="https://wa.me/919928383192"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

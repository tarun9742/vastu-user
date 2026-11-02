"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const serviceLinks = [
  { label: "Residential Vastu", href: "/services/residential-vastu" },
  { label: "Commercial Vastu", href: "/services/commercial-vastu" },
  { label: "Industrial Vastu", href: "/services/industrial-vastu" },
  { label: "Site Visit", href: "/services/site-visit" },
  { label: "Vastu for Single Person", href: "/services/single-person-vastu" },
];

const productLinks = [
  { label: "All Vastu Products", href: "/products" },
  { label: "Energy Globes", href: "/products?category=energy-globes" },
  { label: "Vastu Machines", href: "/products?category=vastu-machines" },
  { label: "Oils & Sprays", href: "/products?category=oils" },
  { label: "Rods & Blockers", href: "/products?category=vastu-rods" },
  { label: "Pyramids & Pendants", href: "/products?category=pyramids" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Training & Classes", href: "/training" },
  { label: "Choti Khushi NGO (Bird Feeding)", href: "/donation" },
  { label: "Blog & Articles", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const resourceLinks = [
  { label: "Book an Appointment", href: "/appointment" },
  { label: "Training Enquiries", href: "/contact?subject=Training%20Enquiry" },
  { label: "Product Enquiries", href: "/contact?subject=Product%20Enquiry" },
  { label: "Share Your Story", href: "/contact?subject=Share%20My%20Story" },
];

const socialLinks = [
  {
    name: "Instagram",
    label: "ig",
    href: "https://www.instagram.com/",
  },
  {
    name: "YouTube",
    label: "▶",
    href: "https://www.youtube.com/",
  },
  {
    name: "Facebook",
    label: "f",
    href: "https://www.facebook.com/",
  },
];

function FooterReveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 py-1 text-[12px] leading-5 text-white/65 transition-colors duration-200 hover:text-[#edc985]"
      >
        <span className="text-[10px] text-[#bd8b45] transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
        {children}
      </Link>
    </li>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-3 font-serif text-base font-bold text-white">
        {title}
      </h3>
      <div className="mb-3 h-px w-12 bg-gradient-to-r from-[#d8a956] to-transparent" />
      <ul className="space-y-1">
        {links.map((link) => (
          <FooterLink key={link.href} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleNewsletter(event) {
    event.preventDefault();
    setEmailError("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Frontend placeholder. Connect this form to your newsletter API
    // before publishing so subscriptions are actually saved.
    window.location.href = `mailto:bhuw…?subject=${encodeURIComponent(
      "Newsletter subscription request",
    )}&body=${encodeURIComponent(
      `Please add this email to the newsletter: ${email.trim()}`,
    )}`;
  }

  return (
    <footer className="relative isolate overflow-hidden bg-[#1d130b] text-white">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-[0.13]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#2a1b0d] via-[#1d130b] to-[#100b06]" />

      <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-72 w-72 rounded-full bg-[#b47a2d]/10 blur-3xl" />

      {/* Top CTA */}
      <div className="border-b border-white/10 px-4 py-6 sm:px-7 lg:px-12">
        <FooterReveal>
          <div className="mx-auto flex max-w-[1500px] flex-col gap-5 rounded-2xl border border-[#d4ab67]/25 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <motion.div
                animate={reduceMotion ? undefined : { rotate: [0, -3, 3, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 5, repeat: Infinity, repeatDelay: 2 }
                }
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#d4ab67]/40 bg-[#b47a2d]/15 text-2xl text-[#edc985]"
              >
                ✧
              </motion.div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#edc985]">
                  Your Space, Your Journey
                </p>
                <h2 className="mt-1 font-serif text-xl font-bold sm:text-2xl">
                  Let’s Create a Better Tomorrow
                </h2>
                <p className="mt-1 text-xs leading-5 text-white/60">
                  Get guidance for your home, office, business, or property.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3 text-xs font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-[#b47a2d]/20"
              >
                <span>▦</span>
                Book an Appointment
                <span>→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-xs font-semibold text-white/80 transition hover:border-[#d4ab67]/60 hover:text-[#edc985]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </FooterReveal>
      </div>

      {/* Main footer columns */}
      <div className="px-4 py-8 sm:px-7 sm:py-10 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.15fr]">
          {/* Brand */}
          <FooterReveal>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Bhuwneshwari Scientific Vastu home"
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#d4ab67]/40 bg-gradient-to-br from-[#f5d79e] via-[#c38a38] to-[#82501a] font-serif text-3xl font-bold text-[#3a1b08] shadow-lg">
                B
              </div>

              <div>
                <p className="font-serif text-lg font-bold leading-tight text-[#edc985] sm:text-xl">
                  BHUWNESHWARI
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.19em] text-white/80">
                  Scientific Vastu
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-6 text-white/60">
              Vastu consultation and architectural perspectives for residential,
              commercial, and industrial properties.
            </p>

            <div className="mt-4 flex items-start gap-3">
              <span className="mt-0.5 text-[#edc985]">⌖</span>
              <p className="text-xs leading-5 text-white/70">
                Jaipur, Rajasthan, India
              </p>
            </div>

            <div className="mt-2 flex items-start gap-3">
              <span className="mt-0.5 text-[#edc985]">◷</span>
              <div className="text-xs leading-5 text-white/70">
                <p>Monday – Saturday</p>
                <p>9:00 AM – 7:00 PM</p>
                <p className="text-white/45">Please confirm holiday hours.</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.05 }}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-[#edc985] transition hover:border-[#d4ab67]/60 hover:bg-[#b47a2d]/15"
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </FooterReveal>

          <FooterReveal delay={0.05}>
            <FooterColumn title="Explore" links={companyLinks} />
          </FooterReveal>

          <FooterReveal delay={0.1}>
            <FooterColumn title="Our Services" links={serviceLinks} />
          </FooterReveal>

          <FooterReveal delay={0.15}>
            <FooterColumn title="Vastu Products" links={productLinks} />
          </FooterReveal>

          {/* Contact & newsletter */}
          <FooterReveal delay={0.2}>
            <h3 className="mb-3 font-serif text-base font-bold text-white">
              Stay Connected
            </h3>
            <div className="mb-3 h-px w-12 bg-gradient-to-r from-[#d8a956] to-transparent" />

            <p className="text-xs leading-6 text-white/60">
              Have a question about a consultation, product, or training
              program? We’re here to help.
            </p>

            <a
              href="tel:+919928383192"
              className="mt-4 flex items-start gap-3 text-xs text-white/80 transition hover:text-[#edc985]"
            >
              <span className="text-[#edc985]">☎</span>
              <span>+91 99283 83192</span>
            </a>

            <a
              href="mailto:bhuw…"
              className="mt-3 flex items-start gap-3 break-all text-xs leading-5 text-white/80 transition hover:text-[#edc985]"
            >
              <span className="shrink-0 text-[#edc985]">✉</span>
              <span>Send us an email</span>
            </a>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#edc985] transition hover:gap-3"
            >
              Visit Contact Page →
            </Link>

            <form onSubmit={handleNewsletter} className="mt-5">
              <label
                htmlFor="footer-email"
                className="mb-2 block text-xs font-semibold text-white/80"
              >
                Get Updates
              </label>

              <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 focus-within:border-[#d4ab67]/60">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError("");
                  }}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-white/40"
                  aria-describedby="footer-email-note"
                  required
                />

                <button
                  type="submit"
                  aria-label="Request email updates"
                  className="px-3 text-lg text-[#edc985] transition hover:bg-[#b47a2d]/20"
                >
                  →
                </button>
              </div>

              <p
                id="footer-email-note"
                role={emailError ? "alert" : "status"}
                className="mt-2 text-[10px] leading-4 text-white/45"
              >
                {emailError ||
                  "Email updates are not enabled until a subscription backend is connected."}
              </p>
            </form>
          </FooterReveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/15 px-4 py-4 sm:px-7 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bhuwneshwari Scientific Vastu. All
            rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition hover:text-[#edc985]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition hover:text-[#edc985]"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/shipping-policy"
              className="transition hover:text-[#edc985]"
            >
              Shipping Policy
            </Link>
            <Link
              href="/refund-policy"
              className="transition hover:text-[#edc985]"
            >
              Returns & Refunds
            </Link>
          </div>

          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            className="inline-flex items-center gap-2 self-start transition hover:text-[#edc985] sm:self-auto"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

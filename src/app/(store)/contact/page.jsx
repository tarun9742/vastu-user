"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const gold = "#a96b20";

const contactItems = [
  {
    icon: "☎",
    title: "Phone",
    lines: ["+91 99283 83192", "Mon – Sat (9:00 AM – 7:00 PM)"],
    href: "tel:+919928383192",
  },
  {
    icon: "✉",
    title: "Email",
    lines: [
      "bhuwneshwariscientificvastu@gmail.com",
      "We aim to reply within 24 hours",
    ],
    href: "mailto:bhuwneshwariscientificvastu@gmail.com",
  },
  {
    icon: "⌖",
    title: "Office Address",
    lines: ["Bhuwneshwari Scientific Vastu", "Jaipur, Rajasthan, India"],
    href: "https://www.google.com/maps/search/?api=1&query=Bhuwneshwari+Scientific+Vastu+Jaipur",
  },
  {
    icon: "◷",
    title: "Working Hours",
    lines: ["Monday – Saturday", "9:00 AM – 7:00 PM", "Sunday – Closed"],
  },
];

const quickLinks = [
  {
    icon: "▦",
    title: "Book an Appointment",
    description: "Schedule your consultation with our expert.",
    href: "/appointment",
  },
  {
    icon: "☏",
    title: "Chat on WhatsApp",
    description: "Get quick answers to your queries.",
    href: "https://wa.me/919928383192",
  },
  {
    icon: "☎",
    title: "Talk to Our Team",
    description: "+91 99283 83192 · 9 AM – 7 PM",
    href: "tel:+919928383192",
  },
  {
    icon: "✉",
    title: "Email Us",
    description: "We aim to reply within 24 hours.",
    href: "mailto:bhuwneshwariscientificvastu@gmail.com",
  },
];

const benefits = [
  { icon: "♧", title: "Expert Guidance", detail: "By our Vastu consultant" },
  { icon: "✥", title: "Personalized", detail: "Consultation & solutions" },
  { icon: "◇", title: "Trusted Approach", detail: "Practical recommendations" },
  { icon: "⌂", title: "Complete Support", detail: "Homes, offices & businesses" },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  consent: false,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function SectionTitle({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <h2 className="shrink-0 font-serif text-xl font-bold text-[#281d13] sm:text-2xl">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-[#b78039] to-transparent" />
    </div>
  );
}

function GoldIcon({ children, small = false }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border border-[#d8b77c]/50 bg-gradient-to-br from-[#c18b43] to-[#8d5115] text-white shadow-md ${
        small ? "h-10 w-10 text-lg" : "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl"
      }`}
    >
      {children}
    </span>
  );
}

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(event) {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your query.");
      }

      setStatus("success");
      setFeedback(result.message || "Your query has been received.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error.message || "Something went wrong. Please try again."
      );
    }
  }

  const enter = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.12 },
        variants: fadeUp,
      };

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf7f0] text-[#302319]">
      {/* Hero banner */}
      <section className="relative isolate flex min-h-[370px] items-center overflow-hidden bg-[#170e08] sm:min-h-[410px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-[#271507]/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="mx-auto w-full max-w-[1500px] px-5 py-12 sm:px-9 lg:px-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-2 text-sm text-white/80">
              <Link href="/" className="transition hover:text-[#e8bd72]">
                Home
              </Link>
              <span className="text-[#d6a44e]">›</span>
              <span className="text-[#f2d69e]">Contact Us</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e4b867]">
              We&apos;re here to help
            </p>

            <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Contact <span className="text-[#e7bc6b]">Us</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Let&apos;s help you create a harmonious, balanced and positive
              environment. Connect with us for expert Vastu guidance.
            </p>

            <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: "☏", title: "Expert Guidance", href: "#contact-form" },
                { icon: "▦", title: "Book Consultation", href: "/appointment" },
                {
                  icon: "⌖",
                  title: "Visit Our Office",
                  href: "https://www.google.com/maps/search/?api=1&query=Jaipur+Rajasthan+India",
                },
                {
                  icon: "◉",
                  title: "Chat on WhatsApp",
                  href: "https://wa.me/919928383192",
                },
              ].map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  custom={index}
                  initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#d8b16a]/30 bg-black/35 p-3 backdrop-blur-md transition-colors hover:border-[#e6bb6b] hover:bg-[#9a611f]/20"
                >
                  <span className="text-2xl text-[#e8b957]">{item.icon}</span>
                  <span className="text-xs font-medium leading-5 text-white sm:text-sm">
                    {item.title}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main contact area */}
      <section className="relative z-10 mx-auto -mt-5 max-w-[1500px] px-3 pb-10 sm:px-6 lg:px-8">
        <motion.div
          {...enter}
          className="grid overflow-hidden rounded-2xl border border-[#eee4d3] bg-white shadow-[0_15px_50px_rgba(54,35,15,0.09)] lg:grid-cols-[0.85fr_1.2fr_0.95fr]"
        >
          {/* Contact information */}
          <div className="border-b border-[#eee4d3] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <SectionTitle>Get in Touch</SectionTitle>

            <div className="space-y-5">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <GoldIcon>{item.icon}</GoldIcon>
                    <div className="min-w-0 pt-1">
                      <h3 className="text-sm font-bold text-[#302319] sm:text-base">
                        {item.title}
                      </h3>
                      {item.lines.map((line) => (
                        <p
                          key={line}
                          className="mt-1 break-words text-xs leading-5 text-[#5e5144] sm:text-sm"
                        >
                          {line}
                        </p>
                      ))}
                      {item.title === "Office Address" && (
                        <span className="mt-1 inline-block text-xs font-semibold text-[#a96b20]">
                          View on Google Maps →
                        </span>
                      )}
                    </div>
                  </>
                );

                return (
                  <div key={item.title} className="flex gap-3">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.title === "Office Address" ? "_blank" : undefined
                        }
                        rel={
                          item.title === "Office Address"
                            ? "noreferrer"
                            : undefined
                        }
                        className="flex gap-3 transition-opacity hover:opacity-80"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-[#eee4d3] pt-5">
              <h3 className="font-serif text-lg font-bold">Follow Us</h3>
              <div className="mt-3 flex gap-3">
                {[
                  { label: "Instagram", text: "◎", href: "https://instagram.com/" },
                  { label: "YouTube", text: "▶", href: "https://youtube.com/" },
                  { label: "Facebook", text: "f", href: "https://facebook.com/" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#eadbc1] bg-[#fcf7ec] font-bold text-[#9d641e] transition-all hover:-translate-y-1 hover:bg-[#a96b20] hover:text-white"
                  >
                    {social.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div id="contact-form" className="scroll-mt-24 p-5 sm:p-7">
            <SectionTitle>Send Us a Message</SectionTitle>

            <p className="mb-5 text-sm leading-6 text-[#716558]">
              Fill in the details below and our team will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your Name *"
                  aria-label="Your name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="contact-input"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Phone Number *"
                  aria-label="Phone number"
                  autoComplete="tel"
                  type="tel"
                  required
                  maxLength={20}
                  className="contact-input"
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="Email Address"
                  aria-label="Email address"
                  autoComplete="email"
                  type="email"
                  maxLength={254}
                  className="contact-input"
                />

                <select
                  name="service"
                  value={form.service}
                  onChange={updateField}
                  required
                  aria-label="Select service"
                  className="contact-input"
                >
                  <option value="">Select Service / Query *</option>
                  <option value="Residential Vastu">Residential Vastu</option>
                  <option value="Commercial Vastu">Commercial Vastu</option>
                  <option value="Industrial Vastu">Industrial Vastu</option>
                  <option value="Site Visit">Site Visit</option>
                  <option value="Personal Vastu">Personal Vastu</option>
                  <option value="Vastu Products">Vastu Products</option>
                  <option value="Training & Classes">Training & Classes</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Your Message *&#10;&#10;Tell us about your property, requirements, or any questions..."
                aria-label="Your message"
                required
                minLength={10}
                maxLength={3000}
                rows={5}
                className="contact-input min-h-[140px] resize-y"
              />

              <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-[#6b6054]">
                <input
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={updateField}
                  required
                  className="mt-1 h-4 w-4 accent-[#a96b20]"
                />
                <span>
                  I agree to be contacted by Bhuwneshwari Scientific Vastu
                  regarding my query.
                </span>
              </label>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className={`rounded-lg p-3 text-sm ${
                    status === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {feedback}
                </motion.div>
              )}

              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#a9610e] to-[#bd780e] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#a96b20]/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{status === "loading" ? "Sending..." : "➤ Send Message"}</span>
              </motion.button>
            </form>
          </div>

          {/* Map and office visit */}
          <div className="border-t border-[#eee4d3] p-5 sm:p-7 lg:border-l lg:border-t-0">
            <SectionTitle>Our Office Location</SectionTitle>

            <div className="relative h-[240px] overflow-hidden rounded-xl border border-[#e8ddc9] bg-[#eee7da]">
              <iframe
                title="Map of Jaipur, Rajasthan"
                src="https://maps.google.com/maps?q=Jaipur%2C%20Rajasthan%2C%20India&t=&z=12&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 border-0"
              />
            </div>

            <div className="mt-4 rounded-xl border border-[#eee0c8] bg-[#fcf7ed] p-4">
              <div className="flex items-start gap-3">
                <GoldIcon small>▥</GoldIcon>
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    Prefer to Visit?
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#6c5c4b] sm:text-sm">
                    We are based in Jaipur, Rajasthan. Contact us to confirm
                    the office address and arrange your visit.
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Jaipur+Rajasthan+India"
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#b68a4e]/60 bg-white px-4 py-3 text-sm font-semibold text-[#925c20] transition-colors hover:bg-[#a96b20] hover:text-white"
              >
                ⌖ Get Directions
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick-contact cards */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {quickLinks.map((item) => (
            <motion.a
              key={item.title}
              variants={fadeUp}
              href={item.href}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              className="group flex items-center gap-3 rounded-xl border border-[#eee3d1] bg-white p-4 shadow-sm transition-shadow hover:shadow-lg sm:p-5"
            >
              <GoldIcon>{item.icon}</GoldIcon>

              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-base font-bold text-[#342418]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#796c5d]">
                  {item.description}
                </p>
              </div>

              <span className="text-xl text-[#a96b20] transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Premium trust strip */}
      <section className="relative overflow-hidden bg-[#100a06] px-4 py-8 text-white sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full border border-[#c18b43]/20" />
        <div className="mx-auto flex max-w-[1500px] flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
          <motion.div {...enter} className="max-w-xs">
            <p className="font-serif text-2xl font-bold leading-snug sm:text-3xl">
              Why Contact
              <br />
              Bhuwneshwari Scientific Vastu?
            </p>
          </motion.div>

          <div className="grid flex-1 grid-cols-2 gap-5 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                {...enter}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <GoldIcon>{benefit.icon}</GoldIcon>
                <div>
                  <p className="text-sm font-semibold">{benefit.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    {benefit.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="#contact-form"
            className="inline-flex items-center justify-between gap-5 rounded-xl border border-[#d6a04c]/30 bg-gradient-to-r from-[#86500f] to-[#a96b20] px-5 py-4 text-sm font-semibold text-white transition-all hover:brightness-110 xl:max-w-[270px]"
          >
            <span>Let&apos;s Create a Better Tomorrow with Positive Energy</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
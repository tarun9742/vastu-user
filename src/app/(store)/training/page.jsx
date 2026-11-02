"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import TrainingRegistrationModal from "@/components/TrainingRegistrationModal";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";

const courses = [
  {
    title: "Bhuwneshwari Scientific Vastu Master Class",
    subtitle: "Complete Scientific Vastu Training",
    tag: "Popular Program",
    price: 9999,
    originalPrice: 14999,
    slug: "bhuwneshwari-scientific-vastu-master-class",
    whatsappLink: "https://chat.whatsapp.com/BhuwneshwariMasterClass",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Live online classes",
      "Detailed learning modules",
      "Practical case discussions",
      "Certificate details on enrolment",
    ],
    format: "Batch Program",
  },
  {
    title: "Advanced Vastu Workshop",
    subtitle: "Practical Solutions & Case Studies",
    tag: "",
    price: 4999,
    originalPrice: 7999,
    slug: "advanced-vastu-workshop",
    whatsappLink: "https://chat.whatsapp.com/AdvancedVastuWorkshop",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Online / offline options",
      "Focused learning topics",
      "Interactive sessions",
      "Practical case discussions",
    ],
    format: "Workshop",
  },
  {
    title: "Personalized Vastu Training",
    subtitle: "One-to-One / Small Group Learning",
    tag: "",
    price: 14999,
    originalPrice: 19999,
    slug: "personalized-vastu-training",
    whatsappLink: "https://chat.whatsapp.com/PersonalizedVastuTraining",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Flexible scheduling",
      "Customized learning plan",
      "Practical guidance",
      "Personalized sessions",
    ],
    format: "Personal Training",
  },
];

const learning = [
  {
    icon: "▤",
    title: "Vastu Fundamentals",
    text: "Learn core concepts, directions, layouts, and traditional principles.",
  },
  {
    icon: "✺",
    title: "Scientific Approach",
    text: "Explore structured property analysis and modern assessment tools.",
  },
  {
    icon: "♧",
    title: "Remedies & Solutions",
    text: "Understand practical options and how to evaluate possible adjustments.",
  },
  {
    icon: "▣",
    title: "Case Studies",
    text: "Explore residential, commercial, and industrial property examples.",
  },
  {
    icon: "↗",
    title: "Business & Career",
    text: "Explore how Vastu knowledge can support professional development.",
  },
];

const audiences = [
  ["♙", "Vastu Enthusiasts", "For people who want to learn and grow."],
  [
    "✎",
    "Architects & Designers",
    "For architects, interior designers, and consultants.",
  ],
  ["▥", "Business Owners", "For those exploring Vastu for their properties."],
  ["⌂", "Students & Learners", "For people building foundational knowledge."],
];

const gallery = [
  {
    title: "Expert-led learning",
    image:
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Interactive online sessions",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Floor plan analysis",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Collaborative learning",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Practical discussions",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Learning together",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=700&q=85",
  },
];

const testimonials = [
  {
    name: "Student Feedback",
    role: "Course Participant",
    quote:
      "The structured learning approach and practical examples helped me understand how to evaluate property layouts more clearly.",
  },
  {
    name: "Student Feedback",
    role: "Workshop Participant",
    quote:
      "The case-study format made the topics easier to follow. I appreciated the opportunity to discuss practical questions.",
  },
  {
    name: "Student Feedback",
    role: "Vastu Learner",
    quote:
      "The sessions helped me organize my understanding of Vastu principles and approach property analysis more systematically.",
  },
];

const faqs = [
  {
    question: "What is the duration of the course?",
    answer:
      "Course duration depends on the selected program, batch schedule, and module structure. Contact our team for the current duration and upcoming dates.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Certificate eligibility and availability depend on the specific program. Please confirm the details with the team before enrolment.",
  },
  {
    question: "Are classes online or offline?",
    answer:
      "Training formats may vary by program. Ask our team which online, offline, or workshop options are currently available.",
  },
  {
    question: "Will class recordings be available?",
    answer:
      "Recording access depends on the course and its current terms. Please confirm recording availability before registering.",
  },
  {
    question: "How do I enrol in the next batch?",
    answer:
      "Use the enquiry button to share your name, contact details, and preferred program. Our team can provide available batch dates, fees, and registration instructions.",
  },
  {
    question: "Do I need prior Vastu knowledge?",
    answer:
      "Some programs may suit beginners while advanced workshops may assume prior knowledge. Tell us about your experience so we can help you choose a suitable program.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="mb-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#a56b27]">
        {eyebrow}
      </p>
      <h2 className="mt-1.5 font-serif text-2xl font-bold leading-tight text-[#302116] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#796c5c]">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export default function TrainingPage() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userEnrollments, setUserEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const user = getCurrentUser();
      if (!user?.phone) {
        setUserEnrollments([]);
        return;
      }
      try {
        const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/payments/my-enrollments?phone=${user.phone}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setUserEnrollments(data.data);
        }
      } catch (err) {
        console.error("Error loading user enrollments:", err);
      }
    }
    loadEnrollments();
    window.addEventListener("bsv-auth-updated", loadEnrollments);
    return () => window.removeEventListener("bsv-auth-updated", loadEnrollments);
  }, []);

  const openRegistration = useCallback((course) => {
    const user = getCurrentUser();
    if (!user) {
      openLoginPopup("/training");
      return;
    }
    setSelectedCourse(course);
    setRegistrationOpen(true);
  }, []);

  const closeRegistration = useCallback(() => {
    setRegistrationOpen(false);
  }, []);

  const getEnrollmentForCourse = useCallback((title) => {
    if (!title || !userEnrollments.length) return null;
    return userEnrollments.find(
      (e) => e.courseTitle?.trim().toLowerCase() === title.trim().toLowerCase()
    );
  }, [userEnrollments]);

  const testimonial = testimonials[testimonialIndex];

  return (
    <>
      <main className="overflow-hidden bg-[#fcfaf5] text-[#302116] relative">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-[#21150c]">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=2000&q=90')",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#170e07]/95 via-[#20140b]/80 to-[#20140b]/30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#21150c]/40 to-transparent" />

          <div className="mx-auto grid max-w-[1500px] items-center gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-16">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="mb-4 flex items-center gap-2 text-xs text-white/70">
                <Link href="/" className="transition hover:text-[#edc985]">
                  Home
                </Link>
                <span>›</span>
                <span className="text-[#edc985]">Training & Classes</span>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#edc985]">
                Learn · Practice · Grow
              </p>

              <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
                Vastu Training
                <span className="block text-[#e5bc76]">& Classes</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Build your understanding of scientific Vastu through structured
                learning, practical examples, and property case studies.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Explore Programs <span>→</span>
                </Link>
                <Link
                  href="/contact?subject=Vastu%20Training"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Enquire About Classes
                </Link>
              </div>

              <div className="mt-7 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["♙", "Expert Guidance", "Learn from practitioners"],
                  ["▤", "Practical Learning", "Property-based examples"],
                  ["▣", "Interactive Classes", "Ask questions and discuss"],
                  ["✧", "Course Guidance", "Choose a suitable program"],
                ].map(([icon, title, detail], index) => (
                  <motion.div
                    key={title}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.09 + 0.2 }}
                    className="flex items-center gap-2 rounded-xl border border-[#e5bc76]/30 bg-black/25 p-2.5 backdrop-blur-md"
                  >
                    <span className="text-xl text-[#edc985]">{icon}</span>
                    <div>
                      <p className="text-[11px] font-bold text-white">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-4 text-white/65">
                        {detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden w-64 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5bc76]/20 text-2xl text-[#edc985]">
                ✧
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#edc985]">
                Your Learning Journey
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-white">
                Knowledge with practical context.
              </h2>
              <p className="mt-3 text-xs leading-6 text-white/70">
                Explore foundational concepts, layout assessments, and
                real-world case discussions.
              </p>
              <a
                href="#programs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#edc985] transition hover:gap-3"
              >
                Find Your Program →
              </a>
            </motion.div>
          </div>
        </section>
        {/* PROGRAMS */}
        <section
          id="programs"
          className="scroll-mt-24 px-3 py-7 sm:px-6 lg:px-10"
        >
          <div className="mx-auto max-w-[1500px] rounded-2xl border border-[#eee4d4] bg-white p-3 shadow-sm sm:p-5">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <SectionHeading
                eyebrow="Find Your Learning Path"
                title="Our Training Programs"
                description="Explore options for structured learning, focused workshops, and personalized guidance."
              />
              <span className="mb-5 hidden text-xs text-[#796c5c] md:block">
                Choose the format that suits your goals
              </span>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              {courses.map((course, index) => {
                const enrollment = getEnrollmentForCourse(course.title);
                const isEnrolled = Boolean(enrollment);

                return (
                  <motion.article
                    key={course.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.5, delay: index * 0.09 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className="group relative isolate flex min-h-[270px] flex-col justify-between overflow-hidden rounded-2xl bg-[#21150c] p-5 sm:min-h-[290px] sm:p-6"
                  >
                    <div
                      className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url("${course.image}")` }}
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#170e07]/95 via-[#21150c]/80 to-[#21150c]/30" />

                    <div>
                      {isEnrolled ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow">
                          <span>✓</span> Enrolled
                        </span>
                      ) : course.tag ? (
                        <span className="inline-flex rounded-full bg-[#b77b29] px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                          ✦ {course.tag}
                        </span>
                      ) : null}

                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#edc985]">
                        {course.format}
                      </p>

                      <h3 className="mt-2 max-w-[290px] font-serif text-xl font-bold leading-tight text-[#f1cb7e] sm:text-2xl">
                        {course.title}
                      </h3>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-white/85">
                        {course.subtitle}
                      </p>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#f1cb7e]">
                          ₹{course.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-white/50 line-through">
                          ₹{course.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {course.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-[11px] leading-4 text-white/90"
                          >
                            <span className="text-[#edc985]">✦</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {isEnrolled ? (
                        <button
                          type="button"
                          onClick={() => openRegistration(course)}
                          className="mt-5 cursor-pointer inline-flex items-center gap-2 rounded-lg border border-emerald-400/60 bg-emerald-600/95 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500"
                        >
                          <span>✓ Enrolled · Access & WhatsApp</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openRegistration(course)}
                          className="mt-5 cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[#e5bc76]/50 bg-[#a56b27]/90 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#bf873b]"
                        >
                          Enroll Now
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
        {/* LEARNING OUTCOMES AND AUDIENCE */}
        <section className="px-4 pb-7 sm:px-7 lg:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-3 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-[#eee4d4] bg-white p-4 sm:p-5">
              <SectionHeading
                eyebrow="Learning Outcomes"
                title="What You Will Learn"
                description="Develop a structured understanding of Vastu topics through guided learning."
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {learning.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className="h-full rounded-xl bg-[#fcf8f0] p-3 text-center transition-colors hover:bg-[#f7ecd8]">
                      <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-[#ead3ac] bg-[#f8e8ca] text-xl text-[#a56b27]">
                        {item.icon}
                      </span>
                      <h3 className="mt-3 text-xs font-bold leading-5">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[10px] leading-5 text-[#796c5c]">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="rounded-2xl border border-[#e9deca] bg-[#f8f0e2] p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
                Who Can Join?
              </p>
              <h2 className="mt-1.5 font-serif text-2xl font-bold">
                A Path for Curious Minds
              </h2>

              <div className="mt-4 space-y-3">
                {audiences.map(([icon, title, detail]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#e8d4b1] bg-white text-lg text-[#a56b27]">
                      {icon}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold">{title}</h3>
                      <p className="mt-0.5 text-[11px] leading-5 text-[#796c5c]">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact?subject=Training%20Eligibility"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#9a6426] hover:gap-3"
              >
                Ask Which Course Suits You →
              </Link>
            </Reveal>
          </div>
        </section>
        {/* GALLERY */}
        <section className="px-4 pb-7 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <SectionHeading
              eyebrow="Learning Experience"
              title="A Glimpse Into Our Classes"
              description="Explore the kinds of learning environments and activities you may encounter during training."
            />

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {gallery.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className="group relative aspect-[1.25/1] overflow-hidden rounded-xl bg-[#e9dfd0]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />
                    <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-semibold text-white">
                      {item.title}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {/* TESTIMONIAL AND FAQ */}
        <section className="px-4 pb-8 sm:px-7 lg:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal className="rounded-2xl border border-[#eadcc4] bg-white p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
                Learner Experiences
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold">
                Student Feedback
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5"
                >
                  <span className="font-serif text-5xl leading-none text-[#d2ad70]">
                    “
                  </span>
                  <p className="mt-1 text-sm leading-7 text-[#655441]">
                    {testimonial.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-[#eee4d4] pt-4">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#f5e6ca] font-serif text-lg font-bold text-[#a56b27]">
                      {testimonial.name === "Student Feedback" ? "S" : "V"}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{testimonial.name}</p>
                      <p className="mt-1 text-[10px] text-[#887967]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex(
                      (current) =>
                        (current - 1 + testimonials.length) %
                        testimonials.length,
                    )
                  }
                  aria-label="Previous testimonial"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#dfc69f] text-[#a56b27] transition hover:bg-[#fff1d7]"
                >
                  ←
                </button>

                {testimonials.map((item, index) => (
                  <button
                    key={`${item.role}-${index}`}
                    type="button"
                    onClick={() => setTestimonialIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      testimonialIndex === index
                        ? "w-5 bg-[#a56b27]"
                        : "w-2 bg-[#dfd0b8]"
                    }`}
                  />
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex(
                      (current) => (current + 1) % testimonials.length,
                    )
                  }
                  aria-label="Next testimonial"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#dfc69f] text-[#a56b27] transition hover:bg-[#fff1d7]"
                >
                  →
                </button>
              </div>
              <p className="mt-3 text-[10px] leading-4 text-[#998b78]">
                Illustrative feedback placeholders — replace with verified
                student testimonials before publishing.
              </p>
            </Reveal>

            <Reveal className="rounded-2xl border border-[#eadcc4] bg-[#f8f1e6] p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
                Need More Information?
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold">
                Frequently Asked Questions
              </h2>

              <div className="mt-4 space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-[#e9dcc7] bg-white"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                      >
                        <span className="text-xs font-semibold leading-5">
                          {faq.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className="shrink-0 text-lg text-[#a56b27]"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.25,
                            }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-xs leading-6 text-[#796c5c]">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="relative isolate overflow-hidden bg-[#201409] px-4 py-8 sm:px-7 lg:px-12">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85')",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#201409] via-[#2b1b0c]/95 to-[#201409]/80" />

          <Reveal className="mx-auto flex max-w-[1500px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#e5bc76]">
                Begin Your Vastu Learning Journey
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                Take the Next Step in Your Vastu Journey
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Tell us your goals and discover which training program best fits
                your interests, experience, and schedule.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact?subject=Next%20Training%20Batch"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                View Next Batch Details <span>→</span>
              </Link>
              <Link
                href="/contact?subject=Training%20Enquiry"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <TrainingRegistrationModal
        open={registrationOpen}
        onClose={closeRegistration}
        course={selectedCourse}
        alreadyEnrolled={Boolean(getEnrollmentForCourse(selectedCourse?.title))}
        enrollmentData={getEnrollmentForCourse(selectedCourse?.title)}
        onEnrollmentSuccess={(newEnrollment) => {
          setUserEnrollments((prev) => [newEnrollment, ...prev]);
        }}
      />
    </>
  );
}

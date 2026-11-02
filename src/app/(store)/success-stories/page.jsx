"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const stories = [
  {
    category: "Residential",
    title: "Creating a More Harmonious Home",
    location: "Residential Property",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    challenge:
      "The homeowners wanted a structured assessment of their home's layout, room usage, and directional planning.",
    approach:
      "A residential Vastu assessment can review the floor plan, room placement, circulation, and practical improvement options.",
    outcome:
      "Use this space to describe the client's verified recommendations and documented experience.",
    icon: "⌂",
  },
  {
    category: "Commercial",
    title: "A Thoughtful Approach to Business Spaces",
    location: "Commercial Property",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
    challenge:
      "The business team wanted guidance on the arrangement and use of their workplace.",
    approach:
      "A commercial consultation can examine work areas, movement patterns, layout priorities, and the client's operational needs.",
    outcome:
      "Add the actual recommendations and any confirmed client feedback here.",
    icon: "▥",
  },
  {
    category: "Industrial",
    title: "Reviewing an Industrial Property Layout",
    location: "Industrial Property",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85",
    challenge:
      "The property team wanted a professional review of the site's layout and functional zones.",
    approach:
      "An industrial assessment may review the site plan, work zones, circulation, and feasible layout adjustments.",
    outcome:
      "Replace this text with the verified assessment summary and client-approved outcome.",
    icon: "⚙",
  },
  {
    category: "Site Visit",
    title: "On-Site Guidance for a Property",
    location: "On-Location Consultation",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    challenge:
      "The client wanted advice based on the property's actual layout and on-site conditions.",
    approach:
      "A site visit can combine property observations, layout discussion, and practical recommendations.",
    outcome: "Insert the real site-visit summary after client approval.",
    icon: "⌖",
  },
  {
    category: "Residential",
    title: "Planning a New Home With Greater Clarity",
    location: "New Residential Project",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    challenge:
      "The owners wanted guidance while planning the arrangement of spaces in a new home.",
    approach:
      "A consultation can consider the proposed floor plan, intended room functions, and the feasibility of possible changes.",
    outcome: "Add the client's actual planning decisions and feedback here.",
    icon: "⌂",
  },
  {
    category: "Commercial",
    title: "Planning a Welcoming Client-Facing Space",
    location: "Office & Business",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
    challenge:
      "The business wanted a considered layout for its reception, meeting areas, and daily operations.",
    approach:
      "The review can consider the existing layout, practical requirements, and opportunities to improve how the space is organized.",
    outcome:
      "Add verified project details and client feedback before publishing this story.",
    icon: "▥",
  },
];

const principles = [
  {
    icon: "⌖",
    title: "Understand the Property",
    text: "Start by understanding the building, its layout, the client's needs, and the purpose of the consultation.",
  },
  {
    icon: "▤",
    title: "Assess With Care",
    text: "Review the available floor plans, site details, and relevant Vastu considerations.",
  },
  {
    icon: "✧",
    title: "Recommend Practical Options",
    text: "Explain possible recommendations clearly, taking real-world constraints into account.",
  },
  {
    icon: "♧",
    title: "Support Informed Decisions",
    text: "Help clients understand their options so they can make decisions that suit their property and priorities.",
  },
];

const filters = [
  "All Stories",
  "Residential",
  "Commercial",
  "Industrial",
  "Site Visit",
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <Reveal className="mb-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b17a34]">
        {eyebrow}
      </p>
      <h2
        className={`mt-1.5 font-serif text-2xl font-bold leading-tight sm:text-3xl ${
          light ? "text-white" : "text-[#302116]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-2 max-w-2xl text-sm leading-6 ${
            light ? "text-white/70" : "text-[#796c5c]"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

function StoryCard({ story, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e9dfce] bg-white shadow-[0_3px_14px_rgba(55,37,16,0.04)] transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[1.65/1] overflow-hidden bg-[#e9dfce]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url("${story.image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
          {story.category}
        </span>

        <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-[#f8e7c5]/95 text-xl text-[#9c6728] shadow-md">
          {story.icon}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a56b27]">
          {story.location}
        </p>

        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-[#34271b]">
          {story.title}
        </h3>

        <p className="mt-2 text-xs leading-6 text-[#796c5c]">
          {story.challenge}
        </p>

        <div className="mt-4 border-t border-[#eee5d8] pt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#a56b27]">
            Our Approach
          </p>
          <p className="mt-1.5 text-xs leading-6 text-[#665747]">
            {story.approach}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <Link
            href={`/contact?subject=${encodeURIComponent(
              `Enquiry about ${story.category} Vastu consultation`,
            )}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#986122] transition-all hover:gap-3"
          >
            Discuss a Similar Project <span>→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function SuccessStoriesPage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All Stories");
  const [showAll, setShowAll] = useState(false);

  const filteredStories =
    activeFilter === "All Stories"
      ? stories
      : stories.filter((story) => story.category === activeFilter);

  const visibleStories = showAll
    ? filteredStories
    : filteredStories.slice(0, 3);

  return (
    <main className="overflow-hidden bg-[#fcfaf5] text-[#302116]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#21150c]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#170e07]/95 via-[#20140b]/80 to-[#20140b]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#21150c]/45 to-transparent" />

        <div className="mx-auto grid max-w-[1500px] items-center gap-7 px-5 py-11 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.7fr] lg:px-12 lg:py-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-2 text-xs text-white/70">
              <Link href="/" className="transition hover:text-[#edc985]">
                Home
              </Link>
              <span>›</span>
              <span className="text-[#edc985]">Success Stories</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#edc985]">
              Thoughtful Spaces · Practical Guidance
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              Every Space Has
              <span className="block text-[#e5bc76]">a Story to Tell.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              Explore how a thoughtful property assessment and practical Vastu
              guidance can help people approach their homes, workplaces, and
              projects with greater clarity.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#stories"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore Stories <span>↓</span>
              </a>
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#edc985]">
              The Way We Work
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
              Listen carefully.
              <br />
              Assess thoughtfully.
              <br />
              Recommend practically.
            </h2>

            <div className="mt-5 space-y-3">
              {[
                "Understand the property and its requirements",
                "Review layouts and relevant Vastu considerations",
                "Discuss practical options with the client",
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#e5bc76]/50 bg-[#e5bc76]/10 text-xs text-[#edc985]">
                    {index + 1}
                  </span>
                  <p className="text-xs leading-5 text-white/80">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 border-t border-white/15 pt-4 text-[10px] leading-5 text-white/55">
              Each property is different. Recommendations depend on its specific
              layout, context, and client requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="relative z-10 -mt-4 px-3 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e9decb] bg-[#e9decb] shadow-lg sm:grid-cols-4">
          {[
            ["⌂", "Residential", "Homes & apartments"],
            ["▥", "Commercial", "Offices & businesses"],
            ["⚙", "Industrial", "Functional property layouts"],
            ["⌖", "Site Visits", "On-location assessments"],
          ].map(([icon, title, detail], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <div className="flex h-full items-center gap-3 bg-white px-3 py-4 sm:px-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f8e9cd] text-xl text-[#a56b27]">
                  {icon}
                </span>
                <div>
                  <h3 className="text-xs font-bold">{title}</h3>
                  <p className="mt-1 text-[10px] leading-4 text-[#796c5c]">
                    {detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORIES GRID */}
      <section id="stories" className="scroll-mt-24 px-3 py-9 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            eyebrow="Projects & Experiences"
            title="Explore Our Success Stories"
            description="Browse property categories and learn about the assessment process behind each type of consultation."
          />

          <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "border-[#a56b27] bg-[#a56b27] text-white shadow-md"
                    : "border-[#e6d9c4] bg-white text-[#725b3f] hover:border-[#c5a16a] hover:bg-[#fff5e5]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleStories.map((story, index) => (
                <StoryCard key={story.title} story={story} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStories.length > 3 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="rounded-xl border border-[#d9c3a0] bg-white px-5 py-3 text-xs font-bold text-[#8c5b25] transition hover:bg-[#fff4df]"
              >
                {showAll ? "Show Fewer Stories ↑" : "Explore More Stories ↓"}
              </button>
            </div>
          )}

          <p className="mt-5 rounded-xl border border-[#e9dfce] bg-[#f8f1e6] px-4 py-3 text-[10px] leading-5 text-[#796c5c]">
            <strong>Editorial note:</strong> These story layouts are
            illustrative templates, not verified case studies. Replace the
            sample descriptions with documented projects and obtain client
            permission before publishing names, photographs, testimonials, or
            specific outcomes.
          </p>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-[#f4ecdf] px-4 py-9 sm:px-7 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            eyebrow="Our Consultation Philosophy"
            title="A Clear Process, From First Conversation to Recommendations"
            description="Every consultation starts with understanding the client's needs and ends with a clearer view of possible next steps."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="h-full rounded-2xl border border-[#e5d6bd] bg-white p-5 transition-shadow hover:shadow-lg"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f8e9cd] font-serif text-2xl text-[#a56b27]">
                    {principle.icon}
                  </span>
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#b17a34]">
                    Step 0{index + 1}
                  </div>
                  <h3 className="mt-1.5 font-serif text-lg font-bold">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#796c5c]">
                    {principle.text}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-3 py-9 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-3xl border border-[#e9dfce] bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[340px] overflow-hidden bg-[#21150c] sm:min-h-[430px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=90')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1209]/90 via-[#1c1209]/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#edc985]">
                Founder & Vastu Consultant
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
                Ar. Kuldeep Swami
              </h2>
              <p className="mt-2 text-xs text-white/75">
                Bhuwneshwari Scientific Vastu
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#a56b27]">
                Meet the Founder
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                Guided by Experience.
                <span className="block text-[#a56b27]">
                  Focused on Practicality.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#665747]">
                Bhuwneshwari Scientific Vastu is led by Ar. Kuldeep Swami. The
                practice brings together Vastu consultation and architectural
                perspectives to help clients assess their residential,
                commercial, and industrial spaces.
              </p>

              <p className="mt-3 text-sm leading-7 text-[#665747]">
                The consultation approach focuses on understanding each
                property's layout, listening to the client's priorities, and
                explaining recommendations in a clear and practical way. Every
                property has different requirements, so the assessment should
                reflect its individual context.
              </p>

              <blockquote className="mt-5 border-l-2 border-[#bd8b45] bg-[#fcf7ee] px-4 py-3 font-serif text-base italic leading-7 text-[#76532d]">
                “A thoughtful space begins with understanding the people who
                live and work in it.”
              </blockquote>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#a56b27] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#89551f]"
                >
                  About Our Practice →
                </Link>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#ddc7a3] px-5 py-3 text-xs font-bold text-[#8c5b25] transition hover:bg-[#fff4df]"
                >
                  Book a Consultation
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <p className="mx-auto mt-2 max-w-[1500px] text-[10px] leading-5 text-[#998b78]">
          Replace the sample portrait with an approved photograph of Ar. Kuldeep
          Swami. Add verified qualifications, professional history, and
          experience details before publishing.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden bg-[#201409] px-4 py-9 sm:px-7 lg:px-12">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#201409] via-[#2b1b0c]/95 to-[#201409]/80" />

        <Reveal className="mx-auto flex max-w-[1500px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#e5bc76]">
              Your Property. Your Questions. A Personal Consultation.
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-white sm:text-4xl">
              Let’s Explore What Works for Your Space.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Speak with our team about your home, office, business, or upcoming
              property project.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book Your Consultation →
            </Link>
            <Link
              href="/contact?subject=Share%20My%20Success%20Story"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Share Your Story
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

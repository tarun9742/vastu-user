"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const services = [
  {
    slug: "residential-vastu",
    title: "Residential Vastu",
    subtitle: "Create a Home That Feels Balanced",
    description:
      "Thoughtful Vastu consultation for apartments, independent houses, villas, and new residential projects.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    icon: "⌂",
    intro:
      "Your home is where everyday life unfolds. Our residential Vastu consultation considers your property's layout, orientation, room arrangement, and practical requirements to help you make informed decisions.",
    highlights: [
      [
        "⌂",
        "Entrance & Layout",
        "Review the entrance, circulation, and overall floor plan.",
      ],
      [
        "▦",
        "Room Planning",
        "Discuss bedrooms, kitchens, living areas, and functional zones.",
      ],
      [
        "☼",
        "Light & Ventilation",
        "Consider natural light, airflow, and everyday comfort.",
      ],
      [
        "✧",
        "Practical Guidance",
        "Explore suitable adjustments for your existing property.",
      ],
    ],
    benefits: [
      "Review your floor plan and property orientation.",
      "Understand traditional Vastu considerations for different rooms.",
      "Discuss practical options for existing homes and new projects.",
      "Prioritize adjustments based on feasibility and your requirements.",
    ],
    audience:
      "Homeowners, families purchasing a new property, people planning renovations, and anyone seeking guidance on residential layouts.",
    process: [
      [
        "Share Your Requirements",
        "Tell us about your home, concerns, and goals.",
      ],
      ["Property Assessment", "Share available plans and property details."],
      ["Consultation", "Discuss the layout and relevant Vastu considerations."],
      [
        "Recommendations",
        "Review practical next steps and possible adjustments.",
      ],
    ],
    faqs: [
      [
        "Can you assess an existing home?",
        "Yes. You can request a consultation for an existing house, apartment, villa, or residential property.",
      ],
      [
        "What should I share before the consultation?",
        "A floor plan, property address or location, orientation if known, and your main questions are useful starting points.",
      ],
      [
        "Do I need to make structural changes?",
        "Not necessarily. Recommendations depend on the property. Any structural or technical work should be reviewed by qualified professionals.",
      ],
    ],
  },
  {
    slug: "commercial-vastu",
    title: "Commercial Vastu",
    subtitle: "Thoughtful Spaces for Business",
    description:
      "Vastu consultation for offices, shops, showrooms, studios, and other commercial properties.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
    icon: "▥",
    intro:
      "Commercial spaces need to support people, customers, and day-to-day operations. Our consultation considers the property layout, entrances, work areas, and business requirements alongside traditional Vastu principles.",
    highlights: [
      [
        "▥",
        "Office Layout",
        "Review workstations, departments, and shared spaces.",
      ],
      [
        "⌖",
        "Entrance & Access",
        "Consider arrival points, circulation, and customer access.",
      ],
      [
        "♧",
        "Functional Zones",
        "Discuss cabins, meeting rooms, reception, and storage.",
      ],
      [
        "✧",
        "Practical Planning",
        "Explore feasible options before making major changes.",
      ],
    ],
    benefits: [
      "Review the commercial floor plan and property orientation.",
      "Discuss reception, work areas, meeting rooms, and functional zones.",
      "Consider customer movement and daily business operations.",
      "Identify possible adjustments before renovation or fit-out work.",
    ],
    audience:
      "Business owners, entrepreneurs, office managers, retailers, commercial property investors, and people planning a new workspace.",
    process: [
      [
        "Business Brief",
        "Explain the business type and how the space will be used.",
      ],
      [
        "Layout Review",
        "Share the floor plan, entrance, and property details.",
      ],
      [
        "Consultation",
        "Discuss Vastu considerations alongside operational needs.",
      ],
      [
        "Action Plan",
        "Review potential changes and their practical limitations.",
      ],
    ],
    faqs: [
      [
        "Which commercial properties can be assessed?",
        "Offices, retail stores, showrooms, studios, and many other commercial premises can be considered.",
      ],
      [
        "Can you review a property before leasing it?",
        "Yes. Share the available layout and your business requirements to discuss the property before committing to major changes.",
      ],
      [
        "Will recommendations guarantee business growth?",
        "No consultation can guarantee business outcomes. Guidance focuses on property planning and traditional Vastu considerations.",
      ],
    ],
  },
  {
    slug: "industrial-vastu",
    title: "Industrial Vastu",
    subtitle: "Plan Industrial Spaces With Clarity",
    description:
      "Property-specific consultation for factories, warehouses, manufacturing facilities, and industrial sites.",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1800&q=85",
    icon: "⚙",
    intro:
      "Industrial properties have complex operational requirements. Our consultation considers the site plan, functional zones, access, equipment areas, and intended workflow while reviewing relevant traditional Vastu principles.",
    highlights: [
      [
        "⚙",
        "Production Zones",
        "Review the proposed arrangement of operational areas.",
      ],
      [
        "▤",
        "Site Planning",
        "Discuss the plot, layout, access, and functional spaces.",
      ],
      [
        "⇄",
        "Workflow",
        "Consider circulation and movement across the property.",
      ],
      [
        "⌂",
        "Facility Layout",
        "Review offices, storage, and supporting facilities.",
      ],
    ],
    benefits: [
      "Review site plans and available industrial layouts.",
      "Discuss production areas, storage, administration, and access.",
      "Consider operational flow when evaluating proposed adjustments.",
      "Identify questions to resolve before planned construction or renovation.",
    ],
    audience:
      "Factory owners, industrial developers, warehouse operators, manufacturers, and businesses planning industrial premises.",
    process: [
      ["Project Brief", "Share the industry, project stage, and intended use."],
      [
        "Site Information",
        "Provide site plans, dimensions, and available layouts.",
      ],
      [
        "Detailed Review",
        "Discuss functional areas and relevant Vastu considerations.",
      ],
      [
        "Recommendations",
        "Review possible next steps with your technical team.",
      ],
    ],
    faqs: [
      [
        "Can an existing factory be assessed?",
        "Yes. Existing industrial premises can be reviewed using available plans, site information, and your specific concerns.",
      ],
      [
        "Do you assess large industrial plots?",
        "You can submit the project details for an initial discussion about the scope and requirements.",
      ],
      [
        "Can Vastu recommendations override safety requirements?",
        "No. Structural integrity, industrial safety, fire protection, equipment specifications, and applicable regulations always take priority.",
      ],
    ],
  },
  {
    slug: "site-visit",
    title: "Site Visit (On Location)",
    subtitle: "Understand Your Property Firsthand",
    description:
      "An on-site Vastu consultation to review your property, discuss concerns, and understand the available options.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    icon: "⌖",
    intro:
      "Some property questions are easier to discuss in person. An on-location visit allows the consultation to consider the actual site, its layout, surroundings, access points, and the concerns you want to address.",
    highlights: [
      ["⌖", "On-Site Review", "Discuss the property directly at the location."],
      [
        "▤",
        "Layout Discussion",
        "Review plans and relevant areas of the building.",
      ],
      [
        "☼",
        "Site Observations",
        "Consider orientation and visible site conditions.",
      ],
      ["✧", "Personal Guidance", "Discuss findings and potential next steps."],
    ],
    benefits: [
      "Discuss the property at its actual location.",
      "Review the available floor plan and site information together.",
      "Ask questions about specific rooms, zones, or layout concerns.",
      "Understand possible adjustments and any further assessment required.",
    ],
    audience:
      "Property owners, homebuyers, business owners, and clients whose requirements are better suited to an in-person visit.",
    process: [
      [
        "Request a Visit",
        "Tell us about the property and the purpose of the visit.",
      ],
      [
        "Confirm Location",
        "Share the full address and preferred appointment date.",
      ],
      [
        "Schedule the Visit",
        "Our team must confirm availability and travel arrangements.",
      ],
      ["Site Consultation", "Review the property and discuss recommendations."],
    ],
    faqs: [
      [
        "Is a site visit available outside Jaipur?",
        "Travel availability depends on the property location and schedule. Submit your address to discuss arrangements.",
      ],
      [
        "Are travel charges included?",
        "Travel, accommodation, tolls, and other applicable expenses may be additional. Confirm the final quotation before booking.",
      ],
      [
        "What should I prepare for the visit?",
        "Keep your floor plan, property details, photographs if available, and a list of questions ready.",
      ],
    ],
  },
  {
    slug: "vastu-for-single-person",
    title: "Vastu for Single Person",
    subtitle: "Personalized Guidance for Your Space",
    description:
      "Vastu consultation for individuals, rented apartments, studio homes, personal rooms, and compact living spaces.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    icon: "♙",
    intro:
      "A personal living space should work for your lifestyle, routine, and available budget. This consultation focuses on your individual property and the questions you have about its layout and everyday use.",
    highlights: [
      [
        "⌂",
        "Personal Space",
        "Review a room, studio, apartment, or compact home.",
      ],
      [
        "▤",
        "Furniture Placement",
        "Discuss the arrangement of key furniture and zones.",
      ],
      [
        "☼",
        "Everyday Comfort",
        "Consider lighting, ventilation, and room usage.",
      ],
      [
        "✧",
        "Flexible Guidance",
        "Explore suitable options for rented or owned spaces.",
      ],
    ],
    benefits: [
      "Discuss Vastu questions specific to your personal living space.",
      "Review furniture placement and the use of available rooms.",
      "Consider options that suit rented properties and limited budgets.",
      "Understand practical changes without assuming major renovation is needed.",
    ],
    audience:
      "Individuals living alone, tenants, students, professionals, studio apartment residents, and people planning a compact home.",
    process: [
      [
        "Tell Us About Your Space",
        "Explain your living arrangement and main questions.",
      ],
      [
        "Share Details",
        "Provide photographs, measurements, or a floor plan if available.",
      ],
      [
        "Personal Consultation",
        "Discuss your property and relevant Vastu considerations.",
      ],
      [
        "Practical Next Steps",
        "Review options suited to your space and circumstances.",
      ],
    ],
    faqs: [
      [
        "Can I get guidance for a rented apartment?",
        "Yes. You can discuss the existing layout and focus on practical, reversible options where appropriate.",
      ],
      [
        "Do I need a complete floor plan?",
        "A floor plan is helpful but not always essential for the initial discussion. Photos and approximate measurements may also help.",
      ],
      [
        "Can the consultation be online?",
        "Ask the team about online consultation availability when submitting your appointment request.",
      ],
    ],
  },
];

const serviceLinks = [
  { slug: "residential-vastu", label: "Residential Vastu" },
  { slug: "commercial-vastu", label: "Commercial Vastu" },
  { slug: "industrial-vastu", label: "Industrial Vastu" }, 
  { slug: "site-visit", label: "Site Visit" },
  { slug: "vastu-for-single-person", label: "Vastu for Single Person" },
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Heading({ eyebrow, title, description }) {
  return (
    <Reveal className="mb-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-[#302116] sm:text-3xl">
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

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const service = services.find((item) => item.slug === slug);
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return (
      <main className="grid min-h-[55vh] place-items-center bg-[#fcfaf5] px-5">
        <div className="max-w-md text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a56b27]">
            Service Not Found
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold">
            Let's find the right service
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#796c5c]">
            Select a consultation service to explore its details.
          </p>
          <Link
            href="/#services"
            className="mt-5 inline-flex rounded-xl bg-[#a56b27] px-5 py-3 text-sm font-bold text-white"
          >
            Explore Services
          </Link>
        </div>
      </main>
    );
  }

  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main className="overflow-hidden bg-[#fcfaf5] text-[#302116]">
      {/* Compact hero */}
      <section className="relative isolate overflow-hidden bg-[#24170c]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${service.image}")` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1e130a]/95 via-[#1e130a]/80 to-[#1e130a]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1e130a]/35 to-transparent" />

        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Link href="/" className="hover:text-[#f0ca87]">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-[#f0ca87]">
                Our Services
              </Link>
              <span>/</span>
              <span className="text-[#f0ca87]">{service.title}</span>
            </div>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e4bc79]/35 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#edc985] backdrop-blur-md">
              <span>{service.icon}</span>
              Personalized Vastu Solutions
            </span>

            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {service.title}
              <span className="mt-1 block text-[#e5bc76]">
                {service.subtitle}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              {service.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book a Consultation <span>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Ask a Question
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="hidden h-36 w-36 place-items-center rounded-full border border-[#e8c786]/45 bg-white/10 text-6xl text-[#f0ca87] shadow-2xl backdrop-blur-xl lg:grid"
          >
            {service.icon}
          </motion.div>
        </div>
      </section>

      {/* Compact value strip */}
      <section className="border-b border-[#e9dfcf] bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-[#eee5d8] px-4 sm:grid-cols-4 sm:divide-y-0 sm:px-8 lg:px-12">
          {[
            ["✧", "Personalized", "Property-specific guidance"],
            ["⌂", "Practical", "Property-focused discussion"],
            ["▤", "Detailed Review", "Layout and requirements"],
            ["✓", "Clear Next Steps", "Understand your options"],
          ].map(([icon, title, detail], index) => (
            <Reveal key={title} delay={index * 0.06} className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f7ead2] text-xl text-[#a56b27]">
                  {icon}
                </span>
                <div>
                  <p className="text-xs font-bold sm:text-sm">{title}</p>
                  <p className="mt-1 text-[10px] leading-4 text-[#887967] sm:text-xs">
                    {detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Intro and highlights */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-start gap-7 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
              About This Service
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight">
              A Considered Approach to Your Property
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#796c5c]">
              {service.intro}
            </p>
            <div className="mt-5 flex items-center gap-3 border-l-2 border-[#b18443] bg-[#f5eddf] p-4">
              <span className="text-2xl text-[#a56b27]">✧</span>
              <p className="text-xs leading-6 text-[#6f5b43]">
                Guidance is tailored to your property and requirements.
                Recommendations depend on the available information and
                practical constraints.
              </p>
            </div>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {service.highlights.map(([icon, title, detail]) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="rounded-2xl border border-[#e9dfce] bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7ead2] font-serif text-xl text-[#a56b27]">
                  {icon}
                </span>
                <h3 className="mt-3 font-serif text-lg font-bold">{title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-[#796c5c]">
                  {detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-[#eee4d3] bg-[#f5efe4] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-center gap-7 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
              What We Cover
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Guidance That Starts With Your Needs
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#796c5c]">
              Every property is different. We begin by understanding your
              questions, reviewing the available details, and discussing
              practical options.
            </p>
            <Link
              href="/appointment"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#a56b27] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#85521e]"
            >
              Discuss Your Property →
            </Link>
          </Reveal>

          <div className="grid gap-2 sm:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={index * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-[#e6dac6] bg-white p-4">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f4e4c5] text-xs font-bold text-[#a56b27]">
                    ✓
                  </span>
                  <p className="text-sm leading-6 text-[#655441]">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <Reveal className="mx-auto max-w-[1400px]">
          <div className="relative isolate overflow-hidden rounded-2xl bg-[#24170c] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
              style={{ backgroundImage: `url("${service.image}")` }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21160d]/95 to-[#4b2c13]/80" />

            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e5bc76]">
                Is This Right for You?
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                Who Can Benefit From This Consultation?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/75">
                {service.audience}
              </p>
            </div>

            <Link
              href="/appointment"
              className="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 lg:mt-0"
            >
              Book an Appointment →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Heading
            eyebrow="Simple & Structured"
            title="Your Consultation Journey"
            description="A straightforward process from your first enquiry to discussing possible next steps."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map(([title, detail], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <div className="relative h-full rounded-2xl border border-[#e8decd] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#e0c69c]">
                      0{index + 1}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f6ead3] text-[#a56b27]">
                      {["↗", "▤", "✧", "✓"][index]}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#796c5c]">
                    {detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#eee4d3] bg-[#f7f1e7] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] items-start gap-7 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Questions, Answered
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#796c5c]">
              Have another question? Contact our team to discuss your property
              and the consultation that suits your needs.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-sm font-bold text-[#9e6829] hover:underline"
            >
              Contact Us →
            </Link>
          </Reveal>

          <div className="space-y-2">
            {service.faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={question}
                  className="overflow-hidden rounded-xl border border-[#e8decd] bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="text-sm font-semibold text-[#413326]">
                      {question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="shrink-0 text-xl text-[#a56b27]"
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
                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm leading-7 text-[#796c5c] sm:px-5">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
                Explore More
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                Other Vastu Services
              </h2>
            </div>
            <Link
              href="/#services"
              className="text-sm font-semibold text-[#9e6829] hover:underline"
            >
              All Services →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.slice(0, 4).map((item) => (
              <motion.div
                key={item.slug}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="group rounded-xl border border-[#e8decd] bg-white p-4 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f6ead3] text-xl text-[#a56b27]">
                    {item.icon}
                  </span>
                  <h3 className="font-serif text-base font-bold">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-5 text-[#796c5c]">
                  {item.description}
                </p>
                <Link
                  href={`/services/${item.slug}`}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#9e6829] transition-all hover:gap-3"
                >
                  Explore Service →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12">
        <Reveal className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 rounded-2xl border border-[#d7bc8e] bg-gradient-to-r from-[#f8e9ca] via-[#fffaf0] to-[#f3e3c4] p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a56b27]">
                Take the Next Step
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                Let's Discuss Your Property
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#796c5c]">
                Share your requirements and request a personalized consultation.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#a56b27] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#87531d]"
              >
                Book Now →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-[#c9aa78] bg-white/80 px-5 py-3 text-sm font-semibold text-[#79542a] transition hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const articles = [
  {
    id: 1,
    slug: "vastu-for-a-harmonious-home",
    title: "Vastu for a Harmonious Home: A Practical Guide",
    category: "Residential Vastu",
    date: "2026-09-24",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "Explore practical ways to think about room layouts, natural light, entrances, and everyday living spaces through the principles of Vastu.",
    intro:
      "A home is more than a building. It is a space for everyday routines, family life, rest, and personal growth. Vastu Shastra offers a traditional framework for thinking about spatial arrangement and the relationship between a building and its surroundings.",
    sections: [
      {
        id: "understanding-vastu",
        title: "Understanding Vastu for the Home",
        paragraphs: [
          "Vastu Shastra is a traditional Indian approach to architecture and spatial planning. It considers factors such as directions, room arrangement, proportions, and the use of different areas within a property.",
          "When considering Vastu for a home, start by understanding the existing layout and how each room is used. Practical needs, building regulations, ventilation, and safety should remain central to any planning decision.",
        ],
      },
      {
        id: "entrance-and-layout",
        title: "The Entrance and Overall Layout",
        paragraphs: [
          "The entrance is an important part of how people experience a home. Keep access routes clear, provide suitable lighting, and consider how the entrance connects with the rest of the property.",
          "Review the overall circulation of the home. A thoughtfully planned layout makes it easier to move between rooms and helps each area serve its intended purpose.",
        ],
      },
      {
        id: "light-and-ventilation",
        title: "Natural Light and Ventilation",
        paragraphs: [
          "Daylight and airflow are important considerations in residential design. Window placement, shading, room orientation, and the surrounding buildings can influence how a home feels throughout the day.",
          "Where possible, prioritize comfortable lighting, fresh air, appropriate shading, and a layout that supports the needs of the household.",
        ],
      },
      {
        id: "room-planning",
        title: "Planning Rooms for Everyday Living",
        paragraphs: [
          "Each room should be planned around its purpose. Consider privacy, storage, furniture dimensions, access, and the routines of the people using the space.",
          "Traditional Vastu principles can be discussed alongside these practical requirements. Any proposed change should be evaluated for feasibility, cost, and structural or electrical implications before work begins.",
        ],
      },
      {
        id: "professional-guidance",
        title: "When to Seek Professional Guidance",
        paragraphs: [
          "A professional assessment may help when purchasing a property, planning a renovation, designing a new home, or reviewing a layout that raises specific concerns.",
          "Prepare a floor plan, photographs, the property orientation if known, and a list of your priorities. These details help make a consultation more focused and useful.",
        ],
      },
    ],
    conclusion:
      "A considered approach to your home begins with understanding the space you have, the way you use it, and the changes that are realistically possible. Vastu guidance can be explored alongside sound architectural planning to help you make informed decisions.",
  },
  {
    id: 2,
    slug: "vastu-for-business-and-offices",
    title: "Vastu for Business: Planning a More Balanced Workspace",
    category: "Commercial Vastu",
    date: "2026-09-18",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "Learn about workspace arrangement, circulation, lighting, and other practical considerations for commercial environments.",
    intro:
      "A well-planned workplace supports everyday operations, movement, collaboration, and concentration. Vastu consultation for commercial spaces considers traditional spatial principles alongside the actual needs of a business.",
    sections: [
      {
        id: "workspace-planning",
        title: "Start With Your Business Requirements",
        paragraphs: [
          "Before reviewing Vastu principles, identify the essential functions of the workplace. Consider staff numbers, customer access, meeting areas, storage, equipment, and operational workflows.",
          "A clear brief makes it easier to evaluate the existing layout and understand which adjustments may be practical.",
        ],
      },
      {
        id: "entrance-and-movement",
        title: "Entrances and Movement",
        paragraphs: [
          "The entrance influences how employees, visitors, and deliveries move through the premises. Clear circulation routes and an accessible arrival area help support a more organized environment.",
          "Any layout recommendations should account for accessibility, fire exits, building requirements, and the daily flow of work.",
        ],
      },
      {
        id: "light-and-workstations",
        title: "Lighting and Workstation Planning",
        paragraphs: [
          "Consider daylight, glare, artificial lighting, acoustics, and the placement of workstations. These factors can influence comfort and how effectively a space serves different tasks.",
          "Discuss workstation positions in the context of the actual floor plan, available services, and the needs of employees.",
        ],
      },
      {
        id: "commercial-assessment",
        title: "Reviewing a Commercial Property",
        paragraphs: [
          "A useful assessment considers the property orientation, floor plan, access points, functional zones, and any proposed renovation work.",
          "A consultant can help you understand potential adjustments and their practical implications before committing to significant changes.",
        ],
      },
    ],
    conclusion:
      "Commercial Vastu consultation works best when it starts with a clear understanding of the business. Combine spatial guidance with practical design, accessibility, and operational requirements.",
  },
  {
    id: 3,
    slug: "understanding-the-five-elements-in-vastu",
    title: "Understanding the Five Elements in Vastu Shastra",
    category: "Vastu Tips",
    date: "2026-09-12",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "An introduction to the traditional concepts of earth, water, fire, air, and space and their role in Vastu philosophy.",
    intro:
      "The five elements, often described as earth, water, fire, air, and space, are an important part of several Indian philosophical traditions. In Vastu discussions, they provide a traditional lens for considering the qualities and organization of a space.",
    sections: [
      {
        id: "earth",
        title: "Earth: Stability and Grounding",
        paragraphs: [
          "Earth is traditionally associated with stability, solidity, and a sense of grounding. In the context of a property, these ideas can prompt reflection on structural soundness, materials, and how a space feels to use.",
          "Always rely on qualified professionals for structural assessments and construction decisions.",
        ],
      },
      {
        id: "water",
        title: "Water: Flow and Resource Planning",
        paragraphs: [
          "Water is traditionally connected with flow and adaptability. In a building, water-related planning also includes drainage, plumbing, access to clean water, and the appropriate placement of wet areas.",
          "Practical plumbing, hygiene, and maintenance requirements should guide technical decisions.",
        ],
      },
      {
        id: "fire",
        title: "Fire: Energy and Illumination",
        paragraphs: [
          "Fire is associated with transformation, warmth, and illumination. Lighting design, kitchen planning, and the safe use of electrical and cooking equipment are useful practical topics to review.",
          "Electrical installations and fire-safety measures should always meet relevant codes and professional standards.",
        ],
      },
      {
        id: "air",
        title: "Air: Movement and Ventilation",
        paragraphs: [
          "Air represents movement and exchange in traditional descriptions of the elements. In contemporary building design, ventilation, indoor air quality, and comfortable airflow are important considerations.",
          "A good ventilation strategy should suit the climate, occupancy, and intended use of the property.",
        ],
      },
      {
        id: "space",
        title: "Space: Openness and Organization",
        paragraphs: [
          "Space is often associated with openness and the room available for movement and activity. Thoughtful furniture placement, clear pathways, and appropriate storage can help make an interior more usable.",
          "These traditional associations offer a way to discuss spatial planning, rather than a substitute for technical building analysis.",
        ],
      },
    ],
    conclusion:
      "The five elements offer a traditional framework for discussing space. When applying these ideas to a property, combine cultural context with practical design, safety, and building requirements.",
  },
  {
    id: 4,
    slug: "vastu-tips-for-a-new-home",
    title: "Moving Into a New Home? Vastu Points to Consider",
    category: "Residential Vastu",
    date: "2026-09-05",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "A helpful checklist of layout, orientation, ventilation, and planning considerations when evaluating a new home.",
    intro:
      "Buying or moving into a new home is a good opportunity to review how the property suits your needs. If you want to consider Vastu principles, begin with a clear understanding of the layout, direction, and practical possibilities.",
    sections: [
      {
        id: "review-the-plan",
        title: "Review the Floor Plan",
        paragraphs: [
          "Ask for an accurate floor plan and note the entrance, bedrooms, kitchen, bathrooms, windows, and main circulation routes. Verify measurements where possible.",
          "If orientation is important to your assessment, establish the property's directions using reliable site information rather than guessing from a photograph.",
        ],
      },
      {
        id: "inspect-the-property",
        title: "Inspect the Property",
        paragraphs: [
          "Check natural light, ventilation, moisture, maintenance needs, noise, and the general condition of the building. These practical checks are valuable regardless of the Vastu approach you choose.",
          "A property inspection by qualified professionals can identify concerns that need attention before purchase or renovation.",
        ],
      },
      {
        id: "plan-changes",
        title: "Prioritize Possible Adjustments",
        paragraphs: [
          "List the changes you are considering and separate cosmetic adjustments from work involving walls, plumbing, electrical systems, or structure.",
          "Before making major changes, check feasibility, permissions, safety, and cost with the appropriate professionals.",
        ],
      },
    ],
    conclusion:
      "A checklist and an accurate floor plan can make a Vastu discussion more useful. Start with the property's actual condition and prioritize safe, feasible decisions.",
  },
  {
    id: 5,
    slug: "natural-light-and-space-planning",
    title: "Natural Light, Ventilation and Thoughtful Space Planning",
    category: "Architecture",
    date: "2026-08-28",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "Discover why daylight, airflow, circulation, and the way a space is used deserve attention in architectural planning.",
    intro:
      "Good space planning considers more than appearance. Daylight, ventilation, circulation, privacy, and the intended use of each room all influence how a building performs in everyday life.",
    sections: [
      {
        id: "daylight",
        title: "Designing for Natural Light",
        paragraphs: [
          "The amount and quality of daylight entering a room depend on orientation, window size, shading, surrounding buildings, and the local climate.",
          "Well-considered daylight can reduce reliance on artificial lighting during the day, although glare and overheating also need to be managed.",
        ],
      },
      {
        id: "ventilation",
        title: "Making Airflow a Priority",
        paragraphs: [
          "Ventilation helps manage indoor air quality and comfort. Window placement, cross-ventilation opportunities, mechanical systems, and the building's occupancy all matter.",
          "A ventilation approach should meet the building's technical requirements and suit the local environment.",
        ],
      },
      {
        id: "circulation",
        title: "Creating Useful Circulation",
        paragraphs: [
          "A clear route between rooms makes a property easier to use. Avoid unnecessary obstructions and consider how people, furniture, and equipment will move through the space.",
          "Accessibility and emergency egress should be incorporated from the beginning of the design process.",
        ],
      },
    ],
    conclusion:
      "Thoughtful space planning combines comfort, function, and the qualities of the site. These practical principles can be considered alongside a traditional Vastu assessment.",
  },
  {
    id: 6,
    slug: "understanding-vastu-remedies",
    title: "Understanding Vastu Remedies and Practical Adjustments",
    category: "Vastu Remedies",
    date: "2026-08-21",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "A measured look at assessing a property and discussing suitable adjustments before making major changes.",
    intro:
      "When people have concerns about the Vastu of a property, they often want to know which adjustments are possible. A careful review starts by identifying the concern, understanding the building, and distinguishing practical changes from more extensive work.",
    sections: [
      {
        id: "assess-first",
        title: "Assess Before Making Changes",
        paragraphs: [
          "Gather the floor plan, photographs, orientation information, and a list of specific questions. A clear assessment helps keep the discussion focused on the actual property.",
          "Avoid making expensive changes based on assumptions or incomplete information.",
        ],
      },
      {
        id: "consider-options",
        title: "Consider Different Options",
        paragraphs: [
          "Depending on the property, possible adjustments might involve furniture arrangement, use of a room, lighting, organization, or more substantial design work.",
          "Any change involving structure, wiring, plumbing, or fire safety should be reviewed by an appropriately qualified professional.",
        ],
      },
      {
        id: "set-priorities",
        title: "Set Realistic Priorities",
        paragraphs: [
          "Discuss the expected scope, cost, practical benefit, and limitations of each proposed change. Some recommendations may be simple; others may not be feasible within the existing building.",
          "A transparent process helps property owners decide what to do, when to do it, and which specialists they may need.",
        ],
      },
    ],
    conclusion:
      "A measured, property-specific approach is preferable to making rushed changes. Discuss options clearly and keep building safety and feasibility at the centre of the process.",
  },
  {
    id: 7,
    slug: "planning-a-commercial-property",
    title: "Planning a Commercial Property: What to Review First",
    category: "Commercial Vastu",
    date: "2026-08-14",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "Review key planning topics including entrances, movement through the building, functional zones, and workspace needs.",
    intro:
      "Commercial properties need to support the people, equipment, and activities that make a business work. A Vastu review can form part of a wider planning conversation about the site's layout and intended use.",
    sections: [
      {
        id: "business-needs",
        title: "Understand the Business",
        paragraphs: [
          "Identify the primary activities, staffing needs, customer access, storage, meeting requirements, and specialist equipment before reviewing a commercial layout.",
          "The business brief provides context for evaluating which areas need the most attention.",
        ],
      },
      {
        id: "property-layout",
        title: "Review the Layout and Access",
        paragraphs: [
          "Look at the entrance, circulation routes, service areas, and relationship between different work zones. Accessibility, emergency routes, and local regulations must remain priorities.",
          "A floor plan with dimensions and a clear orientation can help make the review more specific.",
        ],
      },
      {
        id: "before-investment",
        title: "Plan Before Investing",
        paragraphs: [
          "If you are purchasing or leasing a property, identify the changes that would be required to make it suitable for your business.",
          "Estimate costs and consult qualified architects or engineers before committing to major alterations.",
        ],
      },
    ],
    conclusion:
      "A commercial property review is most useful when it connects spatial considerations to real business needs and the technical requirements of the building.",
  },
  {
    id: 8,
    slug: "vastu-and-architectural-design",
    title: "Bringing Vastu Principles Into Architectural Design",
    category: "Architecture",
    date: "2026-08-07",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "Explore how traditional spatial principles can be considered alongside contemporary architectural requirements.",
    intro:
      "Architecture brings together the site, the building brief, structure, services, materials, and the people who will use the space. Vastu principles can be discussed as part of this broader design process.",
    sections: [
      {
        id: "site-and-orientation",
        title: "Begin With the Site",
        paragraphs: [
          "Understand the plot, access, orientation, neighbouring buildings, climate, and applicable planning requirements. These factors shape the opportunities available to the design.",
          "Accurate site information is essential before drawing conclusions about directions or possible layouts.",
        ],
      },
      {
        id: "design-integration",
        title: "Integrate Ideas Early",
        paragraphs: [
          "Discuss Vastu preferences while the design is still flexible. Early conversations can help identify priorities before room arrangements and building services become difficult to change.",
          "The design team should document the decisions and explain trade-offs where requirements conflict.",
        ],
      },
      {
        id: "balance-and-feasibility",
        title: "Balance Tradition With Technical Needs",
        paragraphs: [
          "A building must still meet structural, accessibility, ventilation, fire-safety, and other applicable requirements. Aesthetic and traditional preferences need to work within those constraints.",
          "Collaboration between the property owner, architect, engineers, and Vastu consultant can help clarify the options.",
        ],
      },
    ],
    conclusion:
      "Considering Vastu early can create a more informed design discussion. The best process makes room for tradition while respecting the technical and practical demands of the project.",
  },
  {
    id: 9,
    slug: "everyday-vastu-tips",
    title: "Everyday Vastu Tips for a More Thoughtful Living Space",
    category: "Vastu Tips",
    date: "2026-07-30",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90",
    excerpt:
      "Simple topics to review around organization, lighting, furniture placement, and the everyday use of your home.",
    intro:
      "You do not always need a major renovation to make a living space more comfortable and organized. Start by observing how you use the rooms and identify small improvements that are practical for your household.",
    sections: [
      {
        id: "declutter",
        title: "Keep Everyday Areas Organized",
        paragraphs: [
          "Review entrances, corridors, and commonly used rooms for items that obstruct movement. Thoughtful storage can make everyday routines easier.",
          "Focus on changes that support your household rather than following a one-size-fits-all checklist.",
        ],
      },
      {
        id: "furniture",
        title: "Review Furniture Placement",
        paragraphs: [
          "Arrange furniture to preserve comfortable pathways, useful conversation areas, and access to windows and doors.",
          "Consider the room's proportions, accessibility, and the way each family member uses the space.",
        ],
      },
      {
        id: "lighting",
        title: "Improve Lighting and Comfort",
        paragraphs: [
          "Use suitable lighting for reading, cooking, working, and relaxing. Where possible, make use of daylight while managing glare and heat.",
          "Keep fixtures and electrical installations safe, and ask a qualified electrician to handle technical work.",
        ],
      },
    ],
    conclusion:
      "Small, practical improvements can make a home easier to use. Consider traditional Vastu ideas alongside your household's actual needs and the safety of the property.",
  },
];

const sectionFallback = [
  {
    id: "understanding-the-topic",
    title: "Understanding the Topic",
    paragraphs: [
      "A useful assessment begins with the property, its layout, the people who use it, and the questions that matter most. Traditional Vastu concepts can be discussed alongside practical considerations such as comfort, accessibility, and the intended use of the space.",
      "Gather accurate information before making changes. Plans, measurements, photographs, and a clear description of your goals can help make the discussion more productive.",
    ],
  },
  {
    id: "practical-considerations",
    title: "Practical Considerations",
    paragraphs: [
      "Every property has different constraints and opportunities. Recommendations should account for the existing structure, available budget, technical requirements, and the feasibility of making changes.",
      "Where a proposal involves structural work, electrical systems, plumbing, or fire safety, consult qualified professionals and follow applicable building requirements.",
    ],
  },
  {
    id: "next-steps",
    title: "What to Do Next",
    paragraphs: [
      "Start by listing your priorities and identifying the information you still need. Review possible options carefully and decide which changes are both useful and achievable.",
      "A property-specific consultation can help you discuss the layout and understand possible next steps based on your individual requirements.",
    ],
  },
];

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      aria-label={`Copy link to ${title}`}
      className="inline-flex items-center gap-2 rounded-xl border border-[#e7dcc9] bg-white px-4 py-2.5 text-xs font-semibold text-[#775632] transition hover:border-[#b18443] hover:bg-[#fff8eb]"
    >
      <span>↗</span>
      {copied ? "Link Copied!" : "Share Article"}
    </button>
  );
}

function ArticleCard({ article, reduceMotion }) {
  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="group overflow-hidden rounded-2xl border border-[#e9dfce] bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <Link
        href={`/blog/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#e9decd]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${article.image}")` }}
        />
      </Link>

      <div className="p-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a56b27]">
          {article.category}
        </span>
        <h3 className="mt-2 font-serif text-xl font-bold leading-snug group-hover:text-[#a56b27]">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-3 text-xs text-[#887967]">
          {formatDate(article.date)} · {article.readTime}
        </p>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9e6829] hover:gap-3"
        >
          Read Article <span>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const reduceMotion = useReducedMotion();

  const article = articles.find((item) => item.slug === slug);
  const related = article
    ? articles
        .filter(
          (item) =>
            item.slug !== article.slug && item.category === article.category,
        )
        .concat(
          articles.filter(
            (item) =>
              item.slug !== article.slug && item.category !== article.category,
          ),
        )
        .slice(0, 3)
    : [];

  if (!article) {
    return (
      <main className="grid min-h-[65vh] place-items-center bg-[#fcfaf5] px-5">
        <div className="max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a56b27]">
            Article Not Found
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold">
            This page is unavailable
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#796c5c]">
            The article may have moved or the address may be incorrect.
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex rounded-xl bg-[#a56b27] px-6 py-3 text-sm font-bold text-white"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const sections =
    article.sections?.length > 0 ? article.sections : sectionFallback;

  return (
    <main className="overflow-hidden bg-[#fcfaf5] text-[#302116]">
      {/* Breadcrumb */}
      <div className="border-b border-[#eee5d8] bg-[#f7f0e4]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-5 py-4 text-xs text-[#84735e] sm:px-8 lg:px-12">
          <Link href="/" className="transition hover:text-[#a56b27]">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="transition hover:text-[#a56b27]">
            Blog
          </Link>
          <span>/</span>
          <span className="max-w-[220px] truncate font-semibold text-[#a56b27]">
            {article.title}
          </span>
        </div>
      </div>

      {/* Article hero */}
      <section className="relative isolate overflow-hidden bg-[#21160d]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${article.image}")` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c120a]/95 via-[#21160d]/80 to-[#21160d]/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#21160d]/65 to-transparent" />

        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex rounded-full border border-[#e4bc79]/40 bg-[#a56b27]/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#edc985] backdrop-blur-md">
              {article.category}
            </span>

            <h1 className="mt-6 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              {article.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/80">
              <span className="inline-flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#e6bd77]/40 bg-white/10 font-serif text-lg text-[#edc985]">
                  B
                </span>
                Bhuwneshwari Scientific Vastu
              </span>
              <span className="hidden h-4 w-px bg-white/30 sm:block" />
              <span>▦ {formatDate(article.date)}</span>
              <span>◷ {article.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body and sidebar */}
      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1250px] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-16">
          <article className="min-w-0">
            {/* Featured image */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-[#e8decd] bg-[#eee4d5] shadow-lg"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${article.image}")` }}
              />
            </motion.div>

            {/* Intro */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-10 border-l-[3px] border-[#b18443] bg-[#f6efdf] px-5 py-5 sm:px-7 sm:py-6"
            >
              <p className="text-base leading-8 text-[#574533] sm:text-lg sm:leading-9">
                {article.intro}
              </p>
            </motion.div>

            {/* Table of contents */}
            <div className="mb-10 rounded-2xl border border-[#e8decd] bg-white p-5 sm:p-6">
              <h2 className="font-serif text-xl font-bold">In This Article</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-start gap-3 text-sm text-[#766550] transition hover:text-[#a56b27]"
                  >
                    <span className="font-semibold text-[#b18443]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="underline-offset-4 group-hover:underline">
                      {section.title}
                    </span>
                  </a>
                ))}
                <a
                  href="#key-takeaway"
                  className="group flex items-start gap-3 text-sm text-[#766550] transition hover:text-[#a56b27]"
                >
                  <span className="font-semibold text-[#b18443]">
                    {String(sections.length + 1).padStart(2, "0")}
                  </span>
                  <span className="underline-offset-4 group-hover:underline">
                    Final Thoughts
                  </span>
                </a>
              </div>
            </div>

            {/* Article sections */}
            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.section
                  id={section.id}
                  key={section.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55 }}
                  className="scroll-mt-28"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e5d2ae] bg-[#f7ead0] font-serif text-sm font-bold text-[#9e6829]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl font-bold leading-snug sm:text-3xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4 pl-0 sm:pl-14">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-sm leading-8 text-[#6f6050] sm:text-base sm:leading-9"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Conclusion */}
            <motion.div
              id="key-takeaway"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mt-12 scroll-mt-28 rounded-2xl border border-[#e7d5b4] bg-gradient-to-br from-[#fff8e9] to-[#f1e2c6] p-6 sm:p-8"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a56b27]">
                Key Takeaway
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold">
                Final Thoughts
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#6f5b43] sm:text-base">
                {article.conclusion}
              </p>
            </motion.div>

            {/* Article footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#e8decd] py-5">
              <div>
                <p className="text-xs text-[#8b7a67]">Filed under</p>
                <span className="mt-2 inline-flex rounded-full bg-[#f3e7d1] px-3 py-1.5 text-xs font-semibold text-[#956024]">
                  {article.category}
                </span>
              </div>
              <ShareButton title={article.title} />
            </div>

            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#9e6829] transition hover:gap-3"
              >
                ← Back to All Articles
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[#e8decd] bg-white p-5 shadow-sm sm:p-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a56b27]">
                Article Contents
              </span>
              <h2 className="mt-2 font-serif text-xl font-bold">
                On This Page
              </h2>
              <nav className="mt-5 space-y-1">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-xs leading-5 text-[#796c5c] transition hover:bg-[#fff4df] hover:text-[#9e6829]"
                  >
                    <span className="font-bold text-[#b18443]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                ))}
                <a
                  href="#key-takeaway"
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-xs leading-5 text-[#796c5c] transition hover:bg-[#fff4df] hover:text-[#9e6829]"
                >
                  <span className="font-bold text-[#b18443]">
                    {String(sections.length + 1).padStart(2, "0")}
                  </span>
                  Final Thoughts
                </a>
              </nav>
            </div>

            <div className="relative isolate overflow-hidden rounded-2xl bg-[#21160d] p-6 text-white shadow-lg">
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
                style={{
                  backgroundImage: `url("${article.image}")`,
                }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#21160d]/95 to-[#513116]/90" />

              <span className="text-3xl text-[#e4bc79]">✦</span>
              <h2 className="mt-4 font-serif text-2xl font-bold">
                Need Personalized Vastu Guidance?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Every property has different requirements. Discuss your
                questions with our consultation team.
              </p>
              <Link
                href="/appointment"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                Book a Consultation <span>→</span>
              </Link>
              <Link
                href="/contact"
                className="mt-3 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Our Team
              </Link>
            </div>

            <div className="rounded-2xl border border-[#e8decd] bg-[#f5eddf] p-5">
              <h3 className="font-serif text-lg font-bold">
                Explore More Topics
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Vastu Tips",
                  "Residential Vastu",
                  "Commercial Vastu",
                  "Architecture",
                ].map((category) => (
                  <Link
                    key={category}
                    href="/blog"
                    className="rounded-full border border-[#e2d1b3] bg-white/80 px-3 py-2 text-[11px] font-medium text-[#785b39] transition hover:border-[#b18443] hover:bg-white"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-[#eee3d2] bg-[#f5efe4] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-9 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a56b27]">
                  Keep Exploring
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                  Related Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold text-[#9e6829] hover:underline"
              >
                View All Articles →
              </Link>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

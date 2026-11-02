"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, CheckCircle2, AlertCircle, Scale, Shield, HelpCircle } from "lucide-react";

export default function TermsAndConditionsPage() {
  const lastUpdated = "November 1, 2026";

  const terms = [
    {
      title: "1. Acceptance of Terms",
      text: "By accessing, browsing, or utilizing the services provided on Bhuwneshwari Scientific Vastu ('BSV', 'we', 'our', or 'us'), you agree to be legally bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please refrain from using our website.",
    },
    {
      title: "2. Nature of Scientific Vastu Services",
      text: "Our Vastu consultations, site assessments, and remedial products are based on classical Vedic traditions combined with directional energy balance, geomantic principles, and practical environmental harmonization. Vastu consultations are advisory in nature. They are intended to complement architectural and lifestyle balance and do not replace licensed structural engineering, legal survey, medical, or psychiatric diagnosis.",
    },
    {
      title: "3. Product Descriptions & Energization",
      text: "Every Vastu pyramid, yantra, rod, energy blocker, and energized sacred item is consecrated and quality-checked before dispatch. Because natural brass, copper, and crystals possess organic variations in grain, hue, and texture, individual physical products may display slight natural differences from digital studio photographs.",
    },
    {
      title: "4. Pricing, Payments & Partial Payments",
      text: "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Online payments are secured through PayU. In cases where the store administrator or offline customer authorizes a partial payment or booking deposit, the remaining due amount must be settled prior to or upon receipt as agreed.",
    },
    {
      title: "5. Training Programs & Intellectual Property",
      text: "Enrollment in Master Classes, Workshops, or Foundation Courses provides a personal, non-transferable license to access course materials, live online sessions, and student WhatsApp support. Course syllabus, proprietary case studies, recordings, and study notes remain the exclusive intellectual property of Bhuwneshwari Scientific Vastu and may not be reproduced, re-sold, or broadcast without prior written consent.",
    },
    {
      title: "6. Consultations, Rescheduling & Cancellations",
      text: "Consultation slots may be rescheduled with at least 24 hours of advance notice. If a client fails to attend a confirmed appointment without notice, the session will be considered completed. Cancellations requested with more than 24 hours of notice are eligible for full credit towards a future consultation date.",
    },
    {
      title: "7. User Conduct & Prohibited Activities",
      text: "Users agree not to disrupt website operations, transmit malicious code, attempt unauthorized access to administrative portals, or misrepresent their identity or affiliation during booking.",
    },
    {
      title: "8. Limitation of Liability & Governing Law",
      text: "To the fullest extent permitted by applicable law, Bhuwneshwari Scientific Vastu and its practitioners shall not be liable for any indirect, incidental, or consequential damages resulting from consultation implementation or product use. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Rajasthan, India.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf7f0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-[#35251a] via-[#68451f] to-[#a36d2d] p-8 text-white shadow-xl sm:p-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f1d5a5]">
            <Scale size={16} /> Agreement & Guidelines
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            Please read these terms carefully before purchasing Vastu remedies, booking consultation sessions, or enrolling in training programs.
          </p>
          <p className="mt-4 text-xs font-medium text-[#f7dfb6]">
            Last Updated: {lastUpdated} · Governed by the laws of India
          </p>
        </motion.div>

        {/* Terms list */}
        <div className="mt-8 space-y-5">
          {terms.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="font-serif text-lg font-bold text-[#382b20] sm:text-xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6b5844]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee4d5] pt-6 text-xs text-[#8c7a65]">
          <Link href="/" className="font-semibold text-[#8e571e] hover:underline">
            ← Back to Storefront
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:underline">Return & Refunds</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

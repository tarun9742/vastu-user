"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Mail, Phone, MapPin, HelpCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 1, 2026";

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal Information: When you create an account, purchase energized Vastu products, book consultations, or contribute to our bird feeding NGO, we collect your name, mobile phone number, email address, billing/shipping address, and postal code.",
        "Consultation & Assessment Data: For residential, commercial, or industrial Vastu consultations, you may share architectural floor plans, Google Earth locations, compass orientations, and notes about environmental energy concerns.",
        "Donation & Tax Details: For contributions to Choti Khushi NGO, we collect your donor name, PAN number (optional for 80G tax receipts), and prayer/intention messages.",
        "Payment Information: All online payments are securely processed through our PCI-DSS Level 1 certified partner PayU. We do not store your credit/debit card numbers, CVVs, or NetBanking credentials on our servers.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "To fulfill, ship, and track your energized Vastu product orders.",
        "To schedule, confirm, and conduct 1-on-1 online or site-visit Vastu consultations.",
        "To enroll you in training workshops, provide WhatsApp batch links, and issue certificates.",
        "To generate official digital receipts for charitable bird feeding donations.",
        "To send crucial SMS/WhatsApp notifications regarding order dispatch, delivery status, and booking confirmations.",
      ],
    },
    {
      title: "3. Data Protection & Security",
      content: [
        "All data transmissions between your browser and our servers are encrypted using 256-bit Secure Socket Layer (SSL/TLS) encryption.",
        "Access to customer consultation files and property plans is strictly restricted to certified Vastu experts bound by strict non-disclosure agreements.",
        "We never sell, trade, or rent your personal contact information to third-party marketing brokers or advertisers.",
      ],
    },
    {
      title: "4. Cookies & Web Tracking",
      content: [
        "We use essential session cookies to remember items in your shopping cart, maintain your logged-in session, and preserve your currency and language preferences.",
        "You can configure your browser to decline non-essential cookies at any time, though some shopping features may require cookies to function correctly.",
      ],
    },
    {
      title: "5. Third-Party Service Providers",
      content: [
        "Payment Processing: Handled by PayU Payments Private Limited under RBI-sanctioned security guidelines.",
        "Logistics & Couriers: We share your delivery name, address, and phone number with trusted couriers (e.g., Delhivery, BlueDart, DTDC, India Post) solely for timely delivery.",
        "Communications: Transactional OTPs and SMS alerts are transmitted via telecom-compliant DLT gateways.",
      ],
    },
    {
      title: "6. Your Rights & Data Choices",
      content: [
        "You have the right to inspect, update, or request the deletion of your account and personal history at any time.",
        "To request a copy of your records or permanently remove your profile, contact our privacy desk at support@example.com.",
      ],
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
            <ShieldCheck size={16} /> Legal & Data Protection
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            Your trust is our sacred responsibility. Learn how Bhuwneshwari Scientific Vastu collects, safeguards, and handles your personal and property consultation data.
          </p>
          <p className="mt-4 text-xs font-medium text-[#f7dfb6]">
            Last Updated: {lastUpdated} · Effective for all visitors and customers
          </p>
        </motion.div>

        {/* Sections */}
        <div className="mt-8 space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="font-serif text-xl font-bold text-[#382b20]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.content.map((p, i) => (
                  <p key={i} className="text-sm leading-6 text-[#6c5945]">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact Box */}
          <div className="rounded-2xl border border-[#e5d8c5] bg-gradient-to-br from-[#faf4e8] to-[#f4e6d0] p-6 sm:p-8">
            <h3 className="font-serif text-lg font-bold text-[#382b20]">Questions or Concerns?</h3>
            <p className="mt-1 text-xs text-[#7e6b56]">
              If you have any questions regarding our privacy practices or wish to exercise your data rights, please reach out:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
              <div className="flex items-center gap-2 text-[#493827]">
                <Mail size={16} className="text-[#a16c2a]" />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#493827]">
                <MapPin size={16} className="text-[#a16c2a]" />
                <span>Bhuwneshwari Scientific Vastu, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee4d5] pt-6 text-xs text-[#8c7a65]">
          <Link href="/" className="font-semibold text-[#8e571e] hover:underline">
            ← Back to Storefront
          </Link>
          <div className="flex gap-4">
            <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
            <Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:underline">Return & Refunds</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Mail, Phone } from "lucide-react";

export default function RefundPolicyPage() {
  const lastUpdated = "November 1, 2026";

  const points = [
    {
      title: "1. 7-Day Hassle-Free Return Window",
      text: "We stand behind the authenticity and quality of every energized Vastu remedy. You may initiate a return request within 7 calendar days from the date of package delivery if the item is physically defective, damaged in transit, or differs from your ordered specifications.",
    },
    {
      title: "2. Eligibility for Returns",
      text: "To be eligible for a return, your item must be unused, in its original consecrated packaging, and include all accompanying energized yantra plates, certificates, instruction booklets, and seals.",
    },
    {
      title: "3. Non-Returnable & Non-Refundable Items",
      text: "Due to the individualized energetic consecration and personalized nature of our spiritual services, the following are non-returnable: (a) Personalized Vastu consultation sessions that have already been conducted; (b) Custom-engraved yantras consecrated with a specific family's gotra or birth details; (c) Training program batch recordings after attendance access has been granted; (d) Charitable NGO donations to the bird feeding drive (tax receipts are non-cancellable).",
    },
    {
      title: "4. Return Process & Pickup",
      text: "To request a return, simply contact support@example.com or WhatsApp our desk with your Order ID and 2-3 clear photographs/unboxing video of the defective item. Once approved, our courier partner will pick up the parcel from your address within 2-3 business days.",
    },
    {
      title: "5. Refund Timeline & Settlement",
      text: "Once the returned product is inspected at our Jaipur centre (usually within 48 hours of arrival), your refund will be processed immediately. The credited amount will reflect in your original payment source (UPI, Card, or NetBanking via PayU) within 5 to 7 business days.",
    },
    {
      title: "6. Exchange Policy",
      text: "If you received a defective item and prefer an exact replacement instead of a refund, we will dispatch an identical, newly consecrated replacement item at zero additional shipping cost.",
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
            <RotateCcw size={16} /> Customer Protection
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Return & Refunds Policy
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            Your satisfaction and peace of mind are paramount. Learn about our straightforward 7-day return policy and refund guidelines.
          </p>
          <p className="mt-4 text-xs font-medium text-[#f7dfb6]">
            Last Updated: {lastUpdated} · 7-Day Domestic Return Window
          </p>
        </motion.div>

        {/* Highlight Banner */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-xs text-emerald-900 shadow-sm">
          <ShieldCheck size={20} className="shrink-0 text-emerald-700 mt-0.5" />
          <p className="leading-6">
            <strong>100% Quality & Energy Guarantee:</strong> Every item is authenticated and consecrated before shipping. If an item arrives physically flawed or damaged during transit, we replace it or issue a full refund promptly.
          </p>
        </div>

        {/* Detailed Points */}
        <div className="mt-8 space-y-5">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="font-serif text-lg font-bold text-[#382b20] sm:text-xl">
                {p.title}
              </h2>
              <p className="mt-2.5 text-sm leading-7 text-[#6b5844]">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Helpdesk Contact */}
        <div className="mt-8 rounded-2xl border border-[#e5d8c5] bg-gradient-to-br from-[#faf4e8] to-[#f4e6d0] p-6 sm:p-8">
          <h3 className="font-serif text-lg font-bold text-[#382b20]">Need Help with a Return?</h3>
          <p className="mt-1 text-xs text-[#7e6b56]">
            Our support desk is ready to assist you. Please keep your Order Reference Number handy:
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#493827]">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#a16c2a]" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#a16c2a]" />
              <span>Customer Care: +91 8690708302</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee4d5] pt-6 text-xs text-[#8c7a65]">
          <Link href="/" className="font-semibold text-[#8e571e] hover:underline">
            ← Back to Storefront
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
            <Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

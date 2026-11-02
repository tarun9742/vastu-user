"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin, Package, CheckCircle2, RotateCcw } from "lucide-react";

export default function ShippingPolicyPage() {
  const lastUpdated = "November 1, 2026";

  const cards = [
    {
      title: "Order Processing Time",
      desc: "All energized products undergo sacred cleansing and energy-testing prior to packing. Orders are typically processed and dispatched within 2 business days from our Jaipur centre.",
      icon: Clock,
    },
    {
      title: "Delivery Timelines",
      desc: "Standard express delivery across India takes 3 to 7 business days depending on city, state, and regional courier connectivity.",
      icon: Truck,
    },
    {
      title: "Shipping Rates & Free Shipping",
      desc: "We offer a flat shipping rate of ₹99 on all domestic orders across India. Orders of ₹1,999 and above automatically qualify for FREE Shipping at checkout.",
      icon: Package,
    },
    {
      title: "Careful Consecrated Packaging",
      desc: "Sacred brass pyramids, yantras, and quartz crystal items are cushioned in triple-layer eco-friendly shockproof packaging to preserve physical integrity and subtle energetic purity.",
      icon: ShieldCheck,
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
            <Truck size={16} /> Fulfillment & Logistics
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Shipping & Delivery Policy
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            Transparent, insured, and dependable delivery for all your energized Vastu instruments and sacred tools across India.
          </p>
          <p className="mt-4 text-xs font-medium text-[#f7dfb6]">
            Last Updated: {lastUpdated} · Nationwide Express Shipping
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf4e8] text-[#8e571e]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-[#382b20]">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6c5945]">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Sections */}
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-xl font-bold text-[#382b20]">1. Coverage & Serviceable Locations</h2>
            <p className="mt-3 text-sm leading-6 text-[#6c5945]">
              We ship to all PIN codes across all states and Union Territories in India through Tier-1 courier partners including Delhivery, BlueDart, DTDC, and India Post Speed Post for remote and rural locations. At this time, international shipping is available upon special request by contacting our helpdesk directly.
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-xl font-bold text-[#382b20]">2. Order Tracking & Real-Time Updates</h2>
            <p className="mt-3 text-sm leading-6 text-[#6c5945]">
              As soon as your package is dispatched, you will receive an SMS and WhatsApp alert containing your Air Waybill (AWB) number and direct courier tracking URL. You can also view live tracking anytime by visiting your <Link href="/orders" className="font-semibold text-[#8e571e] underline">My Orders</Link> dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-xl font-bold text-[#382b20]">3. Damaged or Tampered Parcels</h2>
            <p className="mt-3 text-sm leading-6 text-[#6c5945]">
              In the unlikely event that your parcel arrives visibly damaged or tampered with, please do not accept delivery, or record a quick unboxing video and notify us within 48 hours at support@example.com so we can immediately arrange a priority replacement.
            </p>
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
            <Link href="/refund-policy" className="hover:underline">Return & Refunds</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

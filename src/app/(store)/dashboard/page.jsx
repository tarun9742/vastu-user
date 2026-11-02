"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import AccountLayout from "@/components/account/AccountLayout";

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d.getTime())
    ? String(val)
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function TicketStatusBadge({ status }) {
  const s = String(status || "New").toLowerCase();
  let cls = "bg-sky-50 text-sky-700 ring-sky-200";
  if (s === "resolved") cls = "bg-emerald-50 text-emerald-700 ring-emerald-200";
  else if (s === "in progress") cls = "bg-amber-50 text-amber-700 ring-amber-200";
  else if (s === "contacted") cls = "bg-purple-50 text-purple-700 ring-purple-200";
  else if (s === "closed") cls = "bg-zinc-100 text-zinc-600 ring-zinc-200";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ring-inset ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || "New"}
    </span>
  );
}

function AptStatusBadge({ status }) {
  const s = String(status || "Pending").toLowerCase();
  let cls = "bg-amber-50 text-amber-700 ring-amber-200";
  if (s === "confirmed" || s === "completed") cls = "bg-emerald-50 text-emerald-700 ring-emerald-200";
  else if (s === "cancelled") cls = "bg-red-50 text-red-700 ring-red-200";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ring-inset ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || "Pending"}
    </span>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [donations, setDonations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBase = (
    process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    let localOrders = [];
    try {
      const saved1 = JSON.parse(localStorage.getItem("bsv-orders") || "[]");
      const saved2 = JSON.parse(localStorage.getItem("bsv-demo-orders") || "[]");
      localOrders = [...(Array.isArray(saved1) ? saved1 : []), ...(Array.isArray(saved2) ? saved2 : [])];
      setOrders(localOrders);
    } catch {
      setOrders([]);
    }

    const refreshCart = () => {
      const savedCart = getCart();
      setCart(Array.isArray(savedCart) ? savedCart : []);
    };

    refreshCart();
    window.addEventListener("bsv-cart-updated", refreshCart);

    // Fetch live user orders, donations, appointments, and tickets
    if (currentUser?.phone) {
      const cleanPhone = currentUser.phone.replace(/\D/g, "").slice(-10);
      Promise.all([
        fetch(`${apiBase}/api/payments/my-orders?phone=${cleanPhone}`).then((r) => r.json()).catch(() => ({})),
        fetch(`${apiBase}/api/donations/my-donations?phone=${cleanPhone}`).then((r) => r.json()).catch(() => ({})),
        fetch(`${apiBase}/api/appointments/my?phone=${cleanPhone}`).then((r) => r.json()).catch(() => ({})),
        fetch(`${apiBase}/api/tickets/my?phone=${cleanPhone}`).then((r) => r.json()).catch(() => ({})),
      ])
        .then(([orderRes, donRes, aptRes, ticketRes]) => {
          if (orderRes?.success && Array.isArray(orderRes.data) && orderRes.data.length > 0) {
            const backendNums = new Set(orderRes.data.map((o) => o.orderNumber || o.id));
            const uniqueLocal = localOrders.filter((lo) => !backendNums.has(lo.orderNumber || lo.id));
            setOrders([...orderRes.data, ...uniqueLocal]);
          }
          if (donRes?.success && Array.isArray(donRes.data)) {
            setDonations(donRes.data);
          }
          if (aptRes?.success && Array.isArray(aptRes.data)) {
            setAppointments(aptRes.data);
          }
          if (ticketRes?.success && Array.isArray(ticketRes.data)) {
            setTickets(ticketRes.data);
          }
        })
        .catch((err) => console.error("Error fetching user data:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    return () => {
      window.removeEventListener("bsv-cart-updated", refreshCart);
    };
  }, [apiBase]);

  if (loading) {
    return <div className="min-h-[50vh] animate-pulse bg-[#faf7f0]" />;
  }

  if (!user) {
    return (
      <div className="px-5 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#382b20]">
          Welcome to your dashboard
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-[#8b7a66]">
          Please sign in to view your orders, live consultation records, support tickets, and NGO bird feeding history.
        </p>
        <button
          onClick={() => openLoginPopup()}
          className="mt-6 rounded-2xl bg-gradient-to-r from-[#8e571e] to-[#b77b32] px-8 py-3 font-semibold text-white shadow-lg transition hover:brightness-105"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 5);

  return (
    <AccountLayout
      title="User Dashboard"
      subtitle="Overview of your orders, booked appointments, raised support queries, and NGO bird feeding contributions."
      user={user}
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <span className="text-2xl">📦</span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#91795c]">
              Total Orders
            </p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#382b20]">
              {orders.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <span className="text-2xl">📅</span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#91795c]">
              Appointments
            </p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#382b20]">
              {appointments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <span className="text-2xl">💬</span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#91795c]">
              Support Tickets
            </p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#382b20]">
              {tickets.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <span className="text-2xl">🕊️</span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#91795c]">
              NGO Donations
            </p>
            <p className="mt-1 font-serif text-2xl font-bold text-[#8e571e]">
              ₹
              {donations
                .filter((d) => d.paymentStatus === "paid" || d.paymentStatus === "success")
                .reduce((sum, d) => sum + (Number(d.amount) || 0), 0)
                .toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* 1. Consultation Appointments Section */}
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3ebde] pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#382b20]">
                Vastu Consultation Appointments
              </h3>
              <p className="mt-0.5 text-xs text-[#8b7a66]">
                Review scheduled sessions, appointment status, and online PayU confirmations
              </p>
            </div>
            <Link
              href="/appointment"
              className="rounded-xl bg-[#21150c] px-4 py-2 text-xs font-bold text-white hover:bg-[#3d2716] transition"
            >
              + Book New Appointment
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-[#e6d8c3] bg-[#fdfcf9] px-4 py-8 text-center">
              <span className="text-3xl">📅</span>
              <p className="mt-2 font-semibold text-[#493827]">
                No appointments booked yet
              </p>
              <p className="mt-1 text-xs text-[#8b7a66]">
                Schedule personalized Vastu guidance for your home, office, or plot.
              </p>
              <Link
                href="/appointment"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-[#d6c4aa] bg-white px-4 py-2 text-xs font-bold text-[#7f5424] hover:bg-[#faf4e8]"
              >
                Book a Consultation ›
              </Link>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-[#f7f0e6]">
              {appointments.map((apt) => (
                <div
                  key={apt._id}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#8e571e]">
                        {apt.reference || `APT-${String(apt._id).slice(-6)}`}
                      </span>
                      <AptStatusBadge status={apt.status} />
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {apt.paymentStatus === "paid" ? "Paid via PayU" : "Payment Pending"}
                      </span>
                    </div>
                    <p className="font-serif text-sm font-bold text-[#21160c]">
                      {apt.type}
                    </p>
                    <p className="text-xs text-[#786653]">
                      📅 {formatDate(apt.date)} · ⏰ {apt.time || "10:00 AM"} · 📍 {apt.mode === "in_person" ? "On-Site" : "Online"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
                    <span className="font-serif text-base font-bold text-[#352516]">
                      {formatPrice(apt.amount)}
                    </span>
                    <Link
                      href="/appointment"
                      className="rounded-lg border border-[#e1d3bf] px-3 py-1.5 text-xs font-semibold text-[#7a5c31] hover:bg-[#faf4e8]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Customer Raised Support Tickets Section */}
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3ebde] pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#382b20]">
                Support Tickets & Enquiries
              </h3>
              <p className="mt-0.5 text-xs text-[#8b7a66]">
                Track questions and support requests submitted to the administrator team
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-xl border border-[#d6c4aa] bg-white px-4 py-2 text-xs font-bold text-[#7f5424] hover:bg-[#faf4e8] transition"
            >
              + Raise Support Query
            </Link>
          </div>

          {tickets.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-[#e6d8c3] bg-[#fdfcf9] px-4 py-8 text-center">
              <span className="text-3xl">💬</span>
              <p className="mt-2 font-semibold text-[#493827]">
                No support tickets raised
              </p>
              <p className="mt-1 text-xs text-[#8b7a66]">
                Need help with a consultation, order, or Vastu query? We are here to assist.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-[#d6c4aa] bg-white px-4 py-2 text-xs font-bold text-[#7f5424] hover:bg-[#faf4e8]"
              >
                Contact Support ›
              </Link>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-[#f7f0e6]">
              {tickets.map((t) => (
                <div key={t._id} className="py-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#8e571e]">
                        {t.ticketId || `TCK-${String(t._id).slice(-6)}`}
                      </span>
                      <TicketStatusBadge status={t.status} />
                      <span className="text-xs font-semibold text-zinc-800">
                        {t.service || "General Enquiry"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8b7a66]">
                      {formatDate(t.createdAt)}
                    </span>
                  </div>

                  {t.message && (
                    <p className="text-xs text-[#5e4c3a] bg-[#faf7f0] p-3 rounded-xl border border-[#eddcc4]/60">
                      &quot;{t.message}&quot;
                    </p>
                  )}

                  {t.notes && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-900">
                      <p className="font-bold text-[11px] uppercase tracking-wider text-emerald-800">
                        Admin Team Response:
                      </p>
                      <p className="mt-0.5">{t.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Recent Orders Section */}
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3ebde] pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#382b20]">
                Recent Product Orders
              </h3>
              <p className="mt-0.5 text-xs text-[#8b7a66]">
                Review order status and purchase history
              </p>
            </div>
            <Link
              href="/orders"
              className="rounded-xl border border-[#d6c4aa] bg-white px-4 py-2 text-xs font-bold text-[#7f5424] hover:bg-[#faf4e8] transition"
            >
              View All Orders ›
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-[#e6d8c3] bg-[#fdfcf9] px-4 py-8 text-center">
              <span className="text-3xl">🛒</span>
              <p className="mt-2 font-semibold text-[#493827]">
                No orders placed yet
              </p>
              <Link
                href="/products"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#986122] to-[#b67a30] px-5 py-2 text-xs font-bold text-white shadow hover:brightness-110 transition"
              >
                <span>Browse Store</span>
                <span>→</span>
              </Link>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-[#f7f0e6]">
              {recentOrders.map((o) => (
                <div
                  key={o.id || o.orderNumber || o._id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#8e571e]">
                        {o.orderNumber || o.id}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        {o.status || o.paymentStatus || "Placed"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#8b7a66]">
                      {formatDate(o.date || o.createdAt)} · {Array.isArray(o.items) ? o.items.length : 1} item(s)
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="font-serif text-base font-bold text-[#352516]">
                      {formatPrice(o.total || o.totalAmount)}
                    </p>
                    <Link
                      href="/orders"
                      className="rounded-lg border border-[#e1d3bf] px-3 py-1.5 text-xs font-semibold text-[#7a5c31] hover:bg-[#faf4e8]"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. NGO Bird Feeding Contributions Section */}
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f3ebde] pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f7eedc] text-2xl text-[#9b6324]">
                🕊️
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#382b20]">
                  Choti Khushi NGO - Bird Feeding Contributions
                </h3>
                <p className="mt-0.5 text-xs text-[#8b7a66]">
                  Track your noble contributions and digital receipts for feeding birds
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/my-donations"
                className="rounded-xl border border-[#d6c4aa] bg-white px-4 py-2 text-xs font-bold text-[#7f5424] hover:bg-[#faf4e8] transition"
              >
                View All Receipts ›
              </Link>
              <Link
                href="/donation"
                className="rounded-xl bg-[#986122] px-4 py-2 text-xs font-bold text-white hover:bg-[#7e4e1a] transition"
              >
                + Feed Birds Now
              </Link>
            </div>
          </div>

          {donations.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-[#e6d8c3] bg-[#fdfcf9] px-4 py-8 text-center">
              <span className="text-3xl">🌾</span>
              <p className="mt-2 font-semibold text-[#493827]">
                No donations recorded yet
              </p>
              <Link
                href="/donation"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#986122] to-[#b67a30] px-5 py-2 text-xs font-bold text-white shadow hover:brightness-110 transition"
              >
                <span>Contribute for Bird Feeding</span>
                <span>→</span>
              </Link>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-[#f1e6d6] text-left text-xs">
                <thead>
                  <tr className="bg-[#fcf8f2] text-[#86745f]">
                    <th className="px-4 py-3 font-semibold">Receipt ID</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Payment Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f7f0e6]">
                  {donations.map((d) => (
                    <tr key={d._id || d.donationId} className="hover:bg-[#fdfaf5] transition">
                      <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-[#3c2a1b]">
                        {d.donationId}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-[#736251]">
                        {formatDate(d.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-bold text-[#352516]">
                        ₹{Number(d.amount || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                          ● {d.paymentStatus}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <Link
                          href="/my-donations"
                          className="font-semibold text-[#8e571e] hover:underline"
                        >
                          View Receipt
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}

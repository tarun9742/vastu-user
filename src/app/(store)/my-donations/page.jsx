"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";
import AccountLayout from "@/components/account/AccountLayout";
import { Heart, FileText, CheckCircle2, Clock3, Download, ExternalLink, Printer, X, ShieldCheck } from "lucide-react";

function formatPrice(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(val) || 0);
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
        hour: "2-digit",
        minute: "2-digit",
      });
}

export default function MyDonationsPage() {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);

    if (u?.phone) {
      const cleanPhone = u.phone.replace(/\D/g, "").slice(-10);
      fetch(`${apiBase}/api/donations/my-donations?phone=${cleanPhone}`)
        .then((res) => res.json())
        .then((result) => {
          if (result?.success && Array.isArray(result.data)) {
            setDonations(result.data);
          }
        })
        .catch((err) => console.error("Error fetching my donations:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [apiBase]);

  const totalDonated = donations
    .filter((d) => d.paymentStatus === "paid" || d.paymentStatus === "success")
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f0] px-4 py-12">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-32 rounded-3xl bg-amber-100/60" />
          <div className="h-64 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#faf7f0] px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
            <Heart size={32} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#382b20]">Sign In to View Donations</h2>
          <p className="mt-2 text-sm text-[#7e6b56]">
            Please sign in with your mobile number to view your NGO donation receipts and contribution history.
          </p>
          <button
            onClick={() => openLoginPopup()}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#8e571e] to-[#b77b32] py-3 text-sm font-bold text-white shadow-md hover:brightness-105"
          >
            Sign In with Mobile OTP
          </button>
        </div>
      </main>
    );
  }

  return (
    <AccountLayout
      title="My NGO Donations"
      subtitle="Track your charitable contributions, feeding work for birds, and download 80G tax receipts."
      user={user}
    >
      <div className="space-y-6">
        {/* Summary Card */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#91795c]">Total Donated</p>
            <p className="mt-2 text-2xl font-bold text-[#8e571e]">{formatPrice(totalDonated)}</p>
            <p className="mt-1 text-xs text-emerald-700 font-medium">✓ 100% used for bird grain & shelter</p>
          </div>
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#91795c]">Contributions</p>
            <p className="mt-2 text-2xl font-bold text-[#382b20]">{donations.length}</p>
            <p className="mt-1 text-xs text-[#8c7a65]">Lifetime transactions</p>
          </div>
          <div className="rounded-2xl border border-[#eadfce] bg-gradient-to-br from-[#faf4e8] to-[#f4e6d0] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#91795c]">NGO Partner</p>
            <p className="mt-2 font-serif text-lg font-bold text-[#382b20]">Choti Khushi NGO</p>
            <p className="mt-1 text-xs text-[#8c7a65]">Registered Trust · Feeding Birds</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#eadfce] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#8e571e]">
              <Heart size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#382b20]">Support the Bird Feeding Drive</p>
              <p className="text-xs text-[#8c7a65]">Grains, fresh water bowls, and injured bird care</p>
            </div>
          </div>
          <Link
            href="/donation"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8e571e] to-[#b77b32] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105"
          >
            <span>Feed More Birds</span>
            <span>→</span>
          </Link>
        </div>

        {/* Donations List */}
        {donations.length === 0 ? (
          <div className="rounded-3xl border border-[#eadfce] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf4e8] text-[#9b763f]">
              <Heart size={28} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#382b20]">No Donations Yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#8c7a65]">
              You haven&apos;t made any contributions yet. A small donation of ₹500 helps feed over 100+ birds with clean grains and fresh water.
            </p>
            <Link
              href="/donation"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#8e571e] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[#774716]"
            >
              Donate Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((item) => {
              const isPaid = item.paymentStatus === "paid" || item.paymentStatus === "success";
              return (
                <div
                  key={item._id || item.donationId}
                  className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {isPaid ? <CheckCircle2 size={22} /> : <Clock3 size={22} />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#8e571e]">{item.donationId}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${isPaid ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
                            {isPaid ? "Payment Successful" : "Pending"}
                          </span>
                        </div>
                        <p className="mt-1 font-serif text-base font-bold text-[#382b20]">
                          {item.purpose || "Choti Khushi NGO - Feeding Work for Birds"}
                        </p>
                        <p className="mt-0.5 text-xs text-[#8c7a65]">
                          Date: {formatDate(item.createdAt)} · Ref: {item.txnid || "—"}
                        </p>
                        {item.pan && (
                          <p className="mt-1 text-xs text-[#8c7a65]">
                            PAN Provided: <span className="font-mono font-semibold text-[#382b20]">{item.pan}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between border-t border-[#f0e6d6] pt-3 sm:border-t-0 sm:pt-0 sm:flex-col sm:items-end sm:justify-center">
                      <p className="text-xl font-bold text-[#382b20]">{formatPrice(item.amount)}</p>
                      {isPaid && (
                        <button
                          onClick={() => setSelectedDonation(item)}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[#e1d3bf] bg-[#faf6ef] px-3 py-1.5 text-xs font-semibold text-[#7a5c31] transition hover:bg-[#f3ebd9]"
                        >
                          <FileText size={14} />
                          <span>View Official Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official 80G Receipt Modal */}
      <AnimatePresence>
        {selectedDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-emerald-600" size={24} />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-zinc-900">Official Donation Receipt</h3>
                    <p className="text-xs text-zinc-500">Choti Khushi NGO Bird Feeding Drive</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    <Printer size={14} />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => setSelectedDonation(null)}
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Printable Receipt Body */}
              <div className="mt-6 rounded-2xl border-2 border-dashed border-zinc-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Non-Governmental Organization</p>
                    <h4 className="mt-1 font-serif text-xl font-bold text-zinc-900">CHOTI KHUSHI NGO</h4>
                    <p className="mt-1 text-xs text-zinc-500">Dedicated to Bird Welfare, Grain Feeding & Rescues</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                      PAID / CERTIFIED
                    </span>
                    <p className="mt-2 text-xs font-mono font-bold text-zinc-700">{selectedDonation.donationId}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4 text-xs">
                  <div>
                    <p className="text-zinc-400 uppercase tracking-wider text-[10px]">Donor Name</p>
                    <p className="mt-0.5 font-bold text-zinc-800">{selectedDonation.donorName}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 uppercase tracking-wider text-[10px]">Donor Contact</p>
                    <p className="mt-0.5 font-bold text-zinc-800">{selectedDonation.donorPhone}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 uppercase tracking-wider text-[10px]">Donation Date</p>
                    <p className="mt-0.5 font-bold text-zinc-800">{formatDate(selectedDonation.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 uppercase tracking-wider text-[10px]">Payment Reference</p>
                    <p className="mt-0.5 font-mono font-bold text-zinc-800">{selectedDonation.txnid || "Online PayU"}</p>
                  </div>
                  {selectedDonation.pan && (
                    <div>
                      <p className="text-zinc-400 uppercase tracking-wider text-[10px]">Donor PAN</p>
                      <p className="mt-0.5 font-mono font-bold text-zinc-800">{selectedDonation.pan}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-zinc-400 uppercase tracking-wider text-[10px]">Payment Gateway</p>
                    <p className="mt-0.5 font-bold text-zinc-800">PayU Payments (SSL Secured)</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-zinc-50 p-4 border border-zinc-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-zinc-700">Purpose</p>
                      <p className="text-xs text-zinc-500">{selectedDonation.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-zinc-700">Total Donated</p>
                      <p className="text-xl font-bold text-zinc-900">{formatPrice(selectedDonation.amount)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-[11px] text-zinc-500 border-t border-zinc-200 pt-4">
                  <p>Thank you for extending kindness to voiceless birds. May your noble deed bring peace and prosperity.</p>
                  <p className="mt-1 font-serif text-[10px] text-zinc-400">Bhuwneshwari Scientific Vastu × Choti Khushi NGO Partnership</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-black"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AccountLayout>
  );
}

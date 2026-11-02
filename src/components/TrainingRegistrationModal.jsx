"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.86-.38-4.12-1.1l-.3-.17-3.12.82.83-3.04-.19-.31a8.2 8.2 0 0 1-1.25-4.44c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
    </svg>
  );
}

export default function TrainingRegistrationModal({
  open,
  onClose,
  course = null,
  alreadyEnrolled = false,
  enrollmentData = null,
  onEnrollmentSuccess,
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [status, setStatus] = useState("idle"); // idle, redirecting, success
  const [error, setError] = useState("");
  const [activeEnrollment, setActiveEnrollment] = useState(null);

  const apiBase = (
    process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setError("");
      const user = getCurrentUser();
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.phone || "",
      });

      if (alreadyEnrolled && enrollmentData) {
        setActiveEnrollment(enrollmentData);
        setStatus("success");
      } else {
        setStatus("idle");
        setActiveEnrollment(null);
      }
    }
  }, [open, alreadyEnrolled, enrollmentData, course]);

  // Prevent background scrolling while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !course) return null;

  const courseTitle = course.title;
  const coursePrice = Number(course.price || 4999);
  const originalPrice = Number(course.originalPrice || coursePrice + 3000);
  const savings = Math.max(0, originalPrice - coursePrice);
  const whatsappUrl =
    activeEnrollment?.whatsappLink ||
    enrollmentData?.whatsappLink ||
    course.whatsappLink ||
    "https://chat.whatsapp.com/BhuwneshwariVastu";

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleProceedToPay(e) {
    e.preventDefault();
    setError("");

    const currentUser = getCurrentUser();
    if (!currentUser) {
      openLoginPopup("/training");
      onClose();
      return;
    }

    const mobileDigits = form.mobile.replace(/\D/g, "");
    if (mobileDigits.length < 10) {
      setError("Please provide a valid 10-digit mobile number for enrollment.");
      return;
    }

    setStatus("redirecting");

    try {
      const response = await fetch(
        `${apiBase}/api/payments/payu/initiate-enrollment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            courseTitle: course.title,
            courseSlug: course.slug || "",
            amount: coursePrice,
            name: form.name.trim() || currentUser.name || "Student",
            email: form.email.trim() || currentUser.email || "",
            phone: mobileDigits,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.alreadyEnrolled) {
          setActiveEnrollment(data.enrollment);
          setStatus("success");
          if (onEnrollmentSuccess) {
            onEnrollmentSuccess(data.enrollment);
          }
          return;
        }
        throw new Error(data.error || "Unable to initiate PayU payment");
      }

      // DIRECT REDIRECT TO PAYU (No intermediate payment options popup!)
      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = data.action;

      Object.entries(data.params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value ?? "";
        formEl.appendChild(input);
      });

      document.body.appendChild(formEl);
      formEl.submit();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[99999] grid place-items-center overflow-y-auto bg-[#17120e]/60 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && status !== "redirecting") {
              onClose();
            }
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-[620px] overflow-y-auto overscroll-contain rounded-[28px] border border-white/70 bg-[#fbf8f1] text-[#2b241d] shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-[#292119] px-6 pb-6 pt-7 text-white sm:px-8 sm:pt-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(218,177,98,0.25),transparent_48%)]" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                disabled={status === "redirecting"}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl transition hover:bg-white/20 disabled:opacity-50"
              >
                ×
              </button>

              <p className="relative text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e6c987]">
                Bhuwneshwari Scientific Vastu
              </p>

              <h2 className="relative mt-3 text-2xl font-bold tracking-tight sm:text-3xl text-white">
                {status === "success"
                  ? "Enrollment Confirmed!"
                  : "Course Enrollment & Pricing"}
              </h2>

              <p className="relative mt-2 text-xs leading-5 text-white/75 sm:text-sm">
                {status === "success"
                  ? "Your seat is secured. Access your enrollment details and course WhatsApp group below."
                  : "Review the program fee. When you click Pay, you will be redirected straight to the secure PayU gateway."}
              </p>

              <div className="relative mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#d9b46d]/30 bg-white/10 px-4 py-1.5 text-xs">
                <span className="text-[#e6c987]">✦</span>
                <span className="truncate font-semibold text-[#f1cb7e]">
                  {courseTitle}
                </span>
                <span className="text-white/60">·</span>
                <span className="text-white/80">
                  {course.format || "Online Course"}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {status === "success" ? (
                /* ================= ALREADY ENROLLED / CONFIRMED SCREEN ================= */
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-600 shadow-md">
                    <svg
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#2b241d]">
                      {alreadyEnrolled
                        ? "You are Already Enrolled in this Course!"
                        : "Enrollment & Payment Successful!"}
                    </h3>
                    <p className="mt-1 text-xs text-[#796c5c]">
                      {alreadyEnrolled
                        ? "You have already secured your seat for this program. Re-enrollment is not required."
                        : "Welcome to the training program! Your seat is verified."}
                    </p>
                  </div>

                  {/* Enrollment ID Card */}
                  <div className="rounded-2xl border border-[#e8dbc5] bg-[#faf5eb] p-5 text-left shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#e8dbc5] pb-3 mb-3">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#8c6527]">
                        Training Enrollment ID
                      </span>
                      <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                        Active & Paid
                      </span>
                    </div>

                    <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-[#21150c]">
                      {activeEnrollment?.enrollmentId ||
                        enrollmentData?.enrollmentId ||
                        "BSV-ENR-ACTIVE"}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs border-t border-[#e8dbc5] pt-3">
                      <div>
                        <span className="text-[#8c7e6e] block text-[11px]">
                          Program
                        </span>
                        <span className="font-semibold text-[#302116] line-clamp-1">
                          {courseTitle}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8c7e6e] block text-[11px]">
                          Amount Paid
                        </span>
                        <span className="font-bold text-[#302116]">
                          ₹
                          {Number(
                            activeEnrollment?.amount || coursePrice
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WHATSAPP BUTTON (Specified by User!) */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-center">
                    <p className="text-xs font-bold text-emerald-900 mb-1">
                      Connect with your Batch & Instructor
                    </p>
                    <p className="text-[11px] text-emerald-700 mb-4">
                      Join the official WhatsApp group for live class links,
                      syllabus, study materials, and batch updates.
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-[#20ba5a] hover:scale-[1.01]"
                    >
                      <WhatsAppIcon className="h-6 w-6" />
                      <span>Join Course WhatsApp Group / Channel</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Done / Close
                  </button>
                </motion.div>
              ) : (
                /* ================= PRICING & DIRECT PAYU REDIRECT SCREEN ================= */
                <form onSubmit={handleProceedToPay} className="space-y-6">
                  {/* Course Pricing Box */}
                  <div className="rounded-2xl border border-[#ecdcc3] bg-[#fbf5ea] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a56b27]">
                          Enrollment Investment
                        </span>
                        <h4 className="mt-0.5 text-lg font-bold text-[#21150c]">
                          {courseTitle}
                        </h4>
                        <p className="text-xs text-[#796c5c] mt-0.5">
                          {course.subtitle || "Complete Certified Program"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 line-through block">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-2xl font-bold text-[#a56b27]">
                          ₹{coursePrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-[#ecdcc3] pt-3 text-xs space-y-1.5 text-[#5c4a37]">
                      <div className="flex justify-between">
                        <span>Original Course Fee</span>
                        <span className="font-medium">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      {savings > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Special Batch Discount</span>
                          <span>- ₹{savings.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-[#ecdcc3] pt-2 text-sm font-bold text-[#21150c]">
                        <span>Total Payable via PayU</span>
                        <span className="text-[#a56b27]">
                          ₹{coursePrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Student Information Fields */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#796c5c]">
                      Student Details
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-[#302116] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={updateField}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-[#e2d9ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#a56b27]"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#302116] mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          value={form.mobile}
                          onChange={updateField}
                          placeholder="10-digit phone number"
                          className="w-full rounded-xl border border-[#e2d9ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#a56b27]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#302116] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={updateField}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-[#e2d9ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#a56b27]"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {error}
                    </p>
                  )}

                  {/* Direct PayU Pay Button */}
                  <button
                    type="submit"
                    disabled={status === "redirecting"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a56b27] to-[#c18b43] py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-105 disabled:opacity-50 cursor-pointer"
                  >
                    {status === "redirecting" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Redirecting to PayU Secure Gateway...
                      </>
                    ) : (
                      <>
                        <span>
                          Pay ₹{coursePrice.toLocaleString("en-IN")} via PayU Gateway
                        </span>
                        <span>→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#796c5c]">
                    🔒 Clicking pay will take you directly to PayU to choose UPI, Cards, NetBanking or Wallets.
                  </p>
                </form>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

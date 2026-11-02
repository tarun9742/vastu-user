"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { clearCart } from "@/lib/cart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get("txnid") || searchParams.get("mihpayid") || "";
  const status = searchParams.get("status") || "success";
  const orderId = searchParams.get("orderId") || "";
  const enrollmentId = searchParams.get("enrollmentId") || "";
  const reference = searchParams.get("reference") || "";
  const service = searchParams.get("service") || "";
  const donationId = searchParams.get("donationId") || (searchParams.get("type") === "donation" ? searchParams.get("udf1") : "");
  const amount = searchParams.get("amount") || "";
  
  const isDonation = searchParams.get("type") === "donation" || Boolean(donationId);
  const isTraining = !isDonation && (searchParams.get("type") === "training" || Boolean(enrollmentId));
  const isAppointment = !isDonation && !isTraining && (searchParams.get("type") === "appointment" || Boolean(reference));
  const isOrder = !isDonation && !isTraining && !isAppointment;

  useEffect(() => {
    if (isOrder && status === "success") {
      clearCart();
    }
  }, [isOrder, status]);

  return (
    <div className="mx-auto my-12 max-w-xl rounded-3xl border border-[#ecdcc3] bg-white p-8 text-center shadow-xl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
        {isDonation ? (
          <span className="text-3xl">🕊️</span>
        ) : isAppointment ? (
          <span className="text-3xl">📅</span>
        ) : (
          <svg
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        )}
      </div>

      <p className="text-[11px] font-bold uppercase tracking-widest text-[#a56b27]">
        {isDonation
          ? "Choti Khushi NGO • Bird Feeding Donation"
          : isAppointment
          ? "Vastu Consultation • Payment Verified"
          : isTraining
          ? "Course Training • Enrollment Verified"
          : "PayU Payment Verified"}
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#21150c]">
        {isDonation
          ? "Thank You For Your Noble Seva!"
          : isAppointment
          ? "Appointment Booked & Confirmed!"
          : isTraining
          ? "Course Enrollment Confirmed!"
          : "Order Placed Successfully!"}
      </h1>

      <p className="mt-2 text-sm text-[#796c5c]">
        {isDonation
          ? "Your compassionate contribution will directly provide grains and clean water to helpless birds. May your home be filled with boundless peace, health, and harmony."
          : isAppointment
          ? "Your consultation appointment has been scheduled and confirmed. Our Vastu expert team will reach out with session details."
          : isTraining
          ? "Your training seat has been reserved. You will receive course joining details and updates."
          : "Thank you for shopping with us. Your order has been placed and is being processed."}
      </p>

      {/* Details Box */}
      <div className="my-6 rounded-2xl border border-[#ecdcc3] bg-[#fbf5eb] p-5 text-left text-sm space-y-2.5">
        {isDonation && donationId && (
          <div className="flex justify-between items-center border-b border-[#ecdcc3] pb-2">
            <span className="text-[#8c7e6e] font-medium">Donation Receipt ID:</span>
            <span className="font-mono font-bold text-[#21150c] text-base">{donationId}</span>
          </div>
        )}
        {reference && isAppointment && (
          <div className="flex justify-between items-center border-b border-[#ecdcc3] pb-2">
            <span className="text-[#8c7e6e] font-medium">Appointment Reference:</span>
            <span className="font-mono font-bold text-[#21150c] text-base">{reference}</span>
          </div>
        )}
        {service && isAppointment && (
          <div className="flex justify-between items-center border-b border-[#ecdcc3] pb-2">
            <span className="text-[#8c7e6e] font-medium">Consultation Service:</span>
            <span className="font-bold text-[#21150c]">{service}</span>
          </div>
        )}
        {orderId && isOrder && (
          <div className="flex justify-between items-center border-b border-[#ecdcc3] pb-2">
            <span className="text-[#8c7e6e] font-medium">Order Number:</span>
            <span className="font-mono font-bold text-[#21150c] text-base">{orderId}</span>
          </div>
        )}
        {enrollmentId && isTraining && (
          <div className="flex justify-between items-center border-b border-[#ecdcc3] pb-2">
            <span className="text-[#8c7e6e] font-medium">Training Enrollment ID:</span>
            <span className="font-mono font-bold text-[#21150c] text-base">{enrollmentId}</span>
          </div>
        )}
        {amount && (
          <div className="flex justify-between items-center text-xs border-b border-[#ecdcc3] pb-2">
            <span className="text-[#8c7e6e]">Total Amount:</span>
            <span className="font-bold text-[#493827]">₹{Number(amount).toLocaleString("en-IN")}</span>
          </div>
        )}
        {txnid && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#8c7e6e]">Transaction Reference:</span>
            <span className="font-mono text-gray-700">{txnid}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#8c7e6e]">Payment Status:</span>
          <span className="font-bold text-emerald-700 uppercase">{status}</span>
        </div>
      </div>

      {isTraining && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-xs font-bold text-emerald-900 mb-2">
            Official Course Community
          </p>
          <a
            href="https://chat.whatsapp.com/BhuwneshwariMasterClass"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#20ba5a] transition"
          >
            <span>💬 Join Course WhatsApp Group / Channel</span>
            <span>→</span>
          </a>
        </div>
      )}

      {isDonation && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-center">
          <p className="text-xs font-medium text-[#795724]">
            A record of this contribution has been saved to your account. You can track your donation history anytime in your dashboard.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {isDonation ? (
          <>
            <Link
              href="/dashboard"
              className="rounded-xl bg-[#21150c] px-6 py-3 text-xs font-bold text-white hover:bg-[#382416] transition"
            >
              View My Dashboard
            </Link>
            <Link
              href="/donation"
              className="rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              Donate Again
            </Link>
          </>
        ) : isAppointment ? (
          <>
            <Link
              href="/appointment"
              className="rounded-xl bg-[#21150c] px-6 py-3 text-xs font-bold text-white hover:bg-[#382416] transition"
            >
              View My Appointments
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              My Dashboard
            </Link>
          </>
        ) : isTraining ? (
          <>
            <Link
              href="/dashboard"
              className="rounded-xl bg-[#21150c] px-6 py-3 text-xs font-bold text-white hover:bg-[#382416] transition"
            >
              View Enrolled Courses
            </Link>
            <Link
              href="/training"
              className="rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              Back to Training
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="rounded-xl bg-[#21150c] px-6 py-3 text-xs font-bold text-white hover:bg-[#382416] transition"
            >
              View My Orders
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-[70vh] bg-[#fcfaf5] px-4 py-12 flex items-center justify-center">
      <Suspense fallback={<div className="text-center p-8">Loading payment details...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}

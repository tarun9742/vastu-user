"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function FailureContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get("txnid") || "";
  const errorMsg = searchParams.get("error") || "Payment was cancelled or could not be completed.";

  return (
    <div className="mx-auto my-12 max-w-xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <p className="text-[11px] font-bold uppercase tracking-widest text-red-600">
        Payment Incomplete
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#21150c]">
        Payment Was Not Completed
      </h1>

      <p className="mt-2 text-sm text-[#796c5c]">
        {errorMsg}
      </p>

      {txnid && (
        <div className="my-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs font-mono text-gray-700">
          Ref: {txnid}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/training"
          className="rounded-xl bg-[#21150c] px-6 py-3 text-xs font-bold text-white hover:bg-[#382416] transition"
        >
          Try Training Enrollment Again
        </Link>
        <Link
          href="/checkout"
          className="rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
        >
          Back to Checkout
        </Link>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <main className="min-h-[70vh] bg-[#fcfaf5] px-4 py-12 flex items-center justify-center">
      <Suspense fallback={<div className="text-center p-8">Loading details...</div>}>
        <FailureContent />
      </Suspense>
    </main>
  );
}

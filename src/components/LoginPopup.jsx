"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCurrentUser, saveCurrentUser } from "@/lib/auth";

export default function LoginPopup() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [returnTo, setReturnTo] = useState("/");
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(30);
  const [success, setSuccess] = useState(false);

  const closePopup = useCallback(() => {
    setOpen(false);
    setError("");
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleOpen = (event) => {
      const destination = event.detail?.returnTo || "/";
      setReturnTo(destination);
      setPhone("");
      setOtp("");
      setError("");
      setStep("phone");
      setSuccess(false);
      setResendSeconds(30);
      setOpen(true);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") closePopup();
    };

    window.addEventListener("bsv-open-login", handleOpen);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("bsv-open-login", handleOpen);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closePopup]);

  useEffect(() => {
    if (!open || step !== "otp" || resendSeconds <= 0) return;

    const timer = window.setTimeout(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [open, step, resendSeconds]);

  async function sendOtp(event) {
    event.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setLoading(true);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(
        /\/$/,
        "",
      );
      const response = await fetch(`${apiBase}/api/auth/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone: digits }),
      });
      const result = await response.json().catch(() => ({}));
      console.log(result.success)
      if (!response.ok )
        throw new Error(
          result.error || "Unable to send OTP. Please try again.",
        );
      setPhone(digits);
      setStep("otp");
      setOtp("");
      setResendSeconds(30);
    } catch (error) {
      setError(error.message || "Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    if (resendSeconds > 0 || loading) return;
    setError("");
    setLoading(true);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(
        /\/$/,
        "",
      );
      const response = await fetch(`${apiBase}/api/auth/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok )
        throw new Error(result.error || "Unable to resend OTP.");
      setResendSeconds(30);
      setOtp("");
    } catch (error) {
      setError(error.message || "Unable to resend OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter all 6 digits of the OTP.");
      return;
    }
    setLoading(true);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(
        /\/$/,
        "",
      );
      const response = await fetch(`${apiBase}/api/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, code: otp }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success || !result.data)
        throw new Error(
          result.error || "Incorrect or expired verification code.",
        );
      const user = { ...result.data, loggedInAt: new Date().toISOString() };
      saveCurrentUser(user);
      setSuccess(true);
      window.setTimeout(
        () => {
          setOpen(false);
          router.push(user.role === "admin" ? "/admin" : returnTo);
        },
        reduceMotion ? 0 : 700,
      );
    } catch (error) {
      setError(
        error.message || "Unable to verify mobile number. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const slide = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 18 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -18 },
        transition: { duration: 0.22 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-[#17120e]/55 p-0 backdrop-blur-md sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 27 }}
            className="relative max-h-[92dvh] w-full max-w-[460px] overflow-y-auto rounded-t-[30px] border border-white/70 bg-[#fbf8f1] text-[#2b241d] shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:rounded-[30px]"
          >
            {/* Decorative header */}
            <div className="relative overflow-hidden bg-[#292119] px-6 pb-7 pt-7 text-white sm:px-8 sm:pt-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(218,177,98,0.25),transparent_48%)]" />

              <button
                type="button"
                onClick={closePopup}
                aria-label="Close login popup"
                className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl transition hover:bg-white/20"
              >
                ×
              </button>

              <div className="relative flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d9b46d]/40 bg-[#d9b46d]/10 text-[#f2d99f]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 3 14.5 9.5 21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e6c987]">
                    Bhuwneshwari Scientific Vastu
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Your space. Your journey.
                  </p>
                </div>
              </div>

              <div className="relative mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c987]">
                  {success
                    ? "Welcome aboard"
                    : step === "phone"
                      ? "A more personal experience"
                      : "One last step"}
                </p>
                <h2
                  id="login-title"
                  className="mt-2 text-3xl font-semibold tracking-tight sm:text-[34px]"
                >
                  {success
                    ? "You're signed in!"
                    : step === "phone"
                      ? "Login or sign up"
                      : "Verify your number"}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                  {success
                    ? "Taking you to the next step…"
                    : step === "phone"
                      ? "Use your mobile number to continue shopping and manage your orders."
                      : `Enter the 6-digit code for +91 ${phone}.`}
                </p>
              </div>
            </div>

            <div className="px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
              {success ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 13,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </motion.div>
                  <p className="mt-4 text-base font-semibold">
                    Mobile number verified
                  </p>
                  <p className="mt-1 text-sm text-[#817568]">
                    Redirecting you now…
                  </p>
                </motion.div>
              ) : step === "phone" ? (
                <AnimatePresence mode="wait">
                  <motion.form key="phone-form" {...slide} onSubmit={sendOtp}>
                    <label
                      htmlFor="login-phone"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Mobile number
                    </label>

                    <div className="flex overflow-hidden rounded-2xl border border-[#dfd5c5] bg-white transition focus-within:border-[#b18b4e] focus-within:ring-4 focus-within:ring-[#b18b4e]/10">
                      <span className="flex items-center border-r border-[#e9e1d5] bg-[#f8f4ec] px-4 text-sm font-semibold text-[#6e6254]">
                        🇮🇳 +91
                      </span>
                      <input
                        id="login-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={10}
                        required
                        autoFocus
                        value={phone}
                        onChange={(event) => {
                          setPhone(
                            event.target.value.replace(/\D/g, "").slice(0, 10),
                          );
                          setError("");
                        }}
                        placeholder="10-digit mobile number"
                        className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base outline-none placeholder:text-[#b0a597]"
                      />
                    </div>

                    {error && (
                      <p role="alert" className="mt-3 text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#292119] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#292119]/10 transition hover:-translate-y-0.5 hover:bg-[#59432d] disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending code…
                        </>
                      ) : (
                        <>
                          Continue with OTP <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>

                    <p className="mt-4 text-center text-xs leading-5 text-[#8a7e6e]">
                      By continuing, you agree to our Terms of Service and
                      Privacy Policy.
                    </p>
                  </motion.form>
                </AnimatePresence>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.form key="otp-form" {...slide} onSubmit={verifyOtp}>
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">
                          Enter verification code
                        </p>
                        <p className="mt-1 text-xs text-[#817568]">
                          Sent to +91 {phone}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setStep("phone");
                          setOtp("");
                          setError("");
                        }}
                        className="text-xs font-semibold text-[#98733a] underline underline-offset-4"
                      >
                        Change
                      </button>
                    </div>

                    <label
                      htmlFor="login-otp"
                      className="mb-2 block text-sm font-semibold"
                    >
                      6-digit OTP
                    </label>
                    <input
                      id="login-otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      required
                      autoFocus
                      value={otp}
                      onChange={(event) => {
                        setOtp(
                          event.target.value.replace(/\D/g, "").slice(0, 6),
                        );
                        setError("");
                      }}
                      placeholder="• • • • • •"
                      className="w-full rounded-2xl border border-[#dfd5c5] bg-white px-4 py-4 text-center text-2xl font-semibold tracking-[0.45em] outline-none transition placeholder:text-[#c2b7a7] focus:border-[#b18b4e] focus:ring-4 focus:ring-[#b18b4e]/10"
                    />

                    {error && (
                      <p role="alert" className="mt-3 text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#292119] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#292119]/10 transition hover:-translate-y-0.5 hover:bg-[#59432d] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Verifying…
                        </>
                      ) : (
                        <>
                          Verify & Continue <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>

                    <div className="mt-5 text-center text-sm text-[#817568]">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        disabled={resendSeconds > 0 || loading}
                        onClick={resendOtp}
                        className="font-semibold text-[#98733a] disabled:cursor-not-allowed disabled:text-[#b0a597]"
                      >
                        {resendSeconds > 0
                          ? `Resend in 00:${String(resendSeconds).padStart(2, "0")}`
                          : "Resend OTP"}
                      </button>
                    </div>

                    {/* <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                      <strong>Development demo:</strong> use OTP{" "}
                      <code className="rounded bg-amber-100 px-1.5 py-0.5 font-bold">
                        123456
                      </code>
                      . No SMS is sent.
                    </div> */}
                  </motion.form>
                </AnimatePresence>
              )}

              {/* {!success && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8a7e6e]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                  </svg>
                  Your demo session stays in this browser
                </div>
              )} */}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

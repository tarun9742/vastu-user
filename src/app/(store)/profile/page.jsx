
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCurrentUser, saveCurrentUser, openLoginPopup } from "@/lib/auth";
import AccountLayout from "@/components/account/AccountLayout";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setName(current?.name || "");
    setLoading(false);
  }, []);

  function handleSave(event) {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setMessage("Please enter your name.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const updatedUser = { ...user, name: cleanName };
      saveCurrentUser(updatedUser);
      setUser(updatedUser);
      setMessage("Your profile has been updated successfully.");
    } catch {
      setMessage("Unable to save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="min-h-[50vh] animate-pulse bg-[#faf7f0]" />;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#382b20]">
          Sign in to view your profile
        </h1>
        <p className="mt-3 text-sm text-[#766552]">
          Log in to manage your account details.
        </p>
        <button
          onClick={() => openLoginPopup("/profile")}
          className="mt-6 rounded-xl bg-[#986122] px-6 py-3 font-semibold text-white"
        >
          Login to your account
        </button>
      </div>
    );
  }

  return (
    <AccountLayout
      title="My Profile"
      subtitle="Manage your personal information and keep your account details up to date."
      user={user}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(240px,0.7fr)]">
        <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#f4e3c1] to-[#d3aa66] font-serif text-2xl font-bold text-[#75481b]">
              {(user.name || user.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#382b20]">
                Personal Details
              </h2>
              <p className="mt-1 text-sm text-[#8b7a66]">
                Update your display name below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-[#514131]"
              >
                Full name
              </label>
              <input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#e5d8c4] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#382b20] outline-none transition placeholder:text-[#b4a695] focus:border-[#ad762f] focus:ring-4 focus:ring-[#ad762f]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#514131]">
                Email address
              </label>
              <input
                value={user.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-[#eee5d9] bg-[#f8f5ef] px-4 py-3.5 text-sm text-[#857563]"
              />
              <p className="mt-2 text-xs text-[#9b8a77]">
                Your email is shown from your current account details.
              </p>
            </div>

            {user.mobile && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514131]">
                  Mobile number
                </label>
                <input
                  value={user.mobile}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#eee5d9] bg-[#f8f5ef] px-4 py-3.5 text-sm text-[#857563]"
                />
              </div>
            )}

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className={`rounded-xl px-4 py-3 text-sm ${
                  message.startsWith("Your")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8e571e] to-[#b77b32] px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
              {!saving && <span>→</span>}
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <span className="text-2xl">✦</span>
            <h3 className="mt-3 font-serif text-xl font-bold text-[#382b20]">
              Your account
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#7b6a56]">
              Keep your profile information accurate for a smoother shopping
              and consultation experience.
            </p>
          </div>

          <div className="rounded-2xl bg-[#f1e4ce] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#986122]">
              Need assistance?
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold text-[#382b20]">
              We’re here to help
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6f5941]">
              Reach out to our team for help with your account or Vastu
              consultation.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8e571e] hover:underline"
            >
              Contact us →
            </a>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

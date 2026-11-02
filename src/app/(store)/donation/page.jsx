"use client";



import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {

  Heart,

  Feather,

  Sparkles,

  ShieldCheck,

  CheckCircle2,

  Calendar,

  Users,

  Wheat,

  Share2,

  ArrowRight,

  Receipt,

  HelpCircle,

} from "lucide-react";

import { getCurrentUser } from "@/lib/auth";



export default function DonationPage() {

  const [selectedAmount, setSelectedAmount] = useState(1000);

  const [customAmount, setCustomAmount] = useState("");

  const [donorName, setDonorName] = useState("");

  const [donorPhone, setDonorPhone] = useState("");

  const [donorEmail, setDonorEmail] = useState("");

  const [pan, setPan] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [suggestedAmounts, setSuggestedAmounts] = useState([500, 1000, 10000]);

  const [ngoTitle, setNgoTitle] = useState("Choti Khushi NGO - feeding work for Birds");

  const [ngoDescription, setNgoDescription] = useState(

    "Support our daily feeding work for birds across temples, rooftops, and sanctuaries. Every grain brings peace, good karma, and life."

  );



  const apiBase = (

    process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001"

  ).replace(/\/$/, "");



  // Prefill with logged in user if available

  useEffect(() => {

    const user = getCurrentUser();

    if (user) {

      if (user.name) setDonorName(user.name);

      if (user.phone) setDonorPhone(user.phone);

      if (user.email) setDonorEmail(user.email);

    }



    // Fetch settings for admin-configured suggested amounts

    async function loadSettings() {

      try {

        const res = await fetch(`${apiBase}/api/settings`);

        if (res.ok) {

          const json = await res.json();

          if (json.success && json.data?.donation) {

            const don = json.data.donation;

            if (don.ngoName) setNgoTitle(don.ngoName);

            if (don.description) setNgoDescription(don.description);

            if (don.suggestedAmounts) {

              const parsed = don.suggestedAmounts

                .split(",")

                .map((s) => Number(s.trim()))

                .filter((n) => !isNaN(n) && n > 0);

              if (parsed.length > 0) {

                setSuggestedAmounts(parsed);

                setSelectedAmount(parsed[1] || parsed[0]);

              }

            }

          }

        }

      } catch (e) {

        console.error("Error loading settings:", e);

      }

    }



    loadSettings();

  }, [apiBase]);



  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;



  const impactNotes = {

    500: "Feeds ~50 birds with nutrient-rich grains (bajra, seeds) and clean water for a week.",

    1000: "Provides daily millet and fresh earthen water pots for 100+ pigeons and sparrows for two weeks.",

    2500: "Sponsors grain bags and seasonal care nests for community birds across multiple locations.",

    5000: "Enables rescue care, healing feeds, and sustained nourishment for nesting birds.",

    10000: "Sponsors complete feeding stations, safe earthen pots, and daily grain supply for a whole season.",

  };



  const currentImpact =

    impactNotes[activeAmount] ||

    `Generously provides ₹${activeAmount?.toLocaleString("en-IN") || 0} worth of nutritious seeds, fresh grains, and drinking water for thirsty birds.`;



  async function handleDonate(e) {

    e.preventDefault();

    setError("");



    if (!donorName.trim()) {

      setError("Please enter your full name.");

      return;

    }



    const cleanPhone = donorPhone.replace(/\D/g, "").slice(-10);

    if (cleanPhone.length < 10) {

      setError("Please enter a valid 10-digit mobile number.");

      return;

    }



    if (!activeAmount || activeAmount < 10) {

      setError("Minimum contribution amount is ₹10.");

      return;

    }



    setLoading(true);



    try {

      const res = await fetch(`${apiBase}/api/donations/initiate`, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({

          donorName: donorName.trim(),

          donorPhone: cleanPhone,

          donorEmail: donorEmail.trim(),

          amount: activeAmount,

          pan: pan.trim().toUpperCase(),

          message: message.trim(),

        }),

      });



      const data = await res.json();

      if (!res.ok || !data.success) {

        throw new Error(data.error || "Unable to initiate payment");

      }



      // Direct POST to PayU Gateway

      const formEl = document.createElement("form");

      formEl.method = "POST";

      formEl.action = data.actionUrl || "https://test.payu.in/_payment";



      Object.entries(data.payuParams || {}).forEach(([key, value]) => {

        const input = document.createElement("input");

        input.type = "hidden";

        input.name = key;

        input.value = value ?? "";

        formEl.appendChild(input);

      });



      document.body.appendChild(formEl);

      formEl.submit();

    } catch (err) {

      console.error("Donation initiation error:", err);

      setError(err.message || "Failed to connect to payment gateway. Please try again.");

      setLoading(false);

    }

  }



  return (

    <div className="min-h-screen bg-[#faf6ef] text-[#2c1d11]">

      {/* HERO BANNER */}

      <section className="relative overflow-hidden bg-gradient-to-b from-[#24170d] via-[#332214] to-[#1e130a] py-20 px-4 text-white sm:py-24 sm:px-6">

        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5bc76_1px,transparent_1px)] [background-size:24px_24px]" />



        {/* Soft atmospheric glow */}

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#d4a359]/20 blur-3xl pointer-events-none" />



        <div className="relative mx-auto max-w-5xl text-center">


          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="mx-auto mb-7 w-full max-w-[560px] overflow-hidden rounded-3xl border border-white/25 bg-white/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
          >
            <img
              src="/assets/1001147962.png"
              alt="Choti Khushi NGO for Birds Feeding — a part of Bhuwneshwari Realtors Pvt Ltd"
              className="h-auto w-full rounded-2xl object-contain"
              loading="eager"
            />
          </motion.div>

          <motion.div

            initial={{ opacity: 0, y: 15 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6 }}

            className="inline-flex items-center gap-2 rounded-full border border-[#e5bc76]/30 bg-[#2d1e11]/80 px-4 py-1.5 text-xs font-semibold text-[#f0caa0] shadow-sm backdrop-blur"

          >

            <Feather className="h-3.5 w-3.5 text-[#e5bc76]" />

            <span>Punya & Compassion for Voiceless Souls</span>

            <Sparkles className="h-3.5 w-3.5 text-[#e5bc76]" />

          </motion.div>



          <motion.h1

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7, delay: 0.1 }}

            className="mt-6 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#fff5ea]"

          >

            {ngoTitle}

          </motion.h1>



          <motion.p

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7, delay: 0.2 }}

            className="mx-auto mt-5 max-w-2xl text-base text-[#d9c7b2] sm:text-lg leading-relaxed"

          >

            {ngoDescription}

          </motion.p>



          <motion.div

            initial={{ opacity: 0, scale: 0.95 }}

            animate={{ opacity: 1, scale: 1 }}

            transition={{ duration: 0.7, delay: 0.3 }}

            className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#f0ddca]"

          >

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 border border-white/10 backdrop-blur-sm">

              <Wheat className="h-4 w-4 text-[#e5bc76]" />

              <span>100% Grains & Water Fund</span>

            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 border border-white/10 backdrop-blur-sm">

              <Receipt className="h-4 w-4 text-[#e5bc76]" />

              <span>Instant Digital Receipt</span>

            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 border border-white/10 backdrop-blur-sm">

              <ShieldCheck className="h-4 w-4 text-emerald-400" />

              <span>Verified PayU Gateway</span>

            </div>

          </motion.div>

        </div>

      </section>



      {/* CHOTI KHUSHI CAMPAIGN ARTWORK */}
      <section className="relative z-10 mx-auto -mt-8 w-full max-w-6xl px-4 sm:px-6">
        
        
        <div className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-2 text-center text-sm font-medium text-[#5e472c]">
          <Heart className="h-4 w-4 shrink-0 fill-[#b67a30] text-[#b67a30]" />
          <span>Small acts of kindness can bring big happiness to our feathered friends.</span>
        </div>
      </section>

      {/* MAIN DONATION CONTAINER */}

      <section className="relative -mt-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6">

        <motion.div

          initial={{ opacity: 0, y: 25 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6, delay: 0.2 }}

          className="rounded-3xl border border-[#ecdac2] bg-white p-6 shadow-2xl sm:p-10"

        >

          <div className="border-b border-[#f1e4d3] pb-6 text-center">

            <h2 className="font-serif text-2xl font-bold text-[#2e1c0e] sm:text-3xl">

              Choose Your Contribution

            </h2>

            <p className="mt-1 text-sm text-[#826f5d]">

              In Vedic tradition, feeding birds brings peace to your home and balances universal energies.

            </p>

          </div>



          <form onSubmit={handleDonate} className="mt-8 space-y-8">

            {/* AMOUNT SELECTION */}

            <div> 



              {/* CUSTOM AMOUNT INPUT */}

              <div className="mt-4">

                <div className="relative">

                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold text-[#8f6e4a]">

                    ₹

                  </span>

                  <input

                    type="number"

                    min="10"

                    placeholder="Enter amount"

                    value={customAmount}

                    onChange={(e) => {

                      setCustomAmount(e.target.value);

                      if (e.target.value) {

                        setSelectedAmount(null);

                      }

                    }}

                    className={`w-full rounded-2xl border py-3.5 pl-9 pr-4 text-sm font-semibold transition ${

                      customAmount

                        ? "border-[#b37834] bg-[#fbf5eb] ring-2 ring-[#b37834]/20 text-[#3d240c]"

                        : "border-[#e0d2be] bg-[#faf6ee] text-[#4d3a29] focus:border-[#b37834] focus:bg-white focus:outline-none"

                    }`}

                  />

                </div>

              </div>



              {/* LIVE IMPACT CARD */}

              <motion.div

                key={activeAmount}

                initial={{ opacity: 0, scale: 0.98 }}

                animate={{ opacity: 1, scale: 1 }}

                className="mt-4 flex items-start gap-3 rounded-2xl border border-[#ebd7be] bg-gradient-to-r from-[#fbf5eb] to-[#f5ebd8] p-4 text-xs sm:text-sm text-[#66492b]"

              >

                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#ead4b5] text-[#87551f]">

                  🕊️

                </div>

                <div>

                  <span className="font-bold text-[#442c16]">Your Direct Impact: </span>

                  <span className="leading-relaxed">{currentImpact}</span>

                </div>

              </motion.div>

            </div>



            {/* DONOR INFORMATION */}

            <div className="space-y-4 pt-2">

              <h3 className="font-serif text-lg font-bold text-[#352213] border-b border-[#f1e4d3] pb-2">

                Donor Details

              </h3>



              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="block text-xs font-semibold text-[#665342]">

                    Full Name *

                  </label>

                  <input

                    type="text"

                    required

                    placeholder="e.g. Ramesh Kumar"

                    value={donorName}

                    onChange={(e) => setDonorName(e.target.value)}

                    className="mt-1 w-full rounded-xl border border-[#ded0bd] bg-[#fdfcf9] px-4 py-2.5 text-sm text-[#2a1a0d] focus:border-[#a86e2d] focus:bg-white focus:outline-none"

                  />

                </div>



                <div>

                  <label className="block text-xs font-semibold text-[#665342]">

                    Mobile Phone (for receipt & SMS) *

                  </label>

                  <input

                    type="tel"

                    required

                    maxLength={10}

                    placeholder="10-digit mobile number"

                    value={donorPhone}

                    onChange={(e) => setDonorPhone(e.target.value)}

                    className="mt-1 w-full rounded-xl border border-[#ded0bd] bg-[#fdfcf9] px-4 py-2.5 text-sm text-[#2a1a0d] focus:border-[#a86e2d] focus:bg-white focus:outline-none"

                  />

                </div>



                <div>

                  <label className="block text-xs font-semibold text-[#665342]">

                    Email Address (optional)

                  </label>

                  <input

                    type="email"

                    placeholder="For instant digital receipt"

                    value={donorEmail}

                    onChange={(e) => setDonorEmail(e.target.value)}

                    className="mt-1 w-full rounded-xl border border-[#ded0bd] bg-[#fdfcf9] px-4 py-2.5 text-sm text-[#2a1a0d] focus:border-[#a86e2d] focus:bg-white focus:outline-none"

                  />

                </div>



                <div>

                  <label className="block text-xs font-semibold text-[#665342]">

                    PAN Number (optional, for tax records)

                  </label>

                  <input

                    type="text"

                    maxLength={10}

                    placeholder="e.g. ABCDE1234F"

                    value={pan}

                    onChange={(e) => setPan(e.target.value.toUpperCase())}

                    className="mt-1 w-full rounded-xl border border-[#ded0bd] bg-[#fdfcf9] px-4 py-2.5 text-sm text-[#2a1a0d] focus:border-[#a86e2d] focus:bg-white focus:outline-none"

                  />

                </div>

              </div>



              <div>

                <label className="block text-xs font-semibold text-[#665342]">

                  Blessings / Prayer / Message (optional)

                </label>

                <textarea

                  rows={2}

                  placeholder="In memory of ancestors, birthday blessings, or family well-being..."

                  value={message}

                  onChange={(e) => setMessage(e.target.value)}

                  className="mt-1 w-full rounded-xl border border-[#ded0bd] bg-[#fdfcf9] px-4 py-2.5 text-sm text-[#2a1a0d] focus:border-[#a86e2d] focus:bg-white focus:outline-none"

                />

              </div>

            </div>



            {/* ERROR DISPLAY */}

            {error && (

              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">

                {error}

              </div>

            )}



            {/* SUBMIT BUTTON */}

            <div>

              <button

                type="submit"

                disabled={loading}

                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#986122] via-[#b67a30] to-[#8d581c] py-4 px-8 text-base font-bold text-white shadow-xl transition-all duration-300 hover:brightness-110 active:scale-[0.99] disabled:opacity-60"

              >

                {loading ? (

                  <>

                    <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">

                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />

                    </svg>

                    <span>Connecting to Secure PayU Gateway...</span>

                  </>

                ) : (

                  <>

                    <Heart className="h-5 w-5 fill-white" />

                    <span>Proceed to Donate ₹{Number(activeAmount || 0).toLocaleString("en-IN")} via PayU</span>

                    <ArrowRight className="h-5 w-5" />

                  </>

                )}

              </button>



              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#8f7965]">

                <ShieldCheck className="h-4 w-4 text-emerald-600" />

                <span>Secured by 256-Bit SSL Encryption • PayU India Verified Partner</span>

              </div>

            </div>

          </form>

        </motion.div>



        {/* WHY FEED BIRDS ACCORDING TO VASTU & SHASTRA */}

        <div className="mt-12 grid gap-6 sm:grid-cols-3">

          <div className="rounded-2xl border border-[#eee2d0] bg-white p-6 shadow-sm">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7ecd9] text-xl text-[#a36e2f]">

              🪐

            </div>

            <h4 className="mt-4 font-serif text-base font-bold text-[#3b2716]">

              Planetary Harmony

            </h4>

            <p className="mt-2 text-xs text-[#796754] leading-relaxed">

              Feeding birds regularly pacifies malefic influences of Saturn, Rahu, and Ketu according to Vedic wisdom.

            </p>

          </div>



          <div className="rounded-2xl border border-[#eee2d0] bg-white p-6 shadow-sm">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7ecd9] text-xl text-[#a36e2f]">

              🪷

            </div>

            <h4 className="mt-4 font-serif text-base font-bold text-[#3b2716]">

              Home Vastu Energy

            </h4>

            <p className="mt-2 text-xs text-[#796754] leading-relaxed">

              Bird chirping and daily grain offerings in North-East and North bring positive prana energy and prosperity.

            </p>

          </div>



          <div className="rounded-2xl border border-[#eee2d0] bg-white p-6 shadow-sm">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7ecd9] text-xl text-[#a36e2f]">

              🙏

            </div>

            <h4 className="mt-4 font-serif text-base font-bold text-[#3b2716]">

              Punya for Ancestors

            </h4>

            <p className="mt-2 text-xs text-[#796754] leading-relaxed">

              In Sanatana Dharma, birds represent connecting links between realms. Feeding them brings peace to Pitrus (ancestors).

            </p>

          </div>

        </div>

      </section>

    </div>

  );

}

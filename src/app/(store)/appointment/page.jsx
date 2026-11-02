"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getCurrentUser } from "@/lib/auth";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  User,
  MapPin,
  ChevronRight,
  ArrowLeft,
  CalendarCheck,
  Search,
  Plus,
  Trash2,
  FileText,
  Building,
  Video,
  Navigation,
  Pencil,
  ShieldCheck,
} from "lucide-react";

const DEFAULT_SERVICES = [
  {
    _id: "default-1",
    name: "Residential Vastu",
    description: "Create a harmonious and positive home environment with personalized directional energy balancing.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
    icon: "⌂",
    features: [
      "Home & Villa Vastu Assessment",
      "Plan Analysis & Spatial Corrections",
      "Directional Energy Balancing",
      "Detailed Layout Correction Roadmap",
    ],
  },
  {
    _id: "default-2",
    name: "Commercial Vastu",
    description: "Enhance business growth, revenue stability, and corporate workspace harmony.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=85",
    icon: "▥",
    features: [
      "Office, Showroom & Retail Vastu",
      "Cash Flow & Financial Corner Energizing",
      "Leadership Desk & Seating Alignment",
      "Customer Flow & Entrance Optimization",
    ],
  },
  {
    _id: "default-3",
    name: "Industrial Vastu",
    description: "Practical guidance for factories, manufacturing layouts and warehouse operations.",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=700&q=85",
    icon: "⚒",
    features: [
      "Factory & Industrial Unit Layout",
      "Heavy Machinery & Raw Material Orientation",
      "Boiler, Transformer & Fire Zone Balancing",
      "Safety, Labor Stability & Productivity",
    ],
  },
  {
    _id: "default-4",
    name: "Site Visit (On Location)",
    description: "Personalized on-site property Vastu analysis with live directional magnetic compass.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85",
    icon: "⌖",
    features: [
      "Detailed On-Ground Site Inspection",
      "Soil, Slope & Energy Rod Assessment",
      "Compass Direction Verification",
      "Comprehensive Remedial Strategy",
    ],
  },
  {
    _id: "default-5",
    name: "Vastu for Single Person",
    description: "Personalized astrological & spatial energy alignment tailored to individual room & workspace.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=85",
    icon: "👤",
    features: [
      "Individual Aura & Direction Alignment",
      "Personal Bedroom & Study Desk Orientation",
      "Astro-Directional Harmonization",
      "Career, Focus & Peace of Mind Remedies",
    ],
  },
];

const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

const inputClass =
  "w-full rounded-xl border border-[#e6dfd3] bg-white px-3.5 py-3 text-sm text-[#34271b] outline-none transition placeholder:text-[#95897b] focus:border-[#b9843c] focus:ring-4 focus:ring-[#b9843c]/10";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function SectionTitle({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="shrink-0 font-serif text-lg font-bold text-[#302116] sm:text-xl">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-[#bd8b45] to-transparent" />
    </div>
  );
}

function Field({ label, children, required = false, help = "" }) {
  return (
    <label className="block min-w-0">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="block text-xs font-semibold text-[#655747]">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {help && <span className="text-[11px] text-zinc-400">{help}</span>}
      </div>
      {children}
    </label>
  );
}

export default function AppointmentPage() {
  const reduceMotion = useReducedMotion();

  // Active view: "book" | "history"
  const [activeTab, setActiveTab] = useState("book");

  // Dynamic live services from backend
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Dynamic step management
  // Step 1: Select Service
  // Step 2: Choose Mode & Location (with fee calculation)
  // Step 3: Schedule Date & Time
  // Step 4: Fill PDF Registration Details (or Single Person details)
  // Step 5: Review & Edit Complete Details, then Proceed to PayU
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error"
  const [feedback, setFeedback] = useState("");

  // Customer history state
  const [customerPhone, setCustomerPhone] = useState("");
  const [myAppointments, setMyAppointments] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Form Booking Data
  const [booking, setBooking] = useState({
    // Header
    clientId: "",
    documentNo: "",
    service: "Residential Vastu",
    serviceId: "",

    // Mode & Location
    consultationMode: "site_visit", // "video_call" | "office_visit" | "site_visit"
    distanceTier: "within_jaipur", // "within_jaipur" | "within_200km" | "within_200_300km" | "above_300km"

    // Schedule
    date: "",
    time: "10:00 AM",

    // Client Particulars
    name: "",
    fatherOrSpouseName: "",
    phone: "",
    email: "",
    residentialAddress: "",
    occupation: "",

    // Property Particulars (for non-single person)
    propertyOwnerName: "",
    propertyAddress: "",
    propertyType: "Residential",
    approximateArea: "",
    numberOfFloors: "1",
    propertyPlanProvided: true,
    clientConcerns: "",

    // Family Members Table
    familyMembers: [
      { name: "", relation: "", concern: "" }
    ],

    // Declaration & Consent
    declarationAccepted: false,
  });

  const apiBase = (
    process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  // Initialize Reference & Client ID
  useEffect(() => {
    const timestamp = Date.now().toString().slice(-8);
    const docNo = `BSV-APT-${timestamp}`;
    const user = getCurrentUser();
    const cPhone = user?.phone ? user.phone.replace(/\D/g, "") : "";

    setBooking((prev) => ({
      ...prev,
      documentNo: docNo,
      clientId: prev.clientId || (cPhone ? `CLT-${cPhone.slice(-6)}` : `CLT-${timestamp.slice(-6)}`),
      name: user?.name || prev.name,
      email: user?.email || prev.email,
      phone: cPhone || prev.phone,
    }));

    if (cPhone) {
      setCustomerPhone(cPhone);
    }
  }, []);

  // Fetch Services from API
  useEffect(() => {
    async function loadServices() {
      try {
        setServicesLoading(true);
        const res = await fetch(`${apiBase}/api/services`);
        const json = await res.json();
        if (json?.success && Array.isArray(json?.data) && json.data.length > 0) {
          setServices(json.data);
          const first = json.data[0];
          setBooking((prev) => ({
            ...prev,
            service: first.name,
            serviceId: first._id,
          }));
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setServicesLoading(false);
      }
    }
    loadServices();
  }, [apiBase]);

  // Load Customer's Appointment History
  async function loadMyAppointments(phoneToUse) {
    const p = (phoneToUse || customerPhone).replace(/\D/g, "");
    if (!p || p.length < 10) return;

    try {
      setHistoryLoading(true);
      const res = await fetch(`${apiBase}/api/appointments/my?phone=${p}`);
      const json = await res.json();
      if (json?.success && Array.isArray(json?.data)) {
        setMyAppointments(json.data);
      }
    } catch (err) {
      console.error("Failed to load customer appointments:", err);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "history" && customerPhone) {
      loadMyAppointments(customerPhone);
    }
  }, [activeTab, customerPhone]);

  // Check if current service is Single Person Vastu
  const isPersonalVastu = useMemo(() => {
    const s = String(booking.service || "").toLowerCase();
    return s.includes("single person") || s.includes("personal");
  }, [booking.service]);

  // Exact Fee Calculation as requested:
  // 1. Video Call OR Office Visit (customer visits office): ₹2,100
  // 2. On-Site Property Visit:
  //    - Within Jaipur: ₹11,000
  //    - Around 200 km radius: ₹21,000
  //    - 200 - 300 km: ₹31,000
  //    - Above 300 km: ₹51,000
  const fee = useMemo(() => {
    if (booking.consultationMode === "video_call" || booking.consultationMode === "office_visit") {
      return 2100;
    }
    switch (booking.distanceTier) {
      case "within_jaipur":
        return 11000;
      case "within_200km":
        return 21000;
      case "within_200_300km":
        return 31000;
      case "above_300km":
        return 51000;
      default:
        return 11000;
    }
  }, [booking.consultationMode, booking.distanceTier]);

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const formattedDate = useMemo(() => {
    if (!booking.date) return "Not selected yet";
    const d = new Date(`${booking.date}T12:00:00`);
    return Number.isNaN(d.getTime())
      ? booking.date
      : d.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  }, [booking.date]);

  function updateField(key, value) {
    setBooking((prev) => ({ ...prev, [key]: value }));
    setFeedback("");
  }

  // Family Members Table Handlers
  function addFamilyMember() {
    setBooking((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { name: "", relation: "", concern: "" }],
    }));
  }

  function removeFamilyMember(index) {
    setBooking((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((_, i) => i !== index),
    }));
  }

  function updateFamilyMember(index, field, value) {
    setBooking((prev) => {
      const updated = [...prev.familyMembers];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, familyMembers: updated };
    });
  }

  // Validation before advancing
  function validateAndNext() {
    setFeedback("");

    if (step === 1) {
      if (!booking.service) {
        setFeedback("Please select a consultation service.");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!booking.consultationMode) {
        setFeedback("Please choose your consultation mode (Video Call, Office Visit, or On-Site Visit).");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!booking.date) {
        setFeedback("Please choose a preferred consultation date.");
        return;
      }
      if (!booking.time) {
        setFeedback("Please select a preferred time slot.");
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!booking.name.trim()) {
        setFeedback("Please provide your full legal name.");
        return;
      }
      const rawPhone = booking.phone.replace(/\D/g, "");
      if (rawPhone.length < 10) {
        setFeedback("Please provide a valid 10-digit mobile number.");
        return;
      }
      if (!booking.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
        setFeedback("Please provide a valid email address.");
        return;
      }

      if (!isPersonalVastu) {
        if (!booking.residentialAddress.trim()) {
          setFeedback("Please provide your residential address.");
          return;
        }
        if (!booking.propertyAddress.trim()) {
          setFeedback("Please provide the complete address of the property to be consulted.");
          return;
        }
        if (!booking.declarationAccepted) {
          setFeedback("Please check and accept the informed consent declaration.");
          return;
        }
      }

      // Automatically sync property owner if blank
      if (!booking.propertyOwnerName.trim()) {
        updateField("propertyOwnerName", booking.name);
      }

      setStep(5); // Proceed to Complete Details Review screen
      return;
    }
  }

  // Submit to PayU Gateway
  async function submitPayUBooking() {
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch(`${apiBase}/api/appointments/initiate-payu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          fee,
          cleanPhone: booking.phone.replace(/\D/g, ""),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || "Unable to initiate payment.");
      }

      const { payuData } = result;
      if (!payuData) {
        throw new Error("Invalid payment response returned by server.");
      }

      // Automatically construct and submit hidden PayU checkout form
      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = payuData.action || "https://test.payu.in/_payment";

      Object.entries(payuData).forEach(([k, v]) => {
        if (k !== "action" && v !== undefined && v !== null) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = k;
          input.value = String(v);
          formEl.appendChild(input);
        }
      });

      document.body.appendChild(formEl);
      formEl.submit();
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Failed to proceed to PayU payment. Please try again.");
    }
  }

  const stepsList = [
    "1. Service",
    "2. Mode & Location",
    "3. Date & Slot",
    isPersonalVastu ? "4. Details" : "4. PDF Declaration",
    "5. Review & Pay",
  ];

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#302116] pb-24">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden bg-[#21140a]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#fff3dd] via-[#fff3dd]/95 to-[#fff3dd]/70" />

        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-9 sm:py-12 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a56b27]">
                Scientific Vastu Consultations
              </span>
              <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#21160c] sm:text-4xl lg:text-5xl">
                Book Your Vastu Consultation
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#685746] sm:text-base">
                Expert spatial and directional alignment with Ar. Kuldeep Swami. Transparent pricing based on consultation mode and location.
              </p>
            </div>

            {/* View Tabs */}
            <div className="flex rounded-2xl bg-white/95 p-1.5 shadow-md border border-[#eddcc4] shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("book")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                  activeTab === "book"
                    ? "bg-[#21150c] text-white shadow"
                    : "text-[#6b5847] hover:text-[#21150c]"
                }`}
              >
                <Calendar size={15} />
                <span>Book Appointment</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("history");
                  if (customerPhone) loadMyAppointments(customerPhone);
                }}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                  activeTab === "history"
                    ? "bg-[#21150c] text-white shadow"
                    : "text-[#6b5847] hover:text-[#21150c]"
                }`}
              >
                <CalendarCheck size={15} />
                <span>My Appointments</span>
                {myAppointments.length > 0 && (
                  <span className="ml-1 rounded-full bg-[#bd8b45] px-2 py-0.5 text-[10px] text-white">
                    {myAppointments.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIEW 1: BOOKING FLOW */}
      {activeTab === "book" && (
        <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8">
          {/* Multi-step progress indicators */}
          <div className="mx-auto mb-8 max-w-4xl">
            <div className="grid grid-cols-5 gap-2 text-center">
              {stepsList.map((label, idx) => {
                const sNum = idx + 1;
                const isCurrent = step === sNum;
                const isDone = step > sNum;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      if (step > sNum) setStep(sNum);
                    }}
                    disabled={step < sNum}
                    className="flex flex-col items-center group disabled:cursor-not-allowed"
                  >
                    <div
                      className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-[#bd8b45] text-white ring-4 ring-[#bd8b45]/20 shadow-md"
                          : "bg-[#e8ded0] text-[#7d6c59]"
                      }`}
                    >
                      {isDone ? "✓" : sNum}
                    </div>
                    <span
                      className={`mt-2 hidden text-[11px] font-semibold sm:block ${
                        isCurrent ? "text-[#24170d] font-bold" : "text-[#877562]"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback message banner */}
          {feedback && (
            <div className="mx-auto mb-6 max-w-3xl flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-sm">
              <AlertCircle size={16} className="shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {/* STEP 1: Select Service */}
          {step === 1 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-4xl space-y-6"
            >
              <SectionTitle>1. Choose Consultation Service</SectionTitle>
              <p className="text-xs text-[#7d6c59]">
                Select the consultation scope for your property, enterprise, or personal aura alignment.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((svc) => {
                  const isSelected = booking.service === svc.name;
                  return (
                    <div
                      key={svc._id || svc.name}
                      onClick={() => {
                        updateField("service", svc.name);
                        updateField("serviceId", svc._id);
                      }}
                      className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition ${
                        isSelected
                          ? "border-[#b9843c] bg-[#fffcf7] shadow-lg ring-2 ring-[#b9843c]/30"
                          : "border-[#eddcc4] bg-white hover:border-[#b9843c]/60 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7f0e4] text-xl">
                            {svc.icon || "⌂"}
                          </span>
                          <span className="rounded-full bg-[#fbf5eb] px-2.5 py-1 text-[11px] font-bold text-[#b9843c] border border-[#ecdcc3]">
                            {svc.name.includes("Single") ? "Personal Vastu" : "Comprehensive"}
                          </span>
                        </div>

                        <h3 className="mt-3 font-serif text-base font-bold text-[#27190e]">
                          {svc.name}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#6c5b49] line-clamp-3">
                          {svc.description}
                        </p>

                        {Array.isArray(svc.features) && svc.features.length > 0 && (
                          <div className="mt-3 space-y-1 border-t border-[#f0e3d2] pt-2.5">
                            {svc.features.slice(0, 3).map((f, i) => (
                              <p key={i} className="text-[11px] text-[#7d6c59] flex items-center gap-1.5">
                                <span className="text-[#b9843c]">✦</span> {f}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f0e3d2] flex items-center justify-between text-xs font-bold">
                        <span className={isSelected ? "text-[#b9843c]" : "text-[#7d6c59]"}>
                          {isSelected ? "Selected ✓" : "Click to Select"}
                        </span>
                        <ChevronRight size={14} className={isSelected ? "text-[#b9843c]" : "text-zinc-400"} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={validateAndNext}
                  className="flex items-center gap-2 rounded-xl bg-[#21150c] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#3d2716] transition shadow-md"
                >
                  <span>Continue to Mode & Location</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Mode & Location Fee Selection */}
          {step === 2 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl space-y-6"
            >
              <SectionTitle>2. Consultation Mode & Location</SectionTitle>
              <p className="text-xs text-[#7d6c59]">
                Fees are fixed based on whether you opt for Video Call, Office Visit in Jaipur, or an On-Site Property Visit based on distance.
              </p>

              {/* Mode Selection Cards */}
              <div className="grid gap-3.5 sm:grid-cols-3">
                {/* 1. Video Call */}
                <div
                  onClick={() => updateField("consultationMode", "video_call")}
                  className={`cursor-pointer rounded-2xl border p-5 transition flex flex-col justify-between ${
                    booking.consultationMode === "video_call"
                      ? "border-[#b9843c] bg-[#fffcf7] ring-2 ring-[#b9843c]/30 shadow-md"
                      : "border-[#eddcc4] bg-white hover:border-[#b9843c]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7f0e4] text-[#a56b27]">
                        <Video size={18} />
                      </div>
                      <span className="font-serif text-base font-bold text-[#b9843c]">
                        {money(2100)}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-sm font-bold text-[#21160c]">
                      Video Call (Online)
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-[#6c5b49]">
                      Online video consultation from the comfort of your home or office.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#f0e3d2] text-[11px] font-bold text-[#a56b27]">
                    {booking.consultationMode === "video_call" ? "Selected ✓" : "Fixed ₹2,100"}
                  </div>
                </div>

                {/* 2. Office Visit */}
                <div
                  onClick={() => updateField("consultationMode", "office_visit")}
                  className={`cursor-pointer rounded-2xl border p-5 transition flex flex-col justify-between ${
                    booking.consultationMode === "office_visit"
                      ? "border-[#b9843c] bg-[#fffcf7] ring-2 ring-[#b9843c]/30 shadow-md"
                      : "border-[#eddcc4] bg-white hover:border-[#b9843c]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7f0e4] text-[#a56b27]">
                        <Building size={18} />
                      </div>
                      <span className="font-serif text-base font-bold text-[#b9843c]">
                        {money(2100)}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-sm font-bold text-[#21160c]">
                      Office Visit (Jaipur)
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-[#6c5b49]">
                      Visit our Jaipur head office in person with your property maps and floor plans.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#f0e3d2] text-[11px] font-bold text-[#a56b27]">
                    {booking.consultationMode === "office_visit" ? "Selected ✓" : "Fixed ₹2,100"}
                  </div>
                </div>

                {/* 3. On-Site Visit */}
                <div
                  onClick={() => updateField("consultationMode", "site_visit")}
                  className={`cursor-pointer rounded-2xl border p-5 transition flex flex-col justify-between ${
                    booking.consultationMode === "site_visit"
                      ? "border-[#b9843c] bg-[#fffcf7] ring-2 ring-[#b9843c]/30 shadow-md"
                      : "border-[#eddcc4] bg-white hover:border-[#b9843c]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7f0e4] text-[#a56b27]">
                        <MapPin size={18} />
                      </div>
                      <span className="font-serif text-xs font-bold text-[#b9843c]">
                        From ₹11,000
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-sm font-bold text-[#21160c]">
                      On-Site Property Visit
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-[#6c5b49]">
                      Expert visits your site with directional compass and energy balancing analysis.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#f0e3d2] text-[11px] font-bold text-[#a56b27]">
                    {booking.consultationMode === "site_visit" ? "Selected ✓" : "Distance Based"}
                  </div>
                </div>
              </div>

              {/* Sub-selection if Site Visit is chosen */}
              {booking.consultationMode === "site_visit" && (
                <div className="rounded-2xl border border-[#eddcc4] bg-white p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <Navigation size={16} className="text-[#a56b27]" />
                    <h4 className="font-serif text-sm font-bold text-[#21160c]">
                      Select Site Location Distance from Jaipur
                    </h4>
                  </div>
                  <p className="text-xs text-[#786653]">
                    Fixed travel and on-site consultation fee based on radial distance from Jaipur:
                  </p>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      {
                        key: "within_jaipur",
                        title: "Within Jaipur City",
                        desc: "Any location within Jaipur municipal boundary",
                        price: 11000,
                      },
                      {
                        key: "within_200km",
                        title: "Around 200 km Radius of Jaipur",
                        desc: "e.g. Ajmer, Alwar, Sikar, Dausa, Tonk, Kishangarh",
                        price: 21000,
                      },
                      {
                        key: "within_200_300km",
                        title: "Distance between 200 – 300 km",
                        desc: "e.g. Kota, Bikaner, Bharatpur, Delhi NCR, Sawai Madhopur",
                        price: 31000,
                      },
                      {
                        key: "above_300km",
                        title: "Above 300 km from Jaipur",
                        desc: "e.g. Jodhpur, Udaipur, outside Rajasthan, pan-India",
                        price: 51000,
                      },
                    ].map((tier) => {
                      const isSelected = booking.distanceTier === tier.key;
                      return (
                        <div
                          key={tier.key}
                          onClick={() => updateField("distanceTier", tier.key)}
                          className={`cursor-pointer rounded-xl border p-4 transition flex items-center justify-between ${
                            isSelected
                              ? "border-[#b9843c] bg-[#fff9ee] ring-2 ring-[#b9843c]/20"
                              : "border-[#e6dfd3] bg-white hover:bg-[#faf7f2]"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold text-[#21160c]">
                              {tier.title}
                            </p>
                            <p className="text-[11px] text-[#7d6c59] mt-0.5">
                              {tier.desc}
                            </p>
                          </div>
                          <span className="font-serif text-sm font-bold text-[#b9843c] ml-3 shrink-0">
                            {money(tier.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fee summary card */}
              <div className="flex items-center justify-between rounded-2xl border border-[#ecdcc3] bg-[#fffcf7] p-5 shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#9e8b77]">
                    Applicable Consultation Fee
                  </span>
                  <p className="text-xs text-[#635242]">
                    {booking.consultationMode === "video_call"
                      ? "Online Video Call Consultation"
                      : booking.consultationMode === "office_visit"
                      ? "In-Person Office Visit (Jaipur)"
                      : `On-Site Property Visit (${booking.distanceTier.replace(/_/g, " ")})`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#b9843c]">
                    {money(fee)}
                  </span>
                  <p className="text-[10px] text-[#91806f]">All inclusive</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#d6c7b2] px-5 py-3 text-xs font-semibold text-[#5a4b3c] hover:bg-[#faf7f2]"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={validateAndNext}
                  className="flex items-center gap-2 rounded-xl bg-[#21150c] px-7 py-3 text-xs font-bold text-white hover:bg-[#3d2716] transition shadow-md"
                >
                  <span>Choose Date & Time</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Choose Date & Time Slot */}
          {step === 3 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl space-y-6"
            >
              <SectionTitle>3. Select Preferred Date & Slot</SectionTitle>

              <div className="space-y-5 rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-8 shadow-sm">
                <Field label="Select Consultation Date" required>
                  <input
                    type="date"
                    min={todayString}
                    value={booking.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={inputClass}
                    required
                  />
                  {booking.date && (
                    <p className="mt-1.5 text-xs font-semibold text-[#a56b27]">
                      Scheduled for: {formattedDate}
                    </p>
                  )}
                </Field>

                <Field label="Available Consultation Time Slot" required>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => updateField("time", slot)}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3 text-xs font-semibold transition ${
                          booking.time === slot
                            ? "border-[#b9843c] bg-[#fff9ee] text-[#b9843c] font-bold ring-2 ring-[#b9843c]/20"
                            : "border-[#e6dfd3] bg-white text-[#57493a] hover:bg-[#faf7f2]"
                        }`}
                      >
                        <Clock size={13} />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#d6c7b2] px-5 py-3 text-xs font-semibold text-[#5a4b3c] hover:bg-[#faf7f2]"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={validateAndNext}
                  className="flex items-center gap-2 rounded-xl bg-[#21150c] px-7 py-3 text-xs font-bold text-white hover:bg-[#3d2716] transition shadow-md"
                >
                  <span>Proceed to Details</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Fill PDF Registration Details (or Single Person details) */}
          {step === 4 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl space-y-6"
            >
              {/* Header Box mirroring the PDF */}
              <div className="rounded-2xl border border-[#ecdcc3] bg-[#fffcf7] p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e3d2] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a56b27]">
                      Bhuwneshwari Scientific Vastu
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#21160c]">
                      Client Registration & Informed Consent Form
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="rounded-lg bg-white px-3 py-1.5 border border-[#eddcc4]">
                      <span className="text-[10px] block text-zinc-400">Client ID</span>
                      <span className="font-bold text-[#b9843c]">{booking.clientId || "CLT-GUEST"}</span>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-1.5 border border-[#eddcc4]">
                      <span className="text-[10px] block text-zinc-400">Document No.</span>
                      <span className="font-bold text-[#21160c]">{booking.documentNo}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#786653]">
                  <span><strong>Consultant:</strong> Ar. Kuldeep Swami</span>
                  <span><strong>Date:</strong> {formattedDate}</span>
                </div>
              </div>

              {/* CASE A: COMPREHENSIVE PDF FORM FOR NON-SINGLE-PERSON SERVICES */}
              {!isPersonalVastu ? (
                <div className="space-y-6">
                  {/* 1. Client's Particulars */}
                  <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                    <h3 className="font-serif text-base font-bold text-[#21160c] border-b border-[#f0e3d2] pb-2 flex items-center gap-2">
                      <User size={16} className="text-[#a56b27]" />
                      <span>1. Client's Particulars</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name of Client" required>
                        <input
                          type="text"
                          value={booking.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="Your full legal name"
                          className={inputClass}
                          required
                        />
                      </Field>

                      <Field label="Father's / Spouse's Name">
                        <input
                          type="text"
                          value={booking.fatherOrSpouseName}
                          onChange={(e) => updateField("fatherOrSpouseName", e.target.value)}
                          placeholder="Enter father or spouse name"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Mobile Number" required help="Used for confirmation & PayU">
                        <input
                          type="tel"
                          maxLength={10}
                          value={booking.phone}
                          onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit mobile number"
                          className={inputClass}
                          required
                        />
                      </Field>

                      <Field label="Email Address" required>
                        <input
                          type="email"
                          value={booking.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="name@example.com"
                          className={inputClass}
                          required
                        />
                      </Field>
                    </div>

                    <Field label="Residential Address" required>
                      <input
                        type="text"
                        value={booking.residentialAddress}
                        onChange={(e) => updateField("residentialAddress", e.target.value)}
                        placeholder="House/Flat No., Apartment, Street, City, State, PIN"
                        className={inputClass}
                        required
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Occupation / Business">
                        <input
                          type="text"
                          value={booking.occupation}
                          onChange={(e) => updateField("occupation", e.target.value)}
                          placeholder="e.g. Business / Service / Professional"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Client ID (Editable / Auto)">
                        <input
                          type="text"
                          value={booking.clientId}
                          onChange={(e) => updateField("clientId", e.target.value)}
                          placeholder="CLT-XXXXXX"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* 2. Property Particulars */}
                  <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                    <h3 className="font-serif text-base font-bold text-[#21160c] border-b border-[#f0e3d2] pb-2 flex items-center gap-2">
                      <Building size={16} className="text-[#a56b27]" />
                      <span>2. Property Particulars to be Consulted</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Property Owner's Name" required>
                        <input
                          type="text"
                          value={booking.propertyOwnerName || booking.name}
                          onChange={(e) => updateField("propertyOwnerName", e.target.value)}
                          placeholder="Legal owner of the property"
                          className={inputClass}
                          required
                        />
                      </Field>

                      <Field label="Property Type" required>
                        <select
                          value={booking.propertyType}
                          onChange={(e) => updateField("propertyType", e.target.value)}
                          className={inputClass}
                        >
                          <option value="Residential">Residential (House/Flat/Villa)</option>
                          <option value="Commercial">Commercial (Office/Shop/Showroom)</option>
                          <option value="Industrial">Industrial (Factory/Warehouse/Mill)</option>
                          <option value="Plot">Open Plot / Land</option>
                          <option value="Farmhouse">Farmhouse / Estate</option>
                          <option value="Other">Other Specific Layout</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="Complete Property Address" required help="Where the Vastu assessment applies">
                      <input
                        type="text"
                        value={booking.propertyAddress}
                        onChange={(e) => updateField("propertyAddress", e.target.value)}
                        placeholder="Plot/Flat/Unit No., Street, Colony, Landmark, City & Pincode"
                        className={inputClass}
                        required
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field label="Approximate Area">
                        <input
                          type="text"
                          value={booking.approximateArea}
                          onChange={(e) => updateField("approximateArea", e.target.value)}
                          placeholder="e.g. 1800 sq ft / 250 sq yd"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Number of Floors">
                        <input
                          type="text"
                          value={booking.numberOfFloors}
                          onChange={(e) => updateField("numberOfFloors", e.target.value)}
                          placeholder="e.g. Ground, G+1, G+2"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Property Plan Provided?">
                        <select
                          value={booking.propertyPlanProvided ? "yes" : "no"}
                          onChange={(e) => updateField("propertyPlanProvided", e.target.value === "yes")}
                          className={inputClass}
                        >
                          <option value="yes">Yes (CAD / Map / Hand sketch)</option>
                          <option value="no">No (Will be verified on site)</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="Client's Concerns / Specific Details">
                      <textarea
                        rows={3}
                        value={booking.clientConcerns}
                        onChange={(e) => updateField("clientConcerns", e.target.value)}
                        placeholder="Describe specific concerns: Health issues, financial blockage, relationship disharmony, upcoming construction/renovation..."
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  {/* 3. Family Members & Concerns (Optional Table from PDF) */}
                  <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#f0e3d2] pb-2">
                      <h3 className="font-serif text-base font-bold text-[#21160c] flex items-center gap-2">
                        <User size={16} className="text-[#a56b27]" />
                        <span>3. Family Member Details & Concerns (Optional)</span>
                      </h3>
                      <button
                        type="button"
                        onClick={addFamilyMember}
                        className="flex items-center gap-1 rounded-lg bg-[#f7f0e4] px-3 py-1.5 text-xs font-bold text-[#a56b27] hover:bg-[#ecdcc3]"
                      >
                        <Plus size={14} />
                        <span>Add Member</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {booking.familyMembers.map((member, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-center gap-2">
                          <input
                            type="text"
                            placeholder="Member Name"
                            value={member.name}
                            onChange={(e) => updateFamilyMember(idx, "name", e.target.value)}
                            className="w-full sm:w-1/3 rounded-xl border border-[#e6dfd3] px-3 py-2 text-xs outline-none focus:border-[#b9843c]"
                          />
                          <input
                            type="text"
                            placeholder="Relationship (e.g. Spouse, Son)"
                            value={member.relation}
                            onChange={(e) => updateFamilyMember(idx, "relation", e.target.value)}
                            className="w-full sm:w-1/3 rounded-xl border border-[#e6dfd3] px-3 py-2 text-xs outline-none focus:border-[#b9843c]"
                          />
                          <input
                            type="text"
                            placeholder="Health / Spatial Concern"
                            value={member.concern}
                            onChange={(e) => updateFamilyMember(idx, "concern", e.target.value)}
                            className="w-full sm:flex-1 rounded-xl border border-[#e6dfd3] px-3 py-2 text-xs outline-none focus:border-[#b9843c]"
                          />
                          {booking.familyMembers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFamilyMember(idx)}
                              className="rounded-lg p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Declaration & Informed Consent */}
                  <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                    <h3 className="font-serif text-base font-bold text-[#21160c] border-b border-[#f0e3d2] pb-2 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-700" />
                      <span>4. Declaration & Informed Consent</span>
                    </h3>

                    <p className="text-xs text-[#6e5d4c] leading-relaxed bg-[#fffcf7] p-4 rounded-2xl border border-[#f0e3d2]">
                      I hereby declare that all particulars, property details and plans submitted above are true and correct to the best of my knowledge. I understand that Scientific Vastu guidance provided by Ar. Kuldeep Swami constitutes spatial, structural, and directional energy balancing advisory.
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={booking.declarationAccepted}
                        onChange={(e) => updateField("declarationAccepted", e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-[#a56b27] focus:ring-[#a56b27]"
                        required
                      />
                      <span className="text-xs font-semibold text-[#302116]">
                        I confirm and agree to the Scientific Vastu declaration, consent, and service terms. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                /* CASE B: FAST-TRACK FORM FOR SINGLE PERSON VASTU */
                <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-8 shadow-sm space-y-4">
                  <h3 className="font-serif text-base font-bold text-[#21160c] border-b border-[#f0e3d2] pb-2 flex items-center gap-2">
                    <User size={16} className="text-[#a56b27]" />
                    <span>Personal Vastu Consultation Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required>
                      <input
                        type="text"
                        value={booking.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Your full name"
                        className={inputClass}
                        required
                      />
                    </Field>

                    <Field label="Mobile Number" required>
                      <input
                        type="tel"
                        maxLength={10}
                        value={booking.phone}
                        onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                        placeholder="10-digit mobile"
                        className={inputClass}
                        required
                      />
                    </Field>

                    <Field label="Email Address" required>
                      <input
                        type="email"
                        value={booking.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="name@example.com"
                        className={inputClass}
                        required
                      />
                    </Field>

                    <Field label="City / Location" required>
                      <input
                        type="text"
                        value={booking.residentialAddress}
                        onChange={(e) => updateField("residentialAddress", e.target.value)}
                        placeholder="e.g. Jaipur, Rajasthan"
                        className={inputClass}
                        required
                      />
                    </Field>
                  </div>

                  <Field label="Your Specific Goals or Concerns">
                    <textarea
                      rows={3}
                      value={booking.clientConcerns}
                      onChange={(e) => updateField("clientConcerns", e.target.value)}
                      placeholder="e.g. Bedroom orientation, study table direction, focus, career growth, sleep harmony..."
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#d6c7b2] px-5 py-3 text-xs font-semibold text-[#5a4b3c] hover:bg-[#faf7f2]"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={validateAndNext}
                  className="flex items-center gap-2 rounded-xl bg-[#21150c] px-7 py-3 text-xs font-bold text-white hover:bg-[#3d2716] transition shadow-md"
                >
                  <span>Review Complete Details</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: REVIEW COMPLETE DETAILS (WITH EDIT CAPABILITY) & PROCEED TO PAYU */}
          {step === 5 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl space-y-6"
            >
              <SectionTitle>5. Review Booking Details & Proceed to PayU</SectionTitle>
              <p className="text-xs text-[#7d6c59]">
                Please review all entered particulars carefully. You can edit any section before proceeding to the PayU payment gateway.
              </p>

              {/* Summary Card 1: Service, Mode & Fee */}
              <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#f0e3d2] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">
                      Consultation Service
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#27190e]">
                      {booking.service}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 rounded-lg border border-[#eddcc4] px-3 py-1.5 text-xs font-bold text-[#a56b27] hover:bg-[#fff9ee]"
                  >
                    <Pencil size={13} />
                    <span>Edit Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs py-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Mode</span>
                    <p className="font-semibold text-[#302116] mt-0.5">
                      {booking.consultationMode === "video_call"
                        ? "Video Call (Online)"
                        : booking.consultationMode === "office_visit"
                        ? "Office Visit (Jaipur)"
                        : "On-Site Property Visit"}
                    </p>
                  </div>
                  {booking.consultationMode === "site_visit" && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Distance Tier</span>
                      <p className="font-semibold text-[#302116] mt-0.5">
                        {booking.distanceTier.replace(/_/g, " ")}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Schedule</span>
                    <p className="font-semibold text-[#302116] mt-0.5">
                      {formattedDate} at {booking.time}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#a56b27] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Pencil size={12} />
                    <span>Edit Mode or Date/Time</span>
                  </button>
                </div>
              </div>

              {/* Summary Card 2: Client Particulars */}
              <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#f0e3d2] pb-3">
                  <h4 className="font-serif text-sm font-bold text-[#21160c] flex items-center gap-2">
                    <User size={15} className="text-[#a56b27]" />
                    <span>Client Particulars (Ref: {booking.documentNo})</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex items-center gap-1 rounded-lg border border-[#eddcc4] px-3 py-1.5 text-xs font-bold text-[#a56b27] hover:bg-[#fff9ee]"
                  >
                    <Pencil size={13} />
                    <span>Edit Particulars</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Full Name</span>
                    <p className="font-semibold text-[#302116] mt-0.5">{booking.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Mobile</span>
                    <p className="font-semibold text-[#302116] mt-0.5">{booking.phone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Email</span>
                    <p className="font-semibold text-[#302116] mt-0.5">{booking.email}</p>
                  </div>
                  {booking.fatherOrSpouseName && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Father / Spouse</span>
                      <p className="font-semibold text-[#302116] mt-0.5">{booking.fatherOrSpouseName}</p>
                    </div>
                  )}
                  {booking.occupation && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Occupation</span>
                      <p className="font-semibold text-[#302116] mt-0.5">{booking.occupation}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Client ID</span>
                    <p className="font-semibold text-[#b9843c] mt-0.5">{booking.clientId}</p>
                  </div>
                </div>

                {booking.residentialAddress && (
                  <div className="text-xs pt-1 border-t border-[#f7eee1]">
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Residential Address</span>
                    <p className="text-[#4b3c2e] mt-0.5">{booking.residentialAddress}</p>
                  </div>
                )}
              </div>

              {/* Summary Card 3: Property Details (if applicable) */}
              {!isPersonalVastu && (
                <div className="rounded-3xl border border-[#eddcc4] bg-white p-6 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#f0e3d2] pb-3">
                    <h4 className="font-serif text-sm font-bold text-[#21160c] flex items-center gap-2">
                      <Building size={15} className="text-[#a56b27]" />
                      <span>Property Particulars</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex items-center gap-1 rounded-lg border border-[#eddcc4] px-3 py-1.5 text-xs font-bold text-[#a56b27] hover:bg-[#fff9ee]"
                    >
                      <Pencil size={13} />
                      <span>Edit Property</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Owner Name</span>
                      <p className="font-semibold text-[#302116] mt-0.5">{booking.propertyOwnerName || booking.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Property Type</span>
                      <p className="font-semibold text-[#302116] mt-0.5">{booking.propertyType}</p>
                    </div>
                    {booking.approximateArea && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Approx Area</span>
                        <p className="font-semibold text-[#302116] mt-0.5">{booking.approximateArea}</p>
                      </div>
                    )}
                    {booking.numberOfFloors && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Floors</span>
                        <p className="font-semibold text-[#302116] mt-0.5">{booking.numberOfFloors}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Plan Provided</span>
                      <p className="font-semibold text-[#302116] mt-0.5">{booking.propertyPlanProvided ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div className="text-xs pt-1 border-t border-[#f7eee1]">
                    <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Property Address</span>
                    <p className="text-[#4b3c2e] mt-0.5">{booking.propertyAddress}</p>
                  </div>

                  {booking.clientConcerns && (
                    <div className="text-xs pt-1">
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Client Concerns / Notes</span>
                      <p className="text-[#4b3c2e] mt-0.5 italic">{booking.clientConcerns}</p>
                    </div>
                  )}

                  {/* Family Members Summary if added */}
                  {Array.isArray(booking.familyMembers) && booking.familyMembers.some((m) => m.name.trim()) && (
                    <div className="text-xs pt-2 border-t border-[#f7eee1] space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#9e8b77]">Family Members Included</span>
                      <div className="space-y-1">
                        {booking.familyMembers.filter((m) => m.name.trim()).map((m, i) => (
                          <div key={i} className="text-xs text-[#574636] flex items-center gap-2">
                            <span className="font-bold text-[#21160c]">• {m.name}</span>
                            {m.relation && <span className="text-zinc-500">({m.relation})</span>}
                            {m.concern && <span className="text-[#a56b27]">— {m.concern}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Total Payable & PayU Gateway Notice */}
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Total Consultation Fee
                    </span>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Includes expert guidance, directional analysis, and PayU secure checkout.
                    </p>
                  </div>
                  <span className="font-serif text-3xl font-bold text-emerald-900">
                    {money(fee)}
                  </span>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-800">
                  <CreditCard size={16} className="shrink-0 text-emerald-700" />
                  <span>
                    Secured by <strong>PayU Payment Gateway</strong>. Supports UPI, NetBanking, Credit/Debit cards.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#d6c7b2] px-5 py-3 text-xs font-semibold text-[#5a4b3c] hover:bg-[#faf7f2]"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Edit</span>
                </button>
                <button
                  type="button"
                  onClick={submitPayUBooking}
                  disabled={status === "loading"}
                  className="flex items-center gap-2 rounded-xl bg-emerald-700 px-8 py-3.5 text-xs font-bold text-white hover:bg-emerald-800 transition shadow-lg disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Connecting to PayU...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Pay {money(fee)} via PayU</span>
                      <ChevronRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* VIEW 2: CUSTOMER PREVIOUS APPOINTMENTS & STATUS */}
      {activeTab === "history" && (
        <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#21160c]">
                My Appointments & Current Status
              </h2>
              <p className="text-xs text-[#7d6c59] mt-0.5">
                Track all your past, upcoming, and confirmed Vastu consultation sessions.
              </p>
            </div>

            {/* Mobile number lookup */}
            <div className="flex items-center gap-2">
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter 10-digit mobile"
                className="rounded-xl border border-[#d6c7b2] bg-white px-3.5 py-2 text-xs text-[#302116] outline-none"
              />
              <button
                type="button"
                onClick={() => loadMyAppointments(customerPhone)}
                className="flex items-center gap-1.5 rounded-xl bg-[#21150c] px-4 py-2 text-xs font-bold text-white hover:bg-[#3d2716]"
              >
                <Search size={13} />
                <span>Track</span>
              </button>
            </div>
          </div>

          {historyLoading ? (
            <div className="py-16 text-center text-xs text-zinc-500">
              <Loader2 size={24} className="animate-spin mx-auto text-[#a56b27] mb-2" />
              Loading your appointments...
            </div>
          ) : myAppointments.length === 0 ? (
            <div className="rounded-3xl border border-[#eddcc4] bg-white p-12 text-center shadow-sm">
              <CalendarCheck size={40} className="mx-auto text-[#bd8b45] mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#302116]">
                No Appointments Found
              </h3>
              <p className="mt-1 text-xs text-[#7d6c59] max-w-md mx-auto">
                No consultations found for {customerPhone || "your mobile number"}. Book a new session to get personalized Vastu corrections.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("book")}
                className="mt-5 rounded-xl bg-[#21150c] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#3d2716] shadow"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myAppointments.map((apt) => {
                const s = String(apt.status || "Pending").toLowerCase();
                const isPaid = apt.paymentStatus === "paid";
                return (
                  <div
                    key={apt._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#ecdcc3] bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#bd8b45]">
                          {apt.reference || `APT-${String(apt._id).slice(-6)}`}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            s === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : s === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : s === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {apt.status || "Pending"}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {isPaid ? "Paid via PayU" : "Payment Pending"}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#21160c]">
                        {apt.type}
                      </h3>

                      <p className="text-xs text-[#786653] flex items-center gap-3">
                        <span>📅 {new Date(apt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span>⏰ {apt.time}</span>
                        <span>📍 {apt.consultationMode === "video_call" ? "Video Call (Online)" : apt.consultationMode === "office_visit" ? "Office Visit (Jaipur)" : "On-Site Visit"}</span>
                      </p>

                      {(apt.propertyAddress || apt.address) && (
                        <p className="text-[11px] text-[#91806f]">
                          Location: {apt.propertyAddress || apt.address}
                        </p>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-[#f2e7d8] pt-3 sm:pt-0">
                      <span className="font-serif text-lg font-bold text-[#21160c]">
                        {money(apt.amount)}
                      </span>
                      <span className="text-[10px] text-[#8a7967]">
                        Booked on {new Date(apt.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

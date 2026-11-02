"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getCart, saveCart } from "@/lib/cart";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);

const COUPONS = {
  VASTU10: { type: "percent", value: 10, label: "10% off your order" },
  WELCOME5: { type: "percent", value: 5, label: "5% off your order" },
  SHUBH200: {
    type: "fixed",
    value: 200,
    minimum: 1999,
    label: "₹200 off orders of ₹1,999 or more",
  },
};

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  payment: "payu",
};

function CheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function SectionTitle({ number, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8c49c] bg-[#f5eddd] text-sm font-semibold text-[#85632e]">
        {number}
      </span>
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-[#2b241d] sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm leading-6 text-[#817568]">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const reduceMotion = useReducedMotion();

  const [cart, setCart] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [cartReady, setCartReady] = useState(false);

  const [authReady, setAuthReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const syncCart = () => {
      setCart(getCart());
      setCartReady(true);
    };

    syncCart();
    window.addEventListener("bsv-cart-updated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("bsv-cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const user = getCurrentUser();
      setAuthenticated(Boolean(user));
      setAuthReady(true);
    };

    checkAuth();

    window.addEventListener("bsv-auth-updated", checkAuth);

    if (!getCurrentUser()) {
      openLoginPopup("/checkout");
    }

    const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");
    fetch(`${apiBase}/api/settings`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && res?.data?.shipping) {
          setShippingConfig(res.data.shipping);
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener("bsv-auth-updated", checkAuth);
    };
  }, []);

  const [shippingConfig, setShippingConfig] = useState({
    shippingEnabled: true,
    freeShippingEnabled: false,
    freeShippingThreshold: 1999,
    flatRateEnabled: true,
    flatRate: 99,
  });

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          Math.max(0, Number(item.price) || 0) *
            Math.max(0, Number(item.quantity) || 0),
        0,
      ),
    [cart],
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + Math.max(0, Number(item.quantity) || 0),
    0,
  );

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "fixed") {
      return Math.min(appliedCoupon.value, subtotal);
    }

    return Math.min(
      Math.round((subtotal * appliedCoupon.value) / 100),
      subtotal,
    );
  }, [appliedCoupon, subtotal]);

  const shipping = useMemo(() => {
    if (subtotal === 0 || shippingConfig.shippingEnabled === false) return 0;
    const net = Math.max(0, subtotal - discount);
    if (shippingConfig.freeShippingEnabled && net >= (Number(shippingConfig.freeShippingThreshold) || 1999)) {
      return 0;
    }
    return shippingConfig.flatRateEnabled !== false ? Number(shippingConfig.flatRate || 99) : 0;
  }, [subtotal, discount, shippingConfig]);

  const total = Math.max(0, subtotal - discount) + shipping;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function applyCoupon(event) {
    event.preventDefault();

    const code = couponInput.trim().toUpperCase();
    const coupon = COUPONS[code];

    if (!code) {
      setCouponError(true);
      setCouponMessage("Enter a coupon code to continue.");
      setAppliedCoupon(null);
      return;
    }

    if (!coupon) {
      setCouponError(true);
      setCouponMessage("This coupon code isn't valid. Please try another.");
      setAppliedCoupon(null);
      return;
    }

    if (coupon.minimum && subtotal < coupon.minimum) {
      setCouponError(true);
      setCouponMessage(
        `Add ${money(coupon.minimum - subtotal)} more to use this coupon.`,
      );
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon({ ...coupon, code });
    setCouponError(false);
    setCouponMessage(`${code} applied successfully — ${coupon.label}!`);
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("Coupon removed.");
    setCouponError(false);
  }

  async function placeOrder(event) {
    event.preventDefault();

    if (!cart.length || isSubmitting) return;

    setCheckoutError("");
    setIsSubmitting(true);

    const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001").replace(/\/$/, "");

    try {
      if (form.payment === "payu") {
        // Online Payment via PayU - Direct Redirect to PayU Gateway
        const response = await fetch(`${apiBase}/api/payments/payu/initiate-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            customer: form,
            subtotal,
            shipping,
            discount,
            total,
            coupon: appliedCoupon?.code || null,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Unable to initiate PayU payment");
        }

        // Direct form submit to PayU Gateway
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
        return;
      }

      // Cash on Delivery
      const response = await fetch(`${apiBase}/api/payments/cod-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customer: form,
          subtotal,
          shipping,
          discount,
          total,
          coupon: appliedCoupon?.code || null,
        }),
      });

      const data = await response.json();
      const orderNumber = data.order?.orderNumber || `BSV-${Date.now().toString().slice(-8)}`;

      const orderDetails = {
        id: orderNumber,
        placedAt: new Date().toISOString(),
        customer: { ...form },
        items: cart.map((item) => ({ ...item })),
        subtotal,
        discount,
        coupon: appliedCoupon?.code || null,
        shipping,
        total,
        paymentLabel: "Cash on Delivery",
        status: "Order Confirmed",
      };

      setOrder(orderDetails);
      setIsSubmitting(false);

      try {
        const previousOrders = JSON.parse(
          localStorage.getItem("bsv-demo-orders") || "[]"
        );
        localStorage.setItem(
          "bsv-demo-orders",
          JSON.stringify([orderDetails, ...previousOrders])
        );
      } catch {}

      saveCart([]);
      setCart([]);
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message || "Failed to process order. Please try again.");
      setIsSubmitting(false);
    }
  }

  const enterMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
      };

  if (!authReady || !authenticated) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f7f4ed] px-5 py-16">
        <div className="w-full max-w-md rounded-3xl border border-[#e8dfd0] bg-white p-8 text-center shadow-xl shadow-[#3d2e1b]/5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5eddd] text-[#98733a]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 1 1 8 0v3" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-[#2b241d]">
            Login to continue
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#817568]">
            Verify your mobile number to continue to checkout. Your cart will
            remain saved.
          </p>

          <button
            type="button"
            onClick={() => openLoginPopup("/checkout")}
            className="mt-6 w-full rounded-full bg-[#292119] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#59432d]"
          >
            Login with mobile OTP
          </button>
        </div>
      </main>
    );
  }

  if (order) {
    return (
      <main className="min-h-screen bg-[#f7f4ed] px-4 pb-16 pt-10 text-[#2b241d] sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[28px] border border-[#e8dfd0] bg-white shadow-[0_24px_80px_rgba(61,46,27,0.08)]"
          >
            <div className="relative overflow-hidden bg-[#292119] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(219,177,98,0.24),transparent_55%)]" />

              <motion.div
                initial={reduceMotion ? false : { scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 12,
                  delay: 0.15,
                }}
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d9b46d]/60 bg-[#d9b46d]/15 text-[#f2d99f]"
              >
                <motion.div
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.45 }}
                >
                  <CheckIcon className="h-10 w-10" />
                </motion.div>

                {!reduceMotion && (
                  <>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.8, 2.4] }}
                      transition={{ duration: 0.8, delay: 0.35 }}
                      className="absolute inset-0 rounded-full border border-[#e9c77f]"
                    />
                    <motion.span
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.5, 2] }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="absolute inset-0 rounded-full border border-[#e9c77f]"
                    />
                  </>
                )}
              </motion.div>

              <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-[#e6c987]">
                Thank you for your order
              </p>
              <h1 className="relative mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your order is confirmed!
              </h1>
              <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-white/70 sm:text-base">
                Thank you, {order.customer.fullName}. Your demo order has been
                created successfully.
              </p>
              <div className="relative mx-auto mt-7 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm">
                <span className="text-white/65">Order ID</span>
                <strong className="tracking-wide text-[#f2d99f]">
                  {order.id}
                </strong>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(order.id)}
                  className="ml-1 rounded-full bg-white/10 px-2.5 py-1 text-xs hover:bg-white/20"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-9">
              <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <strong>Demo checkout:</strong> No payment was processed and no
                shipment has been arranged. This order is stored only in this
                browser.
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#ece5d9] p-5">
                  <h2 className="font-semibold">Delivery details</h2>
                  <p className="mt-3 text-sm font-medium">
                    {order.customer.fullName}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#756b5e]">
                    {order.customer.address}
                    {order.customer.landmark
                      ? `, ${order.customer.landmark}`
                      : ""}
                    <br />
                    {order.customer.city}, {order.customer.state} —{" "}
                    {order.customer.pincode}
                  </p>
                  <p className="mt-3 text-sm text-[#756b5e]">
                    {order.customer.phone}
                  </p>
                  <p className="mt-1 break-words text-sm text-[#756b5e]">
                    {order.customer.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ece5d9] p-5">
                  <h2 className="font-semibold">Order information</h2>
                  <p className="mt-3 text-sm text-[#756b5e]">
                    Status:{" "}
                    <strong className="text-[#7e642f]">{order.status}</strong>
                  </p>
                  <p className="mt-2 text-sm text-[#756b5e]">
                    Payment: {order.paymentLabel}
                  </p>
                  <p className="mt-2 text-sm text-[#756b5e]">
                    Date:{" "}
                    {new Date(order.placedAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {order.coupon && (
                    <p className="mt-2 text-sm text-[#756b5e]">
                      Coupon used:{" "}
                      <strong className="text-[#7e642f]">{order.coupon}</strong>
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold">Items in your order</h2>
                <div className="mt-4 divide-y divide-[#eee6da]">
                  {order.items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center gap-4 py-4"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f0ebe2]">
                        {item.image && (
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url("${item.image}")`,
                            }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="mt-1 text-sm text-[#817568]">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold">
                        {money(
                          (Number(item.price) || 0) *
                            (Number(item.quantity) || 0),
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl bg-[#f8f5ef] p-5">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#756b5e]">Subtotal</span>
                  <span>{money(order.subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#756b5e]">Discount</span>
                  <span className="text-emerald-700">
                    −{money(order.discount)}
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#756b5e]">Shipping</span>
                  <span>
                    {order.shipping === 0 ? "Free" : money(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#e6ddce] pt-4 text-lg font-semibold">
                  <span>Total</span>
                  <span>{money(order.total)}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="flex flex-1 items-center justify-center rounded-full bg-[#292119] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#59432d]"
                >
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex flex-1 items-center justify-center rounded-full border border-[#ded4c4] px-6 py-4 text-sm font-semibold transition hover:bg-[#f8f5ef]"
                >
                  Print Order Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ed] px-4 pb-16 pt-8 text-[#2b241d] sm:px-6 ">
      <div className="mx-auto max-w-7xl">
        <motion.div {...enterMotion} className="mb-8 sm:mb-10">
          <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              ["01", "Your details"],
              ["02", "Order review"],
              ["03", "Confirmation"],
            ].map(([number, label], index) => (
              <div key={number} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    index < 2
                      ? "bg-[#30271e] text-[#f1d69c]"
                      : "border border-[#d9cebc] text-[#8a7b68]"
                  }`}
                >
                  {number}
                </span>
                <span className="text-xs font-medium text-[#65594b] sm:text-sm">
                  {label}
                </span>
                {index < 2 && (
                  <span className="hidden h-px flex-1 bg-[#ded4c4] sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {!cartReady ? (
          <div className="rounded-3xl border border-[#e8dfd0] bg-white p-10 text-center">
            Loading your order…
          </div>
        ) : cart.length === 0 ? (
          <motion.div
            {...enterMotion}
            className="rounded-[28px] border border-[#e8dfd0] bg-white px-6 py-16 text-center shadow-sm sm:py-20"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f5eddd] text-[#9a7538]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-9 w-9"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#817568]">
              Explore our Vastu collection and add your favourite products
              before checking out.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex rounded-full bg-[#292119] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#59432d]"
            >
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <form
            onSubmit={placeOrder}
            className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_390px]"
          >
            <div className="space-y-6">
              <motion.section
                {...enterMotion}
                className="rounded-[24px] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_40px_rgba(61,46,27,0.035)] sm:p-7"
              >
                <SectionTitle
                  number="1"
                  title="Contact information"
                  description="Where we can reach you about your order."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium">
                      Full name *
                    </span>
                    <input
                      name="fullName"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={form.fullName}
                      onChange={updateField}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                      Email address *
                    </span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                      Phone number *
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern="[0-9+\s()-]{8,18}"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>
                </div>
              </motion.section>

              <motion.section
                {...enterMotion}
                transition={{ delay: reduceMotion ? 0 : 0.06, duration: 0.45 }}
                className="rounded-[24px] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_40px_rgba(61,46,27,0.035)] sm:p-7"
              >
                <SectionTitle
                  number="2"
                  title="Delivery address"
                  description="Where should we deliver your order?"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium">
                      Street address *
                    </span>
                    <input
                      name="address"
                      autoComplete="street-address"
                      required
                      value={form.address}
                      onChange={updateField}
                      placeholder="House number, street, area"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium">
                      Landmark{" "}
                      <span className="font-normal text-[#948778]">
                        (optional)
                      </span>
                    </span>
                    <input
                      name="landmark"
                      autoComplete="off"
                      value={form.landmark}
                      onChange={updateField}
                      placeholder="Nearby landmark"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                      City *
                    </span>
                    <input
                      name="city"
                      autoComplete="address-level2"
                      required
                      value={form.city}
                      onChange={updateField}
                      placeholder="City"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                      State *
                    </span>
                    <input
                      name="state"
                      autoComplete="address-level1"
                      required
                      value={form.state}
                      onChange={updateField}
                      placeholder="State"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium">
                      PIN code *
                    </span>
                    <input
                      name="pincode"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={form.pincode}
                      onChange={updateField}
                      placeholder="6-digit PIN code"
                      className="w-full rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-4 py-3.5 text-base outline-none transition placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10 sm:max-w-xs"
                    />
                  </label>
                </div>
              </motion.section>

              <motion.section
                {...enterMotion}
                transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.45 }}
                className="rounded-[24px] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_40px_rgba(61,46,27,0.035)] sm:p-7"
              >
                <SectionTitle
                  number="3"
                  title="Payment method"
                  description="Choose how you would like to pay for your order."
                />

                <div className="space-y-3">
                  {[
                    {
                      value: "payu",
                      title: "Pay Online via PayU",
                      description:
                        "UPI, Cards, NetBanking, and Wallets via secure PayU gateway.",
                      tag: "Recommended",
                    }  
                     
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                        form.payment === option.value
                          ? "border-[#b18b4e] bg-[#faf5e9] ring-1 ring-[#b18b4e]/30"
                          : "border-[#e7dfd2] hover:border-[#cfc0a6]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.value}
                        checked={form.payment === option.value}
                        onChange={updateField}
                        className="mt-1 h-4 w-4 accent-[#8e6a32]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                          {option.title}
                          {option.tag && (
                            <span className="rounded-full bg-[#eadfc8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#795c2e]">
                              {option.tag}
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#817568]">
                          {option.description}
                        </span>
                      </span>
                      {form.payment === option.value && (
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8e6a32] text-white">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Order summary */}
            <motion.aside
              {...enterMotion}
              transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.45 }}
              className="lg:sticky lg:top-6"
            >
              <div className="overflow-hidden rounded-[24px] border border-[#e8dfd0] bg-white shadow-[0_16px_50px_rgba(61,46,27,0.06)]">
                <div className="border-b border-[#ece4d8] px-5 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Your order</h2>
                    <span className="rounded-full bg-[#f5eddd] px-3 py-1 text-xs font-semibold text-[#876633]">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="mt-5 max-h-[320px] space-y-4 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.slug} className="flex gap-3">
                        <div className="relative h-[76px] w-[68px] shrink-0 overflow-hidden rounded-xl bg-[#f0ebe2]">
                          {item.image && (
                            <div
                              className="h-full w-full bg-cover bg-center"
                              style={{
                                backgroundImage: `url("${item.image}")`,
                              }}
                            />
                          )}
                          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#30271e] px-1 text-[10px] font-semibold text-white">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1 py-1">
                          <p className="line-clamp-2 text-sm font-medium leading-5">
                            {item.name}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[#8c6b36]">
                            {money(
                              (Number(item.price) || 0) *
                                (Number(item.quantity) || 0),
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className="border-b border-[#ece4d8] px-5 py-5 sm:px-6">
                  <div className="mb-3 flex items-center gap-2">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-5 w-5 text-[#98733a]"
                      aria-hidden="true"
                    >
                      <path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
                      <circle cx="7.5" cy="7.5" r="1" />
                    </svg>
                    <h3 className="text-sm font-semibold">Have a coupon?</h3>
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(event) => {
                        setCouponInput(event.target.value);
                        if (couponMessage) {
                          setCouponMessage("");
                          setCouponError(false);
                        }
                      }}
                      disabled={Boolean(appliedCoupon)}
                      placeholder="Enter coupon code"
                      aria-label="Coupon code"
                      className="min-w-0 flex-1 rounded-xl border border-[#e2d9ca] bg-[#fdfcf9] px-3 py-3 text-sm uppercase outline-none transition placeholder:normal-case placeholder:text-[#b0a597] focus:border-[#b28b4c] focus:ring-4 focus:ring-[#b28b4c]/10 disabled:opacity-60"
                    />

                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="rounded-xl border border-[#ded4c4] px-3 text-sm font-semibold transition hover:bg-[#f8f5ef]"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="rounded-xl bg-[#30271e] px-4 text-sm font-semibold text-white transition hover:bg-[#59432d]"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {couponMessage && (
                      <motion.div
                        key={couponMessage}
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, y: 8, scale: 0.97 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25 }}
                        role="status"
                        className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-xs leading-5 ${
                          couponError
                            ? "border border-red-200 bg-red-50 text-red-700"
                            : appliedCoupon
                              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                              : "border border-[#e8dfd0] bg-[#f8f5ef] text-[#756b5e]"
                        }`}
                      >
                        {appliedCoupon && !couponError && (
                          <motion.span
                            initial={reduceMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 12,
                            }}
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"
                          >
                            <CheckIcon className="h-3.5 w-3.5" />
                          </motion.span>
                        )}
                        <span>{couponMessage}</span>
                        {appliedCoupon && !couponError && (
                          <motion.span
                            initial={
                              reduceMotion ? false : { rotate: -15, scale: 0 }
                            }
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.35 }}
                            className="ml-auto text-base"
                            aria-hidden="true"
                          >
                            ✨
                          </motion.span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* <p className="mt-3 text-[11px] leading-5 text-[#8a7e6e]">
                    Demo codes: VASTU10, WELCOME5, SHUBH200
                  </p> */}
                </div>

                {/* Totals */}
                <div className="px-5 py-5 sm:px-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#817568]">Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#817568]">Discount</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={discount}
                          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className={
                            discount > 0
                              ? "font-semibold text-emerald-700"
                              : "text-[#817568]"
                          }
                        >
                          {discount > 0 ? `−${money(discount)}` : money(0)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#817568]">Shipping</span>
                      <span
                        className={
                          shipping === 0 ? "font-medium text-emerald-700" : ""
                        }
                      >
                        {shipping === 0 ? "Free" : money(shipping)}
                      </span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-dashed border-[#ded4c4]" />

                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold">Total</p>
                      <p className="mt-1 text-xs text-[#817568]">
                        Inclusive of displayed charges
                      </p>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={total}
                        initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -7 }}
                        className="text-2xl font-semibold tracking-tight"
                      >
                        {money(total)}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {checkoutError && (
                    <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {checkoutError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !cart.length}
                    className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#292119] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#292119]/10 transition hover:-translate-y-0.5 hover:bg-[#59432d] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={reduceMotion ? {} : { rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-flex h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                        />
                        {form.payment === "payu" ? "Opening PayU Gateway…" : "Placing order…"}
                      </>
                    ) : (
                      <>
                        {form.payment === "payu"
                          ? `Pay ${money(total)}`
                          : "Place Order (Cash on Delivery)"}{" "}
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-5 text-[#8a7e6e]">
                    {form.payment === "payu"
                      ? "🔒 256-bit SSL encrypted secure payment powered by PayU"
                      : "Pay with cash upon delivery of your products."}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#e8dfd0] bg-white/70 p-4">
                <span className="mt-0.5 text-[#9a7538]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold">
                    Safe & Reliable Delivery
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#817568]">
                    Orders are carefully inspected, energised with Vastu principles, and dispatched with tracking.
                  </p>
                </div>
              </div>
            </motion.aside>
          </form>
        )}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCurrentUser, openLoginPopup } from "@/lib/auth";
import AccountLayout from "@/components/account/AccountLayout";

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
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

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBase = (
    process.env.NEXT_PUBLIC_VASTU_API_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Initial load from localStorage (demo/offline fallback)
    let localList = [];
    try {
      const saved1 = JSON.parse(localStorage.getItem("bsv-orders") || "[]");
      const saved2 = JSON.parse(localStorage.getItem("bsv-demo-orders") || "[]");
      localList = [...(Array.isArray(saved1) ? saved1 : []), ...(Array.isArray(saved2) ? saved2 : [])];
    } catch {}

    if (currentUser?.phone) {
      const cleanPhone = currentUser.phone.replace(/\D/g, "").slice(-10);
      fetch(`${apiBase}/api/payments/my-orders?phone=${cleanPhone}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
            // Merge backend orders with any local orders not present in backend
            const backendNumbers = new Set(resData.data.map((o) => o.orderNumber || o.id));
            const uniqueLocal = localList.filter((lo) => !backendNumbers.has(lo.orderNumber || lo.id));
            setOrders([...resData.data, ...uniqueLocal]);
          } else {
            setOrders(localList);
          }
        })
        .catch((err) => {
          console.error("Error fetching live orders:", err);
          setOrders(localList);
        })
        .finally(() => setLoading(false));
    } else {
      setOrders(localList);
      setLoading(false);
    }
  }, [apiBase]);

  if (loading) {
    return <div className="min-h-[50vh] animate-pulse bg-[#faf7f0]" />;
  }

  if (!user) {
    return (
      <div className="px-5 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#382b20]">
          Sign in to view your orders
        </h1>
        <p className="mt-3 text-sm text-[#766552]">
          Your purchases and delivery history will appear here once you sign in.
        </p>
        <button
          onClick={() => openLoginPopup("/orders")}
          className="mt-6 rounded-xl bg-[#986122] px-6 py-3 font-semibold text-white shadow-md hover:brightness-110 transition"
        >
          Login to your account
        </button>
      </div>
    );
  }

  return (
    <AccountLayout
      title="My Orders"
      subtitle="View your purchases and keep track of your Vastu products in one place."
      user={user}
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total orders", value: orders.length, icon: "▤" },
          {
            label: "Items ordered",
            value: orders.reduce(
              (sum, order) =>
                sum +
                (Array.isArray(order.items)
                  ? order.items.reduce(
                      (n, item) => n + (Number(item.quantity) || 1),
                      0
                    )
                  : 0),
              0
            ),
            icon: "✦",
          },
          {
            label: "Latest order",
            value: orders.length
              ? orders[0].orderNumber || orders[0].id || "Placed"
              : "—",
            icon: "◷",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#806d57]">{stat.label}</p>
              <span className="text-xl text-[#ad762f]">{stat.icon}</span>
            </div>
            <p className="mt-3 break-words text-xl font-bold text-[#382b20]">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee5d9] px-5 py-5 sm:px-7">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#382b20]">
              Order history
            </h2>
            <p className="mt-1 text-sm text-[#8b7a66]">
              {orders.length
                ? `${orders.length} placed order${orders.length === 1 ? "" : "s"}`
                : "Your recent purchases will appear here."}
            </p>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-[#d9bd8e] px-4 py-2.5 text-sm font-semibold text-[#8e571e] transition hover:bg-[#faf4e8]"
          >
            Shop products →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-14 text-center sm:py-20">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#f8f0e3] text-3xl text-[#a56b27]">
              ▤
            </div>
            <h3 className="mt-5 font-serif text-2xl font-bold text-[#382b20]">
              No orders yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8b7a66]">
              Discover authentic Vastu products crafted to harmonize energies in your space. Your orders will appear here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#8e571e] to-[#b77b32] px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
            >
              Explore Vastu Products →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#eee5d9]">
            {orders.map((order, index) => {
              const orderId = order.orderNumber || order.id || `Order ${index + 1}`;
              const orderDate = order.createdAt || order.date || order.placedAt;
              const isPaid = order.paymentStatus === "paid" || order.status === "confirmed" || order.status === "delivered";
              const addr = order.shippingAddress || order.customer || {};
              const addressStr = [addr.address || addr.addressLine1, addr.landmark, addr.city, addr.state, addr.pincode]
                .filter(Boolean)
                .join(", ");

              return (
                <motion.article
                  key={orderId + index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 sm:p-7"
                >
                  {/* Top Order Bar */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#f5ebd9] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#9a7545]">
                          Order
                        </span>
                        <span className="font-mono font-bold text-[#382b20] text-sm">
                          {orderId}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#8b7a66]">
                        Placed on {formatDate(orderDate)}
                      </p>
                      {addressStr && (
                        <p className="mt-1 text-[11px] text-[#786653] max-w-md">
                          📍 Ship to: <span className="font-medium">{addressStr}</span>
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-[#382b20]">
                        {formatPrice(order.total)}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5 justify-end">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 capitalize">
                          ● {order.status || "Confirmed"}
                        </span>
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
                        }`}>
                          {order.paymentStatus || (order.paymentProvider === "cod" ? "COD" : "Paid")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Products in this order */}
                  <div className="mt-4 space-y-2.5">
                    {(Array.isArray(order.items) ? order.items : []).map(
                      (item, itemIndex) => {
                        const itemImg = item.image || item.imageUrl || "";
                        const itemTitle = item.title || item.name || "Vastu product";
                        const itemQty = Number(item.quantity) || 1;
                        const itemPrice = Number(item.price || item.unitPrice) || 0;

                        return (
                          <div
                            key={item.id || item.slug || itemIndex}
                            className="flex items-center gap-3.5 rounded-xl bg-[#fcfaf6] p-3 border border-[#f3eadc]"
                          >
                            {itemImg ? (
                              <img
                                src={itemImg}
                                alt={itemTitle}
                                className="h-14 w-14 rounded-lg border border-[#eee5d9] object-cover shrink-0"
                              />
                            ) : (
                              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[#f1e4ce] text-xl text-[#986122]">
                                ✦
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-[#493827]">
                                {itemTitle}
                              </p>
                              <p className="mt-0.5 text-xs text-[#8b7a66]">
                                Qty: {itemQty} × {formatPrice(itemPrice)}
                              </p>
                            </div>
                            <p className="text-sm font-bold text-[#493827] shrink-0">
                              {formatPrice(itemPrice * itemQty)}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Financial Summary & Coupon Notes */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#faf6ee] p-3.5 text-xs text-[#6e5d4b]">
                    <div className="flex flex-wrap items-center gap-3">
                      {order.coupon && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#8e571e]/10 px-2 py-1 font-bold text-[#8e571e]">
                          🏷️ Coupon: {order.coupon}
                        </span>
                      )}
                      {order.discount > 0 && (
                        <span className="font-semibold text-emerald-700">
                          Discount Applied: -{formatPrice(order.discount)}
                        </span>
                      )}
                      {order.trackingNumber && (
                        <span className="text-[#8e571e] font-semibold">
                          📦 Tracking: {order.trackingNumber}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span>Subtotal: {formatPrice(order.subtotal || order.total)}</span>
                      <span>Shipping: {order.shipping > 0 ? formatPrice(order.shipping) : "FREE"}</span>
                      <span className="text-sm font-bold text-[#382b20]">
                        Total: {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}

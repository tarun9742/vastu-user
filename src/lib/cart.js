 
const CART_KEY = "bsv-cart";

function notifyCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bsv-cart-updated"));
  }
}

export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getCartCount() {
  return getCart().reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0
  );
}

export function saveCart(cart) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyCartUpdated();
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const amount = Math.max(1, Number(quantity) || 1);

  const existing = cart.find((item) => item.slug === product.slug);

  const updatedCart = existing
    ? cart.map((item) =>
        item.slug === product.slug
          ? { ...item, quantity: (Number(item.quantity) || 0) + amount }
          : item
      )
    : [
        ...cart,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image || "",
          quantity: amount,
        },
      ];

  saveCart(updatedCart);
  return updatedCart;
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
  notifyCartUpdated();
}

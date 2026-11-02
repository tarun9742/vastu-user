 
const AUTH_KEY = "bsv-user";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  try {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("bsv-auth-updated"));
}

export function logoutUser() {
  const apiBase = (process.env.NEXT_PUBLIC_VASTU_API_URL || "").replace(/\/$/, "");
  fetch(`${apiBase}/api/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("bsv-auth-updated"));
}

export function openLoginPopup(returnTo = "/") {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("bsv-open-login", {
      detail: { returnTo },
    })
  );
} 
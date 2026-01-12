const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

export function fetchProducts() {
  return request("/products");
}

export function fetchCart(sessionId) {
  return request(`/cart/${sessionId}`);
}

export function addToCart(sessionId, productId, quantity = 1) {
  return request(`/cart/${sessionId}/items`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export function updateCartItem(sessionId, cartItemId, quantity) {
  return request(`/cart/${sessionId}/items/${cartItemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(sessionId, cartItemId) {
  return request(`/cart/${sessionId}/items/${cartItemId}`, {
    method: "DELETE",
  });
}

export function checkout(sessionId) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  });
}

export function sendContactMessage({ name, email, message }) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
  });
}



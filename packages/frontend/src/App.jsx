import React, { useEffect, useState, useMemo } from "react";
import { CartContext } from "./cartContext.js";
import { fetchProducts, fetchCart, addToCart, updateCartItem, removeCartItem, checkout, sendContactMessage } from "./api.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";

const SESSION_KEY = "shophub_session_id";

function getOrCreateSessionId() {
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const sessionId = useMemo(() => getOrCreateSessionId(), []);

  useEffect(() => {
    async function load() {
      try {
        const [prod, cart] = await Promise.all([
          fetchProducts(),
          fetchCart(sessionId),
        ]);
        setProducts(prod);
        setCartItems(cart);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sessionId]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  }

  async function handleAddToCart(productId) {
    try {
      const product = products.find((p) => p.id === productId);
      await addToCart(sessionId, productId, 1);
      const updatedCart = await fetchCart(sessionId);
      setCartItems(updatedCart);
      showNotification(`${product.name} added to cart!`);
      setIsCartOpen(true);
    } catch (err) {
      console.error(err);
      showNotification("Failed to add item to cart.");
    }
  }

  async function handleUpdateQuantity(cartItemId, newQuantity) {
    try {
      await updateCartItem(sessionId, cartItemId, newQuantity);
      const updatedCart = await fetchCart(sessionId);
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
      showNotification("Failed to update cart.");
    }
  }

  async function handleRemoveItem(cartItemId) {
    try {
      await removeCartItem(sessionId, cartItemId);
      const updatedCart = await fetchCart(sessionId);
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
      showNotification("Failed to remove item.");
    }
  }

  async function handleCheckout() {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    try {
      const { total } = await checkout(sessionId);
      alert(
        `Thank you for your purchase!\nTotal: $${total.toFixed(
          2
        )}\n\n(This is a demo - no payment will be processed)`
      );
      const updatedCart = await fetchCart(sessionId);
      setCartItems(updatedCart);
      setIsCartOpen(false);
    } catch (err) {
      console.error(err);
      showNotification("Checkout failed.");
    }
  }

  async function handleContactSubmit({ name, email, message }) {
    try {
      await sendContactMessage({ name, email, message });
      alert("Thank you for your message! We will get back to you soon.");
    } catch (err) {
      console.error(err);
      showNotification("Failed to send message.");
    }
  }

  const cartContextValue = {
    items: cartItems,
    cartCount,
    cartTotal,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    checkout: handleCheckout,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <div>
        <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <Hero />
        <ProductsSection
          products={products}
          loading={loading}
          onAddToCart={handleAddToCart}
        />
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        <AboutSection />
        <ContactSection onSubmit={handleContactSubmit} />
        <Footer />
        {notification && (
          <div className="notification">{notification}</div>
        )}
      </div>
    </CartContext.Provider>
  );
}



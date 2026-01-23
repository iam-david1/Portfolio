import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { CartContext } from "../cartContext.js";
import { mockProducts } from "../mockData.js";
import { Link } from "react-router-dom";
import "../styles.css";

// Demo mode - uses local storage cart instead of backend API
const CART_STORAGE_KEY = "shophub_demo_cart";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Floating Particles Background
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0, 212, 255, 0.6), rgba(0, 212, 255, 0))`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Glowing Orbs Background
function GlowingOrbs() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%)",
          top: "-200px",
          left: "-200px",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 0, 170, 0.1), transparent 70%)",
          bottom: "-150px",
          right: "-150px",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.08), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

// Loading Skeleton
function ProductSkeleton() {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="skeleton" style={{ height: "280px", borderRadius: "20px 20px 0 0" }} />
      <div style={{ padding: "1.5rem" }}>
        <div className="skeleton" style={{ height: "24px", width: "70%", marginBottom: "0.75rem", borderRadius: "8px" }} />
        <div className="skeleton" style={{ height: "20px", width: "90%", marginBottom: "0.75rem", borderRadius: "8px" }} />
        <div className="skeleton" style={{ height: "32px", width: "40%", marginBottom: "1rem", borderRadius: "8px" }} />
        <div className="skeleton" style={{ height: "48px", width: "100%", borderRadius: "12px" }} />
      </div>
    </motion.div>
  );
}

// Product Card with animations
function ProductCard({ product, onAddToCart, index }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await onAddToCart();
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <motion.div
      className="product-card"
      variants={fadeInUp}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="product-image">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23111%27 width=%27400%27 height=%27400%27/%3E%3Ctext fill=%27%2300D4FF%27 font-family=%27sans-serif%27 font-size=%2720%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27%3EProduct%3C/text%3E%3C/svg%3E";
          }}
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), transparent)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "0.75rem", lineHeight: 1.5 }}>
            {product.description}
          </p>
        )}
        <motion.div
          className="product-price"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          ${Number(product.price).toFixed(2)}
        </motion.div>
        <motion.button
          className="add-to-cart"
          onClick={handleAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isAdding}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  ✓
                </motion.span>
                Added!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

// Hero Section with animations
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="hero" id="home">
      <FloatingParticles />
      <GlowingOrbs />

      <motion.div
        className="container"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{ y, opacity, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <motion.div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <motion.span
            variants={fadeInUp}
            style={{
              display: "inline-block",
              padding: "0.6rem 1.8rem",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "50px",
              color: "#00d4ff",
              fontSize: "0.85rem",
              marginBottom: "2rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 600,
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(0, 212, 255, 0.6)",
              boxShadow: "0 0 30px rgba(0, 212, 255, 0.2)"
            }}
          >
            ✨ Premium Tech Store
          </motion.span>

          <motion.h1
            className="hero-title"
            variants={fadeInUp}
            style={{ fontSize: "4rem", fontWeight: 800, marginBottom: "1.5rem" }}
          >
            Welcome to ShopHub
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={fadeInUp}
            style={{ maxWidth: "550px", fontSize: "1.25rem", marginBottom: "2.5rem" }}
          >
            Discover Premium Products at Amazing Prices
          </motion.p>

          <motion.a
            href="#products"
            className="btn btn-primary"
            variants={fadeInUp}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 15px 50px rgba(0, 212, 255, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "1.1rem 3rem",
              fontSize: "1.1rem",
              borderRadius: "50px",
            }}
          >
            Shop Now →
          </motion.a>

          <motion.div
            variants={fadeInUp}
            style={{
              marginTop: "4rem",
              display: "flex",
              gap: "3rem",
              color: "#888",
              fontSize: "0.9rem"
            }}
          >
            {[
              { label: "Free Shipping", icon: "🚚" },
              { label: "24/7 Support", icon: "💬" },
              { label: "Secure Payment", icon: "🔒" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                whileHover={{ color: "#00d4ff", scale: 1.05 }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{
          width: "30px",
          height: "50px",
          borderRadius: "20px",
          border: "2px solid rgba(0, 212, 255, 0.3)",
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
        }}>
          <motion.div
            style={{
              width: "4px",
              height: "10px",
              borderRadius: "4px",
              background: "#00d4ff",
            }}
            animate={{ y: [0, 15, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// Products Section with animations
function ProductsSection({ products, loading, onAddToCart }) {
  return (
    <section className="products" id="products">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <motion.span
            variants={fadeInUp}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "50px",
              color: "#00d4ff",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            Our Collection
          </motion.span>
          <motion.h2 className="section-title" variants={fadeInUp}>
            Featured Products
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            style={{ color: "#888", maxWidth: "500px", margin: "1rem auto 0", fontSize: "1.1rem" }}
          >
            Handpicked premium tech products for the modern lifestyle
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="products-grid">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="products-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={() => onAddToCart(product.id)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Cart Sidebar with animations
function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout, total }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 999,
            }}
          />
          <motion.div
            className="cart-sidebar open"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h3>🛒 Your Cart</h3>
              <motion.button
                className="close-cart"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>
            <div className="cart-items">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: "center", padding: "3rem" }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: "4rem", marginBottom: "1rem" }}
                  >
                    🛒
                  </motion.div>
                  <p className="empty-cart" style={{ padding: 0 }}>Your cart is empty</p>
                  <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    Start shopping to add items
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0, padding: 0 }}
                      layout
                      transition={{ duration: 0.3 }}
                    >
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                        <div className="cart-item-controls">
                          <motion.button
                            className="quantity-btn"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            className="quantity-btn"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </motion.button>
                          <motion.button
                            className="remove-item"
                            whileHover={{ scale: 1.1 }}
                            onClick={() => onRemove(item.id)}
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            <div className="cart-footer">
              <motion.div
                className="cart-total"
                key={total}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
              >
                Total: <span style={{ background: "linear-gradient(135deg, #00d4ff, #00ff88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>${total.toFixed(2)}</span>
              </motion.div>
              <motion.button
                className="btn btn-primary btn-checkout"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0, 212, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onCheckout}
                disabled={items.length === 0}
                style={{ opacity: items.length === 0 ? 0.5 : 1 }}
              >
                Checkout →
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Navbar with animations
function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <motion.div
          className="nav-brand"
          whileHover={{ scale: 1.05 }}
        >
          <a href="#home" style={{ color: "#00d4ff", textDecoration: "none", fontSize: "1.5rem", fontWeight: 700 }}>
            ShopHub
          </a>
        </motion.div>
        <ul className="nav-menu">
          {["Home", "Products", "About", "Contact"].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
        </ul>
        <div className="nav-actions">
          <motion.button
            className="cart-btn"
            onClick={onCartClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  className="cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key={cartCount}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

// About Section with animations
function AboutSection() {
  const features = [
    { title: "Free Shipping", desc: "On orders over $50", icon: "🚚" },
    { title: "24/7 Support", desc: "Always here to help", icon: "💬" },
    { title: "Secure Payment", desc: "100% protected", icon: "🔒" },
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "50px",
              color: "#00d4ff",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            About Us
          </motion.span>
          <motion.h2 className="section-title" variants={fadeInUp}>
            Why Choose ShopHub?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
            We're dedicated to bringing you the best in tech products with unbeatable prices and exceptional service. Quality you can trust, delivered to your door.
          </motion.p>
          <motion.div className="features" variants={staggerContainer}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="feature"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 212, 255, 0.15)"
                }}
              >
                <motion.div
                  style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section with animations
function ContactSection({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(form);
    setForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <motion.span
            variants={fadeInUp}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "50px",
              color: "#00d4ff",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            Get in Touch
          </motion.span>
          <h2 className="section-title">Contact Us</h2>
        </motion.div>

        <motion.div
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="contact-info" variants={fadeInUp}>
            <h3>Let's Talk</h3>
            <p style={{ marginBottom: "2rem" }}>Have questions? We'd love to hear from you!</p>

            {[
              { label: "Email", value: "support@shophub.com", icon: "📧" },
              { label: "Phone", value: "(555) 123-4567", icon: "📞" },
              { label: "Hours", value: "Mon-Fri 9AM-6PM", icon: "🕐" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
                whileHover={{
                  borderColor: "rgba(0, 212, 255, 0.3)",
                  background: "rgba(0, 212, 255, 0.05)"
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <div>
                  <div style={{ color: "#00d4ff", fontWeight: 600, fontSize: "0.85rem" }}>{item.label}</div>
                  <div style={{ color: "#fff" }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            className="contact-form"
            variants={fadeInUp}
            onSubmit={handleSubmit}
          >
            <motion.input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              whileFocus={{ borderColor: "#00d4ff", boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)" }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              whileFocus={{ borderColor: "#00d4ff", boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)" }}
            />
            <motion.textarea
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              whileFocus={{ borderColor: "#00d4ff", boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)" }}
            />
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0, 212, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              style={{ padding: "1rem 2rem" }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : submitted ? (
                <span>✓ Sent!</span>
              ) : (
                <span>Send Message →</span>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

// Footer with animations
function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div
          style={{ marginBottom: "1.5rem" }}
          whileHover={{ scale: 1.05 }}
        >
          <span style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #00d4ff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            ShopHub
          </span>
        </motion.div>
        <p>&copy; 2024 ShopHub. All rights reserved. | Premium Tech Store</p>
      </div>
    </motion.footer>
  );
}

// Helper to load cart from localStorage
function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Helper to save cart to localStorage
function saveCartToStorage(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export default function ShopHubPage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Load products from mock data
    setProducts(mockProducts);
    // Load cart from localStorage
    setCartItems(loadCartFromStorage());
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, loading]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleAddToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: Date.now(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    showNotification(`${product.name} added to cart!`);
  }

  function handleUpdateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function handleRemoveItem(cartItemId) {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showNotification("Item removed from cart.");
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      showNotification("Your cart is empty!");
      return;
    }
    const total = cartTotal;
    setCartItems([]);
    setIsCartOpen(false);
    showNotification(`Demo: Order placed! Total: $${total.toFixed(2)}`);
  }

  function handleContactSubmit({ name, email, message }) {
    // Demo mode - just show success message
    showNotification("Demo: Message received! (Not actually sent)");
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
      <div style={{ background: "#000", minHeight: "100vh" }}>
        {/* Faint Back Button */}
        <Link
          to="/"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            padding: "0.7rem 1.4rem",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "rgba(0, 212, 255, 0.8)",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 212, 255, 0.1)";
            e.currentTarget.style.color = "#00d4ff";
            e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.5)";
            e.currentTarget.style.color = "rgba(0, 212, 255, 0.8)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          ← Home
        </Link>

        <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <HeroSection />
        <ProductsSection
          products={products}
          loading={loading}
          onAddToCart={handleAddToCart}
        />
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveItem}
          onCheckout={handleCheckout}
          total={cartTotal}
        />
        <AboutSection />
        <ContactSection onSubmit={handleContactSubmit} />
        <Footer />

        {/* Animated Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              className="notification"
              initial={{ opacity: 0, y: -30, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -30, x: "-50%" }}
              style={{
                position: "fixed",
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                color: "#000",
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: 600,
                zIndex: 10001,
                boxShadow: "0 15px 50px rgba(0, 212, 255, 0.4)",
              }}
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

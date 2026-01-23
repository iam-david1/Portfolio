import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  mockHomecareServices,
  mockHomecareCaregivers,
  mockHomecareTestimonials,
  mockHomecareStats,
  mockHomecareFeatures,
} from "../mockData.js";
import "./HomeCarePage.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Loading skeleton
function Skeleton({ width, height, borderRadius = "8px" }) {
  return (
    <div className="skeleton" style={{ width, height, borderRadius }} />
  );
}

// Error component
function ErrorMessage({ message, onRetry }) {
  return (
    <motion.div
      className="error-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="error-icon">!</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </motion.div>
  );
}

// Service Card
function ServiceCard({ service }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="hc-service-card"
      variants={fadeInUp}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
    >
      <div className="hc-service-image">
        <img src={service.image} alt={service.name} loading="lazy" />
        <div className="hc-service-icon">
          <span>{getServiceIcon(service.icon)}</span>
        </div>
      </div>
      <div className="hc-service-content">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="hc-service-features">
          {service.features.slice(0, isExpanded ? undefined : 3).map((feature, i) => (
            <span key={i} className="feature-tag">{feature}</span>
          ))}
        </div>
        {service.features.length > 3 && (
          <button
            className="show-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : `+${service.features.length - 3} more`}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Helper function for icons
function getServiceIcon(icon) {
  const icons = {
    user: "👤",
    "heart-pulse": "💓",
    heart: "❤️",
    utensils: "🍽️",
    home: "🏠",
    car: "🚗",
    bed: "🛏️",
    brain: "🧠",
  };
  return icons[icon] || "🏥";
}

// Caregiver Card
function CaregiverCard({ caregiver }) {
  return (
    <motion.div
      className="hc-caregiver-card"
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
    >
      <div className="hc-caregiver-header">
        <div className="hc-caregiver-avatar">
          <img src={caregiver.image} alt={caregiver.name} loading="lazy" />
          <div className="hc-caregiver-rating">
            ★ {caregiver.rating}
          </div>
        </div>
        <div className="hc-caregiver-info">
          <h3>{caregiver.name}</h3>
          <p className="hc-caregiver-role">{caregiver.role}</p>
          <p className="hc-caregiver-experience">
            {caregiver.experience_years}+ years experience
          </p>
        </div>
      </div>
      <p className="hc-caregiver-bio">{caregiver.bio}</p>
      <div className="hc-caregiver-certs">
        {caregiver.certifications.map((cert, i) => (
          <span key={i} className="cert-badge">{cert}</span>
        ))}
      </div>
    </motion.div>
  );
}

// Feature Card
function FeatureCard({ feature }) {
  return (
    <motion.div className="hc-feature-card" variants={scaleIn}>
      <div className="hc-feature-icon">{getFeatureIcon(feature.icon)}</div>
      <h4>{feature.title}</h4>
      <p>{feature.description}</p>
    </motion.div>
  );
}

function getFeatureIcon(icon) {
  const icons = {
    "shield-check": "🛡️",
    clock: "⏰",
    lock: "🔒",
    clipboard: "📋",
    "user-check": "✅",
    calendar: "📅",
  };
  return icons[icon] || "✓";
}

// Testimonial Card
function TestimonialCard({ testimonial }) {
  return (
    <motion.div className="hc-testimonial-card" variants={fadeInUp}>
      <div className="hc-testimonial-header">
        <img src={testimonial.image} alt={testimonial.name} className="hc-testimonial-avatar" />
        <div>
          <h4>{testimonial.name}</h4>
          <p className="hc-testimonial-relation">{testimonial.relation}</p>
          <div className="hc-testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < testimonial.rating ? "star filled" : "star"}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="hc-testimonial-comment">"{testimonial.comment}"</p>
    </motion.div>
  );
}

// Animated Counter
function StatCounter({ value, label, suffix = "", icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div className="hc-stat-item" variants={scaleIn}>
      <span className="hc-stat-icon">{icon}</span>
      <span className="hc-stat-value">{count.toLocaleString()}{suffix}</span>
      <span className="hc-stat-label">{label}</span>
    </motion.div>
  );
}

export default function HomeCarePage() {
  const [services, setServices] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [consultForm, setConsultForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_id: "",
    message: "",
    preferred_date: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function loadData() {
    setLoading(true);
    setError(null);
    // Use mock data for demo mode
    setServices(mockHomecareServices);
    setCaregivers(mockHomecareCaregivers);
    setTestimonials(mockHomecareTestimonials);
    setStats(mockHomecareStats);
    setFeatures(mockHomecareFeatures);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "caregivers", "about", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleConsultSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Demo mode - simulate form submission
    setTimeout(() => {
      setSubmitStatus({
        type: "success",
        message: "Demo: Consultation request received! (This is a demo - no actual request was submitted)"
      });
      setConsultForm({
        name: "",
        email: "",
        phone: "",
        service_id: "",
        message: "",
        preferred_date: "",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homecare-page">
      {/* Back Button */}
      <Link to="/" className="hc-back-button">
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: -5 }}
        >
          ← Back to Home
        </motion.span>
      </Link>

      {/* Navigation */}
      <motion.nav
        className="hc-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hc-nav-container">
          <motion.div className="hc-nav-brand" whileHover={{ scale: 1.05 }}>
            <span className="brand-icon">🏥</span>
            CareComfort
          </motion.div>
          <ul className="hc-nav-menu">
            {["home", "services", "caregivers", "about", "contact"].map((item) => (
              <li key={item}>
                <button
                  className={activeSection === item ? "active" : ""}
                  onClick={() => scrollToSection(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hc-hero" id="home">
        <div className="hc-hero-bg" />
        <div className="hc-hero-overlay" />
        <motion.div
          className="hc-hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hc-hero-badge" variants={fadeInUp}>
            <span>🏥</span> Trusted Home Care Since 2009
          </motion.div>
          <motion.h1 variants={fadeInUp}>
            Compassionate Care
            <br />
            <span className="gradient-text">In Your Home</span>
          </motion.h1>
          <motion.p variants={fadeInUp}>
            Professional, reliable, and caring support in the comfort of your home.
            We treat your loved ones like our own family.
          </motion.p>
          <motion.div className="hc-hero-buttons" variants={fadeInUp}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
            >
              Request Care
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("services")}
            >
              Our Services
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div className="hc-trust-badges" variants={fadeInUp}>
            <span className="trust-badge">✓ Licensed & Insured</span>
            <span className="trust-badge">✓ 24/7 Support</span>
            <span className="trust-badge">✓ HIPAA Compliant</span>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        {stats && (
          <motion.div
            className="hc-hero-stats"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <StatCounter value={stats.familiesServed} label="Families Served" suffix="+" icon="👨‍👩‍👧" />
            <StatCounter value={stats.yearsExperience} label="Years Experience" icon="📅" />
            <StatCounter value={stats.caregivers} label="Expert Caregivers" icon="👩‍⚕️" />
            <StatCounter value={stats.services} label="Care Services" icon="💝" />
          </motion.div>
        )}
      </section>

      {/* Services Section */}
      <section className="hc-section hc-services-section" id="services">
        <div className="hc-container">
          <motion.div
            className="hc-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="hc-section-label">Our Services</span>
            <h2>Comprehensive Care Solutions</h2>
            <p>Personalized care services tailored to meet your unique needs</p>
          </motion.div>

          {loading ? (
            <div className="hc-services-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="hc-service-card skeleton-card">
                  <Skeleton width="100%" height="180px" borderRadius="16px 16px 0 0" />
                  <div style={{ padding: "1.5rem" }}>
                    <Skeleton width="70%" height="24px" />
                    <Skeleton width="100%" height="60px" />
                    <Skeleton width="50%" height="20px" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={loadData} />
          ) : (
            <motion.div
              className="hc-services-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Caregivers Section */}
      <section className="hc-section hc-caregivers-section" id="caregivers">
        <div className="hc-container">
          <motion.div
            className="hc-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="hc-section-label">Our Team</span>
            <h2>Qualified Caregivers</h2>
            <p>Experienced, compassionate professionals dedicated to your well-being</p>
          </motion.div>

          {loading ? (
            <div className="hc-caregivers-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="hc-caregiver-card skeleton-card">
                  <Skeleton width="100px" height="100px" borderRadius="50%" />
                  <Skeleton width="60%" height="24px" />
                  <Skeleton width="100%" height="80px" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="hc-caregivers-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {caregivers.map((caregiver) => (
                <CaregiverCard key={caregiver.id} caregiver={caregiver} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* About/Why Choose Us Section */}
      <section className="hc-section hc-about-section" id="about">
        <div className="hc-container">
          <div className="hc-about-wrapper">
            <motion.div
              className="hc-about-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <span className="hc-section-label">About Us</span>
              <h2>Why Choose CareComfort?</h2>
              <p>
                For over 15 years, CareComfort has been providing exceptional home care
                services. We understand that every individual has unique needs, and
                we're committed to delivering personalized, compassionate care that
                makes a real difference in people's lives.
              </p>
              <p>
                Our caregivers are more than just healthcare providers - they become
                trusted companions who bring comfort, dignity, and joy to those they serve.
              </p>
            </motion.div>

            <motion.div
              className="hc-features-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="hc-section hc-testimonials-section">
        <div className="hc-container">
          <motion.div
            className="hc-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="hc-section-label">Testimonials</span>
            <h2>What Families Say</h2>
            <p>Real experiences from families we've had the privilege to serve</p>
          </motion.div>

          {loading ? (
            <div className="hc-testimonials-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="hc-testimonial-card skeleton-card">
                  <Skeleton width="60px" height="60px" borderRadius="50%" />
                  <Skeleton width="80%" height="20px" />
                  <Skeleton width="100%" height="60px" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="hc-testimonials-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="hc-section hc-contact-section" id="contact">
        <div className="hc-container">
          <div className="hc-contact-wrapper">
            <motion.div
              className="hc-contact-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <span className="hc-section-label">Get In Touch</span>
              <h2>Request a Consultation</h2>
              <p>
                Contact us today to discuss your care needs. Our team is ready to
                help you find the perfect care solution for your loved one.
              </p>

              <div className="hc-contact-items">
                <div className="hc-contact-item">
                  <span className="hc-contact-icon">📞</span>
                  <div>
                    <h4>Phone</h4>
                    <p>1-800-CARECOM</p>
                    <p className="small">(1-800-227-3266)</p>
                  </div>
                </div>
                <div className="hc-contact-item">
                  <span className="hc-contact-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p>info@carecomfort.com</p>
                  </div>
                </div>
                <div className="hc-contact-item">
                  <span className="hc-contact-icon">📍</span>
                  <div>
                    <h4>Address</h4>
                    <p>789 Health Avenue</p>
                    <p className="small">Care City, CC 12345</p>
                  </div>
                </div>
                <div className="hc-contact-item">
                  <span className="hc-contact-icon">🕒</span>
                  <div>
                    <h4>Hours</h4>
                    <p>Mon-Fri: 8AM - 6PM</p>
                    <p className="small">Emergency: 24/7 Available</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hc-contact-form-container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <h3>Request Information</h3>
              <form className="hc-contact-form" onSubmit={handleConsultSubmit}>
                <div className="hc-form-row">
                  <div className="hc-form-group">
                    <input
                      type="text"
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                      placeholder="Full Name *"
                      required
                    />
                  </div>
                  <div className="hc-form-group">
                    <input
                      type="tel"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                      placeholder="Phone Number *"
                      required
                    />
                  </div>
                </div>

                <div className="hc-form-group">
                  <input
                    type="email"
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    placeholder="Email Address *"
                    required
                  />
                </div>

                <div className="hc-form-row">
                  <div className="hc-form-group">
                    <select
                      value={consultForm.service_id}
                      onChange={(e) => setConsultForm({ ...consultForm, service_id: e.target.value })}
                    >
                      <option value="">Select Service Needed</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hc-form-group">
                    <input
                      type="date"
                      value={consultForm.preferred_date}
                      onChange={(e) => setConsultForm({ ...consultForm, preferred_date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      placeholder="Preferred Date"
                    />
                  </div>
                </div>

                <div className="hc-form-group">
                  <textarea
                    value={consultForm.message}
                    onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                    placeholder="Tell us about your care needs..."
                    rows="5"
                  />
                </div>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      className={`hc-submit-status ${submitStatus.type}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-spinner" />
                  ) : (
                    "Submit Request"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hc-footer">
        <div className="hc-container">
          <div className="hc-footer-content">
            <div className="hc-footer-brand">
              <div className="hc-footer-logo">
                <span className="brand-icon">🏥</span>
                CareComfort
              </div>
              <p>Providing compassionate care in the comfort of your home.</p>
            </div>
            <div className="hc-footer-links">
              <h4>Quick Links</h4>
              <button onClick={() => scrollToSection("home")}>Home</button>
              <button onClick={() => scrollToSection("services")}>Services</button>
              <button onClick={() => scrollToSection("caregivers")}>Caregivers</button>
              <button onClick={() => scrollToSection("about")}>About</button>
              <button onClick={() => scrollToSection("contact")}>Contact</button>
            </div>
            <div className="hc-footer-legal">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">HIPAA Compliance</a>
            </div>
            <div className="hc-footer-contact">
              <h4>Contact</h4>
              <p>789 Health Avenue</p>
              <p>1-800-CARECOM</p>
              <p>info@carecomfort.com</p>
            </div>
          </div>
          <div className="hc-footer-bottom">
            <p>&copy; 2024 CareComfort. All rights reserved. Licensed Home Care Agency. | Part of the Portfolio Monorepo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

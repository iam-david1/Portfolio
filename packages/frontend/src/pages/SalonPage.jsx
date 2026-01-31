import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  mockSalonServices,
  mockSalonTeam,
  mockSalonGallery,
  mockSalonReviews,
  mockSalonStats,
} from "../mockData.js";
import "./SalonPage.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Loading skeleton component
function Skeleton({ width, height, borderRadius = "8px" }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius }}
    />
  );
}

// Loading state for services
function ServicesLoading() {
  return (
    <div className="services-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="service-card skeleton-card">
          <Skeleton width="100%" height="200px" borderRadius="12px 12px 0 0" />
          <div style={{ padding: "1.5rem" }}>
            <Skeleton width="70%" height="24px" />
            <Skeleton width="100%" height="16px" />
            <Skeleton width="40%" height="28px" />
          </div>
        </div>
      ))}
    </div>
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

// Service Card Component
function ServiceCard({ service, index }) {
  return (
    <motion.div
      className="service-card"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="service-image">
        <img src={service.image} alt={service.name} loading="lazy" />
        <div className="service-category">{service.category}</div>
      </div>
      <div className="service-content">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="service-meta">
          <span className="service-price">From ${service.price}</span>
          <span className="service-duration">{service.duration} min</span>
        </div>
      </div>
    </motion.div>
  );
}

// Team Member Card
function TeamCard({ member }) {
  return (
    <motion.div
      className="team-card"
      variants={scaleIn}
      whileHover={{ scale: 1.03 }}
    >
      <div className="team-image">
        <img src={member.image} alt={member.name} loading="lazy" />
        <div className="team-overlay">
          <div className="team-specialties">
            {member.specialties.map((s, i) => (
              <span key={i} className="specialty-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="team-info">
        <h3>{member.name}</h3>
        <p className="team-role">{member.role}</p>
        <p className="team-bio">{member.bio}</p>
        <div className="team-experience">
          <span>{member.experience_years}+ years experience</span>
        </div>
      </div>
    </motion.div>
  );
}

// Gallery Item
function GalleryItem({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="gallery-item"
      variants={scaleIn}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <img src={item.image} alt={item.title} loading="lazy" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>{item.title}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Review Card
function ReviewCard({ review }) {
  return (
    <motion.div className="review-card" variants={fadeInUp}>
      <div className="review-header">
        <img src={review.image} alt={review.name} className="review-avatar" />
        <div>
          <h4>{review.name}</h4>
          <div className="review-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < review.rating ? "star filled" : "star"}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="review-comment">{review.comment}</p>
    </motion.div>
  );
}

// Stats Counter with animation
function StatCounter({ value, label, suffix = "" }) {
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
    <motion.div className="stat-item" variants={scaleIn}>
      <span className="stat-value">{count.toLocaleString()}{suffix}</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

export default function SalonPage() {
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_id: "",
    stylist_id: "",
    date: "",
    time: "",
    notes: "",
  });
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function loadData() {
    setLoading(true);
    setError(null);
    // Use mock data for demo mode
    setServices(mockSalonServices);
    setTeam(mockSalonTeam);
    setGallery(mockSalonGallery);
    setReviews(mockSalonReviews);
    setStats(mockSalonStats);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "team", "gallery", "booking", "reviews"];
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

  function handleBookingSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingStatus(null);

    // Demo mode - simulate booking submission
    setTimeout(() => {
      setBookingStatus({
        type: "success",
        message: "Demo: Booking request received! (This is a demo - no actual booking was made)"
      });
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        service_id: "",
        stylist_id: "",
        date: "",
        time: "",
        notes: "",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="salon-page">
      {/* Back Button */}
      <Link to="/" className="back-button">
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
        className="salon-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <motion.div
            className="nav-brand"
            whileHover={{ scale: 1.05 }}
          >
            Elite Salon
          </motion.div>
          <button
            className={`salon-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {["home", "services", "team", "gallery", "booking", "reviews"].map((item) => (
              <li key={item}>
                <button
                  className={activeSection === item ? "active" : ""}
                  onClick={() => { scrollToSection(item); setMenuOpen(false); }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="salon-hero" id="home">
        <motion.div
          className="hero-bg"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span className="hero-label" variants={fadeInUp}>
            Premium Beauty Experience
          </motion.span>
          <motion.h1 variants={fadeInUp}>
            Experience Luxury <br />
            <span className="gold-text">Beauty & Style</span>
          </motion.h1>
          <motion.p variants={fadeInUp}>
            Transform your look with our expert stylists. Where artistry meets excellence.
          </motion.p>
          <motion.div className="hero-buttons" variants={fadeInUp}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("booking")}
            >
              Book Appointment
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("services")}
            >
              View Services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        {stats && (
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <StatCounter value={stats.happyClients} label="Happy Clients" suffix="+" />
            <StatCounter value={stats.yearsExperience} label="Years Experience" />
            <StatCounter value={stats.stylists} label="Expert Stylists" />
            <StatCounter value={stats.services} label="Services" />
          </motion.div>
        )}
      </section>

      {/* Services Section */}
      <section className="section services-section" id="services">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="section-label">What We Offer</span>
            <h2>Our Services</h2>
            <p>Discover our range of premium beauty services tailored just for you</p>
          </motion.div>

          {loading ? (
            <ServicesLoading />
          ) : error ? (
            <ErrorMessage message={error} onRetry={loadData} />
          ) : (
            <motion.div
              className="services-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section" id="team">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="section-label">Meet The Artists</span>
            <h2>Our Expert Team</h2>
            <p>Passionate professionals dedicated to making you look and feel amazing</p>
          </motion.div>

          {loading ? (
            <div className="team-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="team-card skeleton-card">
                  <Skeleton width="100%" height="300px" borderRadius="12px" />
                  <div style={{ padding: "1rem" }}>
                    <Skeleton width="60%" height="24px" />
                    <Skeleton width="40%" height="16px" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="team-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="section-label">Our Portfolio</span>
            <h2>Gallery</h2>
            <p>Browse through our stunning transformations and creative work</p>
          </motion.div>

          {loading ? (
            <div className="gallery-grid">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} width="100%" height="250px" borderRadius="12px" />
              ))}
            </div>
          ) : (
            <motion.div
              className="gallery-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {gallery.map((item) => (
                <GalleryItem key={item.id} item={item} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking Section */}
      <section className="section booking-section" id="booking">
        <div className="container">
          <div className="booking-wrapper">
            <motion.div
              className="booking-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <span className="section-label">Ready to Transform?</span>
              <h2>Book Your Appointment</h2>
              <p>
                Schedule your visit and let our experts create the perfect look for you.
                We can't wait to welcome you to Elite Salon.
              </p>

              <div className="booking-features">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Expert stylists with years of experience</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Premium products and tools</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Relaxing and luxurious atmosphere</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Personalized consultations</span>
                </div>
              </div>

              <div className="business-hours">
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </motion.div>

            <motion.div
              className="booking-form-container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <form className="booking-form" onSubmit={handleBookingSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Service</label>
                    <select
                      value={bookingForm.service_id}
                      onChange={(e) => setBookingForm({ ...bookingForm, service_id: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} - ${s.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Stylist</label>
                    <select
                      value={bookingForm.stylist_id}
                      onChange={(e) => setBookingForm({ ...bookingForm, stylist_id: e.target.value })}
                    >
                      <option value="">Any available</option>
                      {team.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} - {t.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Time *</label>
                    <select
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      required
                    >
                      <option value="">Select time</option>
                      {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    placeholder="Any special requests or notes..."
                    rows="4"
                  />
                </div>

                <AnimatePresence>
                  {bookingStatus && (
                    <motion.div
                      className={`booking-status ${bookingStatus.type}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {bookingStatus.message}
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
                    "Confirm Booking"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section" id="reviews">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="section-label">Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Real experiences from our valued customers</p>
          </motion.div>

          {loading ? (
            <div className="reviews-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="review-card skeleton-card">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="80%" height="20px" />
                  <Skeleton width="100%" height="60px" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="reviews-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <h2>Visit Us</h2>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>456 Beauty Boulevard, Style City, SC 12345</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>hello@elitesalon.com</p>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">TikTok</a>
              </div>
            </motion.div>
            <motion.div
              className="map-placeholder"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <div className="map-content">
                <span className="map-icon">📍</span>
                <h3>Find Us Here</h3>
                <p>456 Beauty Boulevard, Style City</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="salon-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Elite Salon</h3>
              <p>Where beauty meets artistry. Transform your look with our expert stylists.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <button onClick={() => scrollToSection("services")}>Services</button>
              <button onClick={() => scrollToSection("team")}>Team</button>
              <button onClick={() => scrollToSection("gallery")}>Gallery</button>
              <button onClick={() => scrollToSection("booking")}>Book Now</button>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>456 Beauty Boulevard</p>
              <p>(555) 123-4567</p>
              <p>hello@elitesalon.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Elite Salon. All rights reserved. | Part of the Portfolio Monorepo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

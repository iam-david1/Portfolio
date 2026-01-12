import React, { useState } from "react";

export default function ContactSection({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Email: support@shophub.com</p>
            <p>Phone: 1-800-SHOPHUB</p>
            <p>Address: 123 Shopping Street, Commerce City</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}



import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: "6rem", marginBottom: "1rem" }}
        >
          🔍
        </motion.div>

        <h1
          style={{
            fontSize: "clamp(4rem, 15vw, 8rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #00d4ff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#888",
            marginBottom: "1rem",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            maxWidth: "400px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem 2rem",
            background: "linear-gradient(135deg, #00d4ff, #00ff88)",
            borderRadius: "12px",
            color: "#000",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: 600,
            transition: "transform 0.2s",
          }}
        >
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

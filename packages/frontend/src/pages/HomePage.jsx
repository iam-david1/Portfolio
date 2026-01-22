import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const projects = [
  {
    title: "ShopHub E-Commerce",
    description: "Full-stack e-commerce platform with React frontend, Node.js/Express API, and SQLite database. Features product catalog, session-based cart, and checkout flow.",
    tags: ["React", "Express", "SQLite", "REST API"],
    link: "/shop",
    isFullStack: true,
    color: "#00d4ff",
    icon: "🛒",
  },
  {
    title: "Elite Salon",
    description: "Premium salon booking platform with dynamic service listings, team profiles, gallery, and appointment scheduling. Fully integrated with backend API.",
    tags: ["React", "Framer Motion", "Express", "SQLite"],
    link: "/salon",
    isFullStack: true,
    color: "#d4af37",
    icon: "💇",
  },
  {
    title: "CareComfort HomeCare",
    description: "Healthcare agency platform featuring caregiver profiles, service catalog, testimonials, and consultation request system with database persistence.",
    tags: ["React", "Framer Motion", "Express", "SQLite"],
    link: "/homecare",
    isFullStack: true,
    color: "#3b82f6",
    icon: "🏥",
  },
];

function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -8, boxShadow: `0 20px 40px ${project.color}20` }}
      style={{
        background: "linear-gradient(135deg, #111111 0%, #0a0a0a 100%)",
        borderRadius: "20px",
        border: "1px solid #1f1f1f",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          opacity: 0.6,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "2rem" }}>{project.icon}</span>
        <div>
          <span
            style={{
              display: "inline-block",
              padding: "0.2rem 0.75rem",
              borderRadius: "999px",
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              color: project.color,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Full-Stack
          </span>
        </div>
      </div>

      <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>{project.title}</h2>

      <p
        style={{
          color: "#a0a0a0",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {project.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "0.3rem 0.7rem",
              background: "#1a1a1a",
              borderRadius: "6px",
              fontSize: "0.75rem",
              color: "#888",
              border: "1px solid #2a2a2a",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={project.link}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.85rem 1.5rem",
          borderRadius: "12px",
          background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
          color: project.color === "#d4af37" ? "#0a0a0a" : "#ffffff",
          fontSize: "0.9rem",
          fontWeight: 600,
          textDecoration: "none",
          marginTop: "0.5rem",
          transition: "all 0.3s ease",
        }}
      >
        <span>Open App</span>
        <span>→</span>
      </Link>
    </motion.article>
  );
}

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #0a1628 0%, #000000 60%)",
        color: "#ffffff",
        padding: "2rem",
      }}
    >
      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "2rem",
        }}
      >
        {/* Header */}
        <motion.header
          variants={fadeInUp}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.6rem 1.5rem",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "50px",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>🚀</span>
            <span
              style={{
                color: "#00d4ff",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Portfolio Monorepo
            </span>
          </motion.div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #ffffff, #00d4ff, #00ffbf)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Full-Stack Projects
          </h1>

          <p
            style={{
              color: "#a0a0a0",
              fontSize: "1.1rem",
              maxWidth: "650px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            A collection of production-ready web applications showcasing modern
            full-stack development. Each project features a React frontend,
            Node.js/Express backend, and SQLite database.
          </p>

          {/* Tech stack badges */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["React 18", "Node.js", "Express", "SQLite", "Framer Motion", "pnpm Monorepo"].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#111",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    color: "#888",
                    border: "1px solid #222",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </motion.header>

        {/* Projects Grid */}
        <motion.section
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.section>

        {/* Architecture Section */}
        <motion.section
          variants={fadeInUp}
          style={{
            background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
            borderRadius: "24px",
            border: "1px solid #1f1f1f",
            padding: "3rem",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Monorepo Architecture
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                background: "#0a0a0a",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid #1a1a1a",
              }}
            >
              <h3
                style={{
                  color: "#00d4ff",
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>📦</span> Shared Backend
              </h3>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Single Express.js server handles all API routes for e-commerce,
                salon, and homecare. Unified SQLite database with proper schema
                separation.
              </p>
            </div>

            <div
              style={{
                background: "#0a0a0a",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid #1a1a1a",
              }}
            >
              <h3
                style={{
                  color: "#d4af37",
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>⚛️</span> React Frontend
              </h3>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Modern React 18 with hooks, context, and Framer Motion animations.
                Each app has its own page with custom styling and components.
              </p>
            </div>

            <div
              style={{
                background: "#0a0a0a",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid #1a1a1a",
              }}
            >
              <h3
                style={{
                  color: "#3b82f6",
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>🔗</span> pnpm Workspaces
              </h3>
              <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Efficient monorepo management with pnpm workspaces. One command
                starts both frontend and backend with hot reloading.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          variants={fadeInUp}
          style={{
            textAlign: "center",
            padding: "2rem 0",
            borderTop: "1px solid #1a1a1a",
          }}
        >
          <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Built with React, Express, SQLite, and Framer Motion
          </p>
          <p style={{ color: "#444", fontSize: "0.8rem" }}>
            Run{" "}
            <code
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.85em",
              }}
            >
              pnpm run dev
            </code>{" "}
            to start both frontend (port 5173) and backend API (port 4000)
          </p>
        </motion.footer>
      </motion.main>
    </div>
  );
}

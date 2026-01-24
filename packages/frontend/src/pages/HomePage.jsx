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

const skills = [
  { name: "React", level: 90, color: "#61DAFB" },
  { name: "Node.js", level: 85, color: "#339933" },
  { name: "JavaScript", level: 90, color: "#F7DF1E" },
  { name: "Express.js", level: 80, color: "#000000" },
  { name: "SQL/SQLite", level: 75, color: "#003B57" },
  { name: "HTML/CSS", level: 90, color: "#E34F26" },
  { name: "Git", level: 85, color: "#F05032" },
  { name: "REST APIs", level: 85, color: "#00D4FF" },
];

const projects = [
  {
    title: "ShopHub E-Commerce",
    description: "Full-stack e-commerce platform with React frontend, Node.js/Express API, and SQLite database. Features product catalog, session-based cart, and checkout flow.",
    tags: ["React", "Express", "SQLite", "REST API"],
    link: "/shop",
    color: "#00d4ff",
    icon: "🛒",
  },
  {
    title: "Elite Salon",
    description: "Premium salon booking platform with dynamic service listings, team profiles, gallery, and appointment scheduling. Fully integrated with backend API.",
    tags: ["React", "Framer Motion", "Express", "SQLite"],
    link: "/salon",
    color: "#d4af37",
    icon: "💇",
  },
  {
    title: "CareComfort HomeCare",
    description: "Healthcare agency platform featuring caregiver profiles, service catalog, testimonials, and consultation request system with database persistence.",
    tags: ["React", "Framer Motion", "Express", "SQLite"],
    link: "/homecare",
    color: "#3b82f6",
    icon: "🏥",
  },
];

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ marginBottom: "1rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{skill.name}</span>
        <span style={{ fontSize: "0.8rem", color: "#888" }}>{skill.level}%</span>
      </div>
      <div style={{
        height: "8px",
        background: "#1a1a1a",
        borderRadius: "4px",
        overflow: "hidden"
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          viewport={{ once: true }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            borderRadius: "4px"
          }}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
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
        <span
          style={{
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

      <h3 style={{ fontSize: "1.35rem", fontWeight: 700 }}>{project.title}</h3>

      <p style={{ color: "#a0a0a0", fontSize: "0.95rem", lineHeight: 1.6, flex: 1 }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
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
        <span>View Project</span>
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
        background: "#000",
        color: "#ffffff",
      }}
    >
      {/* Hero Section - Personal Intro */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Effects */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at top, #0a1628 0%, #000000 60%)",
        }} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%)",
            top: "-200px",
            right: "-200px",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 0, 170, 0.1), transparent 70%)",
            bottom: "-150px",
            left: "-150px",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{
            maxWidth: "900px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Avatar - Abstract Code Icon */}
          <motion.div
            variants={fadeInUp}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              margin: "0 auto 2rem",
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              padding: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="url(#codeGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#00ff88" />
                  </linearGradient>
                </defs>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="12" y1="2" x2="12" y2="22" opacity="0.3" />
              </svg>
            </div>
            {/* Floating particles around avatar */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "-10px",
                borderRadius: "50%",
                border: "1px dashed rgba(0, 212, 255, 0.3)",
              }}
            />
          </motion.div>

          {/* Name & Title */}
          <motion.div variants={fadeInUp}>
            <motion.span
              style={{
                display: "inline-block",
                padding: "0.5rem 1.2rem",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                borderRadius: "50px",
                color: "#00d4ff",
                fontSize: "0.85rem",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              Welcome to my portfolio
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              David Omwenyeke
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              fontWeight: 600,
              color: "#888",
              marginBottom: "1.5rem",
            }}
          >
            Full-Stack Developer
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            style={{
              fontSize: "1.15rem",
              color: "#a0a0a0",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            I build modern, responsive web applications with clean code and great user experiences.
            Passionate about creating full-stack solutions that solve real problems.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginBottom: "2.5rem",
            }}
          >
            <motion.a
              href="https://github.com/iam-david1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "12px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "12px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </motion.a>
            <motion.a
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                borderRadius: "12px",
                color: "#000",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ cursor: "pointer" }}
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div style={{
              width: "30px",
              height: "50px",
              borderRadius: "20px",
              border: "2px solid rgba(0, 212, 255, 0.3)",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}>
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: "4px",
                  height: "10px",
                  borderRadius: "4px",
                  background: "#00d4ff",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(180deg, #000 0%, #0a0a0a 100%)",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem 1.2rem",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                borderRadius: "50px",
                color: "#00d4ff",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              Skills & Expertise
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700 }}>What I Work With</h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
            }}
          >
            <div>
              {skills.slice(0, 4).map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
            <div>
              {skills.slice(4).map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i + 4} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        style={{
          padding: "6rem 2rem",
          background: "#000",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <motion.div variants={fadeInUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem 1.2rem",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                borderRadius: "50px",
                color: "#00d4ff",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              My Work
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Featured Projects
            </h2>
            <p style={{ color: "#888", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
              Full-stack web applications built with modern technologies
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "2rem",
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "3rem 2rem",
          background: "#0a0a0a",
          borderTop: "1px solid #1a1a1a",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            David Omwenyeke
          </h3>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Full-Stack Developer | Building modern web experiences
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <a
              href="https://github.com/iam-david1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#888", textDecoration: "none" }}
            >
              GitHub
            </a>
            <span style={{ color: "#333" }}>|</span>
            <a href="#" style={{ color: "#888", textDecoration: "none" }}>
              LinkedIn
            </a>
            <span style={{ color: "#333" }}>|</span>
            <a href="mailto:contact@example.com" style={{ color: "#888", textDecoration: "none" }}>
              Email
            </a>
          </div>
          <p style={{ color: "#444", fontSize: "0.85rem", marginTop: "2rem" }}>
            © 2024 David Omwenyeke. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

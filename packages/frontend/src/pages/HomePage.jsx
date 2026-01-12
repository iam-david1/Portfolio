import React from "react";
import "../styles.css";

export default function HomePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #02101a 0, #000000 55%)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <main style={{
        maxWidth: "960px",
        width: "100%",
        background: "rgba(0, 0, 0, 0.9)",
        borderRadius: "20px",
        border: "1px solid #1f1f1f",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
        padding: "2.5rem 2rem",
      }}>
        <header style={{
          marginBottom: "2rem",
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #00d4ff, #00ffbf)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            ShopHub Monorepo
          </h1>
          <p style={{
            color: "#b0b0b0",
            fontSize: "0.95rem",
          }}>
            Select which project you want to view: the full-stack e‑commerce app
            or one of the static landing pages.
          </p>
        </header>

        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}>
          <article style={{
            background: "#111111",
            borderRadius: "16px",
            border: "1px solid #1f1f1f",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
            <div>
              <span style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.4)",
                color: "#00d4ff",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                Full‑stack
              </span>
            </div>
            <h2 style={{ fontSize: "1.1rem" }}>
              ShopHub – Dynamic E‑Commerce
            </h2>
            <p style={{
              color: "#b0b0b0",
              fontSize: "0.9rem",
              flex: 1,
            }}>
              React + Node.js + SQLite implementation of the ShopHub store with a
              real API, database‑backed cart, and checkout logic.
            </p>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}>
              <a
                href="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0, 212, 255, 0.7)",
                  color: "#00d4ff",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#00b8e6";
                  e.target.style.background = "rgba(0, 212, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(0, 212, 255, 0.7)";
                  e.target.style.background = "transparent";
                }}
              >
                <span>Open App</span>
                <span>↗</span>
              </a>
            </div>
          </article>

          <article style={{
            background: "#111111",
            borderRadius: "16px",
            border: "1px solid #1f1f1f",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
            <div>
              <span style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.4)",
                color: "#00d4ff",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                Static
              </span>
            </div>
            <h2 style={{ fontSize: "1.1rem" }}>
              ShopHub – Static E‑Commerce
            </h2>
            <p style={{
              color: "#b0b0b0",
              fontSize: "0.9rem",
              flex: 1,
            }}>
              Original static HTML/CSS/JS version of the ShopHub store with a
              client‑side cart and hard‑coded product array.
            </p>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}>
              <a
                href="/examples/ecommerce/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0, 212, 255, 0.7)",
                  color: "#00d4ff",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#00b8e6";
                  e.target.style.background = "rgba(0, 212, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(0, 212, 255, 0.7)";
                  e.target.style.background = "transparent";
                }}
              >
                <span>Open Static Site</span>
                <span>↗</span>
              </a>
            </div>
          </article>

          <article style={{
            background: "#111111",
            borderRadius: "16px",
            border: "1px solid #1f1f1f",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
            <div>
              <span style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.4)",
                color: "#00d4ff",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                Static
              </span>
            </div>
            <h2 style={{ fontSize: "1.1rem" }}>
              Elite Salon Website
            </h2>
            <p style={{
              color: "#b0b0b0",
              fontSize: "0.9rem",
              flex: 1,
            }}>
              Salon & beauty landing page focused on bookings, services, and
              gallery, built with semantic HTML and custom CSS.
            </p>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}>
              <a
                href="/examples/salon/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0, 212, 255, 0.7)",
                  color: "#00d4ff",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#00b8e6";
                  e.target.style.background = "rgba(0, 212, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(0, 212, 255, 0.7)";
                  e.target.style.background = "transparent";
                }}
              >
                <span>Open Static Site</span>
                <span>↗</span>
              </a>
            </div>
          </article>

          <article style={{
            background: "#111111",
            borderRadius: "16px",
            border: "1px solid #1f1f1f",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}>
            <div>
              <span style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.4)",
                color: "#00d4ff",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                Static
              </span>
            </div>
            <h2 style={{ fontSize: "1.1rem" }}>
              CareComfort Home Care
            </h2>
            <p style={{
              color: "#b0b0b0",
              fontSize: "0.9rem",
              flex: 1,
            }}>
              Healthcare/home‑care agency site highlighting services, caregivers,
              and a consultation request form.
            </p>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}>
              <a
                href="/examples/homecare/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0, 212, 255, 0.7)",
                  color: "#00d4ff",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#00b8e6";
                  e.target.style.background = "rgba(0, 212, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(0, 212, 255, 0.7)";
                  e.target.style.background = "transparent";
                }}
              >
                <span>Open Static Site</span>
                <span>↗</span>
              </a>
            </div>
          </article>
        </section>

        <p style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#b0b0b0",
        }}>
          Note: The full‑stack ShopHub app requires{" "}
          <code style={{
            background: "rgba(0, 212, 255, 0.1)",
            padding: "0.2rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.85em",
          }}>
            pnpm run dev
          </code>{" "}
          in this monorepo to start both the API (port&nbsp;4000) and React frontend (port&nbsp;5173).
        </p>
      </main>
    </div>
  );
}


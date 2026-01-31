import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initDb } from "./db/init.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/orders.js";
import contactRouter from "./routes/contact.js";
import salonRouter from "./routes/salon.js";
import homecareRouter from "./routes/homecare.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Security headers
app.use(helmet());

// Rate limiting - 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later" }
});
app.use(limiter);

// Get allowed origins from environment, or use defaults for development
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/salon", salonRouter);
app.use("/api/homecare", homecareRouter);

// Generic error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Optionally serve a built frontend in production (placeholder)
app.use(express.static(path.join(__dirname, "public")));

async function start() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`ShopHub API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();



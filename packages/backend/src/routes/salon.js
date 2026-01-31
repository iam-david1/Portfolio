import express from "express";
import { body, validationResult } from "express-validator";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "db", "shophub.db");

function getDb() {
  return new sqlite3.Database(dbPath);
}

// =============================================
// SERVICES
// =============================================

// Get all salon services
router.get("/services", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM salon_services ORDER BY id", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single service
router.get("/services/:id", (req, res) => {
  const db = getDb();
  db.get("SELECT * FROM salon_services WHERE id = ?", [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Service not found" });
    res.json(row);
  });
});

// =============================================
// TEAM
// =============================================

// Get all team members
router.get("/team", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM salon_team ORDER BY id", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    // Parse specialties into array
    const team = rows.map(member => ({
      ...member,
      specialties: member.specialties ? member.specialties.split(",") : []
    }));
    res.json(team);
  });
});

// Get single team member
router.get("/team/:id", (req, res) => {
  const db = getDb();
  db.get("SELECT * FROM salon_team WHERE id = ?", [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Team member not found" });
    res.json({
      ...row,
      specialties: row.specialties ? row.specialties.split(",") : []
    });
  });
});

// =============================================
// GALLERY
// =============================================

// Get all gallery items
router.get("/gallery", (req, res) => {
  const db = getDb();
  const { category } = req.query;
  let sql = "SELECT * FROM salon_gallery";
  const params = [];

  if (category) {
    sql += " WHERE category = ?";
    params.push(category);
  }

  sql += " ORDER BY id";

  db.all(sql, params, (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// =============================================
// REVIEWS
// =============================================

// Get all reviews
router.get("/reviews", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM salon_reviews ORDER BY created_at DESC", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Submit a review
router.post(
  "/reviews",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be under 100 characters"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment").optional().trim().isLength({ max: 1000 }).withMessage("Comment must be under 1000 characters"),
    body("image").optional().trim().isURL().withMessage("Image must be a valid URL"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, rating, comment, image } = req.body;
    const db = getDb();
    const sql = "INSERT INTO salon_reviews (name, rating, comment, image) VALUES (?, ?, ?, ?)";

    db.run(sql, [name, rating, comment || null, image || null], function(err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: "Review submitted successfully" });
    });
  }
);

// =============================================
// BOOKINGS
// =============================================

// Create a booking
router.post(
  "/bookings",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be under 100 characters"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone is required").matches(/^[0-9+\-\s()]+$/).withMessage("Invalid phone format"),
    body("service_id").optional().isInt().withMessage("Service ID must be a number"),
    body("stylist_id").optional().isInt().withMessage("Stylist ID must be a number"),
    body("date").trim().notEmpty().withMessage("Date is required").isDate().withMessage("Invalid date format"),
    body("time").trim().notEmpty().withMessage("Time is required").matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Time must be in HH:MM format"),
    body("notes").optional().trim().isLength({ max: 500 }).withMessage("Notes must be under 500 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service_id, stylist_id, date, time, notes } = req.body;
    const db = getDb();
    const sql = `
      INSERT INTO salon_bookings (name, email, phone, service_id, stylist_id, date, time, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [name, email, phone, service_id || null, stylist_id || null, date, time, notes || null], function(err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        message: "Booking created successfully! We will contact you shortly to confirm."
      });
    });
  }
);

// Get booking by ID (for confirmation)
router.get("/bookings/:id", (req, res) => {
  const db = getDb();
  const sql = `
    SELECT b.*, s.name as service_name, t.name as stylist_name
    FROM salon_bookings b
    LEFT JOIN salon_services s ON b.service_id = s.id
    LEFT JOIN salon_team t ON b.stylist_id = t.id
    WHERE b.id = ?
  `;

  db.get(sql, [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Booking not found" });
    res.json(row);
  });
});

// =============================================
// STATS (for homepage counters)
// =============================================

router.get("/stats", (req, res) => {
  const db = getDb();
  const stats = {};

  db.get("SELECT COUNT(*) as count FROM salon_services", [], (err, row) => {
    if (err) { db.close(); return res.status(500).json({ error: err.message }); }
    stats.services = row.count;

    db.get("SELECT COUNT(*) as count FROM salon_team", [], (err, row) => {
      if (err) { db.close(); return res.status(500).json({ error: err.message }); }
      stats.stylists = row.count;

      db.get("SELECT COUNT(*) as count FROM salon_reviews", [], (err, row) => {
        if (err) { db.close(); return res.status(500).json({ error: err.message }); }
        stats.reviews = row.count;

        db.get("SELECT AVG(rating) as avg FROM salon_reviews", [], (err, row) => {
          db.close();
          if (err) return res.status(500).json({ error: err.message });
          stats.averageRating = row.avg ? parseFloat(row.avg.toFixed(1)) : 5.0;
          stats.happyClients = 2500; // Static number for demo
          stats.yearsExperience = 15;
          res.json(stats);
        });
      });
    });
  });
});

export default router;

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

// Get all homecare services
router.get("/services", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM homecare_services ORDER BY id", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    // Parse features into array
    const services = rows.map(service => ({
      ...service,
      features: service.features ? service.features.split(",") : []
    }));
    res.json(services);
  });
});

// Get single service
router.get("/services/:id", (req, res) => {
  const db = getDb();
  db.get("SELECT * FROM homecare_services WHERE id = ?", [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Service not found" });
    res.json({
      ...row,
      features: row.features ? row.features.split(",") : []
    });
  });
});

// =============================================
// CAREGIVERS
// =============================================

// Get all caregivers
router.get("/caregivers", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM homecare_caregivers ORDER BY rating DESC, experience_years DESC", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    // Parse certifications into array
    const caregivers = rows.map(cg => ({
      ...cg,
      certifications: cg.certifications ? cg.certifications.split(",") : []
    }));
    res.json(caregivers);
  });
});

// Get single caregiver
router.get("/caregivers/:id", (req, res) => {
  const db = getDb();
  db.get("SELECT * FROM homecare_caregivers WHERE id = ?", [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Caregiver not found" });
    res.json({
      ...row,
      certifications: row.certifications ? row.certifications.split(",") : []
    });
  });
});

// =============================================
// TESTIMONIALS
// =============================================

// Get all testimonials
router.get("/testimonials", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM homecare_testimonials ORDER BY created_at DESC", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Submit a testimonial
router.post(
  "/testimonials",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be under 100 characters"),
    body("relation").optional().trim().isLength({ max: 100 }).withMessage("Relation must be under 100 characters"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment").trim().notEmpty().withMessage("Comment is required").isLength({ max: 1000 }).withMessage("Comment must be under 1000 characters"),
    body("image").optional().trim().isURL().withMessage("Image must be a valid URL"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, relation, rating, comment, image } = req.body;
    const db = getDb();
    const sql = "INSERT INTO homecare_testimonials (name, relation, rating, comment, image) VALUES (?, ?, ?, ?, ?)";

    db.run(sql, [name, relation || null, rating, comment, image || null], function(err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: "Testimonial submitted successfully" });
    });
  }
);

// =============================================
// CONSULTATIONS
// =============================================

// Request a consultation
router.post(
  "/consultations",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be under 100 characters"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone is required").matches(/^[0-9+\-\s()]+$/).withMessage("Invalid phone format"),
    body("service_id").optional().isInt().withMessage("Service ID must be a number"),
    body("message").optional().trim().isLength({ max: 1000 }).withMessage("Message must be under 1000 characters"),
    body("preferred_date").optional().trim().isDate().withMessage("Invalid date format"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, service_id, message, preferred_date } = req.body;
    const db = getDb();
    const sql = `
      INSERT INTO homecare_consultations (name, email, phone, service_id, message, preferred_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [name, email, phone, service_id || null, message || null, preferred_date || null], function(err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        message: "Consultation request received! Our care coordinator will contact you within 24 hours."
      });
    });
  }
);

// Get consultation by ID
router.get("/consultations/:id", (req, res) => {
  const db = getDb();
  const sql = `
    SELECT c.*, s.name as service_name
    FROM homecare_consultations c
    LEFT JOIN homecare_services s ON c.service_id = s.id
    WHERE c.id = ?
  `;

  db.get(sql, [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Consultation not found" });
    res.json(row);
  });
});

// =============================================
// STATS (for homepage counters)
// =============================================

router.get("/stats", (req, res) => {
  const db = getDb();
  const stats = {};

  db.get("SELECT COUNT(*) as count FROM homecare_services", [], (err, row) => {
    if (err) { db.close(); return res.status(500).json({ error: err.message }); }
    stats.services = row.count;

    db.get("SELECT COUNT(*) as count FROM homecare_caregivers", [], (err, row) => {
      if (err) { db.close(); return res.status(500).json({ error: err.message }); }
      stats.caregivers = row.count;

      db.get("SELECT COUNT(*) as count FROM homecare_testimonials", [], (err, row) => {
        if (err) { db.close(); return res.status(500).json({ error: err.message }); }
        stats.testimonials = row.count;

        db.get("SELECT AVG(rating) as avg FROM homecare_testimonials", [], (err, row) => {
          db.close();
          if (err) return res.status(500).json({ error: err.message });
          stats.averageRating = row.avg ? parseFloat(row.avg.toFixed(1)) : 5.0;
          // Add some impressive static numbers for the demo
          stats.familiesServed = 1500;
          stats.yearsExperience = 15;
          stats.available24_7 = true;
          stats.licensedInsured = true;
          res.json(stats);
        });
      });
    });
  });
});

// =============================================
// WHY CHOOSE US (static content for frontend)
// =============================================

router.get("/features", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Licensed & Insured",
      description: "Fully licensed, bonded, and insured for your complete peace of mind.",
      icon: "shield-check"
    },
    {
      id: 2,
      title: "24/7 Support",
      description: "Round-the-clock availability for emergencies and urgent care needs.",
      icon: "clock"
    },
    {
      id: 3,
      title: "HIPAA Compliant",
      description: "Your privacy and medical data are protected with strict compliance.",
      icon: "lock"
    },
    {
      id: 4,
      title: "Customized Care Plans",
      description: "Tailored services designed to meet your unique individual needs.",
      icon: "clipboard"
    },
    {
      id: 5,
      title: "Background Checked",
      description: "All caregivers undergo thorough background checks and verification.",
      icon: "user-check"
    },
    {
      id: 6,
      title: "Flexible Scheduling",
      description: "From a few hours to 24/7 care, we adapt to your schedule.",
      icon: "calendar"
    }
  ]);
});

export default router;

import { Router } from "express";
import { body, validationResult } from "express-validator";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/shophub.db");

function getDb() {
  sqlite3.verbose();
  return new sqlite3.Database(dbPath);
}

const router = Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be under 100 characters"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 2000 }).withMessage("Message must be under 2000 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;
    const db = getDb();
    db.run(
      "INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
      [name, email, message, new Date().toISOString()],
      function (err) {
        db.close();
        if (err) return next(err);
        res.status(201).json({ id: this.lastID });
      }
    );
  }
);

export default router;



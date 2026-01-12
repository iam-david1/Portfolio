import { Router } from "express";
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

router.post("/", (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }

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
});

export default router;



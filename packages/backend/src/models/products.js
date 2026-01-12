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

export function getAllProducts() {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM products", (err, rows) => {
      db.close();
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export function getProductById(id) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      db.close();
      if (err) return reject(err);
      resolve(row);
    });
  });
}



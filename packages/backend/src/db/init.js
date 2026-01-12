import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "shophub.db");
const schemaPath = path.join(__dirname, "schema.sql");

function getDb() {
  sqlite3.verbose();
  return new sqlite3.Database(dbPath);
}

function runMigrations(db) {
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  return new Promise((resolve, reject) => {
    db.exec(schemaSql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function seedProducts(db) {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 5,
      name: "Wireless Mouse",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 6,
      name: "USB-C Hub",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 7,
      name: "LED Monitor",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: 8,
      name: "Webcam HD",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    },
  ];

  const placeholders = products
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
    .join(", ");

  const sql = `
    INSERT OR IGNORE INTO products
      (id, name, price, image, description, stock, created_at, updated_at)
    VALUES ${placeholders}
  `;

  const now = new Date().toISOString();
  const params = [];
  for (const p of products) {
    params.push(
      p.id,
      p.name,
      p.price,
      p.image,
      null,
      100,
      now,
      now
    );
  }

  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export async function initDb() {
  const db = getDb();
  try {
    await runMigrations(db);
    await seedProducts(db);
    console.log("Database initialized and products seeded.");
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  } finally {
    db.close();
  }
}

// Allow running as a script: `node src/db/init.js`
if (import.meta.url === `file://${process.argv[1]}`) {
  initDb().catch(() => process.exit(1));
}



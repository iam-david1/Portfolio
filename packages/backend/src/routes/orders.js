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

// Create order from cart
router.post("/", (req, res, next) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  const db = getDb();

  const cartSql = `
    SELECT ci.id as cart_item_id,
           ci.quantity,
           p.id as product_id,
           p.price
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.id
    JOIN products p ON p.id = ci.product_id
    WHERE c.session_id = ?
  `;

  db.all(cartSql, [sessionId], (err, items) => {
    if (err) {
      db.close();
      return next(err);
    }

    if (!items || items.length === 0) {
      db.close();
      return res.status(400).json({ error: "Cart is empty" });
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    db.serialize(() => {
      db.run(
        "INSERT INTO orders (session_id, total, status, created_at) VALUES (?, ?, ?, ?)",
        [sessionId, total, "completed", new Date().toISOString()],
        function (orderErr) {
          if (orderErr) {
            db.close();
            return next(orderErr);
          }

          const orderId = this.lastID;
          const stmt = db.prepare(
            "INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES (?, ?, ?, ?, ?)"
          );

          for (const item of items) {
            stmt.run(
              orderId,
              item.product_id,
              item.quantity,
              item.price,
              new Date().toISOString()
            );
          }

          stmt.finalize((finalizeErr) => {
            if (finalizeErr) {
              db.close();
              return next(finalizeErr);
            }

            const placeholders = items.map(() => "?").join(",");
            const ids = items.map((i) => i.cart_item_id);

            db.run(
              `DELETE FROM cart_items WHERE id IN (${placeholders})`,
              ids,
              (deleteErr) => {
                db.close();
                if (deleteErr) return next(deleteErr);
                res.status(201).json({ orderId, total });
              }
            );
          });
        }
      );
    });
  });
});

// Get order details
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const db = getDb();

  db.get("SELECT * FROM orders WHERE id = ?", [id], (err, order) => {
    if (err) {
      db.close();
      return next(err);
    }
    if (!order) {
      db.close();
      return res.status(404).json({ error: "Order not found" });
    }

    db.all(
      `
        SELECT oi.*, p.name, p.image
        FROM order_items oi
        JOIN products p ON p.id = oi.product_id
        WHERE oi.order_id = ?
      `,
      [id],
      (itemsErr, items) => {
        db.close();
        if (itemsErr) return next(itemsErr);
        res.json({ order, items });
      }
    );
  });
});

export default router;



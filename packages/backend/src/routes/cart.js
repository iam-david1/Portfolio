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

// Create a new cart for a session
router.post(
  "/",
  [
    body("sessionId").trim().notEmpty().withMessage("sessionId is required").isLength({ max: 100 }).withMessage("sessionId must be under 100 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sessionId } = req.body;
    const db = getDb();
    const now = new Date().toISOString();

    db.run(
      `
        INSERT INTO carts (session_id, created_at, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(session_id) DO UPDATE SET updated_at = excluded.updated_at
      `,
      [sessionId, now, now],
      function (err) {
        db.close();
        if (err) return next(err);
        res.status(201).json({ sessionId });
      }
    );
  }
);

// Get cart items for a session
router.get("/:sessionId", (req, res, next) => {
  const { sessionId } = req.params;
  const db = getDb();

  const sql = `
    SELECT ci.id as cart_item_id,
           ci.quantity,
           p.*
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.id
    JOIN products p ON p.id = ci.product_id
    WHERE c.session_id = ?
  `;

  db.all(sql, [sessionId], (err, rows) => {
    db.close();
    if (err) return next(err);
    res.json(rows);
  });
});

// Add item to cart
router.post(
  "/:sessionId/items",
  [
    body("productId").isInt({ min: 1 }).withMessage("productId must be a positive integer"),
    body("quantity").optional().isInt({ min: 1, max: 100 }).withMessage("quantity must be between 1 and 100"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sessionId } = req.params;
    const { productId, quantity = 1 } = req.body;
    const db = getDb();

  db.serialize(() => {
    db.get("SELECT id FROM carts WHERE session_id = ?", [sessionId], (err, cart) => {
      if (err) {
        db.close();
        return next(err);
      }

      const ensureCart = (cb) => {
        if (cart) return cb(cart.id);

        const now = new Date().toISOString();
        db.run(
          "INSERT INTO carts (session_id, created_at, updated_at) VALUES (?, ?, ?)",
          [sessionId, now, now],
          function (insertErr) {
            if (insertErr) {
              db.close();
              return next(insertErr);
            }
            cb(this.lastID);
          }
        );
      };

      ensureCart((cartId) => {
        db.get(
          "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
          [cartId, productId],
          (findErr, item) => {
            if (findErr) {
              db.close();
              return next(findErr);
            }

            const now = new Date().toISOString();

            if (item) {
              db.run(
                "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
                [quantity, item.id],
                function (updateErr) {
                  db.close();
                  if (updateErr) return next(updateErr);
                  res.status(200).json({ cartItemId: item.id });
                }
              );
            } else {
              db.run(
                "INSERT INTO cart_items (cart_id, product_id, quantity, created_at) VALUES (?, ?, ?, ?)",
                [cartId, productId, quantity, now],
                function (insertItemErr) {
                  db.close();
                  if (insertItemErr) return next(insertItemErr);
                  res.status(201).json({ cartItemId: this.lastID });
                }
              );
            }
          }
        );
      });
    });
  });
  }
);

// Update cart item quantity
router.put(
  "/:sessionId/items/:itemId",
  [
    body("quantity").isInt().withMessage("quantity must be a number"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { itemId } = req.params;
    const { quantity } = req.body;
    const db = getDb();

    if (quantity <= 0) {
      db.run("DELETE FROM cart_items WHERE id = ?", [itemId], function (err) {
        db.close();
        if (err) return next(err);
        return res.status(204).send();
      });
    } else {
      db.run(
        "UPDATE cart_items SET quantity = ? WHERE id = ?",
        [quantity, itemId],
        function (err) {
          db.close();
          if (err) return next(err);
          res.status(200).json({ cartItemId: itemId, quantity });
        }
      );
    }
  }
);

// Remove item from cart
router.delete("/:sessionId/items/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  const db = getDb();

  db.run("DELETE FROM cart_items WHERE id = ?", [itemId], function (err) {
    db.close();
    if (err) return next(err);
    res.status(204).send();
  });
});

export default router;



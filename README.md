## ShopHub Monorepo – Full-Stack E‑Commerce Demo

ShopHub is a **student portfolio project** that turns a static e‑commerce landing page into a **full‑stack application** with:

- **Backend**: Node.js + Express + SQLite
- **Frontend**: React + Vite + Vanilla CSS (no Tailwind)
- **Monorepo**: Managed with pnpm workspaces

The goal is to demonstrate a realistic e‑commerce architecture: products stored in a database, an API layer, and a reactive UI with cart and checkout behavior.

---

## Tech Stack

- **Runtime & Package Manager**
  - Node.js (LTS recommended)
  - pnpm workspaces

- **Backend (`@shophub/backend`)**
  - Express (REST API)
  - SQLite (file‑based relational database)
  - `sqlite3` Node driver
  - `cors`, `dotenv`

- **Frontend (`@shophub/frontend`)**
  - React 18 (functional components + hooks)
  - Vite (dev server & build tool)
  - Vanilla CSS (custom design, responsive)

---

## Repository Structure

```text
monorepo/
  package.json          # Root scripts and workspace config
  pnpm-workspace.yaml   # pnpm workspaces
  packages/
    backend/            # Node.js/Express API + SQLite
      src/
        db/             # schema + init/seed scripts
        models/         # DB query helpers
        routes/         # products, cart, orders, contact APIs
        server.js       # Express app & bootstrap
    frontend/           # React + Vite SPA
      src/
        components/     # UI components (Navbar, Products, Cart, etc.)
        api.js          # API client for the backend
        cartContext.js  # React context for cart state
        main.jsx, App.jsx
      index.html        # Vite entry HTML
```

---

## Features

- **Dynamic Products**
  - Products are stored in a **SQLite database** (no more hard‑coded arrays).
  - `GET /api/products` returns all products to the React frontend.

- **Shopping Cart**
  - Cart is **session‑based** and persisted in the database (`carts`, `cart_items` tables).
  - React frontend manages cart state with a **Cart Context**.
  - Add, update quantity, and remove items via API endpoints:
    - `POST /api/cart/:sessionId/items`
    - `PUT /api/cart/:sessionId/items/:itemId`
    - `DELETE /api/cart/:sessionId/items/:itemId`

- **Checkout Flow**
  - `POST /api/orders` creates an order from the current cart.
  - Order lines are stored in `orders` and `order_items`.
  - Frontend shows a confirmation message on successful checkout.

- **Contact Form**
  - React contact form submits to `POST /api/contact`.
  - Messages are stored in a `contact_messages` table in SQLite.

- **Modern UI**
  - Dark themed, responsive layout inspired by the original static site.
  - Components: Navbar, Hero, Products grid, Cart sidebar, About, Contact, Footer.

- **Monorepo Setup**
  - Backend and frontend share a single workspace, managed by pnpm.
  - Root scripts can start both servers with one command.

---

## How to Run the Project

### 1. Prerequisites

- **Node.js** (LTS version recommended)
- **pnpm** installed globally:

```bash
npm install -g pnpm
```

### 2. Install Dependencies

From the `monorepo` root:

```bash
cd /Users/omwenyekedavideseosa/cursor/monorepo
pnpm install
```

This installs dependencies for both `backend` and `frontend`.

### 3. Initialize the Database

Run the migration/seed script for the backend:

```bash
cd packages/backend
pnpm run migrate
```

This:

- Creates all SQLite tables (products, carts, orders, contact_messages, etc.).
- Seeds the **initial products** that were originally hard‑coded in the static page.

### 4. Start Backend and Frontend (Recommended)

From the `monorepo` root, you can start **both** servers with one command:

```bash
cd /Users/omwenyekedavideseosa/cursor/monorepo
pnpm run dev
```

This will:

- Start the **backend API** (`@shophub/backend`) on `http://localhost:4000`
- Start the **frontend app** (`@shophub/frontend`) via Vite (usually `http://localhost:5173`)

Then open the frontend URL in your browser and the app will talk to the backend API.

### 5. Run Backend or Frontend Separately (Optional)

From the root:

```bash
# Backend only
pnpm run dev:backend

# Frontend only
pnpm run dev:frontend
```

---

## API Overview

- `GET /api/health` – Health check
- `GET /api/products` – List all products
- `GET /api/products/:id` – Get a single product
- `POST /api/cart` – Ensure a cart exists for a given `sessionId`
- `GET /api/cart/:sessionId` – Get cart items for a session
- `POST /api/cart/:sessionId/items` – Add item to cart
- `PUT /api/cart/:sessionId/items/:itemId` – Update quantity
- `DELETE /api/cart/:sessionId/items/:itemId` – Remove item from cart
- `POST /api/orders` – Create order from cart (checkout)
- `GET /api/orders/:id` – Order details + items
- `POST /api/contact` – Store a contact form message

---

## Learning Highlights (for Portfolio)

This project demonstrates that you can:

- Design a simple **relational schema** for an e‑commerce domain.
- Build a **REST API** with Express, including error handling and JSON responses.
- Use **SQLite** with Node.js, including migrations and seed data.
- Build a **React SPA** consuming a real backend API (not just static data).
- Manage global state (cart) with **React context**.
- Organize code in a **pnpm monorepo**, separating backend and frontend into clean packages.

It is ideal to showcase as a **full‑stack portfolio piece**: clear architecture, realistic features, and modern tooling.



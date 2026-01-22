# Full-Stack Portfolio Monorepo

A production-ready collection of **three full-stack web applications** built with modern technologies. This monorepo demonstrates professional software engineering practices including API design, database management, state management, animations, and clean architecture.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![Tech Stack](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)
![Tech Stack](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=flat-square&logo=framer)
![Tech Stack](https://img.shields.io/badge/pnpm-Monorepo-F69220?style=flat-square&logo=pnpm)

---

## The Projects

### 1. ShopHub E-Commerce Platform
A complete e-commerce solution with product catalog, shopping cart, and checkout flow.
- Session-based cart persisted in database
- Real-time cart updates
- Order creation and management
- Contact form with database storage

### 2. Elite Salon Booking System
A premium salon website with appointment scheduling and service management.
- Dynamic service listings from API
- Team member profiles with specialties
- Image gallery with categories
- Booking system with date/time selection
- Customer reviews and ratings
- Animated UI with Framer Motion

### 3. CareComfort HomeCare Platform
A healthcare agency website for home care services.
- Service catalog with detailed features
- Caregiver profiles with certifications
- Consultation request system
- Client testimonials
- Trust badges and statistics
- Fully responsive design

---

## Why a Monorepo?

### Benefits of This Architecture

| Benefit | Description |
|---------|-------------|
| **Code Sharing** | Single backend serves all three applications, reducing duplication |
| **Consistent Tooling** | Same dev environment, linting, and build process across projects |
| **Atomic Changes** | Update shared code and all apps benefit immediately |
| **Simplified Dependencies** | One `node_modules`, efficient disk usage with pnpm |
| **Easy Deployment** | Deploy frontend and backend together or separately |
| **Portfolio Showcase** | One repo demonstrates multiple skill sets |

### Why pnpm?
- **3x faster** than npm for installs
- **Disk efficient** - uses hard links to save space
- **Strict** - prevents phantom dependencies
- **Native workspace support** - perfect for monorepos

---

## Tech Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **Vite** - Lightning-fast development server and build tool
- **React Router v6** - Client-side routing
- **Framer Motion** - Production-ready animations
- **CSS3** - Custom styling with CSS variables, no frameworks

### Backend
- **Node.js** - JavaScript runtime (ES Modules)
- **Express.js** - Fast, unopinionated web framework
- **SQLite3** - Embedded relational database
- **CORS** - Cross-origin resource sharing

### DevOps
- **pnpm Workspaces** - Monorepo management
- **Concurrently** - Run multiple commands in parallel
- **dotenv** - Environment variable management

---

## Project Structure

```
monorepo/
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # pnpm workspace definition
├── README.md                 # This file
│
└── packages/
    ├── backend/              # Express.js API Server
    │   ├── package.json
    │   └── src/
    │       ├── server.js     # Express app entry point
    │       ├── db/
    │       │   ├── schema.sql    # Database tables
    │       │   ├── init.js       # Migrations & seeding
    │       │   └── shophub.db    # SQLite database file
    │       ├── models/           # Data access layer
    │       └── routes/
    │           ├── products.js   # E-commerce products
    │           ├── cart.js       # Shopping cart
    │           ├── orders.js     # Order management
    │           ├── contact.js    # Contact forms
    │           ├── salon.js      # Salon services, team, bookings
    │           └── homecare.js   # Homecare services, caregivers
    │
    └── frontend/             # React Single Page Application
        ├── package.json
        ├── vite.config.js
        ├── index.html
        └── src/
            ├── main.jsx          # React entry point
            ├── App.jsx           # Router configuration
            ├── api.js            # API client (fetch wrapper)
            ├── styles.css        # Global styles
            ├── cartContext.js    # Shopping cart state
            ├── pages/
            │   ├── HomePage.jsx      # Landing page
            │   ├── ShopHubPage.jsx   # E-commerce app
            │   ├── SalonPage.jsx     # Salon booking app
            │   ├── SalonPage.css
            │   ├── HomeCarePage.jsx  # Homecare app
            │   └── HomeCarePage.css
            └── components/       # Reusable UI components
                ├── Navbar.jsx
                ├── Hero.jsx
                ├── ProductCard.jsx
                ├── CartSidebar.jsx
                └── ...
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** (install with `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd monorepo

# Install all dependencies
pnpm install

# Initialize the database with tables and seed data
pnpm run migrate

# Start development servers (frontend + backend)
pnpm run dev
```

### Development URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React application |
| Backend API | http://localhost:4000 | Express REST API |
| API Health | http://localhost:4000/api/health | Server status check |

---

## API Documentation

### E-Commerce Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | Get single product |
| `GET` | `/api/cart/:sessionId` | Get cart items |
| `POST` | `/api/cart/:sessionId/items` | Add item to cart |
| `PUT` | `/api/cart/:sessionId/items/:id` | Update quantity |
| `DELETE` | `/api/cart/:sessionId/items/:id` | Remove item |
| `POST` | `/api/orders` | Create order (checkout) |
| `GET` | `/api/orders/:id` | Get order details |
| `POST` | `/api/contact` | Submit contact message |

### Salon Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/salon/services` | List all services |
| `GET` | `/api/salon/team` | List team members |
| `GET` | `/api/salon/gallery` | Get gallery images |
| `GET` | `/api/salon/reviews` | Get customer reviews |
| `GET` | `/api/salon/stats` | Get salon statistics |
| `POST` | `/api/salon/bookings` | Create appointment |
| `POST` | `/api/salon/reviews` | Submit a review |

### HomeCare Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/homecare/services` | List care services |
| `GET` | `/api/homecare/caregivers` | List caregivers |
| `GET` | `/api/homecare/testimonials` | Get testimonials |
| `GET` | `/api/homecare/stats` | Get statistics |
| `GET` | `/api/homecare/features` | Get feature list |
| `POST` | `/api/homecare/consultations` | Request consultation |

---

## Database Schema

### Core Tables
- `products` - E-commerce product catalog
- `users` - User accounts (extensible)
- `carts` / `cart_items` - Shopping cart management
- `orders` / `order_items` - Order history
- `contact_messages` - Contact form submissions

### Salon Tables
- `salon_services` - Service offerings with prices
- `salon_team` - Staff profiles and specialties
- `salon_gallery` - Portfolio images
- `salon_bookings` - Appointments
- `salon_reviews` - Customer feedback

### HomeCare Tables
- `homecare_services` - Care services
- `homecare_caregivers` - Staff with certifications
- `homecare_consultations` - Care requests
- `homecare_testimonials` - Family testimonials

---

## Features Demonstrated

### Frontend Skills
- Modern React patterns (hooks, context, functional components)
- Client-side routing with React Router
- Smooth animations with Framer Motion
- Loading states and error handling
- Responsive design without CSS frameworks
- Form handling and validation
- Session management with localStorage

### Backend Skills
- RESTful API design
- Database schema design
- SQL queries and data modeling
- CORS configuration
- Error handling middleware
- Environment variable management
- ES Modules in Node.js

### Architecture Skills
- Monorepo management
- Separation of concerns
- API client abstraction
- Reusable component design
- Clean code organization

---

## Scripts Reference

```bash
# Development
pnpm run dev          # Start both frontend and backend
pnpm run dev:frontend # Start only React dev server
pnpm run dev:backend  # Start only Express server

# Database
pnpm run migrate      # Initialize/reset database with seed data

# Production
pnpm run build        # Build frontend for production
pnpm run start        # Start backend in production mode
pnpm run preview      # Preview production build
```

---

## Deployment

### Frontend (Vercel/Netlify)
```bash
# Build the frontend
cd packages/frontend
pnpm run build
# Deploy the dist/ folder
```

Set environment variable:
```
VITE_API_BASE=https://your-backend-url.com/api
```

### Backend (Railway/Render/Fly.io)
```bash
# The backend is ready for deployment
# Set PORT environment variable (default: 4000)
```

---

## What This Project Demonstrates

This portfolio showcases the ability to:

1. **Design and implement a full-stack application** from database to UI
2. **Build reusable, maintainable code** with clean architecture
3. **Handle state management** across complex UIs
4. **Create smooth, professional animations** that enhance UX
5. **Work with databases** including schema design and queries
6. **Build REST APIs** following best practices
7. **Manage a monorepo** with multiple packages
8. **Write production-ready code** with proper error handling

---

## License

MIT License - feel free to use this project for learning or as a template.

---

## Connect

Built as a portfolio project demonstrating full-stack development skills with React, Node.js, and modern web technologies.

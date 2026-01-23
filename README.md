# Full-Stack Portfolio Monorepo

A production-ready collection of **three full-stack web applications** built with modern technologies. This monorepo demonstrates professional software engineering practices including API design, database management, state management, advanced animations, and clean architecture.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Tech Stack](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![Tech Stack](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=for-the-badge&logo=framer)
![Tech Stack](https://img.shields.io/badge/pnpm-Monorepo-F69220?style=for-the-badge&logo=pnpm)
![Tech Stack](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite)

---

## Table of Contents

- [Overview](#overview)
- [The Projects](#the-projects)
  - [ShopHub E-Commerce Platform](#1-shophub-e-commerce-platform)
  - [Elite Salon Booking System](#2-elite-salon-booking-system)
  - [CareComfort HomeCare Platform](#3-carecomfort-homecare-platform)
- [Why a Monorepo?](#why-a-monorepo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Features Demonstrated](#features-demonstrated)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

This monorepo contains three complete, production-ready web applications that share a common backend API. Each application demonstrates different aspects of modern web development:

| Application | Focus Area | Key Features |
|-------------|------------|--------------|
| **ShopHub** | E-Commerce | Cart management, checkout, dynamic UI |
| **Elite Salon** | Service Booking | Appointment scheduling, team profiles |
| **CareComfort** | Healthcare | Consultation requests, caregiver profiles |

All three applications feature:
- Fully responsive design (mobile-first)
- Smooth animations and micro-interactions
- Real-time data from REST API
- Form validation and error handling
- Loading states and skeleton screens
- Accessible UI components

---

## The Projects

### 1. ShopHub E-Commerce Platform

A premium e-commerce platform with a stunning, dynamic user interface featuring advanced animations and visual effects.

#### Features

- **Dynamic Hero Section**
  - Floating particle animations
  - Animated glowing orbs background
  - Parallax scroll effects
  - Animated gradient text
  - Scroll indicator animation

- **Product Catalog**
  - Grid layout with responsive cards
  - Image zoom on hover
  - Animated price display
  - Skeleton loading states
  - Product descriptions

- **Shopping Cart**
  - Slide-in cart sidebar with backdrop blur
  - Real-time quantity updates
  - Animated item removal
  - Session-based persistence
  - Checkout flow

- **Interactive Elements**
  - "Added to cart" feedback animation
  - Hover effects on all interactive elements
  - Smooth page transitions
  - Notification toasts

#### Product Images
The store features premium tech products with high-quality Unsplash images:
- Wireless Headphones
- Mechanical Keyboard
- Laptop Stand
- 4K Monitor
- Wireless Mouse
- USB-C Hub
- Smart Watch
- HD Webcam

---

### 2. Elite Salon Booking System

A luxury salon website with appointment scheduling, team profiles, and portfolio gallery.

#### Features

- **Hero Section**
  - Full-screen background with overlay
  - Compact animated statistics bar
  - Call-to-action buttons

- **Services Catalog**
  - Service cards with images
  - Pricing and duration display
  - Category badges
  - Hover animations

- **Team Profiles**
  - Staff photos and bios
  - Specialty tags
  - Years of experience
  - Hover reveal effects

- **Image Gallery**
  - Portfolio grid layout
  - Hover overlay with titles
  - Category filtering
  - Lightbox view

- **Booking System**
  - Service selection dropdown
  - Stylist preference
  - Date and time picker
  - Special requests textarea
  - Form validation
  - Success/error feedback

- **Customer Reviews**
  - Star ratings
  - Customer photos
  - Review comments
  - Animated cards

---

### 3. CareComfort HomeCare Platform

A professional healthcare agency website for home care services with consultation requests.

#### Features

- **Hero Section**
  - Trust badges (Licensed, 24/7 Support, HIPAA)
  - Compact statistics display
  - Gradient text effects

- **Services Catalog**
  - Personal care, medical care, companionship
  - Feature tags for each service
  - Expandable feature lists
  - Service icons

- **Caregiver Profiles**
  - Professional photos
  - Certifications and badges
  - Star ratings
  - Experience years
  - Detailed bios

- **Why Choose Us Section**
  - Feature cards with icons
  - Animated hover effects
  - Trust-building content

- **Consultation Form**
  - Service type selection
  - Preferred date picker
  - Message textarea
  - Form validation
  - Submission feedback

- **Testimonials**
  - Family member reviews
  - Relationship tags
  - Star ratings

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

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks and functional components |
| **Vite** | Lightning-fast build tool and dev server |
| **React Router v6** | Client-side routing with nested routes |
| **Framer Motion** | Production-ready animations library |
| **CSS3** | Custom styling with CSS variables, no frameworks |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime (ES Modules) |
| **Express.js** | Fast, unopinionated web framework |
| **SQLite3** | Embedded relational database |
| **CORS** | Cross-origin resource sharing |

### DevOps & Tooling

| Technology | Purpose |
|------------|---------|
| **pnpm Workspaces** | Monorepo package management |
| **Concurrently** | Run multiple npm scripts in parallel |
| **dotenv** | Environment variable management |
| **ESLint** | Code linting and formatting |

---

## Project Structure

```
monorepo/
├── package.json                 # Root workspace configuration
├── pnpm-workspace.yaml          # pnpm workspace definition
├── README.md                    # This documentation file
│
├── examples/                    # Static example pages
│   └── ecommerce/               # Static e-commerce demo
│       ├── index.html
│       ├── script.js
│       └── style.css
│
└── packages/
    │
    ├── backend/                 # Express.js API Server
    │   ├── package.json
    │   └── src/
    │       ├── server.js        # Express app entry point
    │       │
    │       ├── db/
    │       │   ├── schema.sql   # Database table definitions
    │       │   ├── init.js      # Database migrations & seeding
    │       │   └── shophub.db   # SQLite database file
    │       │
    │       ├── models/          # Data access layer
    │       │   ├── Product.js
    │       │   ├── Cart.js
    │       │   ├── Order.js
    │       │   └── ...
    │       │
    │       └── routes/          # API route handlers
    │           ├── products.js  # E-commerce products CRUD
    │           ├── cart.js      # Shopping cart operations
    │           ├── orders.js    # Order management
    │           ├── contact.js   # Contact form submissions
    │           ├── salon.js     # Salon services, team, bookings
    │           └── homecare.js  # Homecare services, caregivers
    │
    └── frontend/                # React Single Page Application
        ├── package.json
        ├── vite.config.js       # Vite configuration
        ├── index.html           # HTML entry point
        │
        └── src/
            ├── main.jsx         # React entry point
            ├── App.jsx          # Router configuration
            ├── api.js           # API client (fetch wrapper)
            ├── styles.css       # Global styles for ShopHub
            ├── cartContext.js   # Shopping cart React context
            │
            └── pages/
                ├── HomePage.jsx      # Landing/navigation page
                │
                ├── ShopHubPage.jsx   # E-commerce application
                │   ├── FloatingParticles component
                │   ├── GlowingOrbs component
                │   ├── ProductCard component
                │   ├── CartSidebar component
                │   ├── HeroSection component
                │   └── ...
                │
                ├── SalonPage.jsx     # Salon booking application
                ├── SalonPage.css     # Salon-specific styles
                │
                ├── HomeCarePage.jsx  # Homecare application
                └── HomeCarePage.css  # Homecare-specific styles
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Node.js | 18.0 or higher | `node --version` |
| pnpm | 8.0 or higher | `pnpm --version` |
| Git | Any recent version | `git --version` |

#### Installing pnpm

If you don't have pnpm installed:

```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using Corepack (Node.js 16.10+)
corepack enable
corepack prepare pnpm@latest --activate
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/iam-david1/shophub-monorepo.git
cd shophub-monorepo

# 2. Install all dependencies
pnpm install

# 3. Initialize the database with tables and seed data
pnpm run migrate

# 4. Start development servers (frontend + backend)
pnpm run dev
```

### Development URLs

After running `pnpm run dev`, the following services will be available:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React application |
| **Backend API** | http://localhost:4000 | Express REST API |
| **API Health Check** | http://localhost:4000/api/health | Server status |

### Available Scripts

```bash
# Development
pnpm run dev              # Start both frontend and backend concurrently
pnpm run dev:frontend     # Start only React dev server (port 5173)
pnpm run dev:backend      # Start only Express server (port 4000)

# Database
pnpm run migrate          # Initialize/reset database with seed data

# Production Build
pnpm run build            # Build frontend for production
pnpm run start            # Start backend in production mode
pnpm run preview          # Preview production build locally
```

---

## API Documentation

### Base URL

```
Development: http://localhost:4000/api
Production:  https://your-domain.com/api
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

---

### E-Commerce Endpoints

#### Products

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/products` | List all products | - |
| `GET` | `/api/products/:id` | Get single product | - |

**Example Response:**
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "price": 199.99,
  "image": "https://images.unsplash.com/...",
  "description": "Premium wireless headphones with noise cancellation"
}
```

#### Shopping Cart

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/cart/:sessionId` | Get cart items | - |
| `POST` | `/api/cart/:sessionId/items` | Add item to cart | `{ productId, quantity }` |
| `PUT` | `/api/cart/:sessionId/items/:id` | Update quantity | `{ quantity }` |
| `DELETE` | `/api/cart/:sessionId/items/:id` | Remove item | - |

#### Orders

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/orders` | Create order (checkout) | `{ sessionId }` |
| `GET` | `/api/orders/:id` | Get order details | - |

#### Contact

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/contact` | Submit contact message | `{ name, email, message }` |

---

### Salon Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/salon/services` | List all salon services |
| `GET` | `/api/salon/team` | List team members with specialties |
| `GET` | `/api/salon/gallery` | Get gallery images with categories |
| `GET` | `/api/salon/reviews` | Get customer reviews with ratings |
| `GET` | `/api/salon/stats` | Get salon statistics |
| `POST` | `/api/salon/bookings` | Create appointment booking |
| `POST` | `/api/salon/reviews` | Submit a customer review |

**Booking Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "service_id": 1,
  "stylist_id": 2,
  "date": "2024-02-15",
  "time": "10:00 AM",
  "notes": "First time customer"
}
```

---

### HomeCare Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/homecare/services` | List care services with features |
| `GET` | `/api/homecare/caregivers` | List caregivers with certifications |
| `GET` | `/api/homecare/testimonials` | Get family testimonials |
| `GET` | `/api/homecare/stats` | Get agency statistics |
| `GET` | `/api/homecare/features` | Get "why choose us" features |
| `POST` | `/api/homecare/consultations` | Request a care consultation |

**Consultation Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(555) 987-6543",
  "service_id": 1,
  "message": "Looking for care for my elderly mother",
  "preferred_date": "2024-02-20"
}
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    products     │     │     carts       │     │     orders      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │     │ id              │
│ name            │     │ session_id      │     │ session_id      │
│ price           │     │ created_at      │     │ total           │
│ image           │     └────────┬────────┘     │ status          │
│ description     │              │              │ created_at      │
└────────┬────────┘              │              └────────┬────────┘
         │                       │                       │
         │              ┌────────▼────────┐     ┌────────▼────────┐
         │              │   cart_items    │     │   order_items   │
         │              ├─────────────────┤     ├─────────────────┤
         └──────────────► product_id      │     │ product_id      │
                        │ cart_id         │     │ order_id        │
                        │ quantity        │     │ quantity        │
                        └─────────────────┘     │ price           │
                                                └─────────────────┘
```

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `products` | E-commerce product catalog | name, price, image, description |
| `carts` | Shopping cart sessions | session_id, created_at |
| `cart_items` | Items in shopping carts | cart_id, product_id, quantity |
| `orders` | Completed orders | session_id, total, status |
| `order_items` | Items in orders | order_id, product_id, quantity, price |
| `contact_messages` | Contact form submissions | name, email, message |

### Salon Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `salon_services` | Service offerings | name, price, duration, category, image |
| `salon_team` | Staff profiles | name, role, specialties, experience_years |
| `salon_gallery` | Portfolio images | title, image, category |
| `salon_bookings` | Appointments | customer info, service_id, stylist_id, date, time |
| `salon_reviews` | Customer feedback | name, rating, comment, image |

### HomeCare Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `homecare_services` | Care services | name, description, features, icon |
| `homecare_caregivers` | Caregiver profiles | name, role, certifications, rating |
| `homecare_consultations` | Care requests | customer info, service_id, message |
| `homecare_testimonials` | Family testimonials | name, relation, rating, comment |
| `homecare_features` | Why choose us | title, description, icon |

---

## Features Demonstrated

### Frontend Development Skills

| Skill | Implementation |
|-------|----------------|
| **Modern React** | Functional components, hooks (useState, useEffect, useMemo, useContext) |
| **State Management** | React Context for cart state, local state for forms |
| **Routing** | React Router v6 with nested routes |
| **Animations** | Framer Motion for page transitions, hover effects, scroll animations |
| **Responsive Design** | Mobile-first CSS with media queries |
| **Loading States** | Skeleton screens, loading spinners |
| **Error Handling** | Try/catch blocks, error boundaries, user feedback |
| **Form Handling** | Controlled inputs, validation, submission states |
| **API Integration** | Fetch API with async/await, error handling |
| **Performance** | Lazy loading images, memoized components |

### Backend Development Skills

| Skill | Implementation |
|-------|----------------|
| **RESTful API Design** | Proper HTTP methods, status codes, response formats |
| **Database Design** | Normalized schema, foreign keys, indexes |
| **SQL Queries** | CRUD operations, JOINs, aggregations |
| **Middleware** | CORS, error handling, request parsing |
| **Environment Config** | dotenv for configuration management |
| **ES Modules** | Modern JavaScript import/export syntax |

### Architecture & DevOps Skills

| Skill | Implementation |
|-------|----------------|
| **Monorepo Management** | pnpm workspaces, shared dependencies |
| **Code Organization** | Separation of concerns, modular structure |
| **API Abstraction** | Centralized API client in frontend |
| **Reusable Components** | DRY principles, component composition |
| **Version Control** | Git workflow, meaningful commits |

---

## Configuration

### Environment Variables

Create a `.env` file in the backend package:

```bash
# packages/backend/.env

# Server Configuration
PORT=4000
NODE_ENV=development

# Database
DATABASE_PATH=./src/db/shophub.db

# CORS (comma-separated origins)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Create a `.env` file in the frontend package for production:

```bash
# packages/frontend/.env

# API Base URL
VITE_API_BASE=http://localhost:4000/api

# For production, change to your deployed backend URL
# VITE_API_BASE=https://your-backend.com/api
```

---

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd packages/frontend
   pnpm run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider

3. **Set environment variable:**
   ```
   VITE_API_BASE=https://your-backend-url.com/api
   ```

#### Vercel Configuration

Create `vercel.json` in `packages/frontend`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Backend Deployment (Railway/Render/Fly.io)

1. **Set environment variables:**
   ```
   PORT=4000
   NODE_ENV=production
   ```

2. **Start command:**
   ```bash
   node src/server.js
   ```

3. **Ensure the SQLite database is initialized** on first deploy

---

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find and kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

#### Database Not Found

```bash
# Reinitialize the database
pnpm run migrate
```

#### pnpm Install Fails

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules packages/*/node_modules
pnpm install
```

#### CORS Errors

Ensure your backend CORS configuration includes your frontend URL:

```javascript
// packages/backend/src/server.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.com']
}));
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

Built with passion as a portfolio project demonstrating full-stack development skills with React, Node.js, and modern web technologies.

**GitHub:** [@iam-david1](https://github.com/iam-david1)

---

## Acknowledgments

- [Unsplash](https://unsplash.com) for beautiful product images
- [Framer Motion](https://www.framer.com/motion/) for animation library
- [React](https://react.dev) for the UI framework
- [Express.js](https://expressjs.com) for the backend framework

# David Omwenyeke - Portfolio

A personal portfolio showcasing **three full-stack web applications** built with React, Node.js, and SQLite.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)

---

## Screenshots

### Home Page
![Home Page](screenshots/home.png)

### ShopHub E-Commerce
![ShopHub](screenshots/shophub.png)

### Elite Salon
![Salon](screenshots/salon.png)

### CareComfort HomeCare
![HomeCare](screenshots/homecare.png)


---

## Live Demo

🔗 **[View Live Demo](#)** *(Coming soon)*

---

## Projects

| Project | Description |
|---------|-------------|
| **ShopHub** | E-commerce store with product catalog, shopping cart, and checkout |
| **Elite Salon** | Salon booking platform with services, team profiles, and appointments |
| **CareComfort** | Healthcare agency site with caregiver profiles and consultation requests |

---

## Features

- Personal portfolio landing page with skills and social links
- Three complete web applications
- Responsive design (mobile-friendly)
- Smooth animations with Framer Motion
- Demo mode (works without backend) or full-stack mode with API

---

## Tech Stack

**Frontend:** React 18, Vite, React Router, Framer Motion, CSS3

**Backend:** Node.js, Express.js, SQLite3

**Tools:** pnpm, Git

---

## Running Locally

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Quick Start

```bash
# Clone the repo
git clone https://github.com/iam-david1/Portfolio.git
cd Portfolio

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

**Frontend:** http://localhost:5173
**Backend API:** http://localhost:4000

---

## Demo Mode vs Full-Stack Mode

| Mode | Description |
|------|-------------|
| **Demo Mode** (default) | Frontend uses mock data. Works without backend. Good for static hosting. |
| **Full-Stack Mode** | Frontend connects to Express API with SQLite database. Forms actually submit. |

The frontend is currently set to **Demo Mode** - all data is loaded from `mockData.js` and forms show demo messages.

---

## Project Structure

```
Portfolio/
├── packages/
│   ├── frontend/          # React app (Vite)
│   │   └── src/
│   │       ├── pages/     # ShopHub, Salon, HomeCare pages
│   │       ├── mockData.js # Demo data
│   │       └── api.js     # API client (for full-stack mode)
│   │
│   └── backend/           # Express API
│       └── src/
│           ├── server.js  # Express server
│           ├── routes/    # API endpoints
│           └── db/        # SQLite database
│
└── README.md
```

---

## Contact

**David Omwenyeke** - Full-Stack Developer

- GitHub: [@iam-david1](https://github.com/iam-david1)
- LinkedIn: [david-omwenyeke](https://www.linkedin.com/in/david-omwenyeke-4054b038a/)

---

## License

MIT License - feel free to use this as inspiration for your own portfolio.

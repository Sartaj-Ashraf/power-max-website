# PowerMax Solutions - Power Backup & Solar Solutions Website

A complete, production-ready website for a power backup and solar solutions company, built with Next.js 15, Express.js, and MongoDB.

## Features

### Customer-Facing Website
- **Home Page**: Animated hero carousel, product categories, USP section, featured products, testimonials preview, stats counter, and strong CTA
- **About Page**: Company story, timeline, mission/vision, brand partners, and commitments
- **Products Page**: Filterable product catalog with category tabs
- **Product Detail Page**: Full specifications, features, enquiry form, and WhatsApp integration
- **Testimonials Page**: Customer reviews with ratings
- **Contact Page**: Lead capture form, contact info, Google Maps, and WhatsApp click-to-chat
- **Responsive Design**: Mobile-first with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, structured URLs, semantic HTML
- **Fast Loading**: Static export, optimized assets, Gzip compression

### Admin Panel
- **Secure Login**: JWT-based authentication
- **Dashboard**: Stats overview with recent contacts and enquiries
- **Product Management**: Add, edit, delete products with full specifications
- **Testimonial Management**: Add, edit, delete customer reviews
- **Contact Submissions**: View and manage lead forms with status tracking
- **Product Enquiries**: View and manage product enquiries with status tracking
- **Settings**: Profile, security, notifications, and general settings

### Backend API
- **RESTful API** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for admin routes
- **Image Upload** support with Multer
- **Security**: Helmet, CORS, compression
- **Seed Script** for initial data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Uploads | Multer |
| Hosting | Docker + Docker Compose ready |

## Project Structure

```
power-backup-website/
├── frontend/                 # Next.js 15 App
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── page.tsx     # Home
│   │   │   ├── about/
│   │   │   ├── products/
│   │   │   ├── testimonials/
│   │   │   ├── contact/
│   │   │   └── admin/       # Admin panel
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Page sections
│   │   │   └── ui/          # Reusable UI
│   │   ├── lib/             # API client, utils, data
│   │   └── types/           # TypeScript interfaces
│   ├── public/              # Static assets
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                  # Express API
│   ├── config/              # DB config
│   ├── middleware/          # Auth, upload
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── scripts/             # Seed script
│   ├── uploads/             # Image uploads
│   ├── server.js            # Entry point
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- Docker (optional)

### 1. Clone & Install

```bash
cd power-backup-website

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Frontend (optional - for API URL)
cd ../frontend
# Create .env.local if using custom API URL:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

Default admin credentials:
- Email: `admin@powermax.com`
- Password: `admin123`

### 4. Run Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- Website: http://localhost:3000
- API: http://localhost:5000/api
- Admin: http://localhost:3000/admin/

### 5. Docker Deployment (Production)

```bash
# Build and run all services
docker-compose up --build -d

# Website: http://localhost:3000
# API: http://localhost:5000
# MongoDB: localhost:27017
```

## API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/categories` | Get categories |
| GET | `/api/testimonials` | List active testimonials |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/enquiries` | Submit product enquiry |
| POST | `/api/auth/login` | Admin login |

### Protected Endpoints (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/testimonials/all` | List all testimonials |
| POST | `/api/testimonials` | Create testimonial |
| PUT | `/api/testimonials/:id` | Update testimonial |
| DELETE | `/api/testimonials/:id` | Delete testimonial |
| GET | `/api/contact` | List contact submissions |
| PUT | `/api/contact/:id` | Update contact status |
| GET | `/api/enquiries` | List enquiries |
| PUT | `/api/enquiries/:id` | Update enquiry status |
| GET | `/api/dashboard/stats` | Dashboard statistics |

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/powermax_solutions
JWT_SECRET=your-super-secret-key
ADMIN_EMAIL=admin@powermax.com
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Customization Guide

### Changing Company Info
Edit `frontend/src/lib/data.ts` to update:
- Company name, phone, email, address
- Business hours
- Hero slides content
- USP features
- Stats
- Brand partners

### Adding Products
1. Log into admin panel at `/admin/`
2. Navigate to **Products**
3. Click **Add Product**
4. Fill in details and save

Or use the API directly with the seed script as reference.

### Changing Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: { ... },  // Main brand color
  accent: { ... },   // Accent colors
}
```

### SEO Configuration
Edit `frontend/src/app/layout.tsx` metadata object for global SEO. Each page has its own metadata export.

## Production Deployment

### Hostinger VPS Deployment
1. Upload project files to VPS
2. Install Docker and Docker Compose
3. Run `docker-compose up -d`
4. Configure Nginx reverse proxy
5. Set up SSL with Let's Encrypt
6. Update DNS records

### Environment for Production
```bash
# backend/.env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/powermax
JWT_SECRET=very-long-random-secret-key
FRONTEND_URL=https://yourdomain.com

# Build frontend for static export
npm run build
```

## License

MIT License - Free for personal and commercial use.

## Support

For issues or questions, contact the development team.

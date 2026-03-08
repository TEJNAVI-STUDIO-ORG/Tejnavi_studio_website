# Tejnavi Studio | Premium Digital Craftsmanship

A cutting-edge, ultra-premium digital product agency website and full-stack Content Management System. Built with a focus on world-class aesthetics, fluid animations, and robust backend architecture.

## 🚀 Tech Stack

This project has been completely migrated to a modern, scalable full-stack architecture:

- **Framework:** Next.js 14 (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, custom utility classes, CSS Variables
- **Animations:** Framer Motion, Lenis (Smooth Scrolling)
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5 (Auth.js) / Credentials Provider
- **Forms & Validation:** React Hook Form, Zod
- **Email:** Nodemailer (SMTP Integration)
- **Icons:** Lucide React

## ✨ Key Features & Accomplishments

### 1. Premium Frontend (Marketing Site)
- **Stunning UI/UX:** Dark-mode primary theme featuring brushed metal (`bg-brushedAnthracite`), liquid silver (`text-liquidSilver`), and matte carbon (`bg-matteCarbon`) aesthetics.
- **Fluid Animations:** Integrated Lenis for global smooth scrolling (desktop) and Framer Motion for scroll-linked entrance animations, magnetic buttons, and 3D tilts.
- **Dynamic Content:** Projects, Blog posts, and Testimonials are fully driven by the PostgreSQL database.
- **Quote Estimator:** Interactive, multi-step project cost calculator with dynamic pricing logic and lead capture.
- **Contact & Newsletter:** Fully functional forms that insert leads into the database and trigger automated SMTP email notifications.

### 2. Full-Stack Admin Dashboard (`/admin`)
- **Secure Authentication:** Protected routes using NextAuth session middleware. Users cannot access `/admin/*` without logging in.
- **Role-Based Access Control (RBAC):** Implementation of Superadmin, Admin, and Editor roles to strictly manage permissions (e.g., only Superadmins can add new team members).
- **Custom CMS:** 
  - **Projects:** Full CRUD interface to manage portfolio items, track live URLs/GitHub repos, upload cover images, and toggle "Featured" or "Published" status.
  - **Blog:** Markdown-supported blog editor with category tagging, read-time tracking, SEO meta fields, and image uploads.
  - **Testimonials:** Manage client reviews and dynamic 5-star rating generation.
  - **Contacts & Quotes:** View and track all inbound leads from the frontend forms.
  - **Newsletter Subscribers:** View all active email subscribers.
- **Bulletproof Modals:** Custom Tailwind UI implementation for flawless internal scroll management within all creation/editing forms.

## 🛠 Getting Started (Local Development)

### 1. Prerequisites
- Node.js (v18+)
- A PostgreSQL database (Neon.tech is recommended)
- An SMTP server/email provider (like Gmail App Passwords or Resend) for sending emails.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URL="postgres://user:password@endpoint.neon.tech/tejnavi?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-32-character-string" # Run `openssl rand -base64 32` to generate

# Email / SMTP Settings
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="your-email@gmail.com"
```

### 4. Database Setup
Push the Prisma schema to your database and generate the Prisma Client:
```bash
npx prisma generate
npx prisma db push
```

### 5. Seed the Superadmin User
To access the admin panel, you must create an initial Superadmin account. Run the master seed script:
```bash
npx tsx scripts/seed.ts
```
Login credentials created by the script:
- **Email:** root@tejnavistudio.com
- **Password:** tejnavidev2026

### 6. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` for the frontend and `http://localhost:3000/admin` for the dashboard!

## 📂 Project Structure

- `src/app/` - Next.js App Router. Contains all frontend (`/`) and admin (`/admin`) routes.
- `src/components/` - Shared UI components (Layout, UI primitives, Admin specific components).
- `src/lib/` - Utility functions, Prisma database client instantiation, email dispatcher.
- `prisma/` - Database schema definition (`schema.prisma`) and seeder scripts.
- `public/` - Static assets, images, and brand icons.

## 🔒 Security Notes
- API Routes (`/api/admin/*`) strictly verify sessions before processing mutations (POST, PUT, DELETE).
- Plaintext passwords are NEVER saved; all user passwords use `bcryptjs` hashing.
- Smooth scrolling logic is intentionally disabled globally inside `/admin` to allow for native, uninterrupted data interactions and modal overlays.

---
© 2026 Tejnavi Studio. Developed by Tejnavi Studio.

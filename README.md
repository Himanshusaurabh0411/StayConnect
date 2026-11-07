# StayConnect 🇮🇳

> **"Find your stay. Find your people. No mandatory brokerage."**

StayConnect is India's nationwide accommodation and roommate discovery platform, engineered from the ground up to connect property owners directly with college/university students, working professionals, bachelors, migrating families, and flatmates — without broker exploitation or hidden costs.

---

## 🌟 Core Value Propositions

- **🚫 Zero Mandatory Brokerage**: Direct communication channels between verified property owners and prospective tenants without paywalls on owner contact information.
- **🛡️ 4-Tier Verification Pipeline**:
  - `Level 1`: Phone number OTP verification.
  - `Level 2`: Government-issued ID validation (Aadhaar / PAN verification).
  - `Level 3`: Property ownership/lease documents (Electricity bill, Index II, Sale deed, Rent agreement).
  - `Level 4`: On-ground physical inspection by authorized field officers.
- **🤝 Roommate Matching Engine**: Multi-factor algorithmic compatibility scoring based on budget, move-in timeline, flat preference, sleep schedule, smoking habits, and dietary choices with double-blind mutual handshake privacy.
- **💡 True Cost Calculator™**: Total financial transparency breaking down base rent, estimated electricity charges, daily mess food, building maintenance, and refundable vs non-refundable security deposits.
- **🍲 Food & Mess Transparency**: For student hostels and PGs — weekly meal schedules, breakfast/lunch/dinner timings, veg/non-veg split, and authentic resident reviews.
- **🔒 Privacy First & DPDP Act 2023 Compliant**: Phone numbers and exact property addresses remain masked until a mutual connection request is accepted or visit is confirmed.

---

## 🏗️ Architecture & Technology Stack

StayConnect is structured as a production-grade monorepo sharing unified data contracts and business logic across web, mobile, and backend services.

```
StayConnect/
├── apps/
│   ├── web/               # Next.js 16 (React 19, TypeScript, Tailwind CSS v4, Radix UI)
│   ├── api/               # NestJS 11 Modular Monolith (TypeScript, Swagger, PostGIS, JWT)
│   └── mobile/            # Flutter cross-platform client (Android & iOS, Deep Linking, FCM)
├── database/
│   └── migrations/        # PostgreSQL 16 + PostGIS schema (28 tables, spatial GIST indexes)
├── docs/                  # In-depth architectural & API specifications
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── DEVELOPMENT_ROADMAP.md
├── packages/              # Shared types, UI contracts, and utilities
├── .env.example           # Safe environment variables template
└── PROJECT_STATUS.md      # Real-time engineering status & phase tracking
```

### Tech Stack Details

| Layer | Technologies |
| :--- | :--- |
| **Web Frontend** | Next.js 16 (App Router, Turbopack, React 19, TypeScript), Tailwind CSS v4, Lucide Icons, Radix UI |
| **Backend API** | NestJS 11+, TypeScript, Express, Class-Validator, Swagger OpenAPI v3, Passport JWT |
| **Database** | PostgreSQL 16+ with PostGIS spatial extension (Geographic radius queries) |
| **Mobile App** | Flutter 3.x, Dart, Dio HTTP client, Firebase Cloud Messaging (FCM), AppLinks deep linking |
| **Authentication** | Secure Indian phone OTP verification (+91) with rate-limiting, JWT access/refresh tokens |
| **Security & Privacy** | AES-256 for document storage, S3 Presigned URLs with 15-min TTL, Role-Based Access Control |

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js**: v20.x or v22.x LTS
- **npm**: v10.x or higher
- **PostgreSQL**: v16+ with `postgis` extension enabled (optional for local mock data)

### 2. Clone and Setup Environment

```bash
# Clone the repository
git clone https://github.com/Himanshusaurabh0411/StayConnect.git
cd StayConnect

# Copy example environment variables
cp .env.example .env
```

### 3. Run Backend API (`apps/api`)

```bash
cd apps/api
npm install
npm run start:dev
```
- API will start at: `http://localhost:4000/api/v1`
- Interactive Swagger OpenAPI Documentation: `http://localhost:4000/api/docs`

### 4. Run Web Application (`apps/web`)

```bash
cd ../../apps/web
npm install
npm run dev
```
- Web application will start at: `http://localhost:3000`

---

## 🌐 Deploying Web App to Vercel

The web application is ready for 1-click deployment on Vercel:

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the `StayConnect` repository.
4. In **Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `apps/web`
5. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed NestJS API URL (e.g. `https://api.stayconnect.in/api/v1`)
6. Click **Deploy**. Vercel will build and host the responsive Next.js application with automatic edge routing and partial prerendering.

---

## 📱 Mobile Application (Flutter)

The mobile client is configured for both Android and iOS in `apps/mobile`:
- **Deep Linking**: Configured for `stayconnect://property/:id` and `stayconnect://roommates/:id`.
- **API Interceptor**: Secure token storage with automatic bearer injection and refresh cycles.
- **Push Notifications**: FCM background and foreground listeners for message requests and verification status changes.

To run locally:
```bash
cd apps/mobile
flutter pub get
flutter run
```

---

## 📊 Database Schema Overview

The database design adheres to 3NF normalization with PostGIS geographic indexing across 28 specialized tables:
- `users`, `user_identities`, `sessions`, `roles_permissions`
- `properties`, `property_photos`, `property_costs`, `property_amenities`
- `roommate_profiles`, `roommate_preferences`, `roommate_connections`, `roommate_chats`
- `verifications`, `verification_documents`, `property_inspections`
- `property_reviews`, `review_reports`, `food_ratings`
- `enquiries`, `property_visits`, `saved_properties`

Full DDL available at `database/migrations/001_initial_schema.sql` and detailed data dictionary in `docs/DATABASE_SCHEMA.md`.

---

## 🛡️ License

Proprietary © 2026 StayConnect Technologies India Pvt Ltd. All rights reserved.
Built with dedication for Indian students, young professionals, and property owners.

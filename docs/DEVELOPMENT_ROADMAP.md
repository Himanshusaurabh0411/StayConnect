# StayConnect — Development Roadmap

## Phase 1: Project Foundation & Architecture (Current Phase)
- [x] Workspace and tooling audit.
- [x] Monorepo structure (`apps/web`, `apps/api`, `packages/shared`, `database/`, `docs/`).
- [x] Complete domain type definitions in `@stayconnect/shared`.
- [x] Technical Architecture (`docs/TECHNICAL_ARCHITECTURE.md`) & PostGIS Database Schema (`docs/DATABASE_SCHEMA.md`).
- [x] Next.js 15+ frontend initialized with Tailwind CSS v4 design tokens (Deep Navy `#0F2B46` + Fresh Green `#22C55E`).
- [x] Base Design System primitives (Buttons, Badges, Cards, Inputs, Separator).
- [ ] Responsive site header, footer, and mobile bottom navigation.
- [ ] Startup homepage with hero search, accommodation categories, featured stays, popular cities, and roommate discovery CTA.
- [ ] Property discovery interface with multi-attribute filtering and sorting.
- [ ] True Cost Calculator component.
- [ ] Roommate Finder entry point with 3 intent pathways.
- [ ] Property owner dashboard layout and listing submission form shell.
- [ ] Production verification & responsive testing.

---

## Phase 2: Property Marketplace & Backend API
- [ ] NestJS modular monolith setup with Prisma / TypeORM and PostgreSQL.
- [ ] PostGIS spatial distance queries (`ST_DWithin` for college/metro searches).
- [ ] S3-compatible pre-signed upload URL generation for photos and walkthrough videos.
- [ ] Meilisearch integration for autocomplete and typo-tolerant search across Indian localities and PIN codes.
- [ ] Dynamic True Cost Calculator backend logic for varying fixed/metered utility splits.
- [ ] Owner listing management lifecycle (Draft -> Submitted -> Verified -> Published -> Occupied).

---

## Phase 3: Roommate Finder & Social Graph
- [ ] Multi-faceted Roommate compatibility algorithm (Location 30%, Budget 25%, Habits/Lifestyle 25%, Move-in timeline 20%).
- [ ] Connection request dispatch & bidirectional acceptance handshake.
- [ ] WebSocket / Socket.io real-time chat with message delivery receipts.
- [ ] Privacy safeguards (hiding phone numbers, masking exact unit addresses).

---

## Phase 4: Trust, Verification & Operations
- [ ] 4-Tier Verification pipeline:
  - Level 1: Phone OTP confirmation.
  - Level 2: Aadhaar / Government ID verification via DigiLocker / OCR.
  - Level 3: Ownership / Electricity bill document audit.
  - Level 4: Ground team physical geotagged inspection.
- [ ] Food Transparency module (weekly mess menus, timings, resident food hygiene ratings).
- [ ] Admin moderations dashboard for fraud review, user reports, and listing approvals.

---

## Phase 5: Mobile Applications (Flutter)
- [ ] Shared Dart data models matching backend OpenAPI specs.
- [ ] Android & iOS Flutter apps with native GPS location picker.
- [ ] Push notifications using Firebase Cloud Messaging (FCM).
- [ ] Universal deep linking for property and roommate profile sharing.

---

## Phase 6: QA, Hardening & Launch
- [ ] End-to-end Cypress / Playwright tests for search, booking enquiry, and roommate matching flows.
- [ ] Load testing with k6 (10,000 concurrent search queries).
- [ ] Security audit against OWASP Top 10 vulnerabilities.
- [ ] Deployment to scalable cloud infrastructure (AWS / DigitalOcean / Vercel).

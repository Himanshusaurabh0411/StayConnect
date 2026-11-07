# StayConnect — REST API Specification (v1)

Base URL: `https://api.stayconnect.in/api/v1`

All responses follow standard envelope structures.

### Standard Success Envelope
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

### Standard Paginated Envelope
```json
{
  "success": true,
  "data": [],
  "meta": {
    "total": 128,
    "page": 1,
    "pageSize": 20,
    "totalPages": 7
  }
}
```

### Standard Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request payload failed schema validation",
    "details": {
      "phone": ["Phone must be a valid 10-digit Indian mobile number"]
    }
  }
}
```

---

## 1. Authentication & User Endpoints (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/request-otp` | Request 6-digit phone OTP | None (Rate-limited) |
| `POST` | `/auth/verify-otp` | Verify OTP and return JWT tokens | None |
| `POST` | `/auth/refresh` | Refresh expired access token | Refresh Token |
| `POST` | `/auth/logout` | Revoke session and blacklist token | Bearer Token |
| `GET` | `/auth/me` | Fetch authenticated user profile & roles | Bearer Token |

---

## 2. Properties Catalog (`/properties`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/properties` | Search & filter accommodations with PostGIS | None |
| `GET` | `/properties/:slug` | Fetch property profile with rooms & pricing | None |
| `POST` | `/properties` | Create draft property | Owner / Manager |
| `PATCH` | `/properties/:id` | Update property details | Owner / Manager |
| `DELETE` | `/properties/:id` | Archive property | Owner / Admin |
| `POST` | `/properties/:id/media` | Upload photos or walkthrough videos | Owner / Manager |
| `GET` | `/properties/:id/cost-calculator` | Fetch detailed itemized expense forecast | None |

---

## 3. Roommate Discovery (`/roommates`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/roommates` | Search roommate profiles by city & lifestyle | None |
| `GET` | `/roommates/:id` | View public roommate profile | None |
| `POST` | `/roommates/profile` | Create/update personal roommate preferences | Bearer Token |
| `POST` | `/roommates/requests` | Send roommate connection request | Bearer Token |
| `PATCH` | `/roommates/requests/:id`| Accept or reject connection request | Bearer Token |
| `GET` | `/roommates/connections` | List mutual connections | Bearer Token |

---

## 4. Enquiries & Visits (`/enquiries`, `/visits`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/enquiries` | Submit enquiry to property owner (No Brokerage) | Bearer Token |
| `GET` | `/enquiries/my` | View my enquiries (Tenant or Owner) | Bearer Token |
| `POST` | `/visits` | Schedule physical visit to property | Bearer Token |
| `PATCH` | `/visits/:id` | Confirm or reschedule visit | Owner / Tenant |

---

## 5. Reviews & Trust (`/reviews`, `/verifications`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/properties/:id/reviews` | Fetch verified resident reviews | None |
| `POST` | `/properties/:id/reviews` | Submit resident review with sub-ratings | Verified Resident |
| `POST` | `/verifications/request` | Submit owner ID / property docs for verification | Owner |
| `GET` | `/admin/verifications` | List pending document approvals | Admin |
| `PATCH` | `/admin/verifications/:id`| Approve or reject verification level | Admin |

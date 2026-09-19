# API Contract — Shared Office Parking Platform

Base URL (local dev): `http://localhost:5000/api`

Auth: JWT in `Authorization: Bearer <token>` header, unless marked **Public**.

All responses are JSON. All timestamps are ISO 8601 UTC.

---

## 1. Auth

### POST `/auth/signup` — Public
Create a new user (public rider) or owner account.

**Request:**
```json
{
  "name": "Shreeansh",
  "email": "shreeansh@example.com",
  "password": "plaintext_from_client",
  "role": "user"        // "user" | "owner"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "Shreeansh",
  "email": "shreeansh@example.com",
  "role": "user",
  "wallet_balance": 0
}
```

### POST `/auth/login` — Public
**Request:**
```json
{ "email": "shreeansh@example.com", "password": "plaintext_from_client" }
```

**Response 200:**
```json
{ "token": "jwt_string", "user": { "id": "uuid", "name": "Shreeansh", "role": "user" } }
```

---

## 2. Buildings & Slots

### GET `/buildings` — Public
Query params: `lat`, `lng`, `radius_km` (optional, defaults to a fixed demo radius)

**Response 200:**
```json
[
  {
    "id": "uuid",
    "name": "Tech Park Tower A",
    "address": "Outer Ring Road, Bangalore",
    "lat": 12.9351,
    "lng": 77.6245,
    "total_slots": 10,
    "available_slots": 3,
    "base_rate_per_hour": 40,
    "currently_open": true
  }
]
```

### GET `/buildings/:id` — Public
**Response 200:**
```json
{
  "id": "uuid",
  "name": "Tech Park Tower A",
  "address": "Outer Ring Road, Bangalore",
  "lat": 12.9351,
  "lng": 77.6245,
  "total_slots": 10,
  "available_slots": 3,
  "base_rate_per_hour": 40,
  "floating_rate_current": 46,
  "fixed_rate_premium_pct": 8,
  "available_hours": "18:00-08:00 weekdays, all day weekends"
}
```

### POST `/buildings` — Owner only
Owner lists a new building/slot pool.

**Request:**
```json
{
  "name": "Tech Park Tower A",
  "address": "Outer Ring Road, Bangalore",
  "lat": 12.9351,
  "lng": 77.6245,
  "total_slots": 10,
  "base_rate_per_hour": 40,
  "fixed_rate_premium_pct": 8,
  "available_hours": "18:00-08:00 weekdays, all day weekends"
}
```

**Response 201:** same shape as GET `/buildings/:id`

### PATCH `/buildings/:id` — Owner only
Update rate, total slots, or available hours. Partial body accepted.

---

## 3. Sessions (scan-in / scan-out)

### POST `/sessions/check-in`
**Request:**
```json
{
  "building_id": "uuid",
  "rate_type": "fixed"      // "fixed" | "floating"
}
```

**Response 201:**
```json
{
  "session_id": "uuid",
  "building_id": "uuid",
  "rate_type": "fixed",
  "locked_rate_per_hour": 43.2,   // base_rate * (1 + premium_pct/100), null if floating
  "started_at": "2026-09-19T18:02:00Z",
  "qr_code_url": "https://.../qr/uuid.png"
}
```

Notes for backend logic:
- On check-in, decrement `available_slots` for the building.
- If `rate_type` is `"fixed"`, compute and store `locked_rate_per_hour` immediately using the building's current `base_rate_per_hour` plus `fixed_rate_premium_pct`. This value never changes for the session.
- If `"floating"`, store `null` for `locked_rate_per_hour` — rate is resolved at checkout using whatever pricing logic is active at that moment.

### GET `/sessions/active`
Returns the current user's in-progress session, if any.

**Response 200:**
```json
{
  "session_id": "uuid",
  "building_name": "Tech Park Tower A",
  "rate_type": "fixed",
  "locked_rate_per_hour": 43.2,
  "started_at": "2026-09-19T18:02:00Z",
  "elapsed_minutes": 47,
  "running_cost_estimate": 33.84
}
```

### POST `/sessions/:id/check-out`
**Response 200:**
```json
{
  "session_id": "uuid",
  "building_id": "uuid",
  "rate_type": "fixed",
  "duration_minutes": 132,
  "rate_applied_per_hour": 43.2,
  "amount_charged": 95.04,
  "wallet_balance_after": 204.96,
  "ended_at": "2026-09-19T20:14:00Z"
}
```

Notes for backend logic:
- On checkout, increment `available_slots` back.
- Deduct `amount_charged` from wallet in the same transaction as creating the closing session record — must be atomic (use a DB transaction) so a crash never leaves a session closed without a matching wallet deduction, or vice versa.
- If wallet balance is insufficient, still close the session but flag it (e.g., `payment_status: "pending"`) rather than blocking checkout — never trap a user who can't pay from leaving.

---

## 4. Wallet

### GET `/wallet`
**Response 200:**
```json
{ "balance": 204.96, "currency": "INR" }
```

### POST `/wallet/top-up`
**Request:**
```json
{ "amount": 200 }
```

**Response 200:**
```json
{ "balance": 404.96, "transaction_id": "uuid" }
```
(Payment gateway is mocked for the demo — this just adds to balance directly.)

### GET `/wallet/transactions`
**Response 200:**
```json
[
  {
    "id": "uuid",
    "type": "session_charge",   // "session_charge" | "top_up"
    "amount": -95.04,
    "related_session_id": "uuid",
    "created_at": "2026-09-19T20:14:00Z"
  }
]
```

---

## 5. Owner Dashboard

### GET `/owner/buildings` — Owner only
List all buildings owned by the logged-in owner, with live stats.

**Response 200:**
```json
[
  {
    "id": "uuid",
    "name": "Tech Park Tower A",
    "total_slots": 10,
    "available_slots": 3,
    "occupied_slots": 7,
    "earnings_today": 1240.50,
    "earnings_total": 18500.00
  }
]
```

### GET `/owner/buildings/:id/sessions` — Owner only
Session history for one building (for the demo, just recent sessions is enough).

**Response 200:**
```json
[
  {
    "session_id": "uuid",
    "user_name": "Shreeansh",
    "rate_type": "fixed",
    "duration_minutes": 132,
    "amount_charged": 95.04,
    "started_at": "2026-09-19T18:02:00Z",
    "ended_at": "2026-09-19T20:14:00Z"
  }
]
```

---

## 6. Error Format (all endpoints)

```json
{ "error": "human_readable_message", "code": "SLOT_UNAVAILABLE" }
```

Common codes to agree on now: `INVALID_CREDENTIALS`, `SLOT_UNAVAILABLE`, `SESSION_ALREADY_ACTIVE`, `NO_ACTIVE_SESSION`, `INSUFFICIENT_WALLET_BALANCE`, `VALIDATION_ERROR`.

---

## 7. Open questions to settle before Day 2 (fill in together)

- [ ] Exact floating-rate formula at checkout (average over session vs. rate at checkout moment) — recommend rate-at-checkout for simplicity given the timeline
- [ ] JWT expiry duration
- [ ] Whether owner accounts and rider accounts share the `/auth` endpoints (recommended) or are fully separate

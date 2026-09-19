## Project Overview

**Event:** College-level AWS Hackathon
**Problem Statement:** Smarter Queues & Shared Services

### The Idea
Office buildings and similar commercial properties have parking slots that sit empty after office hours, on weekends, and on holidays. This platform lets those buildings list their idle parking capacity for public use during those idle hours. The public finds a nearby open slot, parks, and pays automatically based on actual time spent — no pre-booking required. Building owners earn passive income from unused space; the public gets more parking supply in dense, traffic-heavy areas like Bangalore.

**Differentiator:** Existing apps like Park+ or GetMyParking are general parking search/booking tools. This targets *idle office parking specifically* as an underused supply source, and uses a pay-by-actual-duration model (like FASTag or metro smart cards) instead of rigid time-slot booking — closer to how people actually park in real life.

### Who Uses It
- **Public users (riders):** find nearby open slots, scan in, park, scan out, get auto-charged from an in-app wallet
- **Building owners/admins:** list available slots, set base pricing, view live occupancy and earnings

### Core Flow (scan-in / scan-out model)
1. User browses nearby buildings, sees live open-slot count (e.g., "3/10 open") and current rate/hour
2. Before entering, user chooses a pricing mode:
   - **Fixed rate** — locked at check-in, plus a 5–10% premium, so the bill never changes mid-session regardless of demand shifts later
   - **Floating rate** — varies with real-time demand (time of day, nearby events), can go up or down, no premium — framed as a way to save money during low-demand hours, not just a risk
3. User scans in (QR code, simulated for the demo) → parking session starts, timer running
4. User parks, leaves, scans out → duration calculated → amount auto-deducted from their in-app wallet
5. Owner dashboard shows live occupancy and earnings per building in real time

### Pricing Logic
- Each building has a `base_rate_per_hour` that can vary by time-of-day/demand (weekend surge, nearby event, etc.)
- This variability only actually affects users who chose the *floating* rate
- Fixed-rate users pay `base_rate_at_checkin × (1 + premium_pct)` for the whole session, no matter what happens to demand afterward

### Tech Stack
- **Backend:** Flask + PostgreSQL (chosen for exclusion constraints, useful for preventing double-occupancy/booking conflicts, and because the team already knows this stack — no ramp-up time needed)
- **Frontend:** React + Vite + Tailwind

### AWS Services Used
- **Lambda + API Gateway** or **EC2/Elastic Beanstalk** — hosting
- **RDS (Postgres)** — database
- **Amazon Location Service** (or Google Maps as fallback) — nearby slot discovery on the map
- **SNS** — check-in/check-out notifications, wallet deduction alerts
- **Rekognition** — mocked as a concept slide for future automated ANPR-based entry (not built live)

### What's Actually Built vs. What's Explained Only

**Built for the demo:**
- Full scan-in/scan-out session loop with live timer
- Live occupancy display per building
- In-app wallet with mock top-up and automatic session-based deduction
- Fixed/floating rate choice at check-in
- Owner dashboard: live occupancy + earnings
- Basic dynamic pricing rules driving the floating rate

**Explained only, not built (have clear answers ready if judges ask):**
- Real ANPR/hardware integration for actual physical gate access
- Real payment gateway for wallet top-ups (currently mocked)
- Insurance/liability handling for using someone else's private parking
- Regulatory/lease compliance for subletting commercial parking

### Team Split
- **Backend + AWS infra:** API routes, database, deployment, auth, pricing logic
- **Frontend + UX:** booking/session UI, map view, owner dashboard, wallet screen, QR scan simulation

Both sides build against the shared contract in `docs/api-contract.md` — check that file before changing any endpoint shape.

### Timeline (5 days)
- **Day 1:** Repo + schema setup, both sides scaffold in parallel against the API contract
- **Day 2:** Core scan-in/scan-out + wallet loop working end-to-end
- **Day 3–4:** Owner dashboard, map view, AWS service integrations, fixed/floating pricing polish
- **Day 5:** Bug fixes only in the morning, deploy + full live test, then pitch deck + rehearsal

## Project Structure

```
parking-hackathon/
├── README.md
├── .gitignore
├── docker-compose.yml          # optional: local Postgres

├── backend/
│   ├── requirements.txt
│   ├── .env.example
│   ├── run.py                  # entry point
│   ├── config.py               # DB URL, secret keys, AWS config
│   │
│   ├── app/
│   │   ├── __init__.py         # app factory, extension init
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── building.py
│   │   │   ├── slot.py
│   │   │   ├── session.py      # scan-in/scan-out parking session
│   │   │   └── wallet.py
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py         # signup/login
│   │   │   ├── buildings.py    # list/search buildings & slots
│   │   │   ├── sessions.py     # check-in, check-out, active session
│   │   │   ├── wallet.py       # top-up, balance, transaction history
│   │   │   └── owner.py        # owner dashboard: list slot, occupancy, earnings
│   │   │
│   │   ├── services/
│   │   │   ├── pricing.py      # fixed/floating rate calculation logic
│   │   │   ├── notifications.py # AWS SNS calls
│   │   │   └── qr.py           # QR code generation for check-in
│   │   │
│   │   └── utils/
│   │       ├── auth_helpers.py # JWT/session handling
│   │       └── validators.py
│   │
│   ├── migrations/             # Alembic migration files
│   └── tests/
│       ├── test_sessions.py
│       └── test_pricing.py

├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── router.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx            # nearby buildings + map
│       │   ├── BuildingDetail.jsx  # slot count, rate, fixed/floating choice
│       │   ├── ActiveSession.jsx   # live timer, current cost
│       │   ├── Wallet.jsx          # balance, top-up, transaction history
│       │   ├── OwnerDashboard.jsx  # occupancy, earnings
│       │   └── Login.jsx / Signup.jsx
│       │
│       ├── components/
│       │   ├── SlotCard.jsx
│       │   ├── RateToggle.jsx      # fixed vs floating selector
│       │   ├── QRScanner.jsx       # mock scan-in/out UI
│       │   ├── MapView.jsx
│       │   └── Navbar.jsx
│       │
│       ├── api/
│       │   ├── client.js           # axios/fetch base config
│       │   ├── buildings.js
│       │   ├── sessions.js
│       │   └── wallet.js
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       └── styles/
│           └── index.css           # Tailwind base

├── infra/                      # AWS deployment
│   ├── deploy.sh
│   ├── lambda/
│   └── architecture-diagram.png

└── docs/
    ├── api-contract.md          # endpoint list, request/response shapes
    ├── db-schema.png
    └── pitch-deck.pdf
```

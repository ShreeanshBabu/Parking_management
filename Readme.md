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

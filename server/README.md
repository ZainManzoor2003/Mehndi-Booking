## Mehndi-Me Backend

Express + MongoDB backend for a marketplace connecting mehndi artists with clients.

### Setup

1. Copy `.env.example` to `.env` and fill values:
   - `MONGO_URI` (MongoDB Atlas)
   - `JWT_SECRET`
   - `CORS_ORIGIN`
   - Email SMTP settings (optional for dev)

2. Install deps:
```
npm install
```

3. Run server:
```
npm run dev
# or
npm start
```

### API Overview

- Auth
  - POST `/api/auth/signup-client`
  - POST `/api/auth/signup-artist`
  - POST `/api/auth/login`
  - GET  `/api/auth/me` (auth)

- Bookings
  - POST `/api/bookings` (public; accepts optional token)
  - GET  `/api/bookings` (artist only)

- Proposals
  - POST `/api/proposals` (artist)
  - POST `/api/proposals/:id/accept` (client)

- User
  - GET `/api/user/me` (auth)

- Blog
  - GET `/api/blog`





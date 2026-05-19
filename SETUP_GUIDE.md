# PowerFlex Pay - Full Stack Setup Guide

## Project Structure

```
powerflex-pay/
├── src/                          # Frontend (React + Vite)
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── data/
│   └── index.css
├── server/                       # Backend (Express.js)
│   ├── controllers/              # Business logic
│   ├── routes/                   # API routes
│   ├── middleware/               # Auth & error handling
│   ├── config/                   # Database config
│   ├── index.js                  # Main server file
│   ├── schema.sql                # Database schema
│   └── .env                      # Environment variables
├── package.json                  # Frontend deps
├── server/package.json           # Backend deps
└── README.md
```

## Prerequisites

- Node.js 16+
- PostgreSQL 12+ (or compatible database)
- npm or yarn

## Installation

### 1. Clone Repository
```bash
git clone <repo-url>
cd powerflex-pay
```

### 2. Setup PostgreSQL Database

**Create Database:**
```bash
createdb powerflex_pay
```

**Load Schema:**
```bash
psql powerflex_pay < server/schema.sql
```

**Verify Tables:**
```bash
psql powerflex_pay -c "\dt"
```

### 3. Setup Backend

```bash
cd server
npm install
```

**Configure Environment:**
```bash
# Update .env with your PostgreSQL credentials
# Default:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=powerflex_pay
# DB_USER=postgres
# DB_PASSWORD=postgres
```

**Start Backend:**
```bash
npm run dev
# Backend runs on http://localhost:5000
```

### 4. Setup Frontend

```bash
cd ..
npm install
```

**Start Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

## API Endpoints

### Authentication (Public)
- `POST /api/auth/signup-email` - Register with email
- `POST /api/auth/login-email` - Login with email & password
- `POST /api/auth/login-biometric` - Biometric login
- `POST /api/auth/login-corporate` - Corporate login

### Protected Endpoints (Require JWT)

**Wallet:**
- `GET /api/wallet` - Get wallet balance
- `POST /api/wallet/topup` - Top up wallet
- `GET /api/transactions` - Get transaction history
- `POST /api/wallet/transfer` - Transfer funds

**Fuel:**
- `GET /api/fuel-stations` - List fuel stations
- `GET /api/fuel-stations/:stationId` - Get station details
- `GET /api/fuel-stations/:stationId/prices` - Get fuel prices
- `POST /api/fuel/purchase` - Purchase fuel

**Rewards:**
- `GET /api/rewards/points` - Get loyalty points
- `GET /api/rewards` - Get available rewards
- `POST /api/rewards/redeem` - Redeem reward
- `GET /api/rewards/referrals` - Get referral status

## Authentication Flow

### Email Login
```bash
curl -X POST http://localhost:5000/api/auth/login-email \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "User Name",
    "authMethod": "email"
  }
}
```

### Using Token
```bash
curl -X GET http://localhost:5000/api/wallet \
  -H "Authorization: Bearer <token>"
```

## Database Tables

1. **users** - User accounts with auth methods
2. **wallets** - User wallet balances
3. **transactions** - All wallet transactions
4. **fuel_stations** - Available fuel stations
5. **fuel_prices** - Current fuel prices
6. **fuel_orders** - Fuel purchase history
7. **loyalty_points** - User loyalty points
8. **rewards** - Available rewards
9. **reward_redemptions** - Redeemed rewards
10. **referrals** - Referral program
11. **kyc_records** - KYC verification

## Login Scenarios Tested

### 1. Email/Password Login
- User registers with email and password
- Password is hashed with bcrypt
- JWT token issued for subsequent requests
- Session persists via token storage

### 2. Biometric Login
- No password required
- User identified by email
- Instant login with fingerprint/face
- Works on mobile devices

### 3. Corporate Login
- Company email with corporate code
- Employee ID verification
- Corporate account management
- Bulk user management support

### 4. One-Tap Biometric
- Previous login detection
- Resume app with biometric
- No re-authentication needed

## Features Implemented

✓ Multi-method authentication (Email, Biometric, Corporate)
✓ JWT token-based security
✓ Wallet management with balance tracking
✓ Fuel station directory with pricing
✓ Fuel purchase with wallet deduction
✓ Loyalty points system
✓ Reward redemption
✓ Transaction history
✓ Referral program
✓ KYC verification framework
✓ Corporate account support

## Environment Variables

```
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=powerflex_pay
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d

# Frontend
VITE_API_BASE_URL=http://localhost:5000
```

## Testing Login Flows

### 1. Register New User (Email)
```bash
curl -X POST http://localhost:5000/api/auth/signup-email \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newuser@example.com",
    "password":"SecurePass123!",
    "fullName":"New User"
  }'
```

### 2. Login with Email
```bash
curl -X POST http://localhost:5000/api/auth/login-email \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newuser@example.com",
    "password":"SecurePass123!"
  }'
```

### 3. Access Protected Resource
```bash
# Save token from login response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:5000/api/wallet \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Biometric Login
```bash
curl -X POST http://localhost:5000/api/auth/login-biometric \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com"}'
```

## Troubleshooting

**PostgreSQL Connection Error:**
```bash
# Check if PostgreSQL is running
psql --version
createdb --help

# Verify credentials in server/.env
```

**CORS Errors:**
```bash
# Ensure CORS_ORIGIN in .env matches frontend URL
CORS_ORIGIN=http://localhost:3000
```

**JWT Token Issues:**
```bash
# Change JWT_SECRET in server/.env
JWT_SECRET=your-new-secret-key
```

## Production Deployment

1. Use environment variables from hosting platform
2. Update JWT_SECRET to strong value
3. Enable HTTPS
4. Use managed PostgreSQL service
5. Add rate limiting
6. Enable request validation
7. Add logging and monitoring

## Next Steps

1. Connect frontend to backend APIs
2. Implement error boundaries
3. Add loading states
4. Implement offline mode
5. Add payment gateway integration
6. Setup CI/CD pipeline
7. Deploy to production

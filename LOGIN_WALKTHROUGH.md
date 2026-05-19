# PowerFlex Pay - Complete Login Walkthrough

## Overview

PowerFlex Pay supports 4 comprehensive login flows tailored for different user types. Each flow provides a seamless, secure authentication experience.

---

## 1. Email/Password Login (Standard User)

### Flow Diagram
```
Onboarding → Login (Email Tab) → Password Entry → JWT Token → Home
```

### Step-by-Step Walkthrough

#### Step 1: Access Login Page
- User taps "Skip" on onboarding or navigates to `/login`
- Login page displays with 3 authentication tabs: Email, Corporate, Biometric

#### Step 2: Select Email Tab (Default)
- Email tab is pre-selected by default
- User sees two input fields:
  - **Email Address**: Email input with placeholder
  - **Password**: Password input with show/hide toggle

#### Step 3: Enter Credentials
- Email example: `kwame@example.com`
- Password example: `password` (masked with dots)
- **Show/Hide Toggle**: Eye icon to toggle password visibility

#### Step 4: Submit Login
- User taps "Continue →" button
- Button shows loading state: "🔄 Logging in..."
- Request sent to backend: `POST /api/auth/login-email`

#### Step 5: Backend Processing
```javascript
POST /api/auth/login-email
{
  "email": "kwame@example.com",
  "password": "password"
}
```

Backend Actions:
- Query database for user with matching email
- Verify password hash using bcrypt
- Generate JWT token (valid for 7 days)
- Return token and user data

#### Step 6: Token Storage
- JWT token stored in `localStorage.token`
- User data stored in `localStorage.user`
- Token automatically attached to all subsequent API requests

#### Step 7: Navigation
- Success toast: "Login successful!"
- User redirected to `/home` dashboard
- Wallet balance automatically loaded
- Navigation menu ready to use

### Example Request/Response

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "kwame@example.com",
    "password": "password"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJlbWFpbCI6Ima3dhbWVAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTYxNjA0NDUsImV4cCI6MTcxNjc2NTI0NX0.signature",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "kwame@example.com",
    "fullName": "Kwame Asare",
    "authMethod": "email"
  }
}
```

### Error Handling

**Missing Credentials:**
- Toast: "Please enter email and password"
- User remains on login page

**Invalid Email:**
- HTTP 401 response
- Toast: "Invalid credentials"
- User can retry

**Wrong Password:**
- HTTP 401 response
- Toast: "Invalid credentials"
- User can retry

**Server Error:**
- HTTP 500 response
- Toast: "Login failed"
- User can retry

---

## 2. Biometric Login (One-Tap Authentication)

### Flow Diagram
```
Home → Logout → Login (Biometric Tab) → Fingerprint/FaceID → JWT Token → Home
```

### Prerequisites
- Device with biometric capability (fingerprint or face recognition)
- User email saved from previous login

### Step-by-Step Walkthrough

#### Step 1: Access Biometric Tab
- User taps "Biometric" tab in login form
- Page shows large biometric icon (🔏) with ripple animation
- Text: "Tap to use Touch ID / Face ID"

#### Step 2: Initialize Biometric
- First time: User enters email address
  - Input field shown: "Email Address"
  - User enters `kwame@example.com`
  - Biometric scanner initializes on device

- Subsequent times: Email remembered in browser
  - Skip email entry
  - Direct biometric authentication

#### Step 3: Biometric Authentication
- User places finger on fingerprint sensor or looks at camera
- Device authenticates locally (not sent to server)
- Device returns authentication success

#### Step 4: Backend Verification
- Request sent: `POST /api/auth/login-biometric`
- Email used to identify user
- No password verification (already done by device)

```javascript
POST /api/auth/login-biometric
{
  "email": "kwame@example.com"
}
```

#### Step 5: Token Generation
- Server verifies user exists and is active
- JWT token generated and returned
- Same as email login flow

#### Step 6: User Redirected
- Success toast: "Biometric login successful!"
- User navigated to `/home`
- Full access to all features

### Example Request/Response

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login-biometric \
  -H "Content-Type: application/json" \
  -d '{"email": "kwame@example.com"}'
```

**Response:**
```json
{
  "message": "Biometric login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "kwame@example.com",
    "fullName": "Kwame Asare",
    "authMethod": "biometric"
  }
}
```

### Security Considerations

- Biometric data never sent to server
- Only email sent for user identification
- Device handles biometric authentication locally
- Biometric + email combination ensures security
- Faster than password entry (subsecond)

---

## 3. Corporate Login (Enterprise Account)

### Flow Diagram
```
Login (Corporate Tab) → Corp Email → Corp Code → Employee ID → JWT Token → Home
```

### Prerequisites
- Corporate employee account created by company admin
- Corporate code provided by HR
- Employee ID from company records

### Step-by-Step Walkthrough

#### Step 1: Access Corporate Tab
- User taps "Corporate" tab in login form
- Three input fields displayed:
  1. **Corporate Email**: Company email address
  2. **Corporate Code**: Authorization code from company
  3. **Employee ID**: Internal employee ID

#### Step 2: Enter Corporate Credentials
- **Corporate Email**: `john.doe@company.com`
- **Corporate Code**: `CORP2024`
- **Employee ID**: `EMP12345`

#### Step 3: Submit Corporate Login
- User taps "Continue →" button
- Button shows loading state
- Request sent to backend: `POST /api/auth/login-corporate`

#### Step 4: Backend Processing
```javascript
POST /api/auth/login-corporate
{
  "corporateEmail": "john.doe@company.com",
  "corporateCode": "CORP2024",
  "employeeId": "EMP12345"
}
```

Backend Actions:
- Verify corporate account exists
- Validate corporate code
- Confirm employee ID matches
- Verify employee is still active
- Generate JWT token with `account_type: 'corporate'`

#### Step 5: Corporate Features Unlocked
- Additional menu items for corporate:
  - Employee Fleet Management
  - Corporate Analytics
  - Bulk Billing
  - Team Fuel Cards
  - Expense Reports

#### Step 6: Navigation
- Success toast: "Corporate login successful!"
- User redirected to corporate dashboard
- Special corporate-only features available

### Example Request/Response

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login-corporate \
  -H "Content-Type: application/json" \
  -d '{
    "corporateEmail": "john.doe@company.com",
    "corporateCode": "CORP2024",
    "employeeId": "EMP12345"
  }'
```

**Response:**
```json
{
  "message": "Corporate login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440100",
    "email": "john.doe@company.com",
    "fullName": "John Doe",
    "accountType": "corporate",
    "authMethod": "corporate"
  }
}
```

### Corporate Features

1. **Fleet Management**
   - Add/remove vehicles
   - Assign fuel cards
   - Track fuel consumption
   - Set spending limits

2. **Analytics**
   - Team fuel spending
   - Trends and patterns
   - Cost per vehicle
   - Efficiency metrics

3. **Billing**
   - Consolidated invoices
   - Employee breakdowns
   - Payment scheduling
   - Budget tracking

4. **Team Management**
   - Add employees
   - Assign permissions
   - Monitor spending
   - Audit trails

---

## 4. Signup Flow (New Users)

### Flow Diagram
```
Login → No Account? → Signup Tab → Email → Password → Name → Create Account → Login → Home
```

### Step-by-Step Walkthrough

#### Step 1: Access Signup
- On login page, if user doesn't have account
- Tap "Don't have an account? Sign up" link
- Navigate to `/signup`

#### Step 2: Enter Information
- **Full Name**: `Nana Yaa Mensah`
- **Email**: `nana@example.com`
- **Password**: `SecurePass123!` (min 8 chars)
- **Confirm Password**: `SecurePass123!` (must match)

#### Step 3: Validate Inputs
- Full name: Required, min 3 characters
- Email: Valid format, not already registered
- Password: Min 8 chars, at least 1 uppercase, 1 number, 1 special char

#### Step 4: Submit Signup
- Taps "Create Account" button
- Request sent: `POST /api/auth/signup-email`

#### Step 5: Backend Processing
```javascript
POST /api/auth/signup-email
{
  "email": "nana@example.com",
  "password": "SecurePass123!",
  "fullName": "Nana Yaa Mensah"
}
```

Backend Actions:
- Check email not already registered
- Hash password with bcrypt (salt rounds: 10)
- Create user record
- Automatically create wallet (balance: 0)
- Generate JWT token
- Return token for immediate login

#### Step 6: Auto-Login
- Account created successfully
- JWT token returned and stored
- User redirected to `/onboarding-complete`
- Option to complete KYC verification

#### Step 7: Setup Complete
- Success toast: "Account created! Welcome to PowerFlex Pay"
- User now fully authenticated
- Can make purchases, transfer funds, earn rewards
- Dashboard accessible immediately

### Example Request/Response

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/signup-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nana@example.com",
    "password": "SecurePass123!",
    "fullName": "Nana Yaa Mensah"
  }'
```

**Response:**
```json
{
  "message": "Signup successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440200",
    "email": "nana@example.com",
    "fullName": "Nana Yaa Mensah",
    "authMethod": "email"
  }
}
```

---

## 5. Password Reset Flow

### Flow Diagram
```
Login → "Forgot Password?" → Email → Verification Code → New Password → Reset Complete → Login
```

### Step-by-Step Walkthrough

#### Step 1: Access Password Reset
- On login page, tap "Forgot Password?"
- Navigate to `/forgot-password`

#### Step 2: Enter Email
- Input: `kwame@example.com`
- Tap "Send Reset Code"

#### Step 3: Verification Code Sent
- Email sent to user inbox
- 6-digit code valid for 15 minutes
- Success message: "Check your email for reset code"

#### Step 4: Enter Verification Code
- Navigate to `/reset-password`
- Input 6-digit code from email
- Code verified against backend

#### Step 5: Set New Password
- Input new password: `NewSecurePass456!`
- Confirm new password: `NewSecurePass456!`
- Tap "Reset Password"

#### Step 6: Password Updated
- Success message: "Password reset successfully"
- User redirected to login page
- Can login with new password

---

## 6. Token & Session Management

### Token Storage

```javascript
// After successful login
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIs...');
localStorage.setItem('user', JSON.stringify({
  id: '550e8400-e29b-41d4-a716-446655440000',
  email: 'kwame@example.com',
  fullName: 'Kwame Asare'
}));
```

### Token Expiration

- **Expiry**: 7 days from issue
- **Before Expiry**: User remains logged in
- **After Expiry**: New login required
- **Refresh**: Logout and login again

### Token Usage in API Calls

```javascript
// Automatically included in all requests
fetch('http://localhost:5000/api/wallet', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
  }
})
```

### Logout

- Removes token from localStorage
- Removes user data from localStorage
- Clears all API headers
- Navigates to login page
- Session completely terminated

---

## 7. Error Scenarios & Recovery

### User Not Found
```
Error: "Invalid credentials"
Action: User can create account via signup
Recovery: Tap "Create Account" link
```

### Wrong Password
```
Error: "Invalid credentials"
Action: User can reset password
Recovery: Tap "Forgot Password?" link
```

### Email Already Registered
```
Error: "Email already registered"
Action: Use existing account to login
Recovery: Tap "Already have account?" link
```

### Corporate Code Invalid
```
Error: "Invalid corporate code"
Action: Verify code from HR
Recovery: Contact company admin
```

### Network Error
```
Error: "Network request failed"
Action: Check internet connection
Recovery: Retry login after connection restored
```

### Token Expired
```
Error: "Invalid or expired token"
Action: User must login again
Recovery: Automatic redirect to login page
```

---

## 8. Test User Accounts

### Test Accounts for Manual Testing

#### Email Login
- **Email**: `kwame@example.com`
- **Password**: `password`
- **Status**: Pre-seeded in database

#### Biometric Login (Any Email)
- **Email**: Any registered email
- **Method**: Biometric authentication
- **Note**: Email must exist in system

#### Corporate Login
- **Email**: `john.doe@company.com`
- **Code**: `CORP2024`
- **Employee ID**: `EMP12345`
- **Status**: Pre-seeded in database

#### Create New User
- **Email**: `yourname@example.com`
- **Password**: `SecurePass123!`
- **Name**: Your Name
- **Method**: Full registration flow

---

## 9. Testing Checklist

### Email/Password Login
- [ ] Enter valid credentials → Login successful
- [ ] Enter invalid password → Error shown
- [ ] Enter non-existent email → Error shown
- [ ] Test show/hide password toggle
- [ ] Test loading state
- [ ] Verify redirect to home page
- [ ] Verify token stored in localStorage
- [ ] Test with special characters in email

### Biometric Login
- [ ] Enter email → Biometric scanner activates
- [ ] Simulate successful biometric → Login successful
- [ ] Simulate failed biometric → Retry option
- [ ] Test with invalid email → Error shown
- [ ] Verify quick authentication
- [ ] Test on multiple devices

### Corporate Login
- [ ] Enter all three fields → Login successful
- [ ] Missing any field → Error shown
- [ ] Invalid corporate code → Error shown
- [ ] Verify corporate features unlocked
- [ ] Test multi-user corporate scenario
- [ ] Verify billing dashboard access

### Token & Session
- [ ] Token persists across page refresh
- [ ] User data shows after refresh
- [ ] Logout clears token and user
- [ ] Can't access protected routes without token
- [ ] API calls include token in headers
- [ ] Expired token triggers re-login

### Error Recovery
- [ ] User can signup from login error
- [ ] Password reset flow completes
- [ ] Network errors handled gracefully
- [ ] Toast messages display correctly
- [ ] User can retry failed login
- [ ] Error messages are helpful

---

## 10. Backend API Reference

### Authentication Endpoints

#### Signup
```
POST /api/auth/signup-email
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "password123",
  "fullName": "User Name"
}
Response: { token, user }
```

#### Email Login
```
POST /api/auth/login-email
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: { token, user }
```

#### Biometric Login
```
POST /api/auth/login-biometric
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com"
}
Response: { token, user }
```

#### Corporate Login
```
POST /api/auth/login-corporate
Headers: Content-Type: application/json
Body: {
  "corporateEmail": "company@corp.com",
  "corporateCode": "CODE123",
  "employeeId": "EMP001"
}
Response: { token, user }
```

#### Get Current User
```
GET /api/auth/user
Headers: Authorization: Bearer {token}
Response: { user }
```

#### Logout
```
POST /api/auth/logout
Headers: Authorization: Bearer {token}
Response: { message }
```

---

## 11. Security Best Practices

1. **Never Store Passwords**: Stored as bcrypt hashes only
2. **HTTPS Only**: All production requests must use HTTPS
3. **Secure Tokens**: JWT tokens sent in Authorization header
4. **CORS Protected**: API only accepts requests from allowed origins
5. **Rate Limiting**: Implement on production to prevent brute force
6. **Sensitive Data**: Passwords shown/hidden by user choice
7. **Session Timeout**: Auto-logout after token expiration
8. **Device Trust**: Option to trust device for faster re-login

---

## 12. Troubleshooting

### "Login failed" - Backend not running
```bash
# Start backend
cd server
npm run dev
# Should see: PowerFlex Pay API running on http://localhost:5000
```

### "CORS error" - Frontend/backend mismatch
```bash
# Verify .env files
cat .env  # Should have VITE_API_BASE_URL=http://localhost:5000
cat server/.env  # Should have CORS_ORIGIN=http://localhost:3000
```

### "Invalid token" - Token expired
```bash
# Solution: Logout and login again
# Token valid for 7 days
```

### "Database connection error"
```bash
# Check PostgreSQL is running
psql --version
# Verify server/.env has correct DB credentials
```

---

This comprehensive walkthrough covers all login scenarios in PowerFlex Pay. Each flow is secure, user-friendly, and enterprise-ready.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyToken, errorHandler } from './middleware/auth.js';

// Controllers
import * as authController from './controllers/authController.js';
import * as walletController from './controllers/walletController.js';
import * as fuelController from './controllers/fuelController.js';
import * as rewardsController from './controllers/rewardsController.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Auth routes (public)
app.post('/api/auth/signup-email', authController.signupEmail);
app.post('/api/auth/login-email', authController.loginEmail);
app.post('/api/auth/login-biometric', authController.loginBiometric);
app.post('/api/auth/login-corporate', authController.loginCorporate);

// Protected routes - Auth
app.get('/api/auth/user', verifyToken, authController.getCurrentUser);
app.post('/api/auth/logout', verifyToken, authController.logout);

// Protected routes - Wallet
app.get('/api/wallet', verifyToken, walletController.getWallet);
app.post('/api/wallet/topup', verifyToken, walletController.topupWallet);
app.get('/api/transactions', verifyToken, walletController.getTransactions);
app.post('/api/wallet/transfer', verifyToken, walletController.transferFunds);

// Protected routes - Fuel
app.get('/api/fuel-stations', verifyToken, fuelController.getFuelStations);
app.get('/api/fuel-stations/:stationId', verifyToken, fuelController.getStationDetails);
app.get('/api/fuel-stations/:stationId/prices', verifyToken, fuelController.getFuelPrices);
app.post('/api/fuel/purchase', verifyToken, fuelController.purchaseFuel);

// Protected routes - Rewards
app.get('/api/rewards/points', verifyToken, rewardsController.getPoints);
app.get('/api/rewards', verifyToken, rewardsController.getRewards);
app.post('/api/rewards/redeem', verifyToken, rewardsController.redeemReward);
app.get('/api/rewards/referrals', verifyToken, rewardsController.getReferrals);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[v0] PowerFlex Pay API running on http://localhost:${PORT}`);
});

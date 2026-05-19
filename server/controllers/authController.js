import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';

// Generate JWT token
const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
};

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Signup with email
export const signupEmail = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = uuidv4();
    const result = await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, auth_method, is_active, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING id, email, full_name, auth_method`,
      [userId, email, hashedPassword, fullName, 'email', true]
    );

    // Create wallet
    await pool.query(
      `INSERT INTO wallets (user_id, balance, available_balance, created_at) 
       VALUES ($1, $2, $3, NOW())`,
      [userId, 0, 0]
    );

    const token = generateToken(userId, email);

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: result.rows[0],
    });
  } catch (error) {
    console.error('[v0] Signup error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login with email
export const loginEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Get user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND auth_method = $2',
      [email, 'email']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const passwordMatch = await comparePassword(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        authMethod: user.auth_method,
      },
    });
  } catch (error) {
    console.error('[v0] Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Biometric login (no password)
export const loginBiometric = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    // Get user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = $2',
      [email, true]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    const token = generateToken(user.id, user.email);

    res.json({
      message: 'Biometric login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        authMethod: 'biometric',
      },
    });
  } catch (error) {
    console.error('[v0] Biometric login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Corporate login
export const loginCorporate = async (req, res) => {
  try {
    const { corporateEmail, corporateCode, employeeId } = req.body;

    if (!corporateEmail || !corporateCode || !employeeId) {
      return res.status(400).json({ error: 'Missing corporate credentials' });
    }

    // Get corporate user
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND auth_method = $2 AND account_type = $3`,
      [corporateEmail, 'corporate', 'corporate']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Corporate account not found' });
    }

    const user = result.rows[0];

    // Verify corporate code (simplified - in production, verify against corporate DB)
    if (user.corporate_code !== corporateCode) {
      return res.status(401).json({ error: 'Invalid corporate code' });
    }

    const token = generateToken(user.id, user.email);

    res.json({
      message: 'Corporate login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        accountType: 'corporate',
        authMethod: 'corporate',
      },
    });
  } catch (error) {
    console.error('[v0] Corporate login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT id, email, full_name, phone, account_type, auth_method, is_active, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('[v0] Get user error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Logout (optional - token invalidation)
export const logout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

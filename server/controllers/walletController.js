import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get wallet balance
export const getWallet = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT id, user_id, balance, available_balance, blocked_balance, last_updated FROM wallets WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({ wallet: result.rows[0] });
  } catch (error) {
    console.error('[v0] Get wallet error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Top up wallet
export const topupWallet = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, paymentMethod } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create transaction
    const transactionId = uuidv4();
    await pool.query(
      `INSERT INTO transactions (id, user_id, type, amount, status, payment_method, reference, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [transactionId, userId, 'topup', amount, 'completed', paymentMethod, transactionId]
    );

    // Update wallet
    const result = await pool.query(
      `UPDATE wallets 
       SET balance = balance + $1, available_balance = available_balance + $1, last_updated = NOW()
       WHERE user_id = $2
       RETURNING balance, available_balance`,
      [amount, userId]
    );

    res.json({
      message: 'Wallet topped up successfully',
      transaction: { id: transactionId, amount },
      wallet: result.rows[0],
    });
  } catch (error) {
    console.error('[v0] Topup error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get transactions
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 20, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, type, amount, status, payment_method, reference, created_at, description
       FROM transactions 
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    res.json({ transactions: result.rows });
  } catch (error) {
    console.error('[v0] Get transactions error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Transfer funds
export const transferFunds = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recipientEmail, amount, description } = req.body;

    if (!recipientEmail || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid transfer details' });
    }

    // Get recipient
    const recipientResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [recipientEmail]
    );

    if (recipientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const recipientId = recipientResult.rows[0].id;

    // Check sender balance
    const senderWallet = await pool.query(
      'SELECT available_balance FROM wallets WHERE user_id = $1',
      [userId]
    );

    if (senderWallet.rows[0].available_balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create transactions
    const transactionId = uuidv4();
    
    await pool.query(
      `INSERT INTO transactions (id, user_id, type, amount, status, description, reference, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [transactionId, userId, 'transfer_out', amount, 'completed', description, transactionId]
    );

    const recipientTransactionId = uuidv4();
    await pool.query(
      `INSERT INTO transactions (id, user_id, type, amount, status, description, reference, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [recipientTransactionId, recipientId, 'transfer_in', amount, 'completed', description, transactionId]
    );

    // Update wallets
    await pool.query(
      'UPDATE wallets SET balance = balance - $1, available_balance = available_balance - $1 WHERE user_id = $2',
      [amount, userId]
    );

    await pool.query(
      'UPDATE wallets SET balance = balance + $1, available_balance = available_balance + $1 WHERE user_id = $2',
      [amount, recipientId]
    );

    res.json({
      message: 'Transfer successful',
      transaction: { id: transactionId, amount, recipient: recipientEmail },
    });
  } catch (error) {
    console.error('[v0] Transfer error:', error);
    res.status(500).json({ error: error.message });
  }
};

import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get all fuel stations
export const getFuelStations = async (req, res) => {
  try {
    const { search, city, limit = 20, offset = 0 } = req.query;

    let query = 'SELECT * FROM fuel_stations WHERE is_active = true';
    const params = [];

    if (search) {
      query += ` AND (name ILIKE $${params.length + 1} OR brand ILIKE $${params.length + 2})`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (city) {
      query += ` AND city ILIKE $${params.length + 1}`;
      params.push(`%${city}%`);
    }

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({ stations: result.rows });
  } catch (error) {
    console.error('[v0] Get stations error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get fuel station details
export const getStationDetails = async (req, res) => {
  try {
    const { stationId } = req.params;

    const result = await pool.query(
      'SELECT * FROM fuel_stations WHERE id = $1',
      [stationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Station not found' });
    }

    res.json({ station: result.rows[0] });
  } catch (error) {
    console.error('[v0] Get station details error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get fuel prices
export const getFuelPrices = async (req, res) => {
  try {
    const { stationId } = req.params;

    const result = await pool.query(
      'SELECT fuel_type, price, updated_at FROM fuel_prices WHERE station_id = $1 ORDER BY updated_at DESC',
      [stationId]
    );

    res.json({ prices: result.rows });
  } catch (error) {
    console.error('[v0] Get prices error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Purchase fuel
export const purchaseFuel = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { stationId, litres, fuelType, paymentMethod } = req.body;

    if (!stationId || !litres || !fuelType) {
      return res.status(400).json({ error: 'Missing purchase details' });
    }

    // Get station and price
    const stationResult = await pool.query(
      'SELECT id, name, brand FROM fuel_stations WHERE id = $1',
      [stationId]
    );

    if (stationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Station not found' });
    }

    const priceResult = await pool.query(
      'SELECT price FROM fuel_prices WHERE station_id = $1 AND fuel_type = $2 ORDER BY updated_at DESC LIMIT 1',
      [stationId, fuelType]
    );

    if (priceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel price not found' });
    }

    const pricePerLitre = priceResult.rows[0].price;
    const totalAmount = litres * pricePerLitre;

    // Check wallet balance
    const walletResult = await pool.query(
      'SELECT available_balance FROM wallets WHERE user_id = $1',
      [userId]
    );

    if (walletResult.rows.length === 0 || walletResult.rows[0].available_balance < totalAmount) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // Create purchase order
    const orderId = uuidv4();
    await pool.query(
      `INSERT INTO fuel_orders (id, user_id, station_id, fuel_type, litres, total_amount, payment_method, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [orderId, userId, stationId, fuelType, litres, totalAmount, paymentMethod, 'completed']
    );

    // Create transaction
    const transactionId = uuidv4();
    await pool.query(
      `INSERT INTO transactions (id, user_id, type, amount, status, reference, description, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [transactionId, userId, 'fuel_purchase', totalAmount, 'completed', orderId, `${litres}L ${fuelType} at ${stationResult.rows[0].name}`]
    );

    // Deduct from wallet
    await pool.query(
      'UPDATE wallets SET balance = balance - $1, available_balance = available_balance - $1 WHERE user_id = $2',
      [totalAmount, userId]
    );

    // Award loyalty points
    const pointsEarned = Math.floor(totalAmount / 100); // 1 point per 100 currency
    await pool.query(
      `INSERT INTO loyalty_points (user_id, points, reason, created_at) 
       VALUES ($1, $2, $3, NOW())`,
      [userId, pointsEarned, `Fuel purchase: ${litres}L at ${stationResult.rows[0].brand}`]
    );

    res.json({
      message: 'Fuel purchased successfully',
      order: {
        id: orderId,
        station: stationResult.rows[0].name,
        litres,
        fuelType,
        amount: totalAmount,
        pointsEarned,
      },
    });
  } catch (error) {
    console.error('[v0] Purchase error:', error);
    res.status(500).json({ error: error.message });
  }
};

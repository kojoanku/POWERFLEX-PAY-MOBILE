import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get loyalty points
export const getPoints = async (req, res) => {
  try {
    const userId = req.user.userId;

    const pointsResult = await pool.query(
      `SELECT COALESCE(SUM(points), 0) as total_points FROM loyalty_points WHERE user_id = $1`,
      [userId]
    );

    const total = pointsResult.rows[0].total_points;

    // Get loyalty tier
    let tier = 'Bronze';
    if (total >= 5000) tier = 'Platinum';
    else if (total >= 3000) tier = 'Gold';
    else if (total >= 1000) tier = 'Silver';

    // Get breakdown
    const breakdownResult = await pool.query(
      `SELECT reason, SUM(points) as points FROM loyalty_points WHERE user_id = $1 GROUP BY reason`,
      [userId]
    );

    res.json({
      points: {
        total: total,
        tier,
        nextTier: tier === 'Platinum' ? null : (tier === 'Gold' ? 5000 : (tier === 'Silver' ? 3000 : 1000)),
        pointsToNextTier: tier === 'Platinum' ? 0 : (tier === 'Gold' ? 5000 - total : (tier === 'Silver' ? 3000 - total : 1000 - total)),
      },
      breakdown: breakdownResult.rows,
    });
  } catch (error) {
    console.error('[v0] Get points error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get available rewards
export const getRewards = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user points
    const pointsResult = await pool.query(
      `SELECT COALESCE(SUM(points), 0) as total_points FROM loyalty_points WHERE user_id = $1`,
      [userId]
    );

    const userPoints = pointsResult.rows[0].total_points;

    // Get all rewards
    const rewardsResult = await pool.query(
      'SELECT id, name, description, points_required, discount_percentage, category, is_active FROM rewards WHERE is_active = true ORDER BY points_required ASC'
    );

    const rewards = rewardsResult.rows.map(reward => ({
      ...reward,
      canRedeem: userPoints >= reward.points_required,
    }));

    res.json({ rewards });
  } catch (error) {
    console.error('[v0] Get rewards error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Redeem reward
export const redeemReward = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { rewardId } = req.body;

    // Get reward
    const rewardResult = await pool.query(
      'SELECT * FROM rewards WHERE id = $1',
      [rewardId]
    );

    if (rewardResult.rows.length === 0) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    const reward = rewardResult.rows[0];

    // Get user points
    const pointsResult = await pool.query(
      `SELECT COALESCE(SUM(points), 0) as total_points FROM loyalty_points WHERE user_id = $1`,
      [userId]
    );

    const userPoints = pointsResult.rows[0].total_points;

    if (userPoints < reward.points_required) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Create redemption record
    const redemptionId = uuidv4();
    await pool.query(
      `INSERT INTO reward_redemptions (id, user_id, reward_id, points_used, redeemed_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [redemptionId, userId, rewardId, reward.points_required]
    );

    // Deduct points
    await pool.query(
      `INSERT INTO loyalty_points (user_id, points, reason, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [userId, -reward.points_required, `Reward redeemed: ${reward.name}`]
    );

    res.json({
      message: 'Reward redeemed successfully',
      redemption: {
        id: redemptionId,
        reward: reward.name,
        discount: reward.discount_percentage,
        pointsUsed: reward.points_required,
      },
    });
  } catch (error) {
    console.error('[v0] Redeem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get referral status
export const getReferrals = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT COUNT(*) as total_referrals, COALESCE(SUM(reward_points), 0) as total_reward_points
       FROM referrals WHERE referrer_id = $1 AND status = 'completed'`,
      [userId]
    );

    res.json({
      referrals: {
        totalReferrals: result.rows[0].total_referrals,
        totalRewardPoints: result.rows[0].total_reward_points,
        referralCode: `PFP-${userId.slice(0, 8).toUpperCase()}`,
      },
    });
  } catch (error) {
    console.error('[v0] Get referrals error:', error);
    res.status(500).json({ error: error.message });
  }
};

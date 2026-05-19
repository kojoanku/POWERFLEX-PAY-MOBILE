-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  auth_method VARCHAR(50) NOT NULL DEFAULT 'email',
  account_type VARCHAR(50) DEFAULT 'personal',
  corporate_code VARCHAR(100),
  kyc_status VARCHAR(50) DEFAULT 'pending',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_auth_method (auth_method)
);

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  balance DECIMAL(15, 2) DEFAULT 0,
  available_balance DECIMAL(15, 2) DEFAULT 0,
  blocked_balance DECIMAL(15, 2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  reference VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- Fuel stations table
CREATE TABLE IF NOT EXISTS fuel_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  rating DECIMAL(3, 2) DEFAULT 4.5,
  total_reviews INTEGER DEFAULT 0,
  operating_hours VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_brand (brand),
  INDEX idx_city (city),
  INDEX idx_active (is_active)
);

-- Fuel prices table
CREATE TABLE IF NOT EXISTS fuel_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station_id UUID NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (station_id) REFERENCES fuel_stations(id) ON DELETE CASCADE,
  INDEX idx_station_id (station_id),
  INDEX idx_fuel_type (fuel_type),
  INDEX idx_updated_at (updated_at)
);

-- Fuel orders table
CREATE TABLE IF NOT EXISTS fuel_orders (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  station_id UUID NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  litres DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(15, 2) NOT NULL,
  payment_method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (station_id) REFERENCES fuel_stations(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_station_id (station_id),
  INDEX idx_created_at (created_at)
);

-- Loyalty points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  points INTEGER NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  discount_percentage DECIMAL(5, 2),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_points_required (points_required),
  INDEX idx_active (is_active)
);

-- Reward redemptions table
CREATE TABLE IF NOT EXISTS reward_redemptions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  reward_id UUID NOT NULL,
  points_used INTEGER NOT NULL,
  redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reward_id) REFERENCES rewards(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_redeemed_at (redeemed_at)
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL,
  referred_email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  reward_points INTEGER DEFAULT 500,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_referrer_id (referrer_id),
  INDEX idx_status (status)
);

-- KYC table
CREATE TABLE IF NOT EXISTS kyc_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  id_type VARCHAR(50),
  id_number VARCHAR(100),
  date_of_birth DATE,
  nationality VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

-- Sample data
INSERT INTO fuel_stations (id, name, brand, address, city, latitude, longitude, rating, total_reviews) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Shell Osu', 'Shell', 'Osu, Accra', 'Accra', 5.5597, -0.1857, 4.7, 234),
  ('550e8400-e29b-41d4-a716-446655440001', 'Total Spesco', 'Total', 'Spesco, Accra', 'Accra', 5.5614, -0.1945, 4.5, 189),
  ('550e8400-e29b-41d4-a716-446655440002', 'Vivo Energy Tse', 'Vivo Energy', 'Tse, Accra', 'Accra', 5.5475, -0.1766, 4.6, 156),
  ('550e8400-e29b-41d4-a716-446655440003', 'Goil Cantonments', 'Goil', 'Cantonments, Accra', 'Accra', 5.5539, -0.1887, 4.4, 142);

INSERT INTO fuel_prices (station_id, fuel_type, price) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Premium 95', 28.50),
  ('550e8400-e29b-41d4-a716-446655440000', 'Premium 97', 29.50),
  ('550e8400-e29b-41d4-a716-446655440000', 'Diesel', 27.00),
  ('550e8400-e29b-41d4-a716-446655440001', 'Premium 95', 28.30),
  ('550e8400-e29b-41d4-a716-446655440001', 'Premium 97', 29.30),
  ('550e8400-e29b-41d4-a716-446655440001', 'Diesel', 26.80);

INSERT INTO rewards (id, name, description, points_required, discount_percentage, category) VALUES
  ('650e8400-e29b-41d4-a716-446655440000', '5% Fuel Discount', 'Get 5% discount on your next purchase', 500, 5, 'fuel'),
  ('650e8400-e29b-41d4-a716-446655440001', '10% Fuel Discount', 'Get 10% discount on your next purchase', 1000, 10, 'fuel'),
  ('650e8400-e29b-41d4-a716-446655440002', 'Free Car Wash', 'Get a free car wash at partner stations', 300, 0, 'service'),
  ('650e8400-e29b-41d4-a716-446655440003', '500 Cedis Wallet Credit', 'Receive 500 Cedis credit to your wallet', 2000, 0, 'wallet');

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API request wrapper
export const apiCall = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token && !endpoint.includes('/auth/')) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('[v0] API Error:', error);
    throw error;
  }
};

// Auth services
export const authService = {
  // Email signup
  signupEmail: async (email, password, fullName) => {
    return apiCall('/api/auth/signup-email', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
  },

  // Email login
  loginEmail: async (email, password) => {
    const response = await apiCall('/api/auth/login-email', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  // Biometric login
  loginBiometric: async (email) => {
    const response = await apiCall('/api/auth/login-biometric', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  // Corporate login
  loginCorporate: async (corporateEmail, corporateCode, employeeId) => {
    const response = await apiCall('/api/auth/login-corporate', {
      method: 'POST',
      body: JSON.stringify({ corporateEmail, corporateCode, employeeId }),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    return apiCall('/api/auth/user', { method: 'GET' });
  },

  // Logout
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return apiCall('/api/auth/logout', { method: 'POST' });
  },

  // Check if logged in
  isLoggedIn: () => !!getToken(),

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Wallet services
export const walletService = {
  // Get wallet
  getWallet: async () => {
    return apiCall('/api/wallet', { method: 'GET' });
  },

  // Top up wallet
  topupWallet: async (amount, paymentMethod) => {
    return apiCall('/api/wallet/topup', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethod }),
    });
  },

  // Get transactions
  getTransactions: async (limit = 20, offset = 0) => {
    return apiCall(`/api/transactions?limit=${limit}&offset=${offset}`, {
      method: 'GET',
    });
  },

  // Transfer funds
  transferFunds: async (recipientEmail, amount, description) => {
    return apiCall('/api/wallet/transfer', {
      method: 'POST',
      body: JSON.stringify({ recipientEmail, amount, description }),
    });
  },
};

// Fuel services
export const fuelService = {
  // Get fuel stations
  getFuelStations: async (search = '', city = '', limit = 20, offset = 0) => {
    const params = new URLSearchParams({ search, city, limit, offset });
    return apiCall(`/api/fuel-stations?${params}`, { method: 'GET' });
  },

  // Get station details
  getStationDetails: async (stationId) => {
    return apiCall(`/api/fuel-stations/${stationId}`, { method: 'GET' });
  },

  // Get fuel prices
  getFuelPrices: async (stationId) => {
    return apiCall(`/api/fuel-stations/${stationId}/prices`, { method: 'GET' });
  },

  // Purchase fuel
  purchaseFuel: async (stationId, litres, fuelType, paymentMethod) => {
    return apiCall('/api/fuel/purchase', {
      method: 'POST',
      body: JSON.stringify({ stationId, litres, fuelType, paymentMethod }),
    });
  },
};

// Rewards services
export const rewardsService = {
  // Get loyalty points
  getPoints: async () => {
    return apiCall('/api/rewards/points', { method: 'GET' });
  },

  // Get available rewards
  getRewards: async () => {
    return apiCall('/api/rewards', { method: 'GET' });
  },

  // Redeem reward
  redeemReward: async (rewardId) => {
    return apiCall('/api/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ rewardId }),
    });
  },

  // Get referrals
  getReferrals: async () => {
    return apiCall('/api/rewards/referrals', { method: 'GET' });
  },
};

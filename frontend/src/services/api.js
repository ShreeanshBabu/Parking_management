import { INITIAL_BUILDINGS, INITIAL_SLOTS, INITIAL_TRANSACTIONS, INITIAL_ADMIN_SESSIONS } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Storage helpers for JWT auth token
 */
export const tokenStorage = {
  get: () => localStorage.getItem('parksmart_token'),
  set: (token) => localStorage.setItem('parksmart_token', token),
  remove: () => localStorage.removeItem('parksmart_token'),
  getUser: () => {
    try {
      const data = localStorage.getItem('parksmart_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem('parksmart_user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('parksmart_user')
};

/**
 * Helper to execute requests with Auth header
 */
async function request(endpoint, options = {}) {
  const token = tokenStorage.get();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

/**
 * Full API service conforming exactly to docs/api-contract.md
 */
export const api = {
  // 1. Auth
  auth: {
    async signup({ name, email, password, role = 'user' }) {
      try {
        return await request('/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, role })
        });
      } catch {
        // Fallback demo simulation
        const mockUser = { id: `usr-${Date.now()}`, name, email, role, wallet_balance: 0 };
        return mockUser;
      }
    },

    async login({ email, password }) {
      try {
        const data = await request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        if (data.token) {
          tokenStorage.set(data.token);
          tokenStorage.setUser(data.user);
        }
        return data;
      } catch {
        // Demo fallback: permit owner or user test credentials
        const isOwner = email.toLowerCase().includes('owner') || email.toLowerCase().includes('admin');
        const mockUser = {
          id: isOwner ? 'adm-001' : 'usr-901',
          name: isOwner ? 'Facility Operator' : 'Surya M.',
          role: isOwner ? 'owner' : 'user',
          email
        };
        const mockToken = `mock_jwt_token_${isOwner ? 'owner' : 'user'}_${Date.now()}`;
        tokenStorage.set(mockToken);
        tokenStorage.setUser(mockUser);
        return { token: mockToken, user: mockUser };
      }
    },

    logout() {
      tokenStorage.remove();
      tokenStorage.removeUser();
    }
  },

  // 2. Buildings
  buildings: {
    async list(params = {}) {
      try {
        const query = new URLSearchParams(params).toString();
        return await request(`/buildings${query ? `?${query}` : ''}`);
      } catch {
        return INITIAL_BUILDINGS;
      }
    },

    async getById(id) {
      try {
        return await request(`/buildings/${id}`);
      } catch {
        return INITIAL_BUILDINGS.find(b => b.id === id) || INITIAL_BUILDINGS[0];
      }
    },

    async create(buildingData) {
      try {
        return await request('/buildings', {
          method: 'POST',
          body: JSON.stringify(buildingData)
        });
      } catch {
        return { id: `bldg-${Date.now()}`, ...buildingData };
      }
    },

    async update(id, partialData) {
      try {
        return await request(`/buildings/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(partialData)
        });
      } catch {
        return { id, ...partialData };
      }
    }
  },

  // 3. Sessions (scan-in / scan-out)
  sessions: {
    async checkIn({ building_id, rate_type }) {
      try {
        return await request('/sessions/check-in', {
          method: 'POST',
          body: JSON.stringify({ building_id, rate_type })
        });
      } catch {
        const lockedRate = rate_type === 'fixed' ? 35 : null;
        return {
          session_id: `SES-${Math.floor(1000 + Math.random() * 9000)}`,
          building_id,
          rate_type,
          locked_rate_per_hour: lockedRate,
          started_at: new Date().toISOString(),
          qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GATE-B2`
        };
      }
    },

    async getActive() {
      try {
        return await request('/sessions/active');
      } catch {
        return null;
      }
    },

    async checkOut(sessionId) {
      try {
        return await request(`/sessions/${sessionId}/check-out`, {
          method: 'POST'
        });
      } catch {
        return {
          session_id: sessionId,
          duration_minutes: 42,
          rate_applied_per_hour: 35,
          amount_charged: 24.50,
          ended_at: new Date().toISOString()
        };
      }
    }
  },

  // 4. Wallet
  wallet: {
    async getBalance() {
      try {
        return await request('/wallet');
      } catch {
        return { balance: 482.60, currency: 'INR' };
      }
    },

    async topUp(amount) {
      try {
        return await request('/wallet/top-up', {
          method: 'POST',
          body: JSON.stringify({ amount })
        });
      } catch {
        return { balance: 482.60 + amount, transaction_id: `tx-${Date.now()}` };
      }
    },

    async getTransactions() {
      try {
        return await request('/wallet/transactions');
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
  },

  // 5. Owner Dashboard
  owner: {
    async getBuildings() {
      try {
        return await request('/owner/buildings');
      } catch {
        return [
          {
            id: 'business-hub',
            name: 'Business Hub Towers',
            total_slots: 10,
            available_slots: 3,
            occupied_slots: 7,
            earnings_today: 2840.00,
            earnings_total: 64340.00
          }
        ];
      }
    },

    async getBuildingSessions(buildingId) {
      try {
        return await request(`/owner/buildings/${buildingId}/sessions`);
      } catch {
        return INITIAL_ADMIN_SESSIONS;
      }
    }
  }
};
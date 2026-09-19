import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, tokenStorage } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => tokenStorage.getUser());
  const [token, setToken] = useState(() => tokenStorage.get());
  const [loading, setLoading] = useState(false);

  // Sync state with storage on startup
  useEffect(() => {
    const savedUser = tokenStorage.getUser();
    const savedToken = tokenStorage.get();
    if (savedToken && savedUser) {
      setCurrentUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.auth.login({ email, password });
      setToken(data.token);
      setCurrentUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    setToken(null);
    setCurrentUser(null);
  };

  const isOwner = currentUser?.role === 'owner' || currentUser?.role === 'admin';
  const isAuthenticated = !!token && !!currentUser;

  return (
    <AuthContext.Provider value={{
      user: currentUser || { name: 'Surya M.', email: 'surya.m@parksmart.io', vehiclePlate: 'KA 01 MJ 7291', vehicleModel: 'Tesla Model 3' },
      currentUser,
      token,
      loading,
      login,
      logout,
      isOwner,
      isAuthenticated,
      updateVehicle: (plate, model) => {
        setCurrentUser(prev => prev ? { ...prev, vehiclePlate: plate, vehicleModel: model } : null);
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginSelectionPage } from './pages/auth/LoginSelectionPage';
import { UserLayout } from './components/layout/UserLayout';
import { UserHome } from './pages/user/UserHome';
import { ExploreMap } from './pages/user/ExploreMap';
import { ParkingDetails } from './pages/user/ParkingDetails';
import { ActiveSession } from './pages/user/ActiveSession';
import { Wallet } from './pages/user/Wallet';
import { Profile } from './pages/user/Profile';

import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminParking } from './pages/admin/AdminParking';
import { AdminSessions } from './pages/admin/AdminSessions';
import { AdminPricing } from './pages/admin/AdminPricing';
import { AdminEarnings } from './pages/admin/AdminEarnings';
import { AdminSettings } from './pages/admin/AdminSettings';

import { Toast } from './components/common/Toast';

export function App() {
  return (
    <>
      <Routes>
        {/* 1. PUBLIC LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. PUBLIC LOGIN SELECTION PAGE */}
        <Route path="/login" element={<LoginSelectionPage />} />
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />

        {/* 3. USER MOBILE APPLICATION */}
        <Route path="/app" element={<UserLayout />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<UserHome />} />
          <Route path="explore" element={<ExploreMap />} />
          <Route path="parking/:id" element={<ParkingDetails />} />
          <Route path="session" element={<ActiveSession />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 4. PROTECTED RENTER / ADMIN APPLICATION */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="parking" element={<AdminParking />} />
          <Route path="sessions" element={<AdminSessions />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="earnings" element={<AdminEarnings />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Notifications */}
      <Toast />
    </>
  );
}

export default App;

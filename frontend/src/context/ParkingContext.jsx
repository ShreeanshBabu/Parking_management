import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { INITIAL_BUILDINGS, INITIAL_SLOTS, INITIAL_TRANSACTIONS, INITIAL_ADMIN_SESSIONS } from '../services/mockData';
import { calculateSessionCost } from '../services/pricingEngine';

const ParkingContext = createContext();

export function ParkingProvider({ children }) {
  const [buildings, setBuildings] = useState(INITIAL_BUILDINGS);
  const [selectedBuildingId, setSelectedBuildingId] = useState('business-hub');
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [walletBalance, setWalletBalance] = useState(482.60);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [adminSessions, setAdminSessions] = useState(INITIAL_ADMIN_SESSIONS);
  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pricing rules for admin
  const [pricingRules, setPricingRules] = useState({
    baseRate: 32,
    fixedRatePremium: 10,
    lowDemandDiscount: 20,
    highDemandSurge: 30,
    weekendSurge: 15,
    peakHourSurge: 10,
    peakHoursEnabled: true,
  });

  // Active user session
  const [activeSession, setActiveSession] = useState({
    id: 'SES-9421',
    buildingId: 'business-hub',
    buildingName: 'Business Hub',
    address: '42 Inner Ring Road, Tech Corridor',
    slot: 'B-17',
    startTime: Date.now() - (42 * 60 * 1000 + 18 * 1000),
    rateType: 'fixed',
    ratePerHour: 35,
    initialRate: 35,
    vehiclePlate: 'KA 01 MJ 7291',
    status: 'active'
  });

  // Live calculated cost and duration for ongoing session
  const [sessionCostInfo, setSessionCostInfo] = useState({
    elapsedMs: 0,
    totalCost: 22.40,
    formattedDuration: '00:42:18'
  });

  // Fetch initial data from backend if reachable
  useEffect(() => {
    async function loadData() {
      try {
        const bldgs = await api.buildings.list();
        if (bldgs && bldgs.length > 0) setBuildings(bldgs);
      } catch (err) {
        console.warn('Using local demo buildings');
      }
    }
    loadData();
  }, []);

  // Timer loop for active session cost & duration
  useEffect(() => {
    if (!activeSession || activeSession.status !== 'active') return;

    const interval = setInterval(() => {
      const selectedBldg = buildings.find(b => b.id === activeSession.buildingId);
      const currentFloatRate = selectedBldg ? selectedBldg.floatingRate : 32;

      const cost = calculateSessionCost(
        activeSession.startTime,
        activeSession.ratePerHour,
        activeSession.rateType === 'fixed',
        currentFloatRate
      );

      setSessionCostInfo(cost);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, buildings]);

  // Start new session (Scan In)
  const startSession = async ({ buildingId, rateType, slot = 'B-17', vehiclePlate = 'KA 01 MJ 7291' }) => {
    const building = buildings.find(b => b.id === buildingId) || buildings[0];
    const rate = rateType === 'fixed' ? building.fixedRate : building.floatingRate;
    
    // Attempt backend check-in
    try {
      await api.sessions.checkIn({ building_id: buildingId, rate_type: rateType });
    } catch (err) {
      console.warn('Backend check-in fallback:', err);
    }

    const newSession = {
      id: `SES-${Math.floor(1000 + Math.random() * 9000)}`,
      buildingId: building.id,
      buildingName: building.name,
      address: building.address,
      slot: slot,
      startTime: Date.now(),
      rateType,
      ratePerHour: rate,
      initialRate: rate,
      vehiclePlate,
      status: 'active'
    };

    setActiveSession(newSession);

    // Update building available count
    setBuildings(prev => prev.map(b => {
      if (b.id === buildingId && b.availableSlots > 0) {
        return { ...b, availableSlots: b.availableSlots - 1 };
      }
      return b;
    }));

    // Update slot status
    setSlots(prev => prev.map(s => {
      if (s.id === slot.replace('-', '')) {
        return { ...s, status: 'occupied', vehiclePlate, rateType, rate };
      }
      return s;
    }));

    // Add to admin live sessions
    setAdminSessions(prev => [
      {
        id: newSession.id,
        user: 'Surya M.',
        vehiclePlate,
        building: building.name,
        slot,
        checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationMinutes: 1,
        rateType,
        currentRate: rate,
        accruedAmount: 0.50,
        status: 'active'
      },
      ...prev
    ]);

    showToast(`Checked in at ${building.name} (${slot})`);
    return newSession;
  };

  // End active session (Scan Out)
  const endSession = async () => {
    if (!activeSession) return null;

    const finalCost = sessionCostInfo.totalCost || 22.40;
    const finalDuration = sessionCostInfo.formattedDuration || '00:42:18';

    // Attempt backend checkout
    try {
      await api.sessions.checkOut(activeSession.id);
    } catch (err) {
      console.warn('Backend check-out fallback:', err);
    }

    // Deduct from wallet
    setWalletBalance(prev => {
      const remaining = Number((prev - finalCost).toFixed(2));
      return remaining >= 0 ? remaining : 0;
    });

    // Add transaction
    const newTx = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      type: 'debit',
      title: `Parking at ${activeSession.buildingName}`,
      slot: activeSession.slot,
      duration: finalDuration,
      rateType: `${activeSession.rateType === 'fixed' ? 'Fixed' : 'Floating'} (₹${activeSession.ratePerHour}/hr)`,
      amount: finalCost,
      date: 'Just now',
      status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);

    // Free up building slot
    setBuildings(prev => prev.map(b => {
      if (b.id === activeSession.buildingId && b.availableSlots < b.totalSlots) {
        return { ...b, availableSlots: b.availableSlots + 1 };
      }
      return b;
    }));

    // Update slot
    const slotKey = activeSession.slot.replace('-', '');
    setSlots(prev => prev.map(s => {
      if (s.id === slotKey) {
        return { ...s, status: 'available', vehiclePlate: null, rateType: null };
      }
      return s;
    }));

    // Mark admin session completed
    setAdminSessions(prev => prev.map(s => {
      if (s.id === activeSession.id) {
        return { ...s, status: 'completed', accruedAmount: finalCost };
      }
      return s;
    }));

    const finishedSessionSummary = {
      ...activeSession,
      finalCost,
      finalDuration,
      completedAt: new Date()
    };

    setActiveSession(null);
    showToast(`Session completed. ₹${finalCost.toFixed(2)} debited.`);
    return finishedSessionSummary;
  };

  // Top up wallet
  const topupWallet = async (amount) => {
    try {
      await api.wallet.topUp(amount);
    } catch (err) {
      console.warn('Backend wallet top-up fallback:', err);
    }

    setWalletBalance(prev => Number((prev + amount).toFixed(2)));
    const newTx = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      type: 'credit',
      title: 'Wallet Top-Up',
      method: 'UPI / Instant Pay',
      amount,
      date: 'Just now',
      status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Added ₹${amount} to wallet.`);
  };

  // Admin slot toggle
  const toggleSlotStatus = (slotId, newStatus) => {
    setSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        return { ...s, status: newStatus };
      }
      return s;
    }));
    showToast(`Slot ${slotId} updated to ${newStatus}`);
  };

  // Toast helper
  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId) || buildings[0];

  return (
    <ParkingContext.Provider value={{
      buildings,
      selectedBuilding,
      setSelectedBuildingId,
      slots,
      activeSession,
      sessionCostInfo,
      walletBalance,
      transactions,
      adminSessions,
      pricingRules,
      setPricingRules,
      startSession,
      endSession,
      topupWallet,
      toggleSlotStatus,
      toastMessage,
      showToast,
      loading
    }}>
      {children}
    </ParkingContext.Provider>
  );
}

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) throw new Error('useParking must be used within ParkingProvider');
  return context;
};
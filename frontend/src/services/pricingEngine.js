/**
 * Dynamic Pricing Engine for Park Smart
 * Calculates Fixed vs Floating rates, surge multipliers, and estimated costs.
 */

export const PRICING_CONFIG = {
  baseRateDefault: 32,
  fixedPremiumPercent: 10, // Fixed rate has ~10% premium for rate certainty
  lowDemandDiscountPercent: 15,
  highDemandSurgePercent: 30,
  peakHours: [
    { start: 8, end: 11 },   // Morning office shift
    { start: 17, end: 21 },  // Evening dining/night shift
  ],
  weekendMultiplier: 1.15
};

export function calculateFloatingRate({ baseRate = 32, occupancyRate = 0.72, isWeekend = false, hour = new Date().getHours() }) {
  let multiplier = 1.0;

  // Occupancy based curve
  if (occupancyRate < 0.4) {
    multiplier -= 0.20; // 20% discount for low demand (e.g. ₹25/hr)
  } else if (occupancyRate > 0.85) {
    multiplier += 0.35; // 35% surge for very high demand (e.g. ₹43/hr)
  } else if (occupancyRate > 0.70) {
    multiplier += 0.10; // 10% mild surge (e.g. ₹35/hr)
  }

  // Peak hours multiplier
  const isPeak = PRICING_CONFIG.peakHours.some(p => hour >= p.start && hour < p.end);
  if (isPeak) {
    multiplier += 0.10;
  }

  // Weekend multiplier
  if (isWeekend) {
    multiplier *= PRICING_CONFIG.weekendMultiplier;
  }

  // Round to nearest whole rupee
  const calculated = Math.round(baseRate * multiplier);
  return Math.max(20, calculated);
}

export function calculateFixedRate(baseRate = 32) {
  // Fixed rate is base rate + predictable risk premium (~10%)
  return Math.ceil(baseRate * (1 + PRICING_CONFIG.fixedPremiumPercent / 100));
}

export function calculateSessionCost(startTimeMs, ratePerHour, isFixed = true, currentFloatingRate = null) {
  const elapsedMs = Math.max(0, Date.now() - startTimeMs);
  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  const effectiveRate = isFixed ? ratePerHour : (currentFloatingRate || ratePerHour);
  const totalCost = elapsedHours * effectiveRate;
  
  return {
    elapsedMs,
    elapsedHours,
    effectiveRate,
    totalCost: Number(totalCost.toFixed(2)),
    formattedDuration: formatDuration(elapsedMs)
  };
}

export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

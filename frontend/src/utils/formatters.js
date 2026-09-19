/**
 * Safe currency formatter for Indian Rupee with locale formatting
 */
export function formatCurrency(amount, includeDecimals = false) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return includeDecimals ? '₹0.00' : '₹0';
  }
  const num = Number(amount);
  if (includeDecimals) {
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

export function formatRate(rate) {
  if (rate === null || rate === undefined || isNaN(rate)) {
    return '₹0/hr';
  }
  return `₹${Number(rate)}/hr`;
}

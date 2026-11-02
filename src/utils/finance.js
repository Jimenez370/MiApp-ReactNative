export function formatMXN(value, decimals = 0) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function shortDate(date) {
  return new Date(date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
  });
}

export function monthTitle(date = new Date()) {
  const value = date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function isCurrentMonth(value, today = new Date()) {
  const date = new Date(value);
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
}

export function sumAmounts(items, type) {
  return items.reduce((total, item) => total + (item.type === type ? item.amount : 0), 0);
}

export function amountByCategory(items, category) {
  return items.reduce((total, item) =>
    total + (item.type === 'expense' && item.category === category ? item.amount : 0), 0);
}

export function clampPercent(value) {
  return Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
}

export function weeklyExpenseTotals(items) {
  const totals = [0, 0, 0, 0, 0];
  items.filter(item => item.type === 'expense').forEach(item => {
    const week = Math.min(4, Math.floor((new Date(item.date).getDate() - 1) / 7));
    totals[week] += item.amount;
  });
  return totals;
}

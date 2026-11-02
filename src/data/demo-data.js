// Datos ficticios: no representan cuentas bancarias ni movimientos reales.
export const startingBalance = 4200;

const today = new Date();
const dateInCurrentMonth = (daysAgo) =>
  new Date(today.getFullYear(), today.getMonth(), Math.max(1, today.getDate() - daysAgo), 12).toISOString();

export const demoTransactions = [
  { id: 'm01', title: 'Nómina quincenal', category: 'nomina', type: 'income', amount: 18500, date: dateInCurrentMonth(9) },
  { id: 'm02', title: 'Proyecto freelance', category: 'extra', type: 'income', amount: 5200, date: dateInCurrentMonth(6) },
  { id: 'm03', title: 'Reembolso', category: 'extra', type: 'income', amount: 800, date: dateInCurrentMonth(3) },
  { id: 'm04', title: 'Renta del departamento', category: 'vivienda', type: 'expense', amount: 6200, date: dateInCurrentMonth(8) },
  { id: 'm05', title: 'Supermercado', category: 'alimentacion', type: 'expense', amount: 1850, date: dateInCurrentMonth(4) },
  { id: 'm06', title: 'Café de la mañana', category: 'alimentacion', type: 'expense', amount: 185, date: dateInCurrentMonth(0) },
  { id: 'm07', title: 'Uber', category: 'transporte', type: 'expense', amount: 148, date: dateInCurrentMonth(1) },
  { id: 'm08', title: 'Internet en casa', category: 'servicios', type: 'expense', amount: 499, date: dateInCurrentMonth(2) },
  { id: 'm09', title: 'Spotify', category: 'entretenimiento', type: 'expense', amount: 129, date: dateInCurrentMonth(5) },
  { id: 'm10', title: 'Gimnasio', category: 'salud', type: 'expense', amount: 599, date: dateInCurrentMonth(7) },
  { id: 'm11', title: 'Farmacia', category: 'salud', type: 'expense', amount: 312, date: dateInCurrentMonth(3) },
  { id: 'm12', title: 'Comida con amigos', category: 'alimentacion', type: 'expense', amount: 420, date: dateInCurrentMonth(2) },
];

export const demoBudgets = [
  { id: 'alimentacion', limit: 4000, color: '#E6AA60' },
  { id: 'transporte', limit: 1500, color: '#7799C8' },
  { id: 'vivienda', limit: 7000, color: '#639DC7' },
  { id: 'entretenimiento', limit: 1800, color: '#A48BCB' },
  { id: 'servicios', limit: 1800, color: '#58B6AA' },
  { id: 'salud', limit: 1500, color: '#D48B91' },
];

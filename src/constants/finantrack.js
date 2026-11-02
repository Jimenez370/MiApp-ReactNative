export const palette = {
  background: '#F5F7F8',
  surface: '#FFFFFF',
  ink: '#102938',
  inkMuted: '#71808B',
  navy: '#102B3A',
  teal: '#127D6C',
  tealSoft: '#E1F4ED',
  green: '#179B70',
  red: '#D45D68',
  redSoft: '#FCEAEC',
  border: '#E7ECEF',
  blueSoft: '#E5F0FA',
  gold: '#F5BB63',
  track: '#ECF0F2',
};

export const categories = {
  nomina: { name: 'Nómina', emoji: '💼', color: '#E8F3FC' },
  extra: { name: 'Ingresos extra', emoji: '✨', color: '#E2F5EB' },
  alimentacion: { name: 'Alimentación', emoji: '🛒', color: '#FFF0DA' },
  transporte: { name: 'Transporte', emoji: '🚗', color: '#E7EEFA' },
  vivienda: { name: 'Vivienda', emoji: '🏠', color: '#E8F2F9' },
  entretenimiento: { name: 'Entretenimiento', emoji: '🎬', color: '#F1E9FA' },
  servicios: { name: 'Servicios', emoji: '💡', color: '#E4F5F5' },
  salud: { name: 'Salud', emoji: '💊', color: '#FBE9EC' },
  otros: { name: 'Otros', emoji: '📦', color: '#EFF0F2' },
};

export const incomeCategoryIds = ['nomina', 'extra', 'otros'];
export const expenseCategoryIds = [
  'alimentacion', 'transporte', 'vivienda', 'entretenimiento',
  'servicios', 'salud', 'otros',
];

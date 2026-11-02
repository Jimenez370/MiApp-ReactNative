import React from 'react';
import { SymbolView } from 'expo-symbols';

// SF Symbols nativos de iOS. FinanTrack está configurado solo para iPhone.
export function FinanceIcon({ name, size = 20, color = '#102938', weight = 'medium' }) {
  return <SymbolView name={name} size={size} tintColor={color} weight={weight} />;
}

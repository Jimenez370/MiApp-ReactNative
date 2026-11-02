import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FinancesProvider } from '@/context/finances-context';
import AppTabs from '@/components/app-tabs';
import TransactionModal from '@/components/finantrack/transaction-modal';

export default function RootLayout() {
  return (
    <FinancesProvider>
      <StatusBar style="dark" />
      <AppTabs />
      <TransactionModal />
    </FinancesProvider>
  );
}

import React, { createContext, useContext, useMemo, useState } from 'react';
import { demoTransactions, demoBudgets, startingBalance } from '@/data/demo-data';
import { isCurrentMonth, sumAmounts } from '@/utils/finance';

const FinancesContext = createContext(null);

export function FinancesProvider({ children }) {
  const [transactions, setTransactions] = useState(demoTransactions);
  const [entryType, setEntryType] = useState(null);

  const summary = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    const monthly = sorted.filter(item => isCurrentMonth(item.date));
    const monthlyIncome = sumAmounts(monthly, 'income');
    const monthlyExpenses = sumAmounts(monthly, 'expense');
    const incomeTotal = sumAmounts(sorted, 'income');
    const expenseTotal = sumAmounts(sorted, 'expense');
    return {
      sorted, monthly, monthlyIncome, monthlyExpenses,
      balance: startingBalance + incomeTotal - expenseTotal,
      savings: monthlyIncome - monthlyExpenses,
    };
  }, [transactions]);

  function addTransaction({ title, amount, category, type }) {
    const value = Number(amount);
    if (!title.trim() || !Number.isFinite(value) || value <= 0) return false;
    setTransactions(current => [{
      id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      title: title.trim(),
      amount: Math.round(value * 100) / 100,
      category,
      type,
      date: new Date().toISOString(),
    }, ...current]);
    setEntryType(null);
    return true;
  }

  return (
    <FinancesContext.Provider value={{
      ...summary, budgets: demoBudgets, addTransaction, entryType, setEntryType,
    }}>
      {children}
    </FinancesContext.Provider>
  );
}

export function useFinances() {
  const context = useContext(FinancesContext);
  if (!context) throw new Error('useFinances debe usarse dentro de FinancesProvider');
  return context;
}

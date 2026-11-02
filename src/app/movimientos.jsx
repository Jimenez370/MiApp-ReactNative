import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/constants/finantrack';
import { useFinances } from '@/context/finances-context';
import { formatMXN, monthTitle } from '@/utils/finance';
import { EmptyState, Header, Screen, SectionHeading, TransactionRow } from '@/components/finantrack/ui';

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Ingresos', value: 'income' },
  { label: 'Gastos', value: 'expense' },
];

export default function MovementsScreen() {
  const { sorted, monthlyIncome, monthlyExpenses, setEntryType } = useFinances();
  const [filter, setFilter] = useState('all');
  const items = useMemo(() => sorted.filter(item => filter === 'all' || item.type === filter), [sorted, filter]);

  return (
    <Screen>
      <Header eyebrow="HISTORIAL FINANCIERO" title="Movimientos" subtitle="Cada peso cuenta. Aquí puedes verlo." />
      <View style={styles.summary}>
        <View><Text style={styles.summaryLabel}>INGRESOS · {monthTitle().toUpperCase()}</Text><Text style={styles.income}>{formatMXN(monthlyIncome)}</Text></View>
        <View style={styles.divider} />
        <View><Text style={styles.summaryLabel}>GASTOS DEL MES</Text><Text style={styles.expenses}>{formatMXN(monthlyExpenses)}</Text></View>
      </View>
      <View style={styles.controls}>
        <View style={styles.filters}>
          {filters.map(option => (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected: filter === option.value }}
              style={[styles.filter, filter === option.value && styles.activeFilter]}
              onPress={() => setFilter(option.value)}>
              <Text style={[styles.filterText, filter === option.value && styles.activeText]}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.add} onPress={() => setEntryType('expense')} accessibilityRole="button" accessibilityLabel="Agregar movimiento">
          <Text style={styles.addText}>＋</Text>
        </Pressable>
      </View>
      <SectionHeading title="Historial" />
      <View style={styles.list}>
        {items.length ? items.map((item, i) =>
          <TransactionRow key={item.id} item={item} showBorder={i !== items.length - 1} />
        ) : <EmptyState message="No hay movimientos con este filtro." />}
      </View>
      <Text style={styles.note}>Desliza para ver todos los movimientos de demostración.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: palette.navy, paddingHorizontal: 18, paddingVertical: 22, borderRadius: 22, marginBottom: 23, gap: 8 },
  summaryLabel: { color: '#9CB7BE', letterSpacing: 0.55, fontSize: 9, fontWeight: '800' },
  income: { color: '#B6EED9', fontSize: 19, fontWeight: '800', marginTop: 6 },
  expenses: { color: '#FFFFFF', fontSize: 19, fontWeight: '800', marginTop: 6 },
  divider: { height: 37, width: 1, backgroundColor: '#2E5060' },
  controls: { flexDirection: 'row', gap: 8, marginBottom: 25 },
  filters: { flexDirection: 'row', flex: 1, gap: 4, padding: 4, backgroundColor: '#E9EEF0', borderRadius: 15 },
  filter: { flex: 1, alignItems: 'center', paddingVertical: 10, justifyContent: 'center', borderRadius: 12 },
  activeFilter: { backgroundColor: palette.surface },
  filterText: { color: palette.inkMuted, fontWeight: '700', fontSize: 11 },
  activeText: { color: palette.ink },
  add: { backgroundColor: palette.teal, borderRadius: 14, width: 44, alignItems: 'center', justifyContent: 'center' },
  addText: { fontWeight: '500', fontSize: 25, color: '#FFFFFF', marginTop: -2 },
  list: { borderWidth: 1, borderColor: palette.border, borderRadius: 22, backgroundColor: '#FFFFFF', paddingHorizontal: 15 },
  note: { marginTop: 16, color: palette.inkMuted, fontSize: 10, textAlign: 'center' },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { palette } from '@/constants/finantrack';
import { useFinances } from '@/context/finances-context';
import { clampPercent, formatMXN, monthTitle } from '@/utils/finance';
import {
  BalanceCard, Header, MetricCard, QuickAction, Screen,
  SectionHeading, TransactionRow, EmptyState,
} from '@/components/finantrack/ui';

export default function HomeScreen() {
  const router = useRouter();
  const { balance, monthlyIncome, monthlyExpenses, sorted, setEntryType } = useFinances();
  const remaining = Math.max(0, monthlyIncome - monthlyExpenses);
  const expensePercent = monthlyIncome > 0 ? clampPercent(monthlyExpenses / monthlyIncome * 100) : 0;

  return (
    <Screen>
      <Header eyebrow="TU DINERO, MÁS CLARO" title="Hola, bienvenido" subtitle="Toma el control de tus finanzas." />
      <BalanceCard balance={balance} month={monthTitle()} />

      <View style={styles.metrics}>
        <MetricCard label="Ingresos del mes" value={monthlyIncome} />
        <MetricCard label="Gastos del mes" value={monthlyExpenses} variant="expense" />
      </View>

      <View style={styles.section}>
        <SectionHeading title="Accesos rápidos" />
        <View style={styles.quickRow}>
          <QuickAction label="Nuevo ingreso" onPress={() => setEntryType('income')} />
          <QuickAction label="Nuevo gasto" variant="expense" onPress={() => setEntryType('expense')} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeading title="Tu resumen del mes" />
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.overline}>DISPONIBLE DEL MES</Text>
              <Text style={styles.summaryMoney} numberOfLines={1} adjustsFontSizeToFit>
                {formatMXN(monthlyIncome - monthlyExpenses)}
              </Text>
            </View>
            <View style={styles.summaryTag}><Text style={styles.summaryTagText}>{Math.round(expensePercent)}% gastado</Text></View>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barSpent, { width: expensePercent + '%' }]} />
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: palette.teal }]} />
              <Text style={styles.legendText}>Gastos {formatMXN(monthlyExpenses)}</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#CFE4DD' }]} />
              <Text style={styles.legendText}>Sin gastar {formatMXN(remaining)}</Text></View>
          </View>
          {monthlyExpenses > monthlyIncome && <Text style={styles.warning}>Tus gastos superan los ingresos de este mes.</Text>}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeading title="Movimientos recientes" action="Ver todos" onPress={() => router.push('/movimientos')} />
        <View style={styles.listCard}>
          {sorted.length ? sorted.slice(0, 4).map((item, index, arr) =>
            <TransactionRow key={item.id} item={item} showBorder={index !== arr.length - 1} />
          ) : <EmptyState message="Todavía no tienes movimientos." />}
        </View>
      </View>
      <Text style={styles.demo}>Datos de demostración · Importes en pesos mexicanos (MXN)</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: 'row', gap: 12 },
  section: { marginTop: 29 },
  quickRow: { flexDirection: 'row', gap: 10 },
  summaryCard: { backgroundColor: palette.surface, borderRadius: 22, padding: 19, borderWidth: 1, borderColor: palette.border },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 18 },
  overline: { fontSize: 10, letterSpacing: 1.1, color: palette.inkMuted, fontWeight: '700' },
  summaryMoney: { color: palette.ink, fontSize: 26, letterSpacing: -0.8, fontWeight: '800', marginTop: 7 },
  summaryTag: { backgroundColor: palette.tealSoft, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10 },
  summaryTagText: { fontSize: 11, fontWeight: '700', color: palette.teal },
  barTrack: { height: 12, borderRadius: 10, overflow: 'hidden', backgroundColor: '#CFE4DD' },
  barSpent: { height: '100%', backgroundColor: palette.teal, borderRadius: 10 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 13, gap: 13 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 10, color: palette.inkMuted },
  warning: { fontSize: 11, color: palette.red, marginTop: 12 },
  listCard: { backgroundColor: palette.surface, paddingHorizontal: 15, borderWidth: 1, borderColor: palette.border, borderRadius: 22 },
  demo: { textAlign: 'center', fontSize: 10, marginTop: 24, color: palette.inkMuted },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, categories } from '@/constants/finantrack';
import { FinanceIcon } from '@/components/finantrack/finance-icon';
import { useFinances } from '@/context/finances-context';
import { amountByCategory, clampPercent, formatMXN, monthTitle, weeklyExpenseTotals } from '@/utils/finance';
import { Header, ProgressRow, Screen, SectionHeading } from '@/components/finantrack/ui';

const chartColors = ['#2C8473', '#57AA92', '#8CC8B5', '#B6DCCF', '#D5EAE1'];

export default function StatisticsScreen() {
  const { monthly, monthlyIncome, monthlyExpenses, savings, budgets } = useFinances();
  const weeks = weeklyExpenseTotals(monthly);
  const maxValue = Math.max(1, ...weeks);
  const expenses = budgets
    .map(b => ({ ...b, amount: amountByCategory(monthly, b.id) }))
    .sort((a, b) => b.amount - a.amount)
    .filter(b => b.amount > 0);
  const savingsRate = monthlyIncome ? Math.round(savings / monthlyIncome * 100) : 0;

  return (
    <Screen>
      <Header eyebrow="TU PANORAMA" title="Estadísticas" subtitle={'Así va tu dinero en ' + monthTitle().toLowerCase() + '.'} />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>BALANCE DEL MES</Text>
        <Text style={styles.heroValue} numberOfLines={1} adjustsFontSizeToFit>{formatMXN(savings)}</Text>
        <View style={styles.heroLine}>
          <View style={styles.heroBadge}>
            <FinanceIcon name={savings >= 0 ? 'arrow.up.right' : 'arrow.down.right'} size={13} weight="semibold" color="#B9EED5" />
            <Text style={styles.heroBadgeText}>{savingsRate}%</Text>
          </View>
          <Text style={styles.heroCaption}>de tus ingresos sin gastar</Text>
        </View>
      </View>
      <View style={styles.metrics}>
        <View style={styles.metric}><Text style={styles.metricLabel}>Ingresos</Text><Text style={styles.metricValue}>{formatMXN(monthlyIncome)}</Text><View style={[styles.metricRule, { backgroundColor: palette.teal }]} /></View>
        <View style={styles.metric}><Text style={styles.metricLabel}>Gastos</Text><Text style={styles.metricValue}>{formatMXN(monthlyExpenses)}</Text><View style={[styles.metricRule, { backgroundColor: palette.gold }]} /></View>
      </View>
      <View style={styles.section}>
        <SectionHeading title="Gastos por semana" />
        <View style={styles.chartCard}>
          <View style={styles.chartTop}><Text style={styles.chartCaption}>Distribución durante el mes</Text><Text style={styles.chartTotal}>{formatMXN(monthlyExpenses)}</Text></View>
          <View style={styles.chart}>
            {weeks.map((value, i) => (
              <View style={styles.barColumn} key={i}>
                <Text style={styles.barValue}>{value ? formatMXN(value) : '—'}</Text>
                <View style={styles.barSlot}>
                  <View style={[styles.bar, { height: value ? Math.max(7, clampPercent(value / maxValue * 100)) + '%' : '0%', backgroundColor: chartColors[i] }]} />
                </View>
                <Text style={styles.weekLabel}>S{i + 1}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartHelp}>S = semana del mes. Incluye movimientos ficticios.</Text>
        </View>
      </View>
      <View style={styles.section}>
        <SectionHeading title="¿En qué gastas más?" />
        <View style={styles.categoriesCard}>
          {expenses.length ? expenses.map(item =>
            <ProgressRow
              key={item.id}
              title={categories[item.id].name}
              icon={categories[item.id].icon}
              spent={item.amount}
              limit={monthlyExpenses || 1}
              color={item.color}
            />
          ) : <Text style={styles.empty}>Sin gastos en este mes.</Text>}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: palette.navy, borderRadius: 25, padding: 23, marginBottom: 13 },
  heroEyebrow: { color: '#ACC5CC', fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
  heroValue: { fontSize: 34, color: '#FFFFFF', fontWeight: '900', marginTop: 11, letterSpacing: -1 },
  heroLine: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 10 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#235A55', borderRadius: 9, paddingHorizontal: 10, paddingVertical: 5 },
  heroBadgeText: { color: '#B9EED5', fontWeight: '800', fontSize: 12 },
  heroCaption: { color: '#AFC7CE', fontSize: 11, flex: 1 },
  metrics: { flexDirection: 'row', gap: 12 },
  metric: { backgroundColor: '#FFFFFF', borderColor: palette.border, borderWidth: 1, borderRadius: 20, flex: 1, minWidth: 0, padding: 17 },
  metricLabel: { color: palette.inkMuted, fontSize: 12, marginBottom: 7 },
  metricValue: { fontSize: 19, fontWeight: '800', color: palette.ink },
  metricRule: { width: 34, height: 4, borderRadius: 2, marginTop: 13 },
  section: { marginTop: 29 },
  chartCard: { padding: 18, borderRadius: 22, borderWidth: 1, borderColor: palette.border, backgroundColor: '#FFFFFF' },
  chartTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  chartCaption: { color: palette.inkMuted, fontSize: 11 },
  chartTotal: { color: palette.ink, fontWeight: '800', fontSize: 16 },
  chart: { flexDirection: 'row', height: 196, gap: 10, marginTop: 24, alignItems: 'flex-end' },
  barColumn: { flex: 1, alignItems: 'center', minWidth: 0 },
  barValue: { fontSize: 9, color: palette.inkMuted, marginBottom: 6 },
  barSlot: { width: '65%', height: 147, justifyContent: 'flex-end', borderRadius: 9, backgroundColor: '#F2F5F5', overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 8 },
  weekLabel: { fontSize: 11, marginTop: 9, color: palette.inkMuted, fontWeight: '700' },
  chartHelp: { fontSize: 10, color: palette.inkMuted, marginTop: 19 },
  categoriesCard: { backgroundColor: '#FFFFFF', padding: 19, borderRadius: 22, borderWidth: 1, borderColor: palette.border },
  empty: { color: palette.inkMuted, textAlign: 'center' },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, categories } from '@/constants/finantrack';
import { FinanceIcon } from '@/components/finantrack/finance-icon';
import { useFinances } from '@/context/finances-context';
import { amountByCategory, clampPercent, formatMXN, monthTitle } from '@/utils/finance';
import { Header, ProgressRow, Screen, SectionHeading } from '@/components/finantrack/ui';

export default function BudgetsScreen() {
  const { budgets, monthly } = useFinances();
  const budgetTotal = budgets.reduce((sum, item) => sum + item.limit, 0);
  const spent = budgets.reduce((sum, item) => sum + amountByCategory(monthly, item.id), 0);
  const remaining = budgetTotal - spent;
  const usage = budgetTotal ? clampPercent(spent / budgetTotal * 100) : 0;

  return (
    <Screen>
      <Header eyebrow="PLANIFICA CON CALMA" title="Presupuestos" subtitle={'Control de límites · ' + monthTitle()} />
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>PRESUPUESTO DISPONIBLE</Text>
        <Text style={[styles.heroAmount, remaining < 0 && { color: '#FFC9C9' }]} numberOfLines={1} adjustsFontSizeToFit>{formatMXN(remaining)}</Text>
        <View style={styles.heroValues}>
          <Text style={styles.heroSmall}>Gastado  {formatMXN(spent)}</Text>
          <Text style={styles.heroSmall}>Límite  {formatMXN(budgetTotal)}</Text>
        </View>
        <View style={styles.track}><View style={[styles.fill, { width: usage + '%' }]} /></View>
        <Text style={styles.heroPercent}>{Math.round(budgetTotal ? spent / budgetTotal * 100 : 0)}% del presupuesto utilizado</Text>
      </View>
      <View style={styles.section}>
        <SectionHeading title="Tus categorías" />
        <View style={styles.categoryCard}>
          {budgets.map(item =>
            <ProgressRow
              key={item.id}
              title={categories[item.id].name}
              icon={categories[item.id].icon}
              spent={amountByCategory(monthly, item.id)}
              limit={item.limit}
              color={item.color}
            />
          )}
        </View>
      </View>
      <View style={styles.tip}>
        <View style={styles.tipIcon}><FinanceIcon name="lightbulb.fill" color={palette.teal} size={22} /></View>
        <View style={styles.tipCopy}>
          <Text style={styles.tipTitle}>Un buen hábito financiero</Text>
          <Text style={styles.tipBody}>Revisa tus límites cada semana para encontrar gastos que puedas reducir.</Text>
        </View>
      </View>
      <Text style={styles.foot}>Los límites son ficticios y aún no se pueden modificar.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: palette.navy, borderRadius: 25, padding: 23 },
  heroLabel: { color: '#B3C9CE', fontSize: 11, letterSpacing: 1.2, fontWeight: '800' },
  heroAmount: { color: '#FFFFFF', fontWeight: '900', fontSize: 36, marginTop: 12, marginBottom: 17, letterSpacing: -0.9 },
  heroValues: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  heroSmall: { color: '#C3D5D8', fontSize: 11 },
  track: { backgroundColor: '#3D5D66', height: 10, borderRadius: 8, overflow: 'hidden' },
  fill: { backgroundColor: '#80DDB4', height: '100%', borderRadius: 8 },
  heroPercent: { color: '#B8D0D1', marginTop: 11, fontSize: 10 },
  section: { marginTop: 28 },
  categoryCard: { backgroundColor: palette.surface, padding: 20, paddingBottom: 3, borderRadius: 22, borderColor: palette.border, borderWidth: 1 },
  tip: { flexDirection: 'row', marginTop: 22, borderRadius: 19, backgroundColor: '#E5F3EE', padding: 17, gap: 11 },
  tipIcon: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  tipCopy: { flex: 1 },
  tipTitle: { fontSize: 13, fontWeight: '800', color: palette.teal },
  tipBody: { color: '#4D7A6E', fontSize: 11, lineHeight: 17, marginTop: 4 },
  foot: { fontSize: 10, color: palette.inkMuted, textAlign: 'center', marginTop: 18 },
});

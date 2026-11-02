import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FinanceIcon } from '@/components/finantrack/finance-icon';
import { palette, categories } from '@/constants/finantrack';
import { clampPercent, formatMXN, shortDate } from '@/utils/finance';

export function Screen({ children }) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Header({ title, subtitle, eyebrow }) {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.pageTitle}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.brandMark}><Text style={styles.brandLetter}>F</Text></View>
    </View>
  );
}

export function SectionHeading({ title, action, onPress }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Pressable onPress={onPress} accessibilityRole="button" hitSlop={8}>
        <View style={styles.sectionActionWrap}>
          <Text style={styles.sectionAction}>{action}</Text>
          <FinanceIcon name="chevron.right" size={12} color={palette.teal} />
        </View>
      </Pressable> : null}
    </View>
  );
}

export function BalanceCard({ balance, month }) {
  return (
    <View style={styles.balanceCard}>
      <View style={styles.orbOne} /><View style={styles.orbTwo} />
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceLabel}>SALDO DISPONIBLE</Text>
        <FinanceIcon name="creditcard.fill" size={24} color="#94D1BC" />
      </View>
      <Text style={styles.balanceAmount} numberOfLines={1} adjustsFontSizeToFit>{formatMXN(balance)}</Text>
      <View style={styles.balanceFoot}>
        <View style={styles.positiveDot} />
        <Text style={styles.balanceCaption}>Tu panorama financiero</Text>
        <Text style={styles.balanceMonth}>{month}</Text>
      </View>
    </View>
  );
}

export function MetricCard({ label, value, variant = 'income' }) {
  const isIncome = variant === 'income';
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: isIncome ? palette.tealSoft : palette.redSoft }]}>
        <FinanceIcon
          name={isIncome ? 'arrow.down.left' : 'arrow.up.right'}
          size={19}
          weight="semibold"
          color={isIncome ? palette.teal : palette.red}
        />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue} numberOfLines={1} adjustsFontSizeToFit>{formatMXN(value)}</Text>
      <Text style={styles.metricDetail}>{isIncome ? 'Entradas del mes' : 'Salidas del mes'}</Text>
    </View>
  );
}

export function QuickAction({ label, variant, onPress }) {
  const expense = variant === 'expense';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.quickAction, expense && styles.quickExpense, pressed && { opacity: 0.75 }]}>
      <View style={[styles.quickSymbol, expense && styles.quickSymbolExpense]}>
        <FinanceIcon name={expense ? 'minus' : 'plus'} size={20} weight="semibold" color={expense ? palette.teal : '#FFFFFF'} />
      </View>
      <Text style={[styles.quickText, expense && { color: palette.ink }]}>{label}</Text>
      <FinanceIcon name="chevron.right" size={15} weight="semibold" color={expense ? palette.teal : '#FFFFFF'} />
    </Pressable>
  );
}

export function TransactionRow({ item, showBorder = true }) {
  const positive = item.type === 'income';
  const category = categories[item.category] || categories.otros;
  return (
    <View style={[styles.transactionRow, !showBorder && { borderBottomWidth: 0 }]}>
      <View style={[styles.transactionIcon, { backgroundColor: category.color }]}>
        <FinanceIcon name={category.icon} size={22} weight="semibold" color={positive ? palette.teal : palette.ink} />
      </View>
      <View style={styles.transactionCopy}>
        <Text style={styles.transactionTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.transactionSub} numberOfLines={1}>{category.name} · {shortDate(item.date)}</Text>
      </View>
      <Text
        style={[styles.transactionAmount, { color: positive ? palette.teal : palette.ink }]}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {positive ? '+' : '−'}{formatMXN(item.amount, 2)}
      </Text>
    </View>
  );
}

export function ProgressRow({ title, icon, spent, limit, color }) {
  const percentage = limit > 0 ? spent / limit * 100 : 0;
  const over = spent > limit;
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressTop}>
        <View style={styles.progressTitleWrap}>
          <FinanceIcon name={icon} size={17} weight="semibold" color={palette.ink} />
          <Text style={styles.progressTitle}>{title}</Text>
        </View>
        <Text style={[styles.progressAmount, over && { color: palette.red }]}>
          {formatMXN(spent)} <Text style={styles.progressLimit}>/ {formatMXN(limit)}</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: clampPercent(percentage) + '%', backgroundColor: over ? palette.red : color }]} />
      </View>
      <Text style={[styles.progressCaption, over && { color: palette.red }]}>
        {over ? 'Límite superado' : formatMXN(Math.max(0, limit - spent)) + ' disponibles'} · {Math.round(percentage)}% usado
      </Text>
    </View>
  );
}

export function EmptyState({ message }) {
  return <View style={styles.empty}><Text style={styles.emptyText}>{message}</Text></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 115, maxWidth: 620, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 12 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.6, color: palette.teal, marginBottom: 5, textTransform: 'uppercase' },
  pageTitle: { fontSize: 29, lineHeight: 36, fontWeight: '800', letterSpacing: -0.8, color: palette.ink },
  subtitle: { fontSize: 13, color: palette.inkMuted, marginTop: 5 },
  brandMark: { width: 42, height: 42, backgroundColor: palette.navy, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  brandLetter: { fontSize: 25, fontWeight: '900', color: '#FFFFFF', fontStyle: 'italic' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: palette.ink, letterSpacing: -0.35 },
  sectionAction: { fontSize: 13, fontWeight: '700', color: palette.teal },
  sectionActionWrap: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  balanceCard: { backgroundColor: palette.navy, padding: 24, borderRadius: 26, overflow: 'hidden', marginBottom: 17, minHeight: 206 },
  orbOne: { width: 195, height: 195, borderRadius: 100, backgroundColor: '#184B58', position: 'absolute', top: -100, right: -45 },
  orbTwo: { width: 176, height: 176, borderRadius: 100, borderWidth: 1, borderColor: '#39717C', position: 'absolute', top: -72, right: 0 },
  balanceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  balanceLabel: { color: '#A8C4CB', fontSize: 11, letterSpacing: 1.5, fontWeight: '800' },
  balanceAmount: { color: '#FFFFFF', fontSize: 37, fontWeight: '800', marginTop: 17, letterSpacing: -1 },
  balanceFoot: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 25 },
  positiveDot: { width: 7, height: 7, borderRadius: 10, backgroundColor: '#68D9AD' },
  balanceCaption: { color: '#BDD2D5', fontSize: 11, flex: 1 },
  balanceMonth: { color: '#BDD2D5', fontSize: 11, fontWeight: '700' },
  metricCard: { flex: 1, minWidth: 0, backgroundColor: palette.surface, borderRadius: 22, padding: 16, borderWidth: 1, borderColor: palette.border },
  metricIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 13 },
  metricLabel: { fontSize: 12, color: palette.inkMuted, fontWeight: '600' },
  metricValue: { fontSize: 21, fontWeight: '800', letterSpacing: -0.7, color: palette.ink, marginTop: 6 },
  metricDetail: { fontSize: 10, color: palette.inkMuted, marginTop: 5 },
  quickAction: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 9, padding: 11, borderRadius: 17, backgroundColor: palette.teal },
  quickExpense: { backgroundColor: palette.tealSoft },
  quickSymbol: { width: 32, height: 32, borderRadius: 11, backgroundColor: '#319480', alignItems: 'center', justifyContent: 'center' },
  quickSymbolExpense: { backgroundColor: '#C6E9DC' },
  quickText: { flex: 1, color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  transactionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: palette.border, gap: 11 },
  transactionIcon: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  transactionCopy: { flex: 1, minWidth: 0, gap: 4 },
  transactionTitle: { fontWeight: '700', color: palette.ink, fontSize: 13 },
  transactionSub: { color: palette.inkMuted, fontSize: 11 },
  transactionAmount: { maxWidth: '37%', fontSize: 13, fontWeight: '800', letterSpacing: -0.35 },
  progressRow: { marginBottom: 20 },
  progressTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 8 },
  progressTitleWrap: { flexDirection: 'row', gap: 8, alignItems: 'center', flexShrink: 1 },
  progressTitle: { fontSize: 13, fontWeight: '700', color: palette.ink },
  progressAmount: { fontSize: 12, fontWeight: '800', color: palette.ink, flexShrink: 1, textAlign: 'right' },
  progressLimit: { color: palette.inkMuted, fontWeight: '500' },
  track: { backgroundColor: palette.track, height: 8, borderRadius: 10, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 10 },
  progressCaption: { fontSize: 10, color: palette.inkMuted, marginTop: 7 },
  empty: { padding: 24, backgroundColor: palette.surface, borderRadius: 16 },
  emptyText: { color: palette.inkMuted, fontSize: 13, textAlign: 'center' },
});

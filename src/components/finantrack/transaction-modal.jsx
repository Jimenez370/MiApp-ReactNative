import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FinanceIcon } from '@/components/finantrack/finance-icon';
import { useFinances } from '@/context/finances-context';
import { categories, expenseCategoryIds, incomeCategoryIds, palette } from '@/constants/finantrack';

export default function TransactionModal() {
  const { entryType, setEntryType, addTransaction } = useFinances();
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('alimentacion');
  const [error, setError] = useState('');

  useEffect(() => {
    if (entryType) {
      setTitle('');
      setAmount('');
      setError('');
      setCategory(entryType === 'income' ? 'extra' : 'alimentacion');
    }
  }, [entryType]);

  const income = entryType === 'income';
  const options = income ? incomeCategoryIds : expenseCategoryIds;
  const close = () => setEntryType(null);

  function submit() {
    const value = Number(amount.replace(',', '.').trim());
    if (!title.trim() || !Number.isFinite(value) || value <= 0) {
      setError('Escribe un concepto y un importe mayor que cero.');
      return;
    }
    addTransaction({ title, amount: value, category, type: entryType });
  }

  return (
    <Modal visible={Boolean(entryType)} transparent animationType="slide" onRequestClose={close}>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.backdrop} onPress={close} accessibilityLabel="Cerrar formulario" />
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 18) + 12 }]}>
          <View style={styles.grabber} />
          <View style={styles.top}>
            <View>
              <Text style={styles.eyebrow}>NUEVO MOVIMIENTO</Text>
              <Text style={styles.heading}>{income ? 'Registrar ingreso' : 'Registrar gasto'}</Text>
            </View>
            <Pressable onPress={close} style={styles.closeButton} accessibilityRole="button">
              <FinanceIcon name="xmark" color={palette.inkMuted} size={15} weight="semibold" />
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Concepto</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              maxLength={70}
              placeholder={income ? 'Ej. Venta de un producto' : 'Ej. Compra en el súper'}
              placeholderTextColor="#9AA6AE"
              autoCapitalize="sentences"
              accessibilityLabel="Concepto del movimiento"
            />
            <Text style={styles.label}>Importe (MXN)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="#9AA6AE"
              keyboardType="decimal-pad"
              maxLength={12}
              accessibilityLabel="Importe en pesos mexicanos"
            />
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.options}>
              {options.map(id => (
                <Pressable
                  key={id}
                  onPress={() => setCategory(id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: category === id }}
                  style={[styles.chip, category === id && styles.chipSelected]}>
                  <FinanceIcon name={categories[id].icon} size={15} color={category === id ? palette.teal : palette.inkMuted} />
                  <Text style={[styles.chipText, category === id && styles.chipTextSelected]}>
                    {categories[id].name}
                  </Text>
                </Pressable>
              ))}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable onPress={submit} accessibilityRole="button" style={styles.submit}>
              <Text style={styles.submitText}>Guardar {income ? 'ingreso' : 'gasto'}</Text>
            </Pressable>
            <Text style={styles.notice}>Demostración: los datos se reinician al cerrar la app.</Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(7, 24, 35, 0.47)' },
  sheet: { maxHeight: '88%', borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: '#FFFFFF', paddingHorizontal: 22, paddingTop: 12 },
  grabber: { height: 5, width: 38, borderRadius: 8, backgroundColor: '#DCE4E8', alignSelf: 'center', marginBottom: 19 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 21 },
  eyebrow: { color: palette.teal, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  heading: { color: palette.ink, fontSize: 23, fontWeight: '800', marginTop: 5 },
  closeButton: { backgroundColor: palette.background, borderRadius: 20, width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 12, fontWeight: '700', color: palette.ink, marginBottom: 9 },
  input: { backgroundColor: '#F7F9FA', borderColor: palette.border, borderWidth: 1, borderRadius: 14, paddingHorizontal: 15, height: 51, fontSize: 15, color: palette.ink, marginBottom: 20 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 17 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderColor: palette.border, borderRadius: 13, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: palette.surface },
  chipSelected: { backgroundColor: palette.tealSoft, borderColor: '#B7DCCF' },
  chipText: { fontSize: 12, color: palette.inkMuted, fontWeight: '600' },
  chipTextSelected: { color: palette.teal, fontWeight: '800' },
  error: { color: palette.red, fontSize: 12, marginBottom: 10 },
  submit: { backgroundColor: palette.navy, borderRadius: 15, alignItems: 'center', paddingVertical: 16, marginTop: 5 },
  submitText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  notice: { color: palette.inkMuted, textAlign: 'center', fontSize: 11, marginTop: 13, marginBottom: 10 },
});

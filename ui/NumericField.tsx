import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type NumericFieldProps = {
  label: string;
  value: string;
  unit?: string;
  placeholder?: string;
  onChange: (val: string) => void;
};

export function NumericField({ label, value, unit, placeholder, onChange }: NumericFieldProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
          onChangeText={onChange}
        />
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#E2E8F0",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#475569",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#E2E8F0",
    backgroundColor: "#020617",
  },
  unit: {
    marginLeft: 8,
    fontSize: 13,
    color: "#94A3B8",
  },
});

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type CheckboxInputProps = {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
};

export function CheckboxInput({ label, value, onChange }: CheckboxInputProps) {
  return (
    <Pressable onPress={() => onChange(!value)} style={styles.row}>
      <View style={[styles.box, value && styles.boxChecked]}>
        {value ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#64748B",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  boxChecked: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  checkmark: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    color: "#E2E8F0",
  },
});

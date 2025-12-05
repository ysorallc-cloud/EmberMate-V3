import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

/**
 * VitalInput
 *
 * Small reusable input used on the Log screen for vitals like
 * blood pressure, heart rate, oxygen, and temperature.
 *
 * It is intentionally simple: a label and a styled TextInput.
 */

type Props = {
  label: string;
} & TextInputProps;

export default function VitalInput({ label, style, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#64748B"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.8)",
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#E5E7EB",
    backgroundColor: "rgba(15,23,42,0.95)",
  },
});

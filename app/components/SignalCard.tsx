import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes, Radii, SignalLevel } from "../theme/theme-tokens";

type Props = {
  label: string;
  value: string;
  level: SignalLevel;
};

export default function SignalCard({ label, value, level }: Props) {
  const color = Colors[level];

  return (
    <View style={[styles.card, { borderColor: color }]}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.levelText}>
        {level === "ok" ? "Stable" : level === "watch" ? "Monitor" : "High concern"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    justifyContent: "space-between",
    minHeight: 96
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs
  },
  label: {
    color: Colors.textPrimary,
    fontSize: FontSizes.sm,
    fontWeight: "500"
  },
  value: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: "600"
  },
  levelText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs
  }
});

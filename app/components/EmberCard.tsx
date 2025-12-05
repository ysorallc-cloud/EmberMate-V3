import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes, Radii } from "../theme/theme-tokens";

type EmberCardProps = {
  title: string;
  subtitle?: string;
  value?: string;
  emphasis?: "default" | "highlight";
};

export default function EmberCard({
  title,
  subtitle,
  value,
  emphasis = "default"
}: EmberCardProps) {
  const variantStyles =
    emphasis === "highlight" ? styles.highlightCard : styles.defaultCard;

  return (
    <View style={[styles.card, variantStyles]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {value ? <Text style={styles.value}>{value}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.surface
  },
  defaultCard: {},
  highlightCard: {
    backgroundColor: Colors.ok
  },
  title: {
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: 4
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary
  },
  value: {
    marginTop: 8,
    fontSize: FontSizes.xl,
    color: Colors.textPrimary,
    fontWeight: "700"
  }
});

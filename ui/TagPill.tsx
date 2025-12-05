import React from "react";
import { Text, StyleSheet, View } from "react-native";

type TagPillProps = {
  label: string;
  tone?: "info" | "success" | "warning" | "danger";
};

export function TagPill({ label, tone = "info" }: TagPillProps) {
  const toneStyle =
    tone === "success"
      ? styles.success
      : tone === "warning"
      ? styles.warning
      : tone === "danger"
      ? styles.danger
      : styles.info;
  return (
    <View style={[styles.pill, toneStyle]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#0F172A",
  },
  info: {
    backgroundColor: "#E0F2FE",
  },
  success: {
    backgroundColor: "#BBF7D0",
  },
  warning: {
    backgroundColor: "#FEF3C7",
  },
  danger: {
    backgroundColor: "#FECACA",
  },
});

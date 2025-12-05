import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function OrbStatus({ score = 57, tone = "Managing" }) {
  const safeTone = (tone || "Managing").toUpperCase();
  const safeScore = typeof score === "number" ? score : 0;

  return (
    <View style={styles.container}>
      <View style={styles.orbOuter}>
        <View style={styles.orbInner}>
          <Text style={styles.score}>{safeScore}</Text>
          <Text style={styles.outOf}>/100</Text>
          <Text style={styles.tone}>{safeTone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  orbOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(250,204,21,0.25)",
    justifyContent: "center",
    alignItems: "center"
  },
  orbInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center"
  },
  score: {
    color: "#F9FAFB",
    fontSize: 40,
    fontWeight: "700"
  },
  outOf: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: -6
  },
  tone: {
    color: "#FBBF24",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4
  }
});

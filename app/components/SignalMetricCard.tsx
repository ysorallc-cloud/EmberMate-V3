import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SignalRing, { SignalLevel } from "./SignalRing";

type SignalMetricCardProps = {
  label: string;
  valueLabel: string; // "2.15 mi", "149 kcal", "6 / 10"
  level: SignalLevel;
  percent: number; // 0 to 100, ring fill
  iconName: keyof typeof Ionicons.glyphMap;
};

const SignalMetricCard: React.FC<SignalMetricCardProps> = ({
  label,
  valueLabel,
  level,
  percent,
  iconName
}) => {
  const iconColor =
    level === "ok"
      ? "#22C55E"
      : level === "watch"
      ? "#FACC15"
      : "#F97316";

  return (
    <View style={styles.container}>
      <SignalRing value={percent} level={level}>
        <Ionicons name={iconName} size={22} color={iconColor} />
      </SignalRing>

      <Text style={styles.valueText}>{valueLabel}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8
  },
  valueText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#F9FAFB"
  },
  labelText: {
    fontSize: 12,
    color: "#9CA3AF"
  }
});

export default SignalMetricCard;

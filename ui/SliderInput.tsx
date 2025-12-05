import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

type SliderInputProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  leftLabel?: string;
  rightLabel?: string;
};

export function SliderInput({
  label,
  value,
  onChange,
  minimumValue = 0,
  maximumValue = 10,
  leftLabel,
  rightLabel,
}: SliderInputProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <Slider
        style={styles.slider}
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        onValueChange={onChange}
        minimumTrackTintColor="#FBBF77"
        maximumTrackTintColor="#475569"
        thumbTintColor="#F97316"
      />
      <View style={styles.row}>
        <Text style={styles.edgeLabel}>{leftLabel}</Text>
        <Text style={styles.value}>{Math.round(value)}</Text>
        <Text style={styles.edgeLabel}>{rightLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#E2E8F0",
    marginBottom: 4,
  },
  slider: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FBBF77",
  },
  edgeLabel: {
    fontSize: 12,
    color: "#94A3B8",
  },
});

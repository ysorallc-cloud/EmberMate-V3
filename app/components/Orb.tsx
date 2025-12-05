import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, SignalLevel } from "../theme/theme-tokens";

type Props = {
  level: SignalLevel;
};

export default function Orb({ level }: Props) {
  const color = Colors[level];

  return <View style={[styles.orb, { borderColor: color }]} />;
}

const styles = StyleSheet.create({
  orb: {
    width: 160,
    height: 160,
    borderRadius: 999,
    borderWidth: 8
  }
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const QuickWinChip = (props: any) => {
  const { title, subtitle, onPress } = props;

  return (
    <TouchableOpacity
      style={styles.chip}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.title}>{title ?? "Quick win"}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.8)",
    marginRight: 8,
    marginBottom: 8
  },
  title: {
    color: "#E5F6FF",
    fontWeight: "600",
    fontSize: 13
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 2
  }
});

export default QuickWinChip;

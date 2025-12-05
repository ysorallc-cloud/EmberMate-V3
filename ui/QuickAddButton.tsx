import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type QuickAddButtonProps = {
  label: string;
  onPress: () => void;
};

export function QuickAddButton({ label, onPress }: QuickAddButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#0F766E",
    alignSelf: "flex-start",
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#E0F2FE",
    fontWeight: "500",
  },
});

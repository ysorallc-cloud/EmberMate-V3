import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type Chip = {
  label: string;
  value: string;
};

type ChipGroupProps = {
  label?: string;
  chips: Chip[];
  value: string | null;
  onChange: (val: string) => void;
  allowDeselect?: boolean;
};

export function ChipGroup({ label, chips, value, onChange, allowDeselect = true }: ChipGroupProps) {
  return (
    <View style={styles.root}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        {chips.map((chip) => {
          const selected = chip.value === value;
          return (
            <Pressable
              key={chip.value}
              onPress={() => onChange(selected && allowDeselect ? "" : chip.value)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#E2E8F0",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  } as any,
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#334155",
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#020617",
  },
  chipSelected: {
    backgroundColor: "#22C55E33",
    borderColor: "#22C55E",
  },
  chipLabel: {
    fontSize: 13,
    color: "#E2E8F0",
  },
  chipLabelSelected: {
    color: "#BBF7D0",
    fontWeight: "600",
  },
});

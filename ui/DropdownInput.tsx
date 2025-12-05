import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Modal } from "react-native";

type Option = {
  label: string;
  value: string;
};

type DropdownInputProps = {
  label: string;
  value: string | null;
  options: Option[];
  onChange: (val: string) => void;
};

export function DropdownInput({ label, value, options, onChange }: DropdownInputProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "Select";

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.box} onPress={() => setOpen(true)}>
        <Text style={styles.value}>{selectedLabel}</Text>
        <Text style={styles.chevron}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.menuItem}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
    marginBottom: 4,
  },
  box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#64748B",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#020617",
  },
  value: {
    fontSize: 14,
    color: "#E2E8F0",
  },
  chevron: {
    color: "#94A3B8",
    fontSize: 14,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.7)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  menu: {
    borderRadius: 16,
    backgroundColor: "#020617",
    maxHeight: "60%",
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuLabel: {
    fontSize: 14,
    color: "#E2E8F0",
  },
});

// app/log/activity/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

const OPTIONS = ["Rest day", "Light movement", "Household tasks", "Walk", "Stretching"];

export default function ActivityLogScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("Activity:", { selected, notes });
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Body and mind</Text>
      <Text style={styles.subtitle}>
        Capture the kind of day your body had, not just steps or workouts.
      </Text>

      <View style={styles.chipWrap}>
        {OPTIONS.map(opt => {
          const active = selected === opt;
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSelected(opt)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>Notes</Text>
      <TextInput
        style={styles.notes}
        placeholder="For example: gentle yoga, sat a lot, extra fatigue, short walk after dinner."
        placeholderTextColor="#7b8a96"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity
        style={[styles.primaryButton, !selected && styles.disabledButton]}
        onPress={handleSave}
        disabled={!selected}
      >
        <Text style={styles.primaryButtonText}>Save wellness log</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => router.back()}>
        <Text style={styles.linkText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021827",
    paddingHorizontal: 20,
    paddingTop: 32
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff"
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#cfd8e3"
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 10,
    marginTop: 20
  },
  chip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#163543"
  },
  chipActive: {
    backgroundColor: "#f0c48a"
  },
  chipText: {
    color: "#e5edf5",
    fontSize: 13
  },
  chipTextActive: {
    color: "#3f2f1d",
    fontWeight: "600"
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#e5edf5"
  },
  notes: {
    backgroundColor: "#0b2533",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 100,
    color: "#ffffff",
    textAlignVertical: "top"
  },
  primaryButton: {
    marginTop: 28,
    backgroundColor: "#22d3ee",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center"
  },
  disabledButton: {
    opacity: 0.4
  },
  primaryButtonText: {
    color: "#021827",
    fontWeight: "700",
    fontSize: 16
  },
  linkButton: {
    marginTop: 12,
    alignItems: "center"
  },
  linkText: {
    color: "#e5edf5"
  }
});

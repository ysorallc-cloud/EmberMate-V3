// app/log/mood/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const MOODS = ["Low", "Flat", "Okay", "Light", "Bright"];

export default function MoodLogScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSave = () => {
    console.log("Saved mood:", selected);
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Mood check in</Text>
      <Text style={styles.subtitle}>
        Pick the option that feels closest. It does not need to be perfect.
      </Text>

      <View style={styles.moodRow}>
        {MOODS.map(mood => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodChip,
              selected === mood && styles.moodChipSelected
            ]}
            onPress={() => setSelected(mood)}
          >
            <Text
              style={[
                styles.moodText,
                selected === mood && styles.moodTextSelected
              ]}
            >
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !selected && styles.disabledButton]}
        onPress={handleSave}
        disabled={!selected}
      >
        <Text style={styles.primaryButtonText}>Save mood</Text>
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
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 10,
    marginTop: 24
  },
  moodChip: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#163543"
  },
  moodChipSelected: {
    backgroundColor: "#f0c48a"
  },
  moodText: {
    color: "#e5edf5",
    fontSize: 14,
    fontWeight: "500"
  },
  moodTextSelected: {
    color: "#3f2f1d"
  },
  primaryButton: {
    marginTop: 32,
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

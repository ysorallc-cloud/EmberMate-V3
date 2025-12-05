// app/log/symptoms/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";

const SYMPTOMS = ["Headache", "Nausea", "Dizziness", "Fatigue", "Pain flare"];

export default function SymptomsLogScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number>(3);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSelected(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = () => {
    console.log("Symptoms:", selected, "Severity:", severity, "Notes:", notes);
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Symptoms</Text>
      <Text style={styles.subtitle}>
        Tap what is active today and roughly how strong it feels.
      </Text>

      <View style={styles.chipWrap}>
        {SYMPTOMS.map(symptom => {
          const active = selected.includes(symptom);
          return (
            <TouchableOpacity
              key={symptom}
              style={[styles.symptomChip, active && styles.symptomChipSelected]}
              onPress={() => toggleSymptom(symptom)}
            >
              <Text
                style={[
                  styles.symptomText,
                  active && styles.symptomTextSelected
                ]}
              >
                {symptom}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>Severity</Text>
      <View style={styles.scaleRow}>
        {[1, 2, 3, 4, 5].map(num => (
          <TouchableOpacity
            key={num}
            style={[styles.scaleDot, severity === num && styles.scaleDotActive]}
            onPress={() => setSeverity(num)}
          >
            <Text
              style={[
                styles.scaleDotText,
                severity === num && styles.scaleDotTextActive
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Notes</Text>
      <TextInput
        style={styles.notes}
        placeholder="Anything your doctor or nurse should know about today."
        placeholderTextColor="#7b8a96"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Save symptoms</Text>
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
  symptomChip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#163543"
  },
  symptomChipSelected: {
    backgroundColor: "#f0c48a"
  },
  symptomText: {
    color: "#e5edf5",
    fontSize: 13
  },
  symptomTextSelected: {
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
  scaleRow: {
    flexDirection: "row",
    columnGap: 10
  },
  scaleDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#3b5160",
    alignItems: "center",
    justifyContent: "center"
  },
  scaleDotActive: {
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee"
  },
  scaleDotText: {
    color: "#cfd8e3",
    fontWeight: "500"
  },
  scaleDotTextActive: {
    color: "#021827",
    fontWeight: "700"
  },
  notes: {
    marginTop: 8,
    backgroundColor: "#0b2533",
    borderRadius: 14,
    padding: 12,
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

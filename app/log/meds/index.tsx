// app/log/meds/index.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type MedSchedule = "Morning" | "Noon" | "Evening" | "Bedtime";

type MedItem = {
  id: string;
  name: string;
  dose: string;
  schedule: MedSchedule[];
  sideEffects?: string;
};

const COMMON_MEDS: MedItem[] = [
  {
    id: "lisinopril",
    name: "Lisinopril",
    dose: "10 mg",
    schedule: ["Morning"],
    sideEffects: "Dizziness, dry cough"
  },
  {
    id: "metformin",
    name: "Metformin",
    dose: "500 mg",
    schedule: ["Morning", "Evening"],
    sideEffects: "Upset stomach"
  },
  {
    id: "amlodipine",
    name: "Amlodipine",
    dose: "5 mg",
    schedule: ["Evening"],
    sideEffects: "Swelling in ankles"
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    dose: "20 mg",
    schedule: ["Bedtime"],
    sideEffects: "Muscle aches"
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    dose: "200 mg",
    schedule: ["As needed" as MedSchedule], // handled as text below
    sideEffects: "Stomach irritation"
  },
  {
    id: "omeprazole",
    name: "Omeprazole",
    dose: "20 mg",
    schedule: ["Morning"],
    sideEffects: "Headache, nausea"
  }
];

// Helper to turn schedule array into label
function formatSchedule(schedule: MedSchedule[]): string {
  if (schedule.length === 0) return "Not set";
  return schedule.join(" · ");
}

export default function MedsScreen() {
  const router = useRouter();

  const goBackToLog = () => {
    router.replace("/(tabs)/log");
  };

  // Start with a few active meds visible by default
  const [activeMeds, setActiveMeds] = useState<MedItem[]>([
    COMMON_MEDS[0],
    COMMON_MEDS[1],
    COMMON_MEDS[5]
  ]);

  const [takenToday, setTakenToday] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const availableToAdd = COMMON_MEDS.filter(
    med => !activeMeds.some(a => a.id === med.id)
  );

  const toggleTaken = (id: string) => {
    setTakenToday(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddMed = (med: MedItem) => {
    setActiveMeds(prev => [...prev, med]);
    setShowPicker(false);
  };

  const handleSave = () => {
    // Later wire this into real storage.
    goBackToLog();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={goBackToLog}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={22} color="#22D3EE" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Medication</Text>
        <Text style={styles.subtitle}>
          Check off what was taken so visits stay clear and stress stays low.
        </Text>

        {/* Main list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication list</Text>
          <Text style={styles.sectionHint}>
            Each line shows what is usually taken, when, and common side
            effects. Tap the circle to mark what was taken today.
          </Text>

          {activeMeds.map(med => {
            const checked = takenToday.includes(med.id);
            return (
              <TouchableOpacity
                key={med.id}
                style={[
                  styles.medCard,
                  checked && styles.medCardChecked
                ]}
                activeOpacity={0.9}
                onPress={() => toggleTaken(med.id)}
              >
                <View style={styles.medMain}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDose}>{med.dose}</Text>
                </View>

                <View style={styles.medMeta}>
                  <Text style={styles.metaLabel}>When</Text>
                  <Text style={styles.metaValue}>
                    {formatSchedule(med.schedule)}
                  </Text>

                  {med.sideEffects ? (
                    <>
                      <Text style={[styles.metaLabel, { marginTop: 4 }]}>
                        Side effects to watch
                      </Text>
                      <Text style={styles.sideEffectsText}>
                        {med.sideEffects}
                      </Text>
                    </>
                  ) : null}
                </View>

                <View
                  style={[
                    styles.checkCircle,
                    checked && styles.checkCircleActive
                  ]}
                >
                  {checked && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#020617"
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {activeMeds.length === 0 && (
            <Text style={styles.emptyText}>
              No medications added yet. Use the button below to quickly add
              common meds.
            </Text>
          )}
        </View>

        {/* Add medication "dropdown" */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.addRow}
            onPress={() =>
              availableToAdd.length > 0 && setShowPicker(prev => !prev)
            }
          >
            <Ionicons name="add-circle-outline" size={20} color="#22D3EE" />
            <Text style={styles.addText}>Add another medication</Text>
          </TouchableOpacity>
          <Text style={styles.addHint}>
            Use this for new prescriptions or over-the-counter meds not listed
            above.
          </Text>

          {showPicker && availableToAdd.length > 0 && (
            <View style={styles.pickerCard}>
              {availableToAdd.map(med => (
                <TouchableOpacity
                  key={med.id}
                  style={styles.pickerItem}
                  onPress={() => handleAddMed(med)}
                >
                  <View>
                    <Text style={styles.pickerName}>{med.name}</Text>
                    <Text style={styles.pickerDose}>{med.dose}</Text>
                  </View>
                  <Ionicons
                    name="add-outline"
                    size={18}
                    color="#22D3EE"
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Save footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.9}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save this check-in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  backText: {
    color: "#22D3EE",
    fontSize: 15,
    marginLeft: 2
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 18
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 4
  },
  sectionHint: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 10
  },
  medCard: {
    backgroundColor: "#020817",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(30,64,175,0.5)",
    marginBottom: 10
  },
  medCardChecked: {
    borderColor: "#22C55EAA",
    backgroundColor: "#022c22"
  },
  medMain: {
    marginBottom: 4
  },
  medName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB"
  },
  medDose: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2
  },
  medMeta: {
    marginTop: 4,
    marginRight: 40
  },
  metaLabel: {
    fontSize: 11,
    color: "#9CA3AF"
  },
  metaValue: {
    fontSize: 13,
    color: "#E5E7EB",
    marginTop: 1
  },
  sideEffectsText: {
    fontSize: 12,
    color: "#FACC15",
    marginTop: 1
  },
  checkCircle: {
    position: "absolute",
    right: 10,
    top: "40%",
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center"
  },
  checkCircleActive: {
    borderColor: "#22C55E",
    backgroundColor: "#22C55E"
  },
  emptyText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 6
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  addText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#22D3EE",
    fontWeight: "600"
  },
  addHint: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4
  },
  pickerCard: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(30,64,175,0.6)",
    paddingVertical: 6
  },
  pickerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  pickerName: {
    fontSize: 14,
    color: "#E5E7EB",
    fontWeight: "500"
  },
  pickerDose: {
    fontSize: 12,
    color: "#9CA3AF"
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 8,
    backgroundColor: "#020617"
  },
  saveButton: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22D3EE"
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#020617"
  }
});

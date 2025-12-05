// app/log/vitals/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function VitalsLogScreen() {
  const router = useRouter();
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");

  const handleSave = () => {
    console.log("Vitals:", { systolic, diastolic, heartRate, bloodSugar });
    router.back();
  };

  const canSave = systolic || diastolic || heartRate || bloodSugar;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Vitals</Text>
      <Text style={styles.subtitle}>
        Capture the readings that matter for today. Rough values are fine.
      </Text>

      <Text style={styles.sectionLabel}>Blood pressure</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Systolic"
          keyboardType="numeric"
          placeholderTextColor="#7b8a96"
          value={systolic}
          onChangeText={setSystolic}
        />
        <View style={{ width: 10 }} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Diastolic"
          keyboardType="numeric"
          placeholderTextColor="#7b8a96"
          value={diastolic}
          onChangeText={setDiastolic}
        />
      </View>

      <Text style={styles.sectionLabel}>Heart rate</Text>
      <TextInput
        style={styles.input}
        placeholder="Beats per minute"
        keyboardType="numeric"
        placeholderTextColor="#7b8a96"
        value={heartRate}
        onChangeText={setHeartRate}
      />

      <Text style={styles.sectionLabel}>Blood sugar</Text>
      <TextInput
        style={styles.input}
        placeholder="mg/dL"
        keyboardType="numeric"
        placeholderTextColor="#7b8a96"
        value={bloodSugar}
        onChangeText={setBloodSugar}
      />

      <TouchableOpacity
        style={[styles.primaryButton, !canSave && styles.disabledButton]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Text style={styles.primaryButtonText}>Save vitals</Text>
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
  sectionLabel: {
    marginTop: 24,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#e5edf5"
  },
  row: {
    flexDirection: "row"
  },
  input: {
    backgroundColor: "#0b2533",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#ffffff"
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

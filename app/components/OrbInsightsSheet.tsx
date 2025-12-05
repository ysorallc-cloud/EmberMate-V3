import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OrbInsightsSheet({ onClose, data, state }) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Why today is {state}</Text>

      {Object.entries(data).map(([k,v]) => (
        <View key={k} style={styles.row}>
          <Text style={styles.label}>{k}</Text>
          <Text style={styles.value}>{v}</Text>
        </View>
      ))}

      <Text style={styles.body}>
        Pain is pulling your score down, but steady sleep and moderate mood
        are helping you keep things manageable.
      </Text>

      <TouchableOpacity onPress={onClose} style={styles.btn}>
        <Text style={styles.btnText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#0f172a",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  title: { color: "#fff", fontSize: 18, marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  label: { color: "#94A3B8" },
  value: { color: "#fff" },
  body: { color: "#fff", marginTop: 12, lineHeight: 20 },
  btn: {
    backgroundColor: "#22D3EE",
    padding: 12,
    marginTop: 20,
    borderRadius: 12
  },
  btnText: { textAlign: "center", color: "#0f172a", fontWeight: "600" }
});

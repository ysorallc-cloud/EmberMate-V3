import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ResetSuggestionProps = {
  title?: string;
  suggestion: string;
  context?: string;
};

export default function ResetSuggestion({
  title = "2‑minute reset",
  suggestion,
  context
}: ResetSuggestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {context ? <Text style={styles.context}>{context}</Text> : null}
      <Text style={styles.suggestion}>{suggestion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "rgba(31,41,55,0.9)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.6)"
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E5E7EB",
    marginBottom: 2
  },
  context: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4
  },
  suggestion: {
    fontSize: 12,
    color: "#E5E7EB"
  }
});

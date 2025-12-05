import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InsightBubbleProps = {
  label?: string;
  insight?: string;
  /** Example: "Try:" text at bottom */
  suggestionTitle?: string;
  suggestionBody?: string;
};

const InsightBubble: React.FC<InsightBubbleProps> = ({
  label = "Insight",
  insight = "On days with low sleep, pain scores have been higher.",
  suggestionTitle = "Gentle suggestion",
  suggestionBody = "If tonight allows, aim for a slightly earlier wind down. Small shifts count."
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="analytics-outline" size={18} color="#22D3EE" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={styles.insight}>{insight}</Text>

      {suggestionBody ? (
        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionTitle}>{suggestionTitle}</Text>
          <Text style={styles.suggestionBody}>{suggestionBody}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(15, 23, 42, 0.97)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.45)",
    marginTop: 16
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(15, 118, 110, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  label: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "600"
  },
  insight: {
    color: "#E5E7EB",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10
  },
  suggestionBox: {
    backgroundColor: "rgba(30, 64, 175, 0.45)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  suggestionTitle: {
    color: "#BFDBFE",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2
  },
  suggestionBody: {
    color: "#E5E7EB",
    fontSize: 12,
    lineHeight: 18
  }
});

export default InsightBubble;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EncouragementBannerProps = {
  title?: string;
  message?: string;
  /** Example: "You have shown up 3 days this week" */
  highlight?: string;
};

const EncouragementBanner: React.FC<EncouragementBannerProps> = ({
  title = "You are making progress",
  message = "Every log helps EmberMate spot patterns so you do not have to remember everything.",
  highlight
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="sparkles-outline" size={20} color="#0EA5E9" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        {highlight ? <Text style={styles.highlight}>{highlight}</Text> : null}
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    marginBottom: 16
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(15, 118, 110, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2
  },
  textWrapper: {
    flex: 1
  },
  title: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4
  },
  highlight: {
    color: "#A5F3FC",
    fontSize: 13,
    marginBottom: 2
  },
  message: {
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 18
  }
});

export default EncouragementBanner;

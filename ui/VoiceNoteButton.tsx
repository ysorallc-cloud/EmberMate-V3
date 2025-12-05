import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

type VoiceNoteState = "idle" | "recording" | "saving";

type VoiceNoteButtonProps = {
  state: VoiceNoteState;
  onPress: () => void;
};

export function VoiceNoteButton({ state, onPress }: VoiceNoteButtonProps) {
  const label =
    state === "idle" ? "Add voice note" : state === "recording" ? "Recording..." : "Saving...";
  return (
    <Pressable onPress={onPress} style={[styles.button, state === "recording" && styles.recording]}>
      <View style={styles.dotWrapper}>
        <View style={[styles.dot, state === "recording" && styles.dotActive]} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#1E293B",
    alignSelf: "flex-start",
  },
  recording: {
    backgroundColor: "#7F1D1D",
  },
  dotWrapper: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F87171",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#F87171",
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1,
  },
  label: {
    fontSize: 13,
    color: "#F9FAFB",
  },
});

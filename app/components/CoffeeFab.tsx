import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CoffeeFab() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => router.push("/coffee")}
      >
        <Ionicons name="cafe" size={26} color="#1E293B" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 500
  },
  button: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#FACC15",
    justifyContent: "center",
    alignItems: "center",

    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 }
        }
      : {
          elevation: 8
        })
  }
});

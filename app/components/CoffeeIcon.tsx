// app/components/CoffeeIcon.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/theme-tokens";

type Props = {
  size?: number;
};

export default function CoffeeIcon({ size = 24 }: Props) {
  return (
    <View style={styles.iconWrapper}>
      <Ionicons name="cafe" size={size} color="#FACC15" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.6)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface, // matches other cards
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6
  }
});

// app/components/CoffeeSupportSheet.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes } from "../theme/theme-tokens";

type Props = {
  onClose: () => void;
};

export default function CoffeeSupportSheet({ onClose }: Props) {
  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />

      <Text style={styles.title}>More support for this moment</Text>

      <Text style={styles.section}>Reflective questions</Text>
      <Text style={styles.item}>• What part of today hit hardest?</Text>
      <Text style={styles.item}>• Do you need support, space, or clarity?</Text>
      <Text style={styles.item}>
        • Is this a boundary issue, an energy issue, or both?
      </Text>

      <Text style={styles.section}>Communication phrases</Text>
      <Text style={styles.item}>• I need to pause this and revisit later.</Text>
      <Text style={styles.item}>• Today is hitting harder than I expected.</Text>
      <Text style={styles.item}>• Can you help with one part of this?</Text>

      <Text style={styles.section}>Helpful reads</Text>
      <Text style={styles.item}>• Reset your nervous system in 90 seconds</Text>
      <Text style={styles.item}>• When everything feels heavy at once</Text>
      <Text style={styles.item}>• Why energy dips aren’t failures</Text>

      <TouchableOpacity onPress={onClose} style={styles.btn} activeOpacity={0.9}>
        <Text style={styles.btnText}>Close support</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: Colors.borderSubtle
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderSubtle,
    marginBottom: Spacing.sm
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: "600",
    marginBottom: Spacing.sm
  },
  section: {
    color: Colors.ok,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    fontWeight: "600",
    fontSize: FontSizes.sm
  },
  item: {
    color: Colors.textPrimary,
    marginBottom: 4,
    fontSize: FontSizes.sm,
    lineHeight: 18
  },
  btn: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: 999,
    alignItems: "center"
  },
  btnText: {
    color: Colors.background,
    fontWeight: "600",
    fontSize: FontSizes.sm
  }
});

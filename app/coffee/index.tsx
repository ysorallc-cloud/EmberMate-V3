// app/coffee/index.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
import BreathingOrb from "../components/BreathingOrb";
import Accordion from "../components/Accordion";
import CoffeeIcon from "../components/CoffeeIcon";
import CoffeeSupportSheet from "../components/CoffeeSupportSheet";
import { Colors, Spacing, FontSizes } from "../theme/theme-tokens";

export default function CoffeeMoment() {
  const router = useRouter();
  const [showSupport, setShowSupport] = useState(false);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Coffee Moment</Text>
        <Text style={styles.subtitle}>
          Take a short pause so your body and brain can catch up before the next
          decision.
        </Text>

        <View style={styles.iconWrapper}>
          <CoffeeIcon size={32} />
        </View>

        <View style={styles.orbWrapper}>
          <BreathingOrb />
          <Text style={styles.cycleText}>Cycle 1 of 3 • about 90 seconds</Text>
        </View>

        <Accordion title="Communication support" startOpen>
          <Text style={styles.item}>Send a short update, not a full report.</Text>
          <Text style={styles.item}>Set one boundary calmly, not ten at once.</Text>
          <Text style={styles.item}>
            Try: “Here is what I am noticing. Here is what I need. One thing
            that would help is…”
          </Text>
        </Accordion>

        <Accordion title="Helpful questions">
          <Text style={styles.item}>What has been hardest about today?</Text>
          <Text style={styles.item}>Where do you most need support?</Text>
          <Text style={styles.item}>What can safely wait until later?</Text>
        </Accordion>

        <Accordion title="Helpful articles">
          <Text style={styles.item}>Overwhelm vs. shutdown</Text>
          <Text style={styles.item}>Quick nervous system resets</Text>
          <Text style={styles.item}>
            How to ask for help without overexplaining
          </Text>
        </Accordion>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => router.push("/coffee/reset")}
          activeOpacity={0.9}
        >
          <Text style={styles.resetText}>☕  2 Minute Reset</Text>
        </TouchableOpacity>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => setShowSupport(true)}
            style={styles.secondaryButton}
            activeOpacity={0.9}
          >
            <Text style={styles.secondaryText}>More support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.secondaryButton}
            activeOpacity={0.9}
          >
            <Text style={styles.secondaryText}>Return to Today</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showSupport && (
        <CoffeeSupportSheet onClose={() => setShowSupport(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: "700",
    marginBottom: Spacing.xs
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginBottom: Spacing.lg
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: Spacing.lg
  },
  orbWrapper: {
    alignItems: "center",
    marginBottom: Spacing.lg
  },
  cycleText: {
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    fontSize: FontSizes.sm
  },
  item: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    marginBottom: Spacing.sm,
    lineHeight: 20
  },
  resetButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    alignItems: "center"
  },
  resetText: {
    color: Colors.ok,
    fontSize: FontSizes.md,
    fontWeight: "500"
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    marginHorizontal: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: "center"
  },
  secondaryText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm
  }
});

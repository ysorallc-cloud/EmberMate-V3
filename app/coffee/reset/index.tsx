
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useRouter } from "expo-router";
import BreathingOrb from "../../components/BreathingOrb";

import {
  TWO_MINUTE_RESET_STEPS,
  ResetStep
} from "../../components/two-minute-reset/config";
import {
  Colors,
  Spacing,
  FontSizes,
  Radii
} from "../../theme/theme-tokens";

export default function TwoMinuteResetScreen() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [customText, setCustomText] = useState("");

  const step: ResetStep = TWO_MINUTE_RESET_STEPS[stepIndex];
  const isLast = stepIndex === TWO_MINUTE_RESET_STEPS.length - 1;

  function next() {
    if (!isLast) {
      setStepIndex(prev => prev + 1);
    } else {
      router.back();
      console.log("2 Minute Reset completed. You showed up for yourself.");
    }
  }

  function renderChoices(step: ResetStep) {
    return (
      <View style={styles.choicesWrapper}>
        {step.options?.map(opt => (
          <TouchableOpacity
            key={opt}
            style={styles.choice}
            onPress={() => {
              if (opt === "Something else") {
                setCustomText("");
              }
              next();
            }}
          >
            <Text style={styles.choiceText}>{opt}</Text>
          </TouchableOpacity>
        ))}

        {step.allowCustomText && (
          <TextInput
            placeholder="Use your own word"
            placeholderTextColor={Colors.textMuted}
            value={customText}
            onChangeText={setCustomText}
            style={styles.input}
          />
        )}
      </View>
    );
  }

  function renderInfo(step: ResetStep) {
    return (
      <View style={styles.infoWrapper}>
        <Text style={styles.body}>{step.body}</Text>
      </View>
    );
  }

  function renderBreathStep(step: ResetStep) {
    return (
      <View style={styles.breathWrapper}>
        <Text style={styles.body}>{step.body}</Text>
        <BreathingOrb />
        <Text style={styles.breathNote}>Follow the rhythm above.</Text>
      </View>
    );
  }

  function renderStep() {
    switch (step.type) {
      case "choices":
        return renderChoices(step);
      case "info":
        return renderInfo(step);
      case "breath":
        return renderBreathStep(step);
      default:
        return null;
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.progressText}>
        Step {stepIndex + 1} of {TWO_MINUTE_RESET_STEPS.length} · 2 Minute Reset
      </Text>

      <Text style={styles.title}>{step.title}</Text>

      {renderStep()}

      <TouchableOpacity style={styles.button} onPress={next} activeOpacity={0.9}>
        <Text style={styles.buttonText}>{isLast ? "Done" : "Next"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backLink}
        onPress={() => router.back()}
      >
        <Text style={styles.backLinkText}>Return to Coffee Moment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg
  },
  progressText: {
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
    fontSize: FontSizes.sm
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: "600",
    marginBottom: Spacing.md
  },
  body: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginBottom: Spacing.lg,
    lineHeight: 22
  },
  choicesWrapper: {
    marginBottom: Spacing.lg
  },
  choice: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.cardBorder
  },
  choiceText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    color: Colors.textPrimary
  },
  infoWrapper: {
    marginBottom: Spacing.lg
  },
  breathWrapper: {
    alignItems: "center",
    marginBottom: Spacing.xl
  },
  breathNote: {
    color: Colors.textMuted,
    marginTop: Spacing.sm
  },
  button: {
    backgroundColor: Colors.ok,
    padding: Spacing.md,
    borderRadius: Radii.md,
    alignItems: "center",
    marginBottom: Spacing.lg
  },
  buttonText: {
    color: "#000",
    fontSize: FontSizes.lg,
    fontWeight: "600"
  },
  backLink: {
    alignItems: "center",
    marginBottom: Spacing.lg
  },
  backLinkText: {
    color: Colors.textSecondary,
    textDecorationLine: "underline"
  }
});

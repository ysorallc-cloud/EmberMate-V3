import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

// ----- Scenario model (adapted from your JSX) -----

type BaseSignals = {
  mood: number;
  energy: number;
  pain?: number;
  sleep?: number;
  agitation?: number;
  clarity?: number;
};

type AlertType = "prediction" | "communication" | "witness" | "crisis" | "handoff";

type ScenarioAlert = {
  type: AlertType;
  icon: string;
  title: string;
  text: string;
  actions?: [string, string];
};

type ScenarioFeatureType =
  | "memory"
  | "simplified-ui"
  | "expanded-ui";

type ScenarioFeature = {
  type: ScenarioFeatureType;
  label: string;
};

type Scenario = {
  id: string;
  name: string;
  state: string;
  arcPercent: number;
  arcColor: string;
  signals: BaseSignals;
  message: string;
  feature: ScenarioFeature | null;
  alert: ScenarioAlert | null;
  simplified?: boolean;
  isCaregiver?: boolean;
};

const SCENARIOS: Scenario[] = [
  {
    id: "memory",
    name: "1. Memory",
    state: "Heavy",
    arcPercent: 25,
    arcColor: "#FF6B6B",
    signals: { mood: 35, energy: 25, pain: 80, sleep: 30 },
    message:
      "The pain is loud today. Last time it hit this level was November 18 — a warm bath and early rest helped you through it.",
    feature: {
      type: "memory",
      label: "From your history"
    },
    alert: null
  },
  {
    id: "anticipatory",
    name: "2. Predict",
    state: "Managing",
    arcPercent: 52,
    arcColor: "#FFB347",
    signals: { mood: 50, energy: 45, pain: 50, sleep: 35 },
    message: "You're holding steady, but I noticed something.",
    alert: {
      type: "prediction",
      icon: "📉",
      title: "Pattern notice",
      text:
        "Your sleep has dropped 3 nights in a row. Historically, this precedes a harder stretch for you. Might be worth protecting your energy today."
    },
    feature: null
  },
  {
    id: "dynamic-hard",
    name: "3a. UI (Hard)",
    state: "Heavy",
    arcPercent: 22,
    arcColor: "#FF6B6B",
    signals: { mood: 25, energy: 20, pain: 85, sleep: 25 },
    message: "Today is hard. I've simplified things — only what matters is here.",
    feature: {
      type: "simplified-ui",
      label: "Simplified mode active"
    },
    alert: null,
    simplified: true
  },
  {
    id: "dynamic-good",
    name: "3b. UI (Good)",
    state: "Steady",
    arcPercent: 78,
    arcColor: "#4ECDC4",
    signals: { mood: 75, energy: 70, pain: 25, sleep: 80 },
    message: "You're rested and the pain is quiet. Room to breathe today.",
    feature: {
      type: "expanded-ui",
      label: "Full options available"
    },
    alert: null,
    simplified: false
  },
  {
    id: "communication",
    name: "4. Share",
    state: "Managing",
    arcPercent: 55,
    arcColor: "#FFB347",
    signals: { mood: 55, energy: 50, pain: 45, sleep: 60 },
    message: "You have a rheumatology appointment tomorrow at 2pm.",
    alert: {
      type: "communication",
      icon: "📋",
      title: "Appointment prep",
      text:
        "Want me to generate a summary for Dr. Martinez? I can highlight patterns from the last 30 days.",
      actions: ["Generate summary", "Not now"]
    },
    feature: null
  },
  {
    id: "witness",
    name: "5. Witness",
    state: "Managing",
    arcPercent: 50,
    arcColor: "#FFB347",
    signals: { mood: 55, energy: 50, pain: 50, sleep: 55 },
    message: "It's been three months since you started tracking.",
    alert: {
      type: "witness",
      icon: "🌱",
      title: "A moment of reflection",
      text:
        "90 days ago, you were averaging 5 hard days per week. Now it's 3. That's not luck — that's you learning your body. I see the work you're putting in.",
      actions: ["View journey", "Dismiss"]
    },
    feature: null
  },
  {
    id: "crisis",
    name: "6. Crisis",
    state: "Heavy",
    arcPercent: 15,
    arcColor: "#FF6B6B",
    signals: { mood: 15, energy: 10, pain: 90, sleep: 15 },
    message: "I'm noticing a pattern that concerns me a little.",
    alert: {
      type: "crisis",
      icon: "💙",
      title: "Checking in closer",
      text:
        "The last few days have been really hard — pain, sleep, mood, and energy are all struggling together. I want to make sure you're okay. Can we check in more closely this week?",
      actions: ["Yes, check on me", "I'm okay"]
    },
    feature: null
  },
  {
    id: "caregiver",
    name: "7. Coordinate",
    state: "Variable",
    arcPercent: 45,
    arcColor: "#FFB347",
    signals: { mood: 50, energy: 40, agitation: 55, clarity: 45 },
    message: "Dad had a restless night but settled after breakfast.",
    isCaregiver: true,
    alert: {
      type: "handoff",
      icon: "🔄",
      title: "Shift handoff",
      text: "Sarah takes over in 2 hours. Ready to share notes?",
      actions: ["Write handoff", "Remind me later"]
    },
    feature: null
  }
];

const FEATURE_TITLES = [
  "Memory That Compounds",
  "Anticipatory Awareness",
  "Dynamic UI (Hard Day)",
  "Dynamic UI (Good Day)",
  "Communication Artifacts",
  "Witness Reflections",
  "Crisis-Aware Intelligence",
  "Caregiver Coordination"
];

const FEATURE_DESCRIPTIONS = [
  "The message references your personal history — what helped before.",
  "Detects patterns that precede hard days and warns you.",
  "On hard days, the UI simplifies. Only essentials shown.",
  "On good days, more options appear. Insights accessible.",
  "Before appointments, offers to generate shareable summaries.",
  "At milestones, reflects on your journey with specific data.",
  "When multiple signals crash together, checks in more closely.",
  "Coordinates handoffs between multiple caregivers."
];

// ----- Helpers -----

const getRingColor = (value: number, inverted: boolean) => {
  const effective = inverted ? 100 - value : value;
  if (effective >= 60) return "#4ECDC4";
  if (effective >= 40) return "#FFB347";
  return "#FF6B6B";
};

type SignalRingProps = {
  value: number;
  label: string;
  inverted?: boolean;
  mini?: boolean;
};

const SignalRing: React.FC<SignalRingProps> = ({
  value,
  label,
  inverted = false,
  mini = false
}) => {
  const size = mini ? 44 : 52;
  const strokeWidth = mini ? 3 : 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = inverted ? 100 - value : value;
  const offset = circumference - (fillPercent / 100) * circumference;
  const color = getRingColor(value, inverted);

  return (
    <View style={styles.signalRingWrapper}>
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </Svg>
      <Text style={styles.signalRingLabel}>{label}</Text>
    </View>
  );
};

const EmberMateIntegrated: React.FC = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const current = SCENARIOS[scenarioIndex];

  const signalKeys = useMemo(
    () =>
      current.isCaregiver
        ? [
            { k: "mood" as const, l: "Mood" },
            { k: "energy" as const, l: "Energy" },
            { k: "agitation" as const, l: "Agitation", inv: true },
            { k: "clarity" as const, l: "Clarity" }
          ]
        : [
            { k: "mood" as const, l: "Mood" },
            { k: "energy" as const, l: "Energy" },
            { k: "pain" as const, l: "Pain", inv: true },
            { k: "sleep" as const, l: "Sleep" }
          ],
    [current]
  );

  const isSimplified = !!current.simplified;

  return (
    <View style={styles.root}>
      {/* Scenario chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scenarioChipsRow}
      >
        {SCENARIOS.map((s, i) => {
          const selected = i === scenarioIndex;
          return (
            <TouchableOpacity
              key={s.id}
              onPress={() => setScenarioIndex(i)}
              activeOpacity={0.85}
              style={[
                styles.scenarioChip,
                {
                  borderColor: selected ? s.arcColor : "#333",
                  backgroundColor: selected ? `${s.arcColor}25` : "transparent"
                }
              ]}
            >
              <Text
                style={[
                  styles.scenarioChipText,
                  { color: selected ? s.arcColor : "#9CA3AF" }
                ]}
              >
                {s.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Feature explanation */}
      <View style={[styles.featureCard, { borderLeftColor: current.arcColor }]}>
        <Text
          style={[
            styles.featureTitle,
            { color: current.arcColor }
          ]}
        >
          Feature {scenarioIndex + 1}: {FEATURE_TITLES[scenarioIndex]}
        </Text>
        <Text style={styles.featureDescription}>
          {FEATURE_DESCRIPTIONS[scenarioIndex]}
        </Text>
      </View>

      {/* Main "phone" panel */}
      <View style={styles.phoneCard}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerSub}>
              {current.isCaregiver ? "Caring for" : "Good morning"}
            </Text>
            <Text style={styles.headerTitle}>
              {current.isCaregiver ? "Dad" : "Today"}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightMain}>Thursday</Text>
            <Text style={styles.headerRightSub}>Dec 4</Text>
          </View>
        </View>

        {/* Arc */}
        <View style={styles.arcWrapper}>
          <Svg width={160} height={90} viewBox="0 0 160 90">
            <Path
              d="M 12 82 A 68 68 0 0 1 148 82"
              fill="none"
              stroke="#111827"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <Path
              d="M 12 82 A 68 68 0 0 1 148 82"
              fill="none"
              stroke={current.arcColor}
              strokeWidth={7}
              strokeLinecap="round"
              strokeDasharray={`${(current.arcPercent / 100) * 214} 214`}
            />
          </Svg>
          <View style={styles.arcStateWrapper}>
            <Text style={[styles.arcStateText, { color: current.arcColor }]}>
              {current.state}
            </Text>
          </View>
        </View>

        {/* Signals */}
        <View
          style={[
            styles.signalsRow,
            isSimplified && { opacity: 0.6, paddingVertical: 12 }
          ]}
        >
          {signalKeys.map((s) => {
            const value = (current.signals as any)[s.k] ?? 0;
            return (
              <SignalRing
                key={s.k}
                value={value}
                label={s.l}
                inverted={!!s.inv}
                mini={isSimplified}
              />
            );
          })}
        </View>

        {/* Feature pill */}
        {current.feature && (
          <View style={styles.featurePill}>
            <View
              style={[
                styles.featureDot,
                { backgroundColor: current.arcColor }
              ]}
            />
            <Text style={styles.featurePillText}>
              {current.feature.label}
            </Text>
          </View>
        )}

        {/* Main message */}
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>{current.message}</Text>
        </View>

        {/* Alert card */}
        {current.alert && (
          <View
            style={[
              styles.alertCard,
              alertStyleForType(current.alert.type)
            ]}
          >
            <View style={styles.alertRow}>
              <Text style={styles.alertIcon}>{current.alert.icon}</Text>
              <View style={styles.alertTextWrapper}>
                <Text
                  style={[
                    styles.alertTitle,
                    alertTitleColorForType(current.alert.type)
                  ]}
                >
                  {current.alert.title}
                </Text>
                <Text style={styles.alertBody}>{current.alert.text}</Text>
                {current.alert.actions && (
                  <View style={styles.alertActionsRow}>
                    <TouchableOpacity
                      style={[
                        styles.alertPrimaryButton,
                        alertPrimaryButtonForType(current.alert.type)
                      ]}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          styles.alertPrimaryButtonText,
                          alertPrimaryButtonTextForType(current.alert.type)
                        ]}
                      >
                        {current.alert.actions[0]}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.alertSecondaryButton}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.alertSecondaryButtonText}>
                        {current.alert.actions[1]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Quick actions */}
        {isSimplified ? (
          <TouchableOpacity
            style={styles.quickSingleButton}
            activeOpacity={0.85}
          >
            <Text style={styles.quickSingleButtonText}>Quick check-in</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickButton} activeOpacity={0.85}>
              <Text style={styles.quickButtonText}>📝 Check in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickButton} activeOpacity={0.85}>
              <Text style={styles.quickButtonText}>📊 Insights</Text>
            </TouchableOpacity>
            {scenarioIndex === 3 && (
              <TouchableOpacity style={styles.quickButton} activeOpacity={0.85}>
                <Text style={styles.quickButtonText}>📤 Share</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Coffee moment */}
        <View
          style={[
            styles.coffeeRow,
            isSimplified && {
              backgroundColor: "rgba(212,165,116,0.12)",
              borderColor: "rgba(212,165,116,0.3)"
            }
          ]}
        >
          <Text style={styles.coffeeIcon}>☕</Text>
          <Text
            style={[
              styles.coffeeText,
              isSimplified && { color: "#D4A574", fontSize: 14 }
            ]}
          >
            {isSimplified
              ? "Take a moment — you need it"
              : "Need a moment?"}
          </Text>
        </View>
      </View>
    </View>
  );
};

// ----- Alert styling helpers -----

function alertStyleForType(type: AlertType) {
  switch (type) {
    case "crisis":
      return {
        backgroundColor: "rgba(255,107,107,0.08)",
        borderColor: "rgba(255,107,107,0.3)"
      };
    case "witness":
      return {
        backgroundColor: "rgba(78,205,196,0.08)",
        borderColor: "rgba(78,205,196,0.3)"
      };
    default:
      return {
        backgroundColor: "rgba(212,165,116,0.08)",
        borderColor: "rgba(212,165,116,0.3)"
      };
  }
}

function alertTitleColorForType(type: AlertType) {
  switch (type) {
    case "crisis":
      return { color: "#FF6B6B" };
    case "witness":
      return { color: "#4ECDC4" };
    default:
      return { color: "#D4A574" };
  }
}

function alertPrimaryButtonForType(type: AlertType) {
  switch (type) {
    case "crisis":
      return { backgroundColor: "rgba(255,107,107,0.2)" };
    case "witness":
      return { backgroundColor: "rgba(78,205,196,0.2)" };
    default:
      return { backgroundColor: "rgba(212,165,116,0.2)" };
  }
}

function alertPrimaryButtonTextForType(type: AlertType) {
  switch (type) {
    case "crisis":
      return { color: "#FF6B6B" };
    case "witness":
      return { color: "#4ECDC4" };
    default:
      return { color: "#D4A574" };
  }
}

// ----- Styles -----

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
    marginBottom: 24
  },
  scenarioChipsRow: {
    paddingVertical: 4,
    paddingHorizontal: 2
  },
  scenarioChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 6
  },
  scenarioChipText: {
    fontSize: 10,
    fontWeight: "600"
  },
  featureCard: {
    backgroundColor: "#111827",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 16,
    borderLeftWidth: 3
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4
  },
  featureDescription: {
    fontSize: 11,
    color: "#9CA3AF",
    lineHeight: 16
  },
  phoneCard: {
    backgroundColor: "#020617",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.3)"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  headerSub: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 2
  },
  headerTitle: {
    color: "#F9FAFB",
    fontSize: 22,
    fontWeight: "600"
  },
  headerRight: {
    alignItems: "flex-end"
  },
  headerRightMain: {
    color: "#F9FAFB",
    fontSize: 13
  },
  headerRightSub: {
    color: "#6B7280",
    fontSize: 11
  },
  arcWrapper: {
    alignItems: "center",
    marginBottom: 4
  },
  arcStateWrapper: {
    marginTop: -10
  },
  arcStateText: {
    fontSize: 20,
    fontWeight: "600"
  },
  signalsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    marginVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#111827"
  },
  signalRingWrapper: {
    alignItems: "center"
  },
  signalRingLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "rgba(249,250,251,0.6)"
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 10
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  featurePillText: {
    fontSize: 11,
    color: "rgba(249,250,251,0.6)"
  },
  messageCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },
  messageText: {
    color: "rgba(249,250,251,0.85)",
    fontSize: 14,
    lineHeight: 20
  },
  alertCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    marginBottom: 12
  },
  alertRow: {
    flexDirection: "row"
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 10
  },
  alertTextWrapper: {
    flex: 1
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4
  },
  alertBody: {
    fontSize: 12,
    color: "rgba(249,250,251,0.7)",
    lineHeight: 18
  },
  alertActionsRow: {
    flexDirection: "row",
    marginTop: 10
  },
  alertPrimaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8
  },
  alertPrimaryButtonText: {
    fontSize: 12,
    fontWeight: "500"
  },
  alertSecondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(15,23,42,0.9)"
  },
  alertSecondaryButtonText: {
    fontSize: 12,
    color: "rgba(249,250,251,0.6)"
  },
  quickRow: {
    flexDirection: "row",
    marginBottom: 12
  },
  quickButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center"
  },
  quickButtonText: {
    fontSize: 12,
    color: "#F9FAFB"
  },
  quickSingleButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    marginBottom: 12
  },
  quickSingleButtonText: {
    fontSize: 14,
    color: "#F9FAFB"
  },
  coffeeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  coffeeIcon: {
    fontSize: 18,
    marginRight: 8
  },
  coffeeText: {
    fontSize: 12,
    color: "rgba(249,250,251,0.5)"
  }
});

export default EmberMateIntegrated;


import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuickWinChip from "../components/QuickWinChip";
import EncouragementBanner from "../components/EncouragementBanner";
import InsightBubble from "../components/InsightBubble";

/**
 * InsightsScreen
 *  - Dark navy theme to match Today / Log
 *  - Shows:
 *      1) Weekly summary stats (adherence, vitals, sleep)
 *      2) "What seems connected" bar chart for patterns
 *      3) Gentle, EI‑driven takeaways + quick wins
 *
 * All data is mock for now and can later be wired to real logs.
 */

type WeeklySummaryMetric = {
  id: string;
  label: string;
  value: string;
  helper?: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type CorrelationMetric = {
  id: string;
  label: string;
  value: number; // 0–1 representing strength
};

const weeklySummary: WeeklySummaryMetric[] = [
  {
    id: "adherence",
    label: "7‑day consistency",
    value: "82%",
    helper: "You checked in most days this week.",
    icon: "checkmark-done-outline"
  },
  {
    id: "stableVitals",
    label: "Stable vitals days",
    value: "5 / 7",
    helper: "Most days, vitals stayed in your usual range.",
    icon: "pulse-outline"
  },
  {
    id: "avgSleep",
    label: "Avg sleep",
    value: "6.4 h",
    helper: "Sleep has been a little up and down.",
    icon: "moon-outline"
  }
];

const correlationData: CorrelationMetric[] = [
  { id: "painSleep", label: "Pain & low sleep", value: 0.86 },
  { id: "painStress", label: "Pain & stress", value: 0.72 },
  { id: "moodSleep", label: "Mood & sleep", value: 0.64 },
  { id: "hydrationEnergy", label: "Hydration & energy", value: 0.41 }
];

const toughDaysThisWeek = 3;
const activeDaysThisWeek = 5;

export default function InsightsScreen() {
  const highestCorrelation = useMemo(
    () =>
      correlationData.reduce((max, item) =>
        item.value > max.value ? item : max
      ),
    []
  );

  const quickWins = useMemo(() => {
    const wins: string[] = [];

    if (activeDaysThisWeek >= 4) {
      wins.push("You showed up most days. That consistency really helps.");
    } else {
      wins.push("Even a couple of logs give EmberMate something to work with.");
    }

    if (highestCorrelation.id === "painSleep") {
      wins.push("On tougher pain days, sleep has usually been shorter.");
    } else if (highestCorrelation.id === "moodSleep") {
      wins.push("Your mood seems to lift when sleep is more steady.");
    }

    wins.push("You do not need to fix everything at once. One small tweak is enough for this week.");

    return wins;
  }, []);

  const visitTalkingPoints = useMemo(() => {
    const points: string[] = [];

    if (highestCorrelation.id === "painSleep") {
      points.push("Ask about pain options that also support better sleep.");
    }
    if (highestCorrelation.id === "painStress") {
      points.push("Share how stress and pain seem to flare together.");
    }
    if (toughDaysThisWeek >= 2) {
      points.push("Describe what the hardest days looked like in simple language.");
    }

    if (points.length === 0) {
      points.push("Share what has felt a little easier this week and what helped.");
    }

    return points;
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>
            Patterns from your logs so visits stay focused on what matters.
          </Text>
        </View>
        <View style={styles.iconPill}>
          <Ionicons name="stats-chart-outline" size={18} color="#22D3EE" />
        </View>
      </View>

      {/* Week at a glance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>This week at a glance</Text>
        <Text style={styles.cardSubtitle}>
          These highlights come from meds, vitals, symptoms and sleep you logged.
        </Text>

        <View style={styles.summaryRow}>
          {weeklySummary.map((metric) => (
            <View key={metric.id} style={styles.summaryItem}>
              <View style={styles.summaryIconCircle}>
                <Ionicons name={metric.icon} size={18} color="#22D3EE" />
              </View>
              <Text style={styles.summaryLabel}>{metric.label}</Text>
              <Text style={styles.summaryValue}>{metric.value}</Text>
              {metric.helper ? (
                <Text style={styles.summaryHelper}>{metric.helper}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <QuickWinChip
          tone="warm"
          label="Quick win for this week"
          message="Pick one thing to watch: pain on low‑sleep nights, or how your energy changes with hydration."
        />
      </View>

      {/* Correlations / what seems connected */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="trending-up-outline" size={18} color="#22D3EE" />
            <Text style={styles.cardTitle}>What seems connected</Text>
          </View>
          <Text style={styles.sectionHelperText}>
            Taller bars mean a stronger link to tougher days this week.
          </Text>
        </View>

        <View style={styles.chartContainer}>
          {correlationData.map((item) => (
            <View key={item.id} style={styles.chartColumn}>
              <View style={styles.chartBarTrack}>
                <View
                  style={[
                    styles.chartBarFill,
                    { height: `${Math.max(10, item.value * 100)}%` }
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <InsightBubble
          title="How to read this"
          body="This is not a diagnosis. It just shows where your tougher days often line up with things like sleep, stress or hydration so you have a clearer story to share."
        />
      </View>

      {/* Visit prep & emotional support */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Helpful to bring up</Text>
        <Text style={styles.cardSubtitle}>
          Use these as gentle prompts when you are tired or overwhelmed.
        </Text>

        {visitTalkingPoints.map((point, index) => (
          <View key={index.toString()} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{point}</Text>
          </View>
        ))}

        <EncouragementBanner
          headline="You are already doing a lot."
          message="Showing up, logging when you can, and staying curious about patterns is enough. EmberMate is here to remember the details, so you do not have to."
        />
      </View>

      {/* Gentle reflection */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tiny reflection</Text>
        <Text style={styles.cardSubtitle}>
          A quick gut‑check to close the week.
        </Text>

        <Text style={styles.promptText}>
          This week felt{" "}
          <Text style={styles.promptHighlight}>
            {toughDaysThisWeek >= 3 ? "pretty heavy" : "a bit uneven"}
          </Text>
          . One small thing that might help next week is...
        </Text>

        <Text style={styles.promptHint}>
          You can keep it simple: “earlier bedtime,” “water bottle nearby,” or
          “write down questions for my doctor.”
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617"
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F9FAFB",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#CBD5F5"
  },
  iconPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.6)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.9)"
  },
  card: {
    backgroundColor: "rgba(15,23,42,0.95)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 4
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 12
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12
  },
  summaryItem: {
    flex: 1,
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(55,65,81,0.9)"
  },
  summaryIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(8,47,73,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4
  },
  summaryLabel: {
    fontSize: 11,
    color: "#E5E7EB",
    marginBottom: 4
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 2
  },
  summaryHelper: {
    fontSize: 11,
    color: "#9CA3AF"
  },
  sectionHeaderRow: {
    marginBottom: 8
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4
  },
  sectionHelperText: {
    fontSize: 12,
    color: "#9CA3AF"
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 10
  },
  chartColumn: {
    flex: 1,
    alignItems: "center"
  },
  chartBarTrack: {
    width: 34,
    height: 140,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.9)",
    borderWidth: 1,
    borderColor: "rgba(30,64,175,0.8)",
    overflow: "hidden",
    justifyContent: "flex-end"
  },
  chartBarFill: {
    width: "100%",
    backgroundColor: "#22D3EE",
    borderRadius: 999
  },
  chartLabel: {
    marginTop: 6,
    fontSize: 11,
    color: "#E5E7EB",
    textAlign: "center"
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 6
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22D3EE",
    marginTop: 7,
    marginRight: 8
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "#E5E7EB"
  },
  promptText: {
    fontSize: 14,
    color: "#E5E7EB",
    marginBottom: 6
  },
  promptHighlight: {
    fontWeight: "700",
    color: "#FACC15"
  },
  promptHint: {
    fontSize: 12,
    color: "#9CA3AF"
  }
});

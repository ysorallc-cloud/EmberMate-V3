import React from "react";
import { ScrollView } from "react-native";
import { EmberCard } from "../../components/EmberCard";
import { useCareData } from "../context/CareContext";

export default function InsightsScreen() {
  const { meds, moodToday } = useCareData();

  const totalDoses = meds.length;
  const takenDoses = meds.filter(m => m.status === "taken").length;
  const adherencePercent =
    totalDoses === 0 ? 0 : Math.round((takenDoses / totalDoses) * 100);

  const latestMood = moodToday[0];

  const adherenceText =
    totalDoses === 0
      ? "No doses configured for today."
      : `Adherence: ${adherencePercent}% for today (${takenDoses} of ${totalDoses} doses marked taken).`;

  const moodSummary = latestMood
    ? `Today: ${latestMood.score} / 10 • ${latestMood.label}.`
    : "Today: no mood entry logged yet.";

  return (
    <ScrollView
      style={{ flex: 1, padding: 16 }}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <EmberCard
        title="Meds adherence"
        subtitle="Today"
        body={[
          adherenceText,
          "Most missed: afternoon dose (pattern from last week).",
          "Note: afternoons often feel 'too wiped' or busy.",
        ]}
        footer="Micro-action: explore a softer afternoon routine."
      />

      <EmberCard
        title="Mood vs symptoms"
        body={[
          moodSummary,
          "Higher pain days link with low sleep & low mood.",
          "On days with short walks, mood is slightly higher.",
        ]}
        footer="Use this to gently adjust pacing and plans."
      />

      <EmberCard
        title="Stability overview"
        subtitle="Monthly stability"
        body={[
          "Mood: mostly in the 5–7 range.",
          "Pain: spikes around treatment weeks.",
          "Sleep: choppy but improving after a 10 PM wind-down.",
        ]}
        footer="Good enough is still progress."
      />
    </ScrollView>
  );
}

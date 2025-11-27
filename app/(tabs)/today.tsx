import React from "react";
import { ScrollView } from "react-native";
import { EmberCard } from "../../components/EmberCard";
import { useCareData } from "../context/CareContext";

export default function TodayScreen() {
  const { meds, moodToday } = useCareData();

  const morning = meds.find(m => m.id === "morning");
  const evening = meds.find(m => m.id === "evening");
  const latestMood = moodToday[0];

  const formatMedStatus = (med?: typeof meds[number] | undefined) => {
    if (!med) return "Not set";
    const statusLabel =
      med.status === "taken"
        ? "taken"
        : med.status === "missed"
        ? "missed"
        : "planned";
    return `${med.label.split(" ")[0]} ${statusLabel}`;
  };

  const todayMoodText = latestMood
    ? `${latestMood.score} / 10 • ${latestMood.label}`
    : "Not logged yet";

  return (
    <ScrollView
      style={{ flex: 1, padding: 16 }}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <EmberCard
        title="Notes & reflections"
        subtitle={'Last note: "Better after the afternoon nap."'}
        body={[
          "Today’s focus: pacing and comfort.",
          'Yesterday’s note: "Pain higher in the evening."',
        ]}
      />

      <EmberCard
        title="Today at a glance"
        subtitle="Snapshot pulled from your log"
        body={[
          `Meds • ${formatMedStatus(morning)} • ${evening ? "Evening planned" : ""}`.trim(),
          `Mood • ${todayMoodText}`,
          "Sleep • 6 hours • woke twice.",
          "Activity • Short walk planned after lunch.",
        ]}
        footer="Use this screen as your quick check-in before making changes."
      />

      <EmberCard
        title="Meds & routines"
        subtitle="Key moments for today"
        body={[
          morning
            ? `Morning meds • ${morning.time} • ${
                morning.status === "taken"
                  ? "Done"
                  : morning.status === "missed"
                  ? "Missed"
                  : "Planned"
              }`
            : "Morning meds • Not set",
          evening
            ? `Evening meds • ${evening.time} • ${
                evening.status === "planned"
                  ? "Planned"
                  : evening.status === "taken"
                  ? "Taken"
                  : "Missed"
              }`
            : "Evening meds • Not set",
          "Weekly review • Sunday • 6:00 PM.",
        ]}
        footer="Small, consistent check-ins will keep your reports accurate."
      />

      <EmberCard
        title="Mood & energy"
        subtitle="How today is trending"
        body={[
          `Now • ${todayMoodText}`,
          "Best time of day • late morning.",
          "Hardest time • evenings after 7 PM.",
        ]}
        footer="You’ll see these trends over time in Weekly Patterns."
      />

      <EmberCard
        title="Symptoms & vitals"
        subtitle="What to keep an eye on"
        body={[
          "Pain • 6 / 10 • since 3 days.",
          "Nausea • 2 / 10 • today only.",
          "BP: 132 / 84 • HR: 82 • Temp: 98.4°F.",
        ]}
        footer="Flag anything worrying in your log so it’s ready for providers."
      />
    </ScrollView>
  );
}

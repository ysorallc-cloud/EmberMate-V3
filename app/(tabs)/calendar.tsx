import { ScrollView, View, Text } from "react-native";
import { EmberCard } from "../../components/EmberCard";
import { SectionHeader } from "../../components/SectionHeader";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";

export default function CalendarScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.pageBackground }}
      contentContainerStyle={{ padding: layout.screenPadding, paddingBottom: 32 }}
    >
      <SectionHeader label="Calendar & routines" />

      <EmberCard
        title="Upcoming appointments"
        body={[
          "Mon 9:30 AM • Oncology follow‑up",
          "Thu 2:00 PM • PT session",
          "Next Tue 11:15 AM • Primary care",
        ]}
        footer="Tap an appointment to see related notes."
      />

      <EmberCard
        title="Care routines"
        subtitle="Repeating items"
        body={[
          "Morning check‑in • every day • 8:00 AM",
          "Evening meds review • every day • 8:30 PM",
          "Weekly pattern review • Sundays • 6:00 PM",
        ]}
        footer="These routines sync with your daily log."
      />

      <SectionHeader label="Snapshot by day" />

      <EmberCard
        title="This week"
        body={[
          "Mon • Pain high • Sleep low",
          "Tue • Slight improvement",
          "Wed • Stable, low energy",
        ]}
        footer="Use this view to prep for weekly review."
      />
    </ScrollView>
  );
}

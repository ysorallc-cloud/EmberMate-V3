import React from "react";
import { ScrollView } from "react-native";
import { EmberCard } from "../../components/EmberCard";

export default function TodayScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <EmberCard
        title="Notes & reflections"
        subtitle='Last note: "Better after the afternoon nap."'
        body={[
          "Today's focus: pacing and comfort.",
          'Yesterday's note: "Pain higher in the evening."',
        ]}
      />
    </ScrollView>
  );
}

import { ScrollView } from "react-native";
import { EmberCard } from "../../components/EmberCard";
import { SectionHeader } from "../../components/SectionHeader";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";

export default function PeopleScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.pageBackground }}
      contentContainerStyle={{ padding: layout.screenPadding, paddingBottom: 32 }}
    >
      <SectionHeader label="Care circle" />

      <EmberCard
        title="Patient profile"
        body={[
          "Name: Alex",
          "Focus: pain, energy, sleep",
          "Preferred tone: calm, direct, honest",
        ]}
        footer="Tap to edit patient details."
      />

      <EmberCard
        title="Caregivers"
        subtitle="People supporting day‑to‑day care"
        body={[
          "You • primary caregiver",
          "Jordan • backup / evenings",
          "Nurse Taylor • home health 2× week",
        ]}
        footer="Tap a name to adjust roles & permissions."
      />

      <SectionHeader label="Provider team" />

      <EmberCard
        title="Medical team"
        body={[
          "Oncologist • Dr. Singh • main contact",
          "Primary care • Dr. Lopez",
          "PT • Morgan • strength & mobility",
        ]}
        footer="Use reports to prepare for visits."
      />

      <SectionHeader label="Coffee chats" />

      <EmberCard
        title="Reset & support"
        body={[
          "Use this space to plan quick 'reset' moments.",
          "5‑minute walk, deep‑breathing, or just sit with a warm drink.",
        ]}
        footer="These tiny resets protect *you* as caregiver."
      />
    </ScrollView>
  );
}

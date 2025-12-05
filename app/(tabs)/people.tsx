import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CareContactType =
  | "primary-caregiver"
  | "caregiver"
  | "primary-care"
  | "specialist"
  | "nurse"
  | "pharmacy"
  | "other";

type CareContact = {
  id: string;
  name: string;
  role: string;
  type: CareContactType;
  organization?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

const primaryCaregiver: CareContact = {
  id: "cg-primary",
  name: "Amby",
  role: "Primary caregiver",
  type: "primary-caregiver",
  notes: "Keeps the big picture in view and coordinates updates."
};

const caregivers: CareContact[] = [
  {
    id: "cg-1",
    name: "Jordan",
    role: "Backup caregiver",
    type: "caregiver",
    phone: "555-123-4567",
    notes: "Helps with errands and evening meds."
  }
];

const clinicians: CareContact[] = [
  {
    id: "cl-1",
    name: "Dr. Patel",
    role: "Primary care physician",
    type: "primary-care",
    organization: "Lakeview Clinic",
    phone: "555-987-0012"
  },
  {
    id: "cl-2",
    name: "Nurse Taylor",
    role: "Heart failure nurse",
    type: "nurse",
    organization: "Heart Care Program",
    phone: "555-555-0101"
  },
  {
    id: "cl-3",
    name: "Greenway Pharmacy",
    role: "Pharmacy",
    type: "pharmacy",
    phone: "555-222-7788"
  }
];

function openPhone(phone?: string) {
  if (!phone) return;
  Linking.openURL(`tel:${phone}`).catch(() => {
    // ignore failures for now
  });
}

export default function PeopleScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>People</Text>
            <Text style={styles.subtitle}>
              Everyone on the care team in one place.
            </Text>
          </View>
          <Ionicons name="people-outline" size={26} color="#22D3EE" />
        </View>

        {/* Emotional intelligence / context card */}
        <View style={styles.contextCard}>
          <Ionicons name="heart-circle-outline" size={24} color="#22D3EE" />
          <View style={styles.contextTextWrapper}>
            <Text style={styles.contextTitle}>Who has your back</Text>
            <Text style={styles.contextBody}>
              Use this page to keep track of who to call, what they do, and
              what they need to know. It connects directly to visit prep and
              your reports.
            </Text>
          </View>
        </View>

        {/* Primary caregiver */}
        <Text style={styles.sectionLabel}>Primary</Text>
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.avatarCirclePrimary}>
              <Ionicons name="person-outline" size={22} color="#0B1120" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{primaryCaregiver.name}</Text>
              <Text style={styles.cardRole}>{primaryCaregiver.role}</Text>
            </View>
          </View>
          {primaryCaregiver.notes ? (
            <Text style={styles.cardNotes}>{primaryCaregiver.notes}</Text>
          ) : null}
        </View>

        {/* Caregivers */}
        <Text style={styles.sectionLabel}>Caregivers</Text>
        {caregivers.map(person => (
          <View key={person.id} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.avatarCircleCaregiver}>
                <Ionicons name="home-outline" size={20} color="#E0F2FE" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{person.name}</Text>
                <Text style={styles.cardRole}>{person.role}</Text>
                {person.notes ? (
                  <Text style={styles.cardNotes}>{person.notes}</Text>
                ) : null}
              </View>

              <View style={styles.cardActionsColumn}>
                {person.phone ? (
                  <TouchableOpacity
                    style={styles.iconChip}
                    onPress={() => openPhone(person.phone)}
                  >
                    <Ionicons
                      name="call-outline"
                      size={16}
                      color="#0B1120"
                    />
                  </TouchableOpacity>
                ) : null}
                {person.email ? (
                  <View style={styles.iconChipGhost}>
                    <Ionicons
                      name="mail-outline"
                      size={16}
                      color="#E2E8F0"
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ))}

        {/* Clinicians and services */}
        <Text style={styles.sectionLabel}>Clinicians and services</Text>
        {clinicians.map(contact => (
          <View key={contact.id} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.avatarCircleClinician}>
                <Ionicons
                  name={getClinicianIcon(contact.type)}
                  size={20}
                  color="#ECFEFF"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{contact.name}</Text>
                <Text style={styles.cardRole}>{contact.role}</Text>
                {contact.organization ? (
                  <Text style={styles.cardOrg}>{contact.organization}</Text>
                ) : null}
              </View>

              <View style={styles.cardActionsColumn}>
                {contact.phone ? (
                  <TouchableOpacity
                    style={styles.iconChip}
                    onPress={() => openPhone(contact.phone)}
                  >
                    <Ionicons
                      name="call-outline"
                      size={16}
                      color="#0B1120"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        ))}

        {/* Escalation / visit prep hint */}
        <View style={styles.escalationCard}>
          <View style={styles.escalationIconWrapper}>
            <Ionicons name="alert-circle-outline" size={22} color="#F97316" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.escalationTitle}>When something changes</Text>
            <Text style={styles.escalationBody}>
              In visit prep, EmberMate uses this list to suggest who to update
              when there are new red flags or symptom changes.
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function getClinicianIcon(type: CareContactType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case "primary-care":
      return "medkit-outline";
    case "specialist":
      return "pulse-outline";
    case "nurse":
      return "bandage-outline";
    case "pharmacy":
      return "bag-handle-outline";
    default:
      return "person-outline";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  title: {
    color: "#F9FAFB",
    fontSize: 28,
    fontWeight: "700"
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 4
  },
  contextCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    marginBottom: 20
  },
  contextTextWrapper: {
    marginLeft: 12,
    flex: 1
  },
  contextTitle: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2
  },
  contextBody: {
    color: "#CBD5F5",
    fontSize: 13,
    lineHeight: 18
  },
  sectionLabel: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 6,
    marginTop: 8
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
    padding: 14,
    marginBottom: 10
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  avatarCirclePrimary: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#22D3EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  avatarCircleCaregiver: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  avatarCircleClinician: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#22D3EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  cardTitle: {
    color: "#F9FAFB",
    fontSize: 15,
    fontWeight: "600"
  },
  cardRole: {
    color: "#CBD5F5",
    fontSize: 13,
    marginTop: 2
  },
  cardOrg: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2
  },
  cardNotes: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
    lineHeight: 17
  },
  cardActionsColumn: {
    marginLeft: 8,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 6
  },
  iconChip: {
    backgroundColor: "#22D3EE",
    borderRadius: 999,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  iconChipGhost: {
    borderRadius: 999,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#4B5563"
  },
  escalationCard: {
    flexDirection: "row",
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.4)"
  },
  escalationIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(248,113,113,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  escalationTitle: {
    color: "#FED7AA",
    fontSize: 14,
    fontWeight: "600"
  },
  escalationBody: {
    color: "#FDBA74",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17
  }
});

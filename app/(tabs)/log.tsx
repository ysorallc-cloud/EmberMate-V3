import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { EmberCard } from "../../components/EmberCard";
import { useCareData, MedDoseStatus } from "../context/CareContext";

export default function LogScreen() {
  const { meds, setMedStatus, moodToday, addMood } = useCareData();

  const [medsModalVisible, setMedsModalVisible] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState<string | null>(null);
  const [moodModalVisible, setMoodModalVisible] = useState(false);

  const openMedsModal = (id: string) => {
    setSelectedMedId(id);
    setMedsModalVisible(true);
  };

  const handleSetMedStatus = (status: MedDoseStatus) => {
    if (selectedMedId) {
      setMedStatus(selectedMedId, status);
    }
    setMedsModalVisible(false);
  };

  const latestMood = moodToday[0];

  return (
    <>
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <EmberCard
          title="Quick actions"
          subtitle="These actions feed your reports."
          body={[]}
        >
          <View style={{ marginTop: 12 }}>
            <ActionButton
              label="Log morning meds"
              onPress={() => openMedsModal("morning")}
            />
            <ActionButton
              label="Log afternoon meds"
              onPress={() => openMedsModal("afternoon")}
            />
            <ActionButton
              label="Log evening meds"
              onPress={() => openMedsModal("evening")}
            />
            <ActionButton
              label="Add mood for now"
              onPress={() => setMoodModalVisible(true)}
            />
          </View>
        </EmberCard>

        <EmberCard
          title="Medicine moments"
          subtitle="Tap any row to edit"
          body={meds.map(m => {
            const statusLabel =
              m.status === "taken"
                ? "Taken"
                : m.status === "missed"
                ? "Missed"
                : "Planned";

            return `${m.label} • ${m.time} • ${statusLabel}`;
          })}
        >
          <View style={{ marginTop: 12 }}>
            {meds.map(m => (
              <RowButton
                key={m.id}
                label={`${m.label} • ${m.time}`}
                status={m.status}
                onPress={() => openMedsModal(m.id)}
              />
            ))}
          </View>
        </EmberCard>

        <EmberCard
          title="Mood entries"
          subtitle="Today"
          body={[
            latestMood
              ? `${latestMood.timeOfDay} • ${latestMood.score} / 10 • ${latestMood.label}`
              : "No mood logged yet",
            ...moodToday.slice(1).map(
              m =>
                `${m.timeOfDay} • ${m.score} / 10 • ${m.label}`
            ),
          ]}
        />
      </ScrollView>

      <Modal
        visible={medsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMedsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update meds status</Text>
            <ActionButton
              label="Taken"
              onPress={() => handleSetMedStatus("taken")}
            />
            <ActionButton
              label="Missed"
              onPress={() => handleSetMedStatus("missed")}
            />
            <ActionButton
              label="Planned"
              onPress={() => handleSetMedStatus("planned")}
            />
            <Pressable onPress={() => setMedsModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={moodModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMoodModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How does right now feel?</Text>
            <ActionButton
              label="6 / 10 • tired, sore"
              onPress={() => {
                addMood({ score: 6, label: "tired, sore", timeOfDay: "Now" });
                setMoodModalVisible(false);
              }}
            />
            <ActionButton
              label="4 / 10 • low energy"
              onPress={() => {
                addMood({ score: 4, label: "low energy", timeOfDay: "Now" });
                setMoodModalVisible(false);
              }}
            />
            <ActionButton
              label="7 / 10 • a bit better"
              onPress={() => {
                addMood({ score: 7, label: "a bit better", timeOfDay: "Now" });
                setMoodModalVisible(false);
              }}
            />
            <Pressable onPress={() => setMoodModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

function ActionButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

function RowButton({
  label,
  status,
  onPress,
}: {
  label: string;
  status: MedDoseStatus;
  onPress: () => void;
}) {
  const statusText =
    status === "taken" ? "Taken" : status === "missed" ? "Missed" : "Planned";
  return (
    <Pressable style={styles.rowButton} onPress={onPress}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowStatus}>{statusText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    marginBottom: 8,
  },
  actionLabel: {
    color: "#f5f5f5",
    fontSize: 14,
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    marginBottom: 8,
  },
  rowLabel: {
    color: "#e5e7eb",
    fontSize: 14,
  },
  rowStatus: {
    color: "#9ca3af",
    fontSize: 13,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  modalCancel: {
    marginTop: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
});

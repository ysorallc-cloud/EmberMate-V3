import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getTodaySignals, getNextAppointment } from "../data/mockStore";
import { CoffeeFab } from "../components/CoffeeFab";
import EmberMateIntegrated from "../components/EmberMateIntegrated";



/**
 * Today Screen
 * - Enhanced Orb
 * - Appointment reminder integration
 * - Updated Signal cards (Mood / Energy / Pain / Sleep)
 * - Icons added for reminders
 * - Clean emotional-intelligence copy
 */

export default function TodayScreen() {
  const router = useRouter();
  const [infoVisible, setInfoVisible] = useState(false);

  const todaySignals = getTodaySignals();
  const nextAppointment = getNextAppointment();

  const todayScore = useMemo(() => {
    const vals = Object.values(todaySignals).map(s => s.value);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.round(avg * 10);
  }, [todaySignals]);

  const handleCoffee = () => router.push("/coffee");
  const handleViewAppointments = () => router.push("/log/appointments");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good evening, Ysora</Text>
            <Text style={styles.title}>Today</Text>
          </View>

          <TouchableOpacity style={styles.coffeeButton} onPress={handleCoffee}>
            <Ionicons name="cafe" size={20} color="#FACC15" />
          </TouchableOpacity>
        </View>
        

        {/* ORB */}
        <View style={styles.orbWrapper}>
          <View style={styles.orbOuter}>
            <View style={styles.orbInner}>
              <Text style={styles.orbScore}>{todayScore}</Text>
              <Text style={styles.orbTotal}>/100</Text>
              <Text style={styles.orbLabel}>Managing</Text>
            </View>
          </View>
        </View>

        {/* Score explanation + info button */}
        <View style={styles.statusRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusText}>
              Some symptoms are present, but you are getting through the day.
              Small wins still count.
            </Text>

            <Text style={styles.statusSub}>
              Based on mood, energy, pain and sleep.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setInfoVisible(true)}
            style={{ paddingLeft: 8 }}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        {/* Signal Cards */}
        <Text style={styles.sectionTitle}>Key signals</Text>
        <View style={styles.signalGrid}>
          {Object.entries(todaySignals).map(([key, s], index) => (
            <View
              key={index}
              style={[styles.signalCard, { borderColor: s.color + "AA" }]}
            >
              <View style={styles.signalHeaderRow}>
                <Ionicons
                  name={getSignalIcon(key)}
                  size={17}
                  color={s.color}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.signalLabel}>{capitalize(key)}</Text>
              </View>
              <Text style={styles.signalValue}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Important for Today */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>
          Important for today
        </Text>

        <View style={styles.reminderCard}>
          {/* Meds */}
          <ReminderRow
            icon="medkit-outline"
            text="Morning meds due in 30 minutes."
            color="#22D3EE"
          />

          {/* Pain */}
          <ReminderRow
            icon="alert-circle-outline"
            text="Pain has been above 6 for 3 days. Monitor closely."
            color="#F97316"
          />

          {/* Appointment */}
          {nextAppointment && (
            <TouchableOpacity
              onPress={handleViewAppointments}
              activeOpacity={0.8}
            >
              <ReminderRow
                icon="calendar-outline"
                color="#A855F7"
                text={`${nextAppointment.title} on ${nextAppointment.date} at ${nextAppointment.time}`}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick tip */}
        <View style={[styles.tipCard, { marginTop: 22 }]}>
          <Text style={styles.tipTitle}>QUICK TIP</Text>
          <Text style={styles.tipBody}>
            Even one check in today helps EmberMate spot patterns sooner.
          </Text>
        </View>
      </ScrollView>

      {/* Info Modal */}
      <Modal visible={infoVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>How Today’s Score Works</Text>
            <Text style={styles.modalText}>
              Your score is a simple snapshot of how the day is going, based on:
            </Text>

            <Text style={styles.modalBullet}>• Mood</Text>
            <Text style={styles.modalBullet}>• Energy</Text>
            <Text style={styles.modalBullet}>• Pain</Text>
            <Text style={styles.modalBullet}>• Sleep</Text>

            <Text style={[styles.modalText, { marginTop: 10 }]}>
              Higher scores mean the day is more stable. Lower scores signal
              areas that may need extra care or support.
            </Text>

            <Pressable
              style={styles.modalClose}
              onPress={() => setInfoVisible(false)}
            >
              <Text style={styles.modalCloseText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* Helpers */

function getSignalIcon(label: string) {
  switch (label) {
    case "mood":
      return "happy-outline";
    case "energy":
      return "flash-outline";
    case "pain":
      return "flame-outline";
    case "sleep":
      return "moon-outline";
    default:
      return "ellipse-outline";
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const ReminderRow = ({
  icon,
  color,
  text
}: {
  icon: any;
  color: string;
  text: string;
}) => (
  <View style={styles.reminderRow}>
    <View style={[styles.reminderIconCircle, { borderColor: color + "AA" }]}>
      <Ionicons name={icon} size={16} color={color} />
    </View>
    <Text style={styles.reminderText}>{text}</Text>
  </View>
);

/* Styles */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  scroll: { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 60 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },
  greeting: { fontSize: 14, color: "#9CA3AF" },
  title: { fontSize: 34, fontWeight: "800", color: "#F9FAFB" },

  coffeeButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FACC15",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A"
  },

  orbWrapper: { alignItems: "center", marginTop: 10, marginBottom: 12 },
  orbOuter: {
    width: 210,
    height: 210,
    borderRadius: 110,
    borderWidth: 12,
    borderColor: "#22D3EE",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
    shadowColor: "#22D3EE",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 }
  },
  orbInner: {
    width: 150,
    height: 150,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617"
  },
  orbScore: { fontSize: 42, fontWeight: "800", color: "#F9FAFB" },
  orbTotal: { fontSize: 13, color: "#9CA3AF", marginTop: -4 },
  orbLabel: { marginTop: 8, color: "#FACC15", fontSize: 16, fontWeight: "600" },

  statusRow: {
    flexDirection: "row",
    marginBottom: 16
  },
  statusText: { color: "#E5E7EB", fontSize: 14, lineHeight: 20 },
  statusSub: { color: "#9CA3AF", fontSize: 12, marginTop: 6 },

  sectionTitle: {
    fontSize: 16,
    color: "#E5E7EB",
    fontWeight: "700",
    marginBottom: 10
  },
  signalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  signalCard: {
    width: "48%",
    backgroundColor: "#0C1220",
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 12
  },
  signalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },
  signalLabel: { color: "#E5E7EB", fontSize: 13, fontWeight: "600" },
  signalValue: { color: "#F9FAFB", fontSize: 14, fontWeight: "700" },

  reminderCard: {
    backgroundColor: "#0C1220",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
    padding: 14
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  reminderIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#020617"
  },
  reminderText: {
    color: "#E5E7EB",
    fontSize: 13,
    lineHeight: 19,
    flex: 1
  },

  tipCard: {
    borderWidth: 1,
    borderColor: "#38BDF8",
    backgroundColor: "#031824",
    padding: 16,
    borderRadius: 18
  },
  tipTitle: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6
  },
  tipBody: {
    color: "#E5E7EB",
    fontSize: 13,
    lineHeight: 19
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.85)",
    justifyContent: "center",
    paddingHorizontal: 28
  },
  modalCard: {
    backgroundColor: "#020617",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.5)"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 10
  },
  modalText: { color: "#E5E7EB", fontSize: 13, lineHeight: 19 },
  modalBullet: { color: "#E5E7EB", fontSize: 13, marginTop: 4 },
  modalClose: {
    marginTop: 18,
    alignSelf: "flex-end",
    backgroundColor: "#22D3EE",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30
  },
  modalCloseText: {
    color: "#020617",
    fontWeight: "700",
    fontSize: 14
  }
});

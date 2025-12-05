import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Appointment, getAppointments } from "../data/mockStore";

/* Appointment type icons, kept local here */

const TYPES = [
  { key: "telehealth", label: "Telehealth", icon: "videocam-outline" },
  { key: "clinic", label: "Clinic Visit", icon: "business-outline" },
  { key: "lab", label: "Lab Work", icon: "flask-outline" },
  { key: "therapy", label: "Therapy", icon: "chatbubble-ellipses-outline" },
  { key: "home", label: "Home Visit", icon: "home-outline" },
  { key: "other", label: "Other", icon: "grid-outline" }
];

export default function CalendarView() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(getToday());

  const dates = generate14Days();
  const all = getAppointments();
  const listForDay = all.filter(a => a.date === selectedDate);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#22D3EE" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Calendar</Text>

      {/* Date Strip */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {dates.map((d, i) => {
          const hasAppt = all.some(a => a.date === d);
          const active = selectedDate === d;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.dateCircle,
                active && { backgroundColor: "#22D3EE" }
              ]}
              onPress={() => setSelectedDate(d)}
            >
              <Text
                style={[
                  styles.dateText,
                  active && { color: "#020617", fontWeight: "700" }
                ]}
              >
                {d.slice(8, 10)}
              </Text>
              {hasAppt && !active && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.sectionLabel}>Appointments</Text>

      {listForDay.length === 0 && (
        <Text style={styles.empty}>No visits this day</Text>
      )}

      {listForDay.map((a, i) => {
        const type = TYPES.find(t => t.key === a.type);
        return (
          <View key={i} style={styles.item}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={type?.icon || "calendar-outline"}
                size={18}
                color="#22D3EE"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{a.title}</Text>
              <Text style={styles.itemSub}>{a.time}</Text>
              {type && <Text style={styles.itemSub}>{type.label}</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* Helpers */

function getToday() {
  const d = new Date();
  return d.toISOString().substring(0, 10);
}

function generate14Days() {
  const days: string[] = [];
  const start = new Date();
  for (let i = -3; i < 11; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push(date.toISOString().substring(0, 10));
  }
  return days;
}

/* Styles */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", padding: 20 },
  backRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backText: { color: "#22D3EE", fontSize: 15, marginLeft: 4 },

  title: {
    color: "#F9FAFB",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10
  },

  dateCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
    backgroundColor: "#0C1220"
  },

  dateText: {
    color: "#F9FAFB",
    fontSize: 16
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22D3EE",
    position: "absolute",
    bottom: 6
  },

  sectionLabel: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10
  },

  empty: { color: "#64748B", fontSize: 13 },

  item: {
    flexDirection: "row",
    backgroundColor: "#0C1220",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.3)",
    alignItems: "center",
    marginBottom: 12
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#22D3EE44",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14
  },

  itemTitle: {
    color: "#F9FAFB",
    fontSize: 15,
    fontWeight: "700"
  },
  itemSub: { color: "#94A3B8", fontSize: 12, marginTop: 2 }
});

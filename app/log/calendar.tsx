import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

type DaySummary = {
  date: Date;
  label: string;     // "Sun"
  fullLabel: string; // "Sun, Dec 21"
  items: string[];
};

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = d.getDate() - day;
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeekRange(date: Date): string {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startLabel = start.toLocaleDateString(undefined, opts);
  const endLabel = end.toLocaleDateString(undefined, opts);

  return `Week of ${startLabel} – ${endLabel}`;
}

function buildWeekSummaries(anchor: Date): DaySummary[] {
  const start = startOfWeek(anchor);
  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const summaries: DaySummary[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    const fullLabel = d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    // Mock items so you can see behavior – later replace with real data
    let items: string[] = [];
    if (i === 0) {
      items = ["BP check 118/76", "Mood: Calm"];
    } else if (i === 1) {
      items = ["Telehealth visit 9:30 AM", "No missed meds"];
    } else if (i === 2) {
      items = ["Energy dip in afternoon", "Headache at 8 PM"];
    } else if (i === 3) {
      items = ["Walked 15 minutes", "Mood: Tired but steady"];
    } else if (i === 4) {
      items = ["Weight 165 lbs", "No new symptoms logged"];
    } else {
      items = ["Light day, nothing flagged"];
    }

    summaries.push({
      date: d,
      label: weekdaysShort[i],
      fullLabel,
      items
    });
  }

  return summaries;
}

export default function CalendarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ date?: string | string[] }>();

  // Robustly parse date from params (string or string[])
  const initialDate = useMemo(() => {
    const rawParam = Array.isArray(params.date) ? params.date[0] : params.date;
    if (rawParam) {
      const parsed = new Date(rawParam);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return new Date();
  }, [params.date]);

  const [referenceDate, setReferenceDate] = useState<Date>(initialDate);

  const weekLabel = useMemo(
    () => formatWeekRange(referenceDate),
    [referenceDate]
  );
  const daySummaries = useMemo(
    () => buildWeekSummaries(referenceDate),
    [referenceDate]
  );

  const goBackToLog = () => {
    // Do not depend on history; always jump back to Log tab
    router.replace("/(tabs)/log");
  };

  const shiftWeek = (offset: number) => {
    const next = new Date(referenceDate);
    next.setDate(referenceDate.getDate() + offset * 7);
    setReferenceDate(next);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={goBackToLog} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#22D3EE" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Weekly summary</Text>
        <Text style={styles.subtitle}>
          See how this week has been going so far.
        </Text>

        {/* Week selector */}
        <View style={styles.weekHeader}>
          <TouchableOpacity
            onPress={() => shiftWeek(-1)}
            style={styles.weekArrow}
          >
            <Ionicons name="chevron-back" size={18} color="#E5E7EB" />
          </TouchableOpacity>

          <Text style={styles.weekLabel}>{weekLabel}</Text>

          <TouchableOpacity
            onPress={() => shiftWeek(1)}
            style={styles.weekArrow}
          >
            <Ionicons name="chevron-forward" size={18} color="#E5E7EB" />
          </TouchableOpacity>
        </View>

        {/* At a glance */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>At a glance</Text>
          <Text style={styles.summaryLine}>
            • Medications appear on track this week.
          </Text>
          <Text style={styles.summaryLine}>
            • Mood has stayed mostly steady with one dip midweek.
          </Text>
          <Text style={styles.summaryLine}>
            • Headache has surfaced a few times. Worth watching but not urgent.
          </Text>
        </View>

        {/* Day by day */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Day by day</Text>
          {daySummaries.map(day => (
            <View key={day.fullLabel} style={styles.dayRow}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayLabel}>{day.fullLabel}</Text>
              </View>
              {day.items.map((item, index) => (
                <View key={index} style={styles.dayItemRow}>
                  <View style={styles.dot} />
                  <Text style={styles.dayItemText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  backText: {
    color: "#22D3EE",
    fontSize: 15,
    marginLeft: 2
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 16
  },
  weekHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  weekArrow: {
    padding: 6
  },
  weekLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E5E7EB"
  },
  summaryCard: {
    backgroundColor: "#020817",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
    padding: 14,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 6
  },
  summaryLine: {
    fontSize: 13,
    color: "#E5E7EB",
    marginBottom: 2
  },
  section: {
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 10
  },
  dayRow: {
    borderRadius: 16,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10
  },
  dayHeader: {
    marginBottom: 6
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E5E7EB"
  },
  dayItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#22D3EE",
    marginTop: 6,
    marginRight: 6
  },
  dayItemText: {
    flex: 1,
    fontSize: 13,
    color: "#CBD5F5"
  }
});

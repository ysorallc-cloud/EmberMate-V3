import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SignalMetricCard from "../components/SignalMetricCard";

type LogCategory = "vitals" | "medication" | "mood" | "symptom" | "food" | "note";

type RecentEntryType =
  | "vitals"
  | "mood"
  | "symptom"
  | "food"
  | "medication"
  | "note";

type RecentEntry = {
  id: string;
  type: RecentEntryType;
  title: string;
  value?: string;
  subtitle: string;
  timestampLabel: string;
};

type CalendarDay = {
  date: Date;
  label: string;
  weekday: string;
};

const QUICK_LOG_ITEMS: { key: LogCategory; label: string; icon: string }[] = [
  { key: "vitals", label: "Vitals", icon: "heart" },
  { key: "medication", label: "Medication", icon: "medkit-outline" },
  { key: "mood", label: "Mood", icon: "happy-outline" },
  { key: "symptom", label: "Symptom", icon: "bandage-outline" },
  { key: "food", label: "Food", icon: "restaurant-outline" },
  { key: "note", label: "Note", icon: "document-text-outline" }
];

const RECENT_ENTRIES: RecentEntry[] = [
  {
    id: "1",
    type: "vitals",
    title: "Blood Pressure",
    value: "118/76",
    subtitle: "Today 8:30 AM",
    timestampLabel: "Today 8:30 AM"
  },
  {
    id: "2",
    type: "mood",
    title: "Mood",
    value: "Good",
    subtitle: "Today 7:45 AM",
    timestampLabel: "Today 7:45 AM"
  },
  {
    id: "3",
    type: "symptom",
    title: "Symptom",
    value: "Mild headache",
    subtitle: "Yesterday 9:00 PM",
    timestampLabel: "Yesterday 9:00 PM"
  },
  {
    id: "4",
    type: "vitals",
    title: "Weight",
    value: "165 lbs",
    subtitle: "Yesterday 7:00 AM",
    timestampLabel: "Yesterday 7:00 AM"
  }
];

const TYPE_COLORS: Record<RecentEntryType, string> = {
  vitals: "#22C55E",
  mood: "#FACC15",
  symptom: "#FB923C",
  food: "#4ADE80",
  medication: "#F97316",
  note: "#38BDF8"
};

const LOG_SIGNALS = [
  {
    id: "mood",
    label: "Mood",
    valueLabel: "Soft steady",
    level: "ok" as const,
    percent: 72,
    iconName: "happy-outline" as const
  },
  {
    id: "energy",
    label: "Energy",
    valueLabel: "Moderate",
    level: "watch" as const,
    percent: 55,
    iconName: "flash-outline" as const
  },
  {
    id: "pain",
    label: "Pain",
    valueLabel: "6 / 10",
    level: "concern" as const,
    percent: 60,
    iconName: "alert-circle-outline" as const
  }
];

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function buildWeek(date: Date): CalendarDay[] {
  const start = startOfWeek(date);
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const result: CalendarDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    result.push({
      date: d,
      label: String(d.getDate()),
      weekday: weekdays[i]
    });
  }
  return result;
}

function formatWeekRange(date: Date): string {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startLabel = start.toLocaleDateString(undefined, options);
  const endLabel = end.toLocaleDateString(undefined, options);

  return `Week of ${startLabel} - ${endLabel}`;
}

const LogScreen: React.FC = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const weekDays = useMemo(() => buildWeek(selectedDate), [selectedDate]);
  const weekLabel = useMemo(
    () => formatWeekRange(selectedDate),
    [selectedDate]
  );

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleQuickLogPress = (key: LogCategory) => {
    router.push(`/log/${key}`);
  };

  const handleWeeklySummaryPress = () => {
    router.push("/log/summary");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Log</Text>
          <Text style={styles.subtitle}>Record health and wellness data</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.signalsCard}>
            <Text style={styles.sectionTitle}>Signals for today</Text>
            <Text style={styles.signalsSubtitle}>
              Quick read on how things are trending right now.
            </Text>
            <View style={styles.signalRow}>
              {LOG_SIGNALS.map(signal => (
                <SignalMetricCard
                  key={signal.id}
                  label={signal.label}
                  valueLabel={signal.valueLabel}
                  level={signal.level}
                  percent={signal.percent}
                  iconName={signal.iconName}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.calendarWrapper}>
          <View style={styles.calendarHeaderRow}>
            <Text style={styles.weekLabel}>{weekLabel}</Text>
          </View>

          <View style={styles.calendarRow}>
            {weekDays.map(day => {
              const selected = isSameDay(day.date, selectedDate);
              return (
                <TouchableOpacity
                  key={day.date.toISOString()}
                  style={[
                    styles.calendarItem,
                    selected && styles.calendarItemSelected
                  ]}
                  onPress={() => setSelectedDate(day.date)}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.calendarWeekday,
                      selected && styles.calendarWeekdaySelected
                    ]}
                  >
                    {day.weekday}
                  </Text>
                  <Text
                    style={[
                      styles.calendarDate,
                      selected && styles.calendarDateSelected
                    ]}
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Log</Text>
          <View style={styles.quickGrid}>
            {QUICK_LOG_ITEMS.map(item => (
              <TouchableOpacity
                key={item.key}
                style={styles.quickCard}
                activeOpacity={0.9}
                onPress={() => handleQuickLogPress(item.key)}
              >
                <View style={styles.quickIconWrapper}>
                  <Ionicons name={item.icon as any} size={24} color="#F97316" />
                </View>
                <Text style={styles.quickLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Patterns</Text>
          <View style={styles.insightsCard}>
            <View style={styles.insightsRow}>
              <View style={styles.insightsBullet} />
              <Text style={styles.insightsText}>
                Mood has been steady compared to yesterday.
              </Text>
            </View>
            <View style={styles.insightsRow}>
              <View style={styles.insightsBullet} />
              <Text style={styles.insightsText}>
                Energy tends to dip in the morning. A short reset may help.
              </Text>
            </View>
            <View style={styles.insightsRow}>
              <View style={styles.insightsBullet} />
              <Text style={styles.insightsText}>
                Meds are on track. No missed doses flagged.
              </Text>
            </View>
            <View style={styles.insightsRow}>
              <View style={styles.insightsBullet} />
              <Text style={styles.insightsText}>
                Headache has appeared 3 times this week. Worth watching.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          <View style={styles.entriesList}>
            {RECENT_ENTRIES.map(entry => {
              const color = TYPE_COLORS[entry.type];
              return (
                <TouchableOpacity
                  key={entry.id}
                  style={styles.entryCard}
                  activeOpacity={0.9}
                >
                  <View style={styles.entryIconWrapper}>
                    <View
                      style={[styles.entryIconDot, { backgroundColor: color }]}
                    />
                    <Ionicons
                      name={getEntryIcon(entry.type)}
                      size={20}
                      color="#E5E7EB"
                    />
                  </View>
                  <View style={styles.entryTextWrapper}>
                    <View style={styles.entryTitleRow}>
                      <Text style={styles.entryTitle}>{entry.title}</Text>
                      {entry.value ? (
                        <Text style={[styles.entryValue, { color }]}>
                          {entry.value}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={styles.entrySubtitle}>{entry.subtitle}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#64748B"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.summaryButton}
          activeOpacity={0.9}
          onPress={handleWeeklySummaryPress}
        >
          <Ionicons name="stats-chart-outline" size={18} color="#0F172A" />
          <Text style={styles.summaryButtonText}>View Weekly Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function getEntryIcon(type: RecentEntryType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case "vitals":
      return "heart-outline";
    case "mood":
      return "happy-outline";
    case "symptom":
      return "bandage-outline";
    case "food":
      return "restaurant-outline";
    case "medication":
      return "medkit-outline";
    case "note":
    default:
      return "document-text-outline";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 80
  },
  header: {
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8"
  },
  signalsCard: {
    borderRadius: 20,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    padding: 16
  },
  signalsSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 12
  },
  signalRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  calendarWrapper: {
    backgroundColor: "#020817",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.3)",
    marginBottom: 28
  },
  calendarHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  weekLabel: {
    fontSize: 13,
    color: "#CBD5F5",
    fontWeight: "500"
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  calendarItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16
  },
  calendarItemSelected: {
    backgroundColor: "#22D3EE"
  },
  calendarWeekday: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2
  },
  calendarWeekdaySelected: {
    color: "#0F172A",
    fontWeight: "700"
  },
  calendarDate: {
    fontSize: 16,
    color: "#E5E7EB",
    fontWeight: "600"
  },
  calendarDateSelected: {
    color: "#0F172A"
  },
  section: {
    marginBottom: 28
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 12
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  quickCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    backgroundColor: "#020817",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14
  },
  quickIconWrapper: {
    marginBottom: 6
  },
  quickLabel: {
    fontSize: 13,
    color: "#E5E7EB",
    fontWeight: "500"
  },
  insightsCard: {
    borderRadius: 18,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    padding: 16
  },
  insightsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8
  },
  insightsBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22D3EE",
    marginTop: 6,
    marginRight: 8
  },
  insightsText: {
    flex: 1,
    fontSize: 14,
    color: "#E5E7EB"
  },
  entriesList: {},
  entryCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.35)",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10
  },
  entryIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative"
  },
  entryIconDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 3.5
  },
  entryTextWrapper: {
    flex: 1
  },
  entryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2
  },
  entryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB"
  },
  entryValue: {
    fontSize: 14,
    fontWeight: "600"
  },
  entrySubtitle: {
    fontSize: 13,
    color: "#94A3B8"
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "rgba(2,6,23,0.9)"
  },
  summaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingVertical: 14,
    backgroundColor: "#22D3EE"
  },
  summaryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A"
  }
});

export default LogScreen;

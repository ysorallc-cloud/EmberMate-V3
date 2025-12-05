// app/data/mockStore.ts

/* Types */

export type AppointmentType =
  | "telehealth"
  | "clinic"
  | "lab"
  | "therapy"
  | "home"
  | "other";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  date: string;          // yyyy-mm-dd
  time: string;          // "9:30 AM"
  type: AppointmentType;
  title: string;
  provider?: string;
  location?: string;
  status: AppointmentStatus;
  isCareMeeting?: boolean;
};

export type SignalItem = {
  value: number;
  label: string;
  color: string;
};

export type TodaySignals = {
  mood: SignalItem;
  energy: SignalItem;
  pain: SignalItem;
  sleep: SignalItem;
};

/* In memory store for now */

let APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    date: "2025-12-02",
    time: "9:30 AM",
    type: "telehealth",
    title: "Telehealth Visit",
    provider: "Dr. Hall",
    location: "Video",
    status: "upcoming",
    isCareMeeting: true
  }
];

/* Appointment helpers */

export function getAppointments(): Appointment[] {
  return APPOINTMENTS;
}

export function getUpcomingAppointments(): Appointment[] {
  return APPOINTMENTS.filter(a => a.status === "upcoming");
}

export function upsertAppointment(appt: Appointment) {
  const idx = APPOINTMENTS.findIndex(a => a.id === appt.id);
  if (idx >= 0) {
    APPOINTMENTS[idx] = appt;
  } else {
    APPOINTMENTS.push(appt);
  }
}

/* Very simple today signals for now
   Later this should be computed from actual logs.
*/

export function getTodaySignals(): TodaySignals {
  return {
    mood: { value: 4, label: "Low but stable", color: "#22D3EE" },
    energy: { value: 3, label: "Low", color: "#FBBF24" },
    pain: { value: 6, label: "Moderate", color: "#F97316" },
    sleep: { value: 2, label: "Poor", color: "#EC4899" }
  };
}

export function getNextAppointment(): Appointment | null {
  const upcoming = getUpcomingAppointments();
  if (upcoming.length === 0) return null;
  // Very naive sort by date and time string
  const sorted = [...upcoming].sort((a, b) => {
    const aKey = `${a.date} ${a.time}`;
    const bKey = `${b.date} ${b.time}`;
    return aKey.localeCompare(bKey);
  });
  return sorted[0];
}

import React, { createContext, useContext, useState, ReactNode } from "react";

export type MedDoseStatus = "taken" | "missed" | "planned";

export type MedDose = {
  id: string;
  label: string;
  time: string;
  status: MedDoseStatus;
};

export type MoodEntry = {
  id: string;
  score: number; // 1-10
  label: string;
  timeOfDay: string;
};

export type CareState = {
  meds: MedDose[];
  setMedStatus: (id: string, status: MedDoseStatus) => void;
  moodToday: MoodEntry[];
  addMood: (entry: Omit<MoodEntry, "id">) => void;
};

const CareContext = createContext<CareState | undefined>(undefined);

function createInitialMeds(): MedDose[] {
  return [
    { id: "morning", label: "Morning meds", time: "8:10 AM", status: "taken" },
    { id: "afternoon", label: "Afternoon meds", time: "2:00 PM", status: "planned" },
    { id: "evening", label: "Evening meds", time: "8:30 PM", status: "planned" },
  ];
}

function createInitialMood(): MoodEntry[] {
  return [
    { id: "now", score: 6, label: "tired, a bit sore", timeOfDay: "Now" },
    { id: "morning", score: 5, label: "low energy", timeOfDay: "Morning" },
  ];
}

export function CareProvider({ children }: { children: ReactNode }) {
  const [meds, setMeds] = useState<MedDose[]>(createInitialMeds);
  const [moodToday, setMoodToday] = useState<MoodEntry[]>(createInitialMood);

  const setMedStatus = (id: string, status: MedDoseStatus) => {
    setMeds(current =>
      current.map(m => (m.id === id ? { ...m, status } : m))
    );
  };

  const addMood = (entry: Omit<MoodEntry, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
    setMoodToday(current => [{ id, ...entry }, ...current]);
  };

  return (
    <CareContext.Provider
      value={{
        meds,
        setMedStatus,
        moodToday,
        addMood,
      }}
    >
      {children}
    </CareContext.Provider>
  );
}

export function useCareData(): CareState {
  const ctx = useContext(CareContext);
  if (!ctx) {
    throw new Error("useCareData must be used within a CareProvider");
  }
  return ctx;
}

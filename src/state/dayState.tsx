import { createContext, useContext, useState, ReactNode } from 'react';

export type MedsStatus = 'pending' | 'taken' | 'missed' | 'delayed';

export interface TodayState {
  medsStatus: MedsStatus;
  mood: number;        // 1–5
  energy: number;      // 1–5
  sleepHours: number | null;
  sleepQuality: number; // 1–5
  notes: string;
  forProvider: boolean;
}

const defaultState: TodayState = {
  medsStatus: 'pending',
  mood: 3,
  energy: 3,
  sleepHours: null,
  sleepQuality: 3,
  notes: '',
  forProvider: false,
};

interface TodayContextValue {
  today: TodayState;
  updateToday: (patch: Partial<TodayState>) => void;
  loading: boolean;
}

const TodayContext = createContext<TodayContextValue | undefined>(undefined);

export function TodayProvider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState<TodayState>(defaultState);

  const updateToday = (patch: Partial<TodayState>) => {
    setToday((prev) => ({ ...prev, ...patch }));
  };

  return (
    <TodayContext.Provider value={{ today, updateToday, loading: false }}>
      {children}
    </TodayContext.Provider>
  );
}

export function useToday() {
  const ctx = useContext(TodayContext);
  if (!ctx) {
    throw new Error('useToday must be used inside TodayProvider');
  }
  return ctx;
}

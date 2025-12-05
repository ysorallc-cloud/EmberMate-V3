import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type MedEntry = {
  name: string;
  period: "morning" | "midday" | "evening";
  taken: boolean;
};

export type Vitals = {
  bp?: string;
  hr?: string;
  o2?: string;
  temp?: string;
};

export type DaySnapshot = {
  id: string;
  pain: number;
  energy: number;
  mood: number;
  symptomIntensity?: number;
  symptomTags?: string[];
  meds: MedEntry[];
  vitals: Vitals;
  notes?: string;
};

type TodayContextValue = {
  latest?: DaySnapshot;
  history: DaySnapshot[];
  upsertSnapshot: (snap: DaySnapshot) => void;
};

const TodayContext = createContext<TodayContextValue | undefined>(undefined);

export function TodayProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<DaySnapshot[]>([]);

  const upsertSnapshot = useCallback((snap: DaySnapshot) => {
    setHistory(prev => {
      const withoutSameId = prev.filter(d => d.id !== snap.id);
      return [snap, ...withoutSameId];
    });
  }, []);

  const latest = useMemo(
    () => (history.length > 0 ? history[0] : undefined),
    [history]
  );

  const value: TodayContextValue = useMemo(
    () => ({ latest, history, upsertSnapshot }),
    [latest, history, upsertSnapshot]
  );

  return (
    <TodayContext.Provider value={value}>
      {children}
    </TodayContext.Provider>
  );
}

export function useToday() {
  const ctx = useContext(TodayContext);
  if (!ctx) {
    throw new Error("useToday must be used within TodayProvider");
  }
  return ctx;
}

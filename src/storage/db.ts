import { TodayState } from '../state/dayState';

export function getTodayKey(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function initDb(): void {
  // Persistence disabled for now.
}

export function loadEntry(_dateKey: string): Promise<TodayState | null> {
  // No stored entry; always start from defaults.
  return Promise.resolve(null);
}

export function saveEntry(_dateKey: string, _state: TodayState): void {
  // No-op while we debug persistence.
}

export interface HistoryEntry extends TodayState {
  date: string;
}

export function loadHistory(_daysBack: number): Promise<HistoryEntry[]> {
  // No history yet; Insights will fall back to “not enough data” copy.
  return Promise.resolve([]);
}

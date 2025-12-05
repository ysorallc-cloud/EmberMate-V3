// src/storage/db.ts
import type { SQLiteDatabase } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { TodayState } from "../state/dayState";

let dbPromise: Promise<SQLiteDatabase> | null = null;

async function getDb(): Promise<SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("embermate.db");
  }
  return dbPromise;
}

export function getTodayKey(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function initDb(): Promise<void> {
  const db = await getDb();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS entries (
      date  TEXT PRIMARY KEY NOT NULL,
      state TEXT
    );
  `);
}

export async function loadEntry(dateKey: string): Promise<TodayState | null> {
  const db = await getDb();

  try {
    const row = await db.getFirstAsync<{ state: string }>(
      "SELECT state FROM entries WHERE date = ?",
      dateKey
    );

    if (!row || row.state == null) {
      return null;
    }

    return JSON.parse(row.state) as TodayState;
  } catch (err) {
    console.warn("loadEntry error", err);
    return null;
  }
}

export async function saveEntry(
  dateKey: string,
  state: TodayState
): Promise<void> {
  const db = await getDb();
  const payload = JSON.stringify(state);

  await db.runAsync(
    "INSERT OR REPLACE INTO entries (date, state) VALUES (?, ?)",
    dateKey,
    payload
  );
}
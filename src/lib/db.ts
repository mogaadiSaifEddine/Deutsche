import "server-only";
import { createClient, type InValue } from "@libsql/client";
import path from "node:path";

// Local dev: a SQLite file. Production (Vercel): set DATABASE_URL (libsql://…) and DATABASE_AUTH_TOKEN, e.g. via Turso.
const url = process.env.DATABASE_URL ?? `file:${path.join(process.cwd(), "data", "app.db")}`;
if (process.env.VERCEL && url.startsWith("file:")) {
  throw new Error("DATABASE_URL is required on Vercel (the filesystem is read-only and ephemeral).");
}

const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });

const globalForDb = globalThis as unknown as { __dbReady?: Promise<unknown> };

function init() {
  return client.batch(
    [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        xp INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      `CREATE TABLE IF NOT EXISTS progress (
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        step_id TEXT NOT NULL,
        best_score REAL NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0,
        passed INTEGER NOT NULL DEFAULT 0,
        completed_at TEXT,
        PRIMARY KEY (user_id, step_id)
      )`,
    ],
    "write",
  );
}

async function ready() {
  const p = (globalForDb.__dbReady ??= init().catch((e) => { globalForDb.__dbReady = undefined; throw e; }));
  await p;
}

export async function all<T>(sql: string, args: InValue[] = []): Promise<T[]> {
  await ready();
  return (await client.execute({ sql, args })).rows as unknown as T[];
}

export async function get<T>(sql: string, args: InValue[] = []): Promise<T | undefined> {
  return (await all<T>(sql, args))[0];
}

export async function run(sql: string, args: InValue[] = []) {
  await ready();
  const r = await client.execute({ sql, args });
  return { lastInsertRowid: Number(r.lastInsertRowid ?? 0), rowsAffected: r.rowsAffected };
}

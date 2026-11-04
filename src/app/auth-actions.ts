"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export type FormState = { error?: string; email?: string; name?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Used to keep login timing similar when the email is unknown.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

// Minimal in-memory throttle: 8 failed attempts per email per 15 minutes (per server instance).
const failures = new Map<string, { n: number; until: number }>();
function throttled(key: string) {
  const f = failures.get(key);
  return !!f && f.n >= 8 && f.until > Date.now();
}
function noteFailure(key: string) {
  const f = failures.get(key);
  if (!f || f.until <= Date.now()) failures.set(key, { n: 1, until: Date.now() + 15 * 60_000 });
  else f.n++;
}

export async function register(_prev: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const keep = { name, email };
  if (name.length < 1 || name.length > 60) return { ...keep, error: "Please enter your name." };
  if (!EMAIL_RE.test(email) || email.length > 200) return { ...keep, error: "Please enter a valid email address." };
  if (password.length < 8 || password.length > 100) return { ...keep, error: "Password must be 8–100 characters." };

  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) return { ...keep, error: "An account with this email already exists." };
  const hash = await bcrypt.hash(password, 10);
  const res = db.prepare("INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)").run(email, name, hash);
  await createSession(Number(res.lastInsertRowid));
  redirect("/learn");
}

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (throttled(email)) return { email, error: "Too many attempts. Please try again in a few minutes." };

  const row = db.prepare("SELECT id, password_hash FROM users WHERE email = ?").get(email) as { id: number; password_hash: string } | undefined;
  const ok = await bcrypt.compare(password, row?.password_hash ?? DUMMY_HASH);
  if (!row || !ok) {
    noteFailure(email);
    return { email, error: "Incorrect email or password." };
  }
  failures.delete(email);
  await createSession(row.id);
  redirect("/learn");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

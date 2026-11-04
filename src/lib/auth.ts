import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { get } from "./db";

const COOKIE = "session";
const MAX_AGE = 60 * 60 * 24 * 30;

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s && process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET must be set in production");
  return new TextEncoder().encode(s ?? "dev-only-insecure-secret-change-me");
}

export async function sign(payload: Record<string, unknown>, expiresIn: string) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(expiresIn).sign(secret());
}

export async function verify<T = Record<string, unknown>>(token: string): Promise<T | null> {
  try {
    return (await jwtVerify(token, secret(), { algorithms: ["HS256"] })).payload as T;
  } catch {
    return null;
  }
}

export async function createSession(userId: number) {
  const token = await sign({ uid: userId }, "30d");
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export type User = { id: number; email: string; name: string; xp: number };

export async function getUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const payload = await verify<{ uid: number }>(token);
  if (!payload) return null;
  const row = await get<User>("SELECT id, email, name, xp FROM users WHERE id = ?", [payload.uid]);
  return row ? { id: Number(row.id), email: row.email, name: row.name, xp: Number(row.xp) } : null;
}

export async function requireUser(): Promise<User> {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}

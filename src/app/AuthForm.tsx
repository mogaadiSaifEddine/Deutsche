"use client";
import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "./auth-actions";

export function AuthForm({ mode, action }: { mode: "login" | "register"; action: (s: FormState, f: FormData) => Promise<FormState> }) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);
  const reg = mode === "register";
  return (
    <form action={formAction} className="card auth">
      <h1>{reg ? "Create your account" : "Welcome back"}</h1>
      {reg && (
        <label>Name<input name="name" defaultValue={state.name} autoComplete="name" required maxLength={60} /></label>
      )}
      <label>Email<input name="email" type="email" defaultValue={state.email} autoComplete="email" required /></label>
      <label>Password<input name="password" type="password" autoComplete={reg ? "new-password" : "current-password"} required minLength={reg ? 8 : undefined} /></label>
      {state.error && <p className="error" role="alert">{state.error}</p>}
      <button className="btn" disabled={pending}>{pending ? "…" : reg ? "Sign up" : "Log in"}</button>
      <p className="muted">
        {reg ? <>Already registered? <Link href="/login">Log in</Link></> : <>New here? <Link href="/register">Create an account</Link></>}
      </p>
    </form>
  );
}

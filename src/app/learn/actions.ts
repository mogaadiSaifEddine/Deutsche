"use server";
import { requireUser, sign, verify } from "@/lib/auth";
import { findStep } from "@/content/curriculum";
import { getProgress, isUnlocked, recordAttempt } from "@/lib/progress";
import { isCorrect, type Question } from "@/lib/questions";

export async function completeLesson(stepId: string, correct: number, total: number) {
  const user = await requireUser();
  const found = findStep(stepId);
  if (!found || found.step.type !== "lesson") throw new Error("Unknown lesson");
  if (!isUnlocked(getProgress(user.id), stepId)) throw new Error("Lesson is locked");
  const score = total > 0 ? Math.min(1, Math.max(0, correct / total)) : 0;
  const xpGained = recordAttempt(user.id, stepId, "lesson", score, true);
  return { xpGained };
}

export type TicketPayload = { uid: number; stepId: string; key: { kind: Question["kind"]; answer: string }[] };

export async function makeTicket(uid: number, stepId: string, questions: Question[]) {
  const key = questions.map((q) => ({ kind: q.kind, answer: q.answer }));
  return sign({ uid, stepId, key }, "2h");
}

export type AssessmentResult = {
  score: number; correct: number; total: number; passed: boolean; passMark: number; xpGained: number;
  review: { ok: boolean; answer: string }[];
};

export async function submitAssessment(ticket: string, given: string[]): Promise<AssessmentResult> {
  const user = await requireUser();
  const payload = await verify<TicketPayload>(ticket);
  if (!payload || payload.uid !== user.id) throw new Error("Invalid or expired quiz. Please restart it.");
  const found = findStep(payload.stepId);
  if (!found || found.step.type === "lesson") throw new Error("Unknown assessment");
  if (!isUnlocked(getProgress(user.id), payload.stepId)) throw new Error("Assessment is locked");

  const review = payload.key.map((k, i) => ({ ok: isCorrect(k, k.answer, String(given[i] ?? "")), answer: k.answer }));
  const correct = review.filter((r) => r.ok).length;
  const total = review.length;
  const score = total ? correct / total : 0;
  const passed = score >= found.step.passMark;
  const xpGained = recordAttempt(user.id, payload.stepId, found.step.type, score, passed);
  return { score, correct, total, passed, passMark: found.step.passMark, xpGained, review };
}

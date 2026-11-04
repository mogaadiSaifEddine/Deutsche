import "server-only";
import { db } from "./db";
import { ALL_STEPS, LEVELS, type Level } from "@/content/curriculum";

export type StepProgress = { passed: boolean; best: number; attempts: number };

export function getProgress(userId: number): Map<string, StepProgress> {
  const rows = db.prepare("SELECT step_id, best_score, attempts, passed FROM progress WHERE user_id = ?").all(userId) as {
    step_id: string; best_score: number; attempts: number; passed: number;
  }[];
  return new Map(rows.map((r) => [r.step_id, { passed: !!r.passed, best: r.best_score, attempts: r.attempts }]));
}

export type StepState = "done" | "next" | "locked";

/** Steps unlock strictly in order across all levels: a level opens when the previous level's test is passed. */
export function stepStates(progress: Map<string, StepProgress>): Map<string, StepState> {
  const states = new Map<string, StepState>();
  let nextFound = false;
  for (const { step } of ALL_STEPS) {
    if (progress.get(step.id)?.passed) states.set(step.id, "done");
    else if (!nextFound) { states.set(step.id, "next"); nextFound = true; }
    else states.set(step.id, "locked");
  }
  return states;
}

export function isUnlocked(progress: Map<string, StepProgress>, stepId: string) {
  const s = stepStates(progress).get(stepId);
  return s === "done" || s === "next";
}

export function levelSummary(progress: Map<string, StepProgress>) {
  const completed: Level[] = [];
  let current: Level | null = null;
  for (const level of LEVELS) {
    const test = level.steps.find((s) => s.type === "test")!;
    if (progress.get(test.id)?.passed) completed.push(level);
    else if (!current) current = level;
  }
  return { completed, current };
}

const XP = { lesson: 20, checkpoint: 30, test: 60 } as const;

/** Records an attempt. XP is only granted the first time a step is passed. */
export function recordAttempt(userId: number, stepId: string, type: keyof typeof XP, score: number, passed: boolean) {
  const prev = db.prepare("SELECT passed FROM progress WHERE user_id = ? AND step_id = ?").get(userId, stepId) as { passed: number } | undefined;
  db.prepare(
    `INSERT INTO progress (user_id, step_id, best_score, attempts, passed, completed_at)
     VALUES (?, ?, ?, 1, ?, CASE WHEN ? THEN datetime('now') END)
     ON CONFLICT(user_id, step_id) DO UPDATE SET
       best_score = MAX(best_score, excluded.best_score),
       attempts = attempts + 1,
       passed = MAX(passed, excluded.passed),
       completed_at = COALESCE(completed_at, excluded.completed_at)`,
  ).run(userId, stepId, score, passed ? 1 : 0, passed ? 1 : 0);
  let xpGained = 0;
  if (passed && !prev?.passed) {
    xpGained = XP[type];
    db.prepare("UPDATE users SET xp = xp + ? WHERE id = ?").run(xpGained, userId);
  }
  return xpGained;
}

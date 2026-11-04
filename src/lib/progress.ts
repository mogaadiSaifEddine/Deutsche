import "server-only";
import { all, get, run } from "./db";
import { ALL_STEPS, LEVELS, type Level } from "@/content/curriculum";

export type StepProgress = { passed: boolean; best: number; attempts: number };

export async function getProgress(userId: number): Promise<Map<string, StepProgress>> {
  const rows = await all<{ step_id: string; best_score: number; attempts: number; passed: number }>(
    "SELECT step_id, best_score, attempts, passed FROM progress WHERE user_id = ?", [userId],
  );
  return new Map(rows.map((r) => [r.step_id, { passed: !!r.passed, best: Number(r.best_score), attempts: Number(r.attempts) }]));
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
export async function recordAttempt(userId: number, stepId: string, type: keyof typeof XP, score: number, passed: boolean) {
  const prev = await get<{ passed: number }>("SELECT passed FROM progress WHERE user_id = ? AND step_id = ?", [userId, stepId]);
  await run(
    `INSERT INTO progress (user_id, step_id, best_score, attempts, passed, completed_at)
     VALUES (?, ?, ?, 1, ?, IF(?, NOW(), NULL))
     ON DUPLICATE KEY UPDATE
       best_score = GREATEST(best_score, VALUES(best_score)),
       attempts = attempts + 1,
       passed = GREATEST(passed, VALUES(passed)),
       completed_at = COALESCE(completed_at, VALUES(completed_at))`,
    [userId, stepId, score, passed ? 1 : 0, passed ? 1 : 0],
  );
  let xpGained = 0;
  if (passed && !prev?.passed) {
    xpGained = XP[type];
    await run("UPDATE users SET xp = xp + ? WHERE id = ?", [xpGained, userId]);
  }
  return xpGained;
}

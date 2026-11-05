import { test } from "node:test";
import assert from "node:assert/strict";
import { LEVELS, ALL_STEPS } from "../src/content/curriculum.ts";

test("step ids are unique and reference real units", () => {
  const ids = ALL_STEPS.map((s) => s.step.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const { step, level } of ALL_STEPS) {
    const known = new Set(level.units.map((u) => u.id));
    if (step.type === "lesson") assert.ok(known.has(step.unitId), `${step.id}: unknown unit`);
    if (step.type === "checkpoint") step.unitIds.forEach((u) => assert.ok(known.has(u), `${step.id}: unknown unit ${u}`));
  }
});

test("every level has a test as its last step and every unit has a lesson", () => {
  for (const level of LEVELS) {
    assert.equal(level.steps.at(-1)!.type, "test");
    const lessonUnits = new Set(level.steps.flatMap((s) => (s.type === "lesson" ? [s.unitId] : [])));
    for (const u of level.units) assert.ok(lessonUnits.has(u.id), `${level.id}: unit ${u.id} has no lesson`);
  }
});

test("no duplicate German or English words within a level (would make multiple choice ambiguous)", () => {
  for (const level of LEVELS) {
    const seenDe = new Map<string, string>(), seenEn = new Map<string, string>();
    for (const u of level.units) {
      for (const w of [...u.words, ...u.phrases]) {
        const de = w.de.toLowerCase(), en = w.en.toLowerCase();
        assert.ok(!seenDe.has(de), `${level.id}: duplicate German "${w.de}" (${u.id} and ${seenDe.get(de)})`);
        assert.ok(!seenEn.has(en), `${level.id}: duplicate English "${w.en}" (${u.id} and ${seenEn.get(en)})`);
        seenDe.set(de, u.id); seenEn.set(en, u.id);
      }
    }
  }
});

test("units are big enough for their quizzes and entries are well formed", () => {
  for (const { step, level } of ALL_STEPS) {
    if (step.type === "lesson") continue;
    const units = step.type === "test" ? level.units : level.units.filter((u) => step.unitIds.includes(u.id));
    const words = units.reduce((n, u) => n + u.words.length, 0);
    assert.ok(words >= step.questions, `${step.id}: only ${words} words for ${step.questions} questions`);
  }
  for (const level of LEVELS) for (const u of level.units) {
    assert.ok(u.words.length >= 10, `${u.id}: needs >= 10 words`);
    assert.ok(u.phrases.filter((p) => p.de.split(" ").length >= 3).length >= 4, `${u.id}: needs >= 4 phrases of 3+ words`);
    for (const w of [...u.words, ...u.phrases]) assert.ok(w.de.trim() && w.en.trim() && w.de === w.de.trim());
  }
});

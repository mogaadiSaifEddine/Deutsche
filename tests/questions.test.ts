import { test } from "node:test";
import assert from "node:assert/strict";
import { generateQuestions, isCorrect, normalize, toPublic } from "../src/lib/questions.ts";

const words = [
  { de: "der Vater", en: "father" }, { de: "die Mutter", en: "mother" }, { de: "das Kind", en: "child" },
  { de: "der Bruder", en: "brother" }, { de: "grün", en: "green" }, { de: "Danke", en: "thank you" },
];
const phrases = [{ de: "Das ist meine Mutter.", en: "That is my mother." }];

test("normalize ignores case, punctuation and umlaut spelling", () => {
  assert.equal(normalize("Grün!"), normalize("gruen"));
  assert.equal(normalize("Weiß"), "weiss");
});

test("typed answers accept missing article", () => {
  assert.ok(isCorrect({ kind: "type" }, "der Vater", "vater"));
  assert.ok(isCorrect({ kind: "type" }, "der Vater", "Der Vater"));
  assert.ok(!isCorrect({ kind: "type" }, "der Vater", "die Vater"));
});

test("generated questions are well formed", () => {
  for (let n = 0; n < 50; n++) {
    const qs = generateQuestions(words, phrases, 6);
    assert.equal(qs.length, 6);
    for (const q of qs) {
      if (q.kind === "choice") {
        assert.ok(q.options.includes(q.answer));
        assert.equal(new Set(q.options).size, q.options.length);
      }
      if (q.kind === "build") assert.deepEqual([...q.tokens].sort(), q.answer.split(" ").sort());
      assert.ok(!("answer" in toPublic(q)));
    }
  }
});

test("gap questions are generated with hint and valid options", () => {
  const gaps = [
    { de: "Ich ___ Student.", answer: "bin", options: ["bin", "bist", "ist", "sind"], en: "I am a student." },
    { de: "Du ___ nett.", answer: "bist", options: ["bin", "bist", "ist", "sind"], en: "You are nice." },
    { de: "Er ___ müde.", answer: "ist", options: ["bin", "bist", "ist", "sind"], en: "He is tired." },
  ];
  let seen = 0;
  for (let n = 0; n < 30; n++) {
    const qs = generateQuestions(words, phrases, 10, Math.random, gaps);
    assert.equal(qs.length, 10);
    for (const q of qs) if (q.kind === "choice" && q.variant === "gap") {
      seen++;
      assert.ok(q.options.includes(q.answer) && q.hint && q.prompt.includes("___"));
      assert.ok(isCorrect(q, q.answer, q.answer) && !isCorrect(q, q.answer, "xyz"));
    }
  }
  assert.ok(seen > 0);
});

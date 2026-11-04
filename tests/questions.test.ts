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

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Question } from "@/lib/questions";
import { isCorrect } from "@/lib/questions";
import type { Unit } from "@/content/curriculum";
import { completeLesson } from "../actions";
import { QuestionInput, SpeakButton, type Result } from "./QuestionInput";

function Tip({ text }: { text: string }) {
  const parts = text.split("*");
  return <p>{parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}</p>;
}

export function LessonClient({ stepId, unit, questions }: { stepId: string; unit: Unit; questions: Question[] }) {
  const [phase, setPhase] = useState<"study" | "practice" | "done">("study");
  const [queue, setQueue] = useState<Question[]>(questions);
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState<Result>();
  const [firstTry, setFirstTry] = useState(0);
  const [xp, setXp] = useState<number | null>(null);
  const [error, setError] = useState("");

  const total = questions.length;
  const q = queue[idx];

  function submit(given: string) {
    const ok = isCorrect(q, q.answer, given);
    const retry = q.id.endsWith("r");
    setResult({ ok, answer: q.answer });
    if (ok && !retry) setFirstTry((n) => n + 1);
    if (!ok && !retry) setQueue((qs) => [...qs, { ...q, id: `${q.id}r` }]);
  }

  function next() {
    setResult(undefined);
    if (idx + 1 < queue.length) setIdx(idx + 1);
    else setPhase("done");
  }

  useEffect(() => {
    if (phase !== "done") return;
    completeLesson(stepId, firstTry, total).then((r) => setXp(r.xpGained)).catch((e) => setError(String(e.message ?? e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "study") {
    return (
      <>
        <h1>{unit.emoji} {unit.title} <small>{unit.de}</small></h1>
        <div className="card tip"><Tip text={unit.tip} /></div>
        <h3>Vocabulary</h3>
        <ul className="vocab">
          {unit.words.map((w) => (
            <li key={w.de}><SpeakButton text={w.de} /><b>{w.de}</b><span>{w.en}</span></li>
          ))}
        </ul>
        <h3>Phrases</h3>
        <ul className="vocab">
          {unit.phrases.map((w) => (
            <li key={w.de}><SpeakButton text={w.de} /><b>{w.de}</b><span>{w.en}</span></li>
          ))}
        </ul>
        <button className="btn full sticky" onClick={() => setPhase("practice")}>Start practice</button>
      </>
    );
  }

  if (phase === "done") {
    return (
      <div className="card center">
        <h1>Lektion geschafft! 🎉</h1>
        <p className="big">{firstTry} / {total} correct on the first try</p>
        {xp !== null && xp > 0 && <p className="xpgain">+{xp} XP</p>}
        {error && <p className="error">{error}</p>}
        <div className="row">
          <Link href="/learn" className="btn">Continue</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bar"><i style={{ width: `${(idx / queue.length) * 100}%` }} /></div>
      <QuestionInput key={q.id + idx} q={q} result={result} onSubmit={submit} />
      {result && (
        <div className={`feedback ${result.ok ? "ok" : "bad"}`} role="status">
          <div>
            <b>{result.ok ? "Richtig! ✓" : "Not quite"}</b>
            {!result.ok && <p>Correct answer: <b>{result.answer}</b></p>}
          </div>
          <button className="btn" autoFocus onClick={next}>{idx + 1 < queue.length ? "Continue" : "Finish"}</button>
        </div>
      )}
    </>
  );
}

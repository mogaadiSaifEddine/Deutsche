"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PublicQuestion } from "@/lib/questions";
import { submitAssessment, type AssessmentResult } from "../actions";
import { QuestionInput } from "./QuestionInput";

export function AssessmentClient({
  ticket, questions, title, type, passMark, nextLabel,
}: {
  ticket: string; questions: PublicQuestion[]; title: string; type: "checkpoint" | "test"; passMark: number; nextLabel: string;
}) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<AssessmentResult>();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function answer(given: string) {
    const all = [...answers, given];
    setAnswers(all);
    if (idx + 1 < questions.length) { setIdx(idx + 1); return; }
    startTransition(async () => {
      try { setResult(await submitAssessment(ticket, all)); }
      catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    });
  }

  if (!started) {
    return (
      <div className="card center">
        <h1>{type === "test" ? "🏆" : "✅"} {title}</h1>
        <p>{questions.length} questions · pass mark {Math.round(passMark * 100)}%</p>
        <p className="muted">No hints during the quiz — you'll see your results at the end.{type === "test" ? " Passing unlocks the next level." : ""}</p>
        <button className="btn" onClick={() => setStarted(true)}>Begin</button>
        <p><Link href="/learn" className="muted">Back to path</Link></p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card center">
        <p className="error">{error}</p>
        <button className="btn" onClick={() => router.refresh()}>Restart quiz</button>
      </div>
    );
  }

  if (pending || (!result && idx + 1 === questions.length && answers.length === questions.length)) {
    return <div className="card center"><p>Grading…</p></div>;
  }

  if (result) {
    return (
      <>
        <div className={`card center ${result.passed ? "passed" : "failed"}`}>
          <h1>{result.passed ? (type === "test" ? "Level passed! 🎉" : "Checkpoint passed! ✅") : "Not quite yet"}</h1>
          <p className="big">{result.correct} / {result.total} · {Math.round(result.score * 100)}%</p>
          <p className="muted">Pass mark: {Math.round(result.passMark * 100)}%</p>
          {result.xpGained > 0 && <p className="xpgain">+{result.xpGained} XP</p>}
          <div className="row">
            {result.passed
              ? <Link href="/learn" className="btn">{nextLabel}</Link>
              : <><button className="btn" onClick={() => router.refresh()}>Try again</button><Link href="/learn" className="btn ghost">Review lessons</Link></>}
          </div>
        </div>
        <h3>Your answers</h3>
        <ul className="review">
          {questions.map((q, i) => (
            <li key={q.id} className={result.review[i].ok ? "ok" : "bad"}>
              <span>{result.review[i].ok ? "✓" : "✗"}</span>
              <div>
                <b>{q.kind === "choice" && q.variant === "listen" ? "🔊 (listening)" : q.prompt}</b>
                <small>
                  {result.review[i].ok ? result.review[i].answer : <>You: {answers[i] || "—"} · Correct: <b>{result.review[i].answer}</b></>}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <p className="muted small">{title} · Question {idx + 1} of {questions.length}</p>
      <div className="bar"><i style={{ width: `${(idx / questions.length) * 100}%` }} /></div>
      <QuestionInput key={questions[idx].id} q={questions[idx]} onSubmit={answer} buttonLabel={idx + 1 < questions.length ? "Next" : "Submit"} />
    </>
  );
}

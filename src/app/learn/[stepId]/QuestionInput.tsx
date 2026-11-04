"use client";
import { useState } from "react";
import type { PublicQuestion } from "@/lib/questions";
import { canSpeak, speak } from "@/lib/speech";

export type Result = { ok: boolean; answer: string };

export function SpeakButton({ text, label = "Play pronunciation" }: { text: string; label?: string }) {
  if (!canSpeak()) return null;
  return <button type="button" className="speak" aria-label={label} onClick={() => speak(text)}>🔊</button>;
}

const HEADINGS: Record<string, string> = {
  "de-en": "What does this mean?",
  "en-de": "How do you say this in German?",
  listen: "Listen and choose the meaning",
  article: "Which article?",
};

export function QuestionInput({
  q, result, onSubmit, buttonLabel = "Check",
}: {
  q: PublicQuestion; result?: Result; onSubmit: (given: string) => void; buttonLabel?: string;
}) {
  const [selected, setSelected] = useState("");
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const locked = !!result;

  const given = q.kind === "choice" ? selected : q.kind === "type" ? text : picked.map((i) => q.tokens[i]).join(" ");

  const submit = () => { if (!locked && given.trim()) onSubmit(given); };

  return (
    <div className="question">
      <p className="qhead">
        {q.kind === "choice" ? HEADINGS[q.variant] : q.kind === "type" ? "Type it in German" : "Build the sentence"}
      </p>

      {q.kind === "choice" && (
        <>
          <div className="prompt">
            {q.variant === "listen" ? <SpeakButton text={q.audio!} /> : <span>{q.prompt}</span>}
            {q.variant === "de-en" && <SpeakButton text={q.audio!} />}
          </div>
          <div className={`options ${q.variant === "article" ? "three" : ""}`}>
            {q.options.map((o) => {
              const cls = [
                "option",
                selected === o ? "sel" : "",
                result && o === result.answer ? "right" : "",
                result && selected === o && !result.ok ? "wrong" : "",
              ].join(" ");
              return <button key={o} type="button" className={cls} disabled={locked} onClick={() => setSelected(o)}>{o}</button>;
            })}
          </div>
        </>
      )}

      {q.kind === "type" && (
        <>
          <div className="prompt"><span>{q.prompt}</span></div>
          <input
            className={`typed ${result ? (result.ok ? "right" : "wrong") : ""}`}
            value={text} disabled={locked} autoFocus autoCapitalize="off" autoCorrect="off" spellCheck={false}
            placeholder="Deutsch…" onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <p className="muted small">Tip: ä = ae, ö = oe, ü = ue, ß = ss is accepted.</p>
        </>
      )}

      {q.kind === "build" && (
        <>
          <div className="prompt"><span>{q.prompt}</span></div>
          <div className={`answer-line ${result ? (result.ok ? "right" : "wrong") : ""}`}>
            {picked.map((i) => (
              <button key={i} type="button" className="chip" disabled={locked} onClick={() => setPicked(picked.filter((x) => x !== i))}>{q.tokens[i]}</button>
            ))}
          </div>
          <div className="bank">
            {q.tokens.map((t, i) => (
              <button key={i} type="button" className="chip" disabled={locked || picked.includes(i)} onClick={() => setPicked([...picked, i])}>{t}</button>
            ))}
          </div>
        </>
      )}

      {!locked && (
        <button className="btn full" disabled={!given.trim()} onClick={submit}>{buttonLabel}</button>
      )}
    </div>
  );
}

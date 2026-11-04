import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { LEVELS, unitById } from "@/content/curriculum";
import { getProgress, levelSummary, stepStates } from "@/lib/progress";

const pct = (n: number) => `${Math.round(n * 100)}%`;

export default async function LearnPage() {
  const user = await requireUser();
  const progress = getProgress(user.id);
  const states = stepStates(progress);
  const { completed, current } = levelSummary(progress);

  return (
    <>
      <section className="card level-banner">
        <div>
          <p className="muted">Your level</p>
          <h1>{current ? current.title : "A1 complete 🎉"}</h1>
          <p className="muted">
            {completed.length ? `Finished: ${completed.map((l) => l.title).join(", ")}` : "No levels finished yet. Pass a level test to complete it."}
          </p>
        </div>
        <div className="badges">
          {LEVELS.map((l) => (
            <span key={l.id} className={`badge ${completed.includes(l) ? "on" : ""}`}>{completed.includes(l) ? "✓ " : ""}{l.title}</span>
          ))}
        </div>
      </section>

      {LEVELS.map((level) => {
        const doneCount = level.steps.filter((s) => states.get(s.id) === "done").length;
        return (
          <section key={level.id} className="level">
            <h2>{level.title} <small>{level.subtitle}</small></h2>
            <div className="bar"><i style={{ width: pct(doneCount / level.steps.length) }} /></div>
            <ol className="path">
              {level.steps.map((step) => {
                const state = states.get(step.id)!;
                const p = progress.get(step.id);
                const unit = step.type === "lesson" ? unitById(level, step.unitId) : null;
                const icon = unit ? unit.emoji : step.type === "test" ? "🏆" : "✅";
                const title = unit ? unit.title : (step as Exclude<typeof step, { type: "lesson" }>).title;
                const kind = step.type === "lesson" ? unit!.de : step.type === "test" ? "Pass to unlock the next level" : "Quick quiz";
                const body = (
                  <>
                    <span className="icon">{state === "locked" ? "🔒" : icon}</span>
                    <span className="grow"><b>{title}</b><small>{kind}</small></span>
                    <span className={`pill ${state}`}>
                      {state === "done" ? (step.type === "lesson" ? "Done" : `Passed ${pct(p!.best)}`) : state === "next" ? "Start" : "Locked"}
                    </span>
                  </>
                );
                return (
                  <li key={step.id} className={`step ${step.type} ${state}`}>
                    {state === "locked" ? <div className="step-in">{body}</div> : <Link className="step-in" href={`/learn/${step.id}`}>{body}</Link>}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </>
  );
}

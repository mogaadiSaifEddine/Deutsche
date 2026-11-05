import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { findStep, unitById, ALL_STEPS } from "@/content/curriculum";
import { getProgress, isUnlocked } from "@/lib/progress";
import { generateQuestions, toPublic } from "@/lib/questions";
import { makeTicket } from "../actions";
import { LessonClient } from "./LessonClient";
import { AssessmentClient } from "./AssessmentClient";

export const dynamic = "force-dynamic";

export default async function StepPage({ params }: { params: Promise<{ stepId: string }> }) {
  const { stepId } = await params;
  const user = await requireUser();
  const found = findStep(stepId);
  if (!found) notFound();
  if (!isUnlocked(await getProgress(user.id), stepId)) redirect("/learn");

  const { step, level, pos } = found;
  const upcoming = ALL_STEPS[pos + 1];
  const nextLabel = upcoming ? (upcoming.level.id !== level.id ? `Continue to ${upcoming.level.title}` : "Continue") : "Finish";

  return (
    <>
      <p><Link href="/learn" className="muted">← {level.title}</Link></p>
      {step.type === "lesson" ? (
        (() => {
          const unit = unitById(level, step.unitId);
          const questions = generateQuestions(unit.words, unit.phrases, 10, Math.random, unit.gaps ?? []);
          return <LessonClient stepId={step.id} unit={unit} questions={questions} />;
        })()
      ) : (
        await (async () => {
          const units = step.type === "test" ? level.units : step.unitIds.map((id) => unitById(level, id));
          const questions = generateQuestions(
            units.flatMap((u) => u.words), units.flatMap((u) => u.phrases), step.questions, Math.random, units.flatMap((u) => u.gaps ?? []),
          );
          const ticket = await makeTicket(user.id, step.id, questions);
          return (
            <AssessmentClient
              key={ticket} ticket={ticket} questions={questions.map(toPublic)} title={step.title}
              type={step.type} passMark={step.passMark} nextLabel={nextLabel}
            />
          );
        })()
      )}
    </>
  );
}

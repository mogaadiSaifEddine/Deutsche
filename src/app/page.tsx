import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Home() {
  if (await getUser()) redirect("/learn");
  return (
    <section className="hero">
      <h1>Learn German, one step at a time.</h1>
      <p>Short lessons, spoken pronunciation, checkpoint quizzes and a test at the end of every level. Start at A1 and your progress is saved to your account.</p>
      <div className="row">
        <Link href="/register" className="btn">Start learning</Link>
        <Link href="/login" className="btn ghost">I have an account</Link>
      </div>
      <ul className="features">
        <li><b>A1.1 → A1.2</b><span>Two levels, ten lessons</span></li>
        <li><b>Checkpoints</b><span>Quick quizzes after a few lessons</span></li>
        <li><b>Level tests</b><span>Pass to unlock the next level</span></li>
      </ul>
    </section>
  );
}

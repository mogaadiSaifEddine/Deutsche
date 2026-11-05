import type { Gap, Word } from "../content/curriculum";

export type Question =
  | { id: string; kind: "choice"; variant: "de-en" | "en-de" | "listen" | "article" | "gap"; prompt: string; hint?: string; audio?: string; options: string[]; answer: string }
  | { id: string; kind: "type"; prompt: string; answer: string }
  | { id: string; kind: "build"; prompt: string; tokens: string[]; answer: string };

type Distribute<T> = T extends unknown ? Omit<T, "answer"> : never;
/** What the browser receives for graded assessments: no answers. */
export type PublicQuestion = Distribute<Question>;

export const ARTICLES = ["der", "die", "das"];
const ARTICLE_RE = /^(der|die|das)\s+/i;

export function articleOf(de: string): string | null {
  const m = de.match(ARTICLE_RE);
  return m ? m[1].toLowerCase() : null;
}
export const stripArticle = (de: string) => de.replace(ARTICLE_RE, "");

/** Lenient comparison: case, punctuation and umlaut spelling (ä/ae, ß/ss) are ignored. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[.,!?;:"'“”„‘’¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect(q: { kind: Question["kind"] }, answer: string, given: string): boolean {
  if (!given) return false;
  if (q.kind === "choice") return given === answer;
  if (q.kind === "build") return normalize(given) === normalize(answer);
  const g = normalize(given);
  return g === normalize(answer) || g === normalize(stripArticle(answer));
}

export type Rng = () => number;

export function shuffle<T>(arr: readonly T[], rng: Rng = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickOptions(correct: string, pool: string[], rng: Rng, n = 4): string[] {
  const others = shuffle([...new Set(pool)].filter((x) => x !== correct), rng).slice(0, n - 1);
  return shuffle([correct, ...others], rng);
}

/**
 * Builds `count` mixed questions from the given vocabulary and phrases.
 * ~30% fill-in-the-gap grammar, ~20% sentence building, the rest vocabulary (translate, listen, article, type).
 */
export function generateQuestions(words: Word[], phrases: Word[], count: number, rng: Rng = Math.random, gaps: Gap[] = []): Question[] {
  // Sentence building needs at least 3 words to be a meaningful exercise.
  phrases = phrases.filter((p) => p.de.split(/\s+/).length >= 3);
  const nGaps = Math.min(gaps.length, Math.round(count * 0.3));
  const nPhrases = Math.min(phrases.length, Math.round(count * 0.2));
  const nWords = Math.min(words.length, count - nPhrases - nGaps);
  const questions: Question[] = [];
  const dePool = words.map((w) => w.de);
  const enPool = words.map((w) => w.en);

  shuffle(words, rng).slice(0, nWords).forEach((w, i) => {
    const kinds: string[] = ["de-en", "en-de", "listen"];
    if (articleOf(w.de)) kinds.push("article", "article");
    if (!w.de.includes("/")) kinds.push("type");
    const kind = kinds[Math.floor(rng() * kinds.length)];
    const id = `w${i}`;
    switch (kind) {
      case "de-en":
        questions.push({ id, kind: "choice", variant: "de-en", prompt: w.de, audio: w.de, options: pickOptions(w.en, enPool, rng), answer: w.en });
        break;
      case "en-de":
        questions.push({ id, kind: "choice", variant: "en-de", prompt: w.en, options: pickOptions(w.de, dePool, rng), answer: w.de });
        break;
      case "listen":
        questions.push({ id, kind: "choice", variant: "listen", prompt: "Listen and choose the meaning", audio: w.de, options: pickOptions(w.en, enPool, rng), answer: w.en });
        break;
      case "article":
        questions.push({ id, kind: "choice", variant: "article", prompt: stripArticle(w.de), audio: w.de, options: ARTICLES, answer: articleOf(w.de)! });
        break;
      default:
        questions.push({ id, kind: "type", prompt: w.en, answer: w.de });
    }
  });

  shuffle(phrases, rng).slice(0, nPhrases).forEach((p, i) => {
    const tokens = p.de.split(/\s+/);
    questions.push({ id: `p${i}`, kind: "build", prompt: p.en, tokens: shuffle(tokens, rng), answer: p.de });
  });

  shuffle(gaps, rng).slice(0, nGaps).forEach((gap, i) => {
    questions.push({
      id: `g${i}`, kind: "choice", variant: "gap", prompt: gap.de, hint: gap.en,
      options: shuffle(gap.options, rng), answer: gap.answer,
    });
  });

  return shuffle(questions, rng).map((q, i) => ({ ...q, id: `q${i}` }));
}

export function toPublic(q: Question): PublicQuestion {
  const { answer: _answer, ...rest } = q;
  return rest as PublicQuestion;
}

import type { Gap, Word } from "./curriculum";

export const w = (de: string, en: string): Word => ({ de, en });

/** Fill-in-the-gap item: `de` contains one "___"; `en` is the translation shown as a hint. */
export const g = (de: string, answer: string, options: string[], en: string): Gap => ({ de, answer, options, en });

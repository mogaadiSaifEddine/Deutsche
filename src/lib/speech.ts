"use client";

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Speaks German text with the browser's built-in voices (no network or API keys needed). */
export function speak(text: string) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.85;
  const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("de"));
  if (voice) u.voice = voice;
  synth.speak(u);
}

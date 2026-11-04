export type Word = { de: string; en: string };

export type Unit = {
  id: string;
  emoji: string;
  title: string;
  de: string;
  tip: string; // plain text with *emphasis* markers rendered by <Tip/>
  words: Word[];
  phrases: Word[];
};

export type Step =
  | { id: string; type: "lesson"; unitId: string }
  | { id: string; type: "checkpoint"; title: string; unitIds: string[]; passMark: number; questions: number }
  | { id: string; type: "test"; title: string; passMark: number; questions: number };

export type Level = { id: string; title: string; subtitle: string; units: Unit[]; steps: Step[] };

const w = (de: string, en: string): Word => ({ de, en });

const U: Record<string, Unit> = {
  greetings: {
    id: "greetings", emoji: "👋", title: "Greetings", de: "Begrüßungen",
    tip: "Use *du* with friends, family and children, and *Sie* (capital S) with strangers and in formal situations. *Guten Tag* is polite all day; *Hallo* is casual.",
    words: [
      w("Hallo", "hello"), w("Guten Morgen", "good morning"), w("Guten Tag", "good day"),
      w("Guten Abend", "good evening"), w("Gute Nacht", "good night"), w("Tschüss", "bye"),
      w("Auf Wiedersehen", "goodbye"), w("Bis bald", "see you soon"), w("Danke", "thank you"),
      w("Bitte", "please / you're welcome"), w("Entschuldigung", "excuse me / sorry"),
      w("Ja", "yes"), w("Nein", "no"), w("Wie geht's?", "how are you?"), w("Gut", "good / fine"),
    ],
    phrases: [
      w("Ich heiße Anna.", "My name is Anna."), w("Wie heißt du?", "What is your name?"),
      w("Ich komme aus Deutschland.", "I come from Germany."), w("Freut mich!", "Nice to meet you!"),
      w("Woher kommst du?", "Where are you from?"),
    ],
  },
  numbers: {
    id: "numbers", emoji: "🔢", title: "Numbers 0–20", de: "Zahlen",
    tip: "13–19 are the unit + *zehn* (drei*zehn*). Exceptions: 16 = *sechzehn* (no s) and 17 = *siebzehn* (no en). Numbers up to 20 are written as one word.",
    words: [
      w("null", "0"), w("eins", "1"), w("zwei", "2"), w("drei", "3"), w("vier", "4"), w("fünf", "5"),
      w("sechs", "6"), w("sieben", "7"), w("acht", "8"), w("neun", "9"), w("zehn", "10"), w("elf", "11"),
      w("zwölf", "12"), w("dreizehn", "13"), w("vierzehn", "14"), w("fünfzehn", "15"),
      w("sechzehn", "16"), w("siebzehn", "17"), w("achtzehn", "18"), w("neunzehn", "19"), w("zwanzig", "20"),
    ],
    phrases: [
      w("Ich bin zwanzig Jahre alt.", "I am twenty years old."), w("Wie alt bist du?", "How old are you?"),
      w("Das kostet drei Euro.", "That costs three euros."), w("Ich habe zwei Brüder.", "I have two brothers."),
    ],
  },
  family: {
    id: "family", emoji: "👨‍👩‍👧", title: "Family", de: "Familie",
    tip: "Every noun is *der* (masculine), *die* (feminine) or *das* (neuter). Always learn the article with the noun. In the plural, all nouns use *die* (die Eltern).",
    words: [
      w("der Vater", "father"), w("die Mutter", "mother"), w("der Bruder", "brother"), w("die Schwester", "sister"),
      w("der Sohn", "son"), w("die Tochter", "daughter"), w("die Eltern", "parents"), w("der Großvater", "grandfather"),
      w("die Großmutter", "grandmother"), w("der Onkel", "uncle"), w("die Tante", "aunt"), w("das Kind", "child"),
      w("der Freund", "friend (male)"), w("die Freundin", "friend (female)"),
    ],
    phrases: [
      w("Das ist meine Mutter.", "That is my mother."), w("Ich habe eine Schwester.", "I have a sister."),
      w("Hast du Geschwister?", "Do you have siblings?"), w("Meine Familie ist groß.", "My family is big."),
      w("Er ist mein Bruder.", "He is my brother."),
    ],
  },
  food: {
    id: "food", emoji: "🥐", title: "Food & Drink", de: "Essen und Trinken",
    tip: "Order politely with *Ich möchte …* (I would like …). Masculine nouns change their article after möchte/habe: *Ich möchte einen Kaffee.* (accusative case).",
    words: [
      w("das Brot", "bread"), w("der Käse", "cheese"), w("das Wasser", "water"), w("der Kaffee", "coffee"),
      w("der Tee", "tea"), w("die Milch", "milk"), w("der Apfel", "apple"), w("die Banane", "banana"),
      w("das Fleisch", "meat"), w("der Fisch", "fish"), w("die Suppe", "soup"), w("der Reis", "rice"),
      w("das Ei", "egg"), w("der Saft", "juice"), w("das Bier", "beer"),
    ],
    phrases: [
      w("Ich möchte einen Kaffee, bitte.", "I would like a coffee, please."), w("Das schmeckt gut.", "That tastes good."),
      w("Ich habe Hunger.", "I am hungry."), w("Ich habe Durst.", "I am thirsty."), w("Die Rechnung, bitte.", "The bill, please."),
    ],
  },
  colors: {
    id: "colors", emoji: "🎨", title: "Colors", de: "Farben",
    tip: "Colors are adjectives and don't change after *ist*: *Der Apfel ist rot.* Nouns are always capitalised in German, but colors used as adjectives are not.",
    words: [
      w("rot", "red"), w("blau", "blue"), w("grün", "green"), w("gelb", "yellow"), w("schwarz", "black"),
      w("weiß", "white"), w("braun", "brown"), w("grau", "gray"), w("orange", "orange"), w("rosa", "pink"), w("lila", "purple"),
    ],
    phrases: [
      w("Der Apfel ist rot.", "The apple is red."), w("Meine Lieblingsfarbe ist blau.", "My favorite color is blue."),
      w("Das Auto ist schwarz.", "The car is black."), w("Der Himmel ist blau.", "The sky is blue."),
    ],
  },
  time: {
    id: "time", emoji: "📅", title: "Days & Time", de: "Tage und Zeit",
    tip: "Days are masculine (*der Montag*). Use *am* to say \"on\": *am Montag*. To say what day it is: *Heute ist Montag.*",
    words: [
      w("Montag", "Monday"), w("Dienstag", "Tuesday"), w("Mittwoch", "Wednesday"), w("Donnerstag", "Thursday"),
      w("Freitag", "Friday"), w("Samstag", "Saturday"), w("Sonntag", "Sunday"), w("heute", "today"),
      w("morgen", "tomorrow"), w("gestern", "yesterday"), w("der Tag", "day"), w("die Woche", "week"),
      w("der Monat", "month"), w("das Jahr", "year"), w("die Uhr", "clock / o'clock"),
    ],
    phrases: [
      w("Heute ist Montag.", "Today is Monday."), w("Wie spät ist es?", "What time is it?"),
      w("Bis morgen!", "See you tomorrow!"), w("Am Samstag schlafe ich lange.", "On Saturday I sleep in."),
    ],
  },
  "sein-haben": {
    id: "sein-haben", emoji: "🧩", title: "To be & to have", de: "Sein und haben",
    tip: "*sein*: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. *haben*: ich habe, du hast, er hat, wir haben, ihr habt, sie/Sie haben. Both are irregular, so memorise them.",
    words: [
      w("ich bin", "I am"), w("du bist", "you are"), w("er ist", "he is"), w("wir sind", "we are"),
      w("ihr seid", "you (plural) are"), w("sie sind", "they are"), w("ich habe", "I have"), w("du hast", "you have"),
      w("er hat", "he has"), w("wir haben", "we have"), w("ihr habt", "you (plural) have"), w("sie haben", "they have"),
    ],
    phrases: [
      w("Ich bin Student.", "I am a student."), w("Du bist nett.", "You are nice."), w("Wir haben Zeit.", "We have time."),
      w("Sie hat einen Hund.", "She has a dog."), w("Ich bin müde.", "I am tired."),
    ],
  },
  home: {
    id: "home", emoji: "🏠", title: "At Home", de: "Zuhause",
    tip: "To say where something is, use *in* + dative: *in der Küche* (feminine), *im Zimmer* (in + dem). Say where you live with *Ich wohne in …*",
    words: [
      w("das Haus", "house"), w("die Wohnung", "apartment"), w("das Zimmer", "room"), w("die Küche", "kitchen"),
      w("das Badezimmer", "bathroom"), w("das Schlafzimmer", "bedroom"), w("das Wohnzimmer", "living room"),
      w("der Tisch", "table"), w("der Stuhl", "chair"), w("das Bett", "bed"), w("die Tür", "door"),
      w("das Fenster", "window"), w("der Garten", "garden"), w("die Lampe", "lamp"),
    ],
    phrases: [
      w("Wo ist die Küche?", "Where is the kitchen?"), w("Ich wohne in Berlin.", "I live in Berlin."),
      w("Das Zimmer ist klein.", "The room is small."), w("Die Wohnung ist schön.", "The apartment is beautiful."),
    ],
  },
  verbs: {
    id: "verbs", emoji: "🏃", title: "Everyday Verbs", de: "Alltag",
    tip: "Regular verbs drop *-en* and add: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. The verb sits in 2nd position: *Heute lerne ich Deutsch.*",
    words: [
      w("essen", "to eat"), w("trinken", "to drink"), w("gehen", "to go"), w("kommen", "to come"), w("machen", "to do / make"),
      w("lernen", "to learn"), w("sprechen", "to speak"), w("wohnen", "to live (reside)"), w("arbeiten", "to work"),
      w("spielen", "to play"), w("schlafen", "to sleep"), w("lesen", "to read"), w("kaufen", "to buy"),
      w("sehen", "to see"), w("hören", "to hear"),
    ],
    phrases: [
      w("Ich lerne Deutsch.", "I am learning German."), w("Ich spreche ein bisschen Deutsch.", "I speak a little German."),
      w("Er arbeitet in einem Büro.", "He works in an office."), w("Wir gehen nach Hause.", "We are going home."),
      w("Was machst du?", "What are you doing?"),
    ],
  },
  city: {
    id: "city", emoji: "🏙️", title: "In the City", de: "In der Stadt",
    tip: "Directions: *links* (left), *rechts* (right), *geradeaus* (straight ahead). Polite commands use the *Sie* form with the verb first: *Gehen Sie geradeaus.*",
    words: [
      w("die Stadt", "city / town"), w("die Straße", "street"), w("der Bahnhof", "train station"), w("der Supermarkt", "supermarket"),
      w("die Schule", "school"), w("das Restaurant", "restaurant"), w("die Bank", "bank"), w("die Apotheke", "pharmacy"),
      w("der Bus", "bus"), w("der Zug", "train"), w("links", "left"), w("rechts", "right"), w("geradeaus", "straight ahead"),
      w("das Hotel", "hotel"), w("der Park", "park"),
    ],
    phrases: [
      w("Wo ist der Bahnhof?", "Where is the train station?"), w("Gehen Sie geradeaus.", "Go straight ahead."),
      w("Ich brauche einen Fahrschein.", "I need a ticket."), w("Entschuldigung, wo ist die Toilette?", "Excuse me, where is the toilet?"),
    ],
  },
};

export const LEVELS: Level[] = [
  {
    id: "A1.1", title: "A1.1", subtitle: "First steps: greetings, numbers, family, food & colors",
    units: [U.greetings, U.numbers, U.family, U.food, U.colors],
    steps: [
      { id: "a11-greetings", type: "lesson", unitId: "greetings" },
      { id: "a11-numbers", type: "lesson", unitId: "numbers" },
      { id: "a11-cp1", type: "checkpoint", title: "Checkpoint 1", unitIds: ["greetings", "numbers"], passMark: 0.7, questions: 10 },
      { id: "a11-family", type: "lesson", unitId: "family" },
      { id: "a11-food", type: "lesson", unitId: "food" },
      { id: "a11-colors", type: "lesson", unitId: "colors" },
      { id: "a11-cp2", type: "checkpoint", title: "Checkpoint 2", unitIds: ["family", "food", "colors"], passMark: 0.7, questions: 12 },
      { id: "a11-test", type: "test", title: "Level Test A1.1", passMark: 0.8, questions: 20 },
    ],
  },
  {
    id: "A1.2", title: "A1.2", subtitle: "Everyday life: days, verbs, home & the city",
    units: [U.time, U["sein-haben"], U.home, U.verbs, U.city],
    steps: [
      { id: "a12-time", type: "lesson", unitId: "time" },
      { id: "a12-sein-haben", type: "lesson", unitId: "sein-haben" },
      { id: "a12-cp1", type: "checkpoint", title: "Checkpoint 1", unitIds: ["time", "sein-haben"], passMark: 0.7, questions: 10 },
      { id: "a12-home", type: "lesson", unitId: "home" },
      { id: "a12-verbs", type: "lesson", unitId: "verbs" },
      { id: "a12-city", type: "lesson", unitId: "city" },
      { id: "a12-cp2", type: "checkpoint", title: "Checkpoint 2", unitIds: ["home", "verbs", "city"], passMark: 0.7, questions: 12 },
      { id: "a12-test", type: "test", title: "Level Test A1.2", passMark: 0.8, questions: 20 },
    ],
  },
];

export const ALL_STEPS: { step: Step; level: Level; index: number }[] = LEVELS.flatMap((level) =>
  level.steps.map((step, index) => ({ step, level, index })),
);

export function findStep(id: string) {
  const pos = ALL_STEPS.findIndex((s) => s.step.id === id);
  return pos < 0 ? null : { ...ALL_STEPS[pos], pos };
}

export function unitById(level: Level, id: string): Unit {
  const u = level.units.find((x) => x.id === id);
  if (!u) throw new Error(`Unknown unit ${id}`);
  return u;
}

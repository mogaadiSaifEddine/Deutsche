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
      w("Willkommen", "welcome"),
      w("Wie bitte?", "pardon?"),
      w("Viel Glück", "good luck"),
      w("Gute Besserung", "get well soon"),
    ],
    phrases: [
      w("Ich heiße Anna.", "My name is Anna."), w("Wie heißt du?", "What is your name?"),
      w("Ich komme aus Deutschland.", "I come from Germany."), w("Freut mich!", "Nice to meet you!"),
      w("Woher kommst du?", "Where are you from?"),
      w("Wie geht es Ihnen?", "How are you? (formal)"),
      w("Mir geht es gut, danke.", "I am fine, thank you."),
      w("Sprechen Sie Englisch?", "Do you speak English?"),
      w("Ich verstehe nicht.", "I do not understand."),
      w("Ich heiße Max und du?", "My name is Max, and you?"),
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
      w("der Mann", "man / husband"),
      w("die Frau", "woman / wife"),
      w("das Baby", "baby"),
      w("die Geschwister", "siblings"),
    ],
    phrases: [
      w("Das ist meine Mutter.", "That is my mother."), w("Ich habe eine Schwester.", "I have a sister."),
      w("Hast du Geschwister?", "Do you have siblings?"), w("Meine Familie ist groß.", "My family is big."),
      w("Er ist mein Bruder.", "He is my brother."),
      w("Mein Vater ist Lehrer.", "My father is a teacher."),
      w("Wie viele Geschwister hast du?", "How many siblings do you have?"),
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
      w("das Obst", "fruit"),
      w("das Gemüse", "vegetables"),
      w("die Kartoffel", "potato"),
      w("die Tomate", "tomato"),
      w("der Kuchen", "cake"),
      w("die Butter", "butter"),
      w("das Frühstück", "breakfast"),
      w("das Mittagessen", "lunch"),
      w("das Abendessen", "dinner"),
    ],
    phrases: [
      w("Ich möchte einen Kaffee, bitte.", "I would like a coffee, please."), w("Das schmeckt gut.", "That tastes good."),
      w("Ich habe Hunger.", "I am hungry."), w("Ich habe Durst.", "I am thirsty."), w("Die Rechnung, bitte.", "The bill, please."),
      w("Guten Appetit!", "Enjoy your meal!"),
      w("Was möchten Sie trinken?", "What would you like to drink?"),
      w("Ich esse gern Kuchen.", "I like eating cake."),
      w("Zum Frühstück esse ich Brot.", "For breakfast I eat bread."),
    ],
  },
  colors: {
    id: "colors", emoji: "🎨", title: "Colors", de: "Farben",
    tip: "Colors are adjectives and don't change after *ist*: *Der Apfel ist rot.* Nouns are always capitalised in German, but colors used as adjectives are not.",
    words: [
      w("rot", "red"), w("blau", "blue"), w("grün", "green"), w("gelb", "yellow"), w("schwarz", "black"),
      w("weiß", "white"), w("braun", "brown"), w("grau", "gray"), w("orange", "orange"), w("rosa", "pink"), w("lila", "purple"),
      w("hell", "light"),
      w("dunkel", "dark"),
      w("bunt", "colorful"),
    ],
    phrases: [
      w("Der Apfel ist rot.", "The apple is red."), w("Meine Lieblingsfarbe ist blau.", "My favorite color is blue."),
      w("Das Auto ist schwarz.", "The car is black."), w("Der Himmel ist blau.", "The sky is blue."),
      w("Die Banane ist gelb.", "The banana is yellow."),
      w("Das Haus ist weiß.", "The house is white."),
      w("Welche Farbe hat das Auto?", "What color is the car?"),
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
      w("der Morgen", "morning"),
      w("der Mittag", "noon"),
      w("der Abend", "evening"),
      w("die Nacht", "night"),
      w("jetzt", "now"),
      w("früh", "early"),
      w("spät", "late"),
    ],
    phrases: [
      w("Heute ist Montag.", "Today is Monday."), w("Wie spät ist es?", "What time is it?"),
      w("Bis morgen!", "See you tomorrow!"), w("Am Samstag schlafe ich lange.", "On Saturday I sleep in."),
      w("Es ist drei Uhr.", "It is three o'clock."),
      w("Ich stehe um sieben Uhr auf.", "I get up at seven o'clock."),
      w("Bis später!", "See you later!"),
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
      w("das Sofa", "sofa"),
      w("der Schrank", "cupboard / closet"),
      w("der Kühlschrank", "refrigerator"),
      w("die Dusche", "shower"),
      w("der Balkon", "balcony"),
    ],
    phrases: [
      w("Wo ist die Küche?", "Where is the kitchen?"), w("Ich wohne in Berlin.", "I live in Berlin."),
      w("Das Zimmer ist klein.", "The room is small."), w("Die Wohnung ist schön.", "The apartment is beautiful."),
      w("Das Sofa ist im Wohnzimmer.", "The sofa is in the living room."),
      w("Die Katze schläft im Bett.", "The cat sleeps in the bed."),
      w("Wir haben einen Balkon.", "We have a balcony."),
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
      w("fahren", "to drive / travel"),
      w("heißen", "to be called"),
      w("brauchen", "to need"),
      w("möchten", "would like to"),
      w("fragen", "to ask"),
      w("kochen", "to cook"),
    ],
    phrases: [
      w("Ich lerne Deutsch.", "I am learning German."), w("Ich spreche ein bisschen Deutsch.", "I speak a little German."),
      w("Er arbeitet in einem Büro.", "He works in an office."), w("Wir gehen nach Hause.", "We are going home."),
      w("Was machst du?", "What are you doing?"),
      w("Ich fahre mit dem Bus.", "I travel by bus."),
      w("Sie kocht Suppe.", "She is cooking soup."),
      w("Ich brauche Hilfe.", "I need help."),
      w("Er heißt Peter.", "His name is Peter."),
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
      w("das Krankenhaus", "hospital"),
      w("die Post", "post office"),
      w("das Kino", "cinema"),
      w("die Bäckerei", "bakery"),
      w("die Haltestelle", "stop (bus / tram)"),
    ],
    phrases: [
      w("Wo ist der Bahnhof?", "Where is the train station?"), w("Gehen Sie geradeaus.", "Go straight ahead."),
      w("Ich brauche einen Fahrschein.", "I need a ticket."), w("Entschuldigung, wo ist die Toilette?", "Excuse me, where is the toilet?"),
      w("Das Kino ist neben der Bank.", "The cinema is next to the bank."),
      w("Der Bus kommt um acht Uhr.", "The bus comes at eight o'clock."),
      w("Ich gehe zur Bäckerei.", "I am going to the bakery."),
    ],
  },
  countries: {
    id: "countries", emoji: "🌍", title: "Countries & Languages", de: "Länder und Sprachen",
    tip: "Most countries have no article (*Deutschland*, *Spanien*), but a few do: *die Schweiz*, *die Türkei*. Say where you come from with *aus* and where you live with *in*: *Ich komme aus Spanien. Ich wohne in Italien.* Languages are written with a capital letter: *Ich spreche Deutsch.*",
    words: [
      w("Deutschland", "Germany"), w("Österreich", "Austria"), w("die Schweiz", "Switzerland"), w("Frankreich", "France"),
      w("Spanien", "Spain"), w("Italien", "Italy"), w("die Türkei", "Turkey"), w("England", "England"),
      w("Deutsch", "German (language)"), w("Englisch", "English (language)"), w("Französisch", "French (language)"),
      w("Spanisch", "Spanish (language)"), w("Italienisch", "Italian (language)"), w("Arabisch", "Arabic (language)"),
      w("die Sprache", "language"),
    ],
    phrases: [
      w("Ich spreche Englisch und Deutsch.", "I speak English and German."), w("Sprichst du Spanisch?", "Do you speak Spanish?"),
      w("Ich komme aus Spanien.", "I come from Spain."), w("Er wohnt in Frankreich.", "He lives in France."),
      w("Meine Muttersprache ist Arabisch.", "My native language is Arabic."),
    ],
  },
  animals: {
    id: "animals", emoji: "🐶", title: "Animals", de: "Tiere",
    tip: "*ein* (masculine and neuter) and *eine* (feminine) mean \"a/an\": *ein Hund, ein Pferd, eine Katze.* After *haben*, masculine nouns take *einen*: *Ich habe einen Hund.* Plurals vary: *Hund → Hunde*, *Katze → Katzen*, *Maus → Mäuse*. Learn the plural with each noun.",
    words: [
      w("der Hund", "dog"), w("die Katze", "cat"), w("der Vogel", "bird"), w("das Pferd", "horse"),
      w("die Kuh", "cow"), w("das Schwein", "pig"), w("die Maus", "mouse"), w("der Löwe", "lion"),
      w("der Bär", "bear"), w("das Kaninchen", "rabbit"), w("die Ente", "duck"), w("das Tier", "animal"),
      w("das Haustier", "pet"),
    ],
    phrases: [
      w("Ich habe einen Hund.", "I have a dog."), w("Die Katze schläft.", "The cat is sleeping."),
      w("Der Hund ist groß.", "The dog is big."), w("Hast du ein Haustier?", "Do you have a pet?"),
      w("Das Pferd ist braun.", "The horse is brown."),
    ],
  },
  objects: {
    id: "objects", emoji: "🎒", title: "Everyday Objects", de: "Gegenstände",
    tip: "Identify things with *Das ist …*: *Das ist ein Buch.* To say \"not a\", use *kein/keine*: *Das ist kein Buch.* (masculine accusative: *keinen* — *Ich habe keinen Schlüssel.*). Possessives: *mein* (my), *dein* (your).",
    words: [
      w("das Buch", "book"), w("der Stift", "pen"), w("das Heft", "notebook"), w("die Tasche", "bag"),
      w("das Handy", "mobile phone"), w("der Computer", "computer"), w("der Schlüssel", "key"), w("das Geld", "money"),
      w("der Rucksack", "backpack"), w("das Papier", "paper"), w("die Brille", "glasses"), w("das Auto", "car"),
      w("das Fahrrad", "bicycle"), w("der Fernseher", "television"),
    ],
    phrases: [
      w("Das ist ein Buch.", "That is a book."), w("Wo ist mein Handy?", "Where is my phone?"),
      w("Ich habe keinen Schlüssel.", "I do not have a key."), w("Das ist mein Rucksack.", "That is my backpack."),
      w("Hast du einen Stift?", "Do you have a pen?"),
    ],
  },
  shopping: {
    id: "shopping", emoji: "🛒", title: "Shopping & Numbers", de: "Einkaufen",
    tip: "Tens end in *-zig*: dreißig (30, written with ß), vierzig, fünfzig, sechzig (no s), siebzig (no en), achtzig, neunzig. In-between numbers put the unit first: 21 = *einundzwanzig* (\"one and twenty\"). Ask the price with *Wie viel kostet das?*",
    words: [
      w("dreißig", "30"), w("vierzig", "40"), w("fünfzig", "50"), w("sechzig", "60"), w("siebzig", "70"),
      w("achtzig", "80"), w("neunzig", "90"), w("hundert", "100"), w("der Preis", "price"), w("teuer", "expensive"),
      w("billig", "cheap"), w("bezahlen", "to pay"), w("das Geschäft", "shop"), w("die Kasse", "checkout"), w("die Karte", "card"),
    ],
    phrases: [
      w("Wie viel kostet das?", "How much does that cost?"), w("Das ist zu teuer.", "That is too expensive."),
      w("Ich nehme das.", "I will take that."), w("Kann ich mit Karte bezahlen?", "Can I pay by card?"),
      w("Das macht fünfzig Euro.", "That comes to fifty euros."),
    ],
  },
  body: {
    id: "body", emoji: "🩺", title: "Body & Health", de: "Körper und Gesundheit",
    tip: "Pain: *Ich habe Kopfschmerzen* (headache) or *Mein Bauch tut weh* (my stomach hurts). Many body parts have irregular plurals: *die Hand → die Hände*, *der Fuß → die Füße*. Wish someone well with *Gute Besserung!*",
    words: [
      w("der Kopf", "head"), w("das Auge", "eye"), w("das Ohr", "ear"), w("die Nase", "nose"), w("der Mund", "mouth"),
      w("die Hand", "hand"), w("der Arm", "arm"), w("das Bein", "leg"), w("der Fuß", "foot"), w("der Bauch", "stomach"),
      w("der Rücken", "back"), w("das Herz", "heart"), w("krank", "sick"), w("gesund", "healthy"), w("der Arzt", "doctor"),
    ],
    phrases: [
      w("Ich habe Kopfschmerzen.", "I have a headache."), w("Mein Bauch tut weh.", "My stomach hurts."),
      w("Ich bin krank.", "I am sick."), w("Ich muss zum Arzt gehen.", "I have to go to the doctor."),
      w("Gute Besserung!", "Get well soon!"),
    ],
  },
  weather: {
    id: "weather", emoji: "⛅", title: "Weather & Months", de: "Wetter und Monate",
    tip: "Use *es* for weather: *Es regnet* (it rains), *Es schneit* (it snows), *Es ist kalt.* Say \"in\" a season or month with *im*: *im Sommer*, *im Mai*. Seasons and months are all masculine: *der Sommer*, *der Mai*.",
    words: [
      w("das Wetter", "weather"), w("die Sonne", "sun"), w("der Regen", "rain"), w("der Schnee", "snow"), w("der Wind", "wind"),
      w("die Wolke", "cloud"), w("warm", "warm"), w("kalt", "cold"), w("heiß", "hot"),
      w("der Frühling", "spring"), w("der Sommer", "summer"), w("der Herbst", "autumn"), w("der Winter", "winter"),
      w("Januar", "January"), w("Februar", "February"), w("März", "March"), w("April", "April"), w("Mai", "May"),
      w("Juni", "June"), w("Juli", "July"), w("August", "August"), w("September", "September"), w("Oktober", "October"),
      w("November", "November"), w("Dezember", "December"),
    ],
    phrases: [
      w("Heute ist das Wetter schön.", "The weather is nice today."), w("Es regnet.", "It is raining."),
      w("Im Sommer ist es heiß.", "In summer it is hot."), w("Mein Geburtstag ist im Mai.", "My birthday is in May."),
      w("Es ist kalt.", "It is cold."),
    ],
  },
  jobs: {
    id: "jobs", emoji: "💼", title: "Jobs", de: "Berufe",
    tip: "Add *-in* for a woman: *der Lehrer → die Lehrerin*. After *sein*, jobs take no article: *Ich bin Lehrerin.* (not \"eine Lehrerin\"). Ask with *Was bist du von Beruf?* or *Was machst du beruflich?*",
    words: [
      w("der Beruf", "job / profession"), w("der Lehrer", "teacher (male)"), w("die Lehrerin", "teacher (female)"),
      w("der Student", "student (male)"), w("die Studentin", "student (female)"), w("der Schüler", "pupil (male)"),
      w("der Koch", "cook (male)"), w("der Kellner", "waiter"), w("die Kellnerin", "waitress"),
      w("der Verkäufer", "sales assistant (male)"), w("der Polizist", "police officer (male)"), w("der Fahrer", "driver"),
      w("der Ingenieur", "engineer (male)"), w("die Krankenschwester", "nurse (female)"),
    ],
    phrases: [
      w("Was bist du von Beruf?", "What do you do for a living?"), w("Ich bin Lehrerin.", "I am a teacher."),
      w("Mein Vater ist Koch.", "My father is a cook."), w("Sie arbeitet als Kellnerin.", "She works as a waitress."),
      w("Er ist Ingenieur.", "He is an engineer."),
    ],
  },
};

export const LEVELS: Level[] = [
  {
    id: "A1.1", title: "A1.1", subtitle: "First steps: greetings, numbers, family, food, colors, countries, animals & objects",
    units: [U.greetings, U.numbers, U.family, U.food, U.colors, U.countries, U.animals, U.objects],
    steps: [
      { id: "a11-greetings", type: "lesson", unitId: "greetings" },
      { id: "a11-numbers", type: "lesson", unitId: "numbers" },
      { id: "a11-cp1", type: "checkpoint", title: "Checkpoint 1", unitIds: ["greetings", "numbers"], passMark: 0.7, questions: 10 },
      { id: "a11-family", type: "lesson", unitId: "family" },
      { id: "a11-food", type: "lesson", unitId: "food" },
      { id: "a11-colors", type: "lesson", unitId: "colors" },
      { id: "a11-cp2", type: "checkpoint", title: "Checkpoint 2", unitIds: ["family", "food", "colors"], passMark: 0.7, questions: 12 },
      { id: "a11-countries", type: "lesson", unitId: "countries" },
      { id: "a11-animals", type: "lesson", unitId: "animals" },
      { id: "a11-objects", type: "lesson", unitId: "objects" },
      { id: "a11-cp3", type: "checkpoint", title: "Checkpoint 3", unitIds: ["countries", "animals", "objects"], passMark: 0.7, questions: 12 },
      { id: "a11-test", type: "test", title: "Level Test A1.1", passMark: 0.8, questions: 25 },
    ],
  },
  {
    id: "A1.2", title: "A1.2", subtitle: "Everyday life: time, verbs, home, city, shopping, health, weather & jobs",
    units: [U.time, U["sein-haben"], U.home, U.verbs, U.city, U.shopping, U.body, U.weather, U.jobs],
    steps: [
      { id: "a12-time", type: "lesson", unitId: "time" },
      { id: "a12-sein-haben", type: "lesson", unitId: "sein-haben" },
      { id: "a12-cp1", type: "checkpoint", title: "Checkpoint 1", unitIds: ["time", "sein-haben"], passMark: 0.7, questions: 10 },
      { id: "a12-home", type: "lesson", unitId: "home" },
      { id: "a12-verbs", type: "lesson", unitId: "verbs" },
      { id: "a12-city", type: "lesson", unitId: "city" },
      { id: "a12-cp2", type: "checkpoint", title: "Checkpoint 2", unitIds: ["home", "verbs", "city"], passMark: 0.7, questions: 12 },
      { id: "a12-shopping", type: "lesson", unitId: "shopping" },
      { id: "a12-body", type: "lesson", unitId: "body" },
      { id: "a12-cp3", type: "checkpoint", title: "Checkpoint 3", unitIds: ["shopping", "body"], passMark: 0.7, questions: 10 },
      { id: "a12-weather", type: "lesson", unitId: "weather" },
      { id: "a12-jobs", type: "lesson", unitId: "jobs" },
      { id: "a12-cp4", type: "checkpoint", title: "Checkpoint 4", unitIds: ["weather", "jobs"], passMark: 0.7, questions: 10 },
      { id: "a12-test", type: "test", title: "Level Test A1.2", passMark: 0.8, questions: 25 },
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

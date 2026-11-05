import type { Unit } from "./curriculum";
import { w } from "./helpers.ts";

export const A11_MORE: Record<string, Unit> = {
  questions: {
    id: "questions", emoji: "❓", title: "Question Words", de: "Fragewörter",
    tip: "Question words start the sentence and the verb comes second: *Wo wohnst du?* *Wie heißt du?* Use *wo* for location, *woher* for origin and *wohin* for direction: *Wo bist du? Woher kommst du? Wohin gehst du?* *Wie viele* is for countable things (siblings), *wie viel* for amounts (money).",
    words: [
      w("wer", "who"), w("was", "what"), w("wo", "where"), w("woher", "where from"), w("wohin", "where to"),
      w("wann", "when"), w("warum", "why"), w("wie", "how"), w("wie viel", "how much"), w("wie viele", "how many"),
      w("welche", "which"), w("wie lange", "how long"), w("wie oft", "how often"), w("um wie viel Uhr", "at what time"),
    ],
    phrases: [
      w("Wer ist das?", "Who is that?"), w("Wo wohnst du?", "Where do you live?"),
      w("Woher kommen Sie?", "Where do you come from? (formal)"), w("Wann beginnt der Kurs?", "When does the course start?"),
      w("Warum lernst du Deutsch?", "Why are you learning German?"), w("Wie viel kostet der Kaffee?", "How much does the coffee cost?"),
    ],
  },
  connectors: {
    id: "connectors", emoji: "🔗", title: "Little Words", de: "Kleine Wörter",
    tip: "*und* (and), *oder* (or), *aber* (but) and *denn* (because) join two sentences without changing the word order: *Ich lerne Deutsch, denn ich wohne in Berlin.* *nicht* negates a verb or adjective: *Ich bin nicht müde.* Frequency words: *immer* (always) > *oft* > *manchmal* > *nie* (never).",
    words: [
      w("und", "and"), w("oder", "or"), w("aber", "but"), w("denn", "because"), w("auch", "also / too"),
      w("nicht", "not"), w("sehr", "very"), w("viel", "a lot"), w("wenig", "a little / few"), w("gern", "gladly / like to"),
      w("immer", "always"), w("nie", "never"), w("oft", "often"), w("manchmal", "sometimes"), w("schon", "already"),
      w("noch", "still / yet"), w("nur", "only"), w("dann", "then"), w("vielleicht", "maybe"),
      w("natürlich", "of course"), w("leider", "unfortunately"), w("zusammen", "together"),
    ],
    phrases: [
      w("Ich trinke Tee und Kaffee.", "I drink tea and coffee."), w("Möchtest du Tee oder Kaffee?", "Would you like tea or coffee?"),
      w("Ich esse gern Pizza.", "I like eating pizza."), w("Wir gehen oft ins Kino.", "We often go to the cinema."),
      w("Das ist leider zu teuer.", "That is unfortunately too expensive."), w("Ich lerne Deutsch, denn ich wohne in Berlin.", "I am learning German because I live in Berlin."),
    ],
  },
  adjectives: {
    id: "adjectives", emoji: "🧐", title: "Describing Things", de: "Adjektive",
    tip: "After *sein* adjectives never change: *Das Haus ist groß.* Learn them in opposite pairs: groß ↔ klein, alt ↔ neu, schnell ↔ langsam, leicht ↔ schwer, laut ↔ leise. *Sehr* (very) goes in front: *sehr schön*.",
    words: [
      w("groß", "big / tall"), w("klein", "small"), w("alt", "old"), w("neu", "new"), w("jung", "young"),
      w("schlecht", "bad"), w("toll", "great"), w("schön", "beautiful / nice"), w("hässlich", "ugly"),
      w("lang", "long"), w("kurz", "short"), w("schnell", "fast"), w("langsam", "slow"), w("leicht", "easy / light"),
      w("schwer", "difficult / heavy"), w("einfach", "simple"), w("richtig", "correct"), w("falsch", "wrong"),
      w("laut", "loud"), w("leise", "quiet"), w("nett", "nice (person)"), w("freundlich", "friendly"),
      w("interessant", "interesting"), w("langweilig", "boring"), w("wichtig", "important"),
      w("müde", "tired"), w("hungrig", "hungry"), w("glücklich", "happy"), w("traurig", "sad"),
    ],
    phrases: [
      w("Das Haus ist sehr groß.", "The house is very big."), w("Mein Bruder ist jung.", "My brother is young."),
      w("Der Film ist interessant.", "The film is interesting."), w("Deutsch ist nicht schwer.", "German is not difficult."),
      w("Die Frau ist freundlich.", "The woman is friendly."), w("Ich bin müde und hungrig.", "I am tired and hungry."),
    ],
  },
  pronouns: {
    id: "pronouns", emoji: "👤", title: "Pronouns & Possessives", de: "Pronomen",
    tip: "*ich, du, er, sie, es, wir, ihr, sie, Sie.* Use *du* with one friend, *ihr* with several, and *Sie* (capital S) for one or more people you address formally. Possessives follow the noun's gender: *mein Vater* (der), *meine Mutter* (die), *mein Kind* (das). Same pattern: *dein / deine*, *sein / seine*, *unser / unsere*.",
    words: [
      w("ich", "I"), w("du", "you (informal)"), w("er", "he"), w("sie", "she / they"), w("es", "it"),
      w("wir", "we"), w("ihr", "you (plural)"), w("Sie", "you (formal)"), w("mein", "my"), w("dein", "your (informal)"),
      w("sein", "his / its"), w("unser", "our"), w("euer", "your (plural)"), w("man", "one / you (in general)"),
    ],
    phrases: [
      w("Wir sind Freunde.", "We are friends."), w("Das ist dein Buch.", "That is your book."),
      w("Ist das Ihr Auto?", "Is that your car? (formal)"), w("Wo ist unser Haus?", "Where is our house?"),
      w("Kommt ihr aus Italien?", "Are you (plural) from Italy?"), w("Mein Name ist Tom.", "My name is Tom."),
    ],
  },
  clothes: {
    id: "clothes", emoji: "👕", title: "Clothes", de: "Kleidung",
    tip: "Clothes are often plural in German: *die Schuhe, die Socken, die Jeans, die Hose* (trousers = singular). Say what you wear with *tragen*: *Ich trage eine Jacke.* Use *passen* for fit: *Die Hose passt.*",
    words: [
      w("die Kleidung", "clothes"), w("das T-Shirt", "T-shirt"), w("das Hemd", "shirt"), w("die Hose", "trousers"),
      w("die Jeans", "jeans"), w("der Pullover", "sweater"), w("die Jacke", "jacket"), w("der Mantel", "coat"),
      w("das Kleid", "dress"), w("der Rock", "skirt"), w("die Schuhe", "shoes"), w("die Socken", "socks"),
      w("die Mütze", "cap"), w("der Hut", "hat"), w("der Schal", "scarf"), w("tragen", "to wear / carry"),
      w("passen", "to fit / suit"), w("die Größe", "size"),
    ],
    phrases: [
      w("Ich trage eine blaue Jacke.", "I am wearing a blue jacket."), w("Die Hose passt gut.", "The trousers fit well."),
      w("Welche Größe haben Sie?", "What size do you have?"), w("Im Winter trage ich einen Mantel.", "In winter I wear a coat."),
      w("Das Kleid ist sehr schön.", "The dress is very beautiful."),
    ],
  },
  restaurant: {
    id: "restaurant", emoji: "🍽️", title: "At the Restaurant", de: "Im Restaurant",
    tip: "Order with *Ich hätte gern …* or *Ich möchte …* (+ accusative: *einen* Salat, *eine* Pizza, *ein* Eis). Call the waiter with *Entschuldigung!* and ask for the bill with *Zahlen, bitte!* or *Die Rechnung, bitte.*",
    words: [
      w("die Speisekarte", "menu"), w("bestellen", "to order"), w("das Getränk", "drink"), w("die Flasche", "bottle"),
      w("das Glas", "glass"), w("die Tasse", "cup"), w("der Teller", "plate"), w("der Löffel", "spoon"),
      w("das Messer", "knife"), w("die Gabel", "fork"), w("das Salz", "salt"), w("der Pfeffer", "pepper"),
      w("der Zucker", "sugar"), w("die Nudeln", "pasta"), w("die Pizza", "pizza"), w("das Hähnchen", "chicken"),
      w("der Salat", "salad"), w("das Eis", "ice cream"), w("die Schokolade", "chocolate"), w("die Wurst", "sausage"),
      w("der Nachtisch", "dessert"), w("lecker", "delicious"),
    ],
    phrases: [
      w("Ich hätte gern eine Pizza.", "I would like a pizza."), w("Die Speisekarte, bitte.", "The menu, please."),
      w("Der Salat ist sehr lecker.", "The salad is very tasty."), w("Ein Glas Wasser, bitte.", "A glass of water, please."),
      w("Haben Sie einen Tisch für zwei?", "Do you have a table for two?"), w("Zahlen, bitte!", "The bill, please!"),
    ],
  },
  classroom: {
    id: "classroom", emoji: "📝", title: "In the Classroom", de: "Im Unterricht",
    tip: "Survival phrases: *Wie bitte?* (pardon?), *Können Sie das bitte wiederholen?* (can you repeat that?), *Wie schreibt man das?* (how do you spell it?), *Ich verstehe nicht.* (I don't understand.) Use them every lesson, they keep conversations going.",
    words: [
      w("der Kurs", "course"), w("die Klasse", "class"), w("die Aufgabe", "exercise / task"), w("die Frage", "question"),
      w("die Antwort", "answer"), w("das Wort", "word"), w("der Satz", "sentence"), w("der Buchstabe", "letter (of the alphabet)"),
      w("die Seite", "page"), w("die Prüfung", "exam"), w("die Hausaufgabe", "homework"), w("die Tafel", "board"),
      w("das Wörterbuch", "dictionary"), w("buchstabieren", "to spell"), w("wiederholen", "to repeat"),
      w("verstehen", "to understand"), w("schreiben", "to write"), w("antworten", "to answer"),
    ],
    phrases: [
      w("Wie schreibt man das?", "How do you write that?"), w("Können Sie das bitte wiederholen?", "Can you repeat that, please?"),
      w("Ich habe eine Frage.", "I have a question."), w("Was bedeutet das Wort?", "What does the word mean?"),
      w("Schreiben Sie bitte Ihren Namen.", "Please write your name."), w("Seite zehn, Aufgabe drei.", "Page ten, exercise three."),
    ],
  },
  personal: {
    id: "personal", emoji: "📋", title: "Personal Details", de: "Persönliche Daten",
    tip: "Forms ask: *Name, Vorname, Nachname, Adresse, Telefonnummer, E-Mail, Geburtsdatum, Staatsangehörigkeit, Familienstand* (marital status). Spell your name with the German alphabet: A (ah), B (beh), C (zeh), … Ä, Ö, Ü and ß have their own names too.",
    words: [
      w("der Name", "name"), w("der Vorname", "first name"), w("der Nachname", "last name"), w("die Adresse", "address"),
      w("die Telefonnummer", "phone number"), w("die E-Mail", "email"), w("das Geburtsdatum", "date of birth"),
      w("das Alter", "age"), w("die Staatsangehörigkeit", "nationality"), w("der Wohnort", "place of residence"),
      w("verheiratet", "married"), w("ledig", "single (not married)"), w("geschieden", "divorced"),
      w("die Unterschrift", "signature"), w("das Formular", "form"), w("die Hausnummer", "house number"),
      w("die Postleitzahl", "postcode"), w("geboren", "born"),
    ],
    phrases: [
      w("Wie ist Ihr Name?", "What is your name? (formal)"), w("Wie ist deine Telefonnummer?", "What is your phone number?"),
      w("Ich bin ledig.", "I am single."), w("Wo sind Sie geboren?", "Where were you born?"),
      w("Wie lautet Ihre Adresse?", "What is your address?"), w("Bitte unterschreiben Sie hier.", "Please sign here."),
    ],
  },
  plurals: {
    id: "plurals", emoji: "🔁", title: "Plural Nouns", de: "Plural",
    tip: "The plural article is always *die*. Common endings: *-e* (Tisch → Tische), *-n/-en* (Katze → Katzen, Frau → Frauen), *-er* (+ umlaut: Kind → Kinder, Buch → Bücher), *-s* (Auto → Autos), sometimes just an umlaut (Bruder → Brüder). Learn the plural with every new noun.",
    words: [
      w("die Männer", "men"), w("die Frauen", "women"), w("die Brüder", "brothers"), w("die Schwestern", "sisters"),
      w("die Kinder", "children"), w("die Tische", "tables"), w("die Stühle", "chairs"), w("die Häuser", "houses"),
      w("die Autos", "cars"), w("die Hunde", "dogs"), w("die Katzen", "cats"), w("die Bücher", "books"),
      w("die Hände", "hands"), w("die Füße", "feet"), w("die Städte", "cities"), w("die Tage", "days"),
      w("die Monate", "months"), w("die Jahre", "years"), w("die Äpfel", "apples"), w("die Zimmer", "rooms"),
    ],
    phrases: [
      w("Ich habe zwei Katzen.", "I have two cats."), w("Die Kinder spielen im Garten.", "The children play in the garden."),
      w("Wir haben drei Zimmer.", "We have three rooms."), w("Das sind meine Bücher.", "Those are my books."),
      w("Sie kauft fünf Äpfel.", "She buys five apples."),
    ],
  },
};

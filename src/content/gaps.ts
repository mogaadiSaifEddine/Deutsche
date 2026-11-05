import type { Gap } from "./curriculum";
import { g } from "./helpers.ts";

/**
 * Grammar fill-in-the-gap exercises per unit id.
 * Each item must have exactly one correct option (the English hint disambiguates meaning).
 */
export const GAPS: Record<string, Gap[]> = {
  // ---- A1.1 ----
  food: [
    g("Ich möchte ___ Kaffee.", "einen", ["einen", "eine", "ein", "einem"], "I would like a coffee."),
    g("Ich möchte ___ Suppe.", "eine", ["einen", "eine", "ein", "einer"], "I would like a soup."),
    g("Ich möchte ___ Brot.", "ein", ["einen", "eine", "ein", "einem"], "I would like some bread."),
    g("Ich esse ___ Apfel.", "einen", ["einen", "eine", "ein", "einem"], "I am eating an apple."),
    g("Sie kauft ___ Banane.", "eine", ["einen", "eine", "ein", "einem"], "She buys a banana."),
  ],
  animals: [
    g("Ich habe ___ Hund.", "einen", ["einen", "eine", "ein", "einem"], "I have a dog."),
    g("Sie hat ___ Katze.", "eine", ["einen", "eine", "ein", "einem"], "She has a cat."),
    g("Er hat ___ Pferd.", "ein", ["einen", "eine", "ein", "einem"], "He has a horse."),
    g("Das ist ___ Maus.", "eine", ["einen", "eine", "ein", "einem"], "That is a mouse."),
    g("Wir haben ___ Haustier.", "ein", ["einen", "eine", "ein", "einem"], "We have a pet."),
  ],
  objects: [
    g("Das ist ___ Buch.", "ein", ["einen", "eine", "ein", "einem"], "That is a book."),
    g("Ich habe ___ Handy.", "kein", ["kein", "keine", "keinen", "nicht"], "I do not have a phone."),
    g("Ich habe ___ Schlüssel.", "keinen", ["kein", "keine", "keinen", "nicht"], "I do not have a key."),
    g("Ich habe ___ Zeit.", "keine", ["kein", "keine", "keinen", "nicht"], "I have no time."),
    g("Das ist ___ Computer, das ist ein Fernseher.", "kein", ["kein", "keine", "keinen", "nicht"], "That is not a computer, that is a television."),
  ],
  questions: [
    g("___ wohnst du?", "Wo", ["Wo", "Wer", "Wann", "Warum"], "Where do you live?"),
    g("___ heißt du?", "Wie", ["Wie", "Wo", "Wer", "Wann"], "What is your name?"),
    g("___ kommst du? – Aus Italien.", "Woher", ["Woher", "Wohin", "Wo", "Wann"], "Where do you come from? – From Italy."),
    g("___ gehst du? – Nach Hause.", "Wohin", ["Wohin", "Woher", "Wer", "Wie"], "Where are you going? – Home."),
    g("___ ist das? – Das ist mein Bruder.", "Wer", ["Wer", "Was", "Wo", "Wann"], "Who is that? – That is my brother."),
    g("___ Geschwister hast du?", "Wie viele", ["Wie viele", "Wie viel", "Wann", "Wo"], "How many siblings do you have?"),
  ],
  connectors: [
    g("Ich trinke Tee ___ Kaffee.", "und", ["und", "oder", "aber", "denn"], "I drink tea and coffee."),
    g("Möchtest du Tee ___ Kaffee?", "oder", ["und", "oder", "aber", "denn"], "Would you like tea or coffee?"),
    g("Das Auto ist schön, ___ es ist teuer.", "aber", ["und", "oder", "aber", "denn"], "The car is beautiful, but it is expensive."),
    g("Ich bleibe zu Hause, ___ ich bin krank.", "denn", ["und", "oder", "aber", "denn"], "I am staying home because I am sick."),
  ],
  pronouns: [
    g("___ bin Student.", "Ich", ["Ich", "Du", "Er", "Wir"], "I am a student."),
    g("___ seid Freunde.", "Ihr", ["Ihr", "Wir", "Du", "Ich"], "You (plural) are friends."),
    g("Das ist ___ Vater.", "mein", ["mein", "meine", "meiner", "meinen"], "That is my father."),
    g("Das ist ___ Schwester.", "meine", ["mein", "meine", "meiner", "meinen"], "That is my sister."),
    g("Ist das ___ Buch? (informal)", "dein", ["dein", "deine", "deiner", "Ihr"], "Is that your book?"),
    g("Wo ist ___ Haus? (our)", "unser", ["unser", "unsere", "euer", "mein"], "Where is our house?"),
  ],
  plurals: [
    g("Ich habe zwei ___. (Bruder)", "Brüder", ["Brüder", "Bruders", "Brüdern", "Bruder"], "I have two brothers."),
    g("Das sind drei ___. (Hund)", "Hunde", ["Hunde", "Hunden", "Hünde", "Hund"], "Those are three dogs."),
    g("Wir haben zwei ___. (Kind)", "Kinder", ["Kinder", "Kinde", "Kindern", "Kind"], "We have two children."),
    g("Ich habe viele ___. (Buch)", "Bücher", ["Bücher", "Buchs", "Büchen", "Buch"], "I have many books."),
    g("Sie hat zwei ___. (Katze)", "Katzen", ["Katzen", "Katze", "Kätzen", "Katzes"], "She has two cats."),
    g("Er isst drei ___. (Apfel)", "Äpfel", ["Äpfel", "Apfeln", "Apfel", "Äpfeln"], "He eats three apples."),
    g("Die ___ sind neu. (Auto)", "Autos", ["Autos", "Auten", "Autoe", "Auto"], "The cars are new."),
  ],
  // ---- A1.2 ----
  time: [
    g("___ Montag habe ich frei.", "Am", ["Am", "Im", "Um", "In"], "On Monday I am off."),
    g("Der Kurs beginnt ___ neun Uhr.", "um", ["um", "am", "im", "in"], "The course begins at nine o'clock."),
    g("___ Sommer ist es heiß.", "Im", ["Im", "Am", "Um", "Auf"], "In summer it is hot."),
    g("Wir sehen uns ___ Wochenende.", "am", ["am", "im", "um", "an"], "We will see each other at the weekend."),
  ],
  "sein-haben": [
    g("Ich ___ zwanzig Jahre alt.", "bin", ["bin", "bist", "ist", "habe"], "I am twenty years old."),
    g("Du ___ nett.", "bist", ["bist", "bin", "ist", "seid"], "You are nice."),
    g("Er ___ einen Hund.", "hat", ["hat", "hast", "haben", "ist"], "He has a dog."),
    g("Wir ___ Zeit.", "haben", ["haben", "habt", "hat", "sind"], "We have time."),
    g("Ihr ___ Hunger.", "habt", ["habt", "haben", "hat", "seid"], "You (plural) are hungry."),
    g("Sie ___ Lehrerin.", "ist", ["ist", "sind", "bin", "bist"], "She is a teacher."),
  ],
  home: [
    g("Das Sofa ist ___ Wohnzimmer.", "im", ["im", "in der", "am", "zum"], "The sofa is in the living room."),
    g("Wir sind ___ Küche.", "in der", ["in der", "im", "in den", "in die"], "We are in the kitchen."),
    g("Das Bett ist ___ Schlafzimmer.", "im", ["im", "in der", "am", "zum"], "The bed is in the bedroom."),
    g("Die Lampe steht ___ Tisch.", "auf dem", ["auf dem", "auf der", "auf den", "in dem"], "The lamp is standing on the table."),
  ],
  verbs: [
    g("Ich ___ Deutsch. (lernen)", "lerne", ["lerne", "lernst", "lernt", "lernen"], "I am learning German."),
    g("Du ___ in Berlin. (wohnen)", "wohnst", ["wohne", "wohnst", "wohnt", "wohnen"], "You live in Berlin."),
    g("Er ___ Kaffee. (trinken)", "trinkt", ["trinke", "trinkst", "trinkt", "trinken"], "He drinks coffee."),
    g("Wir ___ nach Hause. (gehen)", "gehen", ["gehe", "gehst", "geht", "gehen"], "We are going home."),
    g("Ihr ___ viel. (arbeiten)", "arbeitet", ["arbeite", "arbeitest", "arbeitet", "arbeiten"], "You (plural) work a lot."),
  ],
  modal: [
    g("Ich ___ Deutsch sprechen.", "kann", ["kann", "kannst", "können", "könnt"], "I can speak German."),
    g("Du ___ heute arbeiten.", "musst", ["muss", "musst", "müssen", "müsst"], "You have to work today."),
    g("Er ___ Auto fahren.", "kann", ["kann", "kannst", "können", "könnt"], "He can drive a car."),
    g("Ich möchte ein Eis ___.", "essen", ["essen", "esse", "isst", "gegessen"], "I would like to eat an ice cream."),
    g("Ich muss früh ___.", "aufstehen", ["aufstehen", "aufstehe", "steht auf", "aufgestanden"], "I have to get up early."),
    g("Wir ___ nach Hause gehen.", "müssen", ["müssen", "muss", "musst", "müsst"], "We have to go home."),
  ],
  separable: [
    g("Der Zug fährt um zehn Uhr ___.", "ab", ["ab", "auf", "an", "ein"], "The train leaves at ten o'clock."),
    g("Ich rufe dich morgen ___.", "an", ["an", "auf", "ab", "aus"], "I will call you tomorrow."),
    g("Wir kaufen am Samstag ___.", "ein", ["ein", "auf", "ab", "an"], "We go shopping on Saturday."),
    g("Der Film fängt um acht Uhr ___.", "an", ["an", "auf", "ab", "aus"], "The film starts at eight o'clock."),
    g("Wann kommt der Bus ___?", "an", ["an", "auf", "ab", "aus"], "When does the bus arrive?"),
  ],
  irregular: [
    g("Er ___ Deutsch.", "spricht", ["spricht", "sprecht", "sprichst", "sprechen"], "He speaks German."),
    g("Du ___ gern Pizza.", "isst", ["isst", "esse", "esst", "essen"], "You like eating pizza."),
    g("Sie ___ ein Buch.", "liest", ["liest", "lest", "lese", "lesen"], "She is reading a book."),
    g("Er ___ nach Hamburg.", "fährt", ["fährt", "fahrt", "fahre", "fahren"], "He is traveling to Hamburg."),
    g("Du ___ viel.", "schläfst", ["schläfst", "schlafst", "schläft", "schlafen"], "You sleep a lot."),
    g("Ich ___ es nicht.", "weiß", ["weiß", "weißt", "wissen", "wisst"], "I do not know it."),
  ],
  places: [
    g("Das Buch liegt ___ dem Tisch.", "auf", ["auf", "in", "unter", "für"], "The book is lying on the table."),
    g("Die Katze schläft ___ dem Bett.", "unter", ["unter", "auf", "mit", "für"], "The cat sleeps under the bed."),
    g("Ich komme ___ Italien.", "aus", ["aus", "von", "nach", "zu"], "I come from Italy."),
    g("Ich gehe ___ Bahnhof.", "zum", ["zum", "zur", "im", "beim"], "I am going to the station."),
    g("Ich fahre ___ dem Auto.", "mit", ["mit", "nach", "zu", "für"], "I am traveling by car."),
    g("Wir fahren ___ Berlin.", "nach", ["nach", "zu", "mit", "bei"], "We are traveling to Berlin."),
    g("Das Geschenk ist ___ dich.", "für", ["für", "von", "bei", "aus"], "The gift is for you."),
  ],
  perfekt: [
    g("Ich ___ Deutsch gelernt.", "habe", ["habe", "bin", "hast", "ist"], "I have learned German."),
    g("Wir ___ nach Hause gegangen.", "sind", ["sind", "haben", "seid", "hat"], "We went home."),
    g("Er ___ einen Kuchen gekauft.", "hat", ["hat", "ist", "haben", "hast"], "He bought a cake."),
    g("Anna ___ nach Berlin gefahren.", "ist", ["ist", "hat", "sind", "habe"], "Anna traveled to Berlin."),
    g("Ich habe gestern ein Buch ___.", "gelesen", ["gelesen", "lesen", "liest", "gelest"], "Yesterday I read a book."),
    g("Wir haben Fußball ___.", "gespielt", ["gespielt", "spielen", "spielt", "gespielen"], "We played football."),
  ],
};

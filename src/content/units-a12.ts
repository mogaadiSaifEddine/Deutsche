import type { Unit } from "./curriculum";
import { w } from "./helpers.ts";

export const A12_MORE: Record<string, Unit> = {
  modal: {
    id: "modal", emoji: "💪", title: "Modal Verbs", de: "Modalverben",
    tip: "*können* (can), *müssen* (must), *wollen* (want), *dürfen* (may), *möchten* (would like). The modal verb is conjugated in 2nd position and the main verb goes to the end as an infinitive: *Ich kann gut schwimmen.* *ich/er kann*, *du kannst*, *wir können*; *ich muss*, *du musst*; *ich will*; *ich darf*.",
    words: [
      w("können", "can / to be able to"), w("müssen", "must / have to"), w("wollen", "to want to"), w("dürfen", "may / to be allowed to"),
      w("sollen", "should"), w("ich kann", "I can"), w("du kannst", "you can"), w("er kann", "he can"),
      w("wir können", "we can"), w("ich muss", "I must"), w("du musst", "you must"), w("ich will", "I want to"),
      w("ich darf", "I may"), w("ich möchte", "I would like"),
    ],
    phrases: [
      w("Ich kann gut schwimmen.", "I can swim well."), w("Kannst du mir helfen?", "Can you help me?"),
      w("Ich muss heute arbeiten.", "I have to work today."), w("Du darfst hier nicht rauchen.", "You may not smoke here."),
      w("Wir wollen nach Berlin fahren.", "We want to travel to Berlin."), w("Ich möchte ein Eis essen.", "I would like to eat an ice cream."),
    ],
  },
  separable: {
    id: "separable", emoji: "✂️", title: "Separable Verbs", de: "Trennbare Verben",
    tip: "Many verbs have a prefix that jumps to the end of the sentence: *aufstehen* → *Ich stehe um sieben Uhr auf.* *anrufen* → *Ich rufe dich an.* *einkaufen* → *Wir kaufen ein.* With a modal verb they stay together: *Ich muss früh aufstehen.*",
    words: [
      w("aufstehen", "to get up"), w("anfangen", "to begin"), w("einkaufen", "to shop"), w("anrufen", "to call (phone)"),
      w("mitkommen", "to come along"), w("fernsehen", "to watch TV"), w("aufmachen", "to open"), w("zumachen", "to close"),
      w("einsteigen", "to get in / board"), w("aussteigen", "to get out / alight"), w("ankommen", "to arrive"),
      w("abfahren", "to depart"), w("ausgehen", "to go out"), w("einladen", "to invite"),
      w("aufräumen", "to tidy up"), w("zurückkommen", "to come back"),
    ],
    phrases: [
      w("Der Zug fährt um zehn Uhr ab.", "The train leaves at ten o'clock."), w("Wann kommst du an?", "When do you arrive?"),
      w("Ich rufe dich morgen an.", "I will call you tomorrow."), w("Wir kaufen am Samstag ein.", "We go shopping on Saturday."),
      w("Der Film fängt um acht Uhr an.", "The film starts at eight o'clock."), w("Sie macht das Fenster auf.", "She opens the window."),
    ],
  },
  irregular: {
    id: "irregular", emoji: "🔀", title: "Irregular Verbs", de: "Unregelmäßige Verben",
    tip: "Some common verbs change their stem vowel in the *du* and *er/sie/es* forms only: e → i (*essen → du isst, er isst*; *sprechen → du sprichst*; *nehmen → du nimmst*; *geben → du gibst*), e → ie (*lesen → du liest*; *sehen → du siehst*), a → ä (*fahren → du fährst*; *schlafen → du schläfst*). *ich* and *wir* stay regular.",
    words: [
      w("du isst", "you eat"), w("er isst", "he eats"), w("du sprichst", "you speak"), w("er spricht", "he speaks"),
      w("du liest", "you read"), w("er liest", "he reads"), w("du siehst", "you see"), w("er sieht", "he sees"),
      w("du fährst", "you drive"), w("er fährt", "he drives"), w("du schläfst", "you sleep"), w("er schläft", "he sleeps"),
      w("du nimmst", "you take"), w("er nimmt", "he takes"), w("du gibst", "you give"), w("er gibt", "he gives"),
      w("nehmen", "to take"), w("geben", "to give"), w("helfen", "to help"), w("wissen", "to know (a fact)"),
      w("kennen", "to know (a person)"),
    ],
    phrases: [
      w("Er spricht sehr gut Deutsch.", "He speaks German very well."), w("Sie liest ein Buch.", "She is reading a book."),
      w("Du fährst nach Berlin.", "You are going to Berlin."), w("Ich weiß es nicht.", "I do not know."),
      w("Kennst du Anna?", "Do you know Anna?"), w("Er nimmt den Bus.", "He takes the bus."),
    ],
  },
  routine: {
    id: "routine", emoji: "🕖", title: "Daily Routine", de: "Tagesablauf",
    tip: "Say when you do something with *um* + time (*um sieben Uhr*), *am* + day part (*am Morgen, am Abend*), or the short forms *morgens, mittags, abends, nachts* (in the morning, at noon, in the evening, at night). The time comes before the verb or after it, but the verb always stays second.",
    words: [
      w("duschen", "to shower"), w("frühstücken", "to have breakfast"), w("ausschlafen", "to sleep in"), w("joggen", "to jog"),
      w("putzen", "to clean"), w("waschen", "to wash"), w("die Arbeit", "work"), w("die Pause", "break"),
      w("der Feierabend", "end of the working day"), w("das Wochenende", "weekend"), w("die Freizeit", "free time"),
      w("der Termin", "appointment"), w("pünktlich", "on time"), w("morgens", "in the morning"), w("mittags", "at noon"),
      w("abends", "in the evening"), w("nachts", "at night"), w("täglich", "daily"),
    ],
    phrases: [
      w("Ich dusche jeden Morgen.", "I shower every morning."), w("Ich frühstücke um sieben Uhr.", "I have breakfast at seven o'clock."),
      w("Am Wochenende schlafe ich aus.", "At the weekend I sleep in."), w("Nach der Arbeit gehe ich einkaufen.", "After work I go shopping."),
      w("Abends sehe ich fern.", "In the evening I watch TV."), w("Ich habe um drei Uhr einen Termin.", "I have an appointment at three o'clock."),
    ],
  },
  hobbies: {
    id: "hobbies", emoji: "⚽", title: "Hobbies", de: "Hobbys",
    tip: "Talk about hobbies with *gern* (like doing): *Ich spiele gern Fußball.* *Ich höre gern Musik.* Ask *Was ist dein Hobby?* or *Was machst du in deiner Freizeit?* Musical instruments and games use *spielen*: *Gitarre spielen*, *Fußball spielen*.",
    words: [
      w("das Hobby", "hobby"), w("die Musik", "music"), w("der Sport", "sport"), w("der Fußball", "football (soccer)"),
      w("das Konzert", "concert"), w("der Film", "film"), w("das Spiel", "game"), w("die Zeitung", "newspaper"),
      w("schwimmen", "to swim"), w("tanzen", "to dance"), w("singen", "to sing"), w("laufen", "to run / walk"),
      w("wandern", "to hike"), w("reisen", "to travel"), w("fotografieren", "to take photos"), w("malen", "to paint"),
      w("Gitarre spielen", "to play guitar"), w("Rad fahren", "to cycle"),
    ],
    phrases: [
      w("Was ist dein Hobby?", "What is your hobby?"), w("Ich spiele gern Fußball.", "I like playing football."),
      w("Er hört gern Musik.", "He likes listening to music."), w("Am Sonntag gehen wir wandern.", "On Sunday we go hiking."),
      w("Meine Schwester tanzt sehr gut.", "My sister dances very well."), w("Wir gehen ins Konzert.", "We are going to the concert."),
    ],
  },
  celebrations: {
    id: "celebrations", emoji: "🎂", title: "Celebrations", de: "Feste und Feiern",
    tip: "Useful wishes: *Herzlichen Glückwunsch zum Geburtstag!* (congratulations on your birthday), *Alles Gute!* (all the best), *Frohe Weihnachten!* (Merry Christmas), *Prost!* (cheers). You say *Danke für die Einladung* (thanks for the invitation).",
    words: [
      w("der Geburtstag", "birthday"), w("das Geschenk", "gift"), w("die Einladung", "invitation"), w("das Fest", "celebration / festival"),
      w("Weihnachten", "Christmas"), w("Ostern", "Easter"), w("Silvester", "New Year's Eve"), w("die Hochzeit", "wedding"),
      w("die Party", "party"), w("der Gast", "guest"), w("feiern", "to celebrate"), w("gratulieren", "to congratulate"),
      w("schenken", "to give (as a gift)"), w("Prost!", "Cheers!"), w("Alles Gute!", "All the best!"),
    ],
    phrases: [
      w("Ich habe morgen Geburtstag.", "Tomorrow is my birthday."), w("Wir feiern die Hochzeit.", "We are celebrating the wedding."),
      w("Danke für die Einladung!", "Thanks for the invitation!"), w("Zu Weihnachten schenke ich Bücher.", "At Christmas I give books."),
      w("Die Gäste kommen um sieben Uhr.", "The guests arrive at seven o'clock."), w("Herzlichen Glückwunsch zum Geburtstag!", "Happy birthday!"),
    ],
  },
  transport: {
    id: "transport", emoji: "✈️", title: "Travel & Transport", de: "Verkehr und Reisen",
    tip: "Say how you travel with *mit* + dative: *mit dem Bus, mit dem Zug, mit der U-Bahn, mit dem Flugzeug.* Ask *Wann fährt der nächste Zug?* and *Von welchem Gleis?* at the station. *Ankunft* = arrival, *Abfahrt* = departure.",
    words: [
      w("das Flugzeug", "airplane"), w("das Schiff", "ship"), w("die U-Bahn", "subway"), w("die Straßenbahn", "tram"),
      w("das Taxi", "taxi"), w("der Flughafen", "airport"), w("das Gleis", "platform / track"), w("die Fahrkarte", "ticket"),
      w("die Abfahrt", "departure"), w("die Ankunft", "arrival"), w("die Reise", "trip"), w("der Urlaub", "vacation"),
      w("das Gepäck", "luggage"), w("der Koffer", "suitcase"), w("der Reisepass", "passport"), w("der Ausweis", "ID card"),
      w("die Verspätung", "delay"), w("umsteigen", "to change (trains)"),
    ],
    phrases: [
      w("Wann fährt der nächste Zug?", "When does the next train leave?"), w("Der Zug hat Verspätung.", "The train is delayed."),
      w("Ich möchte eine Fahrkarte nach Berlin.", "I would like a ticket to Berlin."), w("Von welchem Gleis fährt der Zug?", "From which platform does the train leave?"),
      w("Wir machen Urlaub in Spanien.", "We are taking a vacation in Spain."), w("Ich fliege morgen nach Wien.", "I am flying to Vienna tomorrow."),
    ],
  },
  places: {
    id: "places", emoji: "📍", title: "Where & Which Way?", de: "Wo und wohin?",
    tip: "Location prepositions (*in, auf, unter, neben, vor, hinter, zwischen, an*) take the dative when you ask *Wo?*: *Das Buch liegt auf dem Tisch.* Contractions: in + dem = *im*, an + dem = *am*, zu + dem = *zum*, zu + der = *zur*, bei + dem = *beim*, von + dem = *vom*. With *mit, nach, zu, von, aus, bei* always use the dative.",
    words: [
      w("in", "in"), w("auf", "on"), w("unter", "under"), w("neben", "next to"), w("vor", "in front of"),
      w("hinter", "behind"), w("zwischen", "between"), w("an", "at / on (vertical)"), w("über", "above / over"),
      w("bei", "at (someone's) / near"), w("mit", "with"), w("nach", "to / after"), w("zu", "to"), w("von", "from / of"),
      w("aus", "out of / from"), w("für", "for"), w("ohne", "without"), w("hier", "here"), w("dort", "there"),
      w("in der Nähe", "nearby"), w("weit", "far"), w("nah", "near"), w("die Ecke", "corner"),
      w("die Kreuzung", "intersection"), w("die Brücke", "bridge"), w("die Ampel", "traffic light"),
    ],
    phrases: [
      w("Das Buch liegt auf dem Tisch.", "The book is on the table."), w("Die Katze ist unter dem Bett.", "The cat is under the bed."),
      w("Ich gehe zum Bahnhof.", "I am going to the station."), w("Die Schule ist hinter dem Park.", "The school is behind the park."),
      w("Gibt es hier eine Bank in der Nähe?", "Is there a bank nearby?"), w("Gehen Sie an der Ampel links.", "Turn left at the traffic light."),
    ],
  },
  perfekt: {
    id: "perfekt", emoji: "⏪", title: "The Past (Perfekt)", de: "Das Perfekt",
    tip: "The spoken past tense = *haben* or *sein* in 2nd position + past participle at the end: *Ich habe Deutsch gelernt.* Regular participles: *ge- + stem + -t* (spielen → gespielt). Irregular: *ge- + stem + -en* (essen → gegessen). Verbs of movement and *sein/bleiben* use *sein*: *Ich bin nach Hause gegangen. Ich bin müde gewesen.*",
    words: [
      w("gemacht", "done / made"), w("gelernt", "learned"), w("gespielt", "played"), w("gekauft", "bought"),
      w("gearbeitet", "worked"), w("gewohnt", "lived"), w("gegessen", "eaten"), w("getrunken", "drunk"),
      w("gesehen", "seen"), w("gelesen", "read"), w("gegangen", "gone"), w("gefahren", "traveled / driven"),
      w("geschlafen", "slept"), w("gesprochen", "spoken"), w("gewesen", "been"), w("gehabt", "had"),
    ],
    phrases: [
      w("Ich habe Deutsch gelernt.", "I have learned German."), w("Gestern habe ich Fußball gespielt.", "Yesterday I played football."),
      w("Er hat Brot gekauft.", "He bought bread."), w("Wir sind nach Hause gegangen.", "We went home."),
      w("Hast du schon gegessen?", "Have you eaten yet?"), w("Ich habe gestern lange geschlafen.", "I slept for a long time yesterday."),
    ],
  },
};

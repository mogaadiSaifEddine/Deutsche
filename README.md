# Deutsch A1

A Next.js app for learning German from zero, with accounts and per-user progress.

## Features
- **Authentication**: email + password sign-up/login (bcrypt-hashed passwords, signed httpOnly session cookie).
- **Levels**: A1.1 and A1.2, each with 5 lessons (vocabulary, grammar tip, pronunciation, mixed exercises).
- **Checkpoint quizzes** after every few lessons (pass mark 70%).
- **Level test** at the end of A1.1 and A1.2 (20 questions, pass mark 80%). Passing A1.1 unlocks A1.2.
- **Per-user level & XP**: your finished levels are shown on your path and stored in the database.
- Exercise types: translate both ways, listen & choose (browser speech synthesis), article (der/die/das), typing, sentence building.
- Checkpoints and tests are **graded on the server** from a signed ticket, so answers are never sent to the browser.

## Run
```bash
npm install
cp .env.example .env.local   # set AUTH_SECRET
npm run dev                  # http://localhost:3000
npm test                     # question-engine unit tests
```
Requires Node 22.13+ (uses the built-in `node:sqlite`). Data is stored in `data/app.db`.

## Add content
Edit `src/content/curriculum.ts`: add a unit (words + phrases) and reference it in a level's `steps`. Steps unlock in order.

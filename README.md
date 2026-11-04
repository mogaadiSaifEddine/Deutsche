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
Locally, data is stored in `data/app.db` (libSQL/SQLite file).

## Deploy to Vercel
1. Push this repo to GitHub and import it at vercel.com/new (framework: Next.js, no build settings needed).
2. Add a database: Vercel dashboard → Storage / Marketplace → **Turso**, connect it to the project. This sets `DATABASE_URL` and `DATABASE_AUTH_TOKEN` (add them by hand if you create the DB elsewhere). Tables are created automatically on first request.
3. Add the env var `AUTH_SECRET` (`openssl rand -base64 32`).
4. Deploy.

The app refuses to start on Vercel without `DATABASE_URL`, because Vercel's filesystem is ephemeral.

## Add content
Edit `src/content/curriculum.ts`: add a unit (words + phrases) and reference it in a level's `steps`. Steps unlock in order.

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
cp .env.example .env.local   # set AUTH_SECRET and DATABASE_URL
npm run dev                  # http://localhost:3000
npm test                     # question-engine unit tests
```
Needs a MySQL 8 / MariaDB 10.5+ database. Create one and point `DATABASE_URL` at it:
```sql
CREATE DATABASE deutsch CHARACTER SET utf8mb4;
CREATE USER 'deutsch'@'%' IDENTIFIED BY 'deutsch';
GRANT ALL ON deutsch.* TO 'deutsch'@'%';
```
Tables (`users`, `progress`) are created automatically on first use.

## Deploy to Vercel
Vercel has no database of its own for MySQL, so use a hosted MySQL (PlanetScale, TiDB Cloud, Aiven, AWS RDS, …).
1. Create the database and copy its connection string (`mysql://user:pass@host:3306/dbname`).
2. Import the repo at vercel.com/new (framework: Next.js).
3. Add env vars: `DATABASE_URL` (the string above) and `AUTH_SECRET` (`openssl rand -base64 32`).
4. Deploy. Remote hosts use TLS: `?ssl-mode=REQUIRED` (Aiven's default) encrypts without checking the CA; for `VERIFY_CA` also set `DATABASE_CA` to the provider's CA certificate. The host must accept connections from Vercel's dynamic IPs.

## Add content
Edit `src/content/curriculum.ts`: add a unit (words + phrases) and reference it in a level's `steps`. Steps unlock in order.

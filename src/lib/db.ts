import "server-only";
import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

// DATABASE_URL e.g. mysql://user:password@host:3306/dbname?ssl-mode=REQUIRED
// TLS: remote hosts use TLS by default. ?ssl-mode= (or DATABASE_SSL=false to disable) is honoured:
//   DISABLED          no TLS
//   REQUIRED          encrypted, server certificate not verified (what Aiven's default URL asks for)
//   VERIFY_CA / VERIFY_IDENTITY  verify the certificate; provide the host's CA in DATABASE_CA if it isn't a public one
const url = process.env.DATABASE_URL ?? "mysql://deutsch:deutsch@127.0.0.1:3306/deutsch";

const globalForDb = globalThis as unknown as { __pool?: Pool; __dbReady?: Promise<void> };

function sslOptions(u: URL): mysql.SslOptions | undefined {
  const local = ["localhost", "127.0.0.1", "::1"].includes(u.hostname);
  const mode = (u.searchParams.get("ssl-mode") ?? u.searchParams.get("sslmode") ?? (process.env.DATABASE_SSL === "false" ? "DISABLED" : local ? "DISABLED" : "VERIFY_CA")).toUpperCase();
  if (mode === "DISABLED") return undefined;
  const ca = process.env.DATABASE_CA?.replace(/\\n/g, "\n");
  if (mode === "REQUIRED" || mode === "PREFERRED") return { rejectUnauthorized: false, ...(ca ? { ca } : {}) };
  return { rejectUnauthorized: true, ...(ca ? { ca } : {}) };
}

function createPool(): Pool {
  const u = new URL(url);
  return mysql.createPool({
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
    ssl: sslOptions(u),
    charset: "utf8mb4",
    connectionLimit: 5, // small: serverless functions each hold their own pool
    waitForConnections: true,
  });
}

const pool = (globalForDb.__pool ??= createPool());

async function init() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    xp INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4`);
  await pool.query(`CREATE TABLE IF NOT EXISTS progress (
    user_id INT UNSIGNED NOT NULL,
    step_id VARCHAR(64) NOT NULL,
    best_score DOUBLE NOT NULL DEFAULT 0,
    attempts INT NOT NULL DEFAULT 0,
    passed TINYINT(1) NOT NULL DEFAULT 0,
    completed_at TIMESTAMP NULL,
    PRIMARY KEY (user_id, step_id),
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) CHARACTER SET utf8mb4`);
}

async function ready() {
  const p = (globalForDb.__dbReady ??= init().catch((e) => { globalForDb.__dbReady = undefined; throw e; }));
  await p;
}

type Param = string | number | boolean | null;

export async function all<T>(sql: string, args: Param[] = []): Promise<T[]> {
  await ready();
  const [rows] = await pool.execute<RowDataPacket[]>(sql, args);
  return rows as unknown as T[];
}

export async function get<T>(sql: string, args: Param[] = []): Promise<T | undefined> {
  return (await all<T>(sql, args))[0];
}

export async function run(sql: string, args: Param[] = []) {
  await ready();
  const [r] = await pool.execute<ResultSetHeader>(sql, args);
  return { lastInsertRowid: r.insertId, rowsAffected: r.affectedRows };
}

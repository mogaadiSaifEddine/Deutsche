import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import { logout } from "./auth-actions";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deutsch A1 – Learn German",
  description: "Learn German from zero: lessons, checkpoints and level tests for A1.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link href={user ? "/learn" : "/"} className="brand"><span className="flag" aria-hidden /> Deutsch A1</Link>
          <nav>
            {user ? (
              <>
                <span className="xp" title="Experience points">⭐ {user.xp} XP</span>
                <span className="who">{user.name}</span>
                <form action={logout}><button className="link">Log out</button></form>
              </>
            ) : (
              <>
                <Link href="/login">Log in</Link>
                <Link href="/register" className="btn small">Sign up</Link>
              </>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { AuthForm } from "../AuthForm";
import { login } from "../auth-actions";

export default async function LoginPage() {
  if (await getUser()) redirect("/learn");
  return <AuthForm mode="login" action={login} />;
}

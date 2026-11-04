import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { AuthForm } from "../AuthForm";
import { register } from "../auth-actions";

export default async function RegisterPage() {
  if (await getUser()) redirect("/learn");
  return <AuthForm mode="register" action={register} />;
}

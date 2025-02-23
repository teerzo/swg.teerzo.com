import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";

export default async function Login({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Invalid email or password");
    }

    return redirect("/");
  };


  return (
    <div className="flex flex-1 flex-col w-full px-8 justify-center items-center gap-2">
      <div className="flex-1 flex flex-col justify-center w-full gap-2 text-foreground max-w-sm">
        <div className="flex flex-col items-center">
          <h1> SWG Tools </h1>
        </div>

        <form className="flex flex-col gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <AuthSubmitButton
            formAction={signIn}
            className="bg-secondary text-primary rounded-md px-4 py-2 mb-2"
            pendingText="Signing In..."
          >
            Login
          </AuthSubmitButton>


          <Link href="/forgot-password" className="text-sm text-center"> Forgot password? </Link>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

import { Suspense } from "react";
import SignInForm from "../molecules/form/sign-in/sign-in-form";
import AuthLayout from "../templates/auth-layout";

export const dynamic = "force-dynamic";

export default function SignIn() {
  return (
    <AuthLayout>
      <div className="mx-auto flex flex-col justify-center gap-y-6 lg:w-6/12">
        <hgroup>
          {" "}
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="mt-2 text-zinc-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt,
            deserunt.
          </p>
        </hgroup>
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </AuthLayout>
  );
}

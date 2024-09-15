import Image from "next/image";
import React from "react";
import SignUpForm from "../molecules/form/sign-up/sign-up-form";
import AuthLayout from "../templates/auth-layout";

export default function SignUp() {
  return (
    <AuthLayout>
      <div className="mx-auto flex flex-col justify-center gap-y-6 lg:w-6/12">
        <hgroup>
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="mt-2 text-zinc-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt,
            deserunt.
          </p>
        </hgroup>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}

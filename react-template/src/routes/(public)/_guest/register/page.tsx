import { createFileRoute } from "@tanstack/react-router";

import { SignupForm } from "./-components/signup-form";

const RegisterPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-96 rounded-2xl p-5 shadow-sm">
        <SignupForm />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/register/")({ component: RegisterPage });

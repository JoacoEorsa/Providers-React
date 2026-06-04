import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordValidator } from "@/components/ui/password-validator";
import { Trans, useTranslation } from "@/i18n";
import { useSignup } from "@/services/auth/actions";
import { getSignupPayloadSchema } from "@/services/auth/schemas";
import type { SignupPayload } from "@/services/auth/types";
import { handleAxiosFieldErrors } from "@/utils";

const REDIRECT_DELAY_MS = 1800;

export const SignupForm = () => {
  const { t } = useTranslation();

  const { isPending, mutate: signup } = useSignup();

  const navigate = useNavigate();
  const search = useSearch({ from: "/(public)/_guest/register/" });

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(getSignupPayloadSchema()),
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const timer = setTimeout(() => {
      navigate({ to: "/login", search: { redirect: search.redirect } });
    }, REDIRECT_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess, navigate, search.redirect]);

  const onSubmit: SubmitHandler<SignupPayload> = (data) => {
    return signup(data, {
      onSuccess: () => {
        toast.success(t("signup.success"));
        setIsSuccess(true);
      },
      onError: (error) => {
        handleAxiosFieldErrors<SignupPayload>(error, setError, t("signup.error"));
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center duration-300 animate-in fade-in">
        <div className="grid size-16 place-items-center rounded-full bg-background-brand-default text-text-brand-on-brand duration-500 animate-in zoom-in-50">
          <Icons.Check className="size-8" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-text-default-default">{t("signup.success")}</h2>

          <p className="text-sm text-text-default-secondary">{t("signup.successRedirect")}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">{t("form.name")}</Label>

        <Input {...register("name")} id="name" />

        <ErrorMessage errorMessage={errors?.name?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t("form.email")}</Label>

        <Input {...register("email")} id="email" />

        <ErrorMessage errorMessage={errors?.email?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">{t("form.password")}</Label>

        <PasswordInput {...register("password")} id="password" />

        <ErrorMessage errorMessage={errors?.password?.message} />

        <PasswordValidator control={control} name="password" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="passwordConfirmation">{t("form.confirmPassword")}</Label>

        <PasswordInput {...register("passwordConfirmation")} id="passwordConfirmation" />

        <ErrorMessage errorMessage={errors?.passwordConfirmation?.message} />
      </div>

      <Button className="w-full" isLoading={isPending} type="submit">
        {t("signup.submit")}
      </Button>

      <p className="text-center text-sm">
        <Trans
          components={{
            Link: <Link className="underline underline-offset-4 hover:opacity-80" to="/login" />,
          }}
          i18nKey="signup.haveAccount"
        />
      </p>
    </form>
  );
};

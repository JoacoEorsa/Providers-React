import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Dialog, ErrorMessage, Icons, Input, Label, toast } from "@/components/ui";
import { useTranslation } from "@/i18n";
import {
  type CreateUserRequest,
  getCreateUserRequestSchema,
  useCreateUserMutation,
} from "@/services";

export const CreateUserDialog = () => {
  const { t } = useTranslation();
  const { isPending, mutate: createUser } = useCreateUserMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(getCreateUserRequestSchema()),
  });

  const onSubmit: SubmitHandler<CreateUserRequest> = (data) => {
    createUser(data, {
      onSuccess: () => {
        toast.success(t("users.create.success"));
        setIsDialogOpen(false);
        reset();
      },
      onError: () => {
        toast.error(t("users.create.error"));
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }

    setIsDialogOpen(open);
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={isDialogOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline">
          <Icons.Plus />

          {t("users.create.title")}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t("users.create.title")}</Dialog.Title>

          <Dialog.Description>{t("users.create.description")}</Dialog.Description>
        </Dialog.Header>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t("form.name")}</Label>

            <Input {...register("name")} id="name" size="sm" />

            <ErrorMessage errorMessage={errors?.name?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="emailAddress">{t("form.email")}</Label>

            <Input {...register("email_address")} id="emailAddress" size="sm" />

            <ErrorMessage errorMessage={errors?.email_address?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{t("form.password")}</Label>

            <Input {...register("password")} id="password" size="sm" type="password" />

            <ErrorMessage errorMessage={errors?.password?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="passwordConfirmation">{t("form.confirmPassword")}</Label>

            <Input
              {...register("password_confirmation")}
              id="passwordConfirmation"
              size="sm"
              type="password"
            />

            <ErrorMessage errorMessage={errors?.password_confirmation?.message} />
          </div>

          <Dialog.Footer>
            <Dialog.Close disabled={isPending} asChild>
              <Button variant="outline">{t("buttons.cancel")}</Button>
            </Dialog.Close>

            <Button isLoading={isPending} type="submit">
              {t("buttons.create")}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

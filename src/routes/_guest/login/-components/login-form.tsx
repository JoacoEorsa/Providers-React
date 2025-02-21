import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type LoginValues = z.infer<typeof schema>;

export const LoginForm = ({ onSubmit }: { onSubmit: (data: LoginValues) => void }) => {
	const { t } = useTranslation();

	const { register, handleSubmit } = useForm<LoginValues>({ resolver: zodResolver(schema) });

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<Label htmlFor="email">{t("Email")}</Label>
				<Input {...register("email")} />
			</div>

			<div>
				<Label htmlFor="password">{t("Password")}</Label>
				<Input {...register("password")} />
			</div>

			<div className="flex justify-end">
				<Button type="submit">{t("Submit")}</Button>
			</div>
		</form>
	);
};

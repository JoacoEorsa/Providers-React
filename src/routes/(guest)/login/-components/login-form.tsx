import { type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { useLoginMutation } from '@/services';
import { setAuthStoreToken } from '@/stores';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof schema>;

export const LoginForm = () => {
  const { t } = useTranslation();

  const loginMutation = useLoginMutation();

  const router = useRouter();
  const search = useSearch({ from: '/(guest)/login/' });
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginValues>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: async ({ data: { authToken } }) => {
        toast.success('Logged in successfully');
        setAuthStoreToken(authToken);
        await router.invalidate();
        await navigate({ to: search.redirect || '/' });
      },
      onError: () => {
        toast.error('Not able to log in');
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">{t('Email')}</Label>
        <Input {...register('email')} />
        {errors.email ? <p className="mt-2 text-red-600">{errors.email.message}</p> : null}
      </div>

      <div>
        <Label htmlFor="password">{t('Password')}</Label>
        <Input {...register('password')} type="password" />
        {errors.password ? <p className="mt-2 text-red-600">{errors.password.message}</p> : null}
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t('Submit')}</Button>
      </div>
    </form>
  );
};

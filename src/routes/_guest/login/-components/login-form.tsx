import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof schema>;

export const LoginForm = ({ onSubmit }: { onSubmit: (data: LoginValues) => void }) => {
  const { t } = useTranslation();

  const { handleSubmit, register } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">{t('Email')}</Label>
        <Input {...register('email')} />
      </div>

      <div>
        <Label htmlFor="password">{t('Password')}</Label>
        <Input {...register('password')} />
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t('Submit')}</Button>
      </div>
    </form>
  );
};

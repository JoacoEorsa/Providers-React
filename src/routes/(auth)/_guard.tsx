import { useTranslation } from 'react-i18next';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getAuthStoreState } from '@/stores';

const AuthGuard = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('greetings.guardedLayout')}
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/(auth)/_guard')({
  beforeLoad: ({ location }) => {
    const { token } = getAuthStoreState();

    if (!token) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: AuthGuard,
});

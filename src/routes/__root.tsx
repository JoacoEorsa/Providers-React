import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { createRootRoute, Outlet, useNavigate, useRouter } from '@tanstack/react-router';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { setAuthStoreToken, useAuthStoreToken } from '@/stores';

const RootComponent = () => {
  const { t } = useTranslation();

  const token = useAuthStoreToken();

  const router = useRouter();
  const navigate = useNavigate();

  const LazyDevtools =
    import.meta.env.VITE_APP_ENV === 'production'
      ? {
          Router: () => {
            return null;
          },
          Query: () => {
            return null;
          },
        }
      : {
          Router: lazy(async () => {
            const res = await import('@tanstack/router-devtools');

            return { default: res.TanStackRouterDevtools };
          }),
          Query: lazy(async () => {
            const res = await import('@tanstack/react-query-devtools');

            return { default: res.ReactQueryDevtools };
          }),
        };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setAuthStoreToken(null);

      router.invalidate().finally(() => {
        navigate({ to: '/login' });
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-between bg-purple-300 p-4">
        <span>{t('Root layout! I render on all paths')}</span>

        <div className="flex gap-x-2">
          <LanguageSwitcher />

          {token ? <Button onClick={handleLogout}>Log out</Button> : null}
        </div>
      </div>

      <Outlet />

      {import.meta.env.VITE_ENABLE_DEVTOOLS ? (
        <Suspense>
          <LazyDevtools.Router position="bottom-left" />
          <LazyDevtools.Query buttonPosition="bottom-right" />
        </Suspense>
      ) : null}
    </div>
  );
};

export const Route = createRootRoute({ component: RootComponent });

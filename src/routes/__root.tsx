import { useTranslation } from 'react-i18next';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores';

const RootComponent = () => {
  const { t } = useTranslation();
  const token = useUserStore((s) => {
    return s.token;
  });
  const reset = useUserStore((s) => {
    return s.reset;
  });

  return (
    <>
      <div className="flex justify-between bg-purple-300 p-4">
        <span>{t('Root layout! I render on all paths')}</span>

        <div className="flex gap-x-2">
          <LanguageSwitcher />

          {token ? <Button onClick={reset}>Log out</Button> : null}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootComponent });

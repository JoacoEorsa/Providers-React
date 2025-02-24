import { useTranslation } from 'react-i18next';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { LanguageSwitcher } from '@/components/language-switcher';

const RootComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between bg-purple-300 p-4">
        <span>{t('Root layout! I render on all paths')}</span>
        <LanguageSwitcher />
      </div>

      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootComponent });

import { useTranslation } from 'react-i18next';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import LanguageSwitcher from '@/components/language-switcher';

const RootComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between p-4 bg-purple-300">
        <span>{t('Root layout! I render on all paths')}</span>
        <LanguageSwitcher />
      </div>

      <Outlet />
    </>
  );
};

export const Route = createRootRoute({ component: RootComponent });

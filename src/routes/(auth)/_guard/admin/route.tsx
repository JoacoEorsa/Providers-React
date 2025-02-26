import { useTranslation } from 'react-i18next';
import { createFileRoute, Outlet } from '@tanstack/react-router';

const RouteComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('Hello {layout} layout!', { layout: '/_guard/admin' })}
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/(auth)/_guard/admin')({ component: RouteComponent });

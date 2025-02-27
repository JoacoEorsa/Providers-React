import { createFileRoute, Outlet } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const RouteComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('greetings.layout', { layout: '/_guard/admin' })}
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/(auth)/_guard/admin')({ component: RouteComponent });

import { createFileRoute, Outlet } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const AdminLayout = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('greetings.layout', { layout: '/_private/admin' })}
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_private/admin')({ component: AdminLayout });

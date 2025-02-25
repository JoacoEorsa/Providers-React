import { useTranslation } from 'react-i18next';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useUserStore } from '@/stores';

const RouteComponent = () => {
  const { t } = useTranslation();
  const token = useUserStore((s) => {
    return s.token;
  });

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {t('Hello logged-in layout! I render on all paths inside the /_logged-in/ folder')}
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_logged-in')({ component: RouteComponent });

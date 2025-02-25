import { useTranslation } from 'react-i18next';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useUserStore } from '@/stores';

const RouteComponent = () => {
  const { t } = useTranslation();
  const token = useUserStore((s) => {
    return s.token;
  });

  if (token) {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <div className="bg-gray-200 p-4">
        <span>{t('Guest layout! I render on all paths inside the /_guest/ folder')}</span>
      </div>

      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_guest')({ component: RouteComponent });

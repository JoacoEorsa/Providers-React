import { useTranslation } from 'react-i18next';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

const RouteComponent = () => {
  const { t } = useTranslation();

  const loggedIn = true;

  if (!loggedIn) {
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

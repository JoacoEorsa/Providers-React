import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { NavigationMenu } from '@/components/ui/navigation-menu';
import type { AvailableRoutesToPath } from '@/config/router';
import { useTranslation } from '@/i18n';
import { getAuthStoreState } from '@/stores';

const PrivateLayout = () => {
  const { t } = useTranslation();

  const links: { path: AvailableRoutesToPath; label: string }[] = [
    { path: '/', label: t('navigation.links.home') },
    { path: '/dashboard', label: t('navigation.links.dashboard') },
    { path: '/payments', label: t('navigation.links.payments') },
  ];

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <NavigationMenu.Root>
        <NavigationMenu.List>
          {links.map(({ label, path }) => {
            return (
              <NavigationMenu.Link key={path} to={path}>
                {label}
              </NavigationMenu.Link>
            );
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <Outlet />
    </div>
  );
};

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ location }) => {
    const { token } = getAuthStoreState();

    if (!token) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: PrivateLayout,
});

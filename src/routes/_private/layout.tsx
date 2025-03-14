import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { NavigationMenu } from '@/components/ui/navigation-menu';
import type { AvailableRoutesToPath } from '@/config/router';
import { getAuthStoreState } from '@/stores';

const PrivateLayout = () => {
  const links: { path: AvailableRoutesToPath; label: string }[] = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/payments', label: 'Payments' },
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

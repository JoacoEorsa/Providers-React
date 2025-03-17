import type { Meta, StoryObj } from '@storybook/react';

import { NavigationMenu } from '@/components/ui';
import type { AvailableRoutesToPath } from '@/config/router';

const meta: Meta<typeof NavigationMenu.Root> = {
  args: { children: 'NavigationMenu' },
  component: NavigationMenu.Root,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/UI/NavigationMenu',
} satisfies Meta<typeof NavigationMenu.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const routes: { path: AvailableRoutesToPath; label: string }[] = [
      { path: '/', label: 'Root' },
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/payments', label: 'Payments' },
    ];

    return (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Routes</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <ul>
                {routes.map(({ label, path }) => {
                  return (
                    <NavigationMenu.Link key={path} to={path}>
                      {label}
                    </NavigationMenu.Link>
                  );
                })}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {routes.map(({ label, path }) => {
            return (
              <NavigationMenu.Link key={path} to={path}>
                {label}
              </NavigationMenu.Link>
            );
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    );
  },
};

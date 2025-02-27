import { createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const RouteComponent = () => {
  const { t } = useTranslation();

  return <div>{t('greetings.exactPath', { exactPath: '/dashboard/' })}</div>;
};

export const Route = createFileRoute('/(auth)/_guard/dashboard/')({ component: RouteComponent });

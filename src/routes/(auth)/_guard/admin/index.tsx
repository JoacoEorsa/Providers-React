import { createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const RouteComponent = () => {
  const { t } = useTranslation();

  return <div>{t('greetings.exactPath', { exactPath: '/_guard/admin/' })}</div>;
};

export const Route = createFileRoute('/(auth)/_guard/admin/')({ component: RouteComponent });

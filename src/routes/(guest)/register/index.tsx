import { createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const RouteComponent = () => {
  const { t } = useTranslation();

  return <div>{t('greetings.exactPath', { exactPath: '/register' })}</div>;
};

export const Route = createFileRoute('/(guest)/register/')({ component: RouteComponent });

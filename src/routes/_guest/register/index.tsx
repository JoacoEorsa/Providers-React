import { useTranslation } from 'react-i18next';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  const { t } = useTranslation();

  return <div>{t('Hello {exactPath} exact path!', { exactPath: '/register' })}</div>;
};

export const Route = createFileRoute('/_guest/register/')({ component: RouteComponent });

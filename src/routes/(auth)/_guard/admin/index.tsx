import { useTranslation } from 'react-i18next';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  const { t } = useTranslation();

  return <div>{t('Hello {exactPath} exact path!', { exactPath: '/_guard/admin/' })}</div>;
};

export const Route = createFileRoute('/(auth)/_guard/admin/')({ component: RouteComponent });

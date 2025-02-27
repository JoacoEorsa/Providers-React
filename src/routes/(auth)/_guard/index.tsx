import { createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@/i18n';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="p-2">
      <h3>{t('greetings.home')}</h3>
    </div>
  );
};

export const Route = createFileRoute('/(auth)/_guard/')({ component: Home });

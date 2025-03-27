import { useTranslation } from 'react-i18next';

import { HamburgerMenu } from './hamburger-menu';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-primary text-primary-foreground flex items-center justify-between p-4">
      <img className="h-10" src="./logo.svg" />

      <span>{t('greetings.rootLayout')}</span>

      <HamburgerMenu />
    </header>
  );
};

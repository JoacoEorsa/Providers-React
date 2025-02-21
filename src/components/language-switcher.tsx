import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { resources } from '@/i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: keyof typeof resources) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={() => changeLanguage('en')}>🇺🇸 English</Button>
      <Button onClick={() => changeLanguage('es')}>🇪🇸 Español</Button>
    </div>
  );
};

export default LanguageSwitcher;

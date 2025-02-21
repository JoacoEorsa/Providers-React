import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en.json';
import esTranslation from './translations/es.json';

export const defaultNS = 'US';

export const resources = {
  en: { US: enTranslation },
  es: { ES: esTranslation }
} as const;

i18n.use(initReactI18next).init({
  supportedLngs: ['en', 'es'],
  fallbackLng: 'en',
  debug: import.meta.env.APP_ENV === 'development',
  detection: { order: ['querystring', 'localStorage', 'navigator'], caches: ['localStorage'] },
  interpolation: { escapeValue: false },
  resources: { en: { translation: resources.en.US }, es: { translation: resources.es.ES } }
});

export default i18n;

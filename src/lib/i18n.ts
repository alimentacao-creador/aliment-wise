import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTranslation from '../locales/pt.json';
import enTranslation from '../locales/en.json';
import frTranslation from '../locales/fr.json';

const resources = {
  pt: {
    translation: ptTranslation,
  },
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // default language
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false, // react already safeguards from xss
    },
  });

export default i18n;
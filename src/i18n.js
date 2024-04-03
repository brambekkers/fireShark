import { createI18n } from 'vue-i18n';
import nl from './locales/nl.json';
import en from './locales/en.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'nl',
  fallbackLocale: 'en',
  messages: {
    en,
    nl,
  },
});

export default i18n;
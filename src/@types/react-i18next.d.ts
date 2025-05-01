import 'react-i18next';
import { resources } from '../i18n';
import enEn from '../i18n/locales/en.json';
import ukEn from '../i18n/locales/uk.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof enEn;
      uk: typeof ukEn;
    };
  }
}

import { en } from './en';
import { ta } from './ta';
import { hi } from './hi';

export const locales: Record<string, Record<string, string>> = {
  en,
  ta,
  hi,
};

export function getTranslation(
  locale: string,
  key: string,
  variables?: Record<string, string | number>
): string {
  const normalizedLocale = (locale || 'en').toLowerCase().split('-')[0];
  const dictionary = locales[normalizedLocale] || locales.en;
  let text = dictionary[key] || locales.en[key] || key;

  if (variables) {
    Object.entries(variables).forEach(([varKey, varVal]) => {
      text = text.replace(new RegExp(`{${varKey}}`, 'g'), String(varVal));
    });
  }
  return text;
}

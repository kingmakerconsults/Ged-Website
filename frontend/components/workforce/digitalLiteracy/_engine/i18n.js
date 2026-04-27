/**
 * i18n.js — minimal translation scaffold so future Spanish / multilingual
 * passes don't require touching every module file. For now `t(key, fallback)`
 * returns the fallback (English) string. Modules use:
 *
 *    import { t } from '../_engine/i18n.js';
 *    t('a4.send.instruction', 'Compose and send an email...')
 */

const dictionaries = {
  en: {},
  // es: {} // future
};

let activeLocale = 'en';

export function setLocale(locale) {
  if (dictionaries[locale]) activeLocale = locale;
}

export function t(key, fallback) {
  const dict = dictionaries[activeLocale] || {};
  return dict[key] != null ? dict[key] : fallback;
}

export default { t, setLocale };

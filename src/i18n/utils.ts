import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;

export const localeCodes = Object.keys(ui) as Lang[];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang) {
    const isDefault = l === defaultLang;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return isDefault ? `/${cleanPath}` : `/${l}/${cleanPath}`;
  }
}

export function getSwitchLanguagePath(url: URL, targetLang: string) {
  const parts = url.pathname.split('/').filter(Boolean);

  if (parts[0] && parts[0] in ui) {
    parts.shift();
  }

  const baseContentPath = parts.join('/');
  return targetLang === defaultLang
    ? `/${baseContentPath}`
    : `/${targetLang}/${baseContentPath}`;
}

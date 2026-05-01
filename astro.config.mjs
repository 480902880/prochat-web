import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "zh-Hant", "en", "ja"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});

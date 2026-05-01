import { defineConfig } from 'astro/config';

export default defineConfig({
  site: "https://prochat.cc",
  output: "static",
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "zh-Hant", "en", "ja"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});

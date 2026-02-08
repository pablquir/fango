// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="@vite-pwa/nuxt" />
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt", "@nuxt/eslint", "@nuxt/ui", "@nuxt/icon"],
  ssr: false,

  devtools: {
    enabled: true,
  },
  app: {
    head: {
      meta: [{ name: "theme-color", content: "#0c0a09" }],
      link: [
        {
          rel: "manifest",
          href: "/fango/manifest.webmanifest",
        },
      ],
    },
    baseURL: "/fango/",
    buildAssetsDir: "/_nuxt/",
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",
  nitro: {
    preset: "static",
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
  icon: {
    class: "icon",
    mode: "svg",
    customCollections: [
      {
        prefix: "icon",
        dir: "./app/assets/icons",
      },
    ],
  },
  pwa: {
    registerType: "autoUpdate",
    injectRegister: "auto",
    manifestFilename: "manifest.webmanifest",
    scope: "/fango/",
    base: "/fango/",
    manifest: {
      start_url: "/fango/",
      scope: "/fango/",
      name: "Fango",
      short_name: "Fango",
      theme_color: "#0c0a09",
      background_color: "#0c0a09",
      display: "standalone",
      icons: [
        {
          src: "/fango/pwa/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/fango/pwa/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,opus}"],
      navigateFallbackDenylist: [
        /^\/_nuxt\//,
        /\/manifest\.webmanifest$/,
        /^\/page-expired/,
      ],
    },
  },
});

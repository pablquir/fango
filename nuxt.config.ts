// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="@vite-pwa/nuxt" />
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: "static",
  },
  modules: ["@vite-pwa/nuxt", "@nuxt/eslint", "@nuxt/ui", "@nuxt/icon"],
  app: {
    head: {
      link: [
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
      ],
      meta: [{ name: "theme-color", content: "#0c0a09" }],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Fango",
      short_name: "Fango",
      theme_color: "#0c0a09",
      background_color: "#0c0a09",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/pwa/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallbackDenylist: [/^\/page-expired/],
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

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});

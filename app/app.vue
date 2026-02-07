<script setup>
// useHead({
//   meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
//   link: [{ rel: "icon", href: "/favicon.ico" }],
//   htmlAttrs: {
//     lang: "en",
//   },
// });
//
// const title = "Nuxt Starter Template";
// const description =
//   "A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.";
//
// useSeoMeta({
//   title,
//   description,
//   ogTitle: title,
//   ogDescription: description,
//   ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
//   twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
//   twitterCard: "summary_large_image",
// });
//
//
// useHead({
//   meta: [
//     { name: 'theme-color', content: '#0c0a09' }
//   ],
//   link: [
//     { rel: 'manifest', href: '/manifest.webmanifest' }
//   ]
// })
const { appState } = useLicense();
onMounted(() => {});
</script>

<template>
  <UApp class="bg-stone-950">
    <SharedNavTop />

    <UMain>
      <NuxtPage />
    </UMain>

    <SharedNavFoot v-if="appState != 'BLOCKED'" />
  </UApp>
</template>

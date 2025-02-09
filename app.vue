<script lang="ts" setup>
import { ABOUT_INFO } from "./constants/About/aboutInfo";

useSeoMeta({
  title: `${ABOUT_INFO.name} - ${ABOUT_INFO.role}`,
  ogTitle: `${ABOUT_INFO.name} - ${ABOUT_INFO.role}`,
  description: ABOUT_INFO.description,
  ogDescription: ABOUT_INFO.description,
  ogImage: ABOUT_INFO.avatar,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout class="min-h-full bg-gray-50">
    <NuxtPage class="px-4" />
  </NuxtLayout>
</template>

<style lang="css">
body,
#__nuxt {
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
}
</style>

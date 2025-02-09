<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import About from "~/components/ui/About/About.vue";

import { ABOUT_INFO } from "~/constants/About/aboutInfo";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="lg:p-4">
    <Typography
      as="h2"
      class="text-2xl lg:text-4xl mb-6 dark:text-gray-950 mt-4"
      >About</Typography
    >
    <About :about="ABOUT_INFO" />
  </div>
</template>

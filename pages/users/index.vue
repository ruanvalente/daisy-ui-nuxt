<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import UsersModule from "~/modules/Users/UsersModule.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <Typography as="h2" class="text-2xl lg:text-4xl mt-4 dark:text-gray-950"
      >Users</Typography
    >
    <p class="mt-4 dark:text-gray-950">This is the user page</p>
    <UsersModule class="mt-8" />
  </div>
</template>

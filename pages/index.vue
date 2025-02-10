<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import LazyDashboard from "~/modules/Dashboard/DashboardModule.vue";
import { useUser } from "@clerk/nuxt/composables";
definePageMeta({
  middleware: "auth",
});

const { user } = useUser();
</script>

<template>
  <div>
    <Typography as="h2" class="mt-4 text-2xl lg:text-4xl dark:text-gray-950"
      >Welcome, {{ user?.fullName }} !</Typography
    >
    <p class="mt-4 dark:text-gray-950">This is the dashboard page</p>
    <LazyDashboard class="mt-8" />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@clerk/nuxt/composables";
import LazyTypography from "~/components/ui/Typography/Typography.vue";
import LazyDashboard from "~/modules/Dashboard/DashboardModule.vue";
definePageMeta({
  middleware: "auth",
});

const { user } = useUser();
</script>

<template>
  <div>
    <LazyTypography as="h2" class="mt-4 text-2xl lg:text-4xl dark:text-gray-950"
      >Welcome, {{ user?.fullName ?? 'Guest' }} !</LazyTypography
    >
    <p class="mt-4 dark:text-gray-950">This is the dashboard page</p>
    <LazyDashboard class="mt-8" />
  </div>
</template>

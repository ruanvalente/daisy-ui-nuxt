<script setup lang="ts">
import Typography from "~/components/ui/Typography/Typography.vue";
import Dashboard from "~/modules/Dashboard/DashboardModule.vue";
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <Typography as="h2" class="text-2xl lg:text-4xl mt-4">Dashboard</Typography>
    <p class="mt-4">This is the dashboard page</p>
    <Dashboard class="mt-8" />
  </div>
</template>

<script setup lang="ts">
import LazyDashboard from "~/modules/Dashboard/DashboardModule.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
   <LazyDashboard  />
</template>

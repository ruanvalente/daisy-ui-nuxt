<script setup lang="ts">
import Dashboard from "~/modules/Dashboard/Dashboard.vue";
definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <Dashboard />
</template>

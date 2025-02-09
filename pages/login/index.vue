<script setup lang="ts">
import LazyLogin from "@/modules/Login/LoginModule.vue";

definePageMeta({
  layout: "login",
  middleware: "auth",
});
</script>

<template>
  <LazyLogin />
</template>

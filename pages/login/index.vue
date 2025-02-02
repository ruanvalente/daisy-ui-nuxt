<script setup lang="ts">
import Login from "@/modules/Login/LoginModule.vue";

definePageMeta({
  layout: "login",
  middleware: "auth",
});
</script>

<template>
  <Login />
</template>

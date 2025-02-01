<script setup lang="ts">
import { useLogin } from "~/composable/useLogin/useLogin";
const { loading, handleSignIn } = useLogin();
</script>

<template>
  <button
    class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
    @click="handleSignIn"
  >
    <span v-if="!loading">Sign In</span>
    <span v-if="loading" loading class="loading loading-ring loading-lg"></span>
  </button>
</template>

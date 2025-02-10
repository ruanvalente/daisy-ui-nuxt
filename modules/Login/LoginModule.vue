<script setup lang="ts">
import {
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nuxt/components";
import { useLogin } from "~/composable/useLogin/useLogin";
// const { loading, handleSignIn } = useLogin();
</script>

<template>
  <!-- <div class="flex items-center justify-center">
    <button
      v-if="!loading"
      class="btn sm:btn-sm md:btn-md lg:btn-lg"
      @click="handleSignIn"
    >
      <span>Sign In</span>
    </button>
    <button
      class="flex items-center btn sm:btn-sm md:btn-md lg:btn-lg"
      v-if="loading"
    >
      <svg
        class="w-5 h-5 mr-3 text-black custom-spinner dark:text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Processing…
    </button>
  </div> -->

  <SignedOut>
    <SignInButton />
  </SignedOut>
  <SignIn>
    <UserButton />
  </SignIn>
</template>

<style lang="css" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.custom-spinner {
  animation: spin 1s linear infinite;
}
</style>

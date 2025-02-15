<script setup lang="ts">
import {
  SignIn,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nuxt/components";
</script>

<template>
  <SignedOut>
    <SignInButton />
  </SignedOut>
  <SignIn :appearance="{
    layout: {
      socialButtonsPlacement: 'bottom',
    }
  }">
    <UserButton />
  </SignIn>
</template>
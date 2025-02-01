<script setup>
import Navbar from "@/components/ui/NavBar/NavBar.vue";
import Drawer from "~/components/ui/Drawer/Drawer.vue";
</script>

<template>
  <main>
    <Navbar />
    <Drawer>
      <slot />
    </Drawer>
  </main>
</template>

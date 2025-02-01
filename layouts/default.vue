<script setup lang="ts">
import Navbar from "@/components/ui/NavBar/NavBar.vue";
import Drawer from "~/components/ui/Drawer/Drawer.vue";
</script>

<template>
  <div>
    <Navbar />
    <Drawer>
      <slot />
    </Drawer>
  </div>
</template>

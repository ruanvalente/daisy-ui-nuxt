<script setup lang="ts">
import Navbar from "~/components/ui/NavBar/NavBar.vue";
import Drawer from "~/components/ui/Drawer/Drawer.vue";
import Footer from "~/components/ui/Footer/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <Drawer class="flex-1">
      <div class="flex flex-col min-h-full">
        <div class="flex-1">
          <slot />
        </div>
        <Footer />
      </div>
    </Drawer>
  </div>
</template>

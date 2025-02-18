<script setup lang="ts">
import Drawer from "~/components/ui/Drawer/Drawer.vue";
import Footer from "~/components/ui/Footer/Footer.vue";
import Navbar from "~/components/ui/NavBar/NavBar.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <Drawer class="flex-1">
      <div class="flex flex-col min-h-full">
        <div class="flex-1">
          <slot />
        </div>
        <Footer class="mt-8 lg:mt-0" />
      </div>
    </Drawer>
  </div>
</template>

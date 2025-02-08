<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";

import { useDrawer } from "~/composable/useDrawer/useDrawer";
import { DRAWER_CONFIG } from "~/constants/Drawer/Drawer";

const drawerOpen = useDrawer();
const router = useRouter();
const target = ref(null);

onClickOutside(target, () => {
  drawerOpen.value = false;
});
</script>

<template>
  <div class="flex">
    <div
      class="relative inset-0 z-10"
      :class="{ 'drawer-open': drawerOpen, 'drawer-close': !drawerOpen }"
    >
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul
          class="menu bg-base-100 text-base-content min-h-full w-full lg:w-80 p-4"
        >
          <li class="py-2" v-for="item in DRAWER_CONFIG" :key="item.name">
            <NuxtLink
              :to="item.to"
              :class="{
                'bg-base-300': router.currentRoute.value.path === item.to,
                'dark:hover:bg-gray-950 dark:hover:text-white hover:bg-gray-200':
                  router.currentRoute.value.path !== item.to,
              }"
            >
              <i :class="item.icon" class="dark:text-white"></i>
              <span class="text-base font-normal">{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex-1 lg:px-8 transition-all duration-500">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.drawer-open {
  transform: translateX(0);
  transition: transform 0.5s forwards;
}

.drawer-close {
  transform: translateX(-100%);
  transition: transform 1.5s forwards;
}
</style>
